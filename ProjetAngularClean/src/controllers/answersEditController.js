app



    .controller('answersEditController',['$scope','$http','QuesFactory','$routeParams','sharedData','$location','$route',  function($scope, $http,QuesFactory,$routeParams,sharedData, $location,$route, loadedQues)
    {
        var self = this;
        self.mem = sharedData.get('loggedAs');
        self.evaluate1 = function() {
            var self = this;
            if (sharedData.get('loggedAs') != "admin")
                $location.path("/index");
            self.actualQcm = sharedData.get('actualQcm');
            self.actualQuestion = sharedData.get('actualQuestion');
        }
        self.evaluate1();
        self.back = function()
        {
            $location.path("/edit/qcm/"+$routeParams.qcmId);


        }
        self.cancel = function(){
            $route.reload();
        }
        self.new = function()
        {
            if(self.createAnswerEdit)
                self.actualQuestion.reponses[self.actualQuestion.reponses.length]=
                {  id:self.actualQuestion.reponses.length,
                    Titre:self.createAnswerEdit,
                    isTrue:false
                }
        }

        self.save = function(){
            var saveLength = self.actualQuestion.reponses.length;
            var recul = 0;
            for (var i = 0; i < saveLength; i++) {
                if ( self.repDel && self.repDel[i] == true) {
                    self.actualQuestion.reponses.splice(i - recul, 1);
                    recul++;
                    delete(self.repDel[i]);
                }
                else
                {
                    if(self.repEdit && self.repEdit[i])
                        self.actualQuestion.reponses[i-recul].Titre=self.repEdit[i].Titre;

                }
            }
            for (var j = 0; j < self.actualQuestion.reponses.length; j++) {
                self.actualQuestion.reponses[j].id = j;
            }

            QuesFactory.get({qcmId: $routeParams.qcmId, questionId: $routeParams.questionId})
                .$promise.then(function (ques) {
                    ques.reponses = self.actualQuestion.reponses;
                    ques.$save({qcmId: $routeParams.qcmId, questionId: $routeParams.questionId});
                    $route.reload();

                });

        }


        self.deleteTrue = function()
        {
            console.log("Delete start");
            var saveLength = self.actualQuestion.reponses.length;
            var recul = 0;
            var listDelete = [];
            for (var i = 0; i < saveLength; i++) {
                if (self.repDel && self.repDel[i] == true) {
                    self.actualQuestion.reponses.splice(i - recul, 1);
                    recul++;
                    delete(self.repDel[i]);
                    listDelete[listDelete.length]=i;
                }
            }
            for (var i =0; i< self.actualQuestion.reponses.length; i++)
            {
                self.actualQuestion.reponses[i].id=i;

            }
            $http.post("./rest/QCMList/"+$routeParams.qcmId+"/QuesList/"+$routeParams.questionId+"/deleteAns",{listDelete:listDelete}).then(
                function(responseIns)
                {
                    console.log("delete done");
                },
                function(responseErr)
                {
                    console.log(responseErr);
                });
        }

        self.uncheckOther = function(reponse)                                   // Edition------------------------------
        {

            for(var i = 0;i<self.actualQuestion.reponses.length;i++)
            {
                if(self.actualQuestion.reponses[i].id!=reponse.id)
                {

                    self.actualQuestion.reponses[i].isTrue=false;
                }

            }


        };
    }
    ]);

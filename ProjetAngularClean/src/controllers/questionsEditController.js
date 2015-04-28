app
    .controller('questionsEditController',['$scope','$http','QuesFactory','$routeParams','sharedData','$location','$route',  function($scope, $http,QuesFactory,$routeParams,sharedData, $location,$route, loadedQues  ) {
        var self = this;
        self.mem = sharedData.get('loggedAs');
        self.evaluate1 = function() {

            if (sharedData.get('loggedAs') != "admin")
                $location.path("/index");
            $scope.qcmTable = sharedData.get('qcmTable');
            self.actualQcm = sharedData.get('actualQcm');
        }
        self.evaluate1();
        self.back= function(){

            $location.path('/edit/index');
        }
        self.select = function(ques)                                             // Edition------------------------------
        {
            self.editedQuestion = ques.id;

        };
        self.new = function()
        {
            self.newQues = new QuesFactory();
            if(self.newQues) {
                self.newQues = new QuesFactory();
                self.newQues.id = self.actualQcm.questions.length;
                self.newQues.Titre = self.createQuestionInput.Titre;
                self.newQues.reponses = [];
                self.newQues.$save({qcmId: self.actualQcm.id});
            }
            delete(self.editedQuestion);
            $route.reload();
        }
        self.cancel = function(id)
        {
            if(self.questionEdit)
                self.questionEdit[id]="";
            delete(self.editedQuestion);
        }
        self.delete = function(id)
        {
            if(self.actualQuestion && self.actualQuestion.id==id)
            {
                delete(self.actualQuestion);
            }
            QuesFactory.delete({qcmId:self.actualQcm.id,questionId:id});
            delete(self.editedQuestion);
            $route.reload();

        }
        self.save = function(id)
        {
            QuesFactory.get({qcmId: self.actualQcm.id, questionId: id})
                .$promise.then(function (ques) {
                    if(self.questionEdit && self.questionEdit[id]) {
                        ques.Titre = self.questionEdit[id].Titre;
                        ques.$save({qcmId: self.actualQcm.id , questionId: id});
                        self.questionEdit[id].Titre = "";
                    }
                    delete(self.editedQuestion);
                    $route.reload();
                }
            );


        }
        self.goToQuestion = function(id)

        {
            $location.path('/edit/qcm/'+$routeParams.qcmId+"/question/"+id);


        }

    }])

app

    .controller('questionController',['$scope','$http','$routeParams','sharedData','$location',  function($scope, $http,$routeParams,sharedData, $location )
    {
        var self=this;
        self.connectedUserId=sharedData.get("userId");
        if(self.connectedUserId == undefined)
        {
            $location.path("/index");
        }
        $scope.qcmTable=sharedData.get('qcmTable');
        self.styleAnswer=[];
        self.QIndex = $routeParams.questionId;
        self.actualQcm = sharedData.get('actualQcm');
        self.RepQuest=sharedData.get('RepQuest');
        self.qcm=sharedData.get('qcm');
        self.selection = sharedData.get('selection');
        self.radio = sharedData.get('radio');
        self.nextQ = function(idAns, isReplay)                                 //questions
        {
            if(!self.qcm || !self.qcm[self.actualQcm.id]) {
                if(!self.actualQuestion.Repondu) {
                    if (self.actualQuestion.reponses[idAns] != undefined) {

                        self.RepQuest[self.actualQuestion.id]=idAns;
                        sharedData.store('RepQuest', self.RepQuest);
                        var nbRep = 0;
                        for(var i = 0; i<self.actualQcm.questions.length;i++)
                        {
                            if(self.RepQuest[i] != undefined)
                                nbRep++;
                        }
                        if(nbRep==self.actualQcm.questions.length) {
                            self.qcmComplete = true;
                        }
                    }
                    if(self.selection == undefined)
                    {
                        self.selection = [];
                    }
                    if(self.selection[self.actualQcm.id] == undefined)
                    {
                        self.selection[self.actualQcm.id] = {};
                    }
                    if(self.selection[self.actualQcm.id].questions == undefined)
                    {
                        self.selection[self.actualQcm.id].questions = [];
                    }
                    if(self.selection[self.actualQcm.id].questions[self.actualQuestion.id] == undefined)
                    {
                        self.selection[self.actualQcm.id].questions[self.actualQuestion.id]={};
                    }
                    for(var i = 0;i<self.actualQuestion.reponses.length;i++)
                    {
                        if(i==idAns)
                        {
                            if(self.selection[self.actualQcm.id].questions[self.actualQuestion.id].reponses == undefined)
                                self.selection[self.actualQcm.id].questions[self.actualQuestion.id].reponses=[];
                            self.selection[self.actualQcm.id].questions[self.actualQuestion.id].reponses[i]={selected:true};

                        }
                        else
                        {
                            if(self.selection[self.actualQcm.id].questions[self.actualQuestion.id].reponses == undefined)
                                self.selection[self.actualQcm.id].questions[self.actualQuestion.id].reponses=[];
                            self.selection[self.actualQcm.id].questions[self.actualQuestion.id].reponses[i]={selected:false};
                        }
                    }
                    sharedData.store('selection', self.selection);
                    self.actualQuestion.Repondu=true;
                }
            }
            if(self.qcmComplete)
            {
                if(self.qcm==undefined)
                    self.qcm = [];
                self.qcm[self.actualQcm.id]={cleared:true};
                sharedData.store('qcm', self.qcm);
                sharedData.store('actualQuestion', []);
                self.qcmComplete=false;
                $location.path("/qcm/"+self.actualQcm.id+"/score");
            }
            else {
                if (self.QIndex < self.actualQcm.questions.length - 1)
                    $location.path("/qcm/" + self.actualQcm.id + "/numq/" + (parseInt(self.QIndex) + 1));
            }
        };
        self.moveQ = function(direction)                                        //questions
        {
            $location.path("/qcm/"+self.actualQcm.id+"/numq/"+(parseInt(self.QIndex)+parseInt(direction)));
        };

        self.actualQcm = sharedData.get("actualQcm");

        if(!self.actualQcm)
        {
            $location.path("/index");
        }
        else
        {
            self.actualQuestion = sharedData.get("actualQuestion");
            self.selection = sharedData.get('selection');
            if (self.qcm != undefined && self.qcm[self.actualQcm.id]) {
                $http.get("./rest/QCMList/" + self.actualQcm.id+ "/QuesListComplete/" + self.actualQuestion.id).then(
                    function(response)
                    {

                        self.styleAnswer[self.RepQuest[self.actualQuestion.id]]={selected: true};
                        for(var i =0;i<self.actualQuestion.reponses.length;i++){
                            if(response.data.reponses[i].isTrue)
                                self.styleAnswer[i]={isTrue:true};
                        }
                    }
                    ,
                    function(errResponse)
                    {

                    }
                );
            }
            else {
                if (self.actualQuestion) {
                    for (var i = 0; i < self.actualQuestion.reponses.length; i++) {
                        if (self.RepQuest[self.actualQuestion.id] == i && self.radio[i] != undefined)
                            self.radio[i] = true;
                        else
                            self.radio[i] = false;
                    }

                }
                else {
                    $location.path("/index");
                }
            }
        }




    }])
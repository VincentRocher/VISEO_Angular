app
    .controller('titlesEditController', ['$scope','$http','QcmFactory','$routeParams','sharedData','$location','$route',  function($scope, $http,QcmFactory,$routeParams,sharedData, $location,$route, loaded  ) {
        var self = this;
        self.mem = sharedData.get('loggedAs');
        self.logged = function() {


            if (sharedData.get('loggedAs') != "admin")
                $location.path("/index");

            $scope.qcmTable = sharedData.get('qcmTable');
            sharedData.store('qcmTable', $scope.qcmTable);
        }
        self.logged();
        self.new = function()                                           // Edition------------------------------
        {self.editedQcm="eeeeeee";
            self.newQCM = new QcmFactory();
            if(self.createQcmInput)
                self.newQCM.Titre = self.createQcmInput;
            else
                self.newQCM.Titre = "";
            self.newQCM.id = $scope.qcmTable.length;
            self.newQCM.questions=[];
            self.newQCM.$save();
            delete(self.editedQcm);
            $route.reload();

        };
        self.delete = function(id, item)                                     // Edition------------------------------
        {self.editedQcm="eeeeeee";
            if(self.actualQcm && self.actualQcm.id==id)
            {
                delete(self.actualQcm);
            }
            QcmFactory.delete({qcmId:id});
            self.qcmInput=false;
            delete(self.editedQcm);
            $route.reload();

        };
        self.save=function( id)                                           // Edition------------------------------
        {
            QcmFactory.get({qcmId: id})
                .$promise.then(function (qcm) {
                    if(self.qcmEdit && self.qcmEdit[id]) {
                        qcm.Titre = self.qcmEdit[id].Titre;
                        qcm.$save({qcmId: id});
                        self.qcmEdit[id].Titre = "";
                    }
                    delete(self.editedQcm);
                    $route.reload();
                }
            );
        };
        self.select = function(qcm)                                             // Edition------------------------------
        {
            self.editedQcm = qcm.id;

        };
        self.cancel= function(id)
        {
            self.editedQcm="eeeeeee";
            self.editedQcm[id].Titre="";
            delete(self.editedQcm);


        }
        self.goToQcm = function(id)
        {
            $location.path("/edit/qcm/"+id);

        }

    }])

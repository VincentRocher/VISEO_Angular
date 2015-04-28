app

    .controller('inscriptionController',['$scope',  '$http','$routeParams','$location','sharedData', function($scope, $http, $routeParams, $location, sharedData)
    {
        var self = this;
        self.selection = sharedData.get('selection');
        self.qcmIdToGo = $routeParams.qcmId;
        self.cancel = function(){
            $location.path("/index");
        }
        self.inscription = function()                                           // inscription
        {

            $http.post("./rest/User", self.utilisateurIns).then(
                function(responseIns)
                {
                    self.connectedUserId=responseIns.data._id;
                    sharedData.store('userId', self.connectedUserId);
                    sharedData.store('RepQuest', []);
                    if(!self.selection)
                        sharedData.store('selection', []);
                    sharedData.store('radio', []);
                    $location.path("/qcm/"+self.qcmIdToGo+"/numq/0");
                    return "inscription done";

                },
                function(errResponseIns)
                {
                    console.log("errorPost");

                }


            );
        };



    }
    ])
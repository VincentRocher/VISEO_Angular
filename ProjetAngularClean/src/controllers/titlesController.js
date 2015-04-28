app

    .controller('titlesController',['$scope','$http','$routeParams','sharedData','$location',
        function($scope, $http,$routeParams,sharedData, $location )
        {
            var self=this;
            self.validate= function(QCM)                                            // titres||||||||||||||||||||||||||||||| 1
            {
                return  {finish : QCM.finish}
            }
            self.goQcm = function(id)
            {
                if(!self.qcm)
                    self.qcm = sharedData.get("qcm");
                if(self.qcm!=undefined && self.qcm[id]!=undefined)
                {
                    $location.path("/qcm/"+id+"/numq/0");
                }
                else
                {
                    $location.path("/inscription/"+id);

                }
            }
            $scope.qcmTable=sharedData.get('qcmTable');
            self.qcm=sharedData.get('qcm');
            if($scope.qcmTable)
                for(var i = 0; i<$scope.qcmTable.length;i++){
                    if(self.qcm!=undefined && self.qcm[i]!=undefined && self.qcm[i].cleared == true)
                    {
                        $scope.qcmTable[i].finish=true;
                    }
                }

        }])
app

    .controller('scoreController',['$scope','$http','$routeParams','sharedData','$location',  function($scope, $http,$routeParams,sharedData, $location, loaded ) {
        if(sharedData.get('userId')== undefined)
            $location.path("/index");
        var self = this;
        /* resultats */
        self.RepQuest=sharedData.get('RepQuest');
        self.connectedUserId=sharedData.get('userId');

        self.evaluate = function() {

            $http.post("./rest/QCMList/" + $routeParams.qcmId + "/ScoreQCM", {
                'answers': self.RepQuest,
                'userId': self.connectedUserId
            }).then(
                function (response) {
                    self.score = response.data;
                },
                function (errResponse) {
                    console.log(errResponse.data);
                    console.error("error while fetching score");
                })
        }
        self.evaluate();
    }

    ])
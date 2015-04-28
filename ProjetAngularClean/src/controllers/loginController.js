app
    .controller('loginController',['$http','$routeParams','sharedData','$location',  function( $http,$routeParams,sharedData, $location, loaded ) {
        var self=this;
        self.checkLogs = function()
        {
            if(self.user.login=="admin" && self.user.pwd=="VISEO")
            {

                sharedData.store('loggedAs', "admin");
                $location.path("/edit/index");
            }
            else
            {
                $location.path("/index");
            }

        }
    }])

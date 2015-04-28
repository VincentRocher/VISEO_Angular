describe('Login Controller Tests:', function() {
    beforeEach(module('QCM'));
    var ctrl, $loc, $scope;
    var login;
    var input = "jean";
    var mockUserResource, $httpBackend;
    beforeEach(function () {
        angular.mock.inject(function ($injector,_$controller_, $location,_$rootScope_) {
            ctrl = _$controller_;
            $loc = $location;
            $scope = _$rootScope_.$new();
            $loc.path("./splotch");
        })
    });


    it("minlength in login less than 10", function () {
        login = ctrl("loginController");
        login.user = [];
        login.user.login = input;
        expect(login.user.login.length).toBeLessThan(10);


    })
    it("maxlength in login greater than 2", function () {
        login = ctrl("loginController");
        login.user = [];
        login.user.login = input;
        expect(login.user.login.length).toBeGreaterThan(2);


    })
    it("maxlength in login greater than 2", function () {
        login = ctrl("loginController");
        login.user = [];
        login.user.login = input;
        expect(login.user.login.length).toBeDefined();


    })
    it('Login with good logs => redirect to /edit/index', function() {

        $loc.path("./splotch");
        login = ctrl('loginController', {$scope: $scope});
        login.user = {};
        login.user.login="admin";
        login.user.pwd="VISEO";
        login.checkLogs();

        expect($loc.path()).toBe("/edit/index");
        //expect(mockService.mem).toEqual([{key:'loggedAs', value:"admin"}]);
    });
    it('Login with bad logs => redirect to /edit/index', function() {

        $loc.path("./splotch");
        login = ctrl('loginController', {$scope: $scope});
        login.user = {};
        login.user.login="admeazeazeazeazin";
        login.user.pwd="VISazeazeazeEO";
        login.checkLogs();
        expect($loc.path()).toBe("/index");
        //expect(mockService.mem).toEqual([{key:'loggedAs', value:"admin"}]);
    });
});
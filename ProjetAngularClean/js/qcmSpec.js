describe('loginController', function() {
    beforeEach(module('QCM'));
    var $controller;
    var input;
    beforeEach(inject(function(_$controller_){
        $controller=_$controller_;
        input = "Jean";
    }))

    it("minlength in login less than 10",function(){
        var ctrl = $controller("loginController");
        ctrl.user=[];
        ctrl.user.login = input;
        expect(ctrl.user.login.length).toBeLessThan(10);



    })
    it("maxlength in login greater than 2",function(){
        var ctrl = $controller("loginController");
        ctrl.user=[];
        ctrl.user.login = input;
        expect(ctrl.user.login.length).toBeGreaterThan(2);


    })
    it("maxlength in login greater than 2",function(){
        var ctrl = $controller("loginController");
        ctrl.user=[];
        ctrl.user.login = input;
        expect(ctrl.user.login.length).toBeDefined();


    })






});

describe('QCM', function(){

    beforeEach(module('QCM'));
    describe("score test", function(){

        var $ctrl, httpback,$loc,score, login;

        beforeEach(function(){

            inject(function(_$rootScope_,_$controller_,$httpBackend, $location) {
                $loc = $location;
                $ctrl=_$controller_;
                $scope = _$rootScope_.$new();
                httpback = $httpBackend;




            })

        });

        it("Should set score to Validated", function(){
            httpback.whenPOST("./rest/QCMList/0/ScoreQCM").respond({value: "validated"});
            var score = $ctrl('scoreController', {$scope: $scope, $routeParams:{qcmId : 0}});
            score.RepQuest = [0,1,2];
            score.connectedUserId = "06684867";
            score.evaluate()
            //inscript.inscription().then(function(res){result = res;})
            httpback.flush();
            //console.log(score.score.value);
            expect(score.score.value).toBeDefined();
            expect(score.score.value).toBe("validated");
            //expect(result).toBe("validated");

        })
        it("good logs: should redirect to /edit/index", function(){
            $loc.path("./splotch");
            login = $ctrl('loginController', {$scope: $scope});
            login.user = {};
            login.user.login="admin";
            login.user.pwd="VISEO";
            login.checkLogs();
            expect($loc.path()).toBe("/edit/index");

        })
        it("bad logs: should redirect to /index", function(){
            $loc.path("./splotch");
            login = $ctrl('loginController', {$scope: $scope});
            login.user = {};
            login.user.login="admin";
            login.user.pwd="VIezaeazSEO";
            login.checkLogs();
            expect($loc.path()).toBe("/index");

        })



    })
    describe('login test', function(){
        var $ctrl, $loc,login;

        beforeEach(function(){






        });


    })

})

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
        console.log(ctrl.user.login.length);
        expect(ctrl.user.login.length).toBeLessThan(10);



    })
    it("maxlength in login greater than 2",function(){
        var ctrl = $controller("loginController");
        ctrl.user=[];
        ctrl.user.login = input;
        console.log(ctrl.user.login.length);
        expect(ctrl.user.login.length).toBeGreaterThan(2);


    })
    it("maxlength in login greater than 2",function(){
        var ctrl = $controller("loginController");
        ctrl.user=[];
        ctrl.user.login = input;
        console.log(ctrl.user.login.length);
        expect(ctrl.user.login.length).toBeDefined();


    })






});

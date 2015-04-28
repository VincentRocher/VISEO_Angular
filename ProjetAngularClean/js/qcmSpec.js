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
describe('Test All Controller', function() {

    beforeEach(module('QCM'));

    var ctrl, $loc, $scope, mockService, mockQcmFactory;
    var login, titleEdit;
    var mockUserResource, $httpBackend;

    beforeEach(module(function($provide) {

        var mem = {'loggedAs':"admin"};

        mockService = {
            store: function (key, value) {
                mem[key] = value;
            },

            get: function (key) {
                return mem[key];
            }
        };
        $provide.value('sharedData', mockService);
        mockService.store('MockqcmTable',[1,2,3,4]);
        mockService.store('MockRepQuest',[0,1,2]);
        mockService.store('actualQcmQuestions',[0,1,4,2,5]);
        mockService.store('actualQuestionReponses',[1,2,4]);
    }));


    beforeEach(function () {
        angular.mock.inject(function ($injector,_$controller_, $location,_$rootScope_) {
            $httpBackend = $injector.get('$httpBackend');
            mockUserResource = $injector.get('QcmFactory');
            ctrl = _$controller_;
            $loc = $location;
            $scope = _$rootScope_.$new();
            $loc.path("./splotch");
        })
    });
    /*
     it('Test1: Login good logs: should redirect to /edit/index', function() {

     $loc.path("./splotch");
     login = ctrl('loginController', {$scope: $scope});
     login.user = {};
     login.user.login="admin";
     login.user.pwd="VISEO";
     login.checkLogs();
     expect($loc.path()).toBe("/edit/index");
     //expect(mockService.mem).toEqual([{key:'loggedAs', value:"admin"}]);
     });
     */
    it('Test II.1: titlesEditController should not redirect to /index', function() {
        //expect($loc.path()).toBe("/edit/index");
        titleEdit = ctrl('titlesEditController', {$scope: $scope});
        titleEdit.evaluate1();
        expect($loc.path()).toEqual("/./splotch");
        //expect(mockService.mem).toEqual([{key:'loggedAs', value:"admin"}]);
    });
    it('Test II.2: titlesEditController should load mocked out mem', function() {
        titleEdit = ctrl('titlesEditController', {$scope: $scope});
        expect(titleEdit.mem).toEqual("admin");
        titleEdit.evaluate1();
    });



    it('Test II.3: titlesEditController should createQcm', inject(function () {
        titleEdit = ctrl('titlesEditController', {$scope: $scope, $routeParams:{qcmId : 0}});
        expect(titleEdit.mem).toEqual("admin");
        titleEdit.evaluate1();
        $httpBackend.expectPOST("/rest/QCMList").respond({value: "validated"});
        $httpBackend.whenGET("./rest/QCMList").respond({value: "test"});
        $httpBackend.whenGET("./view/titres.html").respond({value: "test"});

        $scope.qcmTable=mockService.get("MockqcmTable");

        // var result = mockUserResource.getUser('test');
        // expect(result[0].username).toEqual('test');
        titleEdit.new();
        $httpBackend.flush();
        titleEdit.createQcmInput="Imen";

        expect(titleEdit.editedQcm).toBe(undefined);


    }));
    it('Test II.4: titlesEditController should deletQcm', inject(function () {
        titleEdit = ctrl('titlesEditController', {$scope: $scope, $routeParams:{qcmId : 0}});
        expect(titleEdit.mem).toEqual("admin");
        titleEdit.evaluate1();
        $httpBackend.expectDELETE("/rest/QCMList/0").respond({value: "validated"});
        $httpBackend.whenGET("./rest/QCMList").respond({value: "test"});
        $httpBackend.whenGET("./view/titres.html").respond({value: "test"});

        $scope.qcmTable=mockService.get("MockqcmTable");
        titleEdit.actualQcm={};
        titleEdit.actualQcm.id=0;
        titleEdit.delete(0);
        $httpBackend.flush();
        expect(titleEdit.editedQcm).toBe(undefined);
    }));
    it('Test II.5: titlesEditController should saveQcm', inject(function () {
        titleEdit = ctrl('titlesEditController',  {$scope: $scope});
        expect(titleEdit.mem).toEqual("admin");
        titleEdit.evaluate1();
        $httpBackend.whenGET("/rest/QCMList/1").respond({ qcmId: 1});
        $httpBackend.whenGET("./rest/QCMList").respond({value: "validated"});
        $httpBackend.expectPOST("/rest/QCMList/1").respond({qcmId: 1});
        $httpBackend.whenGET("./view/titres.html").respond({value: "test"});
        $scope.qcmTable=mockService.get("MockqcmTable");
        titleEdit.editedQcm="EDITEEED";
        titleEdit.qcmEdit = [];
        titleEdit.qcmEdit[1]={};
        titleEdit.qcmEdit[1].Titre="test";
        titleEdit.save(1);
        $httpBackend.flush();
        expect(titleEdit.editedQcm).toBe(undefined);
    }));
    it('Test II.6: titlesEditController should cancel', inject(function () {
        titleEdit = ctrl('titlesEditController',  {$scope: $scope});
        expect(titleEdit.mem).toEqual("admin");
        titleEdit.evaluate1();
        titleEdit.cancel(1);
        expect(titleEdit.editedQcm).toBe(undefined);
    }));
    it('Test II.7: titlesEditController should goToQcm to reference /edit/qcm/1', inject(function () {
        titleEdit = ctrl('titlesEditController',  {$scope: $scope});
        expect(titleEdit.mem).toEqual("admin");
        titleEdit.evaluate1();
        titleEdit.goToQcm(1);
        expect($loc.path()).toBe("/edit/qcm/1");
        // expect(tit.editedQcm).toBe(undefined);
    }));
    it('Test III.1: questionsEditController should go to /edit/index when we select back button', inject(function () {
        titleEdit = ctrl('questionsEditController',  {$scope: $scope});
        expect(titleEdit.mem).toEqual("admin");
        titleEdit.evaluate1();
        titleEdit.back();
        expect($loc.path()).toBe("/edit/index");
        // expect(tit.editedQcm).toBe(undefined);
    }));
    it('Test III.2: questionsEditController  should saveQuestion', inject(function () {
        var  question = ctrl('questionsEditController',  {$scope: $scope, $routeParams:{qcmId : 0}});
        expect(question.mem).toEqual("admin");
        question.evaluate1();

        $httpBackend.expectPOST("/rest/QCMList/0/QuesList").respond({value: "validated"});
        $httpBackend.whenGET("./rest/QCMList").respond({value: "test"});
        $httpBackend.whenGET("./view/titres.html").respond({value: "test"});

        $scope.qcmTable=mockService.get("MockqcmTable");
        question.editedQuestion="Add";
        question.RepQuest = mockService.get('MockRepQuest');
        question.actualQcm={};
        question.actualQcm.id=0;
        question.actualQcm.questions= mockService.get('actualQcmQuestions');
        question.createQuestionInput={};
        question.createQuestionInput.Titre = "test";

        question.new();
        $httpBackend.flush();

        expect(question.editedQcm).toBe(undefined);
        expect(question.newQues.value).toBe("validated");
        mockService.store('newQues', question.newQues.value )
        var res= mockService.get('newQues');
        expect(res).toEqual('validated');
    }));
    it("Test III.3: questionsEditController Should Delete Question", function(){
        var  question = ctrl('questionsEditController',  {$scope: $scope, $routeParams:{qcmId : 0}});
        expect(question.mem).toEqual("admin");
        question.evaluate1();

        $httpBackend.expectDELETE("/rest/QCMList/0/QuesList/0").respond({value: "validated"});
        $httpBackend.whenGET("./rest/QCMList").respond({value: "test"});
        $httpBackend.whenGET("./view/titres.html").respond({value: "test"});

        question.editedQuestion="Delete";
        question.RepQuest = mockService.get('MockRepQuest');
        question.actualQcm={};
        question.actualQcm.id=0;
        question.actualQcm.questions=mockService.get('actualQcmQuestions');
        question.delete(0);
        $httpBackend.flush();
        expect(question.editedQuestion).toBe(undefined);

    })
    it("Test III.4: questionsEditController Should Edit Question and editedQuestion", function(){

        var  question = ctrl('questionsEditController',  {$scope: $scope, $routeParams:{qcmId : 0, quesId:0}});
        expect(question.mem).toEqual("admin");
        question.evaluate1();

        $httpBackend.expectGET("/rest/QCMList/0/QuesList/0").respond({value: "validated"});
        $httpBackend.expectPOST("/rest/QCMList/0/QuesList/0").respond({value: "validated"});
        $httpBackend.whenGET("./rest/QCMList").respond({value: "test"});
        $httpBackend.whenGET("./view/titres.html").respond({value: "test"});

        question.editedQuestion="Saved";
        question.questionEdit=[];
        question.questionEdit[0]="new question";
        question.RepQuest = mockService.get('MockRepQuest');
        question.actualQcm={};
        question.actualQcm.id=0;
        question.actualQcm.questions=mockService.get('actualQcmQuestions');

        question.save(0);
        $httpBackend.flush();

        expect(question.editedQuestion).toBe(undefined);

    })
    it("Test IV.0.1: answersEditControllerback: should redirect to /edit/index", function(){
        $loc.path("./splotch");
        answer = $ctrl('answersEditController', {$scope: $scope, $routeParams:{qcmId : 0}});
        answer.back();
        expect($loc.path()).toBe("/edit/qcm/0");
    })
    it("Test IV.0.2: answersEditController back: should redirect to /edit/index", function(){
        $loc.path("./splotch");
        login = $ctrl('questionsEditController', {$scope: $scope});
        login.back();
        expect($loc.path()).toBe("/edit/index");
    })
    it("Test IV.1: answersEditController Should create Answer temporarily", function(){
        var  Repons = ctrl('answersEditController',  {$scope: $scope, $routeParams:{qcmId : 0}});
        expect(Repons.mem).toEqual("admin");
        Repons.evaluate1();

        $httpBackend.whenGET("./rest/QCMList").respond({value: "test"});
        $httpBackend.whenGET("./view/titres.html").respond({value: "test"});

        Repons.createAnswerEdit = "test";
        Repons.actualQuestion = {};
        Repons.actualQuestion.reponses = mockService.get('actualQuestionReponses');


        Repons.new();
        $httpBackend.flush();

        expect(Repons.actualQuestion.reponses).toBeDefined();
        expect(Repons.actualQuestion.reponses[3]).toBeDefined();
        expect(Repons.actualQuestion.reponses[3].Titre).toBe("test");
        //expect(result).toBe("validated");

    })
    it("Test IV.2: answersEditController Should Delete Answer", function(){
        var  Repons = ctrl('answersEditController',  {$scope: $scope, $routeParams:{qcmId : 0, questionId:0}});
        expect(Repons.mem).toEqual("admin");
        Repons.evaluate1();

        $httpBackend.expectPOST("./rest/QCMList/0/QuesList/0/deleteAns").respond({value: "validated"});
        $httpBackend.whenGET("./rest/QCMList").respond({value: "test"});
        $httpBackend.whenGET("./view/titres.html").respond({value: "test"});

        Repons.RepQuest = mockService.get('MockRepQuest');
        Repons.repDel = [];
        Repons.repDel[0] = true;

        Repons.actualQcm={};
        Repons.actualQcm.id=0;
        Repons.actualQcm.questions= mockService.get('actualQcmQuestions');

        Repons.actualQuestion = {};
        Repons.actualQuestion.reponses = mockService.get('actualQuestionReponses');

        var save_length = Repons.actualQuestion.reponses.length;

        Repons.deleteTrue(0);
        $httpBackend.flush();

        expect(Repons.actualQuestion.reponses.length).toBe(save_length-1);
        console.log(Repons.newQues);

    })
    it("Test IV.2: answersEditController Should Edit Question and Answers related to it", function(){
        var  Repons = ctrl('answersEditController',  {$scope: $scope, $routeParams:{qcmId : 0,  quesId:0}});
        expect(Repons.mem).toEqual("admin");
        Repons.evaluate1();

        $httpBackend.expectGET("/rest/QCMList/0/QuesList").respond({value: "validated"});
        $httpBackend.expectPOST("/rest/QCMList/0/QuesList").respond({value: "validated"});
        $httpBackend.whenGET("./rest/QCMList").respond({value: "test"});
        $httpBackend.whenGET("./view/titres.html").respond({value: "test"});

        Repons.RepQuest = mockService.get('MockRepQuest');
        Repons.actualQcm={};
        Repons.actualQcm.id=0;
        Repons.actualQcm.questions= mockService.get('actualQcmQuestions');
        Repons.actualQuestion = {};
        Repons.actualQuestion.reponses = mockService.get('actualQuestionReponses');
        var save_length = Repons.actualQuestion.reponses.length;
        Repons.createAnswerEdit = "test";

        Repons.new();
        Repons.save(0);
        $httpBackend.flush();
        expect(Repons.actualQuestion.reponses.length).toBe(save_length+1 );


    })

});


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
<<<<<<< HEAD
describe('Test All Controller', function() {
=======

describe('Inscription et Score controller', function(){
>>>>>>> 095185f8091c63e5396ba0aebabfa81b9b82d128

    beforeEach(module('QCM'));

<<<<<<< HEAD
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
=======
        var $ctrl, httpback,$loc,score, login, title, question;
>>>>>>> 095185f8091c63e5396ba0aebabfa81b9b82d128

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
    it("Test IV.1: answersEditController Should create Answer temporarily", function(){
        var  Repons = ctrl('answersEditController',  {$scope: $scope, $routeParams:{qcmId : 0}});
        expect(Repons.mem).toEqual("admin");
        Repons.evaluate1();

<<<<<<< HEAD
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
=======
        it("Should set score to Validated", function(){
            httpback.whenPOST("./rest/QCMList/0/ScoreQCM").respond({value: "validated"});
            var score = $ctrl('scoreController', {$scope: $scope, $routeParams:{qcmId : 0}});
            score.RepQuest = [0,1,2];
            score.connectedUserId = "06684867";
            score.evaluate();
            //inscript.inscription().then(function(res){result = res;})
            httpback.flush();
            //console.log(score.score.value);
            expect(score.score.value).toBeDefined();
            expect(score.score.value).toBe("validated");
            //expect(result).toBe("validated");

        })
        it("Should create Question and delete editedQuestion", function(){
            httpback.expectPOST("/rest/QCMList/0/QuesList").respond({value: "validated"});
            httpback.whenGET("./rest/QCMList").respond({value: "test"});
            httpback.whenGET("./view/titres.html").respond({value: "test"});
            var question = $ctrl('questionsEditController', {$scope: $scope, $routeParams:{qcmId : 0}});
            question.editedQuestion="EDITEEED";
            question.RepQuest = [0,1,2];
            question.connectedUserId = "06684867";
            question.actualQcm={};
            question.actualQcm.id=0;
            question.actualQcm.questions=[0,1,4,2,5];
            question.createQuestionInput={};
            question.createQuestionInput.Titre = "test";
            question.new();
            //inscript.inscription().then(function(res){result = res;})
            httpback.flush();
            //console.log(score.score.value);
            expect(question.editedQuestion).toBe(undefined);
            console.log(question.newQues);
            expect(question.newQues.value).toBe("validated");
            //expect(result).toBe("validated");

        })
        it("Should create QCM and delete editedQcm", function(){
            httpback.expectPOST("/rest/QCMList").respond({value: "validated"});
            httpback.whenGET("./rest/QCMList").respond({value: "test"});
            httpback.whenGET("./view/titres.html").respond({value: "test"});
            title = $ctrl('titlesEditController', {$scope: $scope, $routeParams:{qcmId : 0}});
            $scope.qcmTable = [0,1,2];
            title.editedQcm="EDITEEED";
            title.RepQuest = [0,1,2];
            title.connectedUserId = "06684867";
            title.actualQcm={};
            title.actualQcm.id=0;
            title.actualQcm.questions=[0,1,4,2,5];
            title.createQcmInput="plop";
            title.new();
            //inscript.inscription().then(function(res){result = res;})
            httpback.flush();
            //console.log(score.score.value);
            expect(title.editedQcm).toBe(undefined);
            expect(title.newQCM.value).toBe("validated");
            //expect(result).toBe("validated");

        })
        it("Should Delete QCM and editedQcm", function(){
            httpback.expectDELETE("/rest/QCMList/1").respond({value: "validated"});
            httpback.whenGET("./rest/QCMList").respond({value: "test"});
            httpback.whenGET("./view/titres.html").respond({value: "test"});
            title = $ctrl('titlesEditController', {$scope: $scope, $routeParams:{qcmId : 0}});
            $scope.qcmTable = [0,1,2];
            title.editedQcm="EDITEEED";
            title.RepQuest = [0,1,2];
            title.connectedUserId = "06684867";
            title.actualQcm={};
            title.actualQcm.id=0;
            title.actualQcm.questions=[0,1,4,2,5];
            title.createQcmInput="plop";
            title.delete(1);
            //inscript.inscription().then(function(res){result = res;})
            httpback.flush();
            //console.log(score.score.value);
            expect(title.editedQcm).toBe(undefined);
            //expect(result).toBe("validated");

        })
        it("Should Edit QCM and delete editedQcm", function(){
            httpback.whenGET("/rest/QCMList/1").respond({value: "test"});
            httpback.whenGET("./rest/QCMList").respond({value: "validated"});
            httpback.expectPOST("/rest/QCMList/1").respond({value: "validated"});
            httpback.whenGET("./view/titres.html").respond({value: "test"});
            title = $ctrl('titlesEditController', {$scope: $scope, $routeParams:{qcmId : 0}});
            $scope.qcmTable = [0,1,2];
            title.editedQcm="EDITEEED";
            title.qcmEdit = [];
            title.qcmEdit[1]={};
            title.qcmEdit[1].Titre="test";
            title.RepQuest = [0,1,2];
            title.connectedUserId = "06684867";
            title.actualQcm={};
            title.actualQcm.id=0;
            title.actualQcm.questions=[0,1,4,2,5];
            title.createQcmInput="plop";
            title.save(1);
            //inscript.inscription().then(function(res){result = res;})
            httpback.flush();
            //console.log(score.score.value);
            expect(title.editedQcm).toBe(undefined);
            //expect(result).toBe("validated");

        })
        it("Should Delete Question and editedQuestion", function(){
            httpback.expectDELETE("/rest/QCMList/0/QuesList/0").respond({value: "validated"});
            httpback.whenGET("./rest/QCMList").respond({value: "test"});
            httpback.whenGET("./view/titres.html").respond({value: "test"});
            var question = $ctrl('questionsEditController', {$scope: $scope, $routeParams:{qcmId : 0}});
            question.editedQuestion="EDITEEED";
            question.RepQuest = [0,1,2];
            question.connectedUserId = "06684867";
            question.actualQcm={};
            question.actualQcm.id=0;
            question.actualQcm.questions=[0,1,4,2,5];
            question.delete(0);
            //inscript.inscription().then(function(res){result = res;})
            httpback.flush();
            //console.log(score.score.value);
            expect(question.editedQuestion).toBe(undefined);
            console.log(question.newQues);
            //expect(result).toBe("validated");

        })
        it("Should Edit Question and editedQuestion", function(){
            httpback.expectGET("/rest/QCMList/0/QuesList/0").respond({value: "validated"});
            httpback.whenGET("./rest/QCMList").respond({value: "test"});
            httpback.whenGET("./view/titres.html").respond({value: "test"});
            var question = $ctrl('questionsEditController', {$scope: $scope, $routeParams:{qcmId : 0, quesId:0}});
            question.editedQuestion="EDITEEED";
            question.RepQuest = [0,1,2];
            question.connectedUserId = "06684867";
            question.actualQcm={};
            question.actualQcm.id=0;
            question.actualQcm.questions=[0,1,4,2,5];
            question.save(0);
            //inscript.inscription().then(function(res){result = res;})
            httpback.flush();
            //console.log(score.score.value);
            expect(question.editedQuestion).toBe(undefined);

            //expect(result).toBe("validated");

        })

        it("Should create Answer temporarily", function(){
            var answer = $ctrl('answersEditController', {$scope: $scope, $routeParams:{qcmId : 0}});
            httpback.whenGET("./rest/QCMList").respond({value: "test"});
            httpback.whenGET("./view/titres.html").respond({value: "test"});
            answer.createQuestionInput={};
            answer.createAnswerEdit = "test";
            answer.actualQuestion = {};
            answer.actualQuestion.reponses = [1,2,4];

            var last = answer.actualQuestion;
            answer.new();
            //inscript.inscription().then(function(res){result = res;})
            httpback.flush();
            //console.log(score.score.value);
            expect(answer.actualQuestion.reponses).toBeDefined();
            expect(answer.actualQuestion.reponses[3]).toBeDefined();
            expect(answer.actualQuestion.reponses[3].Titre).toBe("test");
            //expect(result).toBe("validated");

        })
        it("Should Delete Answer", function(){
            httpback.expectPOST("./rest/QCMList/0/QuesList/0/deleteAns").respond({value: "validated"});
            httpback.whenGET("./rest/QCMList").respond({value: "test"});
            httpback.whenGET("./view/titres.html").respond({value: "test"});
            var answer = $ctrl('answersEditController', {$scope: $scope, $routeParams:{qcmId : 0, questionId:0}});
            answer.RepQuest = [0,1,2];
            answer.repDel = [];
            answer.repDel[0] = true;

            answer.connectedUserId = "06684867";
            answer.actualQcm={};
            answer.actualQcm.id=0;
            answer.actualQcm.questions=[0,1,4,2,5];
            answer.actualQuestion = {};
            answer.actualQuestion.reponses = [1,2,4];
            var save_length = answer.actualQuestion.reponses.length;
            answer.deleteTrue(0);
            //inscript.inscription().then(function(res){result = res;})
            httpback.flush();
            //console.log(score.score.value);
            expect(answer.actualQuestion.reponses.length).toBe(save_length-1);
            console.log(answer.newQues);
            //expect(result).toBe("validated");

        })
        it("Should Edit Question and Answers related to it", function(){
            httpback.expectGET("/rest/QCMList/0/QuesList").respond({value: "validated"});
            httpback.expectPOST("/rest/QCMList/0/QuesList").respond({value: "validated"});
            httpback.whenGET("./rest/QCMList").respond({value: "test"});
            httpback.whenGET("./view/titres.html").respond({value: "test"});
            var answer = $ctrl('answersEditController', {$scope: $scope, $routeParams:{qcmId : 0, quesId:0}});
            answer.RepQuest = [0,1,2];
            answer.connectedUserId = "06684867";
            answer.actualQcm={};
            answer.actualQcm.id=0;
            answer.actualQcm.questions=[0,1,4,2,5];
            answer.actualQuestion = {};
            answer.actualQuestion.reponses = [1,2,4];
            var save_length = answer.actualQuestion.reponses.length;
            answer.createAnswerEdit = "test";
            answer.new();
            answer.save(0);
            //inscript.inscription().then(function(res){result = res;})
            httpback.flush();
            //console.log(score.score.value);
            expect(answer.actualQuestion.reponses.length).toBe(save_length+1 );

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
        it("mode Normal click on QCM not cleared=> redirect to inscription", function(){
            $loc.path("./splotch");
            title = $ctrl('titlesController', {$scope: $scope});
            title.goQcm(0);
            expect($loc.path()).toBe("/inscription/0");

        })
        it("mode Normal click on QCM cleared=> redirect to inscription", function(){
            $loc.path("./splotch");
            title = $ctrl('titlesController', {$scope: $scope});
            title.qcm=[];
            title.qcm[0]=true;
            title.goQcm(0);
            expect($loc.path()).toBe("/qcm/0/numq/0");

        })
        it("Click on button to move question further, or question in QCM cleared", function(){
            $loc.path("./splotch");
            question = $ctrl('questionController', {$scope: $scope, $routeParams: {qcmId: 0, quesId:2}});
            question.actualQcm = {id : 0};
            question.QIndex = 2;
            question.moveQ(1);
            expect($loc.path()).toBe("/qcm/0/numq/3");
        })
        it("click on QCM when qcm is finished => should put QCM to Cleared and redirect to score", function(){
            $loc.path("./splotch");
            question = $ctrl('questionController', {$scope: $scope, $routeParams: {qcmId: 0, quesId:2}});

            question.actualQcm = [];
            question.actualQcm.id = 0;
            question.actualQuestion = [];
            question.actualQuestion.Repondu = true;
            question.actualQcm.Repondu = "";
            question.QIndex = 2;
            question.qcmComplete = true;
            question.nextQ();
            expect(question.qcm[0].cleared).toBeTruthy();
            expect($loc.path()).toBe("/qcm/0/score");

        })
        it("click on QCM when qcm isnt finished => should go next question and fill table RepQuest", function(){
            $loc.path("./splotch");
            question = $ctrl('questionController', {$scope: $scope, $routeParams: {qcmId: 0, quesId:2}});

            question.actualQcm = [];
            question.RepQuest = [];
            question.actualQcm.id = 0;

            question.actualQcm.questions = [1,1,1,1];
            question.actualQuestion = [];
            question.actualQuestion.Repondu = "";
            question.actualQuestion.id = 2;
            question.actualQuestion.reponses = [0,0,0,1,4,1];
            question.actualQcm.Repondu = "";
            question.QIndex = 2;
            question.nextQ(2, false);
            expect($loc.path()).toBe("/qcm/0/numq/3");
            expect(question.RepQuest[2]).toBe(2);

        })
>>>>>>> 095185f8091c63e5396ba0aebabfa81b9b82d128


    })

});


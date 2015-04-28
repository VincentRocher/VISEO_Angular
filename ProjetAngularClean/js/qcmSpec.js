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

describe('Inscription et Score controller', function(){

    beforeEach(module('QCM'));
    describe("score test", function(){

        var $ctrl, httpback,$loc,score, login, title, question;

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
            httpback.expectPOST("/rest/QCMList/0/QuesList/0").respond({value: "validated"});
            httpback.whenGET("./rest/QCMList").respond({value: "test"});
            httpback.whenGET("./view/titres.html").respond({value: "test"});
            var question = $ctrl('questionsEditController', {$scope: $scope, $routeParams:{qcmId : 0, quesId:0}});
            question.editedQuestion="EDITEEED";
            question.questionEdit = [];
            question.questionEdit[0] = "NEW QUESTION";

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
        it("back: should redirect to /edit/index", function(){
            $loc.path("./splotch");
            answer = $ctrl('answersEditController', {$scope: $scope, $routeParams:{qcmId : 0}});
            answer.back();
            expect($loc.path()).toBe("/edit/qcm/0");

        })
        it("back: should redirect to /edit/index", function(){
            $loc.path("./splotch");
            login = $ctrl('questionsEditController', {$scope: $scope});
            login.back();
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



    })

})

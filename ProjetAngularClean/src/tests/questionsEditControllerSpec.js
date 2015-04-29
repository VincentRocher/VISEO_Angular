describe('Questions Edit Tests', function() {
    beforeEach(module('QCM'));

    var ctrl, $loc, $scope, mockService;
    var titleEdit;
    var mockUserResource, $httpBackend;

    beforeEach(module(function ($provide) {

        var mem = {'loggedAs': "admin"};

        mockService = {
            store: function (key, value) {
                mem[key] = value;
            },

            get: function (key) {
                return mem[key];
            }
        };
        $provide.value('sharedData', mockService);
        mockService.store('MockqcmTable', [1, 2, 3, 4]);
        mockService.store('MockRepQuest', [0, 1, 2]);
        mockService.store('actualQcmQuestions', [0, 1, 4, 2, 5]);
        mockService.store('actualQuestionReponses', [1, 2, 4]);
    }));


    beforeEach(function () {
        angular.mock.inject(function ($injector, _$controller_, $location, _$rootScope_) {
            $httpBackend = $injector.get('$httpBackend');
            mockUserResource = $injector.get('QcmFactory');
            ctrl = _$controller_;
            $loc = $location;
            $scope = _$rootScope_.$new();
            $loc.path("./splotch");
        })
    });


    it('Back(): Should send to edition home (/edit/index)', inject(function () {
        titleEdit = ctrl('questionsEditController', {$scope: $scope});
        expect(titleEdit.mem).toEqual("admin");
        titleEdit.evaluate1();
        titleEdit.back();
        expect($loc.path()).toBe("/edit/index");
        // expect(tit.editedQcm).toBe(undefined);
    }));
    it('new() : should create a new Question', inject(function () {
        var question = ctrl('questionsEditController', {$scope: $scope, $routeParams: {qcmId: 0}});
        expect(question.mem).toEqual("admin");
        question.evaluate1();

        $httpBackend.expectPOST("../rest/QCMList/0/QuesList").respond({value: "validated"});
        $httpBackend.whenGET("./rest/QCMList").respond({value: "test"});
        $httpBackend.whenGET("./src/view/titres.html").respond({value: "test"});

        expect(mockService.get("MockqcmTable")).toEqual([1, 2, 3, 4]);
        $scope.qcmTable = mockService.get("MockqcmTable");
        question.editedQuestion = "Add";
        expect(mockService.get("MockRepQuest")).toEqual([0, 1, 2]);
        question.RepQuest = mockService.get('MockRepQuest');
        question.actualQcm = {};
        question.actualQcm.id = 0;
        expect(mockService.get("actualQcmQuestions")).toEqual([0, 1, 4, 2, 5]);
        question.actualQcm.questions = mockService.get('actualQcmQuestions');
        question.createQuestionInput = {};
        question.createQuestionInput.Titre = "test";

        question.new();
        $httpBackend.flush();

        expect(question.editedQcm).toBe(undefined);
        expect(question.newQues.value).toBe("validated");
        mockService.store('newQues', question.newQues.value)
        var res = mockService.get('newQues');
        expect(res).toEqual('validated');
    }));
    it("delete(): Should delete Question", function () {
        var question = ctrl('questionsEditController', {$scope: $scope, $routeParams: {qcmId: 0}});
        expect(question.mem).toEqual("admin");
        question.evaluate1();

        $httpBackend.expectDELETE("../rest/QCMList/0/QuesList/0").respond({value: "validated"});
        $httpBackend.whenGET("./rest/QCMList").respond({value: "test"});
        $httpBackend.whenGET("./src/view/titres.html").respond({value: "test"});

        question.editedQuestion = "Delete";
        expect(mockService.get("MockRepQuest")).toEqual([0, 1, 2]);
        question.RepQuest = mockService.get('MockRepQuest');
        question.actualQcm = {};
        question.actualQcm.id = 0;
        expect(mockService.get("actualQcmQuestions")).toEqual([0, 1, 4, 2, 5]);
        question.actualQcm.questions = mockService.get('actualQcmQuestions');
        question.delete(0);
        $httpBackend.flush();
        expect(question.editedQuestion).toBe(undefined);

    })
    it("save(): Should save Question", function () {

        var question = ctrl('questionsEditController', {$scope: $scope, $routeParams: {qcmId: 0, quesId: 0}});
        expect(question.mem).toEqual("admin");
        question.evaluate1();

        $httpBackend.expectGET("../rest/QCMList/0/QuesList/0").respond({value: "validated"});
        $httpBackend.expectPOST("../rest/QCMList/0/QuesList/0").respond({value: "validated"});
        $httpBackend.whenGET("./rest/QCMList").respond({value: "test"});
        $httpBackend.whenGET("./src/view/titres.html").respond({value: "test"});

        question.editedQuestion = "Saved";
        question.questionEdit = [];
        question.questionEdit[0] = "new question";
        expect(mockService.get("MockRepQuest")).toEqual([0, 1, 2]);
        question.RepQuest = mockService.get('MockRepQuest');
        question.actualQcm = {};
        question.actualQcm.id = 0;
        expect(mockService.get("actualQcmQuestions")).toEqual([0, 1, 4, 2, 5]);
        question.actualQcm.questions = mockService.get('actualQcmQuestions');

        question.save(0);
        $httpBackend.flush();

        expect(question.editedQuestion).toBe(undefined);

    })
});
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





    it("Test IV.0.1: answersEditControllerback: should redirect to /edit/index", function(){
        $loc.path("./splotch");
        answer = ctrl('answersEditController', {$scope: $scope, $routeParams:{qcmId : 0}});
        answer.back();
        expect($loc.path()).toBe("/edit/qcm/0");
    })
    it("Test IV.0.2: answersEditController back: should redirect to /edit/index", function(){
        $loc.path("./splotch");
        login = ctrl('questionsEditController', {$scope: $scope});
        login.back();
        expect($loc.path()).toBe("/edit/index");
    })
    it("Test IV.1: answersEditController Should create Answer temporarily", function(){
        var  Repons = ctrl('answersEditController',  {$scope: $scope, $routeParams:{qcmId : 0}});
        expect(Repons.mem).toEqual("admin");
        Repons.logged();

        $httpBackend.whenGET("./rest/QCMList").respond({value: "test"});
        $httpBackend.whenGET("./view/titres.html").respond({value: "test"});

        Repons.createAnswerEdit = "test";
        Repons.actualQuestion = {};
        expect(mockService.get("actualQuestionReponses")).toEqual( [ 1, 2, 4 ]);
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
        Repons.logged();

        $httpBackend.expectPOST("./rest/QCMList/0/QuesList/0/deleteAns").respond({value: "validated"});
        $httpBackend.whenGET("./rest/QCMList").respond({value: "test"});
        $httpBackend.whenGET("./view/titres.html").respond({value: "test"});

        expect(mockService.get("MockRepQuest")).toEqual([ 0, 1, 2 ]);
        Repons.RepQuest = mockService.get('MockRepQuest');
        Repons.repDel = [];
        Repons.repDel[0] = true;

        Repons.actualQcm={};
        Repons.actualQcm.id=0;
        expect(mockService.get("actualQcmQuestions")).toEqual( [ 0, 1, 4, 2, 5 ]);
        Repons.actualQcm.questions= mockService.get('actualQcmQuestions');

        Repons.actualQuestion = {};
        expect(mockService.get("actualQuestionReponses")).toEqual( [ 1, 2, 4 ]);
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
        Repons.logged();

        $httpBackend.expectGET("/rest/QCMList/0/QuesList").respond({value: "validated"});
        $httpBackend.expectPOST("/rest/QCMList/0/QuesList").respond({value: "validated"});
        $httpBackend.whenGET("./rest/QCMList").respond({value: "test"});
        $httpBackend.whenGET("./view/titres.html").respond({value: "test"});

        expect(mockService.get("MockRepQuest")).toEqual([ 0, 1, 2 ]);
        Repons.RepQuest = mockService.get('MockRepQuest');
        Repons.actualQcm={};
        Repons.actualQcm.id=0;
        expect(mockService.get("actualQcmQuestions")).toEqual( [ 0, 1, 4, 2, 5 ]);
        Repons.actualQcm.questions= mockService.get('actualQcmQuestions');
        Repons.actualQuestion = {};
        expect(mockService.get("actualQuestionReponses")).toEqual( [ 1, 2, 4 ]);
        Repons.actualQuestion.reponses = mockService.get('actualQuestionReponses');
        var save_length = Repons.actualQuestion.reponses.length;
        Repons.createAnswerEdit = "test";

        Repons.new();
        Repons.save(0);
        $httpBackend.flush();
        expect(Repons.actualQuestion.reponses.length).toBe(save_length+1 );


    })

});


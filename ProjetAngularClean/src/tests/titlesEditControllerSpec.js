describe('Titles Edit Tests', function() {
    beforeEach(module('QCM'));

    var ctrl, $loc, $scope, mockService;
    var  titleEdit;
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


    it('should be redirected if not logged', function () {
        //expect($loc.path()).toBe("/edit/index");
        titleEdit = ctrl('titlesEditController', {$scope: $scope});
        titleEdit.logged();
        expect($loc.path()).toEqual("/./splotch");
        //expect(mockService.mem).toEqual([{key:'loggedAs', value:"admin"}]);
    });
    it('Should have store admin into service', function () {
        titleEdit = ctrl('titlesEditController', {$scope: $scope});
        expect(titleEdit.mem).toEqual("admin");
        titleEdit.logged();
    });


    it('new(): Should create QCM', inject(function () {
        titleEdit = ctrl('titlesEditController', {$scope: $scope, $routeParams: {qcmId: 0}});
        expect(titleEdit.mem).toEqual("admin");
        titleEdit.logged();
        $httpBackend.expectPOST("../rest/QCMList").respond({value: "validated"});
        $httpBackend.whenGET("./rest/QCMList").respond({value: "test"});
        $httpBackend.whenGET("../../view/titres.html").respond({value: "test"});

        expect(mockService.get("MockqcmTable")).toEqual([1, 2, 3, 4]);
        $scope.qcmTable = mockService.get("MockqcmTable");

        // var result = mockUserResource.getUser('test');
        // expect(result[0].username).toEqual('test');
        titleEdit.new();
        $httpBackend.flush();
        titleEdit.createQcmInput = "Imen";

        expect(titleEdit.editedQcm).toBe(undefined);


    }));
    it('delete(): Should Delete QCM', inject(function () {
        titleEdit = ctrl('titlesEditController', {$scope: $scope, $routeParams: {qcmId: 0}});
        expect(titleEdit.mem).toEqual("admin");
        titleEdit.logged();
        $httpBackend.expectDELETE("../rest/QCMList/0").respond({value: "validated"});
        $httpBackend.whenGET("./rest/QCMList").respond({value: "test"});
        $httpBackend.whenGET("../../view/titres.html").respond({value: "test"});

        expect(mockService.get("MockqcmTable")).toEqual([1, 2, 3, 4]);
        $scope.qcmTable = mockService.get("MockqcmTable");
        titleEdit.actualQcm = {};
        titleEdit.actualQcm.id = 0;
        titleEdit.delete(0);
        $httpBackend.flush();
        expect(titleEdit.editedQcm).toBe(undefined);
    }));
    it('save():Should Save QCM', inject(function () {
        titleEdit = ctrl('titlesEditController', {$scope: $scope});
        expect(titleEdit.mem).toEqual("admin");
        titleEdit.logged();
        $httpBackend.whenGET("../rest/QCMList/1").respond({qcmId: 1});
        $httpBackend.whenGET("./rest/QCMList").respond({value: "validated"});
        $httpBackend.expectPOST("../rest/QCMList/1").respond({qcmId: 1});
        $httpBackend.whenGET("../../view/titres.html").respond({value: "test"});

        expect(mockService.get("MockqcmTable")).toEqual([1, 2, 3, 4]);
        $scope.qcmTable = mockService.get("MockqcmTable");
        titleEdit.editedQcm = "EDITEEED";
        titleEdit.qcmEdit = [];
        titleEdit.qcmEdit[1] = {};
        titleEdit.qcmEdit[1].Titre = "test";
        titleEdit.save(1);
        $httpBackend.flush();
        expect(titleEdit.editedQcm).toBe(undefined);
    }));
    it('Cancel():Should cancel and empty the input', inject(function () {
        titleEdit = ctrl('titlesEditController', {$scope: $scope});
        expect(titleEdit.mem).toEqual("admin");
        titleEdit.logged();
        titleEdit.cancel(1);
        expect(titleEdit.editedQcm).toBe(undefined);
    }));
    it('GoQCM():Should redirect to the selected QCM', inject(function () {
        titleEdit = ctrl('titlesEditController', {$scope: $scope});
        expect(titleEdit.mem).toEqual("admin");
        titleEdit.logged();
        titleEdit.goToQcm(1);
        expect($loc.path()).toBe("/edit/qcm/1");
        // expect(tit.editedQcm).toBe(undefined);
    }));
});
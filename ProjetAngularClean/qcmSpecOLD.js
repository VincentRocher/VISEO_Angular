describe('inscriptionController', function() {
    beforeEach(module('QCM'));

    var $controller;
    var $loc;
    var $httpBackend;

    var utilisateurIns = [{

            "Name":"Vincent",
            "Surname":"Vinc",
            "Birth":"04/09/1990",
            "Gendrer":"homme",
            "Postal":"2019",
            "Town":"france",
             "Nat":"Nat1"

    }];

    beforeEach(inject(function($rootScope,_$controller_, $location, $injector){
        // The injector unwraps the underscores (_) from around the parameter names when matching
        $controller = _$controller_;
        $loc = $location;
        $scope = $rootScope.$new();
        $location = jasmine.createSpyObj('$location', ['url']);
        $httpBackend = $injector.get('$httpBackend');



    }));
    afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });
    describe('Test Inscription:', function() {
        it('Test 1.1: Test Cancel', function() {

            var inscriptionController = $controller('inscriptionController', { $scope: $scope });
            $loc.path('/here');
            inscriptionController.cancel();
            console.log($loc.path());
            expect($loc.path()).toEqual('/index');
        });
        it('Test 1.1: test Post: rest/User on inscription.inscription()', inject(function($httpBackend) {
           // var inscriptionController = $controller('inscriptionController', { $scope: $scope });
            var inscriptionController = $controller('inscriptionController', { $scope: $scope,  $routeParams:[qcmId=0] });
            inscriptionController.utilisateurIns=[];
            inscriptionController.utilisateurIns.Name="Vincent";
            inscriptionController.utilisateurIns.Surname="Vinc";
            inscriptionController.utilisateurIns.Birth="04/09/1990";
            inscriptionController.utilisateurIns.Gendrer="homme";
            inscriptionController.utilisateurIns.Postal=2019;
            inscriptionController.utilisateurIns.Town="france";
            inscriptionController.utilisateurIns.Nat="Nat1";


            inscriptionController.inscription();
            inscriptionController.responseIns
            $httpBackend.expectPOST('./rest/User').respond();
            $httpBackend.flush();
        }));


/*
        it('should redirect to /redirect/to/url', inject(function($httpBackend,$routeParams) {
            var inscriptionController = $controller('inscriptionController', { $scope: $scope,  $routeParams:[qcmId=0] });
            //spyOn(inscriptionController, 'inscription').and.callThrough();

            // $scope.save();
            //$loc.path('/here');
            inscriptionController.utilisateurIns=[];
            inscriptionController.utilisateurIns.Name="Vincent";
            inscriptionController.utilisateurIns.Surname="Vinc";
            inscriptionController.utilisateurIns.Birth="04/09/1990";
            inscriptionController.utilisateurIns.Gendrer="homme";
            inscriptionController.utilisateurIns.Postal=2019;
            inscriptionController.utilisateurIns.Town="france";
            inscriptionController.utilisateurIns.Nat="Nat1";


            inscriptionController.inscription();

            $httpBackend.whenPOST('./rest/User').respond(200);
           // inscriptionController.responseIns.data._id=0;
          //  expect($loc.path).toHaveBeenCalledWith('/qcm/0/numq/0');

           // $httpBackend.flush();
            console.log("$loc.path()"+$loc.path);
           // expect($loc.url).toHaveBeenCalledWith('/qcm/0/numq/0');
            //expect($loc.path()).toEqual('/qcm/0/numq/0');
           // $httpBackend.whenPOST('/qcm/0/numq/0').passThrough();
        }));
        */
/*
        it('should contain a searchService',
            inject(function(sharedData) {
                //expect(searchService).not.to.equal(null);
                expect( sharedData.store).toHaveBeenCalled();
            }));
 */
    });

});

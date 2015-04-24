describe('titlesController', function() {
	beforeEach(module('QCM'));

	var $controller;
	var $loc;

	beforeEach(inject(function(_$controller_, $location){
		// The injector unwraps the underscores (_) from around the parameter names when matching
		$controller = _$controller_;
		$loc = $location;
	}));
	describe('goqcm', function() {
		it('Change the path to the new Qcm 1', function() {
			var $scope = {
					qcmTable: [
						{
							"id": "0",
							"Titre": "javascript",
							"questions": []
						}
					]
				}
				;
			var titlesController = $controller('titlesController', { $scope: $scope });
			$loc.path('/here');
			titlesController.goQcm(1);
			console.log($loc.path());
			expect($loc.path()).toEqual('/inscription/1');
		});
	});
});



describe('inscriptionController', function() {

	var $controller;
	var $loc;
	var value;
	beforeEach(function(done){
		setTimeout(function(){
			value = 0;
			done();
		},1)
	})
	beforeEach(module('QCM'));
	beforeEach(inject(function($rootScope ,_$controller_, $location){
		// The injector unwraps the underscores (_) from around the parameter names when matching
		$controller = _$controller_;
		$loc = $location;
		$scope = $rootScope.$new();
	}));
	describe("inscription", function(){
		it('inscription done and moved to qcm', function(){
			var $scope = {
					qcmTable: [
						{
							"id": "0",
							"Titre": "javascript",
							"questions": []
						}
					]
				}
				;
			var inscriptionController = $controller('inscriptionController', { $scope: $scope , $routeParams:{qcmId:0}});
			inscriptionController.utilisateurIns = [];
			inscriptionController.utilisateurIns.Name = "a";
			inscriptionController.utilisateurIns.Surname = "a";
			inscriptionController.utilisateurIns.Birth = "01/01/0001";
			inscriptionController.utilisateurIns.Nationality = "nat1";
			inscriptionController.utilisateurIns.Gender = "a";
			inscriptionController.utilisateurIns.Town = "a";
			inscriptionController.utilisateurIns.Postal = 1;
			$loc.path('/inscription/1');
			waitsFor( inscriptionController.inscription())
			{
				console.log($loc.path());
				return "inscription true";
			};
			console.log($loc.path());
			expect($loc.path()).toEqual('./qcm/1')


		})



	})









});
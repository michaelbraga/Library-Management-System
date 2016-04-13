'use strict';
(function(){
	angular
	.module('BorrowerApp')
	.controller("RecordsCtrl", RecordsCtrl);

	RecordsCtrl.$inject = ["$scope", "BorrowerService"];
	function RecordsCtrl($scope, BorrowerService){
		BorrowerService.GetRecords()
		.then(function (res) {
			$scope.borrows = res.data;
			console.log(res.data);
		});


	}
})();

'use strict';
(function(){
	angular
	.module('BorrowerApp')
	.controller("PendingRequestsCtrl", PendingRequestsCtrl);

	PendingRequestsCtrl.$inject = ["$scope", "BorrowerService"];
	function PendingRequestsCtrl($scope, BorrowerService){
		BorrowerService.GetBookRequests()
		.then(function (res) {
			$scope.borrows = res.data;
		});


	}
})();

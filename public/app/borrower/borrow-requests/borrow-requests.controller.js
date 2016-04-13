'use strict';
(function(){
	angular
	.module('BorrowerApp')
	.controller("BorrowRequestsCtrl", BorrowRequestsCtrl);

	BorrowRequestsCtrl.$inject = ["$scope", "BorrowerService"];
	function BorrowRequestsCtrl($scope, BorrowerService){
		BorrowerService.GetApprovedRequests()
		.then(function (res) {
			$scope.borrows = res.data;
		});
	}
})();

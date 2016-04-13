'use strict';
(function(){
	angular
	.module('BorrowerApp')
	.controller("DashboardCtrl", DashboardCtrl);

	DashboardCtrl.$inject = ["$scope", "BorrowerService"];
	function DashboardCtrl($scope, BorrowerService){
		function getPenalty (bdue) {
			var day = 86400000; // one day in milliseconds
			var now = new Date();
			var duedate = new Date(bdue);
			var penalty = Math.round(((now.getTime() - duedate.getTime())/(day)));
			return penalty;
		}

		BorrowerService.GetRecords()
		.then(function (res) {
			$scope.no_acc_req = res.data.length;
		});
		BorrowerService.GetBookRequests()
		.then(function (res) {
			$scope.no_bor_req = res.data.length;
		});
		BorrowerService.GetApprovedRequests()
		.then(function (res) {
			$scope.no_app_bor = res.data.length;
		});
		BorrowerService.GetBorrowedBooks()
		.then(function (res) {
			for (var i = 0, num = 0; i < res.data.length; i++) {
				if(getPenalty(res.data[i].bdue)>=0){
					num++;
				}
			}
			$scope.no_due_books = num;
		});


	}
})();

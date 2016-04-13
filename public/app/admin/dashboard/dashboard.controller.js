'use strict';
(function(){
	angular
	.module('AdminApp')
	.controller("DashboardCtrl", DashboardCtrl);

	DashboardCtrl.$inject = ["$scope", "AdminService"];
	function DashboardCtrl($scope, AdminService){

		function getPenalty (bdue) {
			var day = 86400000; // one day in milliseconds
			var now = new Date();
			var duedate = new Date(bdue);
			var penalty = Math.round(((now.getTime() - duedate.getTime())/(day)));
			return penalty;
		}

		AdminService.GetAllAccountRequests()
		.then(function (res) {
			$scope.no_acc_req = res.data.length;
		});
		AdminService.GetBookRequests()
		.then(function (res) {
			$scope.no_bor_req = res.data.length;
		});
		AdminService.GetApprovedBookRequests()
		.then(function (res) {
			$scope.no_app_bor = res.data.length;
		});
		AdminService.GetBorrowedBooks()
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

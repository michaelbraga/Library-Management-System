'use strict';

(function(){
	angular
	.module('AdminApp')
	.controller("ApprovedBookRequestsCtrl", ApprovedBookRequestsCtrl);

	ApprovedBookRequestsCtrl.$inject = ["$scope", "$http", "AdminService"];
	function ApprovedBookRequestsCtrl($scope, $http, AdminService){

		AdminService.GetApprovedBookRequests()
		.then(function (res) {
			$scope.borrows = res.data;
		});
		$scope.lendBook = function (borrower_id, book_id, dreq) {
			if (confirm('Are you sure?')) {
				var duedate = $('#'+borrower_id + book_id + dreq).val();
				AdminService.LendBook(borrower_id, book_id, dreq, duedate)
				.then(function (res) {
					if (res.status == 'success') {
						alert("Successful!");
						var index = -1;
						for(var i = 0, len = $scope.borrows.length; i < len; i++) {
						    if ($scope.borrows[i] &&
							    $scope.borrows[i].borrower_id == borrower_id
						    		&& $scope.borrows[i].book_id == book_id
								&& $scope.borrows[i].dreq == dreq) {
							 $scope.borrows.splice(i, 1);
						    }
						}
					}
				});
			}
		}
		$scope.getDateNow = function () {
			var d = new Date();
			d.setDate(d.getDate()+1);
			var curr_month = d.getMonth() + 1;
			var curr_date = (d.getDate()/10) >= 1 ? d.getDate() : ("0" + d.getDate());
			var curr_year = d.getFullYear();
			return(curr_year + "-" + curr_month + "-" + curr_date);
		}
	}

})();

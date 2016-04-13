'use strict';
(function(){
	angular
	.module('AdminApp')
	.controller("BookRequestsCtrl", BookRequestsCtrl);

	BookRequestsCtrl.$inject = ["$scope", "$http", "AdminService"];
	function BookRequestsCtrl($scope, $http, AdminService){

		function findIndexByInfo(bor_id, b_id, dreq){
			var a = bor_id, b= b_id, c=dreq;
			for(var i = 0, len = $scope.borrows.length; i < len; i++) {
			    if ($scope.borrows[i].borrower_id == a && $scope.borrows[i].book_id == b && $scope.borrows[i].dreq == c) {
				  return i;
			    }
			}
			return -1;
		}
		AdminService.GetBookRequests()
		.then(function (res) {
			$scope.borrows = res.data;
		});

		$scope.approve = function (bor_id, b_id, dreq) {
			if (confirm('Are you sure?')) {
				AdminService.ApproveBookRequest(bor_id, b_id, dreq)
				.then(function (res) {
					if(res.status == 'success'){
						alert("Success!");
						var index = findIndexByInfo(bor_id, b_id, dreq);
						if (index != -1) {
							$scope.borrows.splice(index, 1);
						}
					}else{
						alert("Book is reserved for another user!");
					}
				});
			}
		}
		$scope.remove = function (bor_id, b_id, dreq) {
			if (confirm('Are you sure in rejecting this request?')) {
				AdminService.RejectBookRequest(bor_id, b_id, dreq)
				.then(function (res) {
					if(res.status == 'success'){
						alert('Success!');
						var index = findIndexByInfo(bor_id, b_id, dreq);
						if (index != -1) {
							$scope.borrows.splice(index, 1);
						}
					}
				});
			}
		}
	}
})();

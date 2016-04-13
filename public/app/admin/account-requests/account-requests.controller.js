'use strict';
(function(){
	angular
	.module('AdminApp')
	.controller("AccountRequestsCtrl", AccountRequestsCtrl);

	AccountRequestsCtrl.$inject = ["$scope", "$http", "AdminService"];
	function AccountRequestsCtrl($scope, $http, AdminService){

		function findIndexById(searchTerm){
			for(var i = 0, len = $scope.borrowers.length; i < len; i++) {
			    if ($scope.borrowers[i].borrower_id == searchTerm) {
				 return i;
			    }
			}
			return -1;
		}

		AdminService.GetAllAccountRequests()
		.then(function (response) {
			$scope.borrowers = response.data;
		});

		$scope.approve = function (id) {
			if (confirm('Are you sure?')) {
				AdminService.ApproveBorrower(id)
				.then(function (res) {
					if (res) {
						alert('Success!');
						var index = findIndexById(id);
						if (index != -1) {
							$scope.borrowers.splice(index, 1);
						}
					}
				});
			}
		}
		$scope.remove = function (id) {
			if(confirm('Are you sure you want this account be removed?')){
				$http.delete('/api/admin/borrower/delete/'+id)
				.then(function (res) {
					if (res.status == 200) {
						alert('Success!');
						var index = findIndexById(id);
						if (index != -1) {
							$scope.borrowers.splice(index, 1);
						}
					}
				});
			}
		}
	}
})();

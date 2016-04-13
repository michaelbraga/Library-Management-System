'use strict';
(function(){
	angular
	.module('AdminApp')
	.controller("ViewRecordsCtrl", ViewRecordsCtrl);

	ViewRecordsCtrl.$inject = ["$scope", "$http", "AdminService"];
	function ViewRecordsCtrl($scope, $http, AdminService){
		AdminService.GetRecords()
		.then(function (response) {
			$scope.borrows = response.data;
		});

	}
})();

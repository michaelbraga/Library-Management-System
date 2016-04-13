'use strict';
(function(){
	angular
	.module('AdminApp')
	.controller("ViewStudentsCtrl", ViewStudentsCtrl);

	ViewStudentsCtrl.$inject = ["$scope", "$http", "AdminService"];
	function ViewStudentsCtrl($scope, $http, AdminService){
		AdminService.GetApprovedBorrowers()
		.then(function (response) {
			var students = response.data;
			$scope.borrowers = [];
			for (var i = 0; i < students.length; i++) {
				if(students[i].inst == null){
					$scope.borrowers.push(students[i]);
				}
			}
		});
	}
})();

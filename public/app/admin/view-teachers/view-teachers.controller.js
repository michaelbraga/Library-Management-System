'use strict';
(function(){
	angular
	.module('AdminApp')
	.controller("ViewTeachersCtrl", ViewTeachersCtrl);

	ViewTeachersCtrl.$inject = ["$scope", '$http', "AdminService"];
	function ViewTeachersCtrl($scope, $http, AdminService){
		AdminService.GetApprovedBorrowers()
		.then(function (response) {
			var students = response.data;
			$scope.borrowers = [];
			for (var i = 0; i < students.length; i++) {
				if(students[i].degcor == null){
					$scope.borrowers.push(students[i]);
				}
			}
		});
	}
})();

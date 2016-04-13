'use strict';
(function(){
	angular
	.module('BorrowerApp')
	.controller("BorrowedBooksCtrl", BorrowedBooksCtrl);

	BorrowedBooksCtrl.$inject = ["$scope", "BorrowerService"];
	function BorrowedBooksCtrl($scope, BorrowerService){
		BorrowerService.GetBorrowedBooks()
		.then(function (response) {
			$scope.books = response.data;
		});

		$scope.getPenalty = function (bdue) {
			var day = 86400000; // one day in milliseconds
			var now = new Date();
			var duedate = new Date(bdue);
			var penalty = Math.round(((now.getTime() - duedate.getTime())/(day)));
			return penalty;
		}
	}
})();

'use strict';
(function(){
	angular
	.module('AdminApp')
	.controller("ViewBorrowedCtrl", ViewBorrowedCtrl);

	ViewBorrowedCtrl.$inject = ["$scope", "$http", "AdminService"];
	function ViewBorrowedCtrl($scope, $http, AdminService){
		AdminService.GetBorrowedBooks()
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
		$scope.acceptBook = function (dreq, borrower_id, book_id) {
			if (confirm('Are you sure?')) {
				var loc = $('#'+dreq+borrower_id+book_id).val();
				AdminService.ReturnToShelf(dreq, borrower_id, book_id, loc)
				.then(function (response) {
					if (response.status == 'success') {
						alert('Success');
						console.log(borrower_id);
						var index = -1;
						for(var i = 0, len = $scope.books.length; i < len; i++) {
							console.log($scope.books[i].borrower_id);
								
						    if ($scope.books[i].borrower_id == borrower_id
						    		&& $scope.books[i].book_id == book_id
								&& $scope.books[i].dreq == dreq) {
							 $scope.books.splice(i, 1);
						    }
						}
					}
				});
			}

		}
	}
})();

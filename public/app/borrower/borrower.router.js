'use strict';
(function(){
	angular
		.module('BorrowerApp', ["ngRoute"]) //creates an app module
		.config(config);

		config.$inject = ["$routeProvider"];

		function config($routeProvider){
			$routeProvider
			.when("/dashboard",{
				"controller": "DashboardCtrl",
				"templateUrl":  "/app/borrower/dashboard/dashboard.view.html"
			})
			.when("/available-books",{
				"controller": "AvailableBooksCtrl",
				"templateUrl":  "/app/borrower/available-books/available-books.view.html"
			})
			.when("/borrow-requests",{
				"controller": "BorrowRequestsCtrl",
				"templateUrl":  "/app/borrower/borrow-requests/borrow-requests.view.html"
			})
			.when("/pending-requests",{
				"controller": "PendingRequestsCtrl",
				"templateUrl":  "/app/borrower/pending-requests/pending-requests.view.html"
			})
			.when("/borrowed-books",{
				"controller": "BorrowedBooksCtrl",
				"templateUrl":  "/app/borrower/borrowed-books/borrowed-books.view.html"
			})
			.when("/records",{
				"controller": "RecordsCtrl",
				"templateUrl":  "/app/borrower/records/records.view.html"
			})
			.when("/search-book",{
				"controller": "SearchBookCtrl",
				"templateUrl":  "/app/borrower/search-book/search-book.view.html"
			})
			.otherwise({"redirectTo":"/dashboard"});
		}
})();

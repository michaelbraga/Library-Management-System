'use strict';
(function(){
	angular
		.module('AdminApp', ["ngRoute"]) //creates an app module
		.config(config);

		config.$inject = ["$routeProvider"];

		function config($routeProvider){
			$routeProvider
			.when("/dashboard",{
				"controller": "DashboardCtrl",
				"templateUrl":  "/app/admin/dashboard/dashboard.view.html"
			})

			.when("/add-book",{
				"controller": "AddBookCtrl",
				"templateUrl":  "/app/admin/add-book/add-book.view.html"
			})
			.when("/view-borrowed",{
				"controller": "ViewBorrowedCtrl",
				"templateUrl":  "/app/admin/view-borrowed/view-borrowed.view.html"
			})
			.when("/view-available",{
				"controller": "ViewAvailableCtrl",
				"templateUrl":  "/app/admin/view-available/view-available.view.html"
			})
			.when("/search-book",{
				"controller": "SearchBookCtrl",
				"templateUrl":  "/app/admin/search-book/search-book.view.html"
			})

			.when("/view-students",{
				"controller": "ViewStudentsCtrl",
				"templateUrl":  "/app/admin/view-students/view-students.view.html"
			})
			.when("/view-teachers",{
				"controller": "ViewTeachersCtrl",
				"templateUrl":  "/app/admin/view-teachers/view-teachers.view.html"
			})

			.when("/approved-book-requests",{
				"controller": "ApprovedBookRequestsCtrl",
				"templateUrl":  "/app/admin/approved-book-requests/approved-book-requests.view.html"
			})
			.when("/book-requests",{
				"controller": "BookRequestsCtrl",
				"templateUrl":  "/app/admin/book-requests/book-requests.view.html"
			})
			.when("/account-requests",{
				"controller": "AccountRequestsCtrl",
				"templateUrl":  "/app/admin/account-requests/account-requests.view.html"
			})

			.when("/view-records",{
				"controller": "ViewRecordsCtrl",
				"templateUrl":  "/app/admin/view-records/view-records.view.html"
			})
			.when("/all-books",{
				"controller": "AllBooksCtrl",
				"templateUrl":  "/app/admin/all-books/all-books.view.html"
			})
			.otherwise({"redirectTo":"/dashboard"});
		}
})();

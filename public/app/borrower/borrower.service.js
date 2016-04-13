'use strict';

(function(){
	angular
		.module("BorrowerApp")
		.factory("BorrowerService", BorrowerService);

	BorrowerService.$inject = ["$http", "$q"];

	function BorrowerService($http, $q) {
		var url = "http://localhost:3000";
		var service = {};

		function GetAllAvailableBooks() {
			var deferred = $q.defer();
			$http.get('/api/borrower/book/available')
			.success(function(data) {
				deferred.resolve(data);
			})
			.error(function (data) {
				deferred.reject("Error: Cannot Retrieve Available Books");
			});
			return deferred.promise;
		}
		function GetAuthors(id) {
			var deferred = $q.defer();
			$http.get('/api/borrower/book/authors/'+ id)
			.success(function(data) {
				deferred.resolve(data);
			})
			.error(function (data) {
				deferred.reject("Error: Cannot Retrieve Book Author for "+ id);
			});
			return deferred.promise;
		}
		function GetBorrowedBooks() {
			var deferred = $q.defer();
			$http.get('/api/borrower/book/borrowed/')
			.success(function(data) {
				deferred.resolve(data);
			})
			.error(function (data) {
				deferred.reject("Error: Cannot Retrieve Available Books");
			});
			return deferred.promise;
		}
		function GetBookRequests() {
			var deferred = $q.defer();
			$http.get('/api/borrower/book-request/pending')
			.success(function(data) {
				deferred.resolve(data);
				console.log(data);
			})
			.error(function (data) {
				deferred.reject("Error: Cannot Retrieve Available Books");
			});
			return deferred.promise;
		}
		function GetApprovedRequests() {
			var deferred = $q.defer();
			$http.get('/api/borrower/book-request/approved')
			.success(function(data) {
				deferred.resolve(data);
			})
			.error(function (data) {
				deferred.reject("Error: Cannot Retrieve Available Books");
			});
			return deferred.promise;
		}
		function GetRecords() {
			var deferred = $q.defer();
			$http.get('/api/borrower/records')
			.success(function(data) {
				deferred.resolve(data);
			})
			.error(function (data) {
				deferred.reject("Error: Cannot Retrieve Available Books");
			});
			return deferred.promise;
		}
		function RequestBook(b_id) {
			var deferred = $q.defer();
			$http.post('/api/borrower/request/book/'+b_id)
			.success(function(data) {
				deferred.resolve(data);
			})
			.error(function (data) {
				deferred.reject("Error: Cannot Retrieve Available Books");
			});
			return deferred.promise;
		}

		function FindBooksWithTitle(query) {
			var deferred = $q.defer();
			$http.get('/api/borrower/searchTitle/'+query)
			.success(function(data) {
				deferred.resolve(data);
			})
			.error(function (data) {
				deferred.reject("Error: Cannot Retrieve Available Books");
			});
			return deferred.promise;
		}
		function FindBooksWithAuthor(query) {
			var deferred = $q.defer();
			$http.get('/api/borrower/searchAuthor/'+query)
			.success(function(data) {
				deferred.resolve(data);
			})
			.error(function (data) {
				deferred.reject("Error: Cannot Retrieve Available Books");
			});
			return deferred.promise;
		}


		service.GetAllAvailableBooks = GetAllAvailableBooks;
		service.GetAuthors = GetAuthors;
		service.GetBorrowedBooks = GetBorrowedBooks;
		service.GetBookRequests = GetBookRequests;
		service.GetApprovedRequests = GetApprovedRequests;
		service.GetRecords = GetRecords;
		service.RequestBook = RequestBook;
		service.FindBooksWithTitle = FindBooksWithTitle;
		service.FindBooksWithAuthor = FindBooksWithAuthor;

		return service;
	}
})();

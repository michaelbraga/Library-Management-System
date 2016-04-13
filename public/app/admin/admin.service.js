'use strict';

(function(){
	angular
		.module("AdminApp")
		.factory("AdminService", AdminService);

	AdminService.$inject = ["$http", "$q"];

	function AdminService($http, $q) {
		var url = "http://localhost:3000";
		var service = {};

		// ACCOUNT REQUESTS =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
		function GetAllAccountRequests() {
			console.log("Pasok!");
			var deferred = $q.defer();
			$http.get(url + "/api/admin/borrower/requests")
			.success(function(data) {
				console.log("Pasok! S");
				deferred.resolve(data);
			})
			.error(function (data) {
				console.log("Pasok! E");
				deferred.reject("Error: Cannot Retrieve Account Requests");
			});
			return deferred.promise;
		}
		function ApproveBorrower(id) {
			var deferred = $q.defer();
			$http.put('/api/admin/borrower/approve-borrower/'+id)
			.success(function(data) {
				deferred.resolve(data);
			})
			.error(function (data) {
				deferred.reject("Error: Cannot Approve Account");
			});
			return deferred.promise;
		}
		function RejectBorrower(id) {
			var deferred = $q.defer();
			$http.delete('/api/admin/borrower/delete/'+id)
			.success(function(data) {
				deferred.resolve(data);
			})
			.error(function (data) {
				deferred.reject("Error: Cannot Reject Account");
			});
			return deferred.promise;
		}

		// ADD BOOK =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
		function AddBook(book_data) {
			var deferred = $q.defer();
			$http.post('/api/admin/book/add', book_data)
			.success(function(data) {
				deferred.resolve(data);
			})
			.error(function (data) {
				deferred.reject("Error: Cannot Add Book");
			});
			return deferred.promise;
		}
		function AddAuthor(author) {
			var deferred = $q.defer();
			$http.post('/api/admin/book/add/author/', author)
			.success(function(data) {
				deferred.resolve(data);
			})
			.error(function (data) {
				deferred.reject("Error: Cannot Add Author");
			});
			return deferred.promise;
		}


		function GetAllBooks() {
			var deferred = $q.defer();
			$http.get(url + "/api/admin/book")
			.success(function(data) {
				deferred.resolve(data);
			})
			.error(function (data) {
				deferred.reject("Error: Cannot Retrieve All Books");
			});
			return deferred.promise;
		}

		function GetRecordsOfOne(id) {
			var deferred = $q.defer();
			$http.get(url + "/api/admin/borrows/record/"+id)
			.success(function(data) {
				deferred.resolve(data);
			})
			.error(function (data) {
				deferred.reject("Error: Cannot Retrieve All Records of a specific id");
			});
			return deferred.promise;
		}
		function GetOneBook(id) {
			console.log("Serice: " +id);
			var deferred = $q.defer();
			$http.get(url + "/api/admin/book/one/"+id)
			.success(function(data) {
				deferred.resolve(data);
			})
			.error(function (data) {
				deferred.reject("Error: Cannot Retrieve a Book");
			});
			return deferred.promise;
		}
		function RemoveBook(book_id) {
			var deferred = $q.defer();
			$http.delete('/api/admin/delete/book/'+book_id)
			.success(function(data) {
				deferred.resolve(data);
			})
			.error(function (data) {
				deferred.reject("Error: Cannot Delete Book");
			});
			return deferred.promise;
		}
		function EditBook(book) {
			var deferred = $q.defer();
			$http.put('/api/admin/edit/book/'+book.real_id, book)
			.success(function(data) {
				deferred.resolve(data);
			})
			.error(function (data) {
				deferred.reject("Error: Cannot Edit Book");
			});
			return deferred.promise;
		}

		// APPROVED BOOK REQUESTS =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
		function GetApprovedBookRequests() {
			var deferred = $q.defer();
			$http.get('/api/admin/borrows/approved')
			.success(function(data) {
				deferred.resolve(data);
			})
			.error(function (data) {
				deferred.reject("Error: Cannot Retrieve Approved Book Requests");
			});
			return deferred.promise;
		}
		function LendBook(borrower_id, book_id, dreq, duedate) {
			var deferred = $q.defer();
			$http.put('/api/admin/borrows/lend/'+dreq+'/'+borrower_id+'/'+book_id+'/', {bdue:duedate})
			.success(function(data) {
				deferred.resolve(data);
			})
			.error(function (data) {
				deferred.reject("Error: Cannot Lend Book");
			});
			return deferred.promise;
		}
		// BOOK REQUESTS =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
		function GetBookRequests() {
			var deferred = $q.defer();
			$http.get('/api/admin/borrows/requests')
			.success(function(data) {
				deferred.resolve(data);
			})
			.error(function (data) {
				deferred.reject("Error: Cannot Retrieve Book Requests");
			});
			return deferred.promise;
		}
		function ApproveBookRequest(bor_id, b_id, dreq) {
			var deferred = $q.defer();
			$http.put('/api/admin/borrows/approve/'+dreq+'/'+bor_id+'/'+b_id)
			.success(function(data) {
				deferred.resolve(data);
			})
			.error(function (data) {
				deferred.reject("Error: Cannot Approve Book Requests");
			});
			return deferred.promise;
		}
		function RejectBookRequest(bor_id, b_id, dreq) {
			var deferred = $q.defer();
			$http.delete('/api/admin/borrows/delete/'+dreq+'/'+bor_id+'/'+b_id)
			.success(function(data) {
				deferred.resolve(data);
			})
			.error(function (data) {
				deferred.reject("Error: Cannot Reject Book Requests");
			});
			return deferred.promise;
		}

		// DASHBOARD =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=

		// SEARCH BOOK =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
		function FindBooksWithTitle(searchQuery) {
			var deferred = $q.defer();
			$http.get('/api/admin/book/searchTitle/'+searchQuery)
			.success(function(data) {
				deferred.resolve(data);
			})
			.error(function (data) {
				deferred.reject("Error: Cannot Retrieve Books");
			});
			return deferred.promise;
		}
		function FindBooksWithAuthor(searchQuery) {
			var deferred = $q.defer();
			$http.get('/api/admin/book/searchAuthor/'+searchQuery)
			.success(function(data) {
				deferred.resolve(data);
			})
			.error(function (data) {
				deferred.reject("Error: Cannot Retrieve Books");
			});
			return deferred.promise;
		}

		// VIEW AVAILABLE =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
		function GetAllAvailableBooks() {
			var deferred = $q.defer();
			$http.get('/api/admin/book/available')
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
			$http.get('/api/admin/book/authors/'+ id)
			.success(function(data) {
				deferred.resolve(data);
			})
			.error(function (data) {
				deferred.reject("Error: Cannot Retrieve Book Author for "+ id);
			});
			return deferred.promise;
		}
		function DeleteAuthors(id) {
			var deferred = $q.defer();
			$http.delete('/api/admin/book/authors/'+ id)
			.success(function(data) {
				deferred.resolve(data);
			})
			.error(function (data) {
				deferred.reject("Error: Cannot Delete Book Author for "+ id);
			});
			return deferred.promise;
		}

		// VIEW BORROWED =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
		function GetBorrowedBooks() {
			var deferred = $q.defer();
			$http.get('/api/admin/book/borrowed')
			.success(function(data) {
				deferred.resolve(data);
			})
			.error(function (data) {
				deferred.reject("Error: Cannot Retrieve Borrowed Books");
			});
			return deferred.promise;
		}
		function ReturnToShelf(dreq, borrower_id, book_id, loc) {
			var deferred = $q.defer();
			$http.put('/api/admin/borrows/accept/'+dreq+'/'+borrower_id+'/'+book_id+'/',{bloc:loc})
			.success(function(data) {
				deferred.resolve(data);
			})
			.error(function (data) {
				deferred.reject("Error: Cannot Return Borrowed Books");
			});
			return deferred.promise;
		}

		// VIEW RECORDS =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
		function GetRecords() {
			var deferred = $q.defer();
			$http.get('/api/admin/borrows/records')
			.success(function(data) {
				deferred.resolve(data);
			})
			.error(function (data) {
				deferred.reject("Error: Cannot Retrieve Records");
			});
			return deferred.promise;
		}

		// VIEW Borrowers =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
		function GetApprovedBorrowers() {
			var deferred = $q.defer();
			$http.get('/api/admin/borrower/approved')
			.success(function (res) {
				deferred.resolve(res);
			})
			.error(function (res) {
				deferred.reject("Error: Cannot Retrieve Student Borrowers");
			});
			return deferred.promise;
		}


		service.GetAllAccountRequests = GetAllAccountRequests;
		service.ApproveBorrower = ApproveBorrower;
		service.RejectBorrower = RejectBorrower;

		service.AddBook = AddBook;
		service.AddAuthor = AddAuthor;

		service.GetApprovedBookRequests = GetApprovedBookRequests;
		service.LendBook = LendBook;

		service.GetAllAvailableBooks = GetAllAvailableBooks;
		service.GetAuthors = GetAuthors;

		service.FindBooksWithTitle = FindBooksWithTitle;
		service.FindBooksWithAuthor = FindBooksWithAuthor;

		service.GetBorrowedBooks = GetBorrowedBooks;
		service.ReturnToShelf = ReturnToShelf;

		service.GetBookRequests = GetBookRequests;
		service.ApproveBookRequest = ApproveBookRequest;
		service.RejectBookRequest = RejectBookRequest;

		service.GetRecords = GetRecords;
		service.GetApprovedBorrowers = GetApprovedBorrowers;
		service.GetAllBooks = GetAllBooks;
		service.RemoveBook = RemoveBook;

		service.EditBook = EditBook;
		service.DeleteAuthors = DeleteAuthors;

		service.GetOneBook = GetOneBook;
		service.GetRecordsOfOne = GetRecordsOfOne;
		return service;
	}
})();

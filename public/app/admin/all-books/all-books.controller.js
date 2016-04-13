'use strict';

function ipakitaAngAuthor(num) {
	var element = '<div class="form-group row" > ' +
				'<label for="authname">First Name</label> ' +
				'<input type="text" class="form-control" akin=\'fname\' placeholder="Author First Name" maxlength="20" required/> ' +
			 	' </div> ' +
			 ' <div class="form-group row" > ' +
				'<label for="authname">Last Name</label> ' +
				'<input type="text" class="form-control" akin=\'lname\' placeholder="Author Last Name" maxlength="20" required/> ' +
			 	' </div><hr class="lines"/> ' ;
	var el = '';
	for (var i = 0; i < num; i++) {
		el += element;
	}
	console.log(element);
	$('div#dito').empty();
	$('div#dito').html(el);
}
(function(){
	angular
	.module('AdminApp')
	.controller("AllBooksCtrl", AllBooksCtrl);

	AllBooksCtrl.$inject = ["$scope", "AdminService"];
	function AllBooksCtrl($scope, AdminService){
		$scope.authors = [];
		$scope.books = [];

		AdminService.GetAllBooks()
		.then(function (res) {
			$scope.books = res.data;
		});
		$scope.removeBook = function (book) {
			AdminService.GetRecordsOfOne(book.book_id)
			.then(function (res) {
				console.log(res);
				if(res.status != 'not_found'){
					alert("Cannot edit book that is existing in records");
				}else{
					if (confirm("Are you sure?")) {
						AdminService.RemoveBook(book.book_id)
						.then(function (res) {
							if (res.status == 'success') {
								alert("Removed successfully!");
								$scope.books.splice($scope.books.indexOf(book), 1);
							}else{
								alert("Sorry, but book is in records.");
							}
						});
					}
				}
			});

		}
		$scope.editBook = function (book) {
			$scope.edit_book = {
				book_id: book.book_id,
				btitle: book.btitle,
				bpub: book.bpub,
				btype: book.btype,
				real_id: book.book_id,
				obj: book
			};

			AdminService.GetAuthors(book.book_id)
			.then(function (res) {
				$('#ss').val(res.data.length);
				ipakitaAngAuthor(res.data.length);

				var a = [];
				res.data.sort();
				for (var i = (res.data.length - 1); i >= 0 ; i--) {
					a.push(res.data[i].authlname);
					a.push(res.data[i].authfname);

				}
				$('input[akin]').each(function () {
					$(this).val(a.pop());
				});
			});
		}
		$scope.putBook = function () {
			AdminService.GetRecordsOfOne($scope.edit_book.real_id)
			.then(function (res) {
				console.log(res);
				if(res.status != 'not_found'){
					alert("Cannot edit book that is existing in records");
				}else{
					var a = [], authors = [];
					$('input[akin]').each(function () {
						a.push($(this).val());
					});
					var o = a.length/2;
					for (var i = 0; i < o; i++) {
						var auth = {authfname:'', authlname:'', book_id:''};
						auth.authlname = a.pop();
						auth.authfname = a.pop();
						auth.book_id = $scope.edit_book.book_id;
						authors.push(auth);
					}
					AdminService.DeleteAuthors($scope.edit_book.real_id);

					AdminService.EditBook($scope.edit_book)
					.then(function (res) {
						if(res.status == 'success'){
							for (var i = 0; i < authors.length; i++) {
								AdminService.AddAuthor(authors[i]);
							}
							ipakitaAngAuthor(0);
							AdminService.GetOneBook($scope.edit_book.book_id)
							.then(function (res) {
								console.log(res);
								$scope.books[$scope.books.indexOf($scope.edit_book.obj)] = res.data;
								$scope.edit_book = {
									book_id:'',
									btitle: '',
									bpub: '',
									btype: '',
									real_id: ''
								};
								alert('Edited book successfully!');
								$('button[data-dismiss="modal"]').trigger("click");
							});
						}
					});
				}
			});
		}

		$scope.toggleAuthor = function (id) {
			if($('#'+id).html() != 'Hide Author(s)'){
				$('#'+id).html('Hide Author(s)');
				var searchTerm = id ,index = -1;
				for(var i = 0, len = $scope.books.length; i < len; i++) {
				    if ($scope.books[i].book_id === searchTerm) {
				        index = i;
				        break;
				    }
				}
				AdminService.GetAuthors(id)
				.then(function (res) {
					if(res.data.length == 0){
						$scope.books[index].authors = [{authfname:'Not applicable'}];
					}else {
						$scope.books[index].authors = res.data;

					}
				});
			}else{
				$('#'+id).html('Show Author(s)');
				var searchTerm = id ,index = -1;
				for(var i = 0, len = $scope.books.length; i < len; i++) {
				    if ($scope.books[i].book_id === searchTerm) {
				        index = i;
				        break;
				    }
				}
				$scope.books[index].authors = [];
			}

		}


	}
})();

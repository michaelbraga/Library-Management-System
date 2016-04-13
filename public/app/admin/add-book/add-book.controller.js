'use strict';
(function(){
	angular
	.module('AdminApp')
	.controller("AddBookCtrl", AddBookCtrl);

	AddBookCtrl.$inject = ["$scope", "$http", "AdminService"];
	function AddBookCtrl($scope, $http, AdminService){
		$scope.addBook = function () {
			var a = [], authors = [];
			$('input[akin]').each(function () {
				a.push($(this).val());
			});
			var o = a.length/2;
			for (var i = 0; i < o; i++) {
				var auth = {authfname:'', authlname:'', book_id:''};
				auth.authlname = a.pop();
				auth.authfname = a.pop();
				auth.book_id = $scope.book.book_id;
				authors.push(auth);
			}
			var book_data = {
				book_id: '',
				btitle: '',
				bpub: '',
				btype: '',
				bloc: ''
			};
			AdminService.AddBook($scope.book)
			.then(function (response) {
				if (response.status == 'success') {
					for (var i = 0; i < authors.length; i++) {
						AdminService.AddAuthor(authors[i]);
					}
					$('input').val("");
					$scope.book = book_data;
					alert("Added successfully!");
				}else{
					alert("Book ID already exists!");
				}
			});
		}
	}
})();

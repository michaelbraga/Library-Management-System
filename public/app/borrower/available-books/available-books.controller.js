'use strict';
(function(){
	angular
	.module('BorrowerApp')
	.controller("AvailableBooksCtrl", AvailableBooksCtrl);

	AvailableBooksCtrl.$inject = ["$scope", "BorrowerService"];
	function AvailableBooksCtrl($scope, BorrowerService){
		$scope.authors = [];
		$scope.books = [];

		BorrowerService.GetAllAvailableBooks()
		.then(function (response) {
			var b = response.data;
			for (var i = 0; i < b.length; i++) {
				var book = {
					book_id:b[i].book_id,
					btitle:b[i].btitle,
					bpub:b[i].bpub,
					btype:b[i].btype,
					bloc:b[i].bloc,
					authors:[]
				};
				var a;
				$scope.books.push(book);
			}

		});
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
				BorrowerService.GetAuthors(id)
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
		$scope.requestBook = function (b_id) {
			if (confirm("Request book?")) {
				BorrowerService.RequestBook(b_id)
				.then(function (data) {
					if (data.status == 'error') {
						alert("Book already requested!");
					}else{
						alert("Successful!");

					}
				});
			}


		}


	}
})();

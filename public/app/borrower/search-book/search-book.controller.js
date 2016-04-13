'use strict';
function showBookTable() {
	$("#authorTable").hide();
	$("#bookTable").show();
}
function showAuthorTable() {
	$("#bookTable").hide();
	$("#authorTable").show();
}
(function(){
	angular
	.module('BorrowerApp')
	.controller("SearchBookCtrl", SearchBookCtrl);

	SearchBookCtrl.$inject = ["$scope", "BorrowerService"];
	function SearchBookCtrl($scope, BorrowerService){
		$scope.searchQuery = "";
		$scope.authors = [];
		$scope.books = [];
		$("#bookTable").hide();
		$("#authorTable").hide();

		$scope.searchBook = function (query) {
			$scope.booktitle = "";
			$scope.authorname = "";
			$scope.searchQuery = query;
			$scope.books = [];
			showBookTable();
			BorrowerService.FindBooksWithTitle(query)
			.then(function (response) {
				if (response.status = 'success') {
					var b = response.data;
					for (var i = 0; i < b.length; i++) {
						var book = {
							book_id:b[i].book_id,
							btitle:b[i].btitle,
							bpub:b[i].bpub,
							btype:b[i].btype,
							bloc:b[i].bloc,
							authors:[],
							bdue:b[i].bdue,
							booktype: b[i].booktype
						};
						var a;
						$scope.books.push(book);
					}
				}
			});

		}

		$scope.searchAuthor = function (query) {
			$scope.booktitle = "";
			$scope.authorname = "";
			$scope.searchQuery = query;
			showAuthorTable();
			BorrowerService.FindBooksWithAuthor(query)
			.then(function (response) {
				if (response.status = 'success') {
					$scope.authors = response.data;
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


	}
})();

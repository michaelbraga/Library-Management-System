'use strict';
(function(){
	angular
	.module('AdminApp')
	.controller("ViewAvailableCtrl", ViewAvailableCtrl);

	ViewAvailableCtrl.$inject = ["$scope", "$http", "AdminService"];
	function ViewAvailableCtrl($scope, $http, AdminService){
		$scope.authors = [];
		$scope.books = [];

		AdminService.GetAllAvailableBooks()
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

'use strict';
function choose(name) {
	if(!($("li#"+name).hasClass("active"))){
		$("li#"+name).addClass("active");
		displayRest(name);
		if (name == "teacher") {
			$("li#student").removeClass("active");
		}else{
			$("li#teacher").removeClass("active");
		}
	}
}
function displayRest(name) {
	if (name == "teacher") {
		$('#bid').html('Employee Number');
		$('#det').html('Institute');
		$('#bid + input').attr('placeholder', 'Employee Number');
		$('#det + input').attr('placeholder', 'Institute');
	}else{
		$('#bid').html('Student Number');
		$('#det').html('Degree Course');
		$('#bid + input').attr('placeholder', 'Student Number');
		$('#det + input').attr('placeholder', 'Degree Course');
	}
}
function isTeacher(){
	return ($("li#teacher").hasClass("active"));
}
function resetBanners() {
	$('#banners > div').hide();
}
'use strict';

$(document).ready(function () {
	$('div#bg').fadeIn(200);
	$('div#content').fadeIn(1000);
});

(function () {
	angular.module("IndexApp", [])
		 .controller("IndexCtrl", IndexCtrl);

	IndexCtrl.$inject = ['$scope', '$http', '$window'];

	function IndexCtrl($scope, $http, $window) {
		var init_borrower = {
			borrower_id:'',
			bfname:'',
			bmname:'',
			blname:'',
			bpass:'',
			bcol:'',
			degcor:'',
			inst:''
		}
		$scope.createAccount = function () {
			var url = "";
			if (isTeacher()) {
				$scope.borrower.degcor = null;
				$scope.borrower.inst = $scope.borrower.det;
				url = "/api/anonymous/borrower/teacher";
			}else {
				$scope.borrower.inst = null;
				$scope.borrower.degcor = $scope.borrower.det;
				url = "/api/anonymous/borrower/student";
			}
			$http.post(url, $scope.borrower)
			.success(function (data) {
				resetBanners();
				console.log(data);
				if(data.status == 'success'){
					$('#yaySignUp').show();
				}
				$scope.borrower = init_borrower;
			})
			.error(function (data) {
				resetBanners();
				$('#wrongSignUp').show();
				console.log("Err: "+data);
				$scope.borrower = init_borrower;
			})
		}
		$scope.login = function () {
			$http.get('/api/anonymous/admin/'+$scope.userId+"/"+$scope.pass)
			.success(function (res) {
				$window.location.href = '/admin';
			})
			.error(function (res) {
				console.log("Errr:" +res);
				if (res.status == 'fail' || res.status == 'error') {
					if(res.message == 'wrong_combination'){
						alert("Wrong combination!");
					}else if(res.message = 'not_found'){
						$http.get('/api/anonymous/borrower/'+$scope.userId+"/"+$scope.pass)
						.success(function (res) {
							$window.location.href = '/borrower';
						})
						.error(function (res) {
							if (res.status == 'fail' || res.status == 'error') {
								if (res.message == 'wrong_combination') {
									alert("Wrong combination!");
								}else if(res.message == 'not_found'){
									alert("Account not found!");
								}else if(res.message == 'not_approved'){
									alert("Account not approved! Wait for approval.");
								}
							}
						});
					}
				}
			});
		}
	}
})();

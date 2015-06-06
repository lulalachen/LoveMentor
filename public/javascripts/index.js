var ngIndex = angular.module('ngIndex', []);

ngIndex.controller('indexCtrl', ['$scope','$timeout', function ($scope, $timeout) {
	console.log('hi');
	$('#in').fadeIn();

	$timeout(function() {
		$('#in').fadeOut();
		$('#content').fadeIn();
		console.log('hee')
	}, 1000);


	$scope.start = function(){
		$scope.startBlock = false;
		$scope.loginBlock = true;
	}

	$scope.login = function(app){
		$('#content').addClass('changePage');
		$timeout(function() {
			$scope.loginBlock = false;
			$scope.friendBlock = true;	
		}, 1000);
		
	}

}])

.directive("loadingIndicator", function() {
    return {
        restrict : "A",
        
        link : function(scope, element, attrs) {
          scope.loadingStart = function() {
            $('#in').fadeIn(); 
          }
          scope.loadingComplete = function() {
            $('#in').fadeOut();
          }
        }
    }
});
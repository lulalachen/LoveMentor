var ngIndex = angular.module('ngIndex', []);

ngIndex.controller('indexCtrl', ['$scope','$timeout', function ($scope, $timeout) {
	console.log('hi');


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
var ngIndex = angular.module('ngIndex', []);

ngIndex.controller('indexCtrl', ['$scope','$timeout', function ($scope, $timeout) {

	// Animation //
	$('#in').fadeIn();
	$timeout(function() {
		$('#in').fadeOut();
		$('#content').fadeIn();
		console.log('hee')
	}, 1000);

	// Variables //
	$scope.app = '';
	$scope.currentUser = {
		name : '',
		fbId : ''
	};
	$scope.friends = [{
		name : 'Abby Yeh',
		fbId : '100001234733407'
	},{
		name : 'Lulala Chen',
		fbId : '619160284'
	},{
		name : 'Urching Wang',
		fbId : '100001613672366'
	},{
		name : 'Michael Hsiang',
		fbId : '631572198'
	},{
		name : 'Abby Yeh',
		fbId : '100001234733407'
	},{
		name : 'Lulala Chen',
		fbId : '619160284'
	},{
		name : 'Urching Wang',
		fbId : '100001613672366'
	},{
		name : 'Michael Hsiang',
		fbId : '631572198'
	}];


	var friends = [{
		name : 'Abby Yeh',
		fbId : '100001234733407'
	},{
		name : 'Lulala Chen',
		fbId : '619160284'
	},{
		name : 'Urching Wang',
		fbId : '100001613672366'
	},{
		name : 'Michael Hsiang',
		fbId : '631572198'
	}]


	// Pagination //
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
		console.log(app === 'fb')

		switch (app){
			case 'fb':
				$scope.app = 'Facebook'
				FB.login(function(response) {
					if (response.authResponse) {
						accessToken = response.authResponse.accessToken;
			     		console.log('Welcome!  Fetching your information.... ');
			     		FB.api('/me', function(response) {
			       			console.log('Good to see you, ' + response.name + '.');
			       			$scope.currentUser.name = response.name;
			       			$scope.currentUser.fbId = response.id;
							// FBqueryFriendList();
			     		});
				    } else {
				    	console.log('User cancelled login or did not fully authorize.');
				    }
				}, {scope: 'email, user_friends, read_mailbox, user_photos'});
				break;
			case wechat:
				$scope.app = '微信'
				$scope.message = 'Sorry, we haven\'t support wechat services. Comming soon.'
				break;
			case ren:
				$scope.app = '人人網'
				$scope.message = 'Sorry, we haven\'t support RenRen services. Comming soon.'
				break;
			default :
				$scope.app = 'None';

		}
	}

	$scope.getFriends = function() {
		FB.api('/me/taggable_friends?limit=1', function(response) {
	        friendList = [];
	        for (var i = 0; i < response.data.length; i++) {
	        	console.log(response.data);
	        	friendList[i] = [];
	            friendList[i][0] = response.data[i].id;
	            friendList[i][1] = response.data[i].name;
	            friendList[i][2] = response.data[i].picture.data.url;
	            //console.log(friendList[i]);
	            //friendList[i][2] = "<img src = '" + friendList[i][2] + "'>";
	            //document.getElementById('result_friends').innerHTML = friendList[i][2];
	        }
	    });
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
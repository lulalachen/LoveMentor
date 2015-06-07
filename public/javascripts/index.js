var ngIndex = angular.module('ngIndex', []);

ngIndex.controller('indexCtrl', ['$scope','$timeout','$http', function ($scope, $timeout, $http) {

	// Animation //
	$('#in').fadeIn();
	$timeout(function() {
		$('#in').fadeOut();
		$('#content').fadeIn();
		console.log('hee')
	}, 5000);

	// Variables //
	$scope.app = '';
	$scope.currentUser = {
		name : '',
		fbId : ''
	};
	$scope.friends = [];
	$scope.messages = [];
	$scope.nextFriend = '';
	$scope.nextInbox = '';
	$scope.submitFriend = '';

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
			     		$scope.getFriends();
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
    	$scope.friends = [];

		FB.api('/me/taggable_friends?limit=50', function(response) {
	        // friendList = [];
	        console.log(response)
	        for (var i = 0; i < response.data.length; i++) {
	        	$scope.friends.push({
	        		fbId : response.data[i].id,
	        		name : response.data[i].name,
	        		photo : response.data[i].picture.data.url
	        	});

	        	//console.log(response);
	        	// friendList[i] = [];
	         //    friendList[i][0] = response.data[i].id;
	         //    friendList[i][1] = response.data[i].name;
	         //    friendList[i][2] = response.data[i].picture.data.url;
	            //console.log(friendList[i]);
	            //friendList[i][2] = "<img src = '" + friendList[i][2] + "'>";
	            //document.getElementById('result_friends').innerHTML = friendList[i][2];
	        }
	        $scope.nextFriend = response.paging.next

	        $scope.moreFriends();
	    })

	}

	$scope.moreFriends = function() {
		if( $scope.nextFriend !== ''){
			$http.get($scope.nextFriend).success(function(response){
				for (var i = 0; i < response.data.length; i++) {
		        	$scope.friends.push({
		        		fbId : response.data[i].id,
		        		name : response.data[i].name,
		        		photo : response.data[i].picture.data.url
		        	});
		        }
		        $scope.nextFriend = response.paging.next
		        $scope.moreFriends();
			})
		}
	}

 	$scope.submit = function(friend) {

 		$scope.searching = true;
		$scope.submitFriend = friend;
		$scope.getInbox(friend.name);

		$timeout(function() {
			$scope.searching = false;
			$scope.done = true;
			console.log(friend)

		}, 3000);
		
		var level = Math.floor(Math.random()*10000%100);

		var config1 = liquidFillGaugeDefaultSettings();
		    config1.textColor = "#FF4444";
		    config1.waveTextColor = "#FFAAAA";
		    config1.waveColor = "#FFDDDD";
		    config1.textVertPosition = 0.6;
		    config1.waveAnimateTime = 700;
		    loadLiquidFillGauge("fillgauge1", level, config1);

 	}

 	$scope.scrollTop = function(){
 		$('#friendList').animate({ scrollTop: 0 }, "slow");

 	}
 	$scope.backward = function(){
		$('#fillgauge1').empty();
 		$scope.searching = false; 
 		$scope.done = false;
 	}

	$scope.getInbox = function(name){
		selectedName = name || "王瘀青";
	    results = [];

		FB.api('/me/threads?limit=100', function(response) {
			console.log(response);
			$scope.messages = [];
	        var z = 0;	
	        for (var i = 0; i < response.data.length; i++) {
	        	if(response.data[i].senders.data.length !== 2){
	        		console.log('Group chat' + i)
	        	} else {
	        		var msg = response.data[i].messages.data ;
	        		for (var j = 0; j < msg.length; j++){
	        			if (msg[j].from.name === selectedName) {
		                    results[z] = [];
		                    results[z][0] = 1; //friend
		                    results[z][1] = msg[j].from.id; //Id
		                    results[z][2] = msg[j].from.name; //Id
		                    results[z][3] = msg[j].created_time;
		                    results[z][4] = msg[j].message;
		                    z++;
		                } else if (msg[j].from.name === $scope.currentUser.name) {
		                    results[z] = [];
		                    results[z][0] = 0; //myself
		                    results[z][1] = msg[j].to.data[0].id; //Id
		                    results[z][2] = msg[j].to.data[0].name; //Id
		                    results[z][3] = msg[j].created_time;
		                    results[z][4] = msg[j].message;
		                    z++;       
		                }

		                if (msg[j].from.name === selectedName && msg[j].message !== '') {
		                	$scope.messages.push({
		                		isFriend 		: 1,
		                		friendId 		: msg[j].from.id,
		                		friendName 		: msg[j].from.name,
		                		created_time 	: msg[j].created_time,
		                		message 		: msg[j].message
		                	})
		                } else if (msg[j].from.name === $scope.currentUser.name && msg[j].message !== '') {
		                    $scope.messages.push({
		                		isFriend 		: 0,
		                		friendId 		: msg[j].to.data[0].id,
		                		friendName 		: msg[j].to.data[0].name,
		                		created_time 	: msg[j].created_time,
		                		message 		: msg[j].message
		                	})  
		                }
	        		}
	        	}
	        }
	    });
	}

	$scope.moreInbox = function() {
		$http.get($scope.nextInbox).success(function(response){
			for (var i = 0; i < response.data.length; i++) {
	        	$scope.friends.push({
	        		fbId : response.data[i].id,
	        		name : response.data[i].name,
	        		photo : response.data[i].picture.data.url
	        	});
	        }
	        $scope.nextInbox = response.paging.next
		})
		$timeout(function(){
	        $scope.moreInbox();
	    },1000)
	}

	$scope.processInbox = function() {

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
var accessToken;
var friendList;
var selectedId;

function FBinit() {
	FB.init({
		appId      : '1608004206149872',
		status     : true,
		xfbml      : true,
		version    : 'v2.3' // or v2.0, v2.1, v2.0
	});
}

function FBlogin() {
	FB.login(function(response) {
		if (response.authResponse) {
			accessToken = response.authResponse.accessToken;
     		console.log('Welcome!  Fetching your information.... ');
     		FB.api('/me', function(response) {
       			console.log('Good to see you, ' + response.name + '.');
				FBqueryFriendList();
     		});
	    } else {
	    	console.log('User cancelled login or did not fully authorize.');
	    }
	}, {scope: 'email, user_friends, read_mailbox, user_photos'});
}

function FBlogout() {
	FB.logout(function(response) {
  		// user is now logged out
	});
}

function FBqueryFriendList() {
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

function FBqueryInbox() {
	FB.api('/me/inbox', function(response) {
		console.log(response);
        var selected = document.getElementById('selected_friend');

        var results = '';
        for (var i = 0; i < response.data.length; i++) {
            results += '<div><img src="https://graph.facebook.com/' + response.data[i].id + '/picture">' + response.data[i].name + '</div>';
        }

        // and display them at our holder element
        result_holder.innerHTML = '<h2>Result list of your friends:</h2>' + results;
    });
}

function submitSelectedFriend() {
}
var accessToken;
var friendList;
var selfName;
var selectedName;
var results;

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
                selfName = response.name;
       			console.log('Good to see you, ' + selfName + '.');
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
	FB.api('/me/taggable_friends', function(response) {
        friendList = [];
        for (var i = 0; i < response.data.length; i++) {
        	//console.log(response);
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
    selectedName = "李佳柔";
    results = [];
    FB.api('/me/threads?limit=100', function(response) {
		//console.log(response);
        var z = 0;
        for (var i = 0; i < response.data.length; i++) {
            for (var j = 0; j < response.data[i].messages.data.length; j++) {
                if (response.data[i].messages.data[j].from.name == selectedName) {
                    results[z] = [];
                    results[z][0] = 1; //friend
                    results[z][1] = response.data[i].messages.data[j].created_time;
                    results[z][2] = response.data[i].messages.data[j].message;
                    z++;
                } else if (response.data[i].messages.data[j].from.name == selfName) {
                    results[z] = [];
                    results[z][0] = 0; //myself
                    results[z][1] = response.data[i].messages.data[j].created_time;
                    results[z][2] = response.data[i].messages.data[j].message;
                    z++;       
                }
            }
        }
        console.log(results);
    });
}

function submitSelectedFriend() {
    FBqueryInbox();
}
var accessToken;

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
     		});
	    } else {
	    	console.log('User cancelled login or did not fully authorize.');
	    }
	}, {scope: 'email, user_friends'});
}

function FBlogout() {
	FB.logout(function(response) {
  		// user is now logged out
	});
}

function FBqueryFriendList() {
	console.log(accessToken);
	FB.api('/me/taggable_friends?limit=25', function(response) {
		console.log(response);
        var result_holder = document.getElementById('result_friends');

        var results = '';
        for (var i = 0; i < response.data.length; i++) {
            results += '<div><img src="https://graph.facebook.com/' + response.data[i].id + '/picture">' + response.data[i].name + '</div>';
        }

        // and display them at our holder element
        result_holder.innerHTML = '<h2>Result list of your friends:</h2>' + results;
    });
}
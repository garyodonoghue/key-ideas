function loginFacebook(){
  var ref = new Firebase("https://glaring-torch-16.firebaseio.com");

  //check if user is signed in and authenticated before allowing them to post content
  var authToken = ref.getAuth();
  if(authToken == null){
    ref.authWithOAuthPopup("facebook", function(error, authData) {
      if (error) {
        console.log("Login Failed!", error);
      } else {
        console.log("Authenticated successfully with facebook");
        displayProfilePic();
        updateUserList();
      }
    },
    {
        remember: "sessionOnly",
        scope: "email"
    });
  }
}

// add to the list of users if a new user logs in, else do nothing
function updateUserList(){

  // get all the users that have logged into the application
  var url = 'https://glaring-torch-16.firebaseio.com/users.json';
  var users;

  $.ajax(
  {
    type: "GET",
    url: url,
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    success: function (data) {

      //get the username from the auth token
      var ref = new Firebase("https://glaring-torch-16.firebaseio.com");
      var authToken = ref.getAuth();

      if(authToken != null){
        var authProvider = authToken.provider;

        var userName;
        var email;

        if(authProvider == "google"){
          userName = authToken.google.displayName;
          email = authToken.google.email;
        }
        else if(authProvider == "facebook"){
          userName = authToken.facebook.displayName;
          email = authToken.facebook.email;

        }
        else if(authProvider == "twitter"){
          userName = authToken.twitter.displayName;
          email = ""; //  Unlike Facebook and Google+, the Twitter API doesn't return a user's email, so we cant get that info if they login using Twitter
        }

        // take out apostrophes and spaces in user's name so that they form part of a well-formed url
        userName = userName.replace(/'/g, "");
        userName = userName.replace(/ /g, "");

        if(data != null){
          users = data;
          // check if the logged in user has already been added to the list of known users
          var array = $.map(users, function(value, index) {
              return [index];
          });

          var userIndex = $.inArray(userName, array);

          if(userIndex > -1){
            console.log('user already registered - do nothing');
          }
        }
        else{ //the user has not already been registered - add an entry for the users under /users with their email address as the payload
          var url = 'https://glaring-torch-16.firebaseio.com/users/' + userName + '.json';

          $.ajax(
          {
            type: "POST",
            url: url,
            data: '{"email" : "' + email + '"}'	,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
              // user successfully added, do nothing
            },
            error: function (msg, url, line) {
              alert('error');
            }
          });
        }
    }
    else{
      // there were no existing users - add first user
      var url = 'https://glaring-torch-16.firebaseio.com/users/' + userName;

      $.ajax(
      {
        type: "POST",
        url: url,
        data: '{"email" : "' + email + '"}'	,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
          // user successfully added, do nothing
        },
        error: function (msg, url, line) {
          alert('error');
        }
      });
    }
    },
    error: function (msg, url, line) {
      alert('error');
    }
  });
 }

function loginTwitter(){
  var ref = new Firebase("https://glaring-torch-16.firebaseio.com");

  //check if user is signed in and authenticated before allowing them to post content
  var authToken = ref.getAuth();
  if(authToken == null){
    ref.authWithOAuthPopup("twitter", function(error, authData) {
      if (error) {
        console.log("Login Failed!", error);
      } else {
        console.log("Authenticated successfully with payload twitter");
        displayProfilePic();
        updateUserList();
      }
    },
    {
        // Unlike Facebook and Google+, the Twitter API doesn't return a user's email, so no need to request it here
      remember: "sessionOnly"
    });
  }
}


function loginGoogle(){
  var ref = new Firebase("https://glaring-torch-16.firebaseio.com");

  //check if user is signed in and authenticated before allowing them to post content
  var authToken = ref.getAuth();
  if(authToken == null){
    ref.authWithOAuthPopup("google", function(error, authData) {
      if (error) {
        console.log("Login Failed!", error);
      } else {
        console.log("Authenticated successfully with goodle");
        displayProfilePic();
        updateUserList();
      }
    },
    {
      remember: "sessionOnly",
      scope: "email"
    });
  }
}

function displayProfilePic(){
  //get the user profile pic from the auth token
  var ref = new Firebase("https://glaring-torch-16.firebaseio.com");
  var authToken = ref.getAuth();
  if(authToken != null){
    var authProvider = authToken.provider;

    var profileImageURL;
    var fullName;

    if(authProvider == "google"){
        fullName = authToken.google.displayName;
        profileImageURL = authToken.google.profileImageURL
    }
    else if(authProvider == "facebook"){
      fullName = authToken.facebook.displayName;
      profileImageURL = authToken.facebook.profileImageURL
    }
    else if(authProvider == "twitter"){
      fullName = authToken.twitter.displayName;
      profileImageURL = authToken.twitter.profileImageURL
    }

    var firstName = fullName.split(" ")[0];
    var dropDown = document.getElementById("signInDropDown");
    if(dropDown != null){
        dropDown.innerHTML = '<p style="color: #fff;padding-top: 4px; font-size:18px; font-family:font-family: "Helvetica Neue"; display:block">Hello, '+firstName+'</p>';
    }
  }
}

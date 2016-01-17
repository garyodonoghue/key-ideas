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
      }
    }, {remember: "sessionOnly"});
  }
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
      }
    }, {remember: "sessionOnly"});
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
      }
    }, {remember: "sessionOnly"});
  }
}

function displayProfilePic(){
  //get the user profile pic from the auth token
  var ref = new Firebase("https://glaring-torch-16.firebaseio.com");
  var authToken = ref.getAuth();
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
  document.getElementById("signInDropDown").innerHTML = '<p style="color: #fff;padding-top: 4px; font-size:18px; font-family:font-family: "Helvetica Neue"; display:block">Hello, '+firstName+'</p>';
}

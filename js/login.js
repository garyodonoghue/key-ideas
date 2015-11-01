var context;

function loginFacebook(){
  var ref = new Firebase("https://glaring-torch-16.firebaseio.com");

  //check if user is signed in and authenticated before allowing them to post content
  var authToken = ref.getAuth();
  if(authToken == null){
    ref.authWithOAuthPopup("facebook", function(error, authData) {
      if (error) {
        console.log("Login Failed!", error);
      } else {
        console.log("Authenticated successfully with payload:", authData);
      }
    }, {remember: "none"});
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
        console.log("Authenticated successfully with payload:", authData);
      }
    }, {remember: "none"});
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
        console.log("Authenticated successfully with payload:", authData);
      }
    }, {remember: "none"});
  }
}

var context;

function displayPosts(){
    //call to get all comments on page load
    var url = 'https://glaring-torch-16.firebaseio.com/discussion_topics/' + context + '/comments.json';
    var commentIndexMappings = [];
    $.ajax(
    {
      type: "GET",
      url: url,
      data: "{}",
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      success: function (data) {
        var commentsArr = $.map(data, function(el, i)
        {
          commentIndexMappings.push(i);
          return el;
        })

        var html = '</br></br></br><div class = "container"><div class="row main-row">';

          for(var i=commentsArr.length-1; i>=0;i--){
            html += '<div id="'+commentIndexMappings[i]+'" class="form-group"><div class="titleBox"><label>';
            html += commentsArr[i].text;
            html += '</label></div><div class="commentBox"><p class="taskDescription">';
            html += '<img class="img-circle" width="100" height="100" src="' + commentsArr[i].profilePicUrl + '">';
            html += '<div>' + commentsArr[i].userName + '</div>';
            html += '</br>';

            html += '</div>';
            html += '<form class="form-inline" role="form">';
            //html += '<div class="form-group"><input id="' + commentIndexMappings[i] + 'RespTxt" class="form-control" type="text" placeholder="say something..."></div><div class="form-group" style="margin:10px"><input class="btn btn-danger" id="'+ commentIndexMappings[i] +'" type="submit" value="Respond" onClick="submitResponse(event)"></div></form>';
            html += '</div></div></div></br><hr>';
          }

        html+='</div></div>';
        $("#main").html(html);
      },
      error: function (msg, url, line) {
        alert('error');
      }
    });
}

function submitResponse(event){
    var commentDiv = "#"+event.target.id;
    var respTxtDiv = "#"+event.target.id+"RespTxt";
    var responseText = $(respTxtDiv).val();

    var url = 'https://glaring-torch-16.firebaseio.com/discussion_topics/' + context + '/comments/'+event.target.id+'/responses.json';

    $.ajax(
    {
      type: "POST",
      url: url,
      data: '{"text" : "'+responseText+'", "userId" : 123}'	,
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      success: function (data) {
        $(respTxtDiv).val('');
        displayPosts();
      },
      error: function (msg, url, line) {
        alert('error');
      }
    });
}

$( "#postBtn" ).bind( "click", function(event, ui) {

  var ref = new Firebase("https://glaring-torch-16.firebaseio.com");

  //check if user is signed in and authenticated before allowing them to post content
  var authToken = ref.getAuth();

  if(authToken == null){
    BootstrapDialog.show({
            title: 'Please Login',
            message: 'Login in using the buttons on the top-right'
    });
  }
  else{
    debugger;

    //users to alreadt logged in
    var url = 'https://glaring-torch-16.firebaseio.com/discussion_topics/' + context + '/comments.json';
    var commentText = $('#commentTxtBox').val();
    commentText = commentText.replace(/\n/g, "");

    //get the user credentials (profile pic, username) from the auth token
    var ref = new Firebase("https://glaring-torch-16.firebaseio.com");

    //check if user is signed in and authenticated before allowing them to post content
    var authToken = ref.getAuth();
    var authProvider = authToken.provider;

    var profileImageURL;
    var displayName;

    if(authProvider == "google"){
        displayName = authToken.google.displayName;
        profileImageURL = authToken.google.profileImageURL
    }
    else if(authProvider == "facebook"){
      displayName = authToken.facebook.displayName;
      profileImageURL = authToken.facebook.profileImageURL
    }
    else if(authProvider == "twitter"){
      displayName = authToken.twitter.displayName;
      profileImageURL = authToken.twitter.profileImageURL
    }

    $.ajax(
    {
      type: "POST",
      url: url,
      data: '{"text" : "' + commentText + '", "userName" : "' + displayName + '", "profilePicUrl" : "' + profileImageURL + '"}'	,
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      success: function (data) {
        $("#commentTxtBox").val('');
        displayPosts();
      },
      error: function (msg, url, line) {
        alert('error');
      }
    });
  }
});

function populateWaterChargesInformation(){
  //populate content in the div about water charges
  var html = '';
  $.get('/water_charges.html', function(data) {
    html += data;
    html += '</br></br></br><div class="row main-row">Post your opinion on this topic or read people\'s comments below....</div>';
    $("#forumInfo").html(html);
  });
}

$( "#waterChargesBtn" ).bind( "click", function(event, ui) {
    $("#body" ).empty();

    context = 'water_charges';
    populateWaterChargesInformation();

    debugger;

    $.get('/forum.html', function(data) {
      $("#forumComments").html(data);
    });

    return false;
});

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
  debugger;
    ref.authWithOAuthPopup("google", function(error, authData) {
      if (error) {
        console.log("Login Failed!", error);
      } else {
        console.log("Authenticated successfully with payload:", authData);
      }
    }, {remember: "none"});
  }
}

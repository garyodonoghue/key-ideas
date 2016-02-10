// file containing any common actions which the user may perform across any number of pages - update, upvote, delete comments etc

// function used to delete a comment, user is only able to delete their own comments, and only once they are logged in
function checkCanEditComment(context, commentId, commentText, userName){
  var ref = new Firebase("https://glaring-torch-16.firebaseio.com");
  //check if user is signed in and authenticated before allowing them to post content
  var authToken = ref.getAuth();
  var authProvider;

  if(authToken == null){
    BootstrapDialog.show({
            title: 'Please Login',
            message: 'Login in using the buttons on the top-right',
            cssClass: 'dialog-stlye'
    });
  }
  else{
    var authProvider = authToken.provider;

    var displayName;

    if(authProvider == "google"){
        displayName = authToken.google.displayName;
    }
    else if(authProvider == "facebook"){
      displayName = authToken.facebook.displayName;
    }
    else if(authProvider == "twitter"){
      displayName = authToken.twitter.displayName;
    }

    if(userName != displayName.replace("'", "")){
      BootstrapDialog.show({
              title: 'Action not permitted!',
              message: 'You can only edit your own comments!',
              cssClass: 'dialog-stlye'
      });
    }
    else{
      // show editor dialog
      var modalTextHtml = '<textarea id="textArea" name="' + commentId + '" style="width:100%" onkeyup="textAreaAdjust(this)" style="overflow:hidden"></textarea>';
      $('#modalTextBox').html(modalTextHtml);
      $('#textArea').val(commentText);

      jQuery.noConflict();
      $('#myModal').modal('show');
    }
  }
}

// function used to delete a comment, should only be able to
function checkCanDeleteComment(context, commentId, commentText, userName){
  var ref = new Firebase("https://glaring-torch-16.firebaseio.com");
  //check if user is signed in and authenticated before allowing them to post content
  var authToken = ref.getAuth();

  if(authToken == null){
    BootstrapDialog.show({
            title: 'Please Login',
            message: 'Login in using the buttons on the top-right',
            cssClass: 'dialog-stlye'
    });
  }
  else{
    //check if user is signed in and authenticated before allowing them to post content
    var authToken = ref.getAuth();
    var authProvider = authToken.provider;
    var displayName;

    if(authProvider == "google"){
        displayName = authToken.google.displayName;
    }
    else if(authProvider == "facebook"){
      displayName = authToken.facebook.displayName;
    }
    else if(authProvider == "twitter"){
      displayName = authToken.twitter.displayName;
    }

    if(userName != displayName.replace("'", "")){
      BootstrapDialog.show({
              title: 'Action not permitted!',
              message: 'You can only delete your own comments!',
              cssClass: 'dialog-stlye'
      });
    }
    else{
      BootstrapDialog.show({
              title: 'Delete comment',
              message: 'Are you sure you want to delete this comment?',
              buttons: [{
              label: 'Cancel',
              cssClass: 'dialog-stlye',
              action: function(dialog) {
                  dialog.close();
              }
          }, {
              label: 'Yes I\'m sure',
              action: function(dialog) {
                  deleteComment(context, userName, commentId);
                  dialog.close();
              }
          }]
      });
    }
  }
}

function deleteComment(context, userName, commentId){
      console.log('deleting comment: ' + commentId + ' by user:' + userName);
      var url = 'https://glaring-torch-16.firebaseio.com/discussion_topics/' + context + '/comments/' + commentId + '.json';

      $.ajax(
      {
        type: "DELETE",
        url: url,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
          console.log('comment: ' + commentId + ' successfully deleted');
          displayPosts(context);
          BootstrapDialog.alert('Comment successfully deleted');
        },
        error: function (msg, url, line) {
          console.log('error deleting comment: ' + commentId + ' for user: ' + userName);
          alert('error');
        }
    });
}

// setup post button to allow posting of comments
function postComment(context){
  var ref = new Firebase("https://glaring-torch-16.firebaseio.com");

  //check if user is signed in and authenticated before allowing them to post content
  var authToken = ref.getAuth();

  if(authToken == null){
    BootstrapDialog.show({
            title: 'Please Login',
            message: 'Login in using the buttons on the top-right',
            cssClass: 'dialog-stlye'
    });
  }
  else{
    //users to already logged in
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
      data: '{"text" : "' + commentText + '", "upvotes" : 0, "userName" : "' + displayName.replace("'", "") + '", "profilePicUrl" : "' + profileImageURL + '"}'	,
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      success: function (data) {
        $("#commentTxtBox").val('');
        displayPosts(context);
      },
      error: function (msg, url, line) {
        console.log('error posting comment: ' + commentText + ' for user: ' + displayName);
        alert('error');
      }
    });
  }
}

function updateComment(context){
  var commentText = $('#textArea').val();
  var commentId = $('#textArea').attr('name');

  var url = 'https://glaring-torch-16.firebaseio.com/discussion_topics/' + context + '/comments/' + commentId + '.json';
  $.ajax(
  {
    type: "PATCH",
    url: url,
    data: '{"text" : "' + commentText + '"}',
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    success: function (data) {
      BootstrapDialog.alert('Comment successfully updated');
      displayPosts(context);
    },
    error: function (msg, url, line) {
      console.log('error updating comment: ' + commentId);
      alert('error');
    }
  });
}

// function used to delete a comment, should only be able to
function checkCanUpvoteComment(context, commentId, userName){
	var ref = new Firebase("https://glaring-torch-16.firebaseio.com");
	//check if user is signed in and authenticated before allowing them to post content
	var authToken = ref.getAuth();

	if(authToken == null){
		BootstrapDialog.show({
						title: 'Please Login',
						message: 'Login in using the buttons on the top-right',
						cssClass: 'dialog-stlye'
		});
	}
	else{
		//check if user is signed in and authenticated before allowing them to post content
		var authToken = ref.getAuth();
		var authProvider = authToken.provider;
		var displayName;

		if(authProvider == "google"){
				displayName = authToken.google.displayName;
		}
		else if(authProvider == "facebook"){
			displayName = authToken.facebook.displayName;
		}
		else if(authProvider == "twitter"){
			displayName = authToken.twitter.displayName;
		}

		if(userName == displayName.replace("'", "")){
			BootstrapDialog.show({
							title: 'Action not permitted!',
							message: 'You can not upvote your own comments!',
							cssClass: 'dialog-stlye'
			});
		}
		else{
			var url = 'https://glaring-torch-16.firebaseio.com/discussion_topics/' + context + '/comments/' + commentId + '/upvotes.json';
				var numberUpvotes;

			// get the number of upvotes a comment has, if null, then treat as 0
			$.ajax(
			{
				type: "GET",
				url: url,
				contentType: "application/json; charset=utf-8",
				dataType: "json",
				success: function (data) {
					if(isNaN(data) || data == null){
						numberUpvotes = 0;
					}
					else{
						numberUpvotes = data;
					}

					numberUpvotes = parseInt(numberUpvotes) + 1;

					var updateUpvotesUrl  = 'https://glaring-torch-16.firebaseio.com/discussion_topics/' + context + '/comments/' + commentId + '.json';

					$.ajax(
					{
						type: "PATCH",
						url: updateUpvotesUrl,
						contentType: "application/json; charset=utf-8",
						data: '{"upvotes" : "' + numberUpvotes + '"}',
						dataType: "json",
						success: function (data) {
              BootstrapDialog.alert('Comment successfully upvoted! Good job!');
							console.log('comment successfully upvoted. Comment id:' + commentId + ', number of upvotes: ' + numberUpvotes);
							displayPosts(context);
						},
						error: function (msg, url, line) {
              console.log('error upvoting comment: ' + commentId + ' for user: ' + userName);
              alert('error');
						}
					});
				}
			});
		}
	}
}

//populate comments section
function displayPosts(context){
  var commentsUrl = 'https://glaring-torch-16.firebaseio.com/discussion_topics/' + context + '/comments.json';

  var commentIndexMappings = [];
  $.ajax(
  {
    type: "GET",
    url: commentsUrl,
    data: "{}",
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    success: function (data) {
      var commentsArr = [];

      if(data != null){
        commentsArr = $.map(data, function(el, i)
        {
          commentIndexMappings.push(i);
          return el;
        })
      }
      
      var html = '</br><div class = "container"><div class="row main-row">';

        for(var i=commentsArr.length-1; i>=0;i--){
          html += '<div id="'+commentIndexMappings[i]+'" class="form-group"><table style="width:100%"><tr><td style="text-align: left; width:20%";><img class="img-circle" width="50" height="50" src="' + commentsArr[i].profilePicUrl + '">';
          html += '<div>' + commentsArr[i].userName + '</td><td style="text-align: left;"><div class="titleBox"><label>';
          html += commentsArr[i].text;
          html += '</label></td><td style="text-align: right; width:20%";><button onclick="checkCanDeleteComment(\''+ context +'\', \''+ commentIndexMappings[i] +'\', \''+ commentsArr[i].text +'\', \''+ commentsArr[i].userName.replace("'", "") +'\')" title="Delete Comment?" class="glyphicon glyphicon-remove"></button></div><div class="commentBox"><p class="taskDescription">';
          html += '<button onclick="checkCanEditComment(\''+ context +'\', \''+ commentIndexMappings[i] +'\', \''+ commentsArr[i].text +'\', \''+ commentsArr[i].userName.replace("'", "") +'\')" title="Edit Comment?" class="glyphicon glyphicon-pencil"></button>';
          html+='<td style="text-align: right; width:5%";><button title="Upvote Comment?" onclick="checkCanUpvoteComment(\''+ context +'\', \''+ commentIndexMappings[i] +'\', \''+ commentsArr[i].userName.replace("'", "") +'\')" class="glyphicon glyphicon-arrow-up"></button> ' + commentsArr[i].upvotes + '</td></tr></div>';
          html += '</br>';

          html += '</div>';
          html += '<form class="form-inline" role="form">';
          html += '</div></br><hr>';
        }

      html+='</div></div>';
      $("#forumComments").html(html);
    },
    error: function (msg, url, line) {
      console.log('error displaying comments for context: ' + context);
      alert('error');
    }
    });
}

// adust the text area based on the amount of text in it
function textAreaAdjust(o) {
    o.style.height = "1px";
    o.style.height = (25+o.scrollHeight)+"px";
}

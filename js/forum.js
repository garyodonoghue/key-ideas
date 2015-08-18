function displayPosts(){
    //call to get all comments on page load
    var url = 'https://glaring-torch-16.firebaseio.com/comments.json';
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
            html += '<div id="'+commentIndexMappings[i]+'" class="detailBox"><div class="titleBox"><label>';
            html += commentsArr[i].text;
            html += '</label></div><div class="commentBox"><p class="taskDescription">';
            html += '</br>';

            if(commentsArr[i].responses != null){

              var responsesIndexMappings = [];

              var responsesArr = $.map(commentsArr[i].responses, function(el, i)
              {
                responsesIndexMappings.push(i);
                return el;
              })


              for(var j = 0; j<responsesArr.length;j++){
                html += '<div class="actionBox"><ul class="commentList"><li><div class="commenterImage"><img src="http://lorempixel.com/50/50/people/6"></div><div class="commentText"><p class="">';
                html += responsesArr[j].text;
                html += '</p> <span class="date sub-text">on March 5th, 2014</span></div></li>';
              }
            }

            html += '</div>';
            html += '<form class="form-inline" role="form">';
            html += '<div class="form-group"><input id="' + commentIndexMappings[i] + 'RespTxt" class="form-control" type="text" placeholder="say something..."></div><div class="form-group" style="margin:10px"><input class="btn btn-danger" id="'+ commentIndexMappings[i] +'" type="submit" value="Respond" onClick="submitResponse(event)"></div></form>';
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
  debugger;
    var commentDiv = "#"+event.target.id;
    var respTxtDiv = "#"+event.target.id+"RespTxt";
    var responseText = $(respTxtDiv).val();

    var url = 'https://glaring-torch-16.firebaseio.com/comments/'+event.target.id+'/responses.json';

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

    var url = 'https://glaring-torch-16.firebaseio.com/comments.json';
    var commentText = $('#commentTxtBox').val();
    commentText = commentText.replace(/\n/g, "");

    //Passing fake user id at the moment - need to pass real value
    $.ajax(
    {
      type: "POST",
      url: url,
      data: '{"text" : "'+commentText+'", "userId" : 123}'	,
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
  });

$( "#forumBtn" ).bind( "click", function(event, ui) {
    $("#body" ).empty();

    //add in content here to be discussed

    $.get('/forum.html', function(data) {
      $("#forumComments").html(data);
    });

    return false;
});

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

        var html = '</br></br></br>';

          for(var i=commentsArr.length-1; i>=0;i--){
            html += '<br><div id="'+commentIndexMappings[i]+'" class="container"><b>';
            html += commentsArr[i].text;
            html += '</b></br></br>';

            html += '<textarea placeholder="respond to comment..." class="form-group" id="' + commentIndexMappings[i] + 'RespTxt" "rows="1" cols="100"></textarea></br>';
            html += '<input class="form-group" id="'+ commentIndexMappings[i] +'" type="submit" value="Respond" onClick="submitResponse(event)">';

            html += '</br></br>';

            if(commentsArr[i].responses != null){

              var responsesIndexMappings = [];

              var responsesArr = $.map(commentsArr[i].responses, function(el, i)
              {
                responsesIndexMappings.push(i);
                return el;
              })


              for(var j = 0; j<responsesArr.length;j++){
                html += '<li>' + responsesArr[j].text;
                html += '</br>';
              }
            }

            html += '</div></form></br><hr>';
          }

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

      var url = 'https://glaring-torch-16.firebaseio.com/comments/'+event.target.id+'/responses.json';

    $.ajax(
    {
      type: "POST",
      url: url,
      data: '{"text" : "'+responseText+'", "userId" : 123}'	,
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      success: function (data) {
        $(commentDiv).append("<div>"+responseText+"</div>");
        console.log('commentId='+event.target.id);

        $(respTxtDiv).val('');
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
        $("#main").prepend("<div><b>"+commentText+"</b></div></br><hr>")
        $("#commentTxtBox").val('');
      },
      error: function (msg, url, line) {
        alert('error');
      }
    });
});

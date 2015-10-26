$( "#partyManifestoBtn" ).bind( "click", function(event, ui) {
    $("#body" ).empty();


    var url = 'https://glaring-torch-16.firebaseio.com/info/partyManifesto.json';
    var commentIndexMappings = [];
    $.ajax(
    {
      type: "GET",
      url: url,
      data: "{}",
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      success: function (data) {
        $("#forumComments").html(data);
      }
    });

    return false;
});

$( "#preziBtn" ).bind( "click", function(event, ui) {
    $("#body" ).empty();

    $.get('/sample_prezi.html', function(data) {
      $("#forumComments").html(data);
    });

    return false;
});

$( "#glossaryBtn" ).bind( "click", function(event, ui) {
    $("#body" ).empty();

    var url = 'https://glaring-torch-16.firebaseio.com/info/glossary.json';
    var commentIndexMappings = [];
    $.ajax(
    {
      type: "GET",
      url: url,
      data: "{}",
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      success: function (data) {
        $("#forumComments").html(data);
      }
    });

    return false;
});

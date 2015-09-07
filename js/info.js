$( "#partyManifestoBtn" ).bind( "click", function(event, ui) {
    $("#body" ).empty();

    $.get('/party_manifestos.html', function(data) {
      $("#forumComments").html(data);
    });

    return false;
});

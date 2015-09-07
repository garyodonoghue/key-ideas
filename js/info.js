$( "#partyManifestoBtn" ).bind( "click", function(event, ui) {
    $("#body" ).empty();

    $.get('/party_manifestos.html', function(data) {
      $("#forumComments").html(data);
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

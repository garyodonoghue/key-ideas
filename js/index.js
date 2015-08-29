function loadAbout(){
    $("#body" ).empty();
    $("#forumInfo").empty();
    $("#forumComments" ).empty();
    
    $.get('/about.html', function(data) {
      $("#body").html(data);
    });

    return false;
}

function loadContact(){
  $("#body" ).empty();
  $("#forumComments" ).empty();
  $("#forumInfo").empty();

  $.get('/contact.html', function(data) {
    $("#body").html(data);
  });

  return false;
}

//set nav element as selected
$(".nav a").on("click", function(){
   $(".nav").find(".active").removeClass("active");
   $(this).parent().addClass("active");
});

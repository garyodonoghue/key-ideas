$('#myCarousel').on('slide.bs.carousel',function(){
    $('#myCarousel .active .carousel-caption').fadeOut();
});

$('#myCarousel').on('slid.bs.carousel',function(){
    $('#myCarousel .active .carousel-caption').fadeIn();
});

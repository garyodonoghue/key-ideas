var carouselContainer = $('.carousel');
var slideInterval = 5000;

function toggleCaption() {
    $('.carousel-caption').hide();

    var caption = carouselContainer.find('.active').find('.carousel-caption');
    //caption.removeClass('animated bounceOutDown');
    caption.removeClass('animated bounceInUp');

    if(caption[0] != null){
      caption[0].setAttribute("style", "display:block");
      caption.addClass('animated bounceInUp');
    }
}

carouselContainer.carousel({
    interval: slideInterval,
    cycle: true,
    pause: "false"
}).on('slid.bs.carousel', function() {
    toggleCaption();
});

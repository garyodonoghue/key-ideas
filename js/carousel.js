var carouselContainer = $('.carousel');
var slideInterval = 4000;

function toggleCaption() {
    $('.carousel-caption').hide();

    var caption = carouselContainer.find('.active').find('.carousel-caption');
    //caption.removeClass('animated bounceOutDown');
    caption.removeClass('animated bounceInUp');

    caption[0].setAttribute("style", "display:block");
    caption.addClass('animated bounceInUp');

    //setInterval(function(){
    //  caption.addClass('animated bounceOutDown');
    //}, 2700);
}

carouselContainer.carousel({
    interval: slideInterval,
    cycle: true,
    pause: "false"
}).on('slid.bs.carousel', function() {
    toggleCaption();
});

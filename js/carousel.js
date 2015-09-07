var carouselContainer = $('.carousel');
var slideInterval = 3000;

function toggleCaption() {
    $('.carousel-caption').hide();
    var caption = carouselContainer.find('.active').find('.carousel-caption');
    caption[0].setAttribute("style", "display:block");
    caption.addClass('animated bounceInUp');
}

carouselContainer.carousel({
    interval: slideInterval,
    cycle: true,
    pause: "hover"
}).on('slid.bs.carousel', function() {
    toggleCaption();
});

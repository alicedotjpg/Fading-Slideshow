(function($) {

  $.fn.fadingSlideshow = function(options) {
    var settings = $.extend({
      intervalTimer: 4000,
      fadingTimer: 1000,
      changeFunction: null
    }, options);

    return this.each(function() {
      var thisSlideshow = $(this);
      var slides = $(this).children();

      if (slides.length >= 2) {

        var total = slides.length;
        var counter = 0;

        if (settings.changeFunction) settings.changeFunction(counter - 1, total);

        thisSlideshow.addClass('fading-slideshow-wrapper');
        slides.addClass('fading-slideshow-image-wrapper');
        slides.eq(counter).addClass('fading-slideshow-current');
        var interval = setInterval(function() {
          if (!updating) {
            updating = true;
        
            update();

            setTimeout(function() {
              updating = false;
            }, settings.fadingTimer);
          }
        }, settings.intervalTimer);
        var updating = false;
        
        thisSlideshow.on('click.slideshow', function() {
          if (!updating) {
            updating = true;

            update();

            setTimeout(function() {
              updating = false;
            }, settings.fadingTimer);
          }
          clearInterval(interval);
          interval = setInterval(function() {
            update();
          }, settings.intervalTimer);
        });

        function update() {
          var looper = (total + counter) % total;
          var next = looper + 1;
          if (looper === total - 1) {
            next = 0;
          };
          slides.eq(looper - 1).removeClass('fading-slideshow-previous');
          slides.eq(looper).addClass('fading-slideshow-previous').removeClass('fading-slideshow-current');
          slides.eq(next).css({'display': 'none'}).addClass('fading-slideshow-current').fadeIn(settings.fadingTimer);

          if (settings.changeFunction) settings.changeFunction(counter, total);

          counter++;
        }
      };
    });
  }
})(jQuery);

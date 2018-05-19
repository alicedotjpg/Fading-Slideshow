(function($) {
  // //
  // // ─── VARIABLES ──────────────────────────────────────────────────────────────────
  // //

  var slideshowWrapper,
      thisSlideshow, 
      slides, 
      total, 
      counter, 
      interval,
      updating,
      settings;

  var methods = {

    navigate: function(direction) {
      if (!updating) {
        updating = true;
  
        update(direction);
  
        setTimeout(function() {
          updating = false;
        }, settings.fadingTimer);
      };
  
      if (settings.intervalTimer > 0) {
        clearInterval(interval);
        interval = setInterval(function() {
          updating = true;
  
          update('next');
  
          setTimeout(function() {
            updating = false;
          }, settings.fadingTimer);
  
        }, settings.intervalTimer);
      };
    }, 

  };

  var defaults = {
    intervalTimer: 4000,
    fadingTimer: 1000,
    changeFunction: null
  };

  //
  // ─── GLOBAL FUNCTIONS ───────────────────────────────────────────────────────────
  //

  function update(direction) {
    if (direction == 'next') {
      var looper = (total + counter) % total;
      var next = looper + 1;
      if (looper === total - 1) {
        next = 0;
      };
      slides.removeClass('fading-slideshow-previous');
      slides.eq(looper).addClass('fading-slideshow-previous').removeClass('fading-slideshow-current');
      slides.eq(next).css({'display': 'none'}).addClass('fading-slideshow-current').fadeIn(settings.fadingTimer);

      if (settings.changeFunction) settings.changeFunction(counter, total);

      counter++;

    } else if (direction == 'prev') {
      var looper = (total + counter) % total;
      var prev = looper - 1;
      if (looper === - total + 1) {
        prev = -1;
      };
      slides.removeClass('fading-slideshow-previous');
      slides.eq(looper).addClass('fading-slideshow-previous').removeClass('fading-slideshow-current');
      slides.eq(prev).css({'display': 'none'}).addClass('fading-slideshow-current').fadeIn(settings.fadingTimer);

      if (settings.changeFunction) settings.changeFunction(counter, total);

      counter--;
    }
  }

  //
  // ─── INITIALIZE ────────────────────────────────────────────────────────────────────
  //

  var initialize = function(methodOrOptions) {
    settings = $.extend(defaults, methodOrOptions);
    return slideshowWrapper.each(function() {
      thisSlideshow = $(this);
      slides = $(this).children();

      if (slides.length >= 2) {

        total = slides.length;
        counter = 0;

        if (settings.changeFunction) settings.changeFunction(counter, total);

        thisSlideshow.addClass('fading-slideshow-wrapper');
        slides.addClass('fading-slideshow-image-wrapper');
        slides.eq(counter).addClass('fading-slideshow-current');
        
        if (settings.intervalTimer > 0) {

          interval = setInterval(function() {
            if (!updating) {
              updating = true;
          
              update('next');
  
              setTimeout(function() {
                updating = false;
              }, settings.fadingTimer);
            }
          }, settings.intervalTimer);
          updating = false;
        };
      };
    });
  }

  $.fn.fadingSlideshow = function(methodOrOptions) {

    slideshowWrapper = this;
    if (methods[methodOrOptions]) {
      return methods[methodOrOptions].apply(this, Array.prototype.slice.call(arguments, 1));
    } else if (typeof methodOrOptions === 'object' || !methodOrOptions) {  
      initialize.apply(this, arguments);
    } else {
      $.error( 'Method ' +  methodOrOptions + ' does not exist in jQuery.fadingSlideshow' );
    }   
  };
  
})(jQuery);

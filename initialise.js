 $('.fast').fadingSlideshow({
    intervalTimer: 400,
    fadingTimer: 200,
    changeFunction: function(counter, total)
  });

  $('.medium').fadingSlideshow({
    intervalTimer: 2000,
    fadingTimer: 1000,
    changeFunction: function(counter, total)
  });

  $('.slow').fadingSlideshow({
    intervalTimer: 4000,
    fadingTimer: 2000,
    changeFunction: function(counter, total)
  });

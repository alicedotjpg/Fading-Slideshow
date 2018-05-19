var slideshow = $('.slideshow');
 

// Initialise

slideshow.fadingSlideshow({
  
  // Options
  intervalTimer: 4000,
  fadingTimer: 1000, 
  changeFunction: function(counter, total) {},

});

// Navigation events

$('.previous').on('click', function() {
  slideshow.fadingSlideshow('navigate', 'prev');
});

$('.next').on('click', function() {
  slideshow.fadingSlideshow('navigate', 'next');
})

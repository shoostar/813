$('a[href^="#"]').on('click',function(e) {
  e.preventDefault();
});

// Image Slider
  // http://codepen.io/dubrod/pen/xkGpq
  var slider = $('.image-slider'),
      slide = slider.children(),
      slideImg = $(slide).find('img'),
      slideCount = slide.length,
      num = 1,
      overCount = slideCount+1,
      currentSlide = slide.first(),
      infoIcon = $('#info-icon'),
      currentH,
      hPercent;

  // Add slide id numbers
  slide.each(function(i) {
    i = i+1;
    $(this).attr('id', 'slide'+i);
  });
    // Show the first slide
  currentSlide.addClass('current-slide');
  // Add data-height="<height>"
  /*
  slideImg.each(function(){
    $(this).data('height');
    $(this).attr('data-height',($(this).height()));
  });
  // Slider height
  var currentH = currentSlide.find('img').data('height'),
      hPercent = ((currentH) / (slider.width()) * 100);
  slider.css({
    'padding-bottom': (hPercent + '%') // TODO - tidy this up - the % function is repeated below
  });

  // Adjust height of slider to image height
  function adjustH() {
    var currentH = currentSlide.find('img').data('height'),
        hPercent = ((currentH) / (slider.width()) * 100);
    slider.animate({
      'padding-bottom':(hPercent + '%')
    },250);
  }
  */
  // Next / Prev slide
  function slideOutput(num){
    slide.find('.info').removeClass('show');
    infoIcon.removeClass('no-strap');
    if(num === 0){
      reverse_resetSlider();
      return;
    }
    if(num == overCount){
      resetSlider();
      return;
    }
    $('.slide').removeClass('current-slide');
    currentSlide = $('#slide'+num);
    currentSlide.addClass('current-slide');
    if(currentSlide.find('.info').hasClass('no-strap')) {
      infoIcon.addClass('no-strap');
    }

  }
  // Reset to first slide
  function resetSlider(){
    $('.slide').removeClass('current-slide');
    currentSlide = $('#slide1');
    currentSlide.addClass('current-slide');
    num = 1;
  }
  // Reset to last slide
  function reverse_resetSlider(){
    currentSlide = $('#slide'+slideCount);
    currentSlide.addClass('current-slide');

    $('#slide1').removeClass('current-slide');
    num = slideCount;
  }


  // On click - next
  $("#next").click(function(){
    num = num+1;
    slideOutput(num);
    //adjustH();
  });
  // On click - prev
  $("#prev").click(function(){
    num = num-1;
    slideOutput(num);
    //adjustH();
  });
  // End of Image Slider
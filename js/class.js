$(document).on("scroll", function(){
  if
    ($(document).scrollTop() > 700){
    $("svg").addClass("fade");
    updateSliderMargin();
  }
  else
  {
    $("svg").removeClass("fade");
    updateSliderMargin();
  }
});

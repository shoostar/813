$(document).on("scroll", function(){
  if
    ($(document).scrollTop() >700){
    $("header").addClass("fade");
    updateSliderMargin();
  }
  else
  {
    $("header").removeClass("fade");
    updateSliderMargin();
  }
});

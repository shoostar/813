$(document).on("scroll", function(){
  if
    ($(document).scrollTop() > 100){
    $(".homie").addClass("shrink");
    updateSliderMargin();
  }
  else
  {
    $(".homie").removeClass("shrink");
    updateSliderMargin();
  }
});

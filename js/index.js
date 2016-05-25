$(document).on("scroll", function(){
  if
    ($(document).scrollTop() > 100){
    $(".homie").addClass("shrink");
  }
  else
  {
    $(".homie").removeClass("shrink");
  }
});

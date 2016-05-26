// My stupid little nav thingy.
$(document).on("scroll", function(){
  if
    ($(document).scrollTop() > 5){
    $(".homie").addClass("shrink");
  }
  else
  {
    $(".homie").removeClass("shrink");
  }
});

// I'm not a fan of spiders...
$('h1,h2,h3,h4,h5,h6,li,p').each(function() {
  $(this).html($(this).html().replace(/\s([^\s<]+)\s*$/,'&nbsp;$1'));
});

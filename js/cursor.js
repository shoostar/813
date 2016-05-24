

/*CODE FOR CURSOR*/
$('#images').on('mousemove', function(e) {
  $('#cursor').css({
    "transform": "translate3d(" + (e.pageX - 30) + "px, " + (e.pageY - 25) + "px, 0px)"
  });

  if (e.pageX > halfWidth && flag != 'right') {
    $('#cursor').removeClass('left');
    $('#cursor').addClass('right');
    flag = 'right';
  } else if (e.pageX < halfWidth && flag != 'left') {
    $('#cursor').removeClass('right');
    $('#cursor').addClass('left');
    flag = 'left';
  }

  if ((flag == 'right' && !$('#images .half.active').last().next().length) ||
    (flag == 'left' && !$('#images .half.active').first().prev().length)) {
    $('#cursor').addClass('no-more');
  } else {
    $('#cursor').removeClass('no-more');
  }

});

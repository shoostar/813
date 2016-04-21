$().ready(function(){
  $('#b1').click(function(){$('.container').animate({scrollLeft:'0'})})
  $('#b2').click(function(){$('.container').animate({scrollLeft:$('.container').width()})})
  $('#b3').click(function(){$('.container').animate({scrollLeft:$('.container').width()*2})})
})

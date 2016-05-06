(function($){

  $(document).ready(function() {
    var classes = [ 'w--1of3', 'w--1of2', 'w--2of3' ];
    $('.random').each(function(i) {
      $(this).addClass(classes[ Math.floor( Math.random()*classes.length ) ] );
    });
  });

})(jQuery);

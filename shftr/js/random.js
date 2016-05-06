(function($){
 
  $(document).ready(function() {
    var classes = [ 'col-1-4', 'col-1-4 push-1-4', 'col-1-4 push-1-2', 'col-1-2', 'col-1-2 push-1-4', 'col-1-2 push-1-2', 'col-3-4', 'col-3-4 push-1-4' ];
    $('.random').each(function(i) {
      $(this).addClass(classes[ Math.floor( Math.random()*classes.length ) ] );
    });
    var classes = [ 'bg-1', 'bg-2', 'bg-3', 'bg-4', 'bg-5', 'bg-6', 'bg-7', 'bg-8' ];
    $('.ran-bg').each(function(i) {
      $(this).addClass(classes[ Math.floor( Math.random()*classes.length ) ] );
    });
  });
 
})(jQuery);
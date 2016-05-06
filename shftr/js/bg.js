(function(bg){
 
  bg(document).ready(function() {
    var classes = [ 'bg-1', 'bg-2', 'bg-3', 'bg-4', 'bg-5', 'bg-6', 'bg-7', 'bg-8' ]; // the backgrounds you want to add
    bg('.ran-bg').each(function(i) { // the element(s) you want to add the background to.
      bg(this).addClass(classes[ Math.floor( Math.random()*classes.length ) ] );
    });
  });
 
})(jQuery);
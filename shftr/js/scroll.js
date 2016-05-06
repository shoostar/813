document.addEventListener('DOMContentLoaded', function () {  
	var stickyNavTop = $('.nav').offset().top;  
	  
	var stickyNav = function(){  
	var scrollTop = $(window).scrollTop();  
	       
	if (scrollTop > stickyNavTop) {   
	    $('.nav').addClass('sticky');
	    $('.poncho').addClass('sticky-icky');
	    $('.logo-nav').addClass('logo-show');
	} else {  
	    $('.nav').removeClass('sticky');
	    $('.poncho').removeClass('sticky-icky');
	    $('.logo-nav').removeClass('logo-show');
	}  
	};  
	  
	stickyNav();  
	  
	$(window).scroll(function() {  
	    stickyNav();  
	});  
});
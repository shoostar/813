$(function() {
	var cdSlider = $(".cd-slider"),
		slides = cdSlider.find('li'),
		nav = cdSlider.children('nav'),
		count = nav.children('.count');

	if ( slides.length <= 1 ) {
		nav.css('display', 'none');
	}

	slides.eq(0).addClass('current');
  slides.last().addClass('prev_slide');

	count.append('<span class="current_number">1</span><span class="total">'+ slides.length +'</span>');

	var updateCount = function (nextIndex, prevIndex) {
		$(".current_number").text(nextIndex + 1, prevIndex + 1);
	}

	function nextSlider() {
		var current = cdSlider.find('li.current'),
			nextSlide = ( current.next().length > 0 ) ? current.next() : slides.eq(0);

		nextSlide.addClass('current').removeClass('prev_slide').siblings().removeClass('current');
		nextSlide.prevAll().addClass('prev_slide');
		nextSlide.nextAll().removeClass('prev_slide');

		if ( nextSlide.index() == slides.last().index() ) {
			slides.eq(0).removeClass('prev_slide');
		}

		if ( nextSlide.index() == 0 ) {
			slides.last().addClass('prev_slide');
		}

		updateCount(nextSlide.index());

	}

	function prevSlider() {
		var current = cdSlider.find('li.current'),
			prevSlide = ( current.prev().length > 0 ) ? current.prev() : slides.last();

		prevSlide.addClass('current').removeClass('prev_slide').siblings().removeClass('current');
		prevSlide.prevAll().addClass('prev_slide');

		if ( prevSlide.index() == 0 ) {
			slides.last().addClass('prev_slide');
		}

		if ( prevSlide.index() == slides.last().index() ) {
			prevSlide.prevAll().addClass('prev_slide');
			slides.eq(0).removeClass('prev_slide');
		}

		updateCount(prevSlide.index());

	}

	$(".next").on('click', function(event) {
		event.preventDefault();
		nextSlider();
	});

	$(".prev").on('click', function(event) {
		event.preventDefault();
		prevSlider();
	});

	$(document).keyup(function(event) {
		if (event.which=='37') {
			prevSlider();
		} else if (event.which=='39') {
			nextSlider();
		}
	});

});

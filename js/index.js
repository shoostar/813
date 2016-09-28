// Widows
// $('p').each(function() {
//   $(this).html($(this).html().replace(/\s([^\s<]+)\s*$/,'&nbsp;$1'));
// });



// Glitch
var Glitch = function() {
  function Glitch() {
    this._text = document.querySelector('.heading');
    this._filter = document.querySelector('.svg-filters');
    this._turb = this._filter.querySelector('#filter feTurbulence');
    this._turbVal = {
      val: 0.000001
    };
    this._turbValX = {
      val: 0.000001
    };
    this.createTimeline();
  }
  Glitch.prototype.createTimeline = function() {
    var _this = this;
    this.timeline = new TimelineMax({
      repeat: 9999,
      onUpdate: function() {
        _this._turb.setAttribute('baseFrequency', _this._turbVal.val + ' ' + _this._turbValX.val);
      }
    });

    this.timeline.to(this._turbValX, 0.1, {
      val: 0.3,
      ease: Power0.easeNone
    }, 0.25);


  };
  return Glitch;
}();
new Glitch();



// .portfolio-item background colors
$('figcaption').hover( function() {
    $(this).css({ "background-color" : $(this).attr('data-color') });
});



// SO MUCH ROOM FOR ACTIVITIES!!!
function Quote(text, author) {
  this.text = text;
  this.author = author;
}

var quotes = [];
quotes.push(new Quote("thinking about what to eat for lunch", "Will work for homemade apple pie"));
quotes.push(new Quote("keeping his suey chopped", "He doesn't really care for Chinese food"));
quotes.push(new Quote("listening to obnoxiously loud music", "Very metalhead, but listens to anything"));

var getNewRandomQuote = function() {
  return quotes[Math.floor(Math.random() * quotes.length)];
};

$(document).ready(function() {
  var displayNewQuote = function() {
    var newQuote = getNewRandomQuote();

    $("#text").html(newQuote.text);
    $("#author").html(newQuote.author);
  };

  displayNewQuote();
});



// Lazy load backgrounds
function lazyLoadBg(el, imageSource) {
  $('<img/>').attr('src', imageSource).on({
    load: function() {
      $(this).remove();
      $(el).css('backgroundImage', 'url(' + imageSource + ')');
      $(el).css('opacity', '1');
    },
    error: function() {
      $(this).remove();
    }
  });
}

$('.lazy').each(function(index, el) {
  lazyLoadBg(el, $(el).data('src'));
});



// Simple parallax background
var cover = document.querySelector('.parallax'),
  coverHeight = Math.round(cover.offsetHeight),
  translate,
  parallaxThreshold = 3;

function parallax() {
  if (window.scrollY < coverHeight) {
    translate = Math.round(window.scrollY / parallaxThreshold);
    window.requestAnimationFrame(function() {
      cover.style.transform = 'translateY(' + translate + 'px)';
    });
  }
}

parallax();

window.addEventListener('scroll', parallax, false);

window.addEventListener('resize', debounce(function() {
  coverHeight = Math.round(cover.offsetHeight);
}, 800));

function debounce(fn, wait) {
  var timeout;
  return function() {
    clearTimeout(timeout);
    timeout = setTimeout(function() {
      fn.apply(this, arguments)
    }, (wait || 1));
  }
}



// Simple slider
function Carousel(element) {
  this._autoDuration = 0;
  this._container = element.querySelector('.slider');
  this._interval = null;
  this._nav = element.querySelector('.nav-slider');
  this._slide = 0;
  this._touchAnchorX = 0;
  this._touchTime = 0;
  this._touchX1 = 0;
  this._touchX2 = 0;
  element.addEventListener('click', this);
  element.addEventListener('touchstart', this);
  element.addEventListener('touchmove', this);
  element.addEventListener('touchend', this);
  element.addEventListener('transitionend', this);
  window.addEventListener('blur', this);
  window.addEventListener('focus', this);
  this.set(0);
}

Carousel.prototype.auto = function(ms) {
  if (this._interval) {
    clearInterval(this._interval);
    this._interval = null;
  }
  if (ms) {
    this._autoDuration = ms;
    var self = this;
    this._interval = setInterval(function() {
      self.next();
    }, ms);
  }
}

Carousel.prototype.handleEvent = function(event) {
  if (event.touches && event.touches.length > 0) {
    this._touchTime = +new Date;
    this._touchX1 = this._touchX2;
    this._touchX2 = event.touches[0].screenX;
  }

  var screen = document.documentElement.clientWidth;
  var position = this._slide + (this._touchAnchorX - this._touchX2) / screen;
  var velocity = (new Date - this._touchTime) <= 200 ? (this._touchX1 - this._touchX2) / screen : 0;

  switch (event.type) {
    case 'blur':
      this.auto(0);
      break;
    case 'click':
      if (event.target.parentNode != this._nav) break;
      var i = parseInt(event.target.dataset.slide);
      if (!isNaN(i)) {
        event.preventDefault();
        this.auto(0);
        this.set(i);
      }
      break;
    case 'focus':
      this.auto(this._autoDuration);
      break;
    case 'touchstart':
      event.preventDefault();
      this.auto(0);
      this._container.style.transition = 'none';
      this._touchAnchorX = this._touchX1 = this._touchX2;
      break;
    case 'touchmove':
      this._container.style.transform = 'translate3d(' + (-position * 100) + 'vw, 0, 0)';
      break;
    case 'touchend':
      this._container.style.transition = '';
      var offset = Math.min(Math.max(velocity * 4, -0.5), 0.5);
      this.set(Math.round(position + offset));
      break;
    case 'transitionend':
      var i = this._slide,
        count = this._countSlides();
      if (i >= 0 && i < count) break;
      // The slides should wrap around. Instantly move to just outside screen on the other end.
      this._container.style.transition = 'none';
      this._container.style.transform = 'translate3d(' + (i < 0 ? -count * 100 : 100) + 'vw, 0, 0)';
      // Force changes to be applied sequentially by reflowing the element.
      this._container.offsetHeight;
      this._container.style.transition = '';
      this._container.offsetHeight;
      // Animate the first/last slide in.
      this.set(i < 0 ? count - 1 : 0);
      break;
  }
};

Carousel.prototype.next = function() {
  this.set(this._slide + 1);
};

Carousel.prototype.previous = function() {
  this.set(this._slide - 1);
};

Carousel.prototype.set = function(i) {
  var count = this._countSlides();
  if (i < 0) {
    i = -1;
  } else if (i >= count) {
    i = count;
  }
  this._slide = i;
  this._container.style.transform = 'translate3d(' + (-i * 100) + 'vw, 0, 0)';
  this._updateNav();
};

Carousel.prototype._countSlides = function() {
  return this._container.querySelectorAll('.slide').length;
};

Carousel.prototype._updateNav = function() {
  var html = '',
    count = this._countSlides();
  for (var i = 0; i < count; i++) {
    if (i > 0) html += '&nbsp;';
    html += '<a' + (i == this._slide ? ' class="current"' : '') + ' data-slide="' + i + '" href="#">●</a>';
  }
  this._nav.innerHTML = html;
}

var carousels = Array.prototype.map.call(document.querySelectorAll('.carousel'), function(element) {
  var carousel = new Carousel(element);
  carousel.auto(5000);
  return carousel;
});

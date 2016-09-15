// Widows
$('p').each(function() {
  $(this).html($(this).html().replace(/\s([^\s<]+)\s*$/,'&nbsp;$1'));
});



// Simple parallax background
window.addEventListener('resize', function(){
  if(window.innerWidth > 800){
    $(window).scroll(function() {
      $('.parallax').css('background-position','center calc(50% + '+($(window).scrollTop()*0.813)+'px');
    });
  }
});



// Smooth scrolling
// new SmoothScroll();
//
// function SmoothScroll(el) {
//   var t = this, h = document.documentElement;
//   el = el || window;
//   t.rAF = false;
//   t.target = 0;
//   t.scroll = 0;
//   t.animate = function() {
//     t.scroll += (t.target - t.scroll) * 0.25;
//     if (Math.abs(t.scroll.toFixed(5) - t.target) <= 0.47131) {
//       cancelAnimationFrame(t.rAF);
//       t.rAF = false;
//     }
//     if (el == window) scrollTo(0, t.scroll);
//     else el.scrollTop = t.scroll;
//     if (t.rAF) t.rAF = requestAnimationFrame(t.animate);
//   };
//   el.onmousewheel = function(e) {
//     e.preventDefault();
//     e.stopPropagation();
//     var scrollEnd = (el == window) ? h.scrollHeight - h.clientHeight : el.scrollHeight - el.clientHeight;
//     t.target += (e.wheelDelta > 0) ? -100 : 100;
//     if (t.target < 0) t.target = 0;
//     if (t.target > scrollEnd) t.target = scrollEnd;
//     if (!t.rAF) t.rAF = requestAnimationFrame(t.animate);
//   };
//   el.onscroll = function() {
//     if (t.rAF) return;
//     t.target = (el == window) ? pageYOffset || h.scrollTop : el.scrollTop;
//     t.scroll = t.target;
//   };
// }



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

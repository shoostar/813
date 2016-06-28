// My stupid little nav thingy
$(document).on("scroll", function(){
  if
    ($(document).scrollTop() > 5){
    $(".main-nav").addClass("shrink");
  }
  else
  {
    $(".main-nav").removeClass("shrink");
  }
});



// I'm not a fan of spiders
$('h1,h2,h3,h4,h5,h6,p,a').each(function() {
  $(this).html($(this).html().replace(/\s([^\s<]+)\s*$/,'&nbsp;$1'));
});



// Simple fader
( function () {

  var items = $('.fader figure');
  var total = items.length;
  var current = 0;

  setInterval ( function(){
   $ ( items[current] ).removeClass('show');
    ++current;
    if( current >= total ) current = 0;
   $ ( items[current] ).addClass('show');

  }, 3000);

}) ();



// Magical Scrolling COLORS
$(window).scroll(function() {

  // selectors
  var $window = $(window),
    $main = $('main'),
    $panel = $('.panel');

  // Change 33% earlier than scroll position so colour is there when you arrive.
  var scroll = $window.scrollTop() + ($window.height() / 3);

  $panel.each(function() {
    var $this = $(this);

    // if position is within range of this panel.
    // So position of (position of top of div <= scroll position) && (position of bottom of div > scroll position).
    // Remember we set the scroll to 33% earlier in scroll var.
    if ($this.position().top <= scroll && $this.position().top + $this.height() > scroll) {

      // Remove all classes on body with color-
      $main.removeClass(function(index, css) {
        return (css.match(/(^|\s)color-\S+/g) || []).join(' ');
      });

      // Add class of currently active div
      $main.addClass('color-' + $(this).data('color'));
    }
  });

}).scroll();



// Navigational scrolling
$('a[href^="#"]').on('click', function(e) {
  e.preventDefault();
  var target = this.hash,
    $target = $(target);
  $('html, body').stop().animate({
    'scrollTop': $target.offset().top
  }, 500, 'swing', function() {
    window.location.hash = target;
  });
});



// Simple gallery
$(function($){
  'use strict';
  $.fn.darthFader = function(params){
    var defaults = {
      waitTime: false,
      dots: true,
      items: '.item',
      activeClass: 'active',
      speed: 200
    };

    var options = $.extend(defaults, params),
        container = this,
        items = container.find(options.items),
        curItem = 0,
        timer = false;

    if(options.dots){
      var dots = $(Array(items.length + 1).join('<li></li>')).on('click', function(){
        curItem = $(this).index();
        changeItem();
      });
      dots.first().addClass(options.activeClass);
      $('<ul></ul>').addClass('fader-dots').append(dots).appendTo(container);
    }

    if(options.waitTime){
      timer = setTimeout(function(){
        nextItem();
      }, options.waitTime);
    }

    function nextItem(){
      curItem = (curItem >= items.length - 1)? 0 : curItem+1;
      changeItem();
    }

    function changeItem(){
      if(timer){
        clearTimeout(timer);
      }

      if(options.dots){
        dots.removeClass(options.activeClass);
        dots.eq(curItem).addClass(options.activeClass);
      }

      items.removeClass(options.activeClass);
      items.eq(curItem).addClass(options.activeClass);

      if(options.waitTime){
        timer = setTimeout(function(){
          nextItem();
        }, options.waitTime + options.speed);
      }
    }
  };
}(jQuery));

$('.fader').darthFader({
  speed: 1,
  waitTime: 2000
});



// SVG glitch filter
'use strict';
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
    }, 1);
    this.timeline.set(this._turbValX, {
      val: 0,
      ease: Power0.easeNone
    }, 2);

  };
  return Glitch;
}();
new Glitch();



// SO MUCH ROOM FOR ACTIVITIES!!!
$(document).ready(function() {

  // list all activities only once
  var lastActivity = "";
  var whichActivityToChoose = "";

  // time to get investors
  function getTheActivity() {  
    $.getJSON("js/lets-party.js", function(json) {
      var html = "";

      // don't be boring and do an activity twice in a row
      while (whichActivityToChoose === lastActivity) {
        whichActivityToChoose = Math.floor(Math.random() * 10); // returns a number between 0 and 9
      }
      lastActivity = whichActivityToChoose;

      // we need to show people how we're gonna party
      json = json.filter(function(val) {
        return (val.id == whichActivityToChoose);
      });

      json.forEach(function(val) {
        html += val.Activity;
      });
      $(".activity").html(html);
    });
  };
  // because there's so much room for them
  getTheActivity();
});



// Fire Modal
$('.modal-btn').click(function(e) {
  $('.modal').addClass('active');
  e.preventDefault();
});

$('.close-btn').click(function(e) {
  $('.modal').removeClass('active');
  e.preventDefault();
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



// Sticky polyfill
(function(doc,win){var watchArray=[],scroll,initialized=false,html=doc.documentElement,noop=function(){},checkTimer,hiddenPropertyName='hidden',visibilityChangeEventName='visibilitychange';if(doc.webkitHidden!==undefined){hiddenPropertyName='webkitHidden';visibilityChangeEventName='webkitvisibilitychange';}if(!win.getComputedStyle){seppuku();}var prefixes=['','-webkit-','-moz-','-ms-'],block=document.createElement('div');for(var i=prefixes.length-1;i>=0;i--){try{block.style.position=prefixes[i]+'sticky';}catch(e){}if(block.style.position!=''){seppuku();}}updateScrollPos();function seppuku(){init=add=rebuild=pause=stop=kill=noop;}function mergeObjects(targetObj,sourceObject){for(var key in sourceObject){if(sourceObject.hasOwnProperty(key)){targetObj[key]=sourceObject[key];}}}function parseNumeric(val){return parseFloat(val)||0;}function updateScrollPos(){scroll={top:win.pageYOffset,left:win.pageXOffset};}function onScroll(){if(win.pageXOffset!=scroll.left){updateScrollPos();rebuild();return;}if(win.pageYOffset!=scroll.top){updateScrollPos();recalcAllPos();}}function onWheel(event){setTimeout(function(){if(win.pageYOffset!=scroll.top){scroll.top=win.pageYOffset;recalcAllPos();}},0);}function recalcAllPos(){for(var i=watchArray.length-1;i>=0;i--){recalcElementPos(watchArray[i]);}}function recalcElementPos(el){if(!el.inited)return;var currentMode=(scroll.top<=el.limit.start?0:scroll.top>=el.limit.end?2:1);if(el.mode!=currentMode){switchElementMode(el,currentMode);}}function fastCheck(){for(var i=watchArray.length-1;i>=0;i--){if(!watchArray[i].inited)continue;var deltaTop=Math.abs(getDocOffsetTop(watchArray[i].clone)-watchArray[i].docOffsetTop),deltaHeight=Math.abs(watchArray[i].parent.node.offsetHeight-watchArray[i].parent.height);if(deltaTop>=2||deltaHeight>=2)return false;}return true;}function initElement(el){if(isNaN(parseFloat(el.computed.top))||el.isCell||el.computed.display=='none')return;el.inited=true;if(!el.clone)clone(el);if(el.parent.computed.position!='absolute'&&el.parent.computed.position!='relative')el.parent.node.style.position='relative';recalcElementPos(el);el.parent.height=el.parent.node.offsetHeight;el.docOffsetTop=getDocOffsetTop(el.clone);}function deinitElement(el){var deinitParent=true;el.clone&&killClone(el);mergeObjects(el.node.style,el.css);for(var i=watchArray.length-1;i>=0;i--){if(watchArray[i].node!==el.node&&watchArray[i].parent.node===el.parent.node){deinitParent=false;break;}};if(deinitParent)el.parent.node.style.position=el.parent.css.position;el.mode=-1;}function initAll(){for(var i=watchArray.length-1;i>=0;i--){initElement(watchArray[i]);}}function deinitAll(){for(var i=watchArray.length-1;i>=0;i--){deinitElement(watchArray[i]);}}function switchElementMode(el,mode){var nodeStyle=el.node.style;switch(mode){case 0:nodeStyle.position='absolute';nodeStyle.left=el.offset.left+'px';nodeStyle.right=el.offset.right+'px';nodeStyle.top=el.offset.top+'px';nodeStyle.bottom='auto';nodeStyle.width='auto';nodeStyle.marginLeft=0;nodeStyle.marginRight=0;nodeStyle.marginTop=0;break;case 1:nodeStyle.position='fixed';nodeStyle.left=el.box.left+'px';nodeStyle.right=el.box.right+'px';nodeStyle.top=el.css.top;nodeStyle.bottom='auto';nodeStyle.width='auto';nodeStyle.marginLeft=0;nodeStyle.marginRight=0;nodeStyle.marginTop=0;break;case 2:nodeStyle.position='absolute';nodeStyle.left=el.offset.left+'px';nodeStyle.right=el.offset.right+'px';nodeStyle.top='auto';nodeStyle.bottom=0;nodeStyle.width='auto';nodeStyle.marginLeft=0;nodeStyle.marginRight=0;break;}el.mode=mode;}function clone(el){el.clone=document.createElement('div');var refElement=el.node.nextSibling||el.node,cloneStyle=el.clone.style;cloneStyle.height=el.height+'px';cloneStyle.width=el.width+'px';cloneStyle.marginTop=el.computed.marginTop;cloneStyle.marginBottom=el.computed.marginBottom;cloneStyle.marginLeft=el.computed.marginLeft;cloneStyle.marginRight=el.computed.marginRight;cloneStyle.padding=cloneStyle.border=cloneStyle.borderSpacing=0;cloneStyle.fontSize='1em';cloneStyle.position='static';cloneStyle.cssFloat=el.computed.cssFloat;el.node.parentNode.insertBefore(el.clone,refElement);}function killClone(el){el.clone.parentNode.removeChild(el.clone);el.clone=undefined;}function getElementParams(node){var computedStyle=getComputedStyle(node),parentNode=node.parentNode,parentComputedStyle=getComputedStyle(parentNode),cachedPosition=node.style.position;node.style.position='relative';var computed={top:computedStyle.top,marginTop:computedStyle.marginTop,marginBottom:computedStyle.marginBottom,marginLeft:computedStyle.marginLeft,marginRight:computedStyle.marginRight,cssFloat:computedStyle.cssFloat,display:computedStyle.display},numeric={top:parseNumeric(computedStyle.top),marginBottom:parseNumeric(computedStyle.marginBottom),paddingLeft:parseNumeric(computedStyle.paddingLeft),paddingRight:parseNumeric(computedStyle.paddingRight),borderLeftWidth:parseNumeric(computedStyle.borderLeftWidth),borderRightWidth:parseNumeric(computedStyle.borderRightWidth)};node.style.position=cachedPosition;var css={position:node.style.position,top:node.style.top,bottom:node.style.bottom,left:node.style.left,right:node.style.right,width:node.style.width,marginTop:node.style.marginTop,marginLeft:node.style.marginLeft,marginRight:node.style.marginRight},nodeOffset=getElementOffset(node),parentOffset=getElementOffset(parentNode),parent={node:parentNode,css:{position:parentNode.style.position},computed:{position:parentComputedStyle.position},numeric:{borderLeftWidth:parseNumeric(parentComputedStyle.borderLeftWidth),borderRightWidth:parseNumeric(parentComputedStyle.borderRightWidth),borderTopWidth:parseNumeric(parentComputedStyle.borderTopWidth),borderBottomWidth:parseNumeric(parentComputedStyle.borderBottomWidth)}},el={node:node,box:{left:nodeOffset.win.left,right:html.clientWidth-nodeOffset.win.right},offset:{top:nodeOffset.win.top-parentOffset.win.top-parent.numeric.borderTopWidth,left:nodeOffset.win.left-parentOffset.win.left-parent.numeric.borderLeftWidth,right:-nodeOffset.win.right+parentOffset.win.right-parent.numeric.borderRightWidth},css:css,isCell:computedStyle.display=='table-cell',computed:computed,numeric:numeric,width:nodeOffset.win.right-nodeOffset.win.left,height:nodeOffset.win.bottom-nodeOffset.win.top,mode:-1,inited:false,parent:parent,limit:{start:nodeOffset.doc.top-numeric.top,end:parentOffset.doc.top+parentNode.offsetHeight-parent.numeric.borderBottomWidth-node.offsetHeight-numeric.top-numeric.marginBottom}};return el;}function getDocOffsetTop(node){var docOffsetTop=0;while(node){docOffsetTop+=node.offsetTop;node=node.offsetParent;}return docOffsetTop;}function getElementOffset(node){var box=node.getBoundingClientRect();return{doc:{top:box.top+win.pageYOffset,left:box.left+win.pageXOffset},win:box};}function startFastCheckTimer(){checkTimer=setInterval(function(){!fastCheck()&&rebuild();},500);}function stopFastCheckTimer(){clearInterval(checkTimer);}function handlePageVisibilityChange(){if(!initialized)return;if(document[hiddenPropertyName]){stopFastCheckTimer();}else{startFastCheckTimer();}}function init(){if(initialized)return;updateScrollPos();initAll();win.addEventListener('scroll',onScroll);win.addEventListener('wheel',onWheel);win.addEventListener('resize',rebuild);win.addEventListener('orientationchange',rebuild);doc.addEventListener(visibilityChangeEventName,handlePageVisibilityChange);startFastCheckTimer();initialized=true;}function rebuild(){if(!initialized)return;deinitAll();for(var i=watchArray.length-1;i>=0;i--){watchArray[i]=getElementParams(watchArray[i].node);}initAll();}function pause(){win.removeEventListener('scroll',onScroll);win.removeEventListener('wheel',onWheel);win.removeEventListener('resize',rebuild);win.removeEventListener('orientationchange',rebuild);doc.removeEventListener(visibilityChangeEventName,handlePageVisibilityChange);stopFastCheckTimer();initialized=false;}function stop(){pause();deinitAll();}function kill(){stop();while(watchArray.length){watchArray.pop();}}function add(node){for(var i=watchArray.length-1;i>=0;i--){if(watchArray[i].node===node)return;};var el=getElementParams(node);watchArray.push(el);if(!initialized){init();}else{initElement(el);}}function remove(node){for(var i=watchArray.length-1;i>=0;i--){if(watchArray[i].node===node){deinitElement(watchArray[i]);watchArray.splice(i,1);}};}win.Stickyfill={stickies:watchArray,add:add,remove:remove,init:init,rebuild:rebuild,pause:pause,stop:stop,kill:kill};})(document,window);if(window.jQuery){(function($){$.fn.Stickyfill=function(options){this.each(function(){Stickyfill.add(this);});return this;};})(window.jQuery);}

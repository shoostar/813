// My stupid little nav thingy
$(document).on("scroll", function(){
  if
    ($(document).scrollTop() > 5){
    $(".homie").addClass("shrink");
  }
  else
  {
    $(".homie").removeClass("shrink");
  }
});



// I'm not a fan of spiders
$('h1,h2,h3,h4,h5,h6,li,p').each(function() {
  $(this).html($(this).html().replace(/\s([^\s<]+)\s*$/,'&nbsp;$1'));
});



/*! Lazy Load XT v1.1.0 2016-01-12
 * http://ressio.github.io/lazy-load-xt
 * (C) 2016 RESS.io
 * Licensed under MIT */

// LazyLoadXT
(function($,window,document,undefined){'use strict';var lazyLoadXT='lazyLoadXT',dataLazied='lazied',load_error='load error',classLazyHidden='lazy-hidden',docElement=document.documentElement||document.body,forceLoad=(window.onscroll===undefined||!!window.operamini||!docElement.getBoundingClientRect),options={autoInit:true,selector:'img[data-src]',blankImage:'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',throttle:99,forceLoad:forceLoad,loadEvent:'pageshow',updateEvent:'load orientationchange resize scroll touchmove focus',forceEvent:'lazyloadall',oninit:{removeClass:'lazy'},onshow:{addClass:classLazyHidden},onload:{removeClass:classLazyHidden,addClass:'lazy-loaded'},onerror:{removeClass:classLazyHidden},checkDuplicates:true},elementOptions={srcAttr:'data-src',edgeX:0,edgeY:0,visibleOnly:true},$window=$(window),$isFunction=$.isFunction,$extend=$.extend,$data=$.data||function(el,name){return $(el).data(name);},elements=[],topLazy=0,waitingMode=0;$[lazyLoadXT]=$extend(options,elementOptions,$[lazyLoadXT]);function getOrDef(obj,prop){return obj[prop]===undefined?options[prop]:obj[prop];}function scrollTop(){var scroll=window.pageYOffset;return(scroll===undefined)?docElement.scrollTop:scroll;}$.fn[lazyLoadXT]=function(overrides){overrides=overrides||{};var blankImage=getOrDef(overrides,'blankImage'),checkDuplicates=getOrDef(overrides,'checkDuplicates'),scrollContainer=getOrDef(overrides,'scrollContainer'),forceShow=getOrDef(overrides,'show'),elementOptionsOverrides={},prop;$(scrollContainer).on('scroll',queueCheckLazyElements);for(prop in elementOptions){elementOptionsOverrides[prop]=getOrDef(overrides,prop);}return this.each(function(index,el){if(el===window){$(options.selector).lazyLoadXT(overrides);}else{var duplicate=checkDuplicates&&$data(el,dataLazied),$el=$(el).data(dataLazied,forceShow?-1:1);if(duplicate){queueCheckLazyElements();return;}if(blankImage&&el.tagName==='IMG'&&!el.src){el.src=blankImage;}$el[lazyLoadXT]=$extend({},elementOptionsOverrides);triggerEvent('init',$el);elements.push($el);queueCheckLazyElements();}});};function triggerEvent(event,$el){var handler=options['on'+event];if(handler){if($isFunction(handler)){handler.call($el[0]);}else{if(handler.addClass){$el.addClass(handler.addClass);}if(handler.removeClass){$el.removeClass(handler.removeClass);}}}$el.trigger('lazy'+event,[$el]);queueCheckLazyElements();}function triggerLoadOrError(e){triggerEvent(e.type,$(this).off(load_error,triggerLoadOrError));}function checkLazyElements(force){if(!elements.length){return;}force=force||options.forceLoad;topLazy=Infinity;var viewportTop=scrollTop(),viewportHeight=window.innerHeight||docElement.clientHeight,viewportWidth=window.innerWidth||docElement.clientWidth,i,length;for(i=0,length=elements.length;i<length;i++){var $el=elements[i],el=$el[0],objData=$el[lazyLoadXT],removeNode=false,visible=force||$data(el,dataLazied)<0,topEdge;if(!$.contains(docElement,el)){removeNode=true;}else if(force||!objData.visibleOnly||el.offsetWidth||el.offsetHeight){if(!visible){var elPos=el.getBoundingClientRect(),edgeX=objData.edgeX,edgeY=objData.edgeY;topEdge=(elPos.top+viewportTop-edgeY)-viewportHeight;visible=(topEdge<=viewportTop&&elPos.bottom>-edgeY&&elPos.left<=viewportWidth+edgeX&&elPos.right>-edgeX);}if(visible){$el.on(load_error,triggerLoadOrError);triggerEvent('show',$el);var srcAttr=objData.srcAttr,src=$isFunction(srcAttr)?srcAttr($el):el.getAttribute(srcAttr);if(src){el.src=src;}removeNode=true;}else{if(topEdge<topLazy){topLazy=topEdge;}}}if(removeNode){$data(el,dataLazied,0);elements.splice(i--,1);length--;}}if(!length){triggerEvent('complete',$(docElement));}}function timeoutLazyElements(){if(waitingMode>1){waitingMode=1;checkLazyElements();setTimeout(timeoutLazyElements,options.throttle);}else{waitingMode=0;}}function queueCheckLazyElements(e){if(!elements.length){return;}if(e&&e.type==='scroll'&&e.currentTarget===window){if(topLazy>=scrollTop()){return;}}if(!waitingMode){setTimeout(timeoutLazyElements,0);}waitingMode=2;}function initLazyElements(){$window.lazyLoadXT();}function forceLoadAll(){checkLazyElements(true);}$(document).ready(function(){triggerEvent('start',$window);$window.on(options.updateEvent,queueCheckLazyElements).on(options.forceEvent,forceLoadAll);$(document).on(options.updateEvent,queueCheckLazyElements);if(options.autoInit){$window.on(options.loadEvent,initLazyElements);initLazyElements();}});})(window.jQuery||window.Zepto||window.$,window,document);

// LazyLoadXT BG
(function ($) {
    var options = $.lazyLoadXT,
        bgAttr = options.bgAttr || 'data-bg';

    options.selector += ',[' + bgAttr + ']';

    $(document).on('lazyshow', function (e) {
        var $this = $(e.target),
            url = $this.attr(bgAttr);
        if (!!url) {
            $this
                .css('background-image', "url('" + url + "')")
                .removeAttr(bgAttr)
                .triggerHandler('load');
        }
    });

})(window.jQuery || window.Zepto || window.$);

$(function(){
    var bgAttr = 'data-bg';
    var $lazyBg = $('[data-bg]');

    // temp fix for lazy load bg
    // look for any element with attr `data-bg`
    //
    // event doesn't have to be `lazyshow`
    // you can also just use $lazyBg.each(...);
    // but haven't fully tested that one
    //
    // with `lazyshow` it ensures it runs inside
    // the lazyloadxt plugin
    // other lazyload events will probably work
    // I unfortunately don't know how to use them
    // I tried... :(
    $lazyBg.on('lazyshow', function (e) {
        var $el = $(e.target);
        var imgSrc = $el.attr(bgAttr);

        // check if image has loaded
        // create a test image element for this
        // image source
        var $img = $('<img/>');
        $img.attr('src', imgSrc);

        // if loaded remove class
        $img.on('load', function(e){
            $el.removeClass('lazy-hidden').addClass('lazy-loaded');
        });
    });
});



// Sticky polyfill
(function(doc,win){var watchArray=[],scroll,initialized=false,html=doc.documentElement,noop=function(){},checkTimer,hiddenPropertyName='hidden',visibilityChangeEventName='visibilitychange';if(doc.webkitHidden!==undefined){hiddenPropertyName='webkitHidden';visibilityChangeEventName='webkitvisibilitychange';}if(!win.getComputedStyle){seppuku();}var prefixes=['','-webkit-','-moz-','-ms-'],block=document.createElement('div');for(var i=prefixes.length-1;i>=0;i--){try{block.style.position=prefixes[i]+'sticky';}catch(e){}if(block.style.position!=''){seppuku();}}updateScrollPos();function seppuku(){init=add=rebuild=pause=stop=kill=noop;}function mergeObjects(targetObj,sourceObject){for(var key in sourceObject){if(sourceObject.hasOwnProperty(key)){targetObj[key]=sourceObject[key];}}}function parseNumeric(val){return parseFloat(val)||0;}function updateScrollPos(){scroll={top:win.pageYOffset,left:win.pageXOffset};}function onScroll(){if(win.pageXOffset!=scroll.left){updateScrollPos();rebuild();return;}if(win.pageYOffset!=scroll.top){updateScrollPos();recalcAllPos();}}function onWheel(event){setTimeout(function(){if(win.pageYOffset!=scroll.top){scroll.top=win.pageYOffset;recalcAllPos();}},0);}function recalcAllPos(){for(var i=watchArray.length-1;i>=0;i--){recalcElementPos(watchArray[i]);}}function recalcElementPos(el){if(!el.inited)return;var currentMode=(scroll.top<=el.limit.start?0:scroll.top>=el.limit.end?2:1);if(el.mode!=currentMode){switchElementMode(el,currentMode);}}function fastCheck(){for(var i=watchArray.length-1;i>=0;i--){if(!watchArray[i].inited)continue;var deltaTop=Math.abs(getDocOffsetTop(watchArray[i].clone)-watchArray[i].docOffsetTop),deltaHeight=Math.abs(watchArray[i].parent.node.offsetHeight-watchArray[i].parent.height);if(deltaTop>=2||deltaHeight>=2)return false;}return true;}function initElement(el){if(isNaN(parseFloat(el.computed.top))||el.isCell||el.computed.display=='none')return;el.inited=true;if(!el.clone)clone(el);if(el.parent.computed.position!='absolute'&&el.parent.computed.position!='relative')el.parent.node.style.position='relative';recalcElementPos(el);el.parent.height=el.parent.node.offsetHeight;el.docOffsetTop=getDocOffsetTop(el.clone);}function deinitElement(el){var deinitParent=true;el.clone&&killClone(el);mergeObjects(el.node.style,el.css);for(var i=watchArray.length-1;i>=0;i--){if(watchArray[i].node!==el.node&&watchArray[i].parent.node===el.parent.node){deinitParent=false;break;}};if(deinitParent)el.parent.node.style.position=el.parent.css.position;el.mode=-1;}function initAll(){for(var i=watchArray.length-1;i>=0;i--){initElement(watchArray[i]);}}function deinitAll(){for(var i=watchArray.length-1;i>=0;i--){deinitElement(watchArray[i]);}}function switchElementMode(el,mode){var nodeStyle=el.node.style;switch(mode){case 0:nodeStyle.position='absolute';nodeStyle.left=el.offset.left+'px';nodeStyle.right=el.offset.right+'px';nodeStyle.top=el.offset.top+'px';nodeStyle.bottom='auto';nodeStyle.width='auto';nodeStyle.marginLeft=0;nodeStyle.marginRight=0;nodeStyle.marginTop=0;break;case 1:nodeStyle.position='fixed';nodeStyle.left=el.box.left+'px';nodeStyle.right=el.box.right+'px';nodeStyle.top=el.css.top;nodeStyle.bottom='auto';nodeStyle.width='auto';nodeStyle.marginLeft=0;nodeStyle.marginRight=0;nodeStyle.marginTop=0;break;case 2:nodeStyle.position='absolute';nodeStyle.left=el.offset.left+'px';nodeStyle.right=el.offset.right+'px';nodeStyle.top='auto';nodeStyle.bottom=0;nodeStyle.width='auto';nodeStyle.marginLeft=0;nodeStyle.marginRight=0;break;}el.mode=mode;}function clone(el){el.clone=document.createElement('div');var refElement=el.node.nextSibling||el.node,cloneStyle=el.clone.style;cloneStyle.height=el.height+'px';cloneStyle.width=el.width+'px';cloneStyle.marginTop=el.computed.marginTop;cloneStyle.marginBottom=el.computed.marginBottom;cloneStyle.marginLeft=el.computed.marginLeft;cloneStyle.marginRight=el.computed.marginRight;cloneStyle.padding=cloneStyle.border=cloneStyle.borderSpacing=0;cloneStyle.fontSize='1em';cloneStyle.position='static';cloneStyle.cssFloat=el.computed.cssFloat;el.node.parentNode.insertBefore(el.clone,refElement);}function killClone(el){el.clone.parentNode.removeChild(el.clone);el.clone=undefined;}function getElementParams(node){var computedStyle=getComputedStyle(node),parentNode=node.parentNode,parentComputedStyle=getComputedStyle(parentNode),cachedPosition=node.style.position;node.style.position='relative';var computed={top:computedStyle.top,marginTop:computedStyle.marginTop,marginBottom:computedStyle.marginBottom,marginLeft:computedStyle.marginLeft,marginRight:computedStyle.marginRight,cssFloat:computedStyle.cssFloat,display:computedStyle.display},numeric={top:parseNumeric(computedStyle.top),marginBottom:parseNumeric(computedStyle.marginBottom),paddingLeft:parseNumeric(computedStyle.paddingLeft),paddingRight:parseNumeric(computedStyle.paddingRight),borderLeftWidth:parseNumeric(computedStyle.borderLeftWidth),borderRightWidth:parseNumeric(computedStyle.borderRightWidth)};node.style.position=cachedPosition;var css={position:node.style.position,top:node.style.top,bottom:node.style.bottom,left:node.style.left,right:node.style.right,width:node.style.width,marginTop:node.style.marginTop,marginLeft:node.style.marginLeft,marginRight:node.style.marginRight},nodeOffset=getElementOffset(node),parentOffset=getElementOffset(parentNode),parent={node:parentNode,css:{position:parentNode.style.position},computed:{position:parentComputedStyle.position},numeric:{borderLeftWidth:parseNumeric(parentComputedStyle.borderLeftWidth),borderRightWidth:parseNumeric(parentComputedStyle.borderRightWidth),borderTopWidth:parseNumeric(parentComputedStyle.borderTopWidth),borderBottomWidth:parseNumeric(parentComputedStyle.borderBottomWidth)}},el={node:node,box:{left:nodeOffset.win.left,right:html.clientWidth-nodeOffset.win.right},offset:{top:nodeOffset.win.top-parentOffset.win.top-parent.numeric.borderTopWidth,left:nodeOffset.win.left-parentOffset.win.left-parent.numeric.borderLeftWidth,right:-nodeOffset.win.right+parentOffset.win.right-parent.numeric.borderRightWidth},css:css,isCell:computedStyle.display=='table-cell',computed:computed,numeric:numeric,width:nodeOffset.win.right-nodeOffset.win.left,height:nodeOffset.win.bottom-nodeOffset.win.top,mode:-1,inited:false,parent:parent,limit:{start:nodeOffset.doc.top-numeric.top,end:parentOffset.doc.top+parentNode.offsetHeight-parent.numeric.borderBottomWidth-node.offsetHeight-numeric.top-numeric.marginBottom}};return el;}function getDocOffsetTop(node){var docOffsetTop=0;while(node){docOffsetTop+=node.offsetTop;node=node.offsetParent;}return docOffsetTop;}function getElementOffset(node){var box=node.getBoundingClientRect();return{doc:{top:box.top+win.pageYOffset,left:box.left+win.pageXOffset},win:box};}function startFastCheckTimer(){checkTimer=setInterval(function(){!fastCheck()&&rebuild();},500);}function stopFastCheckTimer(){clearInterval(checkTimer);}function handlePageVisibilityChange(){if(!initialized)return;if(document[hiddenPropertyName]){stopFastCheckTimer();}else{startFastCheckTimer();}}function init(){if(initialized)return;updateScrollPos();initAll();win.addEventListener('scroll',onScroll);win.addEventListener('wheel',onWheel);win.addEventListener('resize',rebuild);win.addEventListener('orientationchange',rebuild);doc.addEventListener(visibilityChangeEventName,handlePageVisibilityChange);startFastCheckTimer();initialized=true;}function rebuild(){if(!initialized)return;deinitAll();for(var i=watchArray.length-1;i>=0;i--){watchArray[i]=getElementParams(watchArray[i].node);}initAll();}function pause(){win.removeEventListener('scroll',onScroll);win.removeEventListener('wheel',onWheel);win.removeEventListener('resize',rebuild);win.removeEventListener('orientationchange',rebuild);doc.removeEventListener(visibilityChangeEventName,handlePageVisibilityChange);stopFastCheckTimer();initialized=false;}function stop(){pause();deinitAll();}function kill(){stop();while(watchArray.length){watchArray.pop();}}function add(node){for(var i=watchArray.length-1;i>=0;i--){if(watchArray[i].node===node)return;};var el=getElementParams(node);watchArray.push(el);if(!initialized){init();}else{initElement(el);}}function remove(node){for(var i=watchArray.length-1;i>=0;i--){if(watchArray[i].node===node){deinitElement(watchArray[i]);watchArray.splice(i,1);}};}win.Stickyfill={stickies:watchArray,add:add,remove:remove,init:init,rebuild:rebuild,pause:pause,stop:stop,kill:kill};})(document,window);if(window.jQuery){(function($){$.fn.Stickyfill=function(options){this.each(function(){Stickyfill.add(this);});return this;};})(window.jQuery);}



// Project page slider
var project = $('.project');
var pLink = project.find('.project__link');
var pBg = project.find('.project__bg-item');

var changeBg = function() {
  var thisProject = $(this);
  var thisProjectIndex = thisProject.parent().index();
  var thisProjectBg = pBg.eq(thisProjectIndex);

  // hide all backgrounds and fade out project names
  pBg.removeClass('project__bg-item--active');
  pLink.css('opacity', '0.25');

  // reveal the project bg you hovered over and increase opacity for that name
  thisProject.css('opacity', '1');
  thisProjectBg.addClass('project__bg-item--active');
};

var showFirst = function() {
  // when the page loads reveal the first project
  pLink.css('opacity', '0.25');
  pLink.parent().first().children().css('opacity', '1');
  pBg.first().addClass('project__bg-item--active');
}

var init = function() {
  $(document).on('ready', showFirst);
  pLink.on('mouseenter', changeBg);
};

init();



//Home page slider (not in use anymore; leaving this here 'just in case')
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

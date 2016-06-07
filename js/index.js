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



$(".modal").on("click", function() {
  $("main").toggleClass("open");
});

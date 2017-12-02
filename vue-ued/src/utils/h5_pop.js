$(function(){
	var $window = $(window);
	var $mask = $('.mask');
	var $popDetail = $('.popDetail').eq(0);
	//detail pop
	$('body').on('click','.a-img img ',__detail);
	function __detail(){
		$popDetail.fadeOut();
		var $t = $(this);
		var obj = {act:'getarticledesc',arcid:$t.attr('arcid')};
			$popDetail.fadeIn();
			$mask.fadeIn();
			var swiper_container = '.pop1 .swiper-container',swiper_btn_next = '.pop1 .t_r',swiper_btn_prev = '.pop1 .t_l';

		    $('.swiper-container').each(function(){
		    	var $t = $(this);
		    	var $li = $t.find('.swiper-slide');
		    	var len = $li.length;
		    	var liheight = $li.eq(0).outerHeight(true);
		    	if(len==1){
		    		$(swiper_btn_next).addClass('swiper-button-disabled');
		    	}
		    	$t.find('.swiper-wrapper').css({
		    		'height':len*liheight,
		    		'position':'absolute',
		    		'top':'0',
		    		'left':'0',
		    		'display':'block'
		    	});
		    	$li.css('height','auto');

		    }).css({'overflow':'visible'});
		   
		    function __turnleft(){
		    	var $t=$(this) ,
		    		$list = $t.closest('.picMain').find('.swiper-container') , 
		    		$ul = $list.find('.swiper-wrapper') 
		    		;
		    	var liheight = $ul.find('.swiper-slide').eq(0).find('img').height()+7,
		    		len = $ul.find('.swiper-slide').length,
		    		ultop = $ul.css('top'),
		    		ulheight = liheight*(len-2)
		    	;
		    	if(len<1) return;
		    	if($t.is('.swiper-button-disabled')) return;
		    	if(parseInt(ultop) == -liheight){
		    		if($ul.is(':animated')) return
		    		$ul.animate({'top':'+='+liheight+'px'});
		    		$t.addClass('swiper-button-disabled');
		    		$t.next().removeClass('swiper-button-disabled');
		    		return;
		    		// $ul.animate({'top':'0px'});
		    	}else{
		    		if($ul.is(':animated')) return
		    		$t.next().removeClass('swiper-button-disabled');
		    		$ul.animate({'top':'+='+liheight+'px'});
		    	}
		    }
		    $(swiper_btn_prev).click(__turnleft);
		   
		    function __turnright(){
		    	var $t=$(this) , 
		    		$list = $t.closest('.picMain').find('.swiper-container') ,
		    		$ul = $list.find('.swiper-wrapper') 
		    		;
		    	var liheight = $ul.find('.swiper-slide').eq(0).find('img').height()+7,
		    		len = $ul.find('.swiper-slide').length,
		    		ultop = $ul.css('top'),
		    		ulheight = liheight*(len-2)
		    	;
		    	if(len<1) return;
		    	if($t.is('.swiper-button-disabled')) return;
		    	if(parseInt(ultop) == -parseInt(ulheight)){
		    		if($ul.is(':animated')) return
		    		$ul.animate({'top':'-='+liheight+'px'});
		    		$t.addClass('swiper-button-disabled');
		    		$t.prev().removeClass('swiper-button-disabled');
		    		return;
		    	}else{
		    		if($ul.is(':animated')) return
		    		$t.prev().removeClass('swiper-button-disabled');
		    		$ul.animate({'top':'-='+liheight+'px'});
		    	}
		    }
		    $(swiper_btn_next).click(__turnright);

	};
	var $pop_close = $('.pop-close');
	$('body').on('click','.pop-close',function(){
		$popDetail.fadeOut();
		$mask.fadeOut();
	});
	$mask.click(function(){
		$pop_close.click();
	});

	})
(function(){
	var videoData = {'film':{'titleImg': 'img/png/title-film.png','text':'卡地亚诚邀您欣赏我们的全新品牌宣传大片，\n一起沉浸在Juste Un Clou的世界','src':''},
					 'bonus':{'titleImg': 'img/png/title-bonus.png','text':'揭开幕后知错过程。\n观看导演、演员、摄影师的访谈','src':''},
					 'luhan':{'titleImg': 'img/png/title-luhan.png','text':'男演员、歌手鹿晗年纪轻轻就展现多才多艺的才华，他以唱歌跳舞来\n表现自我，对于表演的热情从来不曾消减。他举手土族之间展现出\n自然不扭捏的自信，他敢于追求自己的梦想，从不停下他的脚步。','src':''},
					 'lisa':{'titleImg': 'img/png/title-lisa.png','text':'时尚导演Lisa Paclet，她擅长完美的结合舞蹈、时尚、艺术在她的影\n像之中，她浪漫的性格与精准的肢体动作指导使得这次影片达到一个\n尽善尽美的视觉飨宴。','src':''},
					 'liqi':{'titleImg': 'img/png/title-liqi.png','text':'时尚摄影师李奇，他在黑白摄影中博主哦永垂不朽的经典。通过他的镜\n头，每一位大明星总能自在的展现本真的自我。李奇不造作，坦荡荡\n的艺术家气息完全符合Juste un Clou精神。','src':''}};

	var shopData = {};
	
	initHeadBar();
	window.setTimeout(function(){
		initMenu();
	},50);	
	initShopWrap();
	initGalleryWrap();
	//initVideoWrap, initShopWrap and initGalleryWrap should run after load.js has completed

	//init the menu by assigning the img src and bind click functions
	function initMenu(){
		//var $_linkArr = $('.menu .menuLink');
		$('.menu .menuLink').each(function(index,item){
			$(this).find('img').attr('src','img/jpg/menu-'+this.getAttribute('data-para')+'.jpg');
			$(this).bind('click',function(){
				return showWrap(this.getAttribute('data-type'),this.getAttribute('data-para'));
			});
		});

		var height = window.innerHeight,
      		rem = document.getElementsByTagName('html')[0].style['font-size'].slice(0, -2),
      		maxHeight = height - 1.6 * parseInt(rem);
      	if($('.menu').height() <= maxHeight){
      		$('.menu').css('min-height', maxHeight+'px');
      	}else{
      		$('.menu').css('max-height', maxHeight+'px');
      		$('.menu').addClass('oversize');
      	}
	}

	function initHeadBar(){
		var $_menuBtn = $('.headBar .menuBtn'),
			$_musicBtn = $('.headBar .musicBtn'),
			$_closeBtn = $('.headBar .closeBtn');
		
		$_menuBtn.bind('click',function(){
			return toggleMenu();
		});

		$_musicBtn.bind('click',function(){
			return toggleMusic();
		});

		$_closeBtn.bind('click',function(){
			return toggleWrap(this.getAttribute('data-target'));
		});
	}

	function showWrap(target,data){
		switch(target){
			case 'video':
				toggleMenu();
				initVideoWrap(data);
				break;
			case 'gallery':
				toggleMenu();
				//initGalleryWrap(data);
				toggleWrap(data);
				break;
			case 'shop':
				toggleMenu();
				toggleWrap(data);
				break;
			default:
				break;
		}
		return;
	}

	function toggleMenu(){
     	// var height = window.innerHeight,
      // 		rem = document.getElementsByTagName('html')[0].style['font-size'].slice(0, -2),
      // 		maxHeight = height - 1.6 * parseInt(rem);
      // 	if($('.menu').height() <= maxHeight){
      // 		$('.menu').css('min-height', maxHeight+'px');
      // 	}else{
      // 		$('.menu').css('max-height', maxHeight+'px');
      // 		$('.menu').addClass('oversize');
      // 	}
      	$('.menu').toggleClass('visible');
    }

    function toggleMusic(){

    }

	function toggleWrap(target){
		$("."+target+"Wrap").toggleClass('visible');
		
		if(target === 'gallery' && $('.gallery-container').hasClass('zoomIn')){
			//if the gallery swiper is visible then reset the gallery by hide the swiper
			window.setTimeout(function(){
				$('.galleryContent').removeClass('zoomOut');
				$('.gallery-container').removeClass('zoomIn').addClass('dn');
				$('.galleryContainer .swiper-btn').addClass('dn');
			},400);
		}

		
	}

	function initVideoWrap(data){
		var obj = videoData[data];
		$('.videoContainer .titleImg').attr('src',obj['titleImg']);
		$('.videoContainer .content').text(obj['text']);

		toggleWrap('video');
	}

	function initShopWrap(data){
		if(!($('.shopWrap').hasClass('initialized'))){
			$('.shopWrap .titleImg').attr('src','img/png/title-shop.png');
			initShopSwiper();
			$('.shopWrap').addClass('initialized');
		}
		// toggleWrap('shop');
	}

	function initGalleryWrap(data){
		if(!($('.galleryWrap').hasClass('initialized'))){
			$('.galleryWrap .titleImg').attr('src','img/png/title-gallery.png');
			initGallerySwiper();
			$('.galleryWrap').addClass('initialized');
		}
		//toggleWrap('gallery');
		
	}

	function initShopSwiper(data){
		//store brief in array, update after transitionEnd
		var briefArr = [];
		//store ring info in Array, update after transitionEnd
		var infoArr = [];
		var ringSwiper = new Swiper('.ring-container',{watchSlidesProgress : true,shortSwipes : true,prevButton:'.shop-button-prev',
nextButton:'.shop-button-next',slidesPerView : 3,slidesPerGroup : 1, onTransitionEnd:function(swiper){updateInfo()}});
        
		
		function updateInfo(){
			var index = ringSwiper.activeIndex+1;
			console.log(index);
			$('.ring-brief').text(briefArr[index]);
			$('.ring-info p').text(briefArr[index]);
		}
	}

	function initGallerySwiper(){
		var gallerySwiper = new Swiper('.gallery-container',{watchSlidesProgress : true,prevButton:'.swiper-button-prev',
nextButton:'.swiper-button-next'});

		var toggleSwiper = function(target){
			if($('.gallery-container').hasClass('dn')){
				//if the swiper is invisible
				gallerySwiper.slideTo(target,50,false);
				$('.galleryContent').addClass('zoomOut');
				$('.gallery-container').addClass('zoomIn').removeClass('dn');
				$('.galleryContainer .swiper-btn').fadeIn(1000);
			}else{
				return;
			}
		}

		$('.galleryContent .galleryImg').each(function(index,item){
			//$(this).find('img').attr('src','img/jpg/menu-'+this.getAttribute('data-para')+'.jpg');
			$(this).bind('click',function(){
				return toggleSwiper(this.getAttribute('data-target'));
			});
		});

		$('.gallery-container').addClass('dn');
		$('.galleryContainer .swiper-btn').addClass('dn');	
	}
}())
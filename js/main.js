
	var videoData = {'film':{'titleImg': 'img/png/title-film.png','text':'卡地亚诚邀您欣赏我们的全新品牌宣传大片，一起沉浸在Juste Un Clou的世界','src':'http://v.qq.com/iframe/player.html?vid=q0307i6fbn9&amp;'},
					 'bonus':{'titleImg': 'img/png/title-bonus.png','text':'揭开幕后制作过程，探索Juste un Clou的世界。','src':'http://v.qq.com/iframe/player.html?vid=j03074zysw0&amp;'},
					 'luhan':{'titleImg': 'img/png/title-luhan.png','text':'男演员、歌手鹿晗年纪轻轻就展现多才多艺的才华，他以唱歌跳舞来表现自我，对于表演的热情从来不曾消减。他举手投足之间展现出自然不扭捏的自信，他敢于追求自己的梦想，从不停下他的脚步。','src':'http://v.qq.com/iframe/player.html?vid=p03071r5vbp&amp;'},
					 'lisa':{'titleImg': 'img/png/title-lisa.png','text':'时尚导演Lisa Paclet，她擅长完美的结合舞蹈、时尚、艺术在她的影像创作之中，她浪漫的性格与精准的肢体动作指导使得这次影片达到一个尽善尽美的视觉飨宴。','src':'http://v.qq.com/iframe/player.html?vid=s0307k3wmkb&amp;'},
					 'liqi':{'titleImg': 'img/png/title-liqi.png','text':'时尚摄影师李奇，他在黑白摄影中博主哦永垂不朽的经典。通过他的镜头，每一位大明星总能自在的展现本真的自我。李奇不造作，坦荡荡的艺术家气息完全符合Juste un Clou精神。','src':''}};

	//initVideoWrap, initShopWrap and initGalleryWrap should run after load.js has completed
	//initVideo is dynamic it is not called at beginning
	initHeadBar();
	window.setTimeout(function(){
		initMenu();
	},1000);	
	//initShopWrap();
	//initGalleryWrap();
	// initMusic();

	//init the menu by assigning the img src and bind click functions
	function initMenu(){
		//var $_linkArr = $('.menu .menuLink');
		var height = window.innerHeight,
      		rem = document.getElementsByTagName('html')[0].style['font-size'].slice(0, -2),
      		maxHeight = height - 1.5 * parseInt(rem);
      	if($('.menu').css('background-image') == 'none'){
      		$('.menu').css('background-image','url(img/jpg/menu-bg.jpg)');
      	}
		$('.menu .menuLink').each(function(index,item){
			$(this).find('img').attr('src','img/jpg/menu-'+this.getAttribute('data-para')+'.jpg');
			$(this).bind('click',function(){
				showWrap(this.getAttribute('data-type'),this.getAttribute('data-para'));
				validTracking('Menu-'+this.getAttribute('data-track'));
			});
		});

      	if($('.menu').height() < maxHeight){
      		$('.menu').css('min-height', maxHeight+'px');
      	}else{
      		$('.menu').addClass('oversize');
      		$('.menu').css('max-height', maxHeight+'px');
      	}
	}

	//initHeadBar img and click function 
	function initHeadBar(){
		var $_menuBtn = $('.headBar .menuBtn'),
			$_musicBtn = $('.headBar .musicBtn'),
			$_closeBtn = $('.headBar .closeBtn');
			$_headImg = $('.headBar .headImg');
		//assign the img src
		$_menuBtn.find('img').attr('src','img/png/btn-menu.png');
		$_musicBtn.find('img').attr('src','img/png/btn-music.png');
		$_closeBtn.find('img').attr('src','img/png/btn-close.png');
		$_headImg.attr('src','img/png/head-logo.png');

		$_menuBtn.bind('click',function(){
			toggleMenu();
			validTracking('Menu');
		});
		$_musicBtn.bind('click',function(){
		 	toggleMusic(this);
		 	validTracking('Menu-Music');
		});
		$_closeBtn.bind('click',function(){

			$('.videoContainer .videoFrame').attr('src','');
		    toggleWrap(this.getAttribute('data-target'));
		});
	}

	function initMusic(){
		var audio = document.getElementById('audio');
		audio.setAttribute('src','Cartier-bg-music.mp3');
	}

	function showWrap(target,data,name){
		switch(target){
			case 'video':
				if($('.menu').hasClass('visible')){
					toggleMenu();
				}
				initVideoWrap(data);
				break;
			case 'gallery':
				if($('.menu').hasClass('visible')){
					toggleMenu();
				}
				if(!($('.galleryWrap').hasClass('initialized'))){
					initGalleryWrap(data);
				}
				toggleWrap(target);
				break;
			case 'shop':
				if($('.menu').hasClass('visible')){
					toggleMenu();
				}
				if(!($('.shopWrap').hasClass('initialized'))){
					initShopWrap(data);
				}
				toggleWrap(target);
				break;
			default:
				break;
		}
		return;
	}

	function toggleMenu(){
      	$('.menu').toggleClass('visible');
      	//$('.overlay').toggleClass('dn');
    }

    function toggleMusic(musicBtn){
    	var audio = document.getElementById('audio');
 		if(!$(musicBtn).hasClass('off')){
 			$(musicBtn).find('img').attr('src','img/png/btn-music-mute.png');
 			audio.pause();
 		}else{
 			$(musicBtn).find('img').attr('src','img/png/btn-music.png');
 			audio.play();
 		}
 		$(musicBtn).toggleClass('off');
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
		var w = $('.videoContainer').width(),
				h = w*0.8;
		//pause music when view the video
		var audio = document.getElementById('audio');
 		if(!$('.headBar .musicBtn').hasClass('off')){
 			$('.headBar .musicBtn').find('img').attr('src','img/png/btn-music-mute.png');
 			audio.pause();
 		}
		$('.videoContainer .titleImg').attr('src',obj['titleImg']);
		$('.videoContainer .content').text(obj['text']);
		$('.videoContainer .videoFrame').css('height',h);
		$('.videoContainer .videoFrame').attr('src','http://v.qq.com/iframe/player.html?vid=i03021lj2zr&amp;'+'width='+w+'&amp;height='+h+'&amp;auto=0');
		//http://v.qq.com/iframe/player.html?vid=i03021lj2zr&tiny=0&auto=0" allowfullscreen></iframe>
		//$('.videoContainer .videoFrame').attr('src',obj['src']+'width='+w+'&amp;height='+h+'&amp;auto=0');
		toggleWrap('video');
	}

	function initShopWrap(data){
		$('.shopWrap .titleImg').attr('src','img/png/title-shop.png');
		initShopSwiper();
		$('.shopWrap').addClass('initialized');
		
	}

	function initGalleryWrap(data){
		$('.galleryWrap .titleImg').attr('src','img/png/title-gallery.png');
		$('.galleryBtn img').attr('src','img/png/btn-menu.png');
		initGallerySwiper();
		$('.galleryWrap').addClass('initialized');
		
	}

	function initShopSwiper(data){
		//store brief in array, update after transitionEnd
		var briefArr = ['Juste un Clou戒指\n18K玫瑰金,钻石','Juste un Clou戒指\r\n白18K金,钻石',
						'Juste un Clou戒指\r\n18K黄金,钻石','Juste un Clou戒指\n18K金,钻石','Juste un Clou戒指\n18K玫瑰金,钻石',
						'Juste un Clou手镯,18K黄金','Juste un Clou戒指\n18K玫瑰金','Juste un Clou手镯\n白18K金,钻石','Juste un Clou手镯\n18K玫瑰金,钻石',
						'Juste un Clou项链\n18K玫瑰金,钻石','Juste un Clou项链\n白18K金,钻石','Juste un Clou项链\n18K黄金,钻石'];
		//store ring info in Array, update after transitionEnd
		var infoArr = ['表达自信不羁的独立精神，彰显个人独特自我。问世于上世纪七十年代纽约的Juste un Clou，体现张扬摩登，特立独行的纽约设计风格，一经推出就广受追捧。作品线条鲜明，将现代气息与大胆创意融为一体。'];
		//store links in array
		var linkArr = ['juste-un-clou戒指/b4210800%20juste%20un%20clou%20ring.html','juste-un-clou戒指/b4211000%20juste%20un%20clou%20ring.html','juste-un-clou戒指/b4211800%20juste%20un%20clou%20ring.html',
					   'juste-un-clou戒指/b4210900%20juste%20un%20clou%20ring.html','juste-un-clou戒指/b4094800%20juste%20un%20clou%20ring.html','juste-un-clou戒指/b4092500%20juste%20un%20clou%20ring.html',
					   'juste-un-clou手镯/b6037817%20juste%20un%20clou%20bracelet.html','juste-un-clou手镯/b6037917%20juste%20un%20clou%20bracelet.html','juste-un-clou手镯/b6039017%20juste%20un%20clou%20bracelet.html',
					   'juste-un-clou项链/b3047000%20juste%20un%20clou%20necklace.html','juste-un-clou项链/b3046900%20juste%20un%20clou%20necklace.html','juste-un-clou项链/b7224511%20juste%20un%20clou%20necklace.html'];
		var updateInfo = function(){
			var index = $(".ring-container .swiper-slide-active").attr('data-ring');
			
			$(".ring-brief").text(briefArr[index]);
			$(".ring-info").text(infoArr[0]);

			$(".shopBtn").attr('href','http://www.cartier.cn/zh-cn/%E7%B3%BB%E5%88%97/%E7%8F%A0%E5%AE%9D%E7%B3%BB%E5%88%97/%E7%B3%BB%E5%88%97/juste-un-clou%E7%B3%BB%E5%88%97/'+linkArr[index]);
		}

		var ringSwiper = new Swiper('.ring-container',{watchSlidesProgress : true,shortSwipes : true,prevButton:'.shop-button-prev',
nextButton:'.shop-button-next',slidesPerView : 3,slidesPerGroup : 1,centeredSlides : true, onTransitionEnd:function(swiper){updateInfo()}});
		$('.ring-container .swiper-slide').each(function(index,item){
			$(this).find('img').attr('src','img/ring/'+(parseInt(this.getAttribute('data-ring'))+1)+'.png');
		});
		ringSwiper.slideTo(1);
		updateInfo();
	}

	function initGallerySwiper(){
		var gallerySwiper = new Swiper('.gallery-container',{watchSlidesProgress : true,prevButton:'.swiper-button-prev',
			nextButton:'.swiper-button-next'});


		var toggleSwiper = function(target){
			if($('.gallery-container').hasClass('dn')){
				//if the swiper is invisible
				gallerySwiper.slideTo(target,50,false);
				$('.galleryContent').removeClass('zoomIn').addClass('zoomOut');
				$('.gallery-container').addClass('zoomIn').removeClass('dn');
				$('.galleryContainer .swiper-btn').removeClass('dn');
				$('.galleryBtn').removeClass('dn');
				window.setTimeout(function(){
					$('.gallery-container').removeClass('zoomIn');
				},1000);
			}else{
				$('.gallery-container').addClass('zoomOut');
				$('.galleryContent').addClass('zoomIn').removeClass('zoomOut');
				$('.galleryContainer .swiper-btn').addClass('dn');
				$('.galleryBtn').addClass('dn');
				window.setTimeout(function(){
					$('.gallery-container').removeClass('zoomOut').addClass('dn');
				},1000);
				
			}
		}

		$('.galleryBtn').bind('click',function(){return toggleSwiper()});

		$('.galleryContent .galleryImg').each(function(index,item){
			$(this).css('background-image','url(img/jpg/luhan-'+(parseInt(this.getAttribute('data-target'))+1)+'.jpg)');
			$(this).bind('click',function(){
				return toggleSwiper(this.getAttribute('data-target'));
			});
		});

		$('.gallery-container .swiper-slide').each(function(index,item){
			$(this).find('img').attr('src','img/jpg/luhan-'+this.getAttribute('data-img')+'.jpg');
			
		});
		// $('.gallery-container .swiper-button-prev').find('img').attr('src','img/png/btn-prev.png');
		// $('.gallery-container .swiper-button-prev').find('img').attr('src','img/png/btn-next.png');
		$('.gallery-container').addClass('dn');
		$('.galleryContainer .swiper-btn').addClass('dn');	
	}

	function hostPointClick(target,data,hostname){
		//_s.cookie.set("hostname",hostname);
		switch(target){
			case 'video':
				initVideoWrap(data);
				break;
			case 'gallery':
				toggleWrap(target);
				break;
			case 'shop':
				toggleWrap(target);
				break;
			default:
				break;
		}
		return;
	}

	function validTracking(eventName){
		ga('360',eventName);
	}

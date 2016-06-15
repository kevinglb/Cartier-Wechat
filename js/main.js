
	//variables for glass effect
	const TWO_PI = Math.PI * 2;
	var images = [], imageIndex = 0;
	var image;
	var vertices = [], indices = [], fragments = [];
	var container = document.getElementById('container');
	var imageWidth = container.width, imageHeight = container.height;
	var clickPosition = [imageWidth * 0.5,imageHeight * 0.5];
	window.onload = function(){
    //TweenMax.set(container, { perspective: 500 });
    	var urls = ['img/jpg/index-bg.jpg'],
    	 	image, loaded = 0;
    	images[0] = image = new Image();
    	image.onload = function(){
            	imagesLoaded();   
    	};
    	image.src = urls[0];
	};

	function imagesLoaded() {
    	//placeImage(false);
   	 	triangulate();
   	 	image = images[0];
   	 	image.addEventListener('click', imageClickHandler);
    	container.appendChild(image);
    	//break the glass
    	//shatter();
	}
	//place the image
	function placeImage(transitionIn) {
    	image = images[imageIndex];
    	if (++imageIndex === images.length)
        	imageIndex = 0;
    	image.addEventListener('click', imageClickHandler);
    	container.appendChild(image);
    }
    function imageClickHandler(event) {
    	var box = image.getBoundingClientRect(), top = box.top, left = box.left;
    	clickPosition[0] = event.clientX - left;
    	clickPosition[1] = event.clientY - top;
    	triangulate();
    	shatter();
	}
	function triangulate() {
    	var rings = [{r: 80,c: 12},{r:80,c:15},{r:100,c:20},{r: 150,c: 12},,{r: 300,c: 12},{r: 1200,c: 12}],
        	x, y, centerX = clickPosition[0], centerY = clickPosition[1];
    	vertices.push([centerX,centerY]);
    	rings.forEach(function (ring) {
        	var radius = ring.r, count = ring.c, variance = radius * 0.25;
        	for (var i = 0; i < count; i++) {
	            x = Math.cos(i / count * TWO_PI) * radius + centerX + randomRange(-variance, variance);
    	        y = Math.sin(i / count * TWO_PI) * radius + centerY + randomRange(-variance, variance);
        	    vertices.push([x,y]);
 	       }
    	});
    	vertices.forEach(function (v) {
        	v[0] = clamp(v[0], 0, imageWidth);
        	v[1] = clamp(v[1], 0, imageHeight);
   	 	});
    	indices = Delaunay.triangulate(vertices);
	}
	function shatter() {
    	var p0, p1, p2, fragment;
    	var tl0 = new TimelineMax({ onComplete: shatterCompleteHandler });
   	 	for (var i = 0; i < indices.length; i += 3) {
       		p0 = vertices[indices[i + 0]];
        	p1 = vertices[indices[i + 1]];
        	p2 = vertices[indices[i + 2]];
        	fragment = new Fragment(p0, p1, p2);
        	var dx = fragment.centroid[0] - clickPosition[0], dy = fragment.centroid[1] - clickPosition[1], d = Math.sqrt(dx * dx + dy * dy), rx = 300 * sign(dy), ry = 900 * -sign(dx);
        	//, delay = d * 0.003 * randomRange(0.1, 0.25)
        	fragment.canvas.style.zIndex = Math.floor(d).toString();
        	var tl1 = new TimelineMax();
        	tl1.to(fragment.canvas, randomRange(0.2,1.5), {
           		z: randomRange(-1500, 1500),
            	rotationX: rx,
            	rotationY: ry,
            	x: randomRange(-2000, 2000),
            	y: randomRange(-2000, 2000),
            	ease: Expo.easeInOut
        	});
        	tl1.to(fragment.canvas, 0.4, { alpha: 0 }, 0.6);
        	tl0.insert(tl1, 0.2);
        	fragments.push(fragment);
        	container.appendChild(fragment.canvas);
    	}
    	container.removeChild(image);
    	image.removeEventListener('click', imageClickHandler);
	}
	function shatterCompleteHandler() {
    	fragments.forEach(function (f) {
        	container.removeChild(f.canvas);
    	});
    	fragments.length = 0;
    	vertices.length = 0;
    	indices.length = 0;
    	//placeImage();
	}
	function randomRange(min, max) {
    	return min + (max - min) * Math.random();
	}
	function clamp(x, min, max) {
    	return x < min ? min : x > max ? max : x;
	}
	function sign(x) {
    	return x < 0 ? -1 : 1;
	}
	//fragment for glass
	Fragment = function (v0, v1, v2) {
    	this.v0 = v0;
    	this.v1 = v1;
    	this.v2 = v2;
    	this.computeBoundingBox();
    	this.computeCentroid();
    	this.createCanvas();
    	this.clip();
	};
	Fragment.prototype = {
    	computeBoundingBox: function () {
        	var xMin = Math.min(this.v0[0], this.v1[0], this.v2[0]), xMax = Math.max(this.v0[0], this.v1[0], this.v2[0]), yMin = Math.min(this.v0[1], this.v1[1], this.v2[1]), yMax = Math.max(this.v0[1], this.v1[1], this.v2[1]);
        	this.box = {
            	x: xMin,
            	y: yMin,
            	w: xMax - xMin,
            	h: yMax - yMin
        	};
    	},
    	computeCentroid: function () {
        	var x = (this.v0[0] + this.v1[0] + this.v2[0]) / 3, y = (this.v0[1] + this.v1[1] + this.v2[1]) / 3;
        	this.centroid = [x,y];
   		},
    	createCanvas: function () {
        	this.canvas = document.createElement('canvas');
        	this.canvas.width = this.box.w;
        	this.canvas.height = this.box.h;
        	this.canvas.style.width = this.box.w + 'px';
        	this.canvas.style.height = this.box.h + 'px';
        	this.canvas.style.left = this.box.x + 'px';
        	this.canvas.style.top = this.box.y + 'px';
        	this.ctx = this.canvas.getContext('2d');
    	},
    	clip: function () {
        	this.ctx.translate(-this.box.x, -this.box.y);
        	this.ctx.beginPath();
       		this.ctx.moveTo(this.v0[0], this.v0[1]);
        	this.ctx.lineTo(this.v1[0], this.v1[1]);
        	this.ctx.lineTo(this.v2[0], this.v2[1]);
        	this.ctx.closePath();
        	this.ctx.clip();
        	this.ctx.drawImage(image, 0, 0);
    	}
	};
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
		var height = window.innerHeight,
      		rem = document.getElementsByTagName('html')[0].style['font-size'].slice(0, -2),
      		maxHeight = height - 1.6 * parseInt(rem);

		$('.menu .menuLink').each(function(index,item){
			$(this).find('img').attr('src','img/jpg/menu-'+this.getAttribute('data-para')+'.jpg');
			$(this).bind('click',function(){
				return showWrap(this.getAttribute('data-type'),this.getAttribute('data-para'));
			});
		});

      	if($('.menu').height() <= maxHeight){
      		$('.menu').css('min-height', maxHeight+'px');
      	}else{
      		$('.menu').css('max-height', maxHeight+'px');
      		$('.menu').addClass('oversize');
      	}

      	$('.overlay').bind('click',function(){
      		return toggleMenu();
      	})

	}

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
				toggleWrap(target);
				break;
			case 'shop':
				toggleMenu();
				toggleWrap(target);
				break;
			default:
				break;
		}
		return;
	}

	function toggleMenu(){

      	$('.menu').toggleClass('visible');
      	$('.overlay').toggleClass('dn');

    
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

	function hostPointClick(target,data,hostname){
		_s.cookie.set("hostname",hostname);
		console.log('click');
		switch(target){
			case 'video':
				initVideoWrap(data);
				break;
			case 'gallery':
				//initGalleryWrap(data);
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


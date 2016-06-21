var loadcompleted = false;
(function(){
	var circle = document.getElementById('loadCircle'),
		loadContainer = document.getElementsByClassName('loadContainer')[0],
		loadWrap = document.getElementsByClassName('loadWrap')[0],
        loadLogo = document.getElementsByClassName('loadLogo')[0],
		ctx = circle.getContext('2d'),
		cx = circle.width/2,
		cy = circle.height/2,
		num = 0,//图片计数器
		numLength = 50,//图片总数量
		percentage = document.getElementsByClassName('loadNum')[0],
		spinner = document.getElementsByClassName('loadSpinner')[0],
	    //overlay = document.getElementsByClassName('overlay')[0],
        navi = document.getElementsByClassName('navi')[0],
		a = 0,
        b = 0;

    //svg part
    var $svg = document.querySelector('.r-progress-bar'),
        $circle = document.querySelector('.r-progress-bar > .bar');
        //img/png/load-spinner.png
	// var b=setInterval(function(){
	// 	if (num<=numLength) {//百分比
	// 		a = num/numLength * 300;//310为最后弧度
	// 		percentage.innerHTML = parseInt(num/numLength*100) + '%'
	// 		ctx.beginPath();
	// 		ctx.arc(cx,cy,circle.width*0.47, -45*Math.PI/180, a*Math.PI/180);
	// 		ctx.lineWidth = 2;
	// 		ctx.strokeStyle="#fff";
	// 		ctx.stroke();//圆
	// 		ctx.closePath();
	// 		num++;
	// 	}else {
	// 	    window.clearInterval(b);
 //            b = 0;
 //            //swith the cavas circle with the img one
 //            circle.style.display = 'none';
 //            spinner.style.display = 'block';

 //            if(!loadContainer.classList.contains('expand')){
 //                loadContainer.classList += ' expand';
 //            } 
 //            percentage.style.display = 'none';
 //            if(!circle.classList.contains('expand')){
 //                circle.classList += ' expand';
 //            } 
 //            window.setTimeout(function(){
 //                if(!spinner.classList.contains('rotating')){
 //                    spinner.classList += ' rotating';
 //                }
 //            },500);
	//    }
 //    },20);
	
	ctx.beginPath();
	ctx.strokeStyle="#fff"; 
	ctx.lineWidth = 2; 
	ctx.moveTo(circle.width*0.78 , circle.height*0.19);//戒指横线
	ctx.lineTo(circle.width*0.87 , circle.height*0.1);
	ctx.stroke();//横线
	ctx.closePath();
	loadImg();
    //'img/jpg/360_f.jpg','img/jpg/360_l.jpg','img/jpg/360_b.jpg','img/jpg/360_d.jpg','img/jpg/360_u.jpg','img/jpg/360_r.jpg',
	function loadImg(){
		var imgArr = ['img/jpg/index-bg.jpg','img/png/load-spinner.png','img/png/glass-bg.png','img/png/btn1.png','img/png/btn2.png','img/png/btn3.png','img/png/btn4.png','img/png/btn6.png','img/png/btn7.png'];
		var num = 1,
			len = imgArr.length;
		for(var i=0;i<imgArr.length;i++){
            var image = new Image();
            image.src = imgArr[i];
            // image.onload = function(){
            //     num++;
            // };
        }
        b = window.setInterval(function(){
            if(loadcompleted){
                num++;
                updateLoader(num,len);
            }else{
                num++;
                len++;
                updateLoader(num,len);
            }
        },50);

        if(!spinner.getAttribute('src')){
            spinner.setAttribute('src', 'img/png/load-spinner.png');
        }
    }
    function updateLoader(num,len){
        if(num && len){
        // var b=setInterval(function(num){
		  if (num != len) {//百分比
			// a = num/len*290;//310为最后弧度
			index = parseInt(num/len * 100);
			percentage.innerHTML = index + '%'
			// ctx.beginPath();
			// ctx.arc(cx,cy,circle.width*0.47, -45*Math.PI/180, a*Math.PI/180);
			// ctx.lineWidth = 2;
			// ctx.strokeStyle="#fff";
			// ctx.stroke();//圆
			// ctx.closePath();
            var r = $circle.getAttribute('r');
            var c = Math.PI * (r * 2);
            var pct = ((100 - index)/100) * c;
            $circle.style.strokeDashoffset = pct;
		  }else{
			//clear the interval
			// window.clearInterval(b);
			// b = 0;
			//swith the cavas circle with the img one
            window.clearInterval(b);
            b = 0;
            $svg.style.display = 'none';
			circle.style.display = 'none';
                        //circle.style.display = 'none';
            percentage.style.display = 'none';
			spinner.classList.remove('dn');
            loadLogo.classList.remove('dn');
			if(!loadContainer.classList.contains('expand')){
				loadContainer.classList.add('expand');  
			} 
            //percentage.classList.add('dn');
			// if(!circle.classList.contains('expand')){
			// 	circle.classList.add(' expand');
			// } 
			window.setTimeout(function(){
				if(!spinner.classList.contains('rotating')){
					spinner.classList.add('rotating');
				    
                }
                loadWrap.addEventListener('click', imageClickHandler);
			},500);
		  }
				// },20);
                // if(num >= imgArr.length && typeof callback == "function"){
                //     //console.log(callback);
                //     callback(); //the default 'this' in callback will refer to window scoop
                // };
        }
    }
	
    
	//variables for glass effect
	const TWO_PI = Math.PI * 2;
	var images = [], imageIndex = 0;
	var image;
	var vertices = [], indices = [], fragments = [], fragment;
	var container = document.getElementById('container');
	var imageWidth = window.innerWidth, imageHeight = window.innerHeight;
	var clickPosition = [imageWidth * 0.5,imageHeight * 0.5];
	window.onload = function(){
    //TweenMax.set(container, { perspective: 500 });
    	var urls = ['img/png/glass-bg.png'],
    	 	image, loaded = 0;
    	images[0] = image = new Image();
    	image.onload = function(){
            	
           if (++loaded === 1) {
            imagesLoaded();
            for (var i = 1; i < 4; i++) {
                // if (window.CP.shouldStopExecution(1)) {
                //     break;
                // }
                images[i] = image = new Image();
                image.src = urls[i];
            }
        }		
    	};
    	image.src = urls[0];
	};

	function imagesLoaded() {
    	placeImage(false);
   	 	triangulate();
        
    	//break the glass
    	//shatter();
	}
	//place the image
	function placeImage(transitionIn) {
    	image = images[imageIndex];
    	if (++imageIndex === images.length)
        imageIndex = 0;
    	
        image.style.opacity = 0;
        container.appendChild(image);
    }
    function imageClickHandler(event) {
    	var box = loadWrap.getBoundingClientRect(), top = box.top, left = box.left;
    	clickPosition[0] = event.clientX - left;
    	clickPosition[1] = event.clientY - top;
        image.style.opacity = 1;
    	//triangulate();

        window.setTimeout(function(){
            shatter();
            loadWrap.style.background = 'transparent';
            container.style.background = 'transparent';
        },500);
    	//tracking code
        validTracking('Experience');
	}
	function triangulate() {
    	var rings = [{r: 80,c: 12},{r:100,c:20},{r: 150,c: 12},{r: 300,c: 12},{r: 1200,c: 12}],//{r: 1200,c: 12}
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
    	//console.log(vertices);
    	indices = Delaunay.triangulate(vertices);
    	//console.log(indices);

        var p0, p1, p2;
	    for (var i = 0; i < indices.length; i += 3) {
            p0 = vertices[indices[i + 0]];
            p1 = vertices[indices[i + 1]];
            p2 = vertices[indices[i + 2]];
            fragment = new Fragment(p0, p1, p2);
            fragment.dx = fragment.centroid[0] - clickPosition[0], fragment.dy = fragment.centroid[1] - clickPosition[1], fragment.d = Math.sqrt(fragment.dx * fragment.dx + fragment.dy * fragment.dy);
            //, delay = d * 0.003 * randomRange(0.1, 0.25)
            fragment.canvas.style.zIndex = Math.floor(fragment.d).toString();
            fragment.canvas.style.display='none';
            // var tl1 = new TimelineMax();
            // tl1.to(fragment.canvas, randomRange(0.2,1.6), {
            //     z: randomRange(-1500, 1500),
            //     rotationX: rx,
            //     rotationY: ry,
            //     x: randomRange(-2000, 2000),
            //     y: randomRange(-2000, 2000),
            //     ease: Expo.easeInOut
            // });
            // tl1.to(fragment.canvas, 0.4, { alpha: 0 }, 0.6);
            // tl0.insert(tl1, 0.2);
            fragments.push(fragment);
            container.appendChild(fragment.canvas);
        }
        
        //console.log(fragments);
    }
	function shatter() {
    	// var p0, p1, p2;
    	var tl0 = new TimelineMax({ onComplete: shatterCompleteHandler });

        loadContainer.classList.add('dn');
   	 // 	for (var i = 0; i < indices.length; i += 3) {
     //   		p0 = vertices[indices[i + 0]];
     //    	p1 = vertices[indices[i + 1]];
     //    	p2 = vertices[indices[i + 2]];
     //    	fragment = new Fragment(p0, p1, p2);
     //    	var dx = fragment.centroid[0] - clickPosition[0], dy = fragment.centroid[1] - clickPosition[1], d = Math.sqrt(dx * dx + dy * dy), rx = 300 * sign(dy), ry = 900 * -sign(dx);
     //    	//, delay = d * 0.003 * randomRange(0.1, 0.25)
     //    	fragment.canvas.style.zIndex = Math.floor(d).toString();
     //    	var tl1 = new TimelineMax();
     //    	tl1.to(fragment.canvas, randomRange(0.2,1.6), {
     //       		z: randomRange(-1500, 1500),
     //        	rotationX: rx,
     //        	rotationY: ry,
     //        	x: randomRange(-2000, 2000),
     //        	y: randomRange(-2000, 2000),
     //        	ease: Expo.easeInOut
     //    	});
     //    	tl1.to(fragment.canvas, 0.4, { alpha: 0 }, 0.6);
     //    	tl0.insert(tl1, 0.2);
     //    	fragments.push(fragment);
     //    	container.appendChild(fragment.canvas);
    	// }
        for(var i =0;i<fragments.length;i++){
            fragments[i].canvas.style.display = 'block';
            var rx = 300 * sign(fragments[i].dy), ry = 900 * -sign(fragments[i].dx); 
            var tl1 = new TimelineMax();

            tl1.to(fragments[i].canvas, randomRange(0.2,1.6), {
                z: randomRange(-1500, 1500),
                rotationX: rx,
                rotationY: ry,
                x: randomRange(-2000, 2000),
                y: randomRange(-2000, 2000),
                ease: Expo.easeInOut
            });
            tl1.to(fragments[i].canvas, 0.4, { alpha: 0 }, 2);
            tl0.insert(tl1, 0.2);
            // fragments.push(fragment);
            
        }
        //container.appendChild(fragments);
        container.removeChild(image);
        // if(overlay.classList.contains('dn')){
        //     overlay.classList.remove('dn');
        // }
        if(navi.classList.contains('dn')){
            navi.classList.remove('dn');
        }
        
        loadWrap.removeEventListener('click', imageClickHandler);
        
        window.setTimeout(function(){
            loadWrap.classList.add('dn');
            //overlay.classList.add('fadeOut');
            navi.classList.add('fadeOut');
            loadcomplete();
        },2500);
    	
        window.setTimeout(function(){
           // overlay.classList.remove('fadeOut');
           // overlay.classList.add('dn');
            navi.classList.remove('fadeOut');
            navi.classList.add('dn');
           // overlay.addEventListener('click',toggleMenu);
            initMusic();
        },4000);
        
       
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


	
}());

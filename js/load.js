(function(){
	var circle = document.getElementById('loadCircle'),
		loadContainer = document.getElementsByClassName('loadContainer')[0],
		
		// circle.width = loadContainer.clientWidth,
		// circle.height = loadContainer.clientHeight,

		ctx = circle.getContext('2d'),
		cx = circle.width/2,
		cy = circle.height/2,
		num=0,//图片计数器
		numLength=50,//图片总数量
		percentage = document.getElementsByClassName('loadNum')[0],
		spinner = document.getElementsByClassName('loadSpinner')[0],
	
		//loadLogo = document.getElementsByClassName('loadLogo')[0],
		index=0,
		a=0;
		// console.log(cx);

// 	var b=setInterval(function(){
// 		if (num<=numLength) {//百分比
// 			a = num/numLength*290;//310为最后弧度
// 			index=parseInt(num/numLength*100);
// 			percentage.innerHTML=index+'%'
// 			ctx.beginPath();
// 			ctx.arc(cx,cy,circle.width*0.47, -45*Math.PI/180, a*Math.PI/180);
// 			ctx.lineWidth = 2;
// 			ctx.strokeStyle="#fff";
// 			ctx.stroke();//圆
// 			ctx.closePath();
// 			num++;
// 		}else {
// 		//clear the interval
// 		window.clearInterval(b);
// 		b = 0;
// 		//swith the cavas circlee with the img one
// 		circle.style.display = 'none';
// 		spinner.style.display = 'block';

// 		percentage.classList += ' hide';

// 		loadContainer.classList += ' expand';
// 		percentage.style.display = 'none';
// 		circle.className += "expand";
// 		window.setTimeout(function(){
// 			spinner.classList += ' rotating';
// 		},600);
// 	}
// },50);
	
	ctx.beginPath();
	ctx.strokeStyle="#fff"; 
	ctx.lineWidth = 2; 
	ctx.moveTo(circle.width*0.78 , circle.height*0.19);//戒指横线
	ctx.lineTo(circle.width*0.87 , circle.height*0.1);
	ctx.stroke();//横线
	ctx.closePath();
	loadImg();
	function loadImg(){
		var imgArr = ['img/png/title-film.png','img/png/title-bonus.png','img/png/title-luhan.png','img/png/title-lisa.png','img/png/title-liqi.png',
					'img/png/title-gallery.png','img/png/title-shop.png','img/jpg/menu-bonus.jpg','img/jpg/menu-film.jpg','img/jpg/menu-luhan.jpg',
					'img/jpg/menu-lisa.jpg','img/jpg/menu-liqi.jpg','img/jpg/menu-gallery.jpg','img/jpg/menu-shop.jpg','img/jpg/menu-bg.jpg',
					'img/complete-bracelet/grisvert-silver.png','img/complete-bracelet/orrose-gold.png','img/complete-bracelet/orrose-silver.png',
					'img/complete-bracelet/turquoise-silver.png','img/complete-bracelet/agrent-gold.png','img/complete-bracelet/blanc-silver.png',
					'img/complete-bracelet/vert-silver.png','img/complete-bracelet/bleu-gold.png'];
		var num = 0,
			len = imgArr.length;
		for(var i=0;i<imgArr.length;i++){
            var image = new Image();
            image.src = imgArr[i];
            //imgArr[i].image= image;
            image.onload = function(){
                num++;
                var b=setInterval(function(){
					if (num!=len) {//百分比
						a = num/len*290;//310为最后弧度
						index=parseInt(num/len*100);
						percentage.innerHTML=index+'%'
						ctx.beginPath();
						ctx.arc(cx,cy,circle.width*0.47, -45*Math.PI/180, a*Math.PI/180);
						ctx.lineWidth = 2;
						ctx.strokeStyle="#fff";
						ctx.stroke();//圆
						ctx.closePath();
					}else {
					//clear the interval
						window.clearInterval(b);
						b = 0;
						//swith the cavas circlee with the img one
						circle.style.display = 'none';
						spinner.style.display = 'block';

						percentage.classList += ' hide';

						if(!loadContainer.classList.contains('expand')){
							loadContainer.classList += ' expand';
						} 
						percentage.style.display = 'none';
						 
						if(!circle.classList.contains('expand')){
							circle.classList += ' expand';
						} 
						window.setTimeout(function(){
							
							if(!spinner.classList.contains('rotating')){
								spinner.classList += ' rotating';
							}
						},600);
					}
				},10);
                // if(num >= imgArr.length && typeof callback == "function"){
                //     //console.log(callback);
                //     callback(); //the default 'this' in callback will refer to window scoop
                // };
            }
        }
	}
}());

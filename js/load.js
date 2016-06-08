$(function(){
	var circle = document.getElementById('loadCircle'),
		loadContainer = document.getElementsByClassName('loadContainer')[0],
		// circle.width = loadContainer.clientWidth,
		// circle.height = loadContainer.clientHeight,

		iconCtx = circle.getContext('2d'),
		iconX = circle.width/2,
		iconY = circle.height/2,
		num=0,//图片计数器
		numLength=50,//图片总数量
		percentage = document.getElementsByClassName('loadNum')[0],
		spinner = document.getElementsByClassName('loadSpinner')[0],
	
		//loadLogo = document.getElementsByClassName('loadLogo')[0],
		index=0,
		a=0;
		console.log(iconX);
	var b=setInterval(function(){
		if (num<=numLength) {//百分比
			a=num/numLength*290;//310为最后弧度
			index=parseInt(num/numLength*100);
			percentage.innerHTML=index+'%'
			iconCtx.beginPath();
			iconCtx.arc(iconX,iconY,circle.width*0.47, -45*Math.PI/180, a*Math.PI/180);
			iconCtx.lineWidth = 2;
			iconCtx.strokeStyle="#fff";
			iconCtx.stroke();//圆
			iconCtx.closePath();
			num++;
		}else {
		//clear the interval
		window.clearInterval(b);
		b = 0;
		//swith the cavas circlee with the img one
		circle.style.display = 'none';
		spinner.style.display = 'block';

		percentage.classList += ' hide';

		loadContainer.classList += ' expand';
		percentage.style.display = 'none';
		circle.className += "expand";
		window.setTimeout(function(){
			spinner.classList += ' rotating';
		},600);
	}
},40);
	iconCtx.beginPath();
	iconCtx.strokeStyle="#fff"; 
	iconCtx.lineWidth = 2; 
	iconCtx.moveTo(circle.width*0.78 , circle.height*0.19);//戒指横线
	iconCtx.lineTo(circle.width*0.87 , circle.height*0.1);
	iconCtx.stroke();//横线
	iconCtx.closePath();
}());

// JavaScript Document

$(function(){
	
	$(".nav_btn").click(function(){
	  $(".nav").show();
	})
  //关闭导航
  	$(document).bind("touchstart",function(e){
		var target = $(e.target);
		if(target.closest(".nav").length == 0){
			$(".nav").hide();
		}
    })
	//音乐
	/*var bgmusic=new SJSBGMusic({
		idclose:".muteon",
		idopen:".muteoff",
		musicurl:"images/bgmusic.mp3",
		loop:"loop"
	});
	bgmusic.start();*/
})


function abc1(){
	_s.cookie.set("hostname","hs1")
	
	location.href="http://www.baidu.com"
}
function abc2(){
	_s.cookie.set("hostname","hs2")
	
	location.href="http://www.baidu.com"
}
function abc3(){
	_s.cookie.set("hostname","hs3")
	
	location.href="http://www.baidu.com"
}
function abc4(){
	
	_s.cookie.set("hostname","hs4")
	location.href="http://www.baidu.com"
}
function abc5(){
	
	_s.cookie.set("hostname","hs5")
	location.href="http://www.baidu.com"
}
function abc6(){
	
	_s.cookie.set("hostname","hs6")
	location.href="http://www.baidu.com"
}
function abc7(){
	
	_s.cookie.set("hostname","hs7")
	location.href="http://www.baidu.com"
}
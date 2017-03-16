
(function(){
		/*
	引入一段js动态改变字体大小
	 */	 
	//动态计算浏览器默认字体大小
	var defaultFontSize=null;
	var head = window.document.getElementsByTagName('head')[0];
	function initRem(designWidth,rem2px){
		var d = window.document.createElement('div');
		d.style.width = '1rem';
		d.style.display = "none";
		head.appendChild(d);
		defaultFontSize = parseFloat(window.getComputedStyle(d, null).getPropertyValue('width'));
		head.removeChild(d);
		// 定义设计稿大小和rem大小	
	}
	function __resize(designWidth,rem2px) {
		var currClientWidth, fontValue;
		//originWidth用来设置设计稿原型的屏幕宽度（这里是以 Iphone 6为原型的设计稿）
		 if (window.orientation === 180 || window.orientation === 0) { 
            //console.log('竖屏状态！');
            currClientWidth = window.innerWidth;
        }else if (window.orientation === 90 || window.orientation === -90 ){ 
            //console.log('横屏状态！');
            currClientWidth = window.innerHeight;
        }else{
        	//模拟器测试;
        	currClientWidth = window.innerWidth;
        }
	    
	    //这里是设置屏幕的最大和最小值时候给一个默认值
//	    if (currClientWidth > 640) currClientWidth = 640;
	    if (currClientWidth < 320) currClientWidth = 320;
	    
	    fontValue = currClientWidth / designWidth * rem2px / defaultFontSize;
	    document.documentElement.style.fontSize = fontValue*100+ '%';


	}
	initRem(750,100);
	__resize(750,100);

	//注册 resize事件
	// window.addEventListener('resize', __resize, false);
	window.addEventListener("onorientationchange" in window? "onorientationchange":"resize",__resize,false);
})();
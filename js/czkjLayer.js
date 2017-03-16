/*
 * author:yangruxue
 * 移动端弹框封装 $.czkjPop
 * 文档说明：
   dialog弹框
   	opts：
   		width：null【默认：无，传值rem】
   		height：null【默认：无，传值rem】
   		bg:true,【默认：遮罩层黑透，fasle：遮罩层透明】
		time:null,【默认null，针对msg层默认：1s后关闭】
		msg:null,【默认null，msg专用默认：已完成，loading默认：正在加载中】
		icon:null,【默认null，msg专用默认：√图标，loading默认：加载图标】
		catalog:null,【区分msg和loading类型】
		type:null,【默认null，type】
		msgCallback:null,【msg专用的回调，msg消失后的回调】
		title:null,【默认没有标题】
		content:null【默认null，传值为文本内容，可配合type:"dom"时content只可传值为#id】
		btn:[],//按钮【传值形式是数组，[{"text":"确认"，"callback":function...},{}]】
		closeIcon:false,【默认false，为true时右上角显示小×】
		zindex:zindex,【无需设置】
		
	close关闭方法示例	
		var close = $.czkj.pop.dialog();//把弹框赋值给变量
		$.czkj.pop.close(close);//把返回的id传入
		
   alert提示弹窗
    opts:
	    title:标题  【默认：没有标题 ；为NULL或者空时，则没有标题；】
	 	content：提示内容【默认：自定义文字内容  】
	 	btn：[{text:"知道了"，callback:null}]【默认 一个按钮 无回调】
	$.czkjPop.alert();
	
    msg提示弹窗
    opts:
    	msg:【默认已完成】
    	icon：【默认img/right.png】
    	time:【默认1000ms】
    	msgCallback:【默认无回调】
    $.czkjPop.msg();
    
    confirm提示弹窗
    opts:
    	title:【默认无标题】
    	content：【默认：自定义内容】
    	btn：【默认两个按钮：[{text:"确定",callback:null},{text:"取消",callback:null}]】
    $.czkjPop.confirm();
	
 * 移动端轮播图封装$.czkjSlide（html需按照规定格式）
 * 文档说明
	全屏图片轮播
	opts：
		slideCell:【默认：最外层容器id】
		titCell:【默认：.hd ul】
		mainCell:【默认：.bd ul;如果是.bd就是循环多个ul】
		effect：【默认：leftLoop，左循环滚动,left:左滚动】
		autoPlay：【默认：true，自动播放】
		autoPage：【默认：true ，自动分页】
		delayTime:【默认：200，切换效果持续时间】
		interTime:【默认：2500，自动运行间隔】
		switchLoad：【默认：null，仅支持图片，例如_src = "图片实际路径"】
		startFun：【默认：null，切换效果开始时加载，function（当前页数，总页数）】
		endFun：【默认：null，切换效果结束时加载，function（当前页数，总页数）】
		pageStateCell:【默认：无 "#czSlide .hd",//分页栏状态例如1/3】
		prevCell:【默认：".prev",前一个按钮需添加的类】
  		nextCell:【默认：".next",后一个按钮需添加的类】
  		pnLoop:【默认：true,前后按钮是否继续循环】
  		defaultIndex:【默认：0,当前位置索引，0是第一个】
  		titOnclassName:【默认："on",自动增加的类】
 */
(function ($) {
	if(!$.czkj){
		$.czkj = {};
	}	
	$.czkj.pop = {
		alert:function(options){
			var defaults = {
					title:"",
					content:"自定义内容html",
					btn:[{text:"知道了",callback:null}]
			};
    		$.czkj.pop.dialog($.extend(defaults,options));
	    },
	    msg:function(options){
	    		var defaults = {
	    				catalog:"msg",
	    				bg:false,
	    				msg:"已完成",
	    				icon:"img/right.png",
	    				time:1000,
	    		};
	    		$.czkj.pop.dialog($.extend(defaults,options));
	    },
	    loading:function(options){
	    		var defaults = {
	    				catalog:"loading",
	    				msg:"正在加载中",
	    				icon:"img/loading.svg",
	    				time:null,
	    		};
	    		$.czkj.pop.msg($.extend(defaults,options));
	    },
	    confirm:function(options){
	    		var defaults = {
	    				title:"我是标题",
    					content:"自定义内容html",
    					btn:[{text:"确定",callback:null},{text:"取消",callback:null}]
	    		};
	    		$.czkj.pop.dialog($.extend(defaults,options));
	    },
	    close:function(id){
	    	id.fadeOut(100,function(){
	    		this.remove();
	    	});
	    },
	    dialog:function(options){
	    		var zindex = (window.czkjLayerIndex ||1998)+1;
	    		window.czkjLayerIndex = zindex;
	    		var defaults = {
	    				width:null,
	    				height:null,
	    				title:null,
	    				bg:true,//遮罩层默认状态
	    				time:null,//msg层默认时间关闭
	    				msg:null,//msg内容
	    				icon:null,//msg图标
	    				catalog:null,//标题
	    				content:null,//内容
	    				type:null,//类型
	    				msgCallback:null,//msg回调
	    				btn:[],//按钮
	    				closeIcon:false,//关闭按钮
	    				zindex:zindex,
	    		};
	    		var opts = $.extend(defaults,options);
	    		var layout ='<div class="czkj-layer" id="layerId'+opts.zindex+'"><div class="czkj-layer-mask-bg"></div><div class="czkj-layer-main"><div class="czkj-layer-title">'+opts.title+'</div><div class="czkj-layer-con">'+opts.content+'</div><div class="czkj-layer-btn">'+opts.btn+'</div></div></div>';
	    		$("body").append(layout);
	    		$("#layerId"+opts.zindex).css("z-index",opts.zindex).fadeIn(100);
	    		if(opts.width){
	    			$("#layerId"+opts.zindex).find(".czkj-layer-main").css("width",opts.width);
	    		}
	    		if(opts.height){
	    			$("#layerId"+opts.zindex).find(".czkj-layer-main").css("height",opts.height);
	    		}
	    		if(!opts.title){//弹框标题
	    				$("#layerId"+opts.zindex).find(".czkj-layer-title").remove();
	    		}
	    		if(!opts.bg){//弹框背景是否透明
	    				$("#layerId"+opts.zindex).find(".czkj-layer-main").css("background-color","transparent");
	    				$("#layerId"+opts.zindex).find(".czkj-layer-mask-bg").css("background-color","transparent");
	    		}else{
	    				$("#layerId"+opts.zindex).find(".czkj-layer-mask-bg").click(function(){
	    						$(this).parent().fadeOut(100,function(){
	    								$(this).remove();
	    						});
	    				});
	    		}
	    		if(opts.btn.length<=0){//是否有按钮
	    				$("#layerId"+opts.zindex).find(".czkj-layer-btn").remove();
	    		}
	    		var btnHtml = '';
	    		$.each(opts.btn,function(i,val){//按钮个数
	    				btnHtml += "<span>"+opts.btn[i].text+"</span>";
	    				$("#layerId"+opts.zindex).find(".czkj-layer-btn").html(btnHtml);
	    		})
	    		$("#layerId"+opts.zindex).find(".czkj-layer-btn span").width(100/opts.btn.length+"%");
				$("#layerId"+opts.zindex).find(".czkj-layer-btn span").on("click",function(){//按钮回调事件
						var $self = $(this);
						$(this).closest(".czkj-layer").fadeOut(100,function(){
								$(this).remove();
								var index = $self.index();
								if(opts.btn[index].callback){
										opts.btn[index].callback();
								}	
						});
				});	
				if(opts.catalog == "msg" || opts.catalog == "loading"){//按钮为提示的特殊状态
						$("#layerId"+opts.zindex).find(".czkj-layer-con").addClass("czkj-layer-msg").html('<img src="'+opts.icon+'"><p class="czkj-layer-msg-p">'+opts.msg+'</p>');
						if(!opts.icon){
							$("#layerId"+opts.zindex).find(".czkj-layer-msg img").remove();
						}
						if(opts.time){
							setTimeout(function(){
								$("#layerId"+opts.zindex).fadeOut(100,function(){
												$(this).remove();
												if(opts.msgCallback){
														opts.msgCallback();
												}
										})		
								},opts.time);
						}else{
							
						}
						if(opts.catalog=="loading"){
							$("#layerId"+opts.zindex).find(".czkj-layer-con").addClass("czkj-layer-loading");
						}		
				}
				if((/^#/).test(opts.content) && opts.type == "dom"){
					$("#layerId"+opts.zindex).find(".czkj-layer-con").html("");
					($(opts.content).clone(true)).addClass("czkj-layer-contentId").appendTo($("#layerId"+opts.zindex).find(".czkj-layer-con"));
					$(".czkj-layer-contentId").show();
				}
				if(opts.closeIcon){
					var close = $('<div class="czkj-layer-close">×</div>')
					$("#layerId"+opts.zindex).find(".czkj-layer-main").append(close);
					$("#layerId"+opts.zindex).find(".czkj-layer-close").on("click",function(){
						$("#layerId"+opts.zindex).remove();
					});
				}				
				$(".czkj-layer").on('touchmove',function(event) {
					event.preventDefault(); 
				}, false);
				return $("#layerId"+opts.zindex);
			 
	   },
	};
})(jQuery);

(function(){
	if(!$.czkj){
		$.czkj = {};
	}
	$.czkj.slide = {
		imgSlide:function(options){
  			var defaults = {
  				slideCell:"#czImgSlide",
  				mainCell:".bd ul",
  				autoPlay:true,
  				interTime:3000,
  			};
			$.czkj.slide.touchSlide($.extend(defaults,options));	
  		},
  		textSlide:function(options){
  			var defaults = {
  				slideCell:"#czTextSlide",
  				mainCell:".bd",
  				effect:"left",
  			};
  			$.czkj.slide.touchSlide($.extend(defaults,options))
  		},
  		touchSlide:function(options){
  			var defaults = {
  				slideCell:"#czImgSlide",
  				titCell:".hd ul",
  				mainCell:".bd ul",
  				effect:"leftLoop",
  				autoPlay:false,
  				autoPage:"<li></li>",
  				delayTime:200,
  				interTime:2500,
  				switchLoad:null,
  				startFun:null,
  				endFun:null,
  				//pageStateCell:"#czSlide .hd",
  				prevCell:".prev",
  				nextCell:".next",
  				pnLoop:true,
  				defaultIndex:0,
  				titOnclassName:"on",
  			};
  			var opts = $.extend(defaults,options);
			TouchSlide({
  				slideCell:opts.slideCell,
  				titCell:opts.titCell,
  				mainCell:opts.mainCell,
  				effect:opts.effect,
  				autoPlay:opts.autoPlay,
  				autoPage:opts.autoPage,
  				delayTime:opts.delayTime,
  				interTime:opts.interTime,
  				switchLoad:opts.switchLoad,
  				startFun:opts.startFun,
  				endFun:opts.endFun,
  				prevCell:opts.prevCell,
  				nextCell:opts.nextCell,
  				pnLoop:opts.pnLoop,
  				defaultIndex:opts.defaultIndex,
  				titOnclassName:opts.titOnclassName,
  			});	
  		}
	};
})(jQuery)

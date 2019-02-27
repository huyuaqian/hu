//define(['config'], function(config) {
//	require(['jquery'], function($) {
//		
//	});
//});

$(function() {	
		//下拉列表提示		
	;(function(){
		$('.top').load('header.html',function(){
			$('#tokeyword').on('focus',function(){
				$(this).val('');
			});
			$('#tokeyword').on('blur',function(){
				$(this).val('闹元宵第2件0元  拼手气最高得￥188大红包');
			});
			$('#tokeyword').on('input',function(){
				var that=$(this);
				$('.notice_input').css('display','block');
				var $str='';
				$.ajax({
					type:"get",
					url:"https://suggest.taobao.com/sug?code=utf-8&q="+$(this).val()+"&_ksTS=1548331259728_369&callback=baidu",
					async:true,
					dataType:'jsonp',
					success:function(data){
						$.each(data,function(index,element){
							$.each(element,function(indexs,aa) {
								$str+=`<li>${aa[0]}</li>`;
							});
						});
						if(that.val()==''){
							$('.notice_input').hide();
						}else{
							$('.notice_input ul').html($str);
						}
						$('.notice_input ul li').each(function(){
							$(this).on('click',function(){
								that.val($(this).html());
								$('.notice_input').css('display','none');
							})
						});
						$('body').on('click',function(){
							$('.notice_input').css('display','none');
						})
											
					}
				});
			});
		});
	})();
	
	//头部固定
	;(function() {		
		$('.footers').load('footer.html');		
		$(".fixed_header").load('header.html .header', function() {
			$('.fixed_header .header').css('display', 'none');
			$(window).on('scroll', function() {
				var $top = $(window).scrollTop();

				if($top >= 600) {
					$('.fixed_header .header').css({
						'display': 'block',
						'position': 'fixed',
						'top': 0,
						'z-index': 1000,
						'margin': 0
					});
					$('.groom').css('display', 'none');
				} else {
					$('.fixed_header .header').css({
						'display': 'none'
					});
				}
			})
		});
	})();
	
	
	//楼梯效果
	;(function() {		
		$(window).on('scroll', function() { //滚动条
			var $top = $(window).scrollTop();
			var $loutibox = $(".section_18");
			if($top >= 1800 && $top <= 3500) {
				$loutibox.show();
			} else {
				$loutibox.hide();
			}

			$('.section_5').each(function(index, element) { //跟着滑动跳转
				var $loucetop = $(element).offset().top + 300;
				if($loucetop > $top) {
					$('.section_18 li').removeClass('activelouti');
					$('.section_18 li').eq(index).addClass('activelouti');
					return false;
				}
			});

		});
		$('.section_18 li').on('click', function() {
			$(this).addClass('activelouti').siblings('li').removeClass('activelouti');
			var $top = $('.section_5').eq($(this).index()).offset().top;
			$('html,body').animate({ //这里给滚动条赋值，兼容写法
				scrollTop: $top
			});
		});

	})();

	//tab切换
	;(function() {
		
		var $btns = $('.rightbox_top ul li');
		var $contents = $('.items');
		$btns.on('mouseover', function() {
			$(this).addClass('olactive').siblings('li').removeClass('olactive'); //链式操作的核心是最开始的元素对象
			$contents.eq($(this).index()).addClass('showright').siblings('ol').removeClass('showright');
		});

	})();
	
	//商品tab切换
	;(function() {		
		var $btns = $('.section_top_2 li');
		var $contents =$('.conbot');
		console.log($btns.length);
		$btns.on('mouseover', function() {
			$(this).addClass('tabsection').siblings('li').removeClass('tabsection'); //链式操作的核心是最开始的元素对象
			console.log($(this).parent().parent().find($('.conbot')).eq($(this).index()));
			console.log($(this).index());
			$(this).parent().parent().find($('.conbot')).eq($(this).index()).addClass('tabdivshow').siblings('div').removeClass('tabdivshow');
		});

	})();
	
	
	//轮播图
	;(function(){
		bannerListFn(
		    $(".banner"),
		    $(".img-btn-list"),
		    $(".left-btn"),
		    $(".right-btn"),
		    2000,
		    true
		);
	})();
	
	//商品图片显示效果
	$('.section_1 .bottom_right li img').on('mouseover',function(){		
		$(this).parent().parent().find('.themenews p:first a').css('color','#8cb91e');
	}).on('mouseout',function(){
		$(this).parent().parent().find('.themenews p:first a').css('color','#606060');
	});
	
	;(function(){
		$(function(){
			$('.content_bottom_2_1 img').lazyload({
				effect:"fadeIn"
			});
		})
	})();
	
	//回到顶部
	$('.section_19 ul li').last().on('click',function(){
		$('html,body').animate({
    		scrollTop:0
    	});
	});	
});

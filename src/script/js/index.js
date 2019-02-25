//define(['config'], function(config) {
//	require(['jquery'], function($) {
//		
//	});
//});

$(function() {
	
	;(function(){
		$('.top').load('header.html',function(){
			$('#tokeyword').on('input',function(){
//				console.log($(this).val());
//				var $script=$('<script src="https://suggest.taobao.com/sug?code=utf-8&q='+$(this).val()+'&_ksTS=1548331259728_369&callback=baidu"><\/script>');
//				$('body').append($script);
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
						$('.notice_input ul').html($str);
					}
				});
			});
			
			function baidu(data){
				$arr=data.result;
				var $str='';
				$.each($arr,function(index){
					$str+=`<li>${arr[index][0]}</li>`;
				});
				$('.notice_input').html($str);
			}
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

});

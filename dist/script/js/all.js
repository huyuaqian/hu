//require.config({  })   配置模块

require.config({
	baseUrl:'https://cdnjs.cloudflare.com/ajax/libs/',//基路径，模块的共有的路径。
	paths:{//引入模块的地址，文件不能添加扩展名
		'jquery':'jquery/1.12.4/jquery',
		'jqcookie':'jquery-cookie/1.4.1/jquery.cookie',
		'jqlazy':'jquery.lazyload/1.9.1/jquery.lazyload.min'
	},
	shim:{//非AMD规范的JS文件,就需要使用Require中的shim.
		exports:'',//exports 表示输出的对象名
		dep:['jquery']//deps 为数组,表示其依赖的库,
	}
});

//define(['config'], function(config) {
//	require(['jquery'], function($) {
//		
//	});
//});

$(function() {
	$('.footers').load('footer.html');
	$('.top').load('header.html');
	$(".section_20").load('header.html', function() {
		$('.headern').css('display', 'none');

		$('.nav').css('display', 'none');
		$('.groom').css('display', 'none');
		$(window).on('scroll', function() {
			var $top = $(window).scrollTop();
			if($top >= 500) {
				$('.headern').css({
					'display': 'block',
					'position': 'fixed',
					'top': 0,
					"background": '#ffffff'
				});
			}
		})
	})

	//楼梯效果
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

	//tab切换
	var $btns = $('.rightbox_top ul li');
	var $contents = $('.items');
	$btns.on('mouseover', function() {
		$(this).addClass('olactive').siblings('li').removeClass('olactive'); //链式操作的核心是最开始的元素对象
		$contents.eq($(this).index()).addClass('showright').siblings('ol').removeClass('showright');
	});
})
require(['index']);

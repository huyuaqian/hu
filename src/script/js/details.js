;
(function() { //头部导航效果
	$('.detunav').load('header.html');
	$('.detfooter').load('footer.html');
	$('.detpnav').load('index.html .pnav', function() {
		$('.detpnav .subnav').css({
			'height': '0',
			'padding': '0',
			'overflow': 'hidden',
			'transition': 'all 1s',
			'position': 'absolute',
			'z-index': '500'
		});
		$('.detpnav .all_kinds').on('mouseover', function() {
			$('.subnav').css({
				'height': '410px',
				'padding': '12px 0 28px 0',
				'transition': 'all 1s'
			});
		}).on('mouseout', function() {
			$('.detpnav .subnav').css({
				'height': '0px',
				'padding': '0',
				'transition': 'all 1s'
			});
		});
	});
})();

;
(function() { //放大镜效果

	$("#sf").width($('#spic').width() * $("#bf").width() / $("#bf img").width());
	$("#sf").height($('#spic').height() * $("#bf").height() / $("#bf img").height());
	var bili = $('#bf img').width() / $("#spic").width();
	$("#spic").hover(function() {
		$("#sf").css('visibility', 'visible');
		$("#bf").css("visibility", "visible");
		$(this).on('mousemove', function(ev) {
			var $left = ev.pageX - $("#spic").offset().left - $("#sf").width() / 2;
			var $top = ev.pageY - $("#spic").offset().top - $("#sf").height() / 2;
			if($left < 0) {
				$left = 0;
			} else if($left >= $('#spic').width() - $('#sf').width()) {
				$left = $('#spic').width() - $('#sf').width();
			}
			if($top < 0) {
				$top = 0;
			} else if($top >= $('#spic').height() - $('#sf').height()) {
				$top = $('#spic').height() - $('#sf').height();
			}
			$('#sf').css('left', $left);
			$('#sf').css('top', $top);
			$('#bf img').css('left', -$left * bili);
			$('#bf img').css('top', -$top * bili);
		});
	}, function() {
		$('#sf').css('visibility', 'hidden');
		$('#bf').css('visibility', 'hidden');
	});
	//点击小图切换
	$('#list ul').on('click', 'li', function() {
		var $imgurl = $(this).find('img').attr('src');
		$("#spic img").attr('src', $imgurl);
		$('#bf img').attr('src', $imgurl);
	});
})();

;
(function() { //数量的加减
	$('.prev').on('click', function() {
		var $numval = parseInt($('#number').val());
		if($numval > 1) {
			$numval--;
		} else {
			$numval = 1;
		}
		$('#number').val($numval);
	});

	$('.next').on('click', function() {
		var $numval = parseInt($('#number').val());
		if($numval < 30) {
			$numval++;
		} else {
			$numval = 30;
			alert('对不起，内存不足');
		}
		$('#number').val($numval);
	});
	$('#number').on('input', function() {
		if($(this).val() > 30) {
			alert('库存不足，商品数量最多30');
			$(this).val(30);
		}
		if($(this).val() < 1) {
			alert('商品数量最少为1')
			$(this).val(1);
		}
	})
})();

;
(function() {	//存到cookie里
	var $numarr=[];
			var $sidarr=[];
			if($.cookie('cookieid')&&$.cookie('cookienum')){
				$sidarr=$.cookie('cookieid').split(',');
				$numarr=$.cookie('cookienum').split(',');
			}
			$('.det_btnbox li:first').on('click',function(){
				var $sid=$('.preview img').attr('sid');
				if($.inArray($sid,$sidarr)==-1){
					$numarr.push($('#number').val());
					$sidarr.push($sid);
					$.cookie('cookieid',$sidarr);
					$.cookie('cookienum',$numarr);	
				}else{
					$id=$.inArray($sid,$sidarr);
					$numarr=$.cookie('cookienum').split(',');
					$numarr[$id]=parseInt($numarr[$id])+parseInt($('#number').val());
					$.cookie('cookienum',$numarr);
				}
				$('.font font').html($('#number').val());
				var $allprice=$('.detprice em').html()*$('#number').val();
				$('.font span font').html($allprice);
				
				$('.alertbox').css('display','block');
				
				$('.pop_btn_r').on('click',function(){
					$('.alertbox').css('display','none');
				});
				$('.buy_pop_close').on('click',function(){
					$('.alertbox').css('display','none');
				});
				$('.btn_1').on('click',function(){
					$('.alertbox').css('display','none');
					location.href="http://10.31.162.56/js/shangke/projectname/src/cart.html";
				});
			})
})();
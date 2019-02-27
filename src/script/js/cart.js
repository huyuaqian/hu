;
(function() {
	function goodslist(sid,num) {
		$('.cart_have').css('display','block').find('.content_typepro').css('display','none');
		//sid：商品的编号，num:商品的数量
		var $pathurl='http://10.31.162.56/js/shangke/projectname/';
		$.ajax({
			url: $pathurl+"php/productshow.php",
			dataType: 'json'
		}).done(function(data) {
			$.each(data, function(index, value) {
				
				if(sid == value.sid) { //比较当前传入的sid和数据里面的sid比较，相同获取当前的整条数据
					var clonegoodslist = $('.content_typepro:hidden').clone(true, true); //深度克隆被隐藏的商品列表。				
//					console.log(clonegoodslist.html())
					clonegoodslist.find('.contype_1 img').attr('src', value.url);
					clonegoodslist.find('.contype_1 img').attr('sid', value.sid);
					clonegoodslist.find('.contype_1_cent a').html(value.titile);
					clonegoodslist.find('.contype_2 i').html(value.price);
					clonegoodslist.find('.contype_3 input').val(num);
					clonegoodslist.find('.contype_5 i').html((num * value.price).toFixed(2));
					clonegoodslist.css('display', 'block');	
					
					$('.order_count').append(clonegoodslist); //追加
					totalprice();
				}
			})
		});
	}
	if($.cookie('cookieid') && $.cookie('cookienum')) {	//获取cookie值
		var sid = $.cookie('cookieid').split(',');
		var num = $.cookie('cookienum').split(',');

		$.each(sid, function(index,value) {
			goodslist(sid[index],num[index]);
		});

	}
	empty();

	function empty() {
		if($.cookie('cookieid')) {
			$('.cart_empty').hide();
		} else {
			$('.cart_empty').show();
		}
	}
	
	//4.计算总的数量和总价
	function totalprice(){
		var allprice=0;
		var allcount=0;
		$('.content_typepro:visible').each(function(){
//			console.log($(this).find('input:checkbox').is(':checked'))
			if($(this).find('input:checkbox').is(':checked')){
				console.log($(this).find('.contype_5').html())
				allprice+=parseFloat($(this).find('.contype_5 i').html());
				allcount+=parseInt($(this).find('.contype_3 input').val());
			}
		});
		$('.allprice').html('￥' + allprice);
		$('.items_1 i').html(allcount);
	}
	
	//5.全选按钮
		$('#chekallorder').on('change',function(){
			$('.content_typepro:visible').find('input:checkbox').prop('checked',$(this).prop('checked'));
			$('#chekallorder').prop('checked',$(this).prop('checked'));
			totalprice()
		});
		var $inputs=$('.content_typepro:visible').find('input:checkbox');
		$('.order_count').on('input',$inputs,function(){//事件委托
			if($('.content_typepro:visible').find('input:checkbox').size()==$('.content_typepro:visible').find('input:checked').length){
				$('#chekallorder').prop('checked',true);
			}else{
				$('#chekallorder').prop('checked',false);
			}
			totalprice();
		});
		
		
		//6.改变商品的数量
		$('.cartnext').on('click',function(){
			var addvalue=$(this).parents('.content_typepro').find('#cartprocount').val();
			addvalue++;
			if(addvalue>30){
				addvalue=30;
			}
			$(this).parents('.content_typepro').find('#cartprocount').val(addvalue);
			$(this).parents('.content_typepro').find('.contype_5 i').html(calcsingleprice($(this)));
			totalprice()
			changecookie($(this));
			
		});
		
		
		$('.cartprev').on('click',function(){
			var addvalue=$(this).parents('.content_typepro').find('#cartprocount').val();
			addvalue--;
			if(addvalue<=0){
				addvalue=1;
			}
			$(this).parents('.content_typepro').find('#cartprocount').val(addvalue);
			$(this).parents('.content_typepro').find('.contype_5 i').html(calcsingleprice($(this)));
			totalprice();
			changecookie($(this));
		});
		
		
		$('#cartprocount').on('input',function(){
			var reg=/^\d+$/g;
			if(reg.test($(this).val())){
				var $value=$(this).val();
				if($value>30){
					$(this).val(30);
				}else if($value <= 0){
					$(this).val(1);
				}else{
					$(this).val($value);
				}
			}else{
				$(this).val(1);
			}
			$(this).parents('.allprice').find('.allprice .items_3').html(calcsingleprice($(this)));
			totalprice();
			changecookie($(this));
		});
		
		function calcsingleprice(obj){
				var $singleprice=parseFloat(obj.parents('.content_typepro').find('.contype_2 i').html());
				var $addvalue=parseInt(obj.parents('.content_typepro').find('#cartprocount').val());
				return ($singleprice*$addvalue).toFixed(2);
			}
			
			
			//将cookie值取出，转换成数组。
			var sidarr=[];//商品的编号
			var numarr=[];//商品的数量
			function cookietoarray(){
				if($.cookie('cookieid') && $.cookie('cookienum')){
					sidarr=$.cookie('cookieid').split(',');
					numarr=$.cookie('cookienum').split(',');
				}
			}
			
			//将改变的值存放到cookie里面。
			//将当前改变数量的商品列表下面找到对应的id和cookie里面的sid比较找到位置，通过位置找到数量数组中的位置，进行重新赋值
			function changecookie(obj){
				cookietoarray();
				var sid=obj.parents('.content_typepro').find('.contype_1 img').attr('sid');
				numarr[$.inArray(sid,sidarr)]=obj.parents('.content_typepro').find('#cartprocount').val();
				$.cookie('cookienum',numarr.toString(),7);
			}
			
			
			//7.删除
			$('.order_count').on('click','.contype_6 a:odd',function(){//$(this)-->.b-action a
				$('.alertbox').css('display','block');
				$('.alertbox #alert_confirm').on('click',function(){
					$('.alertbox').css('display','none');
					$(this).parents('.content_typepro').remove();
					deletecookie($(this).parents('.content_typepro').find('.contype_1 img').attr('sid'),sidarr);
					location.reload();
					
				});
				$('.alertbox #alert_cancle').on('click',function(){
					$('.alertbox').css('display','none');
				});
				$('#j_alert').on('click',function(){
					$('.alertbox').css('display','none');
				});
				
			});
			
			
			$('.orderscsc a:odd').on('click',function(){
				$('.alertbox').css('display','block');
				$('.alertbox #alert_confirm').on('click',function(){
					
					$('.alertbox').css('display','none');
					$('.content_typepro:visible').each(function(index,ele){						
						if($(ele).find('input:checkbox').is(':checked')){
							$(this).remove();
							console.log($(this).find('.contype_1 img').attr('sid'))
							deletecookie($(this).find('.contype_1 img').attr('sid'),sidarr);
							location.reload();
							
						}
					});
					
				});
				$('.alertbox #alert_cancle').on('click',function(){
					$('.alertbox').css('display','none');
				});
				$('#j_alert').on('click',function(){
					$('.alertbox').css('display','none');
				});
			});
			
			function deletecookie(sid){
				cookietoarray();
				var $index=$.inArray(sid,sidarr);
//				console.log($index);
				sidarr.splice($index,1);
				numarr.splice($index,1);
				$.cookie('cookieid',sidarr.toString(),7);
				$.cookie('cookienum',numarr.toString(),7);
			}
})();
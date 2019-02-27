;(function(){
	var $pathurl='http://10.31.162.56/js/shangke/projectname/';
	$.ajax({
		type:"post",
		dataType:'json',
		url:$pathurl+"php/productshow.php",
		async:true
	}).done(function(data){
		var $str1='';
		var $str2='';		
		var $url=$pathurl+"src/details.html";
		$.each(data,function(index,element) {
			if(index<=7){
				$str1+=`<li>
						<div>
							<p><a href="${$url}?sid=${element.sid}" target="_blank"><img src="${element.url}" /></a></p>
							<span><a href="${$url}?sid=${element.sid}" target="_blank">${element.title}</a></span>
							<i class="price">￥${element.price}</i>
						</div>
					</li>`;
//					console.log($str1);
			}else{
				$str2+=`<li>
						<div>
							<p><a href="${$url}?sid=${element.sid}" target="_blank"><img src="${element.url}" /></a></p>
							<span><a href="${$url}?sid=${element.sid}" target="_blank">${element.title}</a></span>
							<i class="price">￥${element.price}</i>
						</div>
					</li>`;
			}
			
		});
		$('.section_loubox .content_bottom_2_2 ul').eq(0).html($str1);
		$('.section_loubox .content_bottom_2_2 ul').eq(1).html($str2);
	})
})();

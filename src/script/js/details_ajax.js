;(function(){	//获取数据
	var $pathurl='http://10.31.162.56/js/shangke/projectname/';
	var $sid=parseInt(window.location.search.split('=')[1]);
	$.ajax({
		type:"post",
		dataType:'json',
		url:$pathurl+"php/probyId.php",
		async:true,
		data:{
			sid:$sid
		}
	}).done(function(data){
		$('.preview img').attr({'src':data.url,'sid':data.sid});
		$('.p-title').html(data.title);
		$('.detprice em').html(data.price);
		var $arr=data.urls.split(',');
		var $str='';
		$.each($arr, function(index,value) {
			$str+=`
			<li><img src="${value}"/></li>
			`;
		});
		$('.det_item ul').html($str);
	})	
})();

;
(function() {
	$('.logfooter').load('footer.html');
	
	$('#submitbtn').on('click',function(){
		if($('#firstname').val()==''){
			$('.name_error').html('用户名不能为空');
		}
		if($('#firstname').val()!=''){
			$('.name_error').html('');
		}
		if($('#password').val()!=''){
			$('.pass_error').html('');
		}
		if($('#password').val()==''){
			$('.pass_error').html('密码不能为空');
		}
		if($('#firstname').val()!=''&&$('#password').val()!=''){
			
			$.ajax({
			type: "post",
			url: "http://10.31.162.56/js/shangke/projectname/php/validate.php",
			data:{
				name: $('#firstname').val(),
				password:$('#password').val()
			}
		}).done(function(a){
			if(a!='true'){
				alert('用户名或密码错误');
			}else{
				location.href='http://localhost/js/shangke/projectname/src/index.html';
			}			
		});
	}
		});
		
	
	
	$('input').on('focus', function() {
		$val = $(this).prev().html();
		$(this).prev().html('');
	}).on('blur', function() {
		if($(this).val() == '')
			$(this).prev().html($val);
	});

})();
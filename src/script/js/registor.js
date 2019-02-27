;
(function() {
	jQuery.validator.addMethod("regex",
	function(value,element,params){
		var exp = new RegExp(params);
		return exp.test(value);
	},"格式错误");
	$('#regform').validate({
		rules: {
			regname:{
				required: true,
				minlength: 6,
				maxlength: 12,
				regex: "^[a-zA-Z][a-zA-Z0-9_-]{5,11}$",
				remote:{
					type:'post',
					url:'http://localhost/js/shangke/projectname/php/register.php'
				}
			},
			regpass:{
				required: true,
				minlength: 6,
				maxlength: 12,
				regex: "^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,10}$"
			},
			regpassword:{
				required: true,
				equalTo: "#regpass",
				regex: "^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,10}$"
			}
		},
		messages: {
			regname:{
				required: '用户名不能为空',
				minlength: '用户名长度最少为6位',
				maxlength: '用户名长度应为6到18位',
				regex: "用户名不能以数字开头,",
				remote:'用户名已存在,请另外换一个'
			},
			regpass:{
				required: "请输入密码",
				minlength: "密码长度不能小于 6 个字母",
				regex: "密码必须包含大小写字母和数字的组合，不能使用特殊字符，长度在8-10之间"
			},
			regpassword:{
				required: "请输入密码",
				minlength: "密码长度不能小于 6 个字母",
				equalTo: "两次密码输入不一致",
				regex: "密码必须包含大小写字母和数字的组合，不能使用特殊字符，长度在8-10之间"
			}
		}
	});
})();
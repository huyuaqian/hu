<?php
	
	require "conn.php";
	
	$name=$_POST['name'];
	$pass=$_POST['password'];
	
	$result=mysql_query("select * from user where username='$name' and password='$pass' ");
	
	if(mysql_fetch_array($result)){
		echo 'true';
	}else{
		echo 'false';
	}
?>
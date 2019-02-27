<?php
	
	require "conn.php";
	
	$name=$_POST['name'];
	$ep=$_POST['em_phone'];
	
	$result=mysql_query("select * from user where username='$name' ");
	
	if(mysql_fetch_array($result)){
		echo 'true';
	}else{
		echo 'false';
	}
?>
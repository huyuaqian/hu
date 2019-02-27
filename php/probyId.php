<?php
	
	include "conn.php";
	
	$id=$_POST['sid'];
	$result=mysql_query("select * from mymaiwang where sid=$id");
	
	$wronglist=mysql_fetch_array($result,MYSQL_ASSOC);
	
	echo json_encode($wronglist);
?>
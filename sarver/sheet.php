<?php
  // [ user.php ]
  if(isset($_GET['id'])) {
	  mb_internal_encoding('UTF-8');
	  $file = @file("page/".$_GET['id'].".html"); // ファイルの内容を配列に格納
		while(list($key,$value) = each($file)){
		print "$value";
		}
     
  }

?>
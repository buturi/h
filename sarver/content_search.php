<?php
	mb_internal_encoding('UTF-8');
	  $file = @file("list.html"); 
		while(list($key,$value) = each($file)){
		print "$value";
		}
		//print mb_internal_encoding();
     


?>
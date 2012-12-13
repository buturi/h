<?php
/* $targetURLのファイルを取得し，保存する. */

$localURL = "http://buturi.heteml.jp/student/higashihiroshima/";
if ( $_GET['type'] ) {
	$targetURL = "http://higashihiroshima.genki365.net/gnkh12/pub/content_search.php?sort=5&select_class=1&select_code1=1&type=".$_GET['type'];
} else {
	$targetURL = "http://higashihiroshima.genki365.net/gnkh12/pub/content_search.php?sort=5&select_class=1&select_code1=1&type=11";
}

if( $_GET['type'] == 51 ) {
	$localFile = "infoList.html";
} else if( $_GET['type'] == 31 ) {
	$localFile = "recList.html";
} else {
	$localFile = "list.html";
}

//ファイルが存在しているかどうか
if ( file_exists($localFile) ) {
	$html_time = date("d", filemtime($localFile)); //list.htmlの更新日時を取得
	$today = date("d"); //日にち取得
}

//今日の日にちがファイルの更新日と異なる　または　ファイルが存在しない
if ( !file_exists($localFile) or $html_time != $today ) {
	
	$ch = curl_init($targetURL);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, True); //Trueの場合，curl_exec()の返り値を文字列で返す
	$result = curl_exec($ch); //実行
	curl_close($ch); //cURL セッションを閉じる
	
	$fp = fopen($localFile, 'w'); //ファイルを開く
	flock($fp , LOCK_EX ); //ファイルをロック
	$result = str_replace("EUC-JP","UTF-8",$result); // 置換
	$result = mb_convert_encoding($result, "UTF-8", "EUC-JP"); //list.htmlをUTF-8に変換
	fwrite($fp, $result); //書き込み
	fclose($fp); //閉じる
}
else {
	$targetURL = $localURL.$localFile;
	$ch = curl_init($targetURL);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, True); //Trueの場合，curl_exec()の返り値を文字列で返す
	$result = curl_exec($ch); //実行
	curl_close($ch); //cURL セッションを閉じる
}

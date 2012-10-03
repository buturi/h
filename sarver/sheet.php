<?php

if( file_exists( $_GET['id'] .".html" ) ){
	$html_time = date( "d",filemtime( $_GET['id'] .".html" ) ); //htmlファイルの
	$today = date("d"); //日にち取得

}

//今日の日にちがファイルの更新日と異なる　または　ファイルが存在しない
if ( !file_exists( ( "list.html") or $html_time != $today ) and $_GET['id'] ) {
	mb_internal_encoding('UTF-8'); //エンコーディング
	$url =  "http://higashihiroshima.genki365.net/gnkh12/pub/sheet.php?id=". $GET['id'];
	$ch = curl_init($url);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, True); //Trueの場合，curl_exec()の返り値を文字列で返す
	$output = curl_exec($ch); //実行
	curl_close($ch); //cURL セッションを閉じる

	$fileName = $_GET['id'].".html";
	$fp = fopen( '$fileName', 'w' ); //ファイルを開く
	flock($fp , LOCK_EX ); //ファイルをロック
	fwrite($fp, $replace_output); //書き込み
	fclose($fp); //閉じる
}












?>

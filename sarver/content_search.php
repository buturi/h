<?php

//ファイルが存在しているかどうか
if ( file_exists("list.html") ) {
$html_time = date("d", filemtime("list.html")); //list.htmlの更新日時を取得
$today = date("d"); //日にち取得
}

//今日の日にちがファイルの更新日と異なる　または　ファイルが存在しない
if ( !file_exists("list.html") or $html_time != $today ) {
mb_internal_encoding('UTF-8'); //エンコーディング
$url = "http://higashihiroshima.genki365.net/gnkh12/pub/calendar.php";
$ch = curl_init($url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, True); //Trueの場合，curl_exec()の返り値を文字列で返す
$output = curl_exec($ch); //実行
curl_close($ch); //cURL セッションを閉じる

$fp = fopen('list.html', 'w'); //ファイルを開く
flock($fp , LOCK_EX ); //ファイルをロック
fwrite($fp, $output); //書き込み
fclose($fp); //閉じる
}

?>  
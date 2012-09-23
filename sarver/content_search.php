<?php


$html_time = date("d", filemtime("list.html")); //list.htmlの更新日時を取得
$today = date("d"); //日にち取得

if ( $html_time != $today or !file_exists("list.html") ) {

$ch = curl_init("http://higashihiroshima.genki365.net/gnkh12/pub/calendar.php");
curl_setopt($ch, CURLOPT_RETURNTRANSFER, True); //Trueの場合，curl_exec()の返り値を文字列で返す
$output = curl_exec($ch); //実行
curl_close($ch); //cURL セッションを閉じる

$replace_output = str_replace("sheet.php", "http://higashihiroshima.genki365.net/gnkh12/pub/sheet.php", $output);

print $replace_output; //確認用

$fp = fopen('list.html', 'w');
fwrite($fp, $replace_output);
fclose($fp);

}

?>  
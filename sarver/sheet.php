<?php
/* targetURLのファイルを取得し，保存する． */

$fileName = "page/".$_GET['id'].".html";
$localURL = "http://buturi.heteml.jp/student/higashihiroshima/";
$targetURL = "http://higashihiroshima.genki365.net/gnkh12/pub/sheet.php?id=".$_GET['id'];

if(file_exists($fileName)){
	$html_time = date("d",filemtime($fileName)); //htmlファイルの更新日時取得
	$today = date("d"); //日にち取得

}

//(今日の日にちがファイルの更新日と異なる　または　ファイルが存在しない)
if (!file_exists(($fileName) or $html_time != $today)) {
	$ch = curl_init($targetURL);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, True); //Trueの場合，curl_exec()の返り値を文字列で返す
	$result = curl_exec($ch); //実行
	curl_close($ch); //cURL セッションを閉じる
	
	$fp = fopen($fileName, 'w'); //ファイルを開く
	flock($fp , LOCK_EX ); //ファイルをロック
	$result = str_replace("EUC-JP","UTF-8",$result); // 置換
	$result = mb_convert_encoding($result, "UTF-8", "EUC-JP"); //ファイルをUTF-8に変換
	fwrite($fp, $result); //書き込み
	fclose($fp); //閉じる
}
else {
	$targetURL = $localURL.$fileName;
	$ch = curl_init($targetURL);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, True); //Trueの場合，curl_exec()の返り値を文字列で返す
	$result = curl_exec($ch); //実行
	curl_close($ch); //cURL セッションを閉じる
}

echo $result; //表示

?>


/*

東広島市民活動情報サイトからソースをクロール､中身を配列に入れていくJS

*/

	$(function(){
		$("button").click(function () {
		alert("output Log");
 		 console.log(eventData);
		 trace(eventData);
	});
	});
	


var eventData={"event":new Array()};//グローバル変数､eventDataを定義､最初にイベント群を保持するArrayを定義する
var j=0;
var str;

/*デバッグ用サイト1*/
//var domain="http://www7b.biglobe.ne.jp/~pso/tmp/";
/*運用サイト*/
//var domain="http://buturi.heteml.jp/student/2012/nohki/higashi/";
/*運用サイト2*/
var domain="http://buturi.heteml.jp/student/higashihiroshima/";
/*運用サイト3*/
//var domain="http://buturi.heteml.jp/student/higashihiroshima2/";
/*本サーバ､運用サーバが死んだ時用に切り替える処理も｡*/
   // var domain = "http://higashihiroshima.genki365.net/gnkh12/pub/";
    $.get(domain+"content_search.php?type=11&sort=5&select_class=1&select_code1=1", function(data){
		//a[href*="sheet.php?"]
		//aタグの中でhref属性がsheet.php?に部分一致

		var content=$(data.responseText).find('a[href*="sheet.php?"]');
		

		
		content.each(function(){
			
			/*一時的なObjectを作成､これをあとでeventDataに入れる*/
			var tmpEventData=new Object();
			/*クエリストリングをid=で分離することで､IDを抽出*/
			tmpEventData["id"] = parseInt($(this).attr('href').split('id=')[1]);
			
			/*それぞれに対して詳細データを取得する*/
			$.get(domain+"sheet.php?id="+$(this).attr('href').split('id=')[1], function(detailData){
				
				//$('#output').append(data.responseText);
				
				/*thに続いてtdタグがつづいている部分を探し､抽出する*/
				var detailContent=$(detailData.responseText).find('th ~ td');
				/*それぞれの部分に対して繰り返し処理を行い､相当するObjectの属性へ配置*/
				
				detailContent.each(function(i){
					//alert(eventDataArray[i]);
					/*属性を上のArray->Object変換から取得､順番に合った属性へ代入*/
                    var eventDataArray=Data.getEventDataArray();
					tmpEventData[eventDataArray[i]]=$(this).text();
					
				});
				
				/*String型の年月日をDate型に変換する*/
				/*複数日程記述時に､分離･記憶する必要がある*/
				
				var beforeYear=new Date().getYear();//年が記述されていない場合は今の年を使う
				
				var tmpDate=tmpEventData["date"].split('、');
				var tmpDateArray=new Array();
				
				for(var dateData in tmpDate) {
		

					var dateDataSplit=tmpDate[dateData].split('から');
					var dateObject=new Object();
						dateObject["from"]=Utility.convertToDate(dateDataSplit[0]);
					if(dateDataSplit[1]){
						dateObject["to"]=Utility.convertToDate(dateDataSplit[1]);
					}else{
						dateObject["to"]=dateObject["from"];
					}
					
					if(dateObject["from"] == "Invalid Date"){
						continue;	//きちんとした日時が設定できなければ､この日時はなかったことにする｡時々ある｡｢時刻､時刻､｣とか
						}
					tmpDateArray.push(dateObject);
					//$('#output').append('<div>'+dateObject["from"]+'-'+dateObject["to"]+'</div>');
				}
				
				if (tmpDateArray[0] && new Date().getTime() - tmpDateArray[tmpDateArray.length - 1]["to"].getTime() > 1000 * 60 * 60 * 24 * 7) {
                            return;
                }
				
				tmpEventData["date"]=tmpDateArray;
				
				
				//他の絞り込みが必要
				getLatLng("東広島 "+tmpEventData["place"],function(latLng){//検索範囲が東広島か確認する過程も必要かと｡"東広島"にすると絞り込みでなく東広島市自体がひっかかってしまう｡早急なbound実装を求む
					if(latLng){
						tmpEventData["latLng"]={"lat":latLng.lat,"lng":latLng.lng};//住所に対応する座標があったときはそれをいれる
					}else{//見つからない､精度が極端に低い際は上のgroupID->座標変換リストを使う｡
						tmpEventData["latLng"]={"lat":34.426744,"lng":132.743763};
					}
				});
				
				/*eventDataに一時的に作っていたObjectを入れる*/



eventData.event.push(tmpEventData);
var b = eventData.event.length-1;

str_title = eventData.event[b]['title'];
str_title = str_title.replace(/^\s+|\s+$/g,'').replace(/ +/g,' ');
str_title = str_title.substring(0, 20);

str_sponsor = eventData.event[b]['sponsor'];
str_sponsor = str_sponsor.replace(/^\s+|\s+$/g,'').replace(/ +/g,' ');
str_sponsor = str_sponsor.substring(0, 10);
L: for (a=b;0<=a;a--) {
	if (0<a) {
		if (eventData.event[a-1]["id"] < eventData.event[a]["id"]) { // id順に並び替え
			var tmp = eventData.event[a];
			eventData.event[a] = eventData.event[a-1];
			eventData.event[a-1] = tmp;
		} else{
			if ( eventData.event[a]['date'][0] == undefined || eventData.event[a]['date'][0]['from'] == "Invalid Date") {
				$(".eventBox:eq("+(a-1)+")").after("<div class='wrapBox'><div class='dateBox'></div><div class='eventBox' onClick='moveMap("+j+")'>"+str_title+"<div class='sponsorBox'>"+str_sponsor+"</div></div></div>");
			} else {
				$(".eventBox:eq("+(a-1)+")").after("<div class='wrapBox'><div class='dateBox'><div class='month'>"+(eventData.event[a]['date'][0]['from'].getMonth()+1)+"</div><div class='split'>/</div><div class='date'>"+eventData.event[a]['date'][0]['from'].getDate()+"</div></div><div class='eventBox' onClick='moveMap("+j+")'>"+str_title+"<div class='sponsorBox'>"+str_sponsor+"</div></div></div>");
			}
		break L;
		}
	} else{
		if ( eventData.event[a]['date'][0] == undefined || eventData.event[a]['date'][0]['from'] == "Invalid Date") {
		$("#box").after("<div class='wrapBox'><div class='dateBox'></div><div class='eventBox' onClick='moveMap("+j+")'>"+str_title+"<div class='sponsorBox'>"+str_sponsor+"</div></div></div>");
	} else {
		$("#box").after("<div class='wrapBox'><div class='dateBox'><div class='month'>"+(eventData.event[a]['date'][0]['from'].getMonth()+1)+"</div><div class='split'>/</div><div class='date'>"+eventData.event[a]['date'][0]['from'].getDate()+"</div></div><div class='eventBox' onClick='moveMap("+j+")'>"+str_title+"<div class='sponsorBox'>"+str_sponsor+"</div></div></div>");
	}
	}
}			j++;

                var myLatlng = new google.maps.LatLng(35.685867,139.760578);
                var marker = new google.maps.Marker({
                    position: myLatlng,
                    map: mapCanvas,
                    title:"Hello 大手門!"
                 }); 








			});
			
  		});	
		
    });



function decorate(a) {
	if (  eventData.event[a]['date'][0]['from'].getDay() != undefined && eventData.event[a]['date'][0]['from'].getDay()==0 ) {
		$(".dateBox").addClass("sun");
	}
}


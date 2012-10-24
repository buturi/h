// JavaScript Document
	$(function(){
		$("button").click(function () {
		alert("output Log");
 		 console.log(eventData);
		 trace(eventData);
	});
	});
	


  var eventData={"event":new Array()};//グローバル変数､eventDataを定義､最初にイベント群を保持するArrayを定義する
  

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
		
		/*サイトに記述される配列からオブジェクトへ変換するための配列｡公式サイトの順番が変わると不具合発生*/
		  var eventDataArray=["title","sponsor","image","date","time","limit","place","dammy","capa","target","app","cost","detail","inquiry","url"];
		  
		 /*グループIDから座標に変換するObject*/
		 var gidToLatLng={G0000005: { lat: 34.4265276, lng: 132.7380794 },
                G0000006: { lat: 34.4716584, lng: 132.8889046 },
                G0000007: { lat: 34.3939743, lng: 132.6718729 },
                G0000008: { lat: 34.4551099, lng: 132.7727698 },
                G0000009: { lat: 34.3347726, lng: 132.6823599 },
                G0000010: { lat: 34.4232613, lng: 132.7432875 },
                G0000011: { lat: 34.4267526, lng: 132.7437512 },
                G0000012: { lat: 34.4503574, lng: 132.6942441 },
                G0000013: { lat: 34.4517465, lng: 132.7745058 },
                G0000014: { lat: 34.4382902, lng: 132.7416371 },
                G0000015: { lat: 34.311486, lng: 132.7878066 },
                G0000016: { lat: 34.4565921, lng: 132.8186952 },
                G0000017: { lat: 34.4267526, lng: 132.7437512 },
                G0000018: { lat: 34.4277553, lng: 132.7404708 },
                G0000019: { lat: 34.4267526, lng: 132.7437512 },
                G0000020: { lat: 34.4268942, lng: 132.7399876 },
                G0000021: { lat: 34.3454666, lng: 132.7076712 },
                G0000022: { lat: 34.4267526, lng: 132.7437512 },
                G0000023: { lat: 34.4267526, lng: 132.7437512 },
                G0000024: { lat: 34.4267526, lng: 132.7437512 },
                G0000025: { lat: 34.4221141, lng: 132.735338 },
                G0000026: { lat: 34.425264, lng: 132.7498426 },
                G0000027: { lat: 34.4267526, lng: 132.7437512 },
                G0000028: { lat: 34.4249639, lng: 132.768863 },
                G0000029: { lat: 34.4267526, lng: 132.7437512 },
                G0000030: { lat: 34.4271248, lng: 132.7437429 },
                G0000031: { lat: 34.4267526, lng: 132.7437512 },
                G0000032: { lat: 34.4267526, lng: 132.7437512 },
                G0000033: { lat: 34.4267526, lng: 132.7437512 },
                G0000034: { lat: 34.4267526, lng: 132.7437512 },
                G0000035: { lat: 34.4267526, lng: 132.7437512 },
                G0000036: { lat: 34.4267526, lng: 132.7437512 },
                G0000037: { lat: 34.4267526, lng: 132.7437512 },
                G0000038: { lat: 34.4614124, lng: 132.4754155 },
                G0000039: { lat: 34.4277553, lng: 132.7404708 },
                G0000040: { lat: 34.4711002, lng: 132.8901267 },
                G0000041: { lat: 34.4300495, lng: 132.7423179 },
                G0000042: { lat: 34.5060178, lng: 132.8727495 },
                G0000043: { lat: 34.4296077, lng: 132.7192695 },
                G0000045: { lat: 34.3786378, lng: 132.7099392 },
                G0000046: { lat: 34.4083159, lng: 132.7481932 },
                G0000047: { lat: 34.3936032, lng: 132.7781078 },
                G0000048: { lat: 34.3707779, lng: 132.7327209 },
                G0000049: { lat: 34.4318243, lng: 132.7529339 },
                G0000050: { lat: 34.4174535, lng: 132.7337466 },
                G0000051: { lat: 34.3936077, lng: 132.6720035 },
                G0000052: { lat: 34.4146921, lng: 132.6895401 },
                G0000053: { lat: 34.4545098, lng: 132.6987686 },
                G0000054: { lat: 34.4387865, lng: 132.6936473 },
                G0000055: { lat: 34.508142, lng: 132.6725427 },
                G0000056: { lat: 34.480573, lng: 132.6811143 },
                G0000057: { lat: 34.4703821, lng: 132.6375432 },
                G0000058: { lat: 34.457092, lng: 132.8186591 },
                G0000059: { lat: 34.4366483, lng: 132.8421859 },
                G0000061: { lat: 34.4604229, lng: 132.7919424 },
                G0000062: { lat: 34.4481442, lng: 132.787085 },
                G0000064: { lat: 34.536183, lng: 132.7781991 },
                G0000065: { lat: 34.5146796, lng: 132.7805411 },
                G0000066: { lat: 34.5276563, lng: 132.7397706 },
                G0000067: { lat: 34.5692523, lng: 132.824351 },
                G0000068: { lat: 34.5641473, lng: 132.8478025 },
                G0000069: { lat: 34.5670275, lng: 132.8117444 },
                G0000070: { lat: 34.6030409, lng: 132.8625169 },
                G0000071: { lat: 34.5947157, lng: 132.8137752 },
                G0000072: { lat: 34.5378394, lng: 132.8277712 },
                G0000073: { lat: 34.4721972, lng: 132.8883408 },
                G0000074: { lat: 34.4959707, lng: 132.8391667 },
                G0000075: { lat: 34.5190823, lng: 132.8261834 },
                G0000076: { lat: 34.5108604, lng: 132.8060275 },
                G0000077: { lat: 34.4412536, lng: 132.859098 },
                G0000078: { lat: 34.3204905, lng: 132.8150829 },
                G0000079: { lat: 34.3130528, lng: 132.8371998 },
                G0000080: { lat: 34.3134747, lng: 132.7940668 },
                G0000081: { lat: 34.4267526, lng: 132.7437512 },
                G0000082: { lat: 34.4705965, lng: 132.6823892 },
                G0000083: { lat: 34.4267526, lng: 132.7437512 },
                G0000084: { lat: 34.4267526, lng: 132.7437512 },
                G0000085: { lat: 34.4267526, lng: 132.7437512 },
                G0000086: { lat: 34.4261166, lng: 132.7476843 },
                G0000087: { lat: 34.4271248, lng: 132.7437429 },
                G0000088: { lat: 34.4271248, lng: 132.7437429 },
                G0000089: { lat: 34.4553738, lng: 132.8580083 },
                G0000090: { lat: 34.4271248, lng: 132.7437429 },
                G0000091: { lat: 34.4915216, lng: 132.6507476 },
                G0000092: { lat: 34.4271248, lng: 132.7437429 },
                G0000093: { lat: 34.4267526, lng: 132.7437512 },
                G0000094: { lat: 34.4271248, lng: 132.7437429 },
                G0000095: { lat: 34.4267526, lng: 132.7437512 },
                G0000096: { lat: 34.3324038, lng: 132.6945338 },
                G0000097: { lat: 34.4267526, lng: 132.7437512 },
                G0000098: { lat: 34.4252056, lng: 132.7430902 },
                G0000099: { lat: 34.4267526, lng: 132.7437512 },
                G0000100: { lat: 34.4267526, lng: 132.7437512 },
                G0000101: { lat: 34.4267526, lng: 132.7437512 },
                G0000102: { lat: 34.4267526, lng: 132.7437512 },
                G0000103: { lat: 34.4267526, lng: 132.7437512 },
                G0000104: { lat: 34.4271248, lng: 132.7437429 },
                G0000105: { lat: 34.4267526, lng: 132.7437512 },
                G0000106: { lat: 34.4267526, lng: 132.7437512 },
                G0000107: { lat: 34.4267526, lng: 132.7437512 },
                G0000108: { lat: 34.4267526, lng: 132.7437512 },
                G0000109: { lat: 34.4267526, lng: 132.7437512 },
                G0000110: { lat: 34.4267526, lng: 132.7437512 },
                G0000111: { lat: 34.5051793, lng: 132.8833958 },
                G0000112: { lat: 34.4267526, lng: 132.7437512 },
                G0000114: { lat: 34.4267526, lng: 132.7437512 },
                G0000115: { lat: 34.5190823, lng: 132.8261834 },
                G0000116: { lat: 34.4711002, lng: 132.8901267 },
                G0000117: { lat: 34.4267526, lng: 132.7437512 },
                G0000118: { lat: 34.4267526, lng: 132.7437512 },
                G0000119: { lat: 34.4267526, lng: 132.7437512 },
                G0000120: { lat: 34.4267526, lng: 132.7437512 },
                G0000121: { lat: 34.4267526, lng: 132.7437512 },
                G0000122: { lat: 34.4267526, lng: 132.7437512 },
                G0000123: { lat: 34.4267526, lng: 132.7437512 },
                G0000124: { lat: 34.4277969, lng: 132.7400153 },
                G0000125: { lat: 34.4267526, lng: 132.7437512 },
                G0000126: { lat: 34.4267526, lng: 132.7437512 },
                G0000128: { lat: 34.4282135, lng: 132.7396709 },
                G0000129: { lat: 34.4267526, lng: 132.7437512 },
                G0000130: { lat: 34.4267526, lng: 132.7437512 },
                G0000131: { lat: 34.3178826, lng: 132.8336557 },
                G0000132: { lat: 34.4267526, lng: 132.7437512 },
                G0000133: { lat: 34.448985, lng: 132.6797761 },
                G0000134: { lat: 34.3982856, lng: 132.7115381 },
                G0000135: { lat: 34.3970476, lng: 132.7619564 },
                G0000136: { lat: 34.4352211, lng: 132.7276408 },
                G0000137: { lat: 34.459734, lng: 132.7961308 },
                G0000138: { lat: 34.4271248, lng: 132.7437429 },
                G0000139: { lat: 34.432093, lng: 132.6994301 },
                G0000140: { lat: 34.4271248, lng: 132.7437429 },
                G0000141: { lat: 34.4461383, lng: 132.6884726 },
                G0000142: { lat: 34.4267526, lng: 132.7437512 },
                G0000143: { lat: 34.4959707, lng: 132.8391667 },
                G0000144: { lat: 34.4267526, lng: 132.7437512 },
                G0000145: { lat: 34.2892637, lng: 132.7900372 },
                G0000146: { lat: 34.2918717, lng: 132.7902066 },
                G0000147: { lat: 34.4266554, lng: 132.7468927 },
                G0000148: { lat: 34.5378394, lng: 132.8277712 },
                G0000149: { lat: 34.5099466, lng: 132.8045749 },
                G0000150: { lat: 34.4160595, lng: 132.7510539 },
                G0000151: { lat: 34.4267526, lng: 132.7437512 },
                G0000152: { lat: 34.4146921, lng: 132.6895401 },
                G0000153: { lat: 34.4230419, lng: 132.7423459 },
                G0000154: { lat: 34.4230419, lng: 132.7423459 },
                G0000156: { lat: 34.4452088, lng: 132.7234633 },
                G0000157: { lat: 34.5276563, lng: 132.7397706 },
                G0000158: { lat: 34.4318243, lng: 132.7529339 },
                G0000159: { lat: 34.4576537, lng: 132.7954782 },
                G0000160: { lat: 34.4310519, lng: 132.7176779 },
                G0000161: { lat: 34.4271248, lng: 132.7437429 },
                G0000162: { lat: 34.3707779, lng: 132.7327209 },
                G0000163: { lat: 34.5224683, lng: 132.8332577 },
                G0000164: { lat: 34.4249943, lng: 132.7244108 },
                G0000165: { lat: 34.4321763, lng: 132.6970998 },
                G0000166: { lat: 34.3975298, lng: 132.6817608 },
                G0000167: { lat: 34.4277969, lng: 132.7400153 },
                G0000168: { lat: 34.388444, lng: 132.6626017 },
                G0000169: { lat: 34.4267526, lng: 132.7437512 },
                G0000170: { lat: 34.3253154, lng: 132.6910566 },
                G0000171: { lat: 34.3236013, lng: 132.6704361 },
                G0000172: { lat: 34.4267526, lng: 132.7437512 },
                G0000173: { lat: 34.4235002, lng: 132.7446763 },
                G0000174: { lat: 34.4267526, lng: 132.7437512 },
                G0000175: { lat: 34.2807595, lng: 132.8076353 },
                G0000176: { lat: 34.4267526, lng: 132.7437512 },
                G0000177: { lat: 34.3130528, lng: 132.8371998 },
                G0000178: { lat: 34.4267526, lng: 132.7437512 },
                G0000179: { lat: 34.4116843, lng: 132.7172841 },
                G0000180: { lat: 34.4277969, lng: 132.7400153 }}
//119だけなぜか重複｡注意｡
		//$("#output").append(data.responseText);
	
		//a[href*="sheet.php?"]
		//aタグの中でhref属性がsheet.php?に部分一致
		var content=$(data.responseText).find('a[href*="sheet.php?"]');
		

		
		content.each(function(){
			/*デバッグ出力*/
			//$('#output').append('<div><a href="'+$(this).attr('href')+'">'+$(this).text()+'</a> ');
			//$('#output').append(' ID:'+$(this).attr('href').split('id=')[1]+'</div>');
			
			/*一時的なObjectを作成､これをあとでeventDataに入れる*/
			var tmpEventData=new Object();
			/*クエリストリングをid=で分離することで､IDを抽出*/
			tmpEventData["id"]=$(this).attr('href').split('id=')[1];
			
			/*それぞれに対して詳細データを取得する*/
			$.get(domain+"sheet.php?id="+$(this).attr('href').split('id=')[1], function(detailData){
				
				//$('#output').append(data.responseText);
				
				/*thに続いてtdタグがつづいている部分を探し､抽出する*/
				var detailContent=$(detailData.responseText).find('th ~ td');
				/*それぞれの部分に対して繰り返し処理を行い､相当するObjectの属性へ配置*/
				
				detailContent.each(function(i){
					//alert(eventDataArray[i]);
					/*属性を上のArray->Object変換から取得､順番に合った属性へ代入*/
					tmpEventData[eventDataArray[i]]=$(this).text();
					
					/*デバッグ出力*/
					//$('#output').append('<div>'+i+':'+$(this).text()+'</div>');
				});
				
				/*String型の年月日をDate型に変換する 未実装*/
				/*複数日程記述時に､分離･記憶する必要がある*/
				
				var beforeYear=new Date().getYear();//年が記述されていない場合は今の年を使う
				
				var tmpDate=tmpEventData["date"].split('、');
				var tmpDateArray=new Array();
				
				for(var dateData in tmpDate) {
		

					var dateDataSplit=tmpDate[dateData].split('から');
					var dateObject=new Object();
						dateObject["from"]=convertToDate(dateDataSplit[0]);
					if(dateDataSplit[1]){
						dateObject["to"]=convertToDate(dateDataSplit[1]);
					}else{
						dateObject["to"]=dateObject["from"];
					}
					
					if(dateObject["from"] == "Invalid Date"){
						continue;	//きちんとした日時が設定できなければ､この日時はなかったことにする｡時々ある｡｢時刻､時刻､｣とか
						}
					tmpDateArray.push(dateObject);
					//$('#output').append('<div>'+dateObject["from"]+'-'+dateObject["to"]+'</div>');
				}
				tmpEventData["date"]=tmpDateArray;
				
				
				function convertToDate(value){
					if(value.indexOf("年")==-1){//年の文字が存在しないときは今の年を適用する
						value=beforeYear+"/"+value;
					}else{
						beforeYear=value.split('年')[0];//年を抽出し､次回以降年が無かった場合用に上書きしておく
						value=value.replace("年", "/");//年の文字があったばあいに/に変換する
					}
					value=value.replace("月", "/"); //月の文字があった場合に/に変換する
					value=value.split('日')[0];//こうして日より後ろをとっておかないと､Dateに変換できない｡nbspが入っているため
					value=new Date(numberFullToHalf(value));//validな形式に変換したものを､さらに数値が全角だった場合に半角にし､Dateオブジェクトに変換する
					return value;
				}
				function numberFullToHalf(value){
					var char1 = new Array("１","２","３","４","５","６","７","８","９","０");
					//半角数字配列
					var char2 = new Array(1,2,3,4,5,6,7,8,9,0);

						while(value.match(/[０-９]/)){     	//入力データに全角数字がある場合
							for(var count = 0; count < char1.length; count++){
								//入力データを全角数字から半角数字に置換する
								value = value.replace(char1[count], char2[count]);
							}
						}
					return value;
				}
				//他の絞り込みが必要
				getLatLng("東広島 "+tmpEventData["place"],function(latLng){//検索範囲が東広島か確認する過程も必要かと｡"東広島"にすると絞り込みでなく東広島市自体がひっかかってしまう｡早急なbound実装を求む
					if(latLng){
						//alert(latLng.lat+"+"+latLng.lng);
						tmpEventData["latLng"]={"lat":latLng.lat,"lng":latLng.lng};//住所に対応する座標があったときはそれをいれる
					}else{//見つからない､精度が極端に低い際は上のgroupID->座標変換リストを使う｡
						//alert("null!!");
						tmpEventData["latLng"]={"lat":34.426744,"lng":132.743763};
					}
				});
				
				
				
				
				/*eventDataに一時的に作っていたObjectを入れる*/
				eventData.event.push(tmpEventData);
				$("#box").append("<div class='eventBox'>"+tmpEventData[eventDataArray[0]]+"</div>");
			});
			
  		});	
		
		
    });
	

	

	/*トレース用の関数*/
function checkObject(_obj){
  	for(var key in _obj){
   	 alert(key +" : "+_obj[key]);
 	}

}

/*文字から座標を取得する関数 by nohki*/
/*取得できなければnullが返る*/
function getLatLng(word,func){
  var geocoder = new google.maps.Geocoder();

  geocoder.geocode(
      { address: word,
	  	region: 'jp',
		//bounds: '34.244162,132.566414|34.633208,132.966042'//たぶん表記の仕方が違う
	   },
      function( results, status )
      {
		 
          if( status == google.maps.GeocoderStatus.OK )
          {
			  var latLng = new Object();
			  latLng.lat = results[0].geometry.location.lat();
			  latLng.lng = results[0].geometry.location.lng();
			  
			  func(latLng);
			/*   var latLng = new object();
              alert( results[ 0 ].geometry.location );
			  $("#output").text(results[ 0 ].geometry.location);
			  //var latLng = new object();
			  latLng.lat = results[0].geometry.location.lat();
			  latLng.lng = results[0].geometry.location.lng();
			  */
			  
			  
          }
          else
          {
              //alert( 'Faild：' + status );
			  func(null);
          }
		  
      } );
}
/*デバッグ用の関数 http://www.kuma-de.com/blog/2009-10-01/1274 */
function trace(s){
  mylog = [];
  function getIndent(num){
    var ind = [];
    while(num){
      ind.push('  ');
      num--;
    }
    return ind.join('');
  }
  function addLog(txt, defaultIndent){
    var cnt = defaultIndent;
    //array
    if((typeof txt == 'object') && (txt instanceof Array)){
      cnt++;
      mylog.push('[');
      for(var i = 0; i < txt.length; i++){
        mylog.push('\r\n' + getIndent(cnt));
        addLog(txt[i], cnt);
        if(i != txt.length - 1){
          mylog.push(',');
        }
      }
      mylog.push('\r\n' + getIndent(cnt - 1) + ']');
    //object
    }else if((typeof txt == 'object')){
      cnt++;
      mylog.push('{');
      for(var i in txt){
        mylog.push('\r\n' + getIndent(cnt) + i + ':');
        addLog(txt[i], cnt);
        mylog.push(',');
      }
      mylog.pop();
      mylog.push('\r\n' + getIndent(cnt - 1) + '}');
    }else{
      mylog.push(txt);
    }
  }
  addLog(s, 0);
  console.log(mylog.join(''));

  //Firebugが入っていなかったらこっち
  //alert(mylog.join(''));
  $("#output").text(mylog.join(''));
};
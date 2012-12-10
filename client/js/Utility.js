var Utility=(function(){

	//コンストラクタ
	function Utility(){

	}

	//static
	//文字列からDate型に変換する関数
	Utility.convertToDate=function(value){

		if(value.indexOf("年")==-1){//年の文字が存在しないときは今の年を適用する
			value=beforeYear+"/"+value;
		}else{
			beforeYear=value.split('年')[0];//年を抽出し､次回以降年が無かった場合用に上書きしておく
			value=value.replace("年", "/");//年の文字があったばあいに/に変換する
		}
		value=value.replace("月", "/"); //月の文字があった場合に/に変換する
		value=value.split('日')[0];//こうして日より後ろをとっておかないと､Dateに変換できない｡nbspが入っているため
		value=new Date(Utility.numberFullToHalf(value));//validな形式に変換したものを､さらに数値が全角だった場合に半角にし､Dateオブジェクトに変換する
		return value;
	}
	//全角の数字を半角に変換する関数
	Utility.numberFullToHalf=function(value){
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

	//文字から座標を取得する関数 by nohki
	//取得できなければnullが返る
	Utility.getLatLng=function(word,func){
		var geocoder = new google.maps.Geocoder();
		geocoder.geocode({
			address: word,
			region: 'jp',
			//bounds: '34.244162,132.566414|34.633208,132.966042'//たぶん表記の仕方が違う
		},
		function( results, status )	{
			if( status == google.maps.GeocoderStatus.OK){
				var latLng = new Object();
				latLng.lat = results[0].geometry.location.lat();
				latLng.lng = results[0].geometry.location.lng();
			  		//引数で受け取っていた関数を呼ぶことにより､呼び出し元のコールバック関数を呼び出せる
			  		func(latLng);			  

			  	}else{
             		//alert( 'Faild：' + status );
             		func(null);
             	}
             });
	}

	Utility.getDateArrayFromString=function(dateString){
		var beforeYear=new Date().getYear();//年が記述されていない場合は今の年を使う
		var tmpDate=dateString.split('、');
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
		return tmpDateArray;
	}

	return Utility;
})();

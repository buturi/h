var Utility=function(){
	
	//文字列からDate型に変換する関数
	this.convertToDate=function(value){
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

	//全角の数字を半角に変換する関数
	this.numberFullToHalf=function(value){
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
}




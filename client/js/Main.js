$(function() {
	var eventData=new HigashiEventData();
	eventData.load(SortByID,onReceive,11);


	function onReceive(eventObject,position){
	//Data.size();//データのサイズを取得する
		if ( 0<postion ) {
			var sph = ".eventBox:eq("+(position-1)+")";
		} else { //一番最後に出力
			var sph = "#Box";
		}

		if ( eventObject.date[0] == undefined || eventObject.date[0]['from'] == "Invalid Date" ) { //日付が入ってない場合
			var days = "</div>";
			var weeks = "ordinary";
		} else {
			var days = "<div class='month'>"+(eventObject.date[0]['from'].getMonth()+1)+"</div><div class='split'>/</div><div class='date'>"+eventObject.date[0]['from'].getDate()+"</div></div>";
			switch ( eventObject.date[0]['from'].getDay() ) {
				case 0: //日曜日
					weeks = "sun";
					break;
				case 1: //土曜日
					weeks = "sat";
					break;
				default: //平日
					weeks = "ordinary";
			}
		}
		$(sph).after("<div class='wrap'><div class='dateBox "+week+"'>"+days+"<div class='eventBox' onClick='moveMap("+Data.size()+")'>"+str_title+"<div class='sponsorBox'>"+str_sponsor+"</div></div></div>");
	//項目を挿入する
	}

	//TODO sort実装
	function SortByID(a,b){
		return a.id - b.id;
		}
	}
});
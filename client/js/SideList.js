var SideList=(function(){

	//コンストラクタ。引数はリストIDとソート関数、コールバック関数
	function SideList(){
		
		/*------------------------------
			Private Instance Member
		------------------------------*/
		//リストの大きさを管理する変数
		var _size;

		/*------------------------------
			Private Instance Method
		------------------------------*/


		/*------------------------------
			Public Instance Member
		------------------------------*/


		/*------------------------------
			Public Instance Method
		------------------------------*/

		//行を挿入する
		this.insert=function(eventObject,position){
			if ( 0<position ) {
				var sph = ".eventBox:eq("+(position-1)+")";
			} else { //一番最後に出力
				var sph = "#box";
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
			str_title = eventObject['title'];
			str_title = str_title.replace(/^\s+|\s+$/g,'').replace(/ +/g,' ');
			if ( str_title.length>20 ) {
				str_title = str_title.substring(0, 20)+"…";
			} else {
				str_title = str_title.substring(0, 20);
			}
			str_sponsor = eventObject['sponsor'];
			str_sponsor = str_sponsor.replace(/^\s+|\s+$/g,'').replace(/ +/g,' ');
			if ( str_sponsor.length>10 ) {
				str_sponsor = str_sponsor.substring(0, 10)+"…";
			} else {
				str_sponsor = str_sponsor.substring(0, 10);
			}
			$(sph).after("<div id='list"+_size+"' class='wrap'><div class='dateBox "+weeks+"'>"+days+"<div class='eventBox'>"+str_title+"<div class='sponsorBox'>"+str_sponsor+"</div></div></div>");
			//クリックイベントリスナーを追加しておく
			$("#list"+_size).click(function(){
				gMap.panTo(new google.maps.LatLng(eventObject['latLng']['lat'], eventObject['latLng']['lng']));
			})
			_size++;

		//項目を挿入する

		}

		// //全体ソートするメソッド。引数はソート関数
		// this.sort=function(sortFunction){

		// 	/*ソート処理*/

		// }

		//リフレッシュ処理 内部的な配列のソートを終えたあとに実行することを想定
		this.refresh=function(){

			/* eventDataArrayにしたがって並べ直す */

		}

		//TODO filter
		//typeにString型で属性名を渡し､valueでフィルタリングをかける
		this.filter=function(type,value){

			/* typeによってフィルタリングする属性名を指定し､valueでフィルタリングをかける */

		}

		/*------------------------------
			Constructor
		------------------------------*/
		_size=0;

		$("#dateSort").click(function() {
			alert("おっす");
		})

		$("#areaSort").click(function() {
			alert("おっすおっす");
		})

		$("#weekSort").click(function() {
			alert("おっすおっすおっす");
		})

	};

	return SideList;
})();

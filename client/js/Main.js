//GoogleMap管理オブジェクト､gMapはグローバル宣言を行なっておく｡HTML上からでもいじれるように｡
var gMap;

$(function() {

	//GoogleMap管理オブジェクト､GMapを代入
	gMap=new GMap();
	console.log(
	Data.getLatLngObjectFromGID("G0000150")

		)

	//東広島のイベントを管理するオブジェクトを宣言
	var eventData=new HigashiEventData();

	//視覚的なサイドに設置されたリストを管理するオブジェクトを宣言
	var sideList=new SideList();

	//イベント管理オブジェクトへソート関数､コールバック関数､公式リストIDを渡してロード｡
	eventData.load(SortByDate,
		function(eventObject,position){
			//コールバック関数内部処理
			//リストへデータを挿入する
			sideList.insert(eventObject,position);
			//console.log(eventObject.latLng);
			gMap.createMarker(eventObject);
		},
		11);

	//TODO sort実装
	//IDでソートを行う関数
	function SortByID(a,b){
		return a.id - b.id;
	}

	//Dateでソートを行う関数
	function SortByDate(a,b) {
		if ( !a || !a.date[0] ) { //aあるいはaの日付が存在しない場合
			//この場合交換する､つまり手前の値(a)がｎｕｌｌだと交換し､後ろにくる｡
			return 1;
		} else if( !b || !b.date[0] ) {//bの日付が存在しない場合
			//交換しない､nullを後ろにおいておくため｡
			return -1;
		} else {
			//aとbそれぞれのeventObjectのミリ秒を取得し､比較する｡aが大きければ交換､小さければそのまま｡
			if ( a.date[0]['from'].getTime()>b.date[0]['from'].getTime() ) {
				return 1;
			} else if ( a.date[0]['from'].getTime()<b.date[0]['from'].getTime() ) {
				return -1;
			} else {
				return 0;
			}
		}
	}
});
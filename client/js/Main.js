//GoogleMap管理オブジェクト､gMapはグローバル宣言を行なっておく｡HTML上からでもいじれるように｡
var gMap;

$(function() {

	//GoogleMap管理オブジェクト､GMapを代入
	gMap=new GMap();

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
		},
		11);

	//TODO sort実装
	function SortByID(a,b){
		return a.id - b.id;
	}

	function SortByDate(a,b) {
		if ( a.date[0] && b.date[0] ) { //aとbの日付が存在する場合
			if ( a.date[0]['from'].getTime()>b.date[0]['from'].getTime() ) {
				return 1;
			} else if ( a.date[0]['from'].getTime()<b.date[0]['from'].getTime() ) {
				return -1;
			} else {
				return 0;
			}
		} else if ( a.date[0] )
			return -1;
		else {
			return -1;
		}
	}
});
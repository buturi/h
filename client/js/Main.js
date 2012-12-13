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
	eventData.load(SortByID,
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
});
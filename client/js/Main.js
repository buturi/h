//GoogleMap管理オブジェクト､gMapはグローバル宣言を行なっておく｡HTML上からでもいじれるように｡
var gMap;

$(function() {

	//GoogleMap管理オブジェクト､GMapを代入
	gMap=new GMap();

	//東広島のイベントを管理するオブジェクトを宣言
	var eventData=new HigashiEventData();

	//視覚的なサイドに設置されたリストを管理するオブジェクトを宣言
	var sideList=new SideList(eventData);

	//イベント管理オブジェクトへソート関数､コールバック関数､公式リストIDを渡してロード｡
	eventData.load(Sort.sortByOrder,
		function(eventObject,position){
			//コールバック関数内部処理
			//リストへデータを挿入する
			sideList.insert(eventObject,position);
			//console.log(eventObject.latLng);
			gMap.createMarker(eventObject);
		},
		{type:11});


	$("#orderSort").click(function() {
		eventData.sort(Sort.sortByOrder);
		sideList.refresh();
	})

	$("#dateSort").click(function() {
		eventData.sort(Sort.sortByDate);
		sideList.refresh();
	})

	$("#areaSort").click(function() {
		eventData.sort(Sort.sortByGID);
		sideList.refresh();
	})
	$('.listSelect').click(function() {
		reLoad({
			type : Number($(this).attr("typeID")),//現在のtypeを保持して取得する
			class : $('#placeSelect option:selected').val(),
			select_class : 1,
			code1 : $('#sectorSelect option:selected').val(),
			select_code1 : 1,
		})
	});

	//各検索用のセレクタのイベントハンドラ
	$('.searchSelect').bind('change', function() {
		reLoad({
			type : eventData.getOptions().type,//現在のtypeを保持して取得する
			class : $('#placeSelect option:selected').val(),
			select_class : 1,
			code1 : $('#sectorSelect option:selected').val(),
			select_code1 : 1,
		})
	});




	function reLoad(object){
		//googlemapクリア､リストクリア､再読み込みを行う
		gMap.deleteAllMarker();
		eventData.deleteAll();
		sideList.refresh();
		eventData.load(Sort.sortByOrder,
		function(eventObject,position){
			sideList.insert(eventObject,position);
			gMap.createMarker(eventObject);
		},object);
	}


	var debug=(function(){
		$("#debugEventObjectArrayTrace").click(function(){
			Utility.trace(eventData.getEventDataArray());
		});
	})();
});
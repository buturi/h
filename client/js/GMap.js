var GMap=(function(){

	//コンストラクタ。引数はリストIDとソート関数、コールバック関数
	function GMap(){
		
		/*------------------------------
			Private Instance Member
		------------------------------*/

		var _mapCanvas;

		/*------------------------------
			Private Instance Method
		------------------------------*/


		/*------------------------------
			Public Instance Member
		------------------------------*/


		/*------------------------------
			Public Instance Method
		------------------------------*/

		//GoogleMapをロードする
		this.load=function(){
			_mapCanvas = new google.maps.Map(document.getElementById("mapCanvas"));
			_mapCanvas.setCenter(new google.maps.LatLng(34.426709,132.743629));
			_mapCanvas.setZoom(11);
			_mapCanvas.setMapTypeId(google.maps.MapTypeId.ROADMAP);
		}

		//指定の座標へ移動する
		this.panTo=function(latLng){
			_mapCanvas.panTo(latLng);
		}

		//指定のリストが示す座標へ移動する
		this.moveMap=function(x){
				mapCanvas.panTo(new google.maps.LatLng(eventData.event[x]['latLng']['lat'],eventData.event[x]['latLng']['lng']));
		}

		/*------------------------------
			Constructor
		------------------------------*/
		this.load();
	};

	return GMap;
})();

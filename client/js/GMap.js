var GMap=(function(){

	//コンストラクタ。引数はリストIDとソート関数、コールバック関数
	function GMap(){
		
		/*------------------------------
			Private Instance Member
		------------------------------*/

		//Mapオブジェクト
		var _mapCanvas;
		var currentInfoWindow = null;

		//複数のマーカーを管理するクラス
		var markerList = new google.maps.MVCArray();

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

		this.createMarker=function(eventObject){
			//latLngがなければfunctionを抜ける
			if(!eventObject.latLng){
				return
			}
			//eventObject.latLng={lat:-20.3333333.lng:123.12312441};
			var latLng=eventObject.latLng

			var gLatlng = new google.maps.LatLng(latLng.lat,latLng.lng);



			var infoWnd = new google.maps.InfoWindow({content:"<h1><a href='http://higashihiroshima.genki365.net/gnkh12/pub/sheet.php?id="+eventObject.id+"'>"+eventObject.title+"</a></h1><p>"+eventObject.time+"</p><p>"+eventObject.gid+"</p>"});
			//consol.log(resultgid*8%0xFFFFFF);

			var tmpString=Utility.convertGIDToHexColorString(eventObject.gid);
			console.log(tmpString);

			var marker = new google.maps.Marker({
			    position: gLatlng, 
			    map: _mapCanvas, 
			    icon: 'http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=O|'+tmpString+'|000000',
			    title:eventObject.title
			});
			markerList.push(marker);

			eventObject.infoWin={
				open:
				function(){
					// alert(eventObject.title);
					if (currentInfoWindow) {
						currentInfoWindow.close();
					}		
					infoWnd.open(_mapCanvas, marker);
					currentInfoWindow = infoWnd;
				}
			}

			google.maps.event.addListener(marker, "click", function(){
				//情報ウィンドウを閉じる
				if (currentInfoWindow) {
					currentInfoWindow.close();
				}
				//情報ウィンドウを開く
				infoWnd.open(_mapCanvas, marker);
				
				currentInfoWindow = infoWnd;
			});	

	/*var markerPostion1 = new google.maps.LatLng(34.460428, 132.779771);
			var markerPostion2 = new google.maps.LatLng(34.445158, 132.789001);
			_createMarker(_mapCanvas, markerPostion1, "<b>近畿大学工学部</b>");
			_createMarker(_mapCanvas, markerPostion2, "<b>県立広島高校</b>");	*/

		}

		this.deleteAllMarker=function(){
			markerList.forEach(function(marker) {
				marker.setMap(null);
			});
			markerList.length=0;
		}

		//var _createMaker=function(map, latlng, text){


		//指定の座標へ移動する
		this.panTo=function(latLng){
			_mapCanvas.panTo(latLng);
		}


		/*------------------------------
			Constructor
		------------------------------*/
		this.load();

	};

	return GMap;
})();

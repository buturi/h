var HigashiEventData=(function(){

	//コンストラクタ。引数はリストIDとソート関数、コールバック関数
	function HigashiEventData(sortFunction,callbackFunction,listID){
		
		/*------------------------------
			Private Instance Member
		------------------------------*/
		//読み込み先ドメインを保持する
		var _domain;
		//イベントリストの種類を保持する｡これは公式サイトの引数と同じ
		var _listID;
		//ページに存在する項目のリストを格納する
		var _pageDataArray;
		//イベントリストを保持する
		var _eventData;
		//ソート用の関数を保持する｡sort()の引数と同じ仕様とする
		var _sortFunction;
		//リスト詳細データ読み込み完了毎に呼び出される関数を保持する
		var _callbackFunction;

		/*------------------------------
			Constructor
		------------------------------*/
		//スーパクラスのコンストラクタ実行 現在は継承関係にないので必要なし
		//EventData.apply(this, arguments);
		//初期化処理
		_domain=Data.getDomainList()[0];
		_listID=listID;
		_eventData={"event":new Array()};
		_sortFunction=sortFunction;
		_callbackFunction=callbackFunction;
		

		/*------------------------------
			Private Instance Method
		------------------------------*/

		//リスト詳細を受信完了時毎に実行されるメソッド
		//TODO _sortFunctionを用いて適切な場所に入れる｡入れば_callbackFunctionに返す
		var _onReceive=function(eventObject){

			//以下暫定設定
			_eventData.event.push(eventObject);
			var position=0;
			//以上暫定設定
			
			//sortFunctionにしたがって配列の適切な場所にeventObjectを挿入後､コールバック関数があればそこに挿入位置を返す
			alert("tesst"+eventObject.id);
			try{
				if(_callbackFunction){
					_callbackFunction(eventObject,position);
				}
			}catch(e){
				console.log(e);
			}
			
		}

		/*------------------------------
			Public Instance Member
		------------------------------*/


		/*------------------------------
			Public Instance Method
		------------------------------*/


		//データをロードするメソッド｡オーバライドする
		//受け取ったListIDに対応するイベントリストを取得､それをスクレイピングしていく
		this.load=function(sortFunction,callbackFunction,listID){
			if(listID){
				_listID=listID;
			}
			if(sortFunction){
				_sortFunction=sortFunction;
			}
			if(callbackFunction){
				_callbackFunction=callbackFunction;
			}
			_pageDataArray=Data.getPageDataArray(_listID);
			/*スクレイピング処理*/

			$.get(_domain+"content_search.php?type="+_listID+"&sort=5&select_class=1&select_code1=1",function(data){
				var content=$(data.responseText).find('a[href*="sheet.php?"]');

				content.each(function(){
		
					/*一時的なObjectを作成､これをあとでeventDataに入れる*/
					var tmpEventData=new Object();
					/*クエリストリングをid=で分離することで､IDを抽出*/
					tmpEventData["id"] = parseInt($(this).attr('href').split('id=')[1]);
					
					/*それぞれに対して詳細データを取得する*/
					$.get(_domain+"sheet.php?id="+$(this).attr('href').split('id=')[1], function(detailData){
						
						//$('#output').append(data.responseText);
						
						/*thに続いてtdタグがつづいている部分を探し､抽出する*/
						var detailContent=$(detailData.responseText).find('th ~ td');
						/*それぞれの部分に対して繰り返し処理を行い､相当するObjectの属性へ配置*/
						
						detailContent.each(function(i){
							//alert(_pageDataArray[i]);
							/*属性を上のArray->Object変換から取得､順番に合った属性へ代入*/
		                    
							tmpEventData[_pageDataArray[i]]=$(this).text();
							
						});
						
						/*String型の年月日をDate型に変換する*/
						/*複数日程記述時に､分離･記憶する必要がある*/

						if(tmpEventData["date"]){
							tmpEventData["date"]=Utility.getDateArrayFromString(tmpEventData["date"])
							if (tmpEventData["date"][0] && new Date().getTime() - tmpEventData["date"][tmpEventData["date"].length - 1]["to"].getTime() > 1000 * 60 * 60 * 24 * 7) {
								return;
							}
						}
						
						//他の絞り込みが必要
						Utility.getLatLng("東広島 "+tmpEventData["place"],function(latLng){//検索範囲が東広島か確認する過程も必要かと｡"東広島"にすると絞り込みでなく東広島市自体がひっかかってしまう｡早急なbound実装を求む
							if(latLng){
								tmpEventData["latLng"]={"lat":latLng.lat,"lng":latLng.lng};//住所に対応する座標があったときはそれをいれる
							}else{//見つからない､精度が極端に低い際は上のgroupID->座標変換リストを使う｡
								tmpEventData["latLng"]={"lat":34.426744,"lng":132.743763};
							}
						});
						_onReceive(tmpEventData);
					});
					
				});
			});

			/*  */
		}

		//全体のデータを取得するインスタンスメソッド。配列がかえる
		this.getData=function(){
			return _eventData;
		}

		//全体ソートするメソッド。引数はソート関数
		this.sort=function(){

			/*ソート処理*/

		}

		this.size=function(){
			return _eventData.event.length
		}
	};

	return HigashiEventData;
})();
//継承しないので以下は不要
//HigashiEventData.prototype = Object.create(EventData.prototype);
//HigashiEventData.prototype.constructor = HigashiEventData;
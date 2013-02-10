var HigashiEventData=(function(){

	//コンストラクタ。引数はリストIDとソート関数、コールバック関数
	//必ずloadかコンストラクタの段階でこの3つの属性をもたせること｡
	function HigashiEventData(sortFunction,callbackFunction,options){
		
		/*------------------------------
			Private Instance Member
		------------------------------*/
		//読み込み先ドメインを保持する
		var _domain;
		//イベントリストの種類を保持する｡これは公式サイトの引数と同じ
		var _options;
		//ページに存在する項目のリストを格納する
		// var _pageDataArray;
		//イベントリストを保持する
		var _eventDataArray;
		//ソート用の関数を保持する｡sort()の引数と同じ仕様とする
		var _sortFunction;
		//リスト詳細データ読み込み完了毎に呼び出される関数を保持する
		var _callbackFunction;
		//
		var _orderCounter;

		

		/*------------------------------
			Private Instance Method
		------------------------------*/

		//リスト詳細を受信完了時毎に実行されるメソッド
		var _onReceive=function(eventObject){

			var len = _eventDataArray.length;
			for ( compare=len;0<compare;compare-- ) {
				if( _sortFunction( _eventDataArray[compare-1],eventObject )<=0 ) { //入れ替え
      					break;
				}
			}
			_eventDataArray.splice(compare,0,eventObject);

			if(_eventDataArray.length>=_orderCounter){
				console.log("読み込み完了");
			}
			
			//sortFunctionにしたがって配列の適切な場所にeventObjectを挿入後､コールバック関数があればそこに挿入位置を返す
			// try{
				if(_callbackFunction){
					_callbackFunction(eventObject,compare);
				}
			// }catch(e){
				// console.log(e);
			// }
			
		}

		/*------------------------------
			Public Instance Member
		------------------------------*/


		/*------------------------------
			Public Instance Method
		------------------------------*/


		//受け取ったoptionsに対応するイベントリストを取得､それをスクレイピングしていく
		this.load=function(sortFunction,callbackFunction,options){
			if(options){
				_options=options;
			}
			//type属性がない場合は取得できないので､11を付与する
			if(!_options.type){
				_options.type=11;
			}
			if(sortFunction){
				_sortFunction=sortFunction;
			}
			if(callbackFunction){
				_callbackFunction=callbackFunction;
			}

			//Dataクラスからtype別のページ構成情報を取得する
			// _pageDataArray=Data.getPageDataArray(_options.type);
			/*スクレイピング処理*/

			//オプションをクエリストリングにする
			var qString="?";
			for (var key in _options) {
			    qString += key + "=" + _options[key] + "&";
			}

			//サーバ死亡時に切り替えるテスト実装
			//var siteSurvivalFlg=false;

			//サイトが死んでて､ドメインリストにまだ試していないドメインがあれば｡forを回す｡
			//for(var count=0;(!siteSurvivalFlg)&&count<Data.getDomainList().length;count++){
			$.get(_domain+"content_search.php"+qString,function(data){
				var content=$(data.responseText).find('a[href*="sheet.php?"]');

				//サーバ死亡時に切り替えるテスト実装
				/*if(content.length=0){
					_domain=Data.getDomainList()[count+1];
					return;
				}
				siteSurvivalFlg=true

				alert("domain="+_domain)*/
				_orderCounter=0;
				content.each(function(){
					
					/*一時的なObjectを作成､これをあとでeventDataに入れる*/
					var tmpEventData=new Object();
					/*クエリストリングをid=で分離することで､IDを抽出*/
					tmpEventData["id"] = parseInt($(this).attr('href').split('id=')[1]);

					//お知らせや募集に切り替えた際に受信予定していたデータが挿入されてしまうことを防ぐために､typeを記憶しておく｡
					tmpEventData["type"] = _options.type;

					//
					tmpEventData["order"] = _orderCounter++;
					
					/*それぞれに対して詳細データを取得する*/
					$.get(_domain+"sheet.php?id="+$(this).attr('href').split('id=')[1], function(detailData){
						//返ってきたEventObjectと現在のタイプを比較し､異なればデータを破棄する
						if (tmpEventData["type"]!=_options.type) {
							return;
						};
						
						//団体のマイページへつながるリンクを探し､リンクからグループIDを抽出する

						var gid=$(detailData.responseText).find('a[href*="/mypage/index.php?"]')
						if(gid[0]){
							tmpEventData["gid"]=gid.attr("href").split("gid=")[1];

						}else{
							tmpEventData["gid"]=""
						}
						gid=tmpEventData["gid"]
						
						/*thに続いてtdタグがつづいている部分を探し､抽出する*/
						var detailContent=$(detailData.responseText).find('th ~ td');
						/*それぞれの部分に対して繰り返し処理を行い､相当するObjectの属性へ配置*/
						
						detailContent.each(function(i){
							/*属性を上のArray->Object変換から取得､順番に合った属性へ代入*/
		                    try{
		                    var itemName=Data.pageItemJapaneseToEnglish($(this).prev().text().replace(/^\s+|\s+$/g,'').replace(/ +/g,' '))
							tmpEventData[itemName]=$(this).text().replace(/^\s+|\s+$/g,'').replace(/ +/g,' ');;
						}catch(e){
							alert(e);
						}
							
						});

						/* 画像のみimgのsrcを取り出すため､特別処理を行う｡ */
						/* thに続くtdを探し､その子としてのimgが存在する要素を探す｡そのあとsrc要素を取り出し､/で区切る */
						var tmpjQueryObject=$(detailData.responseText).find('th ~ td img')//$('th ~ td img')

						if(tmpjQueryObject[0]){
							var tmpArray=tmpjQueryObject.attr("src").split("/");
							/* /で区切った最後の値､つまりファイル名のみをとりだす｡ */
							tmpEventData["image"]="http://higashihiroshima.genki365.net/gnkh12/pub/"+tmpArray[tmpArray.length-1];
						}

						if(!tmpEventData["sponsor"]){
							tmpEventData["sponsor"]=tmpEventData["inquiry"];
						}

						if(!tmpEventData["place"]){
							tmpEventData["place"]="";
						}

						
						/*String型の年月日をDate型に変換する*/
						/*複数日程記述時に､分離･記憶する必要がある*/

						if(tmpEventData["date"]){
							tmpEventData["date"]=Utility.getDateArrayFromString(tmpEventData["date"])
							if (tmpEventData["date"][0] && new Date().getTime() - tmpEventData["date"][tmpEventData["date"].length - 1]["to"].getTime() > 1000 * 60 * 60 * 24 * 7) {
								//はじくときにはカウンターの値を減らしておく｡このカウンターでイベントの総数を把握､終了判定を行うため
								_orderCounter--;
								return;
							}
						}
						if(!tmpEventData["title"]){
							//はじくときにはカウンターの値を減らしておく｡このカウンターでイベントの総数を把握､終了判定を行うため
							_orderCounter--;
							return;
						}
						
						//他の絞り込みが必要
						Utility.getLatLng(tmpEventData["place"],function(latLng){//検索範囲が東広島か確認する過程も必要かと｡"東広島"にすると絞り込みでなく東広島市自体がひっかかってしまう｡早急なbound実装を求む
							if(latLng){
								tmpEventData["latLng"]={"lat":latLng.lat,"lng":latLng.lng};//住所に対応する座標があったときはそれをいれる
							}else{//見つからない､精度が極端に低い際は上のgroupID->座標変換リストを使う｡
								tmpEventData["latLng"]=Data.getLatLngObjectFromGID(gid);
								tmpEventData["latLng"].lat+=Math.random()/10000-0.00005;
								tmpEventData["latLng"].lng+=Math.random()/10000-0.00005;
							}
							_onReceive(tmpEventData);
						});
					});
					
				});
			}) 
			.error(function() { 
				_domain=Data.getDomainList()[count+1];
				});
			//サーバ死亡時に切り替えるテスト実装
			//}

			/*  */
		}

		//現在リストがもっているイベントのオプション属性を返すメソッド
		this.getOptions=function(){
			return _options;
		}

		//全体のデータを取得するインスタンスメソッド。配列がかえる
		this.getEventDataArray=function(){
			return _eventDataArray;
		}

		//全体ソートするメソッド。引数はソート関数
		this.sort=function(sortFunction){

			/*ソート処理*/
			_eventDataArray.sort(sortFunction);
		}

		this.size=function(){
			return _eventDataArray.length
		}

		this.deleteAll=function(){
			_eventDataArray.length=0;
		}



		/*------------------------------
			Constructor
		------------------------------*/
		//スーパクラスのコンストラクタ実行 現在は継承関係にないので必要なし
		//EventData.apply(this, arguments);
		//初期化処理
		_domain=Data.getDomainList()[0];
		_options=options;
		_eventDataArray=new Array();
		_sortFunction=sortFunction;
		_callbackFunction=callbackFunction;

	};

	return HigashiEventData;
})();
//継承しないので以下は不要
//HigashiEventData.prototype = Object.create(EventData.prototype);
//HigashiEventData.prototype.constructor = HigashiEventData;
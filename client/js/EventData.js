var EventData=(function(){

	//コンストラクタ。引数はリストIDとソート関数、コールバック関数
	function EventData(sortFunction,callbackFunction){
		
		/*------------------------------
			Private Instance Member
		------------------------------*/
		//イベントリストを保持する
		var _eventData;
		//ソート用の関数を保持する｡sort()の引数と同じ仕様とする
		var _sortFunction;
		//リスト詳細データ読み込み完了毎に呼び出される関数を保持する
		var _callbackFunction;


		/*------------------------------
			Private Instance Method
		------------------------------*/


		/*------------------------------
			Public Instance Member
		------------------------------*/


		/*------------------------------
			Public Instance Method
		------------------------------*/

		//ロードを行うメソッド
		this.load=function(){

		}
		
		//リスト詳細を受信完了時毎に実行されるメソッド
		this.onReceive=function(eventObject){
			//sortFunctionにしたがって配列の適切な場所にeventObjectを挿入後､コールバック関数があればそこに挿入位置を返す
			
			try{
				if(_callbackFunction){
					_callbackFunction(/*挿入位置,Number型*/);
				}
			}catch(e){
			}
			
		}

		//全体のデータを取得するインスタンスメソッド。配列がかえる
		this.getData=function(){
			return _eventData;
		}

		//全体ソートするメソッド。引数はソート関数
		this.sort=function(){
			
			/*ソート処理*/

		}

		/*------------------------------
			Constructor
		------------------------------*/
		_eventData={"event":new Array()};
		_sortFunction=sortFunction;
		_callbackFunction=callbackFunction;


	};

	return EventData;
})();

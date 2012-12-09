var EventData=(function(){

	//コンストラクタ。引数はリストIDとソート関数、コールバック関数
	function EventData(ListID,sortFunction,callbackFunction){
		
		/*------------------------------
			Private Instance Member
		------------------------------*/
		var _eventData={"event":new Array()};

		/*------------------------------
			Constructor
		------------------------------*/

		/*------------------------------
			Private Instance Method
		------------------------------*/

		/*------------------------------
			Public Instance Member
		------------------------------*/

		/*------------------------------
			Public Instance Method
		------------------------------*/
		//全体のデータを取得するインスタンスメソッド。配列がかえる
		this.getData=function(){

			return _eventData;
		}

		//全体ソートする。引数はソート関数
		this.sort=function(){

			//プログラム

		}
	};

	return EventData;
}

var Sort=(function(){

	//コンストラクタ
	function Sort(){

	}

	//TODO sort実装
	//IDでソートを行う関数
	Sort.sortByID=function(a,b){
		return b.id - a.id;
	}

	//Dateでソートを行う関数
	Sort.sortByDate=function(a,b) {
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

	return Sort;
})();

$(function() {
	var eventData=new HigashiEventData();
	eventData.load(SortByID,onReceive,11);


	function onReceive(){
		alert("ok!!")
	}

	//TODO sort実装
	function SortByID(a,b){
		if(a.id>b.id){
			return 1;
		}else if(a.id<b.id){
			return -1;
		}else{
			return 0;
		}
	}
});
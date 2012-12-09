$(function() {
	var eventData=new HigashiEventData();
	eventData.load(SortByID,onReceive,11);


	function onReceive(){
		alert("ok!!")
	}

	//TODO sort実装
	function SortByID(a,b){
		return a.id - b.id;
		}
	}
});
$(function() {
	var eventData=new HigashiEventData();
	eventData.load(SortByID,onReceive,11);


	function onReceive(){
		alert("ok!!")
	}
	function SortByID(){

	}
});
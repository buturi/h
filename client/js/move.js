// JavaScript Document
function moveMap() {
	var latlng =new google.maps.LatLng(eventData.event[0]['latLng']['lat'],eventData.event[0]['latLng']['lng']);
	var opts = {
		zoom: 13,
		center: latlng,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	};
	var map = new google.maps.Map(document.getElementById("mapCanvas"), opts);
}

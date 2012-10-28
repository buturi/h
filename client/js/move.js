// JavaScript Document
function moveMap(x) {
	var lat_lng =new google.maps.LatLng(eventData.event[x]['latLng']['lat'],eventData.event[x]['latLng']['lng']);
	var opts = {
		zoom: 16,
		center: lat_lng,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	};
	var map = new google.maps.Map(document.getElementById("mapCanvas"), opts);
}

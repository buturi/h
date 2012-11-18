// JavaScript Document
function moveMap(x) {
	mapCanvas.panTo(new google.maps.LatLng(eventData.event[x]['latLng']['lat'],eventData.event[x]['latLng']['lng']));
}

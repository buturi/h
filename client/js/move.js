// JavaScript Document
function moveMap() {
	var Latlng;
	var opts = {
		zoom: 3,
		center: Latlng
  };
	mapCanvas.setCenter(new google.maps.LatLng(eventData.event[0]['latLng']['lat'],eventData.event[0]['latLng']['lng']));
}

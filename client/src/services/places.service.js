
//for server
let baseUrl = 'http://localhost:3003/places';
if (process.env.NODE_ENV !== 'development') {
//for client
  baseUrl = '/places';
}

import axios from 'axios'
import _ from 'lodash'
//============================================
function getPointByObj(obj){
    var lat = +obj.position.lat;
    var lng = +obj.position.lng;
    
    var point = new google.maps.LatLng(lat,lng);
    return point;
}
//============================================
var rad = function(x) {
  return x * Math.PI / 180;
};
//============================================
  var getApiDist= function(item1,item2){
    var obj1 = new google.maps.LatLng(item1.position.lat, item1.position.lng)
    var obj2 = new google.maps.LatLng(item2.position.lat, item2.position.lng)
    
    var distance = google.maps.geometry.spherical.computeDistanceBetween(obj1, obj2);   
        return distance
}
//============================================
var getDistance2objs = function(obj1, obj2) {
    var p1 = obj1.position
    var p2 = obj2.position
    var ttt= 54;
    var ttt= 54;
    // var dist = getDistance2Points((p1, p2)/1000).toFixed(2);
    var dist = (getDistance2Points(p1,p2)/1000).toFixed(2);
;
    return dist;
}
//============================================
var getDistance2Points = function(p1,p2) {
  var R = 6378137; // Earth’s mean radius in meter
  var dLat = rad(p2.lat - p1.lat);
  var dLong = rad(p2.lng - p1.lng);
  var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(rad(p1.lat)) * Math.cos(rad(p2.lat)) *
    Math.sin(dLong / 2) * Math.sin(dLong / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c;
  return d; // returns the distance in meter
};
//============================================
  function  get2PointsDist(obj1,obj2,callbackFun){    
    var point1 = getPointByObj(obj1)
    var point2 = getPointByObj(obj2)
    // var point1 = new google.maps.LatLng(55.930385, -2.118425);
    // var point2 = new google.maps.LatLng(53.930385, -3.218425);
      var origin1 = new google.maps.LatLng(55.930385, -3.118425);
      var origin2 = 'Greenwich, England';
      var origin3 = 'Tel Aviv, Israel';
      var destinationA = 'Stockholm, Sweden';
      var destinationB = new google.maps.LatLng(50.087692, 14.421150);

      var service = new google.maps.DistanceMatrixService();
      service.getDistanceMatrix({
        origins: [point2],
        destinations: [point1],
        travelMode: 'DRIVING',
      }, callback)
    }
     function callback(res, status) {
        console.log(res);
        console.log('res:', res.rows[0].elements[0].distance.text)
        // console.log('res:', res.rows.elements[0].distance.text)

      }


function getMarkerById(markerId) {
    return getMarkers()
        .then(markers => {
            return markers.find(marker => markerId === marker.id);
        });
}


function saveMarker(lat, lng) {
    const marker = {
        position: { lat: lat, lng: lng },
    }
    return findTitle(marker.position)
        .then((res) => {
            marker.title = res
            return marker;
        })
}


function findTitle(latlng) {
    console.log('latlng from find title')
    console.log(latlng)
    var geocoder = new google.maps.Geocoder;
    var infowindow = new google.maps.InfoWindow;
    return new Promise(function (resolve, reject) {
        geocoder.geocode({ 'location': latlng }, function (results, status) {
            if (status === 'OK') {
                if (results[0]) {
                    resolve(results[0].formatted_address)
                } else {
                    resolve('Area 51');
                }
            } else {
                resolve('Area 51');
            }
        });
    })
}

function changeMarkerPos(marker, lat, lng) {
    marker.position.lat = lat;
    marker.position.lng = lng;
    findTitle(marker.position)
        .then((res) => { marker.title = res })
}


export default {
    saveMarker,
    get2PointsDist,
    changeMarkerPos,
    findTitle,
    getDistance2Points,
    getPointByObj,
    getApiDist,
    getDistance2objs
}
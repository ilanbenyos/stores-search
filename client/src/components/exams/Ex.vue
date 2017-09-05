<template>
    <div id="map-canvas">div 
    <button  @click="initMap">initMap</button>
    <button  @click="getdist1">getdist1</button>
      
    </div>

</template>
<script>
import Vue from 'vue'
import Places from '../../services/places.service.js';
const VueGoogleMaps = require('vue2-google-maps');

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyAIaE1djVXVF6V-ab6FjW-RQ48Q5ErH71Q',
    v: '3',
    libraries: 'places'
  }
})
export default {
  name: 'Ex',
  props: ['name'],
  data: function () {
    return {
      center:{lat:32.38, lng:34.8},
      markers: [{ _id:1,position:{lat:32.38, lng:34.8}, name:"mark1",icon: "http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|773144"},
                  {_id:2,position:{lat:32.39, lng:34.9}, name:"mark2",icon: "http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|123144"},
                  {_id:3,position:{lat:32.37, lng:34.7}, name:"mark3",icon: "http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|990055"}],

      mapName: this.name + "-map",
      center:{lat:32.38, lng:34.8},
      markers: [{id:1,position:{lat:32.38, lng:34.8}},{id:2,position:{lat:32.39, lng:34.9}}],
    }
  },
  mounted () {
    var that = this;
    setTimeout(function() {
        // that.initMap();
    }, 500);
  },
  
  methods: {
    getdist1(){
      var pos1 = this.markers[0];
      var pos2 = this.markers[1];
      // Places.get2PointsDist(pos1,pos2,this.callback);//
      var dist = Places.getDistance2Points(pos1,pos2);//
        console.log('getdist1:',dist)
      // var origin1 = new google.maps.LatLng(55.930385, -3.118425);
      // var origin2 = 'Greenwich, England';
      // var origin3 = 'Tel Aviv, Israel';
      // var destinationA = 'Stockholm, Sweden';
      // var destinationB = new google.maps.LatLng(50.087692, 14.421150);

      // var service = new google.maps.DistanceMatrixService();
      // service.getDistanceMatrix({
      //   origins: [origin1, origin3],
      //   destinations: [destinationA],
      //   travelMode: 'DRIVING',
      // }, this.callback)
    },
      callback(res, status) {
        console.log(res);
        console.log('res:', res.rows[0].elements[0].distance.text)

      },
     initMap() {
    var pointA = new google.maps.LatLng(51.7519, -1.2578);
    var pointB = new google.maps.LatLng(50.8429, -0.1313),
        myOptions = {
            zoom: 7,
            center: pointA
        },
        map = new google.maps.Map(document.getElementById('map-canvas'), myOptions),
        // Instantiate a directions service.
        directionsService = new google.maps.DirectionsService,
        directionsDisplay = new google.maps.DirectionsRenderer({
            map: map
        }),
        markerA = new google.maps.Marker({
            position: pointA,
            title: "point A",
            label: "A",
            map: map
        }),
        markerB = new google.maps.Marker({
            position: pointB,
            title: "point B",
            label: "B",
            map: map
        });
    // get route from A to B
    this.calculateAndDisplayRoute(directionsService, directionsDisplay, pointA, pointB);

},
calculateAndDisplayRoute(directionsService, directionsDisplay, pointA, pointB) {
    directionsService.route({
        origin: pointA,
        destination: pointB,
        avoidTolls: true,
        avoidHighways: false,
        travelMode: google.maps.TravelMode.DRIVING
    }, function (response, status) {
        if (status == google.maps.DirectionsStatus.OK) {
            directionsDisplay.setDirections(response);
            console.log('directionsDisplay:',directionsDisplay)
        } else {
            window.alert('Directions request failed due to ' + status);
        }
    });
}


  }
};
</script>
<style>
   html, body {
          height: 100%;
          margin: 0;
          padding: 0;
      }
      #map-canvas {
          height: 100%;
          width: 100%;
      }
</style>
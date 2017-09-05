<template>
  <div class="main">
    <input id="autocomplete" 
          placeholder="Enter your address" type="text">
    </input>
      <b-button variant='warning' @click.stop="sendAutocomplete">
          <b-tooltip class="margin-sides1" :delay="tooltipDelay" content="send">
            send
              <!--<i class="material-icons">undo       </i>-->
          </b-tooltip>
      </b-button>
    <!--<button  @click="send">Send</button>-->
    <button  @click="getApiDist">getApiDist</button>
    <button  @click="delMarker">delete marker</button>
    <button  @click="myGeolocation">myGeolocation</button>
    <button  @click="get2PointsDistance">get2PointsDistance</button>
    <button  @click="isMap=!isMap">toggleIsMap</button>
    <button  @click="isCreateMode=!isCreateMode">createNew</button>
     ={{isCreateMode}}=
     selectedMarker:{{markers.length}}
     {{selectedMarker}}
     msg:{{msg}}
    <div  v-if="isMap" class="map-container">
      <gmap-map
         id= 'map1' :center="center" :zoom="12" style="width: 600px; height: 700px" ref="map" 
            @dbclick="mapDbClick.native.prevent($event)"    @click="mapClick($event)"
        >
          <gmap-marker
            v-for="(item, idx) in markers"
            ref="markers"
            :icon="item.icon"
            :label="item.name"
            :position="item.position"
            :clickable="true"
            :draggable="true"
            @click="markerClick(item, idx ,$event)"
            @dragend="dragEnd(item,$event,idx)"
            
          >
          </gmap-marker  >
        </gmap-map> 
          <b-button variant='primary' @click="pan">
          </b-button>
    </div>
    </div>
</template>
<script>
import { SENDMSG } from '../../store/store'
import Helpers from '../../services/helpers.service.js';
import MapService from '../../services/places.service.js';
import Vue from 'vue'
const VueGoogleMaps = require('vue2-google-maps');

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyAIaE1djVXVF6V-ab6FjW-RQ48Q5ErH71Q',
    v: '3',
    libraries: 'geometry,places'
  }
})
export default {
  
  name: 'google-map',
  props: ['name'],
  data: function () {
    return {
      googleKey:'AIzaSyAIaE1djVXVF6V-ab6FjW-RQ48Q5ErH71Q',
      msg:'init',
      tooltipDelay:700,
      mapName: this.name + "-map",
      center:{lat:32.42, lng:34.93},
      markers: [{_id:1,position:{lat:32.42, lng:34.93}, name:"mark1",icon: "http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|773144"},
                  {_id:2,position:{lat:32.425, lng:34.94}, name:"mark2",icon: "http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|123144"},
                  {_id:3,position:{lat:32.423, lng:34.92}, name:"mark3",icon: "http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|990055"}],
      searchOver: false,
      list:[{_id:1,position:{lat:32.38, lng:34.8}},{_id:2,position:{lat:32.39, lng:34.9}}],
      listName:'stores',//need to be changed!!,
      isMap:true,
      selectedMarker:null,
      searchMarker:null,
      isCreateMode:false,
    }
  },
  mounted () {
        this.getList(this.listName,{});
        var list = this.$store.getters.fetchGetPonds;
          this.list = list  
    var that = this;
    setTimeout(function() {
        // that.initMap();
        that.initAutocomplete(that);
    }, 1200);
  },
    watch:{
      list1: function(newList){
            var list = this.$store.getters.fetchGetMarkers;
            this.list = list
      },
    },
    computed: {
        list1() {
            var list = this.$store.getters.fetchGetMarkers;
            return list;
        },
    },

  methods: {
    getApiDist(){
      
      var item1 = this.markers[0];
      var item2 = this.selectedMarker;
      
      var dist = MapService.getApiDist(item1,item2);
        console.log('getApiDist:',dist)
    },
    get2PointsDistance(){
      var latLngA = this.selectedMarker.position
      var latLngB = this.markers[0].position
      var dist = MapService.getDistance2Points(latLngA,latLngB);//
        console.log('getdist1:',dist)
      // var dist = google.maps.geometry.spherical.computeDistanceBetween (latLngA, latLngB);

    },
    mapClick(e){
      if(!this.isCreateMode){
        this.isCreateMode = true;
        return
      };
      var item = {_id: Helpers.generateId,position:{}}
      item.position.lat = e.latLng.lat();
      item.position.lng = e.latLng.lng();
        this.markers.splice(0,0,item);
        this.saveRecord(this.listName,item,e)
    },
    dragEnd(marker,e,idx){
        console.log('marker.getposition1:',marker.position.lat, marker.position.lng)
        marker.position.lat = e.latLng.lat()
        marker.position.lng = e.latLng.lng()
        console.log('marker.getposition2:',marker.position.lat, marker.position.lng)

    },
    markerClick(item, idx ,e){
      this.selectedMarker=item;
      console.log(' this.selectedMarker:',this.selectedMarker);
    },
    myGeolocation() {
      console.log(' navigator.geolocation:',navigator.geolocation);
        var location1 = {}
      navigator.geolocation.getCurrentPosition((position) => {
         location1 = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        console.log(' navigator.geolocation:',this.vue);

      });
    },
    delMarker(){

        var idx =Helpers.getIdxById(this.selectedMarker._id,this.markers)
        this.markers.splice(0,1);
      console.log('delMarker.this.markers.length:',this.markers.length);
    },
      sendAutocomplete() {
      
      if(!this.autocomplete) return
      let place = this.autocomplete.getPlace();
      if(!place) return;
      let lng = place.geometry.location.lng();
      let lat = place.geometry.location.lat();
      var address = place.geometry.formatted_address;
      // var obj={ _id:this.markers.length+1, branch:1,position:{lng,lat},place}
      debugger
             var obj =      {_id:this.markers.length+1,position:{lng,lat},address, name:"search"+this.markers.length ,icon: "http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|787878"}
      this.markers.splice(this.markers.length, 0, obj);
      this.selectedMarker = obj
      console.log('send.this.markers.length:',this.markers.length);//

    },
    //==========================================

    newMarker(location,map){
      var map = new google.maps.Map(document.getElementById('map'), {
        });

        var marker = new google.maps.Marker({
          position: myLatlng,
          map: map,
          title: 'Click to zoom'
        });
    },

    //==========================================

    initAutocomplete(that) {
      this.autocomplete = new google.maps.places.Autocomplete(
            /** @type {!HTMLInputElement} */(document.querySelector('#autocomplete')),
        { types: ['geocode'] });
    },
    pan(){
      this.$refs.map.panBy(10,10);
    },
    //========================================================
          isDeletedItem(item){
           if(item.mode=== 'deleted'){
                return 'deleted-item'
           }else{
                return '';
           }
        //    return (item.mode=== 'deleted')? 'deleted-item': '';
      },
    modalIsDirty(){
        this.modalDirty = true;
    },
  closeModal(){
            this.pageEdit =false;
            this.modalDirty = false;
  },
      editRecord(item){
            this.pageEdit =!this.pageEdit;
            this.item = Helpers.cloneDeep(item);
      },
        toggleField(e,bul){
            var parent = e.path[5];
            var inputNodes = parent.getElementsByTagName('input');
            this.toggleDisable(inputNodes,bul)
        },
      saveRecord(list,newObj,e){
            newObj.mode = 'saved';
            const acts =[]
            if(newObj._id){
                acts.push({ actType: 'updateInList', newObj, list,askFrom:'server' })
            }else{
                    acts.push({ actType: 'addToList', newObj, list,askFrom:'server' })
            }
                acts.push({ actType: 'getList', list, criteria:{},askFrom:'server' })
                this.sendMsg( {acts});
                this.closeModal()
      },
      addNewLocalRecord(arr){
        this.item = {mode :'edit'};
        this.pageEdit =true;
      },
      getList(listName,criteria){
            console.log('graders.getList', listName)
            const acts =[{ actType: 'getList', list:listName, criteria:{} }];
            this.sendMsg({acts});
      },
      deleteFromList2(list,obj,e){
            const acts =[
                            { actType: 'deleteFromList', objId:obj._id, list},
                            { actType: 'getList', list:list, criteria:{} }
                        ]
            this.sendMsg({acts});
            obj.mode = 'deleted'
            this.closeModal();
            this.modal2 =false;
      },
      closeModal2(){
        this.modal2 =false;
      },
      deleteFromList(list,_id,e){
        this.modal2 =true;
      },
      toggleDisable(inputNodes,bul){
            for (var i = 0; i < inputNodes.length; i++) {
                inputNodes[i].disabled = bul;
            }
      },
    sendMsg(msg){
          this.$store.dispatch({ type: SENDMSG, msg })
    },
    sendLocalMsg(msg){//msgs to the store
          this.$store.dispatch({ type: SENDLOCALMSG, msg })
    },
  },
  }
</script>
<style>
  .map-container {
    width: 600px;
    height: 300px;
    border:1px solid red;
  }
        #map {
        height: 100%;
      }
      /* Optional: Makes the sample page fill the window. */
      html, body {
        height: 100%;
        margin: 0;
        padding: 0;
      }
      #description {
        font-family: Roboto;
        font-size: 15px;
        font-weight: 300;
      }

      #infowindow-content .title {
        font-weight: bold;
      }

      #infowindow-content {
        display: none;
      }

      #map #infowindow-content {
        display: inline;
      }

      .pac-card {
        margin: 10px 10px 0 0;
        border-radius: 2px 0 0 2px;
        box-sizing: border-box;
        -moz-box-sizing: border-box;
        outline: none;
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
        background-color: #fff;
        font-family: Roboto;
      }

      #pac-container {
        padding-bottom: 12px;
        margin-right: 12px;
      }

      .pac-controls {
        display: inline-block;
        padding: 5px 11px;
      }

      .pac-controls label {
        font-family: Roboto;
        font-size: 13px;
        font-weight: 300;
      }

      #pac-input {
        background-color: #fff;
        font-family: Roboto;
        font-size: 15px;
        font-weight: 300;
        margin-left: 12px;
        padding: 0 11px 0 13px;
        text-overflow: ellipsis;
        width: 400px;
      }

      #pac-input:focus {
        border-color: #4d90fe;
      }

      #title {
        color: #fff;
        background-color: #4d90fe;
        font-size: 25px;
        font-weight: 500;
        padding: 6px 12px;
      }
</style>
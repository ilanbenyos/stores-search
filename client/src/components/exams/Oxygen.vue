<template>
  <section>
    <table>
      <tr>
        <th>Ponds</th>
        <th

        v-if="!isActTimeChanging(act,idx)"
        v-for="(act,idx) in currFacility.ponds[0].acts" :key="act.id"
        @dblclick="toggleChangeTime(act,idx)">{{act.time}}</th>
        <th v-else><input type="text" v-model="tempTime" @change="examService.changeActsTimeTo(changeParamFor,tempTime,currFacility)" ></input></th>
        <th><pre>  {{actTime}}    </pre></th>
      </tr>
      <tr v-for="(pond,idx) in currFacility.ponds" :key="pond.id">
        <td @click="addPondAct(pond.acts)">{{pond.id}}</td>
        <td 

          v-if="act.type === TYPE_OXYGEN"
          
          @dblclick="editModeVal(act)"
          v-for="act in pond.acts" :key="act.id"><div 
            v-if="changeParamFor.act === act"
            >
           <input type="number" v-model="act.val"></input>
          </div>
          <div v-else> {{act.val}}</div>

        </td>

        <td 
          v-if="isInputMode" 
          ><input 
            type="number"
            @change="resaultAdded(tempActs[idx].value)"
            v-model="tempActs[idx].val"
            ></input></td>
        <td v-else @click="addNewExam"> </td>
      </tr>
    </table>
    <button 
    v-if="examService.isEmptyObject(changeParamFor)"
    @click="finishCurrExams">Add Entry</button>
    <button 
      v-else
      @click="changeTime"
      >
      Change Value</button>
    <!-- <div v-if="isInputMode">input mode!
      <table>
        <tr>
          <th>Ponds</th>
        </tr>
        <tr v-for="pond in currFacility.ponds" :key="pond.id">
          <td>{{pond.id}}</td>
        </tr>  
      </table>
    </div> -->
  </section>
</template>
<script>
import { TYPE_OXYGEN } from '../../constants/actTypes'
import examService from '../../services/exam.service.js';
import moment from 'moment'
export default {
  name: 'exam-oxygen',
  data() {
    return {
      tempFacilities:[ { id:1, name:'harta', 
        ponds:[ { id:1, vol:20, 
          acts:[{id:1, date:new Date(), pond:1, type:TYPE_OXYGEN, time:6, val:10},
                {id:2, date:new Date(), pond:1, type:TYPE_OXYGEN, time:12, val:11}
          ] },
          { id:2, vol:20, 
          acts:[{id:2, date:new Date(), pond:1, type:TYPE_OXYGEN, time:6, val:10},
                {id:2, date:new Date(), pond:1, type:TYPE_OXYGEN, time:12, val:11},
          ] },
          { id:3, vol:20,acts:[{id:58, date:new Date(), pond:3, type:TYPE_OXYGEN, time:14, val:12},
          ] },
        ] 
      } ],
      currFacility:null,
      TYPE_OXYGEN:TYPE_OXYGEN,
      isInputMode:false,
      actTime:null,
      tempActs:[],
      examService:examService,
      changeParamFor:{},
      // changeExamFor:null,
      tempTime:null,
      // tempExamVal:null
    }
  },
  methods: {
    getTheTime(){
      return moment().format('HH:mm');
    },
    finishCurrExams(){
      console.log('finishing curr exams entries');
      this.tempActs.forEach( tmpAct =>{
        var pond = this.currFacility.ponds.find( pond => pond.id === tmpAct.pond);
        pond.acts.push(JSON.parse(JSON.stringify(tmpAct)));
        console.log("pushed this act:",tmpAct);
        pond.acts[pond.acts.length -1].date = new Date(Date.parse(pond.acts[pond.acts.length -1].date));
        console.log('pond acts after push',pond.acts)
      });
    },
    addNewExam(){
      console.log('adding a new exam');
      this.actTime = this.getTheTime();
      this.isInputMode = true;
      this.currFacility.ponds.forEach( pond => 
        this.tempActs.push(examService.createActObj(pond.id,TYPE_OXYGEN,this.actTime))
      );
    },
    resaultAdded(value){
      console.log("saving the temporary resault:", value);
    },
    toggleChangeTime(act,idx){
      this.changeParamFor ={
        day:act.date.getDate(), 
        month:act.date.getMonth(), 
        year:act.date.getFullYear(), 
        time:act.time,
        index:idx
      };
      this.tempTime = act.time;
      console.log('toggling change time input ',this.changeParamFor);


      this.timeChangeAct = true;
    },
    changeTime(){
      examService.changeActsTimeTo(this.changeParamFor,this.tempTime,this.currFacility);
      this.timeChangeAct = false;
      this.changeParamFor={};
    },
    isActTimeChanging(act,idx){
      console.log('checking if the current act is changing its time by the user');
      if(this.changeParamFor.index === idx) return examService.isActSameDateAndTime(act,this.changeParamFor, this.acts, idx);
      else return false;
    },
    editModeVal(act){
      console.log('turning on edit mode', act);
      // this.changeExamFor = act;
      this.changeParamFor = {act:act};
      // this.tempExamVal = act.val;
    },

  },
   created () {
    this.currFacility = this.tempFacilities[0];
  },
}
</script>
<style scoped>
  th{
    border: 1px solid black;
  }
  td{
    border: 1px solid black;
  }
</style>
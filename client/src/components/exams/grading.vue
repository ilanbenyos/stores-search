<template>
  <section>
    <button @click="creatExam">Grading</button>
      
      <div class="field flex row">
          <div class="field">{{currNum2}}</div>
          <div class="field">+</div>
          <div class="field">{{currNum1}}</div>
          <div class="field">=</div>
          <input  @keyup.enter="resExam" class="input" v-model="res"></input>
          <button @click="resExam">פתור!!</button>
      </div>
           == {{answers.currects}}/{{answers.wrongs}}==

        <div  :class="[ idx==0  ? 'lastExam': '', 'field flex row']" v-for="(exam,idx) in exams">
          <div class="field" >{{idx+1}}: {{exam.num2}}+{{exam.num1}} = {{exam.num2+exam.num1}} </div>

          <div v-if="((exam.num2+exam.num1) === exam.enterdrRes)" class="field">נכון</div> 
          <div v-else class="field">{{exam.res}} :לא נכון, נחשון חשב</div>
      </div>
  </section>
</template>
<script>
import { TYPE_OXYGEN } from '../../constants/actTypes'
import moment from 'moment'
export default {
  name: 'Grading',
  data() {
    return {
      exams:[],
      minNum:20,
      maxNum:50,
      currNum1:0,
      currNum2:0,
      res:null,
      exams:[],
      answers:{currects:0, wrongs:0},
      operator:''
      
    }
  },
  created () {
    this.creatExam()
  },
  methods: {
    getRandNum(min,max){
      return (Math.floor(Math.random() * max) + min) 
    },
    creatExam(){
       var num1 = this.getRandNum(this.minNum,this.maxNum);
       var num2 = this.getRandNum(this.minNum,this.maxNum);
       this.currNum1 =num1;
       this.currNum2 =num2;
       if(num1>num2){
          this.currNum2 =num1;
          this.currNum1 =num2;
       }
      //  this.res = num1-num2;
       },
       resExam(){
         var num1=this.currNum1;
         var num2=this.currNum2;
         var currectRes = num2 +num1;
         var enterdrRes = +this.res;
         (enterdrRes ==currectRes)?this.answers.currects++ : this.answers.wrongs++;
          var obj = {num1,num2,enterdrRes,res:this.res}
          this.exams.unshift(obj);
          this.res = null;
          this.creatExam();
    }
  },
}
</script>
<style scoped>
.flex{
  display: flex;
}
.row{
  flex-direction: row;
}
.col{
  flex-direction: column;
}
.lastExam{
  background-color: lightblue;
}
.field{
    margin:.3em;
    border:1px solid green;
    font-size:1.2em;
    /*width:4em;*/
}
*{
  outline:1px solid red;
}
</style>

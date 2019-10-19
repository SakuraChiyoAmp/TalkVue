<template>
  <div id="SingleTalk_Container">
     <div id="SingleTalk_Top">
       <mt-header title="和朋友的聊天">
            <router-link to="/MainPage" slot="left">
               <mt-button icon="back">返回</mt-button>
             </router-link>
        </mt-header>
     </div>
     <div id="SingleTalk_Body" >
       <div v-for="(e,index) of TalkMessage" :key="index">
          <MyTalk  :e="e" v-if="TalkMessage.length!=0" ></MyTalk>
      </div>  
     </div>
     <div id="SingleTalk_Foot">
<div style="width:90%;border-radius:1rem;">
<mt-field label="" placeholder="开始聊天吧" v-model="msg"></mt-field>
</div>
<mt-button type="primary" size="normal" @click="PostTalk()">talk</mt-button>
     </div>
  </div>
</template>
<style lang="css">
input{
  width:4rem;
}
  #SingleTalk_Container{
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
  #SingleTalk_Top{
    width: 100%;
    height: 5%;
    /* background: red; */
  }
  #SingleTalk_Body{
    width: 100%;
    height: 90%;
    overflow: scroll;
    
  }
  #SingleTalk_Foot{
    width: 100%;
    height: 5%;
    /* background: yellow; */
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-content: center;
  }
</style>
<script>
import OtherTalk from "./OtherTalk"
import MyTalk from "./MyTalk"
import PostSmg from "../../../PostInterface"
import GetSmg from "../../../GetInterface"
import { async } from 'q'

  export default {
    data() {
      return {
        formInline: {
          user: '',
          region: ''
        },
        msg:"",
        TalkMessage:[],
        UserName:'',
      }
    },
    created() {
       this.GetTalkMessage();
       for (let i of this.$store.state.MessageList){
         if (i.UserName==this.$route.query.OtherUserName){
           i.Flag=1;
         }
       }
       this.ClearMessage(this.$store.state.UserName,this.$route.query.OtherUserName);
    },
    methods: {
      PostTalk:async function() {
        let Msg={
             UserName:this.$store.state.UserName,
             OtherUserName:this.$route.query.OtherUserName,
             Message:this.msg,
             Date:new Date().getTime(),
        }        
        let MsgList={};
        await GetSmg.GetUserInfo(this.$route.query.OtherUserName).then(result=>{
          MsgList=result.data;
        })
        MsgList.Flag=1;
        this.$store.state.MessageList.push(MsgList);
        let obj={};
        this.$store.state.MessageList=this.$store.state.MessageList.reduce(function(item,next){
            obj[next.UserName] ? '' : obj[next.UserName] = true && item.push(next);
             return item;
          },[]);
        window.sessionStorage.setItem("MessageList",this.$store.state.MessageList);
        this.$socket.emit("PostTalkSocket",Msg);
        this.TalkMessage.push(Msg);
        //  PostSmg.PostTalk(this.$store.state.UserName,this.$route.query.OtherUserName,this.msg,new Date().getTime());      
      },
      GetTalkMessage:async function(){
      this.UserName=this.$store.state.UserName;
      GetSmg.GetTalkMessage(this.$store.state.UserName,this.$route.query.OtherUserName).then(result=>{
        this.TalkMessage=result.data.TalkMessage;
      })
      },
      ClearMessage:async function(UserName,OtherUserName){
        await PostSmg.ClearMessage(UserName,OtherUserName).then(result=>{
          // console.log(result.data);
        })
      }
    },
    components:{
      OtherTalk,
      MyTalk
    },
    sockets:{
         GetTalkSocket:async function(data){
     console.log("收到了哦"+data.OtherUserName);
     if (this.$route.path=="/SingleTalk"){
     this.TalkMessage.push(data);
      console.log("路径匹配");
     }
   }
}
    
  }
</script>
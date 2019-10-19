<template>
  <div id="Message_Container" >
    <div id="Meesage_Header">消息列表</div>
    <div  v-for="(e,index) of this.$store.state.MessageList" :key="index" id="Message_Body">
       <TalkRoom :Message="e" :v-if="e.UserName!=undefined" ></TalkRoom>
      </div>
  </div>
</template>
<style lang="css">
#MEssage_Body{
  margin-top: 0.5rem;
}
  #Message_Container{
    overflow: scroll;
  }
  #Meesage_Header{
           width: 100%;
       height: 3rem;
       display: fixed;
       color: #409EFF;
      background: black;
      text-align: center;
      line-height: 3rem;
      font-weight: bold;
  }
</style>
<script>
import GetMsg from "../../../GetInterface"
import TalkRoom from "./TalkRoom"
export default {
   components:{
     TalkRoom
   },
   methods:{

   }
  //  created() {
  //     GetMsg.GetMessageList(this.$store.state.UserName).then(result=>{
  //         if (result.data.MessageList.length!=0){
  //         this.$store.state.MessageList=result.data.MessageList;
  //         this.$store.state.MessageList=this.$store.state.MessageList.filter(item=>item.UserName!=this.Friend.UserName);
  //         window.sessionStorage.setItem("MessageList",this.$store.state.MessageList);
  //         }else{
  //          this.$store.state.MessageList=[];
  //         window.sessionStorage.setItem("MessageList",this.$store.state.MessageList);           
  //         }

  //      })
  //  },
}
</script>
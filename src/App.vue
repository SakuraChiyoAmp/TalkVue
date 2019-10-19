<template>
  <div id="app">
    <transition mode="out-in" enter-active-class="animated fadeInRight" leave-active-class="animated fadeOutLeft">
    <router-view></router-view> 
    </transition>  
    
    <!-- <input type="text" id="id">
    <input type="button" value="点击注册" @click="regist()">
    <input type="text" id="input">
    <input type="button" value="点击发送" @click="post()">
     要对x说<input type="text" id="name">
      内容<input type="text" id="content">
    <input type="button" value="点击发送" @click="talk()"> -->
  </div>
</template>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

}
</style>
<script>
import GetSmg from "../GetInterface"
import PostSmg from "../PostInterface"

export default{
  components:{

  },
  created() {
    this.Initial();
  },
  methods:{
      Initial:async function(){
        await GetSmg.GetMessageList(this.$store.state.UserName).then(result=>{
          console.log("执行初始化了a");
          if (result.data.MessageList.length!=0){
          this.$store.state.MessageList=result.data.MessageList;
          // this.$store.state.MessageList=this.$store.state.MessageList.filter(item=>item.UserName!=this.Friend.UserName);
          //进行去重处理
          let obj={};
          this.$store.state.MessageList=this.$store.state.MessageList.reduce(function(item,next){
            obj[next.UserName] ? '' : obj[next.UserName] = true && item.push(next);
             return item;
          },[]);
          window.sessionStorage.setItem("MessageList",this.$store.state.MessageList);
          console.log("之前有消息未读")
          }else{
           this.$store.state.MessageList=[];
          window.sessionStorage.setItem("MessageList",this.$store.state.MessageList);   
          console.log("之前没有消息未读");        
          }
        
       })
      }
  },
   sockets:{
    reconnect(){
     console.log("重新连接");
    },
   connect(){
     console.log("连接connection");
     if (this.$store.state.UserName!=null){
        this.$socket.emit("SocketLogin",this.$store.state.UserName);
         console.log("进行连接注册");
     }
   },
   disconnect(){
     console.log("断开连接");
   },
   receive(data){
     console.log("收到的消息是"+data);
   },
   talkto(data){
     console.log("别人对我说了全局路由"+data);
   },
   roomreceive(data){
     console.log("通过房间传过来的消息是0"+data);
   },
   ReceiveFriendSocket:async function(data){
      console.log("收到了用户的好友请求"+data);
     console.log("是数组吗");
     console.log(this.$store.state.FriendRequestList instanceof Array);
      await GetSmg.GetUserInfo(data).then(result=>{
        this.$store.state.FriendRequestList.push(result.data);
      })
   },
   GetTalkSocket:async function(data){
     console.log("收到了"+data.OtherUserName);
     if (this.$route.path=="/SingleTalk"){
     let a= await  PostSmg.PostTalk(data.UserName,data.OtherUserName,data.Message,data.Date,1);
      console.log("路径匹配");
     }else{
      let a= await PostSmg.PostTalk(data.UserName,data.OtherUserName,data.Message,data.Date,0);
      let b=  await GetSmg.GetUserInfo(data.UserName).then(result=>{
        result.data.Flag=0;
        let f=1;
        for (let i of this.$store.state.MessageList){
            if (i.UserName==result.data.UserName){
              i.Flag=0;
              f=0;
            }
        }
        if (f==1){
             this.$store.state.MessageList.push(result.data); 
        }
      
      window.sessionStorage.setItem("MessageList",this.$store.state.MessageList);
     })
    console.log("路径不匹配");
     }
   }
 },
}
// export default {
//   mounted(){
//    this.$socket.emit('connect', 1)
// },
//  sockets:{
//    connect(data){
//      console.log("连接connection"+data);
//    },
//    disconnect(){
//      console.log("断开连接");
//    },
//    receive(data){
//      console.log("收到的消息是"+data);
//    },
//    talkto(data){
//      console.log("别人对我说了"+data);
//    }
//  },
//  methods:{
//    post:function(){
//      var string=document.getElementById("input").value;
//      this.$socket.emit("send",string);
//    },
//    regist(){
//      var string=document.getElementById("id").value;
//      this.$socket.emit("regist",string);
//    },
//    talk(){
//      var id=document.getElementById("name").value;
//      var content=document.getElementById("content").value;
//      console.log(id);
//      console.log(content);
//      this.$socket.emit("talk",{id,content});
//    }
//  }
// }
</script>

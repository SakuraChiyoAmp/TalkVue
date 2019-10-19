<template>
  <div >
   
    <input type="text" id="id">
    <input type="button" value="点击注册" @click="regist()">
    <input type="text" id="input">
    <input type="button" value="点击发送" @click="post()">
     要对x说<input type="text" id="name">
      内容<input type="text" id="content">
    <input type="button" value="点击发送" @click="talk()">
   

             加入房间的名字 <input type="text" id="RoomName">
             加入房间<input type="button" @click="JoinRoom()" value="加入">
             要说的话<input type="text" id="RoomContent">
             说话<input type="button" @click="RoomTalk()" value="说话">
       <router-link to="/Test/Test1">1</router-link>
       <router-link to="/Test/Test2">2</router-link>
     <router-view></router-view>
  </div>
</template>
 
<style>
 #top{
   width: 100%;
   height: 5rem;
   display: flex;
   flex-direction: column;
   justify-content: center;
   align-content: center;
 }
</style>
<script>
export default {
  mounted(){
   this.$socket.emit('connect', 1)
},
 sockets:{
   connect(data){
     console.log("连接connection"+data);
   },
   disconnect(){
     console.log("断开连接");
   },
   receive(data){
     console.log("收到的消息是"+data);
   },
   talkto(data){
     console.log("别人对我说了0"+data);
   },
   roomreceive(data){
     console.log("通过房间传过来的消息是0"+data);
   }
 },
 methods:{
   JoinRoom:function(){
     var  RoomName=document.getElementById("RoomName").value;
     this.$socket.emit("JoinRoom",RoomName);
   },
   RoomTalk:function(){
     var String=document.getElementById("RoomContent").value;
     this.$socket.emit("RoomTalk",String);
   },
   post:function(){
     var string=document.getElementById("input").value;
     this.$socket.emit("send",string);
   },
   regist(){
     var string=document.getElementById("id").value;
     this.$socket.emit("regist",string);
   },
   talk(){
     var id=document.getElementById("name").value;
     var content=document.getElementById("content").value;
     console.log(id);
     console.log(content);
     this.$socket.emit("talk",{id,content});
   }
 }
}
</script>

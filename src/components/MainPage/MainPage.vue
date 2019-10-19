<template>
  <div id="MainPage">
    <div id="MainPage_Top">
      <transition  mode="out-in"  enter-active-class="animated slideInRight" leave-active-class="animated slideOutLeft">
    <router-view></router-view>
    </transition>
    </div>
    <div id="MainPage_Bottom">
      <div class="Main_PageRouter"><router-link to="/MainPage/Message"> <i class="el-icon-message"> </i></router-link></div>
      <div class="Main_PageRouter"><router-link to="/MainPage/Friend"><i class="el-icon-star-on"></i></router-link></div>
      <div class="Main_PageRouter"><router-link to="/MainPage/My"> <i class="el-icon-refresh"></i></router-link></div>
      <div class="Main_PageRouter"><router-link to="/MainPage/Notify"> <i class="el-icon-warning-outline"></i></router-link></div>
    </div>
  </div>
</template>
<style lang="css">

 *{
   margin: 0%;
   padding: 0%;
 }
 .Main_PageRouter{
   height: 100%;
   width: 33%;
   display: flex;
   justify-content: center;
   align-content: center;
   line-height: 2.2rem;
   font-size: 2.2rem;

 }
#MainPage{
  height: 100%;
  width: 100%;
  overflow: hidden;

}
#MainPage_Bottom{
    display:flex;
    justify-content: center;
    align-content: center;
    height: 6%;
    bottom:0;
    border-top: 0.08rem solid black;

  }
  #MainPage_Top{
    height: 94%;
    overflow: scroll;
  }
 .router-link-active {
   color: blue;
 }
</style>
<script>
export default {
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
     console.log("别人对我说了"+data);
   },
   roomreceive(data){
     console.log("通过房间传过来的消息是2"+data);
   }
 },
}
</script>
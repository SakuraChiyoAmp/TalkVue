<template>
  <div>
    1  </div>
</template>
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
     console.log("别人对我说了1"+data);
   },
   roomreceive(data){
     console.log("通过房间传过来的消息是2"+data);
   }
 },
}
</script>
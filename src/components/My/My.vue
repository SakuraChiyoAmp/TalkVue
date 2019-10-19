<template>
  <div id="UserPage_Container">
       <div id="UserPage_Head">
          <el-avatar shape="circle" :size="100" :fit="fit" :src="UserInfo.HeadImage"></el-avatar>
          <div id="UserPage_Name">{{UserInfo.UserName}}</div>
       </div>
       <div id="UserPage_Body">
         <mt-cell title="用户名" :value="UserInfo.UserName"></mt-cell>
         <mt-cell-swipe
          title="用户昵称"
          :right="[
          {
              content: '改名',
              style: { background: 'red', color: '#fff' },
              handler: () =>  this.$messagebox.prompt('输入修改的昵称').then(value=>{
                   this.show(value);
              })
           }
           ]">{{UserInfo.NickUserName}}</mt-cell-swipe>
       </div>
       <div id="UserPage_Foot">
              <mt-button size="large" type="danger" @click="LogOut()">退出登录</mt-button>
       </div>
  </div>
</template>
<style lang="css" scoped>
a{
text-decoration: none;
}
#UserPage_Name{
  font-weight: bold;
  font-size: 2rem;
}
  #UserPage_Container{
     width: 100%;
     height: 100%;
  
     display: flex;
     justify-content: center;
     align-content: center;
     flex-direction: column;
  }
  #UserPage_Head{
    width: 100%;
    height: 40%;
  }
  #UserPage_Body{
    width: 100%;
    height: 50%;
    text-align: left;
  }
  #UserPage_Foot{
    width: 100%;
    height: 10%; 
  }
</style>
<script>
import GetSmg from "../../../GetInterface.js"
import PostSmg from "../../../PostInterface"
export default {
   data(){
     return {
       UserInfo:{
       
       },
       
     }
   },
   methods:{
          show:async function(value){
           await PostSmg.ChangeNickUserName(this.$store.state.UserName,value.value).then(result=>{
             console.log(result);
           })
            this.UserInfo.NickUserName=value.value;
          },
          LogOut:async function(){
          await PostSmg.LogOut(this.$store.state.UserName);
          this.$store.dispatch("UserLogout");
          this.$router.push("/Login");
          },
          
   },
   created(){
    GetSmg.GetUserInfo(this.$store.state.UserName).then(result=>{
      this.UserInfo=result.data;
      console.log(result);
    })
    
   }
}
</script>
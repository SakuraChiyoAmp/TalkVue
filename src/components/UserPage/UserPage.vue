<template>
  <div id="UserPage_Container"> 
    <router-link to="/MainPage" ><el-button type="primary">回到首页</el-button></router-link>
       <div id="UserPage_Head">
          <el-avatar shape="square" :size="100" fit="fit" :src="UserInfo.HeadImage"></el-avatar>
          <div id="UserPage_Name">{{UserInfo.UserName}}</div>
       </div>
       <div id="UserPage_Body">
         <mt-cell title="用户名" :value="UserInfo.UserName"></mt-cell>
          <mt-cell title="昵称" :value="UserInfo.NickUserName"></mt-cell>
       </div>
       <div id="UserPage_Foot">
           <router-link :to="{name:'SingleTalk',query:{OtherUserName:UserInfo.UserName}}">
              <mt-button size="large" type="primary">开始聊天</mt-button>
           </router-link>
              <mt-button size="large" type="danger" @click="DeleteFriend($store.state.UserName,$route.query.UserName)" v-if="!flag">删除好友</mt-button>
              <mt-button size="large" type="primary" @click="AddFriend($store.state.UserName,$route.query.UserName)" v-if="flag">添加好友</mt-button>
       </div>
      
  </div>
</template>
<style lang="css">
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
    height: 20%;
    margin-top: 10%;
  }
  #UserPage_Body{
    width: 100%;
    height: 50%;
  -moz-box-shadow:7px 5px 16px #333333; -webkit-box-shadow:7px 5px 16px #333333; box-shadow:7px 5px 16px #333333;
    text-align: left;

  }
  #UserPage_Foot{
    width: 100%;
    height: 10%;
  
  }
</style>
<script>
import GetSmg from "../../../GetInterface"
import PostSmg from "../../../PostInterface"
export default {
   data(){
     return {
          UserInfo:{

          },
          flag:1,
     }
   },
   methods:{
          show:function(value){
            alert(value);
          },
          AddFriend:function(UserName,OtherUserName){
             PostSmg.AddFriend(UserName,OtherUserName).then(result=>{
                console.log(result);
                if (result.data.affectedRows!=0){
                  alert("发送请求成功，等待对方同意好友请求");
                  this.$socket.emit("AddFriendSocket",OtherUserName);
                }
             })

          },
          DeleteFriend:async function(UserName,OtherUserName){
            await PostSmg.DeleteFriend(UserName,OtherUserName).then(result=>{
                       if (result.data!=null){
                         alert("删除成功");
                       }
            })      
                 this.$router.push('/MainPage')
          }
         

   },
   sockets:{
          //  AddFriendSocket:function(OtherUserName){
          //      this.$socket.emit("AddFriend",OtherUserName);
          //  }
   },
             created() {
            GetSmg.GetUserInfo(this.$route.query.UserName).then(result=>{
                   this.UserInfo=result.data;
            })
            GetSmg.GetIfFriend(this.$store.state.UserName,this.$route.query.UserName).then(result=>{
                    this.UserInfo.FriendFlag=result.data.Flag;
                    if (result.data.Flag==1){
                          this.flag=0;
                    }else{
                      this.flag=1;
                    }
            })
          },
}
</script>
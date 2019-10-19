<template>
  <div id="OtherTalk_Container" >
    <div  v-if="this.flag" class="Con">
      <div id="OtherTalk_Right">
             {{e.Message}}
      </div>
       <div id="pup"></div>
      <div id="OtherTalk_Left">
          <el-avatar style="margin-top:0.2rem" shape="circle" size="100" fit="fit" :src='this.User.HeadImage'></el-avatar>
      </div>
    </div>

    <div  v-if="!this.flag" class="Con">
       <div id="OtherTalk_LeftR">
          <el-avatar style="margin-top:0.2rem" shape="circle" size="100" fit="fit" :src='this.OtherUser.HeadImage'></el-avatar>
      </div>
      <div id="pupR"></div>
      <div id="OtherTalk_RightR">
               {{e.Message}}
      </div>
     
    </div>  
  
  </div>
</template>
<style lang="css" scoped>
#pupR{
  width: 0rem;
  height: 0rem;
  margin-top:5%; 
  border: 0.5rem solid;
  border-color:transparent  black transparent  transparent;  
}
#pup{
  width: 0rem;
  height: 0rem;
  margin-top:5%; 
  border: 0.5rem solid;
  border-color:transparent transparent transparent black;
  }
#OtherTalk_LeftR{
    height: 100%;
    width: 18%;
  
}
#OtherTalk_RightR{
    width: 80%;
    
        border-radius: 0.2rem;
    border:solid 0.05rem black;
}
.Con{
    margin-top: 1%;
    width: 100%;
    display: flex;
    justify-content:start;
}
  #OtherTalk_Container{
    margin-top: 1%;
    width: 100%;
    
    display: flex;
    justify-content:space-between;
  }
  #OtherTalk_Left{
    height: 100%;
    width: 18%;
  
    display:flex;
    justify-content: center;
    align-content: center;
  }
  #OtherTalk_Right{
    width: 80%;
    border-radius: 0.2rem;
    border:solid 0.05rem black;
    margin-left: 5%;
    text-align: left;
  }
  
</style>
<script>
import GetMsg from "../../../GetInterface"
export default {
  data(){
    return {
            flag:"",
             User:{},
             OtherUser:{},
    }
  },
  props:{
    e:Object
  },
  created() {
       if (this.e.UserName==this.$store.state.UserName){
         this.flag=true;
       }else{
         this.flag=false;
       }
      GetMsg.GetUserInfo(this.e.UserName).then(result=>{
        this.User=result.data;
     })
      GetMsg.GetUserInfo(this.e.OtherUserName).then(result=>{
       this.OtherUser=result.data;
     })
  },
}
</script>
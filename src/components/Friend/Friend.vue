<template>
  <div id="Ffiend_Container">
        <div id="Friend_Search">
          <el-form :inline="true" :model="formInline" class="demo-form-inline">
               <el-form-item label="搜人">
                   <el-input v-model="formInline.user" placeholder="搜人"></el-input>
               </el-form-item>
                <el-form-item>
                   <el-button type="primary" @click="onSubmit">点击查询</el-button>
                 </el-form-item>
           </el-form>
        </div>
        <div id="Friend_Title">{{this.Msg}}</div>
        <div id="Friend_Bottom" v-for="(e,index) of FriendList" :key="index">
            <FriendSmall :friend="e">  </FriendSmall>
        </div>
  </div>
</template>
<style lang="css" scoped>
#Friend_Title{
  width: 100%;
  font-size: 1rem;
  font-weight: bold;
  height: 10%;
  margin-bottom: 0.5rem;
}
.router-link-active {
    text-decoration: none;
    color: black;
}
    #Friend_Search{
       width: 100%;
       height: 3rem;
       border-bottom: 0.1rem solid black;
       display: fixed;
       top: 0;
    }
    #Friend_Bottom{
      width: 100%;
      overflow: scroll;
      margin-top: 0.2rem;
      border-bottom: 0.1rem solid black;
    }
    #Ffiend_Container{
      overflow: hidden;
    }
</style>
<script>
import FriendSmall from "./FriendSmall"
import GetSmg from "../../../GetInterface"
  export default {
    data() {
      return {
        formInline: {
          user: '',
          region: ''
        },
        FriendList:[],
        Msg:"好友列表"
      }
    },
    methods: {
      onSubmit:async function() {
        if (this.formInline.user!=""){
          this.Msg="查询结果"
         await GetSmg.SearchFriend(this.$store.state.UserName,this.formInline.user).then(result=>{
           this.FriendList=result.data.FriendList;
         })
        }else{
          this.Msg="查询结果"
         await GetSmg.GetUserFriend(this.$store.state.UserName).then(result=>{
           this.FriendList=result.data.FriendList;
         })   
        }

      }
    },
    components:{
      FriendSmall
    },
    created(){
         GetSmg.GetUserFriend(this.$store.state.UserName).then(result=>{
           this.FriendList=result.data.FriendList;
         })   
    }
  }
</script>
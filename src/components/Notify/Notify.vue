<template>
  <div id="Ffiend_Container">
        <div id="Friend_Search">
                 好友请求
        </div>
        <div id="Friend_Bottom"  v-for="(e,index) of this.$store.state.FriendRequestList" :key="index">
           <PeopleNotify  :Friend="e" :v-if="e.UserName!=null"></PeopleNotify>
        </div>
  </div>
</template>
<style lang="css" scoped>
.router-link-active {
    text-decoration: none;
    color: black;
}
    #Friend_Search{
       width: 100%;
       height: 3rem;
       display: fixed;
       color: #409EFF;
      background: black;
      text-align: center;
      line-height: 3rem;
      font-weight: bold;
    }
    #Friend_Bottom{
      width: 100%;
      overflow: scroll;
    }
    #Ffiend_Container{
      overflow: hidden;
    }
</style>
<script>
import PeopleNotify from "./PeopleNotify"
import GetSmg from "../../../GetInterface"
  export default {
    data() {
      return {
        formInline: {
          user: '',
          region: ''
        },
        FriendList:[],
      }
    },
    methods: {
      onSubmit() {
        console.log('submit!');
      }
    },
    components:{
    PeopleNotify
    },
    created(){

         GetSmg.GetFriendRequestList(this.$store.state.UserName).then(result=>{
             this.$store.state.FriendRequestList=result.data.FriendRequestList;
             console.log("收到的长度为"+result.data.FriendRequestList.length);
             window.sessionStorage.setItem("FriendRequestList",this.$store.state.FriendRequestList);
         })
    }
  }
</script>
<template>
  <div id="TalkRoom_Container">
    <mt-cell-swipe
  :title="Friend.NickUserName"
  :right="[
    {
      content: '同意',
      style: { background: 'blue', color: '#fff' },
      handler: () => this.AddFriendSuccess()
    }
  ]"> <el-avatar shape="square" size="100" fit="fit" :src="Friend.HeadImage"></el-avatar><mt-badge type="error">1</mt-badge>
  </mt-cell-swipe>
  </div>
</template>
<script>
import PostSmg from "../../../PostInterface"
export default {
  methods:{
     AddFriendSuccess:async function(){
         await PostSmg.AddFriendSuccess(this.$store.state.UserName,this.Friend.UserName);
         this.$store.state.FriendRequestList=this.$store.state.FriendRequestList.filter(item=>item.UserName!=this.Friend.UserName);
          window.sessionStorage.setItem("FriendRequestList",this.$store.state.FriendRequestList);
         alert("添加好友成功!");
     },

     created() {
       console.log("名字"+this.Friend.UserName)
     },
  },
       props:{
       Friend:Object
     },
}
</script>
<style lang="css">
  #TalkRoom_Container{
    width: 100%;
    height: 3rem;
    margin-top: 0.1rem;
  }
</style>
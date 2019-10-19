<template>
  <div id="TalkRoom_Container">
    <router-link :to="{name:'SingleTalk',query:{OtherUserName:Message.UserName}}">
    <mt-cell-swipe
  :title="Message.UserName"
  :right="[
    {
      content: 'Delete',
      style: { background: 'red', color: '#fff' },
      handler: () => this.show()
    }
  ]"> <el-avatar shape="square" size="100" fit="fit" :src="Message.HeadImage"></el-avatar><mt-badge type="error" v-show="!Message.Flag">!</mt-badge>
  </mt-cell-swipe>
  </router-link>
  </div>
</template>
<script>
export default {
  methods:{
     show:function(){
      this.$store.state.MessageList=this.$store.state.MessageList.filter(i=>i.UserName!=this.Message.UserName);
     },
     created() {
        alert(this.Message.UserName);
        alert("cao")
     },
  },
       props:{
       Message:Object
     },
}
</script>
<style lang="css">
  #TalkRoom_Container{
    width: 100%;
    height: 3rem;
    margin-top: 0.1rem;
    -moz-box-shadow:7px 5px 16px #333333; -webkit-box-shadow:7px 5px 16px #333333; box-shadow:7px 5px 16px #333333;
  }
</style>
<template>
  <div id="OtherTalk_Container" v-if="e.UserName!=$store.state.UserName">
      <div id="OtherTalk_Left">
          <el-avatar style="margin-top:0.2rem" shape="circle" size="100" fit="fit" src='https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'></el-avatar>
      </div>
      <div id="OtherTalk_Right">
             撒的发生触发器而无法气温而称其为热气温而称其为而汽车娃儿出去玩而且我让驱蚊草人情味儿菜气温而称其为二次气温而称其为驱蚊草人情味儿陈乔恩我仍维持日前未插入气温而称其为二次气温而称其为二次去玩儿
      </div>
  </div>
</template>
<style lang="css" scoped>
  #OtherTalk_Container{
    margin-top: 1%;
    width: 100%;
    background: blue;
    display: flex;
    justify-content: space-around;
  }
  #OtherTalk_Left{
    height: 100%;
    width: 18%;
    background: yellow;
    display:flex;
    justify-content: center;
    align-content: center;
  }
  #OtherTalk_Right{
    width: 80%;
    background: red;
    margin-left: 5%;
    text-align: left;
  }
  
</style>
<script>
export default {
  props:{
    e:Object
  }
}
</script>
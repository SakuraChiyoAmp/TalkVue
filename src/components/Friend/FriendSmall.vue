<template>
<router-link :to="{name:'UserPage',query:{UserName:this.friend.UserName}}">
  <div id="FriendSmall_Container">
       <div id="FriendSmall_Left">
       <el-avatar shape="square" size="100" fit="fit" :src="friend.HeadImage"></el-avatar>
       </div>
       <div id="FriendSmall_Right">
            {{friend.NickUserName}}
       </div>
  </div>
  </router-link> 
</template>
<script>
export default {
  props:{
    friend:Object,
  }
}
</script>
<style lang="css" scoped>
*{
  margin: 0px;
  padding: 0px;
}
a{
  text-decoration: none;
  color: black;
}
.router-link-active {
    text-decoration: none;

}
   #FriendSmall_Container{
     margin-top: 0.1rem;
     display: flex;
     flex-direction:row;
     justify-content:space-between;
     align-content: center;
   }
   #FriendSmall_Right{
           text-align: center;
           line-height: 2.2rem;
           font-size: 1rem;
           font-weight: bold;
           margin-left: 1.5rem;
           text-decoration: none;
   }
   #FriendSmall_Left{
   
     
   }
</style>
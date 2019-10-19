<template>
  <div id="CreateMultipleTalk_Container">
        <div id="Friend_Search">
          <el-form :inline="true" :model="formInline" class="demo-form-inline">
               <el-form-item label="审批人">
                   <el-input v-model="formInline.user" placeholder="审批人"></el-input>
               </el-form-item>
                <el-form-item>
                   <el-button type="primary" @click="onSubmit">查询</el-button>
                 </el-form-item>
           </el-form>
        </div>
         <div id="Friend_Body">
            <div>
             <mt-cell-swipe
              title="昵称"
              :right="[
              {
                 content: '加入',
                   style: { background: 'blue', color: 'yellow' },
                 handler: () =>  this.$messagebox.confirm('加入群聊').then(action=>{
                       show(action);
              })
             }
              ]">用户昵称</mt-cell-swipe>
           </div>
                       <div>
             <mt-cell-swipe
              title="昵称"
              :right="[
              {
                 content: '加入',
                   style: { background: 'blue', color: 'yellow' },
                 handler: () =>  this.$messagebox.confirm('加入群聊').then(action=>{
                       show(action);
              })
             }
              ]">用户昵称</mt-cell-swipe>
           </div>
                       <div>
             <mt-cell-swipe
              title="昵称"
              :right="[
              {
                 content: '加入',
                   style: { background: 'blue', color: 'yellow' },
                 handler: () =>  this.$messagebox.confirm('加入群聊').then(action=>{
                       show(action);
              })
             }
              ]">用户昵称</mt-cell-swipe>
           </div>
                       <div>
             <mt-cell-swipe
              title="昵称"
              :right="[
              {
                 content: '加入',
                   style: { background: 'blue', color: 'yellow' },
                 handler: () =>  this.$messagebox.confirm('加入群聊').then(action=>{
                       show(action);
              })
             }
              ]">用户昵称</mt-cell-swipe>
           </div>


         </div>
         <div id="Friend_Foot">
              <div id="Friend_Foot_Head">已经加入群聊的人</div>
                           <mt-cell-swipe
              title="昵称"
              :right="[
              {
                 content: '移除',
                   style: { background: 'blue', color: 'yellow' },
                 handler: () =>  this.$messagebox.confirm('加入群聊').then(action=>{
                       show(action);
              })
             }
              ]">用户昵称</mt-cell-swipe>
              

         </div>
         <div id="Friend_Bottom">
            <router-link to="/MultipleTalk">
              <mt-button size="large" type="primary">创建群聊</mt-button>
           </router-link>
         </div>
  </div>
</template>
<style lang="css">
*{
  
}
  #CreateMultipleTalk_Container{
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
      #Friend_Search{
       width: 100%;
       height: 10%;
      
       display: fixed;
       top: 0;
    }
    #Friend_Body{
      height: 50%;
      width: 100%;
   
      overflow: scroll;
      text-align: left;
    }
    #Friend_Foot{
      width:100%;
      height: 35%;
   
      overflow: scroll;
    }
    #Friedn_Bottom{
      width: 100%;
      height: 5%;
     
    }
</style>
<script>
  export default {
    data() {
      return {
        formInline: {
          user: '',
          region: ''
        }
      }
    },
    methods: {
      onSubmit() {
        console.log('submit!');
      },
      show:function(action){
        if (action=="confirm"){
          alert("ye");
        }
      }
    },
    components:{
      
    }
  }
</script>
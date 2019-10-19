<template>
  <div id="LoginContainer">
   
    <div id="LoginTop">欢迎登陆</div>
    <div id="Login_Inner">
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" label-position="top">
        <el-form-item label="用户名" prop="username">
       <el-input type="text" v-model="ruleForm.username" autocomplete="off"></el-input>
       </el-form-item>
       <el-form-item label="密码" prop="pass">
       <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
       </el-form-item>
     
        <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
    
    </el-form>
   <div id="LoginBottm">
    <router-link  to="/Regist">
            <el-button type="primary">还未注册?</el-button>
    </router-link>
    </div> 
   </div>
  </div>
</template>
<script>
// import PostMsg from "../PostInterface"
import GetMsg from "../../../GetInterface"

  export default {
    data() {
      var validateUsername=(rule,value,callback)=>{
            if (value === ''){
                    callback(new Error("请输入用户名"));
            }else{
              var reg = new RegExp("[\\u4E00-\\u9FFF]+","g");
                if (reg.test(value))
                {
                    callback(new Error("用户名不能带有中文字符"));
                }else
                {
                  callback();
                }
               
            }
      }
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.ruleForm.checkPass !== '') {
            this.$refs.ruleForm.validateField('checkPass');
          }
          callback();
        }
      };
      return {
        ruleForm: {
          username:'',
          pass: '',       
        },
        rules: {
          username:[
            {validator:validateUsername,trigger:'blur'}
          ],
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
        }
      };
    },
    methods: {
      submitForm:async function(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
      const data=this.ruleForm;
      console.log(data);
      this.$axios({
        url:"http://localhost:3000/Login",
        method:"post",
        data:data,
      }).then(result=>{
        if (result.data.state=="success"){
        this.$store.dispatch("UserName",this.ruleForm.username);
        this.$store.dispatch("UserToken",result.data.token);
       this.SocketLogin();
       this.Initial();
       this.$router.push('/MainPage')
        } else {
            console.log('error submit!!');
            return false;
          }
        });
      }
    })},
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      SocketLogin(){
        this.$socket.emit("SocketLogin",this.$store.state.UserName);
      },
      Initial:async function(){
             await GetMsg.GetMessageList(this.$store.state.UserName).then(result=>{
               console.log("执行初始化了a");
          if (result.data.MessageList.length!=0){
          this.$store.state.MessageList=result.data.MessageList;
          // this.$store.state.MessageList=this.$store.state.MessageList.filter(item=>item.UserName!=this.Friend.UserName);
          //进行去重处理
          let obj={};
          this.$store.state.MessageList=this.$store.state.MessageList.reduce(function(item,next){
            obj[next.UserName] ? '' : obj[next.UserName] = true && item.push(next);
             return item;
          },[]);
          window.sessionStorage.setItem("MessageList",this.$store.state.MessageList);
          console.log("之前有消息未读")
          }else{
           this.$store.state.MessageList=[];
          window.sessionStorage.setItem("MessageList",this.$store.state.MessageList);   
          console.log("之前没有消息未读");        
          }
        
       })
      }
    },
    created(){
      if (this.$store.state.token!=null&&this.$store.state.token.length!=0){
        this.$router.push({path:'/MainPage'});
      }
    }
  
  }
</script>
<style lang="css" scoped>
#LoginTop{
  font-weight: bold;
  font-size: 50px;
}
#LoginBottm{
  margin-top: 30px;
}
#Login_Inner{
 margin-top: 50px;

}
   #LoginContainer{
     display: flex;
     flex-direction: column;
     justify-content: center;
     align-content: center;
   }
   #LoginContainer_Top{
     width: 2117px;
     height: 100px;
     font-weight: bold;
     font-size: 50px;
   }
</style>
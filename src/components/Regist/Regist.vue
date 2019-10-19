<template>
  <div id="SignUpContainer">
      <div id="SignUp_Head">欢迎使用</div>
    <div>
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm"  label-position="top">
        <el-form-item label="用户名" prop="username">
       <el-input type="text" v-model="ruleForm.username" autocomplete="off"></el-input>
       </el-form-item>
        <el-form-item label="昵称" prop="nickusername">
       <el-input type="text" v-model="ruleForm.nickusername" autocomplete="off"></el-input>
       </el-form-item>
       <el-form-item label="密码" prop="pass">
       <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
       </el-form-item>
       <el-form-item label="确认密码" prop="checkPass">
       <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
       </el-form-item>
    <div class="RegistItem">    
     <el-upload
      class="upload-demo"
      action="#"
       ref="upload"  
    :auto-upload="false"
     :multiple="true"
     :on-preview="handlePreview"
  :on-remove="handleRemove"
  :file-list="fileList"
  list-type="picture">
  <el-button size="small" type="primary">点击上传</el-button>
  <div slot="tip" class="el-upload__tip">上传头像</div>
</el-upload>
</div>
     <div class="RegistItem">
        <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
     </div>
    </el-form>
   </div>
   <div class="RegistItem">
    <router-link  to="/Login">
            <el-button type="primary" >已有账号,点击登录</el-button>
    </router-link>
   </div> 
  </div>
</template>
<script>
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
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        ruleForm: {
          username:'',
          nickusername:'',
          pass: '',
          checkPass: '',
        },
        rules: {
          username:[
            {validator:validateUsername,trigger:'blur'}
          ],
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ],
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
             const fileArray = this.$refs.upload.uploadFiles;
             if (fileArray.length>1){
               alert("只可上传一张头像");
               return false;
             }else{
            console.log(fileArray);
            var fd = new FormData();
            for(let i = 0; i < fileArray.length; i++) {
                fd.append('avatar', fileArray[i].raw);            
            }
      console.log(fd.getAll("avatar"));
      const data=this.ruleForm;
      this.$axios({
        url:"http://localhost:3000/SignUp",
        method:"post",
        data:fd,
        params:data,
      }).then(result=>{
        alert(result.data);
        if (result.data.state=="success"){
        this.$router.push("/Login");
        }
      })
             }       
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
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
.RegistItem{
  margin-top: 15px;
}
#SignUp_Head{
        height: 20%;
        width: 100%;
        font-size: 2rem;
}
#SignUP_Router{
   margin-left: 10%;
}
   #SignUpContainer{
     
     display: flex;
     flex-direction: column;
     justify-content: center;
     align-content: center;
     width: 100%;
     height: 100%;
   }
   #SignUpContainer_Top{
     width: 2117px;
     height: 100px;
     font-weight: bold;
     font-size: 50px;
   }
</style>
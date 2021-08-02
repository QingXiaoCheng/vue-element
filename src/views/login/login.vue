<template>
  <div class="loginContent">
    
      <el-form :model="ruleForm" ref="ruleForm" :rules="rules">
        <div class="loginTitle">系统登陆
          <el-dropdown trigger="click" placement="bottom-start">
            <img :src="language" alt="" class="transLang">
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item disabled>中文</el-dropdown-item>
              <el-dropdown-item>English</el-dropdown-item>
              <el-dropdown-item>Español</el-dropdown-item>
              <el-dropdown-item>日本語</el-dropdown-item> 
            </el-dropdown-menu>
          </el-dropdown>
         
        </div>  
        <el-form-item prop="name"> 
          <el-input v-model="ruleForm.name" placeholder="请输入账号" prefix-icon="el-icon-user" ></el-input>
        </el-form-item>
        <el-form-item prop="password"> 
          <el-input placeholder="请输入密码" v-model="ruleForm.password" show-password prefix-icon="el-icon-lock" type="password"></el-input>
        </el-form-item>  
        <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button> 
        <div class="formButtom">
          <div class="accountTip">
            <div>账号：admin    密码：随便填</div>
            <div>账号：editor   密码：随便填</div>
          </div>
          <el-button type="primary">第三方登陆</el-button> 
        </div>

    </el-form> 
  </div>
</template>

<script>
import language from '../../assets/icon/language.png'
import { mapState } from 'vuex'
export default {
  computed:{
    ...mapState(['userinfo'])
  },
  name:'login',
  data(){
    return { 
      language,
      ruleForm: {
        name: '',
        password: ''
      },
      rules:{
        name: [
          { required: true, message: '请输入账号', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6,  message: '长度在必须大于6个字符', trigger: 'blur' }
        ]
      }
    }
  },
  created(){ 
    if(this.userinfo) {
      this.ruleForm = {...this.userinfo}
    }
  }, 
  methods:{
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$api.login().then(res=>{
            if(res.statusText == 'OK') { 
              this.$store.commit('setToken', res.data)
              this.$store.commit('setUser', this.ruleForm)
              sessionStorage.setItem('token', res.data) 
              this.$router.push('/')
            }else{
              console.log('login error');
            } 
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
  }
}
</script>


<style lang="less" scoped>
.loginContent{
  background-color: #2d3a4b;
  height: 100%;
  width: 100%;
  color: #fff;
  overflow: hidden;
  .el-form{
    width: 520px;
    margin: 0 auto;
    max-width: 100%;
    padding: 160px 35px 0;
    .loginTitle{
      font-size: 26px;
      margin-bottom: 40px;
      position: relative;
      .el-dropdown{
        cursor: pointer; 
        position: absolute;
        right: 0;
        top: 60%;
        transform: translateY(-50%);
        .transLang{
          width: 18px;
          height: 18px;
        }
      } 
      
    }  
   ::v-deep.el-form-item  .el-input__inner{
        background-color: transparent;
        border: 1px solid hsla(0,0%,100%,.1);
        line-height: 47px;
        padding: 12px 5px 12px 30px;
        height: 47px; 
      color: #fff;
    }
    .el-button {
      width: 100%;
      margin-bottom: 30px;
    }
    .formButtom{
      width: 100%;
      display: flex;
      .accountTip{
        flex: 5;
        text-align: left;
        font-size: 14px;
        div{
          margin-bottom: 5px;
        }
      }
      .el-button{
        flex: 1;
        margin-bottom: 0;
        padding: 8px 20px;
        height: 40px;
        margin-top: 5px;
      }
    }
  }
  
}

</style>
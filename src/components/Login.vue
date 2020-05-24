<template>
  <div class="login_container">
    <div class="login_box">
      <div>
        <h1 align="center">电商后台管理系统</h1>
      </div>
      <el-form ref="loginFormRef" :model="loginForm" :rules="loginFormRules"
               label-width="70px" class="login_form" >
        <el-form-item label="账  号" prop="username">
          <el-input v-model="loginForm.username" prefix-icon="iconfont icon-user" class="login_input"/>
        </el-form-item>
        <el-form-item label="密  码" prop="password">
          <el-input v-model="loginForm.password" prefix-icon="iconfont icon-3702mima" type="password"/>
        </el-form-item>
        <el-form-item class="btn">
          <el-button type="primary" round @click="login">登  录</el-button>
          <el-button type="warning" round @click="resetLoginForm">重  置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 这是登录表单的数据绑定对象
      loginForm: {
        username: 'lkp',
        password: '123456'
      },
      // 这是表单校验绑定对象
      loginFormRules: {
        username: [
          { required: true, message: '请输入登录账号', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在3到10之间', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入登录密码', trigger: 'blur' },
          { min: 3, max: 6, message: '长度在3到6之间', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 重置按钮点击事件
    resetLoginForm () {
      this.$refs.loginFormRef.resetFields()
    },
    // 登录表单提交事件
    login () {
      this.$refs.loginFormRef.validate(async valid => {
        if (!valid) return
        const { data: res } = await this.$http.post('/login', this.loginForm)
        if (!res.success) return this.$message.error(res.resMsg)
        // 登录成功，保存token，跳到首页
        console.log(res)
        window.sessionStorage.setItem('token', res.data.token);
        window.sessionStorage.setItem('username', this.loginForm.username)
        await this.$router.push('/home')
      })
    }
  }
}
</script>

<style lang="less" scoped>
  .login_container{
    height: 100%;
    width: 100%;
    background: aqua url("../assets/back.jpg") bottom center no-repeat;
    background-size: 100% 100%;
  }
  .login_box{
    height: 350px;
    width: 500px;
    background-color: #E4E7ED;
    border-radius: 3px;
    padding: 3px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-48%, -55%);
  }
  .login_form{
    position: absolute;
    top: 35%;
    padding: 0 20px;
  }
  .login_input{
    width: 350px;
  }
  .btn{
    display: flex;
    justify-content: center;
    margin-right: 50px;
    margin-top: 35px;
  }
</style>

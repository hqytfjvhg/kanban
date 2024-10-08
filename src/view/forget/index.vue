<!--  -->
<template>
  <div class="login-container">
    <div class="change-lan" style="margin:1rem;position:absolute;top: 0;right:0rem;">
      <ChangeLan></ChangeLan>
    </div>
    <el-form ref="userForm" class="login-form" auto-complete="on" label-position="left">
      <div class="title-container">
        <img src="@/assets/logo.png" alt="" />
        <!-- {{ $t(`app.name`) }}  -->
        <h3 class="title">{{ $t(`login.resetPassword`) }}</h3>
      </div>

      <el-form-item prop="username">
        <span class="svg-container">
          <li class="el-icon-user-solid"></li>
        </span>
        <el-input v-model="username" :placeholder="$t(`login.account`)" type="text" />

      </el-form-item>

      <el-form-item prop="email">
        <span class="svg-container">
          <li class="el-icon-message"></li>
        </span>
        <el-input v-model="email" type="text" :placeholder="$t(`login.email`)" />
      </el-form-item>

      <el-form-item style="margin-bottom: 10px;" prop="phone">
        <span class="svg-container">
          <li class="el-icon-mobile-phone"></li>
        </span>
        <el-input v-model="code" type="text" :placeholder="$t(`login.code`)" />
      </el-form-item>

      <el-form-item>
        <span class="svg-container">
          <li class="el-icon-lock"></li>
        </span>
        <el-input v-model="password" type="password" :placeholder="$t(`login.password`)" />
      </el-form-item>

      <!-- <el-form-item prop="code">
                <span class="svg-container">
                    <li class="el-icon-close-notification"></li>
                </span>
                <el-input v-model="code" type="text" :placeholder="$t(`login.code`)"
                    style="display: inline-block;width: 18rem;"/>
                <span style="display:contents;position: relative;">
                    <img style="width: 12rem;height: 80%;position: absolute;bottom:0;right: 0;top:0;margin:auto 0rem"
                        :src="codeUrl" fit="true" />
                </span>
            </el-form-item> -->

      <div style="margin-bottom: 26px; display: flex; justify-content: flex-end; padding-right: 10px;">
        <el-link @click="sendEmail" type="primary" size="" style="margin-right: 1rem;" :underline="false">
          {{ $t(`login.emailSendCode`) }}</el-link>
        <el-link type="warning" :underline="false" @click="login">{{ $t(`login.toLogin`) }}</el-link>
      </div>
      <el-button :loading="loading" type="primary" max-length="18" style="width:100%;margin-bottom:30px;"
        @click="reset">{{ $t(`login.setPassword`) }}</el-button>
    </el-form>
  </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';
import ChangeLan from '@/components/changeLan/index.vue'
import { sendCodeByUsername, resetPassword } from '@/api/user'
export default {
  // import引入的组件需要注入到对象中才能使用
  components: {
    ChangeLan
  },
  name: 'forgetPassword',
  //props: {
  //  handA: {
  //    type: String,
  //    required: true
  //    default: '100'
  //  }
  //},
  data() {
    // 这里存放数据
    return {
      username: '',
      email: '',
      code: '',
      password: '',
      loading: false,

    };
  },
  // 监听属性 类似于data概念
  computed: {},
  // 监控data中的数据变化
  watch: {},
  // 方法集合
  methods: {
    login() {
      this.$router.push({ path: '/info_screen/login' })
    },
    async sendEmail() {
      // console.log('发送验证码！')
      if (this.username === '') {
        this.$message({
          type: 'error',
          message: 'Please enter the username'
        })
      }
      if (this.email === '') {
        this.$message({
          type: 'error',
          message: 'Please enter the email'
        })
      } else {
        const { data: res } = await sendCodeByUsername(this.username, this.email)
        if (res.code === 200) {
          this.$message({
            type: 'success',
            message: res.msg
          })
        } else {
          this.$message({
            type: 'error',
            message: res.msg
          })
        }
      }
    },
   async reset() {
    if (this.username === '') {
        this.$message({
          type: 'error',
          message: 'Please enter the username'
        })
      }

      if (this.email === '') {
        this.$message({
          type: 'error',
          message: 'Please enter the email'
        })
      }

      if (this.code === '') {
        this.$message({
          type: 'error',
          message: 'Please enter the vertify code'
        })
      }

      if (this.password === '') {
        this.$message({
          type: 'error',
          message: 'Please enter the password'
        })
      }

      const {data:res} = await resetPassword(this.username,this.email,this.code,this.password)
      if(res.code === 200){
        this.$message({
            type: 'success',
            message: res.msg
          })
          this.username = ''
          this.email = ''
          this.code = ''
          this.password = ''
          this.$router.push({ path: '/info_screen/login' })
      } else{
        this.$message({
            type: 'error',
            message: res.msg
          })
      }
    }
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created() {

  },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {

  },
  beforeCreate() { }, // 生命周期 - 创建之前
  beforeMount() { }, // 生命周期 - 挂载之前
  beforeUpdate() { }, // 生命周期 - 更新之前
  updated() { }, // 生命周期 - 更新之后
  beforeDestroy() { }, // 生命周期 - 销毁之前
  destroyed() { }, // 生命周期 - 销毁完成
  activated() { }, // 如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
<style lang='scss' scoped>
//  @import url(); 引入公共css类
// html,
// body {
//   height: 100%;
//   /* overflow: hidden;*/
//   /*上下全屏滑动*/
// }

.container {

  background-color: #fcefe8;
  width: 100vw;
  /* 100%窗口高度 */
  height: 100vh;

  /* 弹性布局 水平居中 垂直居中*/
  display: flex;
  justify-content: center;
  align-items: center;

  .register-container {
    position: relative;

    width: 20%;
    height: 50%;
    /* 背景渐变色 */
    background: linear-gradient(to right bottom, #6ec6ca, #fec9c9);
    /* 圆角边框 */
    border-radius: 20px;

    .title {
      margin: 30px 0;
      font-size: 35px;
      color: black;
      text-align: center;
    }

    .form {

      margin: 30px 50px;
      width: 90%;

      .el-input {
        width: 80%;
      }

      .submit {
        width: 80%;
      }
    }
  }



}

$bg: #283443;
$light_gray: #fff;
$cursor: #fff;
$dark_gray: #889aa4;


.login-container {
  width: 100vw;
  height: 100vh;
  background-color: $bg;
  overflow: hidden;
  display: flex;
  align-items: center;

  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      color: $light_gray;
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }

  .login-form {
    position: relative;
    width: 30;
    width: 30%;
    margin: 0 auto;
    overflow: hidden;

    .title-container {
      display: flex;
      flex-direction: column;
      align-items: center;

      img {
        width: 80px;
        margin-bottom: 1rem;
      }

      .title {
        font-size: 2rem;
        color: $light_gray;
        margin: 0px auto 40px auto;
        text-align: center;
        font-weight: bold;
      }
    }

    .svg-container {
      padding: 6px 5px 6px 15px;
      color: $dark_gray;
      vertical-align: middle;
      width: 30px;
      font-size: 1.5rem;
      display: inline-block;
    }
  }
}
</style>
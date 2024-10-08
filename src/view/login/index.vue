<!-- 2023-12-19 改版 -->
<template>
    <div class="login-container">
      <div class="login-box">
        <div class="login-banner">
          <div class="logo" />
          <img src="@/assets/login/login-banner-img.png" class="banner">
        </div>
        <div class="login-right-form">
          <el-form ref="loginForm" :model="userForm" :rules="loginRules" autocomplete="on" class="login-form" label-position="left" @keyup.enter.native="handleLogin">
            <div class="title-container">
              <h3 class="title">{{ $t(`app.name`) }}</h3>
              <ChangeLan class="lang"/>
            </div>
            <el-form-item prop="username">
              <span class="svg-container">
                <i class="el-icon-user" />
              </span>
              <el-input ref="username" v-model="userForm.username" autocomplete="on" :placeholder="$t(`login.account`)" tabindex="1" type="text" clearable />
            </el-form-item>

            <el-tooltip v-model="capsTooltip" content="Caps lock is On" manual placement="right">
              <el-form-item prop="password">
                <span class="svg-container">
                  <i class="el-icon-lock" />
                </span>
                <el-input
                  :key="passwordType"
                  ref="password"
                  v-model="userForm.password"
                  clearable
                  :type="passwordType"
                  autocomplete="on"
                  name="password"
                  :placeholder="$t(`login.password`)"
                  tabindex="2"
                  @blur="capsTooltip = false"
                  @keyup.native="checkCapslock"

                />
                <span class="show-pwd" @click="showPwd">
                  <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
                </span>
              </el-form-item>
            </el-tooltip>
            <el-button :loading="loading" style="width: 100%; margin-bottom: 30px" type="primary" @click.native.prevent="handleLogin">
              {{ $t(`login.login`) }}
            </el-button>
          </el-form>
        </div>
      </div>
    </div>
  </template>

  <script>
import ChangeLan from '@/components/changeLan/index.vue'

  export default {
    name: 'Login',
    components: {
      ChangeLan
    },
    props: {
    },
    data() {

      return {
        nowDate: new Date(),
        userForm: {
          username: '',
          password: '',
        },
        loginRules: {
          username: [
            {
              required: true,
              trigger: 'blur'
            }],
          password: [
            {
              required: true,
              trigger: 'blur'
            }]
        },
        passwordType: 'password',
        capsTooltip: false,
        loading: false
      }
    },
    watch: {
    },
    created() {
      // 判断是否有缓存
      this.userForm.username = localStorage.getItem('login_username')
      this.userForm.password = localStorage.getItem('login_password')
    },

    mounted() {
      if (this.userForm.username === '') {
        this.$refs.username.focus()
      } else if (this.userForm.password === '') {
        this.$refs.password.focus()
      }
    },
    destroyed() {},
    methods: {
      checkCapslock(e) {
        const { key } = e
        this.capsTooltip = key && key.length === 1 && key >= 'A' && key <= 'Z'
      },
      showPwd() {
        if (this.passwordType === 'password') {
          this.passwordType = ''
        } else {
          this.passwordType = 'password'
        }
        this.$nextTick(() => {
          this.$refs.password.focus()
        })
      },
      handleLogin() {
        this.$refs.loginForm.validate((valid) => {
          if (valid) {
            this.loading = true
            this.$store.dispatch('user/loginAction', this.userForm).then(() => {
                // 缓存账号密码
                localStorage.setItem('login_username', this.userForm.username)
                localStorage.setItem('login_password', this.userForm.password)

                this.$store.dispatch('role/getRoleAction')
                this.loading = false
                this.$router.push({ path: '/info_screen/home' })
                sessionStorage.setItem('activeMenuName','ifiBord Dashboard')
            }).catch(() => {
                this.loading = false
            })
          } else {
            return false
          }
        })
      }
    }
  }
  </script>

  <style lang="scss">
    /* 修复input 背景不协调 和光标变色 */
    /* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

    $bg: #283443;
    // 登录输入框文字颜色
    $light_gray: #362a2a;
      // 登录输入框光标颜色
    $cursor: #362a2a;

    @supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
      .login-container .el-input input {
        color: $cursor;
      }
    }

    .code_class {
      position: absolute;
      margin-left: -20;
      right: 10px;
      top: 5px;
    }

    .code_class:hover {
      cursor: pointer;
    }

    /* reset element-ui css */
    .login-container {
      .el-input {
        display: inline-block;
        height: 47px;
        width: 85%;

        input {
          background: transparent;
          border: 0px;
          -webkit-appearance: none;
          appearance: none;
          border-radius: 0px;
          padding: 12px 5px 12px 15px;
          color: $light_gray;
          height: 47px;
          caret-color: $cursor;

          &:-webkit-autofill {
            box-shadow: 0 0 0px 1000px $bg inset !important;
            -webkit-text-fill-color: $cursor !important;
          }
        }
      }

      .el-form-item {
        border: 1px solid rgba(255, 255, 255, 0.1);
        background: rgba(0, 0, 0, 0.1);
        border-radius: 5px;
        color: #454545;
      }
    }
  </style>

  <style lang="scss" scoped>
    $bg: #2d3a4b;
    $klyl-bg: #012ea5;
    $dfll-bg: #82d8cf;
    $dark_gray: #889aa4;
    $light_gray: #eee;

    .login-box{
      height: 600px;
      display: flex;
      justify-content: space-between;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%) translateY(-50%);
      background-color: var(--el-bg-color);
      border-radius: 10px;
      overflow: hidden;
      box-shadow: 0px 12px 32px 4px rgba(0, 0, 0, .04), 0px 8px 20px rgba(0, 0, 0, .08);
    }

    // 屏幕大于 0px 并且小于 1156px
    @media screen and (min-width: 0px) and (max-width: 998px){
      .login-banner{
        display: none;
      }
    }

      // 屏幕大于 0px 并且小于 552px
      @media screen and (min-width: 0px) and (max-width: 552px){
      .login-box{
        width: 100%;
      }
      .login-form{
        width: 96% !important;
        padding: 10px !important;
      }
      .login-right-form{
        width: 100% !important;
      }
    }
    .login-banner{
      position: relative;
      width: 450px;
      background-color: #f5f7fa;
      overflow: hidden;
      img{
        width: 100%;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
      }
      .logo{
        position: absolute;
        top: 20px;
        left: 20px;
        width: 50px;
        height: 50px;
        border-radius: 4px;
        background: url('~@/assets/logo.png') no-repeat;
        background-size: contain;
      }
    }

    .login-right-form{
      width: 550px;
    }
      .login-form {
        position: absolute;
        top: 50%;
        -webkit-transform: translateY(-50%);
        transform: translateY(-50%);
        padding: 0px 30px;
        width: 500px;
      }

    /**
   * 必应每日壁纸API， <a href="https://blog.oneneko.com/posts/2020/07/01/bing-api.html">参考地址</a>>
   */
    .login-container {
      min-height: 100%;
      width: 100%;
      background-color: #fafafa;
      background-blend-mode: multiply;
      overflow: hidden;

      .tips {
        font-size: 14px;
        color: #fff;
        margin-bottom: 10px;

        span {
          &:first-of-type {
            margin-right: 16px;
          }
        }
      }

      .svg-container {
        padding: 6px 5px 6px 15px;
        color: $dark_gray;
        vertical-align: middle;
        width: 30px;
        display: inline-block;
      }

      .title-container {
        position: relative;

        .title {
          font-size: 20px;
          color: #302424;
          margin: 0px auto 40px auto;
          text-align: left;
          font-family: inherit;
        }

        .lang {
          position: absolute;
          right: 10px;
          top: -10px;
        }
      }

      .show-pwd {
        position: absolute;
        right: 10px;
        top: 7px;
        font-size: 16px;
        color: $dark_gray;
        cursor: pointer;
        user-select: none;
      }

      .thirdparty-button {
        position: absolute;
        right: 0;
        bottom: 6px;
      }
      .foot_BeiAn{
        text-align: center;
        position: fixed;
        width: 100%;
        bottom: 10px;
        color: #646566;
        font-size: 15px;
        font-family: ui-rounded;
      }

      @media only screen and (max-width: 470px) {
        .thirdparty-button {
          display: none;
        }
      }
    }
  </style>

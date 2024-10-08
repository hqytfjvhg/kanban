<template>
    <div class="login-container">
        <div class="change-lan" style="margin:1rem;position:absolute;top: 0;right:0rem;">
            <ChangeLan></ChangeLan>
        </div>
        <el-form :model="userForm" :rules="rules" ref="userForm" class="login-form" auto-complete="on" label-position="left">
            <div class="title-container">
                <img src="@/assets/logo.png" alt="" />
                <!-- {{ $t(`app.name`) }}  -->
                <h3 class="title">{{ $t(`login.register`) }}</h3>
            </div>

            <el-form-item prop="username">
                <span class="svg-container">
                    <li class="el-icon-user-solid"></li>
                </span>
                <el-input v-model="userForm.username" :placeholder="$t(`login.account`)" type="text" />

            </el-form-item>

            <el-form-item prop="password">
                <span class="svg-container">
                    <li class="el-icon-lock"></li>
                </span>
                <el-input v-model="userForm.password" type="password" :placeholder="$t(`login.password`)" />
            </el-form-item>

            <el-form-item  style="margin-bottom: 10px;" prop="phone">
                <span class="svg-container">
                    <li class="el-icon-mobile-phone"></li>
                </span>
                <el-input v-model="userForm.phone" type="text" :placeholder="$t(`login.phone`)" />
            </el-form-item>

            <el-form-item prop="code">
                <span class="svg-container">
                    <li class="el-icon-close-notification"></li>
                </span>
                <el-input v-model="userForm.code" type="text" :placeholder="$t(`login.code`)"
                    style="display: inline-block;width: 18rem;"/>
                <span style="display:contents;position: relative;">
                    <img style="width: 12rem;height: 80%;position: absolute;bottom:0;right: 0;top:0;margin:auto 0rem"
                        :src="codeUrl" fit="true" />
                </span>
            </el-form-item>

            <div style="margin-bottom: 26px; display: flex; justify-content: flex-end; padding-right: 10px;">
                <el-link @click="getCaptchaImg()" type="primary" size="" style="margin-right: 1rem;" :underline="false">{{
                    $t(`login.regenerate`) }}</el-link>
                <el-link type="warning" :underline="false" @click="login">{{ $t(`login.toLogin`) }}</el-link>
            </div>
            <el-button :loading="loading" type="primary" max-length="18" style="width:100%;margin-bottom:30px;"
                @click="register">{{ $t(`login.register`) }}</el-button>
        </el-form>
    </div>
</template>

<script>
import ChangeLan from '@/components/changeLan/index.vue'
import { register } from '@/api/user';
export default {
    name: 'register-index',
    data() {
        return {
            userForm: {},
            loading: false,
            base_api: process.env.VUE_APP_BASE_API,
            codeUrl: '',
            uuid: '',
            rules: {
                username: [
                    { required: true, message: 'Please enter your username', trigger: 'blur' },
                    
                ],
                password: [
                    { required: true, message: 'Please enter the password', trigger: 'blur' },
                    { min: 8, max: 13, message: 'Please enter 8 to 13 characters, at least one letter and one number.', trigger: 'blur' }
                ],
                phone: [
                    {  required: true, message: 'Please enter your phone number', trigger: 'blur' }
                ],
                code: [
                    { required: true, message: 'Please enter the verification code', trigger: 'blur' }
                ],
            }
        }
    },
    components: {
        ChangeLan
    },
    methods: {

        login() {
            this.$router.push({ path: '/info_screen/login' })
        },

        async register() {

            const { data: res } = await register(this.userForm)
            if (res.code == 201) {
                this.$message({
                    type: 'success',
                    message: this.$t(`login.registerTips1`)
                })
                this.$router.push({ path: '/info_screen/login' })
            } else {
                this.$message({
                    type: 'warning',
                    message: res.msg
                })
            }
        },
        getCaptchaImg() {
            this.uuid = this.getUUID()
            this.codeUrl = this.base_api + '/info_screen/getCaptchaImg' + "?uuid=" + this.uuid
            console.log(this.codeUrl)
        },
        getUUID() {

            var s = [];
            var hexDigits = '0123456789abcdef';
            for (var i = 0; i < 36; i++) {
                s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
            }
            s[14] = '4';
            s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);
            s[8] = s[13] = s[18] = s[23] = '-';

            this.uuidA = s.join('');
            console.log(s.join(''), 's.join("")');
            return this.uuidA;
        }
    },
    mounted() { // 页面进入时加载内容
        this.getCaptchaImg()
    },
    watch: { // 监测变化

    }
}
</script>
<style lang='scss'>
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
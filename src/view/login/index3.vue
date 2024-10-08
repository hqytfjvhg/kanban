<template>
    <div class="login-container">
        <div class="change-lan" style="margin:1rem;position:absolute;top: 0;right:0rem;">
            <ChangeLan></ChangeLan>
        </div>
        <el-form :model="userForm" class="login-form" auto-complete="on" label-position="left"
            style="padding:2rem;z-index: 99;border-radius:8%;background: ;">
            <div class="title-container">
                <img src="@/assets/logo.png" alt="" />
                <h3 class="title">{{ $t(`app.name`) }}</h3>
            </div>

            <el-form-item>
                <span class="svg-container">
                    <li class="el-icon-user-solid"></li>
                </span>
                <el-input v-model="userForm.username" :placeholder="$t(`login.account`)" type="text" />

            </el-form-item>

            <el-form-item prop="password" style="margin-bottom: 10px;">
                <span class="svg-container">
                    <li class="el-icon-lock"></li>
                </span>
                <el-input v-model="userForm.password" type="password" :placeholder="$t(`login.password`)"
                    @keyup.enter.native="login" />
            </el-form-item>

            <div style="margin-bottom: 26px; display: flex; justify-content: flex-end; padding-right: 10px;">
                <el-link style="margin-left: 15vw;margin-right: 1vw;" @click="forgetPassword" type="danger"
                    :underline="false">{{ $t(`login.forget`) }}</el-link>
                <el-link type="warning" :underline="false" @click="register">{{ $t(`login.register`) }}</el-link>
            </div>
            <el-button :loading="loading" type="primary" max-length="18" style="width:100%;margin-bottom:30px;"
                @click.native.prevent="login">{{ $t(`login.login`) }}</el-button>
        </el-form>
    </div>
</template>

<script>
import ChangeLan from '@/components/changeLan/index.vue'
export default {
    name: 'login-index',
    data() {
        return {
            userForm: {
                username: '',
                password: ''
            },
            loading: false
        }
    },
    components: {
        ChangeLan
    },
    created() {
        this.userForm.username = localStorage.getItem('login_username')
        this.userForm.password = localStorage.getItem('login_password')

    },
    methods: {
        forgetPassword() {
            console.log(`to reset password.`)
            this.$router.push({ path: '/info_screen/forget' })
        },
        register() {
            this.$router.push({ path: '/info_screen/register' })
        },
        async login() {
            this.loading = true
            this.$store.dispatch('user/loginAction', this.userForm).then(() => {
                // 缓存账号密码
                localStorage.setItem('login_username', this.userForm.username)
                localStorage.setItem('login_password', this.userForm.password)

                this.$store.dispatch('role/getRoleAction')
                this.loading = false
                this.$router.push({ path: '/info_screen/home' })
            }).catch(() => {
                this.loading = false
            })
        }
    }
}
</script>

<style lang="scss">
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
    justify-content: center;

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
        max-width: 500px;
        margin-bottom: 2rem;
        overflow: hidden;
        width: 100%;

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

<!--  -->
<template>
    <div class="password-container">
        <el-form label-width="180px" :model="passwordForm" :rules="rules">
            <el-form-item :label="$t(`my.originalPassword`)" prop="oldPassword">
                <el-input v-model="passwordForm.oldPassword" type="password" style="width:250px"></el-input>
            </el-form-item>
            <el-form-item :label="$t(`my.newPassword`)" prop="newPassword1">
                <el-input v-model="passwordForm.newPassword1" type="password" style="width:250px"></el-input>
            </el-form-item>
            <el-form-item :label="$t(`my.duplicatePassword`)" prop="newPassword2">
                <el-input v-model="passwordForm.newPassword2" type="password" style="width:250px"></el-input>
            </el-form-item>
        </el-form>
        <div class="button-box">
            <el-button type="primary" @click="confirm" size="mini">{{$t(`my.submit`)}}</el-button>
            <el-button type="normal" @click="confirm" size="mini">{{$t(`my.reset`)}}</el-button>
        </div>
        
        <div class="tip">{{$t(`my.passwordTips`)}}</div>
    </div>
</template>

<script>

import {updatePassword} from '@/api/user'
export default {
    name: 'updatePassword',
    data() {
        // 这里存放数据
        return {
            passwordForm: {
                oldPassword: '',
                newPassword1: '',
                newPassword2: ''
            },
            rules: {
                oldPassword: [
                    { required: true, message: '请输入原密码', trigger: 'blur' }
                ],
                newPassword1: [
                    { required: true, message: '请输入新密码', trigger: 'blur' }
                ],
                newPassword2: [
                    { required: true, message: '请重复输入新密码', trigger: 'blur' }
                ]
            }
        };
    },
    methods: {
        async confirm(){
            const {data:res} = await updatePassword(this.passwordForm)
            this.$message({
                type: res.code == 200 ? 'success' : 'error',
                message: res.msg
            })
            if (res.code == 200) {
                localStorage.removeItem('token')
                this.$store.commit('SET_TOKEN','')
                this.$router.go(0)
            }
        }
    },
}
</script>

<style lang='scss' scoped>
    .password-container {
        padding-top: 4rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 100%;

        .tip {
            font-size: 0.8rem;
            margin: 1.5rem 0 0 2.5rem;
            color: #555;
        }

        .button-box {
            margin-top: 1.5rem;

            .el-button {
                margin-left: 2rem;
            }
        }

        .el-form-item {
            margin-bottom: 1rem;
        }
    }
</style>
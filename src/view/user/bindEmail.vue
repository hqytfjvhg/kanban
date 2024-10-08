<!--  -->
<template>
    <div class="bind-email">
        <el-form label-width="150px" >
            <el-form-item :label="$t(`my.email`)">
                <el-input v-model="email" type="text" style="width:250px"></el-input>
            </el-form-item>
            <el-form-item :label="$t(`my.vertifyCode`)" >
                <el-input v-model="code" type="text" style="width:250px"></el-input>
            </el-form-item>
        </el-form>
        <div class="button-box">
            <el-button type="success" @click="sendEmial" size="mini">{{$t(`my.sendCode`)}}</el-button>
            <el-button type="primary" @click="bind" size="mini">{{$t(`my.bound`)}}</el-button>
        </div>
        <div v-if="success" style="margin:5px;color:red">{{$t(`my.sendTips`)}}</div>
    </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';
import { sendCodeToEmail,bindEmail } from "@/api/user";
export default {
    // import引入的组件需要注入到对象中才能使用
    components: {},
    name: 'bindEmail',
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
            email:'',
            code:'',
            success:false
        };
    },
    // 监听属性 类似于data概念
    computed: {},
    // 监控data中的数据变化
    watch: {},
    // 方法集合
    methods: {
        async sendEmial(){
            const {data:res} = await sendCodeToEmail(this.email)
            if(res.code == 200){
                this.success = true
            } else{
                this.$message({
                    type:'error',
                    message:res.msg
                })
            }
        },
        async bind(){
            if(this.code === ''){
                this.$message({
                    type:'error',
                    message:'验证码不能为空！'
                })
            } else{
                const {data:res} = await bindEmail(this.email,this.code)
            if(res.code == 200){
                this.$message({
                    type:'success',
                    message:this.email + '绑定成功'
                })
                this.email = ''
                this.code = ''
                this.success = false
            }else{
                this.$message({
                    type:'error',
                    message:this.email + '绑定失败'
                })
            }
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
.bind-email {
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
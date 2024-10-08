<!--  -->
<template>
    <div class="UpdateForm">
        <el-form :model="form" label-width="120px">
            <el-form-item :label="$t(`return.product`)">
                <el-input type="text" :placeholder="$t(`return.productPlaceholder`)" v-model="form.product"></el-input>
            </el-form-item>
            <el-form-item :label="$t(`return.area`)">
                <el-select v-model="form.area" :placeholder="$t(`return.areaPlaceholder`)">
                    <el-option v-for="item in areaOptions" :key="item.value" :label="item.value" :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item :label="$t(`return.reason`)">
                <el-input type="textarea" :placeholder="$t(`return.reasonPlaceholder`)" v-model="form.reason"></el-input>
            </el-form-item>
            <el-form-item :label="$t(`return.returnDate`)">
                <el-date-picker v-model="form.returnDate" type="date" :placeholder="$t(`return.returnDatePlaceholder`)" value-format="yyyy-MM-dd">
                </el-date-picker>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submit" size="mini">{{$t(`return.confirm`)}}</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';
import { updateReturn } from '@/api/return';
export default {
    // import引入的组件需要注入到对象中才能使用
    components: {},
    name: 'UpdateForm',
    props: {
        form: {
            type: Object,
            //required: true,
            default: function () {
                return {}
            }
        }
    },
    data() {
        // 这里存放数据
        return {
            updateForm: this.form,
            areaOptions: [
                {
                    value: 'UK',
                    label: 'UK'
                },
                {
                    value: 'China/HK',
                    label: 'China/HK'
                },
                {
                    value: 'US',
                    label: 'US'
                },
                // {
                //     value: 'Poland',
                //     label: 'Poland'
                // }
            ],
        };
    },
    // 监听属性 类似于data概念
    computed: {},
    // 监控data中的数据变化
    watch: {
        form() {
            this.updateForm = this.form
        }
    },
    // 方法集合
    methods: {
        async submit() {
            console.log(this.updateForm)
            const { data: res } = await updateReturn(this.updateForm)
            if (res.code == 200) {
                this.$message({
                    type: 'success',
                    message: 'update successfully!'
                })
                this.updateForm = {}
                this.$emit("fatherMethod")
            }else{
                this.$message({
                    type: 'warning',
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
</style>
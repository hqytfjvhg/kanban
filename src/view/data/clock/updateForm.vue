<!--  -->
<template>
    <div class="UpdateForm">
        <el-form :model="form" label-width="120px">
            <el-form-item :label="$t(`clock.screen`)">
                <span style="font-size: 2rem;">{{ form.screenId == 1 ? 'company' : (form.screenId == 2 ? 'marketing' :
                    'sts') }}</span>
            </el-form-item>
            <el-form-item :label="$t(`clock.area`)">
                <el-input type="text" :placeholder="$t(`clock.areaPlaceholder`)" v-model="form.clockArea"></el-input>
            </el-form-item>
            <el-form-item :label="$t(`clock.timezone`)">
                <el-input type="number" :placeholder="$t(`clock.timezonePlaceholder`)"
                    v-model="form.clockTimezone"></el-input>
            </el-form-item>
            <el-form-item :label="$t(`clock.timeFormat`)">
                <el-select v-model="form.timeFormat" :placeholder="$t(`clock.timeFormatPlaceholder`)">
                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submit" size="mini">{{ $t(`clock.confirm`) }}</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';
import { update } from '@/api/clock';
export default {
    // import引入的组件需要注入到对象中才能使用
    components: {},
    name: 'UpdateForm',
    props: {
        form: {
            type: Object,
            required: true,
            default: function () {
                return {}
            }
        }
    },
    data() {
        // 这里存放数据
        return {
            updateForm: this.form,
            options: [{
                value: 12,
                label: 12
            }, {
                value: 24,
                label: 24
            }
        ],
        };
    },
    // 监听属性 类似于data概念
    computed: {},
    // 监控data中的数据变化
    watch: {
    },
    // 方法集合
    methods: {
        async submit() {
            console.log(this.form)
            const { data: res } = await update(this.form)
            if (res.code == 200) {
                this.$message({
                    type: 'success',
                    message: this.$t(`clock.operationOK`),
                })
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
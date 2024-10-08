<!--  -->
<template>
    <div class="productTestingTable">
        <el-table class="table-content" :data="data" :border="true" style="margin:0 auto" stripe>
            <el-table-column prop="product" :label="$t(`complaint.product`)" align="center"></el-table-column>
            <el-table-column prop="area" :label="$t(`complaint.area`)" align="center"></el-table-column>
            <el-table-column prop="reason" :label="$t(`complaint.reason`)" align="center">
                <template slot-scope="scope">
                    <span v-if="scope.row.reason == null">/</span>
                    <span v-else>{{ scope.row.reason }}</span>
                </template>
            </el-table-column>
            <el-table-column prop="complaintDate" :label="$t(`complaint.complaintDate`)" align="center">
                <template slot-scope="scope">
                    <span v-if="scope.row.complaintDate == null">/</span>
                    <span v-else>{{ scope.row.complaintDate }}</span>
                </template>
            </el-table-column>
            <!-- <el-table-column prop="mp" label="mp" align="center">
                <template slot-scope="scope">
                    <span v-if="scope.row.mp == null">/</span>
                    <span v-else>{{ scope.row.mp }}</span>
                </template>
            </el-table-column>
            <el-table-column prop="launch" label="launch" align="center">
                <template slot-scope="scope">
                    <span v-if="scope.row.launch == null">/</span>
                    <span v-else>{{ scope.row.launch }}</span>
                </template>
            </el-table-column> -->
        </el-table>
        <div style="text-align: center;margin:20px 0">
            <el-button type="primary" @click="confirm"> {{$t(`complaint.confirm`)}} </el-button>
            <el-button type="warning" @click="cancle"> {{$t(`complaint.cancel`)}} </el-button>
        </div>
    </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';
import { batchAdd } from '@/api/complaint';
export default {
    // import引入的组件需要注入到对象中才能使用
    components: {},
    name: 'complaintTable',
    props: {
        data: {
            type: Array,
            required: true,
            default: function () {
                return []
            }
        }
    },
    data() {
        // 这里存放数据
        return {

        };
    },
    // 监听属性 类似于data概念
    computed: {},
    // 监控data中的数据变化
    watch: {},
    // 方法集合
    methods: {
        async confirm() {
            const { data: res } = await batchAdd(this.data)
            if (res.code == 200) {
                this.$message({
                    type: 'success',
                    message: 'complaints batchAdd successfully!'
                })
                this.$emit(`fatherMethod`)
            }else{
                this.$message({
                    type: 'warning',
                    message: res.msg
                })
            }
        },
        cancle() {
            this.$emit(`fatherMethod`)
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
<!--  -->
<template>
    <div class="UnsolvedTicket">
        <div class="new-create">
            <el-button class="create-button" type="success" @click="openDialog(1)" size="mini">新增</el-button>
            <el-upload :action="base_api + '/info_screen/unsolvedTicket/excel/handler'" multiple :limit="1" :on-success="handleSuccess"
                :headers="headers">
                <el-button size="mini" type="primary">批量新增 (excel)</el-button>
            </el-upload>
        </div>
        <el-dialog :title="title" :visible="visible" @close="visible = false">
            <UnsolvedTicketTable :data="excelData"></UnsolvedTicketTable>
        </el-dialog>
    </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';
import store from '@/store'
import UnsolvedTicketTable from './UnsolvedTicketTable.vue';
export default {
    // import引入的组件需要注入到对象中才能使用
    components: {UnsolvedTicketTable},
    name: 'UnsolvedTicket',
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
            base_api: process.env.VUE_APP_BASE_API,
            headers: {
                token: store.getters.token
            },
            excelData: [],
            visible: false,
            title: ''
        };
    },
    // 监听属性 类似于data概念
    computed: {},
    // 监控data中的数据变化
    watch: {},
    // 方法集合
    methods: {
        handleSuccess(res) {
            console.log(res.data)
            if (res.code == 200) {

                this.excelData = res.data
                this.visible = true
                this.title = 'RMA Excel Data'
            }
        },
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
.UnsolvedTicket {
    padding:0 0.6rem  1rem 0.6rem;

    .new-create {
        display: flex;
        padding-bottom: 20px;

        .create-button {
            margin-right: 15px;
        }
    }
}
</style>
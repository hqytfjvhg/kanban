<!--
* @description  参数1
* @fileName  add
* @author Arvin
* @date 2022-11-25 17:10:39
* @version V1.0.0
!-->

<template>
    <div id='add' class="add-container">
        <div class="addForm">
            <el-form :model="form" label-width="90px">
                <el-row>
                    <el-col :span="4">
                        <el-form-item label="title">
                            <el-input v-model="form.title"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="4">
                        <el-form-item label="context">
                            <el-input v-model="form.context"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="4">
                        <el-form-item>
                            <el-button type="primary" @click="submit">ADD</el-button>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </div>
        <div style="text-align:center">
            <el-upload class="upload-demo" action="http://localhost:8081/info_screen/keynew/excel/handler" multiple
                :limit="1" :on-success="handleSuccess" :headers="headers">
                <el-button size="small" type="primary">点击上传excel</el-button>
            </el-upload>
        </div>
        <div class="table" v-if="tableVisable">
            <el-card class="table-card">
                <div slot="header" class="clearfix">
                    <span>excel data</span>
                    <el-button style="float: right; padding: 3px 0" type="primary" @click="submitToBatch">确认批量操作
                    </el-button>
                </div>
                <el-table class="table-content" :data="excelData">
                    <el-table-column prop="title" label="title" width="100" align="center"></el-table-column>
                    <el-table-column prop="context" label="context" width="100" align="center"></el-table-column>
                    <el-table-column prop="gmtCreate" label="create" width="100" align="center"></el-table-column>
                    <el-table-column prop="gmtModified" label="modified" width="100" align="center"></el-table-column>
                </el-table>
            </el-card>
        </div>
    </div>
</template>

<script>
import store from '@/store'
import { insert, batchAdd } from '@/api/keynew'
export default {
    name: 'keynew-add',
    data() {
        return {
            form: {},
            excelData: [],
            tableVisable: false,
            headers: { 'token': store.getters.token }
        }
    },
    created() { // 实例被创建之后执行代码

    },
    computed: { // 计算属性

    },
    components: { // 组件的引用

    },
    methods: { // 方法
        async submit() {
            console.log(this.form)
            const { data: res } = await insert(this.form)
            if (res.code == 200) {
                this.$message(
                    {
                        type: 'success',
                        message: 'insert form successfully!'
                    }
                )
            }else{
                this.$message({
                    type: 'warning',
                    message: res.msg
                })
            }
        },
        handleSuccess(res) {
            console.log(`get excelTable`)
            if (res.code == 200) {
                this.excelData = res.data
                this.tableVisable = true
            }else{
                this.$message({
                    type: 'warning',
                    message: res.msg
                })
            }

        },
        async submitToBatch() {
            console.log(this.excelData)
            console.log(this.excelData)
            const { data: res } = await batchAdd(this.excelData)
            if (res.code == 200) {
                this.$message(
                    {
                        type: 'success',
                        message: 'batch successfully!'
                    }
                )
            }else{
                this.$message({
                    type: 'warning',
                    message: res.msg
                })
            }
        }
    },
    mounted() { // 页面进入时加载内容

    },
    watch: { // 监测变化

    }
}
</script>
<style lang='scss' scoped>
.add-container {
    margin: 30px 0;
}

.table-card {
    margin: 20px 20px;
}
</style>
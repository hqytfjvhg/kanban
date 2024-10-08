<template>
    <div id='add' class="add-container">
        <div class="addForm">
            <el-form :model="form" label-width="90px">
                <el-row>
                    <el-col :span="4">
                        <el-form-item label="product">
                            <el-autocomplete class="inline-input" v-model="form.product"
                                :fetch-suggestions="querySearch" placeholder="请输入内容"></el-autocomplete>
                        </el-form-item>
                    </el-col>
                    <el-col :span="4">
                        <el-form-item label="area">
                            <el-select v-model="form.area" placeholder="请选择">
                                <el-option v-for="item in areaOptions" :key="item.value" :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="4">
                        <el-form-item label="Type">
                            <el-select v-model="statu" placeholder="请选择">
                                <el-option v-for="item in typeOptions" :key="item.value" :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="4">
                        <el-form-item label="Num">
                            <el-input v-model="form.num"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="4">
                        <el-form-item label="handler_date">
                            <el-date-picker v-model="form.gmtHandler" type="date" placeholder="选择日期时间"
                                value-format="yyyy-MM-dd HH:mm:ss">
                            </el-date-picker>
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
            <el-upload class="upload-demo" action="http://localhost:8081/info_screen/ticket/excel/handler" multiple
                :limit="1" :on-success="handleSuccess" :file-list="fileList" :headers="headers">
                <el-button size="small" type="primary">点击上传excel</el-button>
                <!-- <div slot="tip" class="el-upload__tip">上传excel</div> -->
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
                    <el-table-column prop="product" label="product" width="100" align="center"></el-table-column>
                    <el-table-column prop="area" label="area" width="100" align="center"></el-table-column>
                    <el-table-column prop="statu" label="Type" width="200" align="center">
                        <template slot-scope="scope">
                            <span>{{ scope.row.statu == true ? 'Add' : 'Resolve' }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="num" label="num" width="100" align="center"></el-table-column>
                    <el-table-column prop="gmtHandler" label="handler-date" width="180" align="center">
                    </el-table-column>
                </el-table>
            </el-card>
        </div>
    </div>
</template>

<script>
import { addTicket, getProductList, resolveTicket, batchAdd } from '@/api/ticket';
import store from '@/store';
export default {
    name: 'ticket-add',
    data() {
        return {
            base_api:process.env.VUE_APP_BASE_API,
            fileList: [],
            areaOptions: [{
                value: 'Row',
                label: 'Row'
            }, {
                value: 'China',
                label: 'China'
            }],
            typeOptions: [
                {
                    value: true,
                    label: 'Add'
                },
                {
                    value: false,
                    label: 'Resolve'
                }
            ],
            form: {},
            statu: true,
            products: [],
            excelData: [],
            tableVisable: false,
            headers: {
                token: store.getters.token
            }
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
            if (this.statu) {
                console.log(`add`);
                console.log(this.form);
                const { data: res } = await addTicket(this.form)
                if (res.code == 200) {
                    this.$message({
                        type: 'success',
                        message: '成功新增'
                    })
                    this.form = {}
                }
                console.log(res)
            } else {
                const { data: res1 } = await resolveTicket(this.form)
                console.log(res1)
                if (res1.code == 200) {
                    this.$message({
                        type: 'success',
                        message: '成功新增'
                    })
                    this.form = {}
                }

            }
        },
        async getProducts() {
            const { data: res2 } = await getProductList()
            console.log(res2)
            if (res2.code == 200) {
                this.products = res2.data
            }
        },
        querySearch(queryString, cb) {
            console.log(queryString)
            cb(this.products)
        },
        handleSuccess(res) {
            if (res.code == 200) {
                console.log(res.data)
                this.excelData = res.data
                this.tableVisable = true
            }
        },
        async submitToBatch() {
            const { data: res3 } = await batchAdd(this.excelData)
            console.log(res3);
        }
    },
    mounted() { // 页面进入时加载内容
        this.getProducts()
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
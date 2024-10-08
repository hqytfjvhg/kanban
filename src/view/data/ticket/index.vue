<template>
    <div id='ticket' class="ticket-container">
        <el-form :inline="true" :model="form" size="mini" class="form-box" style="display: flex; width: 100%;">
            <el-form-item>
                <el-input v-model="page.queryCondition.product" clearable placeholder="请输入product"
                    style="width: 130px;"></el-input>
            </el-form-item>
            <el-form-item label="area:">
                <el-checkbox-group v-model="areaCheckeds" @change="handleCheckedColumnChangeSales">
                    <el-checkbox v-for="item in areaOptions" :label="item.label" :key="item.label"
                        :style="item.label == 'Row' ? 'margin-right: 10px;' : ''">
                        {{ item.label }}
                    </el-checkbox>
                </el-checkbox-group>
            </el-form-item>
            <el-form-item label="state:">
                <el-checkbox-group v-model="stateCheckeds" @change="handleCheckedColumnChangeSales">
                    <el-checkbox v-for="item in typeOptions" :label="item.label" :key="item.label"
                        :style="item.label == 'Add' ? 'margin-right: 10px;' : ''">
                        {{ item.label }}
                    </el-checkbox>
                </el-checkbox-group>
            </el-form-item>
            <el-form-item>
                <el-date-picker v-model="page.queryCondition.startTime" type="datetime" placeholder="选择startTime"
                    style="width:140px" value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
            </el-form-item>
            <el-form-item>
                <el-date-picker v-model="page.queryCondition.endTime" type="datetime" placeholder="选择endTime"
                    style="width:140px" value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
            </el-form-item>
            <el-form-item style="margin-right: 10px">
                <el-button icon="el-icon-search" type="primary" @click="submitToQuery">查询</el-button>
            </el-form-item>
        </el-form>

        <div class="new-create">
            <el-button class="create-button" type="success" @click="openDialog(1)" size="mini">新增</el-button>
            <el-upload :action="base_api + '/info_screen/ticket/excel/handler'" multiple :limit="1"
                :on-success="handleSuccess" :file-list="fileList" :headers="headers">
                <el-button size="mini" type="primary">批量新增Ticket (excel)</el-button>
            </el-upload>
        </div>

        <el-table :data="records" stripe border>
            <el-table-column align="center" label="ID" type="index" width="60"></el-table-column>
            <el-table-column prop="product" label="product" align="center"></el-table-column>
            <el-table-column prop="area" label="Area" align="center"></el-table-column>
            <el-table-column prop="num" label="Num" align="center"></el-table-column>
            <el-table-column prop="state" label="type" align="center">
                <template slot-scope="scope">
                    <span>{{ scope.row.state == true ? 'Add' : 'Resolve' }}</span>
                </template>
            </el-table-column>
            <el-table-column prop="gmtHandler" label="handler_date" align="center"></el-table-column>
            <el-table-column label="operation" align="center" width="240">
                <template slot-scope="scope">
                    <el-button type="primary" @click="openDialog(scope)" round size="mini">update</el-button>
                    <el-button type="danger" @click="delectById(scope.row.ticketId)" round size="mini">delete</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination background layout="total, sizes, prev, pager, next, jumper" :current-page.sync="page.pageNum"
            @size-change="handleSizeChange" style="float:right;margin-bottom: 20px;" :total="page.total"
            :page-size="page.pageSize" @current-change="handleCurrentChange">
        </el-pagination>

        <div class="table" v-if="tableVisable">
            <el-card class="table-card" style="background:#fff;">
                <div slot="header" class="clearfix">
                    <span style="font-size:20px">Excel表数据</span>
                    <el-button style="float: right; padding: 3px 0" type="primary" @click="submitToBatch">确认批量操作
                    </el-button>
                </div>
                <el-table class="table-content" :data="excelData" :border="true" style="width:100%;padding:0 20px">
                    <el-table-column type="index" width="100" align="center"></el-table-column>
                    <el-table-column prop="product" label="产品" width="300" align="center"></el-table-column>
                    <el-table-column prop="area" label="地区" width="300" align="center"></el-table-column>
                    <el-table-column prop="statu" label="类型" width="200" align="center">
                        <template slot-scope="scope">
                            <span>{{ scope.row.statu == true ? '新增' : '解决' }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="num" label="票数" width="200" align="center"></el-table-column>
                    <el-table-column prop="gmtHandler" label="处理时间" align="center">
                    </el-table-column>
                </el-table>
            </el-card>
        </div>

        <el-dialog :title="dialog.title" :visible.sync="dialog.visible" width="35%">
            <el-form :model="form" label-width="120px">
                <el-form-item label="product:">
                    <el-autocomplete class="inline-input" v-model="form.product" placeholder="请输入内容"
                        :fetch-suggestions="querySearch"></el-autocomplete>
                </el-form-item>
                <el-form-item label="area:">
                    <el-select v-model="form.area" placeholder="请选择" @change="$forceUpdate()">
                        <el-option v-for="item in areaOptions" :key="item.label" :label="item.label" :value="item.label">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="Type:">
                    <el-select v-model="form.type" placeholder="请选择" @change="$forceUpdate()">
                        <el-option v-for="item1 in typeOptions" :key="item1.label" :label="item1.label"
                            :value="item1.label"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="Num:">
                    <el-input v-model="form.num"></el-input>
                </el-form-item>
                <el-form-item label="handler_date:">
                    <el-date-picker v-model="form.gmtHandler" type="datetime" placeholder="选择日期时间"
                        value-format="yyyy-MM-dd HH:mm:ss">
                    </el-date-picker>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submit" size="mini">confirm</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
var that
import { addTicket, getProductList, resolveTicket, batchAdd, selectAllPaged, delectById } from '@/api/ticket';
import store from '@/store';
export default {
    name: 'data-ticket',
    data() {
        return {
            areaCheckeds: [],
            stateCheckeds: [],
            base_api: process.env.VUE_APP_BASE_API,
            records: [],
            conditionsFields: [], // 记录参与筛选的列信息
            fileList: [],
            areaOptions: [{
                label: 'Row'
            }, {
                label: 'China'
            }],
            typeOptions: [{
                label: 'Add'
            }, {
                label: 'Resolve'
            }],
            form: {},
            statu: true,
            products: [],
            excelData: [],
            tableVisable: false,
            headers: {
                token: store.getters.token
            },
            dialog: {
                title: '新增',
                visible: false,
                type: 1
            },
            page: {
                pageSize: 10,
                pageNum: 1,
                total: 1000,
                queryCondition: {
                    product: "",
                    area: "",
                    state: "",
                    startTime: "",
                    endTime: ""
                }
            }
        }
    },
    methods: {

        handleCheckedColumnChangeSales() { },

        openDialog(type) {
            this.dialog.type = type
            if (type == 1) {
                this.form = {}
                this.dialog.visible = true
                this.dialog.title = 'Add Ticket'
            } else {
                this.dialog.visible = true
                this.dialog.title = 'Resolve Ticket'
                this.form = type.row
                this.form.type = type.row.state ? 'Add' : 'Resolve'
            }
        },

        // 搜索
        submitToQuery() {
            that = this
            that.page.queryCondition.area = that.areaCheckeds.length == 1 ? that.areaCheckeds[0] : ""
            that.page.queryCondition.state = that.stateCheckeds.length == 1 ? that.stateCheckeds[0] == 'Add' ? 1 : 0 : ""
            that.page.pageNum = 1
            that.getRecords()
        },

        // 获取列表
        async getRecords() {
            const { data: res } = await selectAllPaged(this.page)
            if (res.code == 200) {
                this.records = res.data.data
                this.page.total = res.data.total
            }
        },

        toPath(path) {
            this.$router.push({ path: path })
        },

        async submit() {
            console.log("form-data", this.form)
            if (this.dialog.type == 1) {
                const { data: res } = await addTicket(this.form)
                console.log(res)
                if (res.code == 200) {
                    this.$message({
                        type: 'success',
                        message: '成功新增'
                    })
                    this.form = {}
                    this.dialog.visible = false
                    setTimeout(() => {
                        this.getRecords()
                    }, 100);
                } else {
                    this.$message({
                        type: 'error',
                        message: res.msg
                    })
                }
            } else {
                const { data: res1 } = await resolveTicket(this.form)
                if (res1.code == 200) {
                    this.$message({
                        type: 'success',
                        message: '成功处理'
                    })
                    this.form = {}
                    this.dialog.visible = false
                    setTimeout(() => {
                        this.getRecords()
                    }, 100);
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
        querySearch(searchString, cb) {
            console.log(searchString)
            cb(this.products)
        },
        handleSuccess(res) {
            if (res.code == 200) {
                this.excelData = res.data
                this.tableVisable = true
            }
        },

        async submitToBatch() {
            const { data: res3 } = await batchAdd(this.excelData)
            console.log(res3);
        },

        handleCurrentChange(val) {
            this.page.pageNum = val
            this.getRecords()
        },

        handleSizeChange(val) {
            this.page.pageSize = val
            this.getRecords()
        },

        async delectById(ticketId) {
            this.$confirm('确认删除这条记录吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async () => {
                const { data: res } = await delectById(ticketId)
                if (res.code == 200) {
                    this.$message({
                        type: 'success',
                        message: 'Delete ticket successfully!'
                    })
                    this.getRecords()
                } else {
                    this.$message({
                        type: 'warning',
                        message: 'Delete ticket fail!'
                    })
                }
            }).catch(() => { })
        }
    },
    mounted() { // 页面进入时加载内容
        this.getRecords()
        this.getProducts()
    }
}
</script>
<style lang='scss' scoped>
.new-create {
    display: flex;
    padding-bottom: 20px;

    .create-button {
        margin-right: 15px;
    }
}

.el-pagination {
    padding: 20px 0;
}

.el-checkbox {
    margin: 0;
    color: #888 !important;
}

.ticket-container {
    padding:0 0.6rem  1rem 0.6rem;
}

.el-form {

    .el-form-item {
        margin: 0 20px 8px 0;

        .item-label {
            margin-right: 10px;
            font-size: 1rem;
        }
    }
}

.el-form-item__content {
    display: flex !important;
}</style>
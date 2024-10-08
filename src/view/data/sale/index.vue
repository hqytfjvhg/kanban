<!--
* @description  参数1
* @fileName  sale
* @author Arvin
* @date 2022-11-18 09:23:53
* @version V1.0.0
!-->

<template>
  <div id='sale' class="sale-container" style="padding-bottom:50px">

    <div class="new-create">
      <el-button class="create-button" type="success" @click="openDialog(1)" size="mini">新增</el-button>
      <el-upload :action="base_api + '/info_screen/sale/excel/handler'" multiple :limit="1" :on-success="handleSuccess"
        :headers="headers">
        <el-button size="mini" type="primary">批量新增 (excel)</el-button>
      </el-upload>
    </div>

    <div class="table">
      <el-table class="table-content" :data="sales" style="width:100%;" :border="true" stripe>
        <el-table-column prop="saleId" label="ID" width="100" align="center"></el-table-column>
        <el-table-column prop="product" label="product" width="200" align="center">
          <template slot="header" slot-scope="scope">
            <FilterHeader :column="scope.column" field-name="product" filter-type="text" @tableFilter="tableFilter"
              @resetFilter="tableFilterReset" />
          </template>
          <template slot-scope="scope">
            <el-input v-if="scope.row.saleId == currentUpdateId" v-model="updateForm.product"></el-input>
            <span v-else>{{ scope.row.product }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="saleIfi" label="saleIfi" width="200" align="center">
          <template slot-scope="scope">
            <el-input v-if="scope.row.saleId == currentUpdateId" v-model="updateForm.saleIfi"></el-input>
            <span v-else>{{ scope.row.saleIfi }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="saleDistrib" label="saleDistrib" width="300" align="center">
          <template slot-scope="scope">
            <el-input v-if="scope.row.saleId == currentUpdateId" v-model="updateForm.saleDistrib"></el-input>
            <span v-else>{{ scope.row.saleDistrib }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="total" label="total" width="300" align="center">
          <template slot-scope="scope">
            <el-input v-if="scope.row.saleId == currentUpdateId" v-model="updateForm.total"></el-input>
            <span v-else>{{ scope.row.total }}</span>
          </template>
        </el-table-column>
        <el-table-column label="operation" align="center">
          <template slot-scope="scope">

            <div v-if="scope.row.saleId == currentUpdateId" style="display:flex;justify-content: space-around;">
              <div>
                <el-button type="success" @click="confirmUpdate" round size="mini">confirm</el-button>
              </div>
              <div>
                <el-button type="warning" @click="cancelUpdate" round size="mini">cancel</el-button>
              </div>
            </div>

            <div v-else style="display:flex;justify-content: space-around;">
              <div>
                <el-button type="primary" @click="update(scope.row)" round size="mini">update</el-button>
              </div>
              <div>
                <el-button type="danger" @click="deleteSale(scope.row.saleId)" round size="mini">delete</el-button>
              </div>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <div class="block" style="margin: 20px auto;">
        <el-pagination background layout="total, sizes, prev, pager, next, jumper" :current-page.sync="page.pageNum"
          @size-change="handleSizeChange" :total="page.total" :page-size="page.pageSize"
          style="float:right;margin-bottom: 20px;" @current-change="handleCurrentChange">
        </el-pagination>
      </div>
    </div>
  
    <div class="table" v-if="tableVisable">
      <el-card class="table-card">
        <div slot="header" class="clearfix">
          <span>excel data</span>
          <el-button style="float: right; padding: 3px 0" type="primary" @click="submitToBatch">确认批量操作</el-button>
        </div>
        <el-table class="table-content" :data="excelData" border="true" style="width:60%;margin:0 auto">
          <el-table-column prop="product" label="product" width="200" align="center"></el-table-column>
          <el-table-column prop="saleIfi" label="ifi" width="200" align="center"></el-table-column>
          <el-table-column prop="saleDistrib" label="distrib" width="200" align="center">
          </el-table-column>
          <el-table-column prop="total" label="total" align="center"></el-table-column>
        </el-table>
      </el-card>
    </div>

    <el-dialog :title="dialog.title" :visible.sync="dialog.visible" width="35%">
      <el-form :model="form" label-width="120px">
        <el-form-item label="product:">
          <el-input v-model="form.product" placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item label="saleIfi:">
          <el-input v-model="form.saleIfi" placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item label="saleDistrib:">
          <el-input v-model="form.saleDistrib" placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item label="total:">
          <el-input v-model="form.total" placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submit" size="mini">confirm</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { getProducts, batchAdd, selectAllPaged, insertSale, deleteById, updateSale } from '@/api/sale';
import store from '@/store';
import FilterHeader from '@/components/FilterHeader'
// import pageHeader from '@/components/pageHeader/index.vue'
export default {
  name: 'data-sale',
  data() {
    return {
      base_api: process.env.VUE_APP_BASE_API,
      sales: [],
      conditionsFields: [], // 记录参与筛选的列信息
      updateForm: {
      },
      currentUpdateId: 0,
      form: {},
      tableVisable: false,
      excelData: [],
      products: [],
      headers: {
        token: store.getters.token
      },
      page: {
        pageSize: 10,
        pageNum: 1,
        total: 1000,
        queryCondition: {
          product: ''
        }
      },
        dialog:{
          title:'新增',
          visible:false
        }
    }
  },
  created() { // 实例被创建之后执行代码
    this.getSales()
  },
  computed: { // 计算属性

  },
  components: { // 组件的引用
    FilterHeader,
    //pageHeader
  },
  methods: { // 方法
    async getSales() {
      const { data: res } = await selectAllPaged(this.page)
      if (res.code == 200) {
        this.sales = res.data.data
        this.page.total = res.data.total
      }
    },
    openDialog(type) {
      if (type == 1) {
          this.form = {}
          this.dialog.title = 'Add Sale'
      } else {
          this.dialog.title = 'Update Sale'
          this.form = {}
      }
      this.dialog.visible = !this.visible
    },
    async deleteSale(saleId) {
      console.log(saleId)
      const { data: res } = await deleteById(saleId)
      if (res.code == 200) {
        this.$message({
          type: 'success',
          message: 'delete successfully!'
        })
        this.getSales()
      } else {
        this.$message({
          type: 'warning',
          message: 'delete fail!'
        })
      }
    },
    update(row) {
      this.updateForm = row
      this.currentUpdateId = row.saleId
    },
    async confirmUpdate() {
      console.log(this.updateForm)
      const { data: res } = await updateSale(this.updateForm)
      if (res.code == 200) {
        this.$message({
          type: 'success',
          message: 'update successfully!'
        })
        this.updateForm = {}
        this.currentUpdateId = 0
        this.getSales()
      } else {
        this.$message({
          type: 'warning',
          message: 'update fail!'
        })
      }
    },
    cancelUpdate() {
      this.getSales()
      this.updateForm = {}
      this.currentUpdateId = 0
    },
    async submit() {
      console.log(this.form)
      const { data: res } = await insertSale(this.form)
      if (res.code == 200) {
        this.dialog.visible = !this.dialog.visible
        this.$message({
          type: 'success',
          message: 'insert successfully!'
        })
        this.form = {}
        this.getSales()
      } else {
        this.$message({
          type: 'warning',
          message: 'insert fail!'
        })
      }
    },
    async submitToBatch() {
      console.log(this.excelData)
      const { data: res } = batchAdd(this.excelData)
      console.log(res)
    },
    handleSuccess(res) {
      console.log(res)
      if (res.code == 200) {
        this.excelData = res.data
        this.tableVisable = true
      }
    },
    querySearch(searchString, cb) {
      console.log(searchString)
      cb(this.products)
    },
    async getProducts() {
      const { data: res } = await getProducts()
      if (res.code == 200) {
        this.products = res.data
      }
    },
    handleCurrentChange(val) {
      this.page.pageNum = val
      this.getSales()
    },
    tableFilter(data, reset) {
      let flag = true // 判断条件里有没有该列，用来判断是新增还是更新
      if (!reset) {
        // 参与筛选的列信息，有则更新
        this.conditionsFields.forEach(item => {
          if (item.fieldName === data.fieldName) {
            item.conditions = data.conditions
            flag = false
          }
        })
        // 没有则添加
        if (flag) {
          this.conditionsFields.push(data)
        }
      }
      // 遍历所有筛选条件进行过滤
      this.conditionsFields.filter((fields, index) => {
        console.log(index)
        if (fields.filterType === 'text' && fields.conditions.text !== '') {
          this.page.queryCondition[fields.fieldName] = fields.conditions.text
        } else if (fields.filterType === 'radio' && fields.conditions.radio !== '') {
          this.page.queryCondition[fields.fieldName] = fields.conditions.radio
        } else if (fields.filterType === 'date' && (fields.conditions.date1 || fields.conditions.date2)) {
          this.page.queryCondition.startTime = fields.conditions.date1
          this.page.queryCondition.endTime = fields.conditions.date2
        }
      })
      this.getSales()
    },
    tableFilterReset(data) {
      // 清空当前列筛选条件
      this.conditionsFields.forEach((item, index) => {
        if (item.fieldName === data.fieldName) {
          if (item.fieldName == "handlerDate") {
            this.page.queryCondition.startTime = ''
            this.page.queryCondition.endTime = ''
          }
          this.page.queryCondition[item.fieldName] = null
          this.conditionsFields.splice(index, 1)
        }
      })
      if (this.conditionsFields.length === 0) {
        // 没有筛选条件了直接请求列表
        this.getSales()
      } else {
        // 有筛选条件就再去筛选
        this.tableFilter(data, true)
      }
    }
  },
  mounted() { // 页面进入时加载内容

  },
  watch: { // 监测变化
    'updateForm.saleIfi'() {
      this.updateForm.total = Number(this.updateForm.saleIfi) + Number(this.updateForm.saleDistrib)
    },
    'updateForm.saleDistrib'() {
      this.updateForm.total = Number(this.updateForm.saleIfi) + Number(this.updateForm.saleDistrib)
    }
  }
}
</script>
<style lang='scss' scoped>
.sale-container {
  padding:0 0.6rem  1rem 0.6rem;

  .new-create {
    display: flex;
    padding-bottom: 20px;

    .create-button {
      margin-right: 15px;
    }
  }


  // 上传文件列表样式
  el-upload-list {
    display: inline-block;
  }

  .el-upload-list__item:first-child {
    margin-top: 0px;
  }

  .el-upload-list__item-name {
    display: inline;
  }

}

.table-card {
  margin: 20px 20px;
}

.el-card ::v-deep .el-card__header {
  border: none;
}</style>
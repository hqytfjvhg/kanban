<!--
* @description  参数1
* @fileName  add
* @author Arvin
* @date 2022-11-22 17:49:06
* @version V1.0.0
!-->

<template>
  <div id='add' class="add-container">
    <div class="addForm">
      <el-form :model="form" label-width="90px">
        <el-row>
          <el-col :span="4">
            <el-form-item label="product">
              <el-autocomplete class="inline-input" v-model="form.product" :fetch-suggestions="querySearch"
                placeholder="请输入内容"></el-autocomplete>
            </el-form-item>
          </el-col>
          <el-col :span="4">

            <el-form-item label="ifi">
              <el-input v-model="form.saleIfi"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="distrib">
              <el-input v-model="form.saleDistrib"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="total">
              <el-input v-model="form.total"></el-input>
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
      <el-upload class="upload-demo" action="http://localhost:8081/info_screen/sale/excel/handler" multiple :limit="1"
        :on-success="handleSuccess" :headers="headers">
        <el-button size="small" type="primary">点击上传excel</el-button>
      </el-upload>
    </div>
    <div class="table" v-if="tableVisable">
      <el-card class="table-card">
        <div slot="header" class="clearfix">
          <span>excel data</span>
          <el-button style="float: right; padding: 3px 0" type="primary" @click="submitToBatch" >确认批量操作</el-button>
        </div>
        <el-table class="table-content" :data="excelData">
          <el-table-column prop="product" label="product" width="100" align="center"></el-table-column>
          <el-table-column prop="saleIfi" label="ifi" width="100" align="center"></el-table-column>
          <el-table-column prop="saleDistrib" label="distrib" width="200" align="center">
          </el-table-column>
          <el-table-column prop="total" label="total" width="100" align="center"></el-table-column>
        </el-table>
      </el-card>
    </div>
  </div>
</template>

<script>
import store from '@/store'
import { getProducts,batchAdd } from '@/api/sale'
export default {
  name: 'sale-add',
  data() {
    return {
      base_api:process.env.VUE_APP_BASE_API,
      form: {},
      tableVisable: false,
      excelData:[],
      products:[],
      headers:{
        token:store.getters.token
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
    submit() {
      console.log(this.form)
    },
   async submitToBatch(){
      console.log(this.excelData)
     const {data:res} = batchAdd(this.excelData)
     console.log(res)
    },
    handleSuccess(res){
      console.log(res)
      if(res.code == 200){
        this.excelData = res.data
        this.tableVisable = true
      }
    },
    querySearch(searchString,cb){
      console.log(searchString)
      cb(this.products)
    },
   async getProducts(){
        const {data:res} = await getProducts()
        if(res.code == 200){
          this.products = res.data
        }
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
<!--
* @description  参数1
* @fileName  add
* @author Arvin
* @date 2022-11-22 17:48:31
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
            <el-form-item label="quantity">
              <el-input v-model="form.quantity"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="untiPrice">
              <el-input v-model="form.untiPrice"></el-input>
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
      <el-upload class="upload-demo" action="http://localhost:8081/info_screen/overstock/excel/handler" multiple
        :limit="1" :on-success="handleSuccess" :headers="headers" >
        <el-button size="small" type="primary">点击上传excel</el-button>
        <!-- <div slot="tip" class="el-upload__tip">上传excel</div> -->
      </el-upload>
    </div>
    <div class="table" v-if="tableVisable">
      <el-card class="table-card">
        <div slot="header" class="clearfix">
          <span>excel data</span>
          <el-button style="float: right; padding: 3px 0" type="primary" @click="submitToBatch">确认批量操作</el-button>
        </div>
        <el-table class="table-content" :data="excelData">
          <el-table-column prop="product" label="product" width="100" align="center"></el-table-column>
          <el-table-column prop="quantity" label="quantity" width="100" align="center"></el-table-column>
          <el-table-column prop="unitPrice" label="unitPrice" width="100" align="center"></el-table-column>
        </el-table>
      </el-card>
    </div>
  </div>
</template>

<script>
import { getProducts,batchAdd } from '@/api/overstock'
import store from '@/store'
export default {
  name: 'overstock-add',
  data() {
    return {
      form: {},
      excelData: [],
      products: [],
      tableVisable: false,
      headers:{
        token:store.getters.token
      },
      base_api:process.env.VUE_APP_BASE_API
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
    async submitToBatch() {
      console.log(this.excelData)
      const {data:res} = await batchAdd(this.excelData)
      if(res.code==200){
        console.log(res.data)
      }
    },
    handleSuccess(res) {
      if (res.code == 200) {
        this.tableVisable = true
        this.excelData = res.data
      }
    },
   async getProducts() {
      console.log(`get products`)
      const {data:res} = await getProducts()
      if(res.code == 200){
        this.products = res.data
      }
    },
    querySearch(searchString, cb) {
      console.log(searchString)
      cb(this.products)
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
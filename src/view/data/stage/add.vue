<!--
* @description  参数1
* @fileName  add
* @author Arvin
* @date 2022-11-23 11:23:14
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
          <el-col :span="5">
            <el-form-item label="bates">
              <el-date-picker v-model="form.bates" type="date" placeholder="please select the datetime" value-format="yyyy-MM-dd HH:mm:ss">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="pp">
              <el-date-picker v-model="form.pp" type="date" placeholder="please select the datetime" value-format="yyyy-MM-dd HH:mm:ss">
              </el-date-picker>
            </el-form-item>
          </el-col>

          <el-col :span="5">
            <el-form-item label="mp">
              <el-date-picker v-model="form.mp" type="date" placeholder="选择日期时间" value-format="yyyy-MM-dd HH:mm:ss">
              </el-date-picker>
            </el-form-item>
          </el-col>

          <el-col :span="5">
            <el-form-item label="despatch">
              <el-date-picker v-model="form.despatch" type="date" placeholder="选择日期时间"
                value-format="yyyy-MM-dd HH:mm:ss">
              </el-date-picker>
            </el-form-item>
          </el-col>

          <el-col :span="5">
            <el-form-item label="pr">
              <el-date-picker v-model="form.pr" type="date" placeholder="选择日期时间" value-format="yyyy-MM-dd HH:mm:ss">
              </el-date-picker>
            </el-form-item>
          </el-col>

          <el-col :span="5">
            <el-form-item label="launch">
              <el-date-picker v-model="form.launch" type="date" placeholder="选择日期时间" value-format="yyyy-MM-dd HH:mm:ss">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item>
              <el-button type="primary" @click="submit">ADD</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div style="text-align:center">
      <el-upload class="upload-demo" action="http://localhost:8081/info_screen/stage/excel/handler" multiple :limit="1"
        :on-success="handleSuccess" :headers="headers">
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
          <el-table-column prop="bates" label="bates" width="180" align="center"></el-table-column>
          <el-table-column prop="pp" label="pp" width="180" align="center">
          </el-table-column>
          <el-table-column prop="mp" label="mp" width="180" align="center"></el-table-column>
          <el-table-column prop="despatch" label="despatch" width="180" align="center"></el-table-column>
          <el-table-column prop="pr" label="pr" width="180" align="center"></el-table-column>
          <el-table-column prop="launch" label="launch" width="180" align="center"></el-table-column>
        </el-table>
      </el-card>
    </div>
  </div>
</template>

<script>
import store from '@/store'
import { getProducts,batchAdd } from '@/api/stage'
export default {
  name: 'stage-add',
  data() {
    return {
      base_api:process.env.VUE_APP_BASE_API,
      form: {},
      products: [],
      excelData:[],
      tableVisable:false,
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
  async getProducts() {

      const {data:res} = await getProducts()
      if (res.code == 200) {
         this.products = res.data
      }
    },
    querySearch(searchString, cb) {
      console.log(searchString)
      cb(this.products)
    },
    handleSuccess(res){
      if (res.code == 200) {
         this.excelData = res.data
         this.tableVisable = true
      }
    },
   async submitToBatch(){
     const {data:res} = await batchAdd(this.excelData)
     if (res.code == 200) {
       this.$message({
        type:'success',
        message:'batch success'
       })
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
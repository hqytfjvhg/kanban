<!--
* @description  参数1
* @fileName  add
* @author Arvin
* @date 2022-11-23 11:24:14
* @version V1.0.0
!-->

<template>
  <div id='add' class="add-container">
    <div class="addForm">
      <el-form :model="addForm" label-width="90px">
        <el-row>
          <el-col :span="4">
            <el-form-item label="titel">
              <el-input v-model="addForm.title"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="current">
              <el-input v-model="addForm.current"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="month1">
              <el-input v-model="addForm.month1"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="month2">
              <el-input v-model="addForm.month2"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="month3">
              <el-input v-model="addForm.month4"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="month4">
              <el-input v-model="addForm.month4"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="month5">
              <el-input v-model="addForm.month5"></el-input>
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
      <el-upload class="upload-demo" action="http://localhost:8081/info_screen/project/excel/handler" multiple :limit="1"
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
          <el-table-column prop="title" label="title" width="180" align="center"></el-table-column>
          <el-table-column prop="current" label="current" width="180" align="center"></el-table-column>
          <el-table-column prop="month1" label="month1" width="180" align="center"></el-table-column>
          <el-table-column prop="month2" label="month2" width="180" align="center"></el-table-column>
          <el-table-column prop="month3" label="month3" width="180" align="center"></el-table-column>
          <el-table-column prop="month4" label="month4" width="180" align="center"></el-table-column>
          <el-table-column prop="month5" label="month5" width="180" align="center"></el-table-column>
        </el-table>
      </el-card>
    </div>
  </div>
</template>

<script>
import { batchAdd } from '@/api/project'
import store from '@/store'
export default {
  name: 'project-add',
  data() {
    return {
      addForm: {},
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
      console.log(this.addForm)
    },
    handleSuccess(res){
      if (res.code == 200) {
         this.excelData = res.data
         this.tableVisable = true
      }   
    },
   async submitToBatch(){
      console.log(this.excelData)
     const {data:res} = await batchAdd(this.excelData)
     if(res.code==200){
        this.$message({
          type:'success',
          message:'batch successfully!'
        })
     }
    },

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
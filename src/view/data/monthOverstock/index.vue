<!--  -->
<template>
  <div class="monthOverstock">
    <pageHeader
      :title="$t(`monthOverstock.pageTitle`)"
      :describe="$t(`monthOverstock.pageDesc`)"
    ></pageHeader>
    <div style="margin-left: 1rem">
      <el-form :inline="true" :model="form" size="mini" class="form-box">
        <el-form-item :label="$t(`monthOverstock.name`)" :span="1">
          <el-input
            v-model="page.queryCondition.name"
            clearable
            :placeholder="$t(`return.productPlaceholder`)"
            style="width: 220px"
          ></el-input>
        </el-form-item>
        <!-- <el-form-item :placeholder="$t(`return.areaPlaceholder`)" :span="1">
                    <el-checkbox-group v-model="checkList" @change="checkChange" :min="0" :max="1">
                        <el-checkbox label="Row"></el-checkbox>
                        <el-checkbox label="China"></el-checkbox>
                    </el-checkbox-group>
                </el-form-item> -->
        <el-form-item :label="$t(`return.startTime`)" :span="1">
          <el-date-picker
            v-model="page.queryCondition.startTime"
            type="datetime"
            :placeholder="$t(`return.startTimePlaceholder`)"
            style="width: 250px"
            value-format="yyyy-MM-dd HH:mm:ss"
          ></el-date-picker>
        </el-form-item>
        <el-form-item :label="$t(`return.endTime`)" :span="1">
          <el-date-picker
            v-model="page.queryCondition.endTime"
            type="datetime"
            :placeholder="$t(`return.endTimePlaceholder`)"
            style="width: 250px"
            value-format="yyyy-MM-dd HH:mm:ss"
          ></el-date-picker>
        </el-form-item>
        <el-form-item :span="1">
          <el-button
            icon="el-icon-search"
            type="primary"
            @click="submitToQuery"
            >{{ $t(`return.query`) }}</el-button
          >
        </el-form-item>
      </el-form>
    </div>
    <div class="new-create" style="margin-left: 1rem">
      <el-button
        class="create-button"
        type="primary"
        @click="openDialog(1)"
        size="mini"
        ><i class="el-icon-plus"></i>{{ $t(`monthOverstock.add`) }}</el-button
      >
      <el-upload
        :action="base_api + '/info_screen/monthOverstock/excel/handler'"
        multiple
        :limit="1"
        :on-success="handleSuccess"
        :headers="headers"
        ref="uploadRef"
        :before-upload="beforeUpload"
        :show-file-list="false"
      >
        <el-button size="mini" type="primary"
          ><i class="el-icon-upload2"></i
          >{{ $t(`monthOverstock.batchAdd`) }}</el-button
        >
      </el-upload>
      <el-button
        class="create-button"
        type="success"
        @click="changeMonthOverstockType"
        size="mini"
        style="margin-left: 15px"
      >
        <span v-if="monthOverstockType == 1">{{
          $t(`monthOverstock.btnTitle1`)
        }}</span>
        <span v-if="monthOverstockType == 2">{{
          $t(`monthOverstock.btnTitle2`)
        }}</span>
      </el-button>
      <el-button
        type="warning"
        size="mini"
        style="margin-left: 0"
        @click="visible1 = true"
      >
        <!-- view -->
        <i class="el-icon-view"></i> {{ $t(`int.view`) }}
      </el-button>
      <!-- <a
        :href="base_api + '/' + 'template/Monthly_Overstock.xlsx'"
        style="margin: 0.3rem 0.5rem"
        >{{ $t(`excelTemplate.downloadTemplate`) }}</a
      > -->
      <el-button type="primary" size="mini" style="margin-left: 15px">
        <i class="el-icon-download"></i>
        <a
          :href="base_api + '/' + 'template/Monthly_Overstock.xlsx'"
          style="margin: 0.3rem 0.5rem 0.3rem 0; color: #fff"
          >{{ $t(`excelTemplate.downloadTemplate`) }}</a
        >
      </el-button>
    </div>
    <el-dialog
      :title="$t(`monthOverstock.excelDialogTitle`)"
      :visible="visible"
      @close="visible = false"
    >
      <MonthOverstockTable
        :data="excelData"
        @fatherMethod="closeMonthStockTable"
      ></MonthOverstockTable>
    </el-dialog>
    <!-- 新增月库存 -->
    <el-dialog
      :title="dialogTitle"
      :visible="addFormVisible"
      width="35%"
    >
      <!-- <AddForm @fatherMethod="closeAddForm"></AddForm> -->
      <el-form :model="formData" label-width="120px">
        <el-form-item :label="$t(`monthOverstock.name`)" style="width: 25rem">
          <el-input
            type="text"
            :placeholder="$t(`monthOverstock.namePlaceholder`)"
            v-model="formData.name"
          ></el-input>
        </el-form-item>
        <el-form-item :label="$t(`monthOverstock.month`)" style="width: 15rem">
          <!-- <el-input v-model="form.month" type="text" placeholder="请输入数量">
                </el-input> -->
          <el-date-picker
            v-model="formData.month"
            type="month"
            :placeholder="$t(`monthOverstock.monthPlaceholder`)"
            value-format="yyyy-MM-dd"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item :label="$t(`monthOverstock.number`)" style="width: 25rem">
          <el-input
            v-model="formData.num"
            type="number"
            :placeholder="$t(`monthOverstock.numberPlaceholder`)"
          >
          </el-input>
        </el-form-item>
        <el-form-item :label="$t(`monthOverstock.price`)" style="width: 25rem">
          <el-input
            v-model="formData.price"
            type="number"
            :placeholder="$t(`monthOverstock.pricePlaceholder`)"
          >
          </el-input>
        </el-form-item>
        <!-- <el-form-item>
          <el-button type="primary" @click="submit" size="mini">{{
            $t(`monthOverstock.confirm`)
          }}</el-button>
        </el-form-item> -->
        <div style="display: flex; justify-content: center">
          <span slot="footer" class="dialog-footer">
            <el-button @click="addFormVisible = false" size="mini">{{
              $t(`int.cancel`)
            }}</el-button>
            <el-button type="primary" @click="submit('formData')" size="mini">{{
              $t(`monthOverstock.confirm`)
            }}</el-button>
          </span>
        </div>
      </el-form>
    </el-dialog>

    <el-dialog
      :title="$t(`monthOverstock.updateDialogTitle`)"
      :visible="updateFormVisible"
      @close="updateFormVisible = false"
    >
      <UpdateForm
        :form="updateForm"
        @fatherMethod="closeUpdateForm"
      ></UpdateForm>
    </el-dialog>

    <el-dialog
      :title="$t(`monthOverstock.dialogTitle1`)"
      :visible="changeMonthOverstockTypeVisible"
      @close="changeMonthOverstockTypeVisible = false"
    >
      <div>
        <el-select
          v-model="monthOverstockType"
          filterable
          allow-create
          default-first-option
          placeholder="please select type"
          style="width: 30rem"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
      <el-button
        type="primary"
        @click="setMonthOverstockType"
        size="mini"
        style="margin: 30px"
        >{{ $t(`monthOverstock.confirm`) }}</el-button
      >
    </el-dialog>
    <!-- 表格 -->
    <el-table
      class="table-content"
      :data="newMonthOverstocks"
      :border="true"
      style="margin: 0 auto"
      stripe
    >
      <el-table-column
        prop="name"
        :label="$t(`monthOverstock.name`)"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="month"
        :label="$t(`monthOverstock.month`)"
        align="center"
        :formatter="formatTime"
      >
      </el-table-column>
      <el-table-column
        prop="num"
        :label="$t(`monthOverstock.number`)"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="price"
        :label="$t(`monthOverstock.price`)"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="total"
        :label="$t(`monthOverstock.total`)"
        align="center"
      >
      </el-table-column>
      <el-table-column
        :label="$t(`monthOverstock.operation`)"
        align="center"
        width="180"
      >
        <template slot-scope="scope">
          <!-- <el-button
            round
            size="mini"
            type="primary"
            @click="update(scope.row)"
            >{{ $t(`monthOverstock.update`) }}</el-button
          >
          <el-button
            round
            size="mini"
            type="danger"
            @click="deleteMonthStock(scope.row.id)"
            >{{ $t(`monthOverstock.delete`) }}</el-button
          > -->
          <div style="display: flex; justify-content: center; cursor: pointer">
            <div @click="update(scope.row)" style="color: #409eff">
              <span>{{ $t(`monthOverstock.update`) }}</span>
            </div>
            <div
              @click="deleteMonthStock(scope.row.id)"
              style="color: #409eff; margin-left: 10px"
            >
              <span>{{ $t(`monthOverstock.delete`) }}</span>
            </div>
          </div>
        </template>
      </el-table-column>
    </el-table>

    <div class="block" style="margin: 20px auto">
      <el-pagination
        background
        layout="total, sizes, prev, pager, next, jumper"
        :current-page.sync="page.pageNum"
        @size-change="handleSizeChange"
        :total="page.total"
        :page-size="page.pageSize"
        style="float: right; margin-bottom: 20px"
        @current-change="handleCurrentChange"
      >
      </el-pagination>
    </div>

    <el-dialog title="Monthly Overstock" :visible.sync="visible1" width="55%">
      <OverstockMonth
        style="margin: 0 0.5rem"
        :overstocks="overstocks"
        :type="monthOverstockType"
      >
      </OverstockMonth>
    </el-dialog>
  </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';
import pageHeader from "@/components/pageHeader/index.vue";
import store from "@/store";
import MonthOverstockTable from "./monthOverstockTable.vue";
import AddForm from "./addForm.vue";
import UpdateForm from "./updateForm.vue";
import { list, deleteById, selectAllPaged ,add,update} from "@/api/monthOverstock";
import {
  getOverstocks,
  getMonthOverstockType,
  setMonthOverstockType,
} from "@/api/board";
import OverstockMonth from "@/view/screen/components/OverstockMonth/index.vue";
export default {
  // import引入的组件需要注入到对象中才能使用
  components: {
    MonthOverstockTable,
    AddForm,
    UpdateForm,
    OverstockMonth,
    pageHeader,
  },
  name: "monthOverstock",
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
        token: store.getters.token,
      },
      excelData: [],
      visible: false,
      title: "",
      updateFormVisible: false,
      addFormVisible: false,
      options: [
        {
          value: 1,
          label: this.$t(`monthOverstock.value1`),
        },
        {
          value: 2,
          label: this.$t(`monthOverstock.value2`),
        },
      ],
      monthOverstocks: [],
      newMonthOverstocks:[],
      updateForm: {},
      monthOverstockType: 1,
      changeMonthOverstockTypeVisible: false,
      visible1: false,
      overstocks: false,

      page: {
        pageSize: 10,
        pageNum: 1,
        total: 1000,
        queryCondition: {
          name: "",
          area: "",
          startTime: "",
          endTime: "",
        },
      },
      formData: {},
      dialogTitle:''
    };
  },
  // 监听属性 类似于data概念
  computed: {},
  // 监控data中的数据变化
  watch: {},
  // 方法集合
  methods: {
    handleSuccess(res) {
      // console.log(res.data);
      if (res.code == 200) {
        this.excelData = res.data;
        this.visible = true;
        this.title = "EOL Excel Data";
      } else {
        this.$message({
          type: "warning",
          message: res.msg,
        });
      }
    },
    beforeUpload(file) {
      const fileName = file.name;
      const rightFilename = "Monthly_Overstock.xlsx";
      if (fileName !== rightFilename) {
        this.$confirm("请上传Monthly_Overstock.xlsx", this.$t(`eol.tips`), {
          confirmButtonText: this.$t(`eol.confirm`),
          cancelButtonText: this.$t(`eol.cancel`),
          type: "warning",
        });
        return false;
      }
    },
    // 更新
    update(row) {
      this.formData = JSON.parse(JSON.stringify(row));
      this.dialogTitle = this.$t(`monthOverstock.updateDialogTitle`);
      this.addFormVisible = true;
    },
    // 新增按钮事件
    openDialog(type) {
      this.dialogTitle = this.$t(`monthOverstock.addDialogTitle`);
      this.addFormVisible = true;
      for (let i in this.formData) {
        this.formData[i] = "";
      }
      // this.$nextTick(() => {
      //   this.$refs.formData.clearValidate();
      // });
    },
    // 新增/更新提交
    submit(formData) {
      // this.$refs[formData].validate((valid) => {
        // if (valid) {
          if (this.dialogTitle == this.$t(`monthOverstock.addDialogTitle`)) {
            add(this.formData).then((res) => {
              if (res.data.code == 200) {
                this.$message({
                  type: "success",
                  message: this.$t(`clock.operationOK`),
                });
              }
            });
          } else {
            update(this.formData).then((res) => {
              if (res.data.code == 200) {
                this.$message({
                  type: "success",
                  message: this.$t(`clock.operationOK`),
                });
              }
            });
          }
          for (let i in this.formData) {
            this.formData[i] = "";
          }
          this.addFormVisible = false;
          this.getRecords();
        // }
        //  else {
        //   // console.log("error submit!!");
        //   return false;
        // }
      // });
    },

    closeMonthStockTable() {
      this.$refs.uploadRef.clearFiles();
      this.visible = false;
      this.getRecords();
    },
    closeAddForm() {
      this.addFormVisible = false;
      this.getRecords();
      this.getMonthOverstockType();
      this.getOverstocks();
    },
    closeUpdateForm() {
      this.getRecords();
      this.getMonthOverstockType();
      this.getOverstocks();
      this.updateFormVisible = false;
    },
    async getMonthOverstocks() {
      const { data: res } = await list();
      if (res.code == 200) {
        this.monthOverstocks = res.data;
        this.$message({
          type: "success",
          message: this.$t(`clock.operationOK`),
        });
      } else {
        this.$message({
          type: "warning",
          message: res.msg,
        });
      }
    },
    // 删除
    deleteMonthStock(id) {
      this.$confirm(this.$t(`eol.deleteTips`), this.$t(`eol.tips`), {
        confirmButtonText: this.$t(`eol.confirm`),
        cancelButtonText: this.$t(`eol.cancel`),
        type: "warning",
      })
        .then(async () => {
          const { data: res } = await deleteById(id);
          if (res.code == 200) {
            this.getRecords();
            this.getMonthOverstockType();
            this.getOverstocks();
            this.$message({
              type: "success",
              message: this.$t(`clock.operationOK`),
            });
          } else {
            this.$message({
              type: "warning",
              message: res.msg,
            });
          }
        })
        .catch((e) => {
          // console.log(e);
          this.$message({
            type: "info",
            message: this.$t(`clock.cancelTooltip`),
          });
        });
    },
    async getMonthOverstockType() {
      const { data: res } = await getMonthOverstockType();
      if (res.code == 200) {
        this.monthOverstockType = res.data;
      } else {
        this.$message({
          type: "warning",
          message: res.msg,
        });
      }
    },
    async setMonthOverstockType() {
      const { data: res } = await setMonthOverstockType(
        this.monthOverstockType
      );
      if (res.code == 200) {
        this.getMonthOverstockType();
        this.getOverstocks();
        this.$message({
          type: "success",
          message: "change MonthOverstockType successfully!",
        });
        this.changeMonthOverstockTypeVisible = false;
      } else {
        this.$message({
          type: "warning",
          message: res.msg,
        });
      }
    },
    changeMonthOverstockType() {
      this.changeMonthOverstockTypeVisible = true;
    },
    formatTime(row, column) {
      if (column.label === this.$t(`monthOverstock.month`)) {
        const t1 = new Date(row.month);
        const month1 = t1.getMonth() + 1;
        const year1 = t1.getFullYear();
        return year1 + "/" + month1;
      }
    },
    async getOverstocks() {
      const { data: res } = await getOverstocks();
      // console.log(res);
      if (res.code == 200) {
        this.overstocks = res.data;
      } else {
        this.$message({
          type: "warning",
          message: res.msg,
        });
      }
    },
    submitToQuery() {
      this.page.pageNum = 1;
      this.getRecords();
      console.log(this.page);
    },
    handleCurrentChange(val) {
      this.page.pageNum = val;
      this.getRecords();
    },
    handleSizeChange(val) {
      this.page.pageSize = val;
      this.getRecords();
    },
    async getRecords() {
      const { data: res } = await selectAllPaged(this.page);
      if (res.code == 200) {
        this.newMonthOverstocks = res.data.data;
        this.page.total = res.data.total;
      } else {
        this.$message({
          type: "warning",
          message: res.msg,
        });
      }
    },
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    this.getRecords();
    this.getMonthOverstockType();
    this.getOverstocks();
  },
  beforeCreate() {}, // 生命周期 - 创建之前
  beforeMount() {}, // 生命周期 - 挂载之前
  beforeUpdate() {}, // 生命周期 - 更新之前
  updated() {}, // 生命周期 - 更新之后
  beforeDestroy() {}, // 生命周期 - 销毁之前
  destroyed() {}, // 生命周期 - 销毁完成
  activated() {}, // 如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style lang="scss" scoped>
//  @import url(); 引入公共css类
.monthOverstock {
  padding: 0 0.6rem 1rem 0.6rem;

  .new-create {
    display: flex;
    padding-bottom: 20px;

    .create-button {
      margin-right: 15px;
    }
  }
}
</style>

<template>
  <div id="return" class="return-container">
    <pageHeader
      :title="$t(`return.pageTitle`)"
      :describe="$t(`return.pageDesc`)"
    ></pageHeader>
    <div style="margin-left: 1rem">
      <el-form :inline="true" :model="form" size="mini" class="form-box">
        <el-form-item :label="$t(`return.product`)" :span="1">
          <el-input
            v-model="page.queryCondition.product"
            clearable
            :placeholder="$t(`return.productPlaceholder`)"
          ></el-input>
        </el-form-item>
        <el-form-item :placeholder="$t(`return.areaPlaceholder`)" :span="1">
          <el-checkbox-group
            v-model="checkList"
            @change="checkChange"
            :min="0"
            :max="1"
          >
            <el-checkbox label="UK"></el-checkbox>
            <el-checkbox label="US"></el-checkbox>
            <el-checkbox label="China/HK"></el-checkbox>
            <!-- <el-checkbox label="Poland"></el-checkbox> -->
          </el-checkbox-group>
        </el-form-item>
        <el-form-item :label="$t(`return.startTime`)" :span="1">
          <el-date-picker
            v-model="page.queryCondition.startTime"
            type="date"
            :placeholder="$t(`return.startTimePlaceholder`)"
            style="width: 180px"
            value-format="yyyy-MM-dd"
          ></el-date-picker>
        </el-form-item>
        <el-form-item :label="$t(`return.endTime`)" :span="1">
          <el-date-picker
            v-model="page.queryCondition.endTime"
            type="date"
            :placeholder="$t(`return.endTimePlaceholder`)"
            style="width: 180px"
            value-format="yyyy-MM-dd"
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
        ><i class="el-icon-plus"></i>{{ $t(`return.add`) }}</el-button
      >
      <el-upload
        :action="base_api + '/info_screen/return/excel/handler'"
        multiple
        :limit="1"
        :on-success="handleSuccess"
        :headers="headers"
        ref="uploadRef"
        :before-upload="beforeUpload"
        :show-file-list="false"
      >
        <el-button size="mini" type="primary"
          ><i class="el-icon-upload2"></i>{{ $t(`return.batchAdd`) }}</el-button
        >
      </el-upload>
      <el-button
        class="create-button"
        type="success"
        @click="changeReturnDays"
        size="mini"
        style="margin-left: 15px"
      >
        {{ $t(`return.btnTitle1`) }}{{ returnDays
        }}{{ $t(`return.btnTitle2`) }}</el-button
      >
      <el-button
        type="warning"
        size="mini"
        style="margin-left: 0"
        @click="visible1 = true"
      >
        view
      </el-button>
      <el-dropdown style="margin-left: 15px">
        <!-- <span class="el-dropdown-link" style="color: blue">
          {{ $t(`excelTemplate.downloadTemplate`) }}
        </span> -->
        <el-button type="primary" size="mini">
          {{ $t(`excelTemplate.downloadTemplate`) }}<i class="el-icon-arrow-down el-icon--right"></i>
        </el-button>
        <el-dropdown-menu slot="dropdown" >
          <el-dropdown-item
            ><a :href="base_api + '/' + 'template/Return_China&HK.xlsx'" style="color:#606266">{{
              $t(`excelTemplate.china`)
            }}</a></el-dropdown-item
          >
          <el-dropdown-item
            ><a :href="base_api + '/' + 'template/Return_UK.xlsx'" style="color:#606266">{{
              $t(`excelTemplate.uk`)
            }}</a></el-dropdown-item
          >
          <el-dropdown-item
            ><a :href="base_api + '/' + 'template/Return_US.xlsx'" style="color:#606266">{{
              $t(`excelTemplate.us`)
            }}</a></el-dropdown-item
          >
          <!-- <el-dropdown-item
            ><a :href="base_api + '/' + 'template/Return_Poland.xlsx'" style="color:#606266">{{
              $t(`excelTemplate.poland`)
            }}</a></el-dropdown-item
          > -->
        </el-dropdown-menu>
      </el-dropdown>
    </div>

    <el-table :data="returnRecords" stripe border>
      <el-table-column
        align="center"
        :label="$t(`return.index`)"
        type="index"
        width="60"
      ></el-table-column>
      <el-table-column
        prop="product"
        :label="$t(`return.product`)"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="area"
        :label="$t(`return.area`)"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="reason"
        :label="$t(`return.reason`)"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="returnDate"
        :label="$t(`return.returnDate`)"
        align="center"
      ></el-table-column>
      <el-table-column :label="$t(`return.operation`)" align="center">
        <template slot-scope="scope">
          <!-- <el-button
            type="primary"
            round
            size="mini"
            @click="update(scope.row)"
            >{{ $t(`return.update`) }}</el-button
          >
          <el-button
            type="danger"
            @click="deleteById(scope.row.returnId)"
            round
            size="mini"
            >{{ $t(`return.delete`) }}</el-button
          > -->
          <div style="display: flex;justify-content: center;cursor: pointer;">
            <div @click="update(scope.row)" style="color:#409eff;">
              <span>{{ $t(`return.update`) }}</span>
            </div>
            <div @click="deleteById(scope.row.returnId)" style="color:#409eff;margin-left: 10px;">
              <span>{{ $t(`return.delete`) }}</span>
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

    <el-dialog
      :title="$t(`return.addDialogTitle`)"
      :visible.sync="visible"
      width="35%"
    >
      <el-form :model="form" label-width="120px">
        <el-form-item :label="$t(`return.product`)">
          <el-input
            type="text"
            :placeholder="$t(`return.productPlaceholder`)"
            v-model="form.product"
          ></el-input>
        </el-form-item>
        <el-form-item :label="$t(`return.area`)">
          <el-select
            v-model="form.area"
            :placeholder="$t(`return.areaPlaceholder`)"
          >
            <el-option
              v-for="item in areaOptions"
              :key="item.value"
              :label="item.value"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t(`return.reason`)">
          <el-input
            type="textarea"
            :placeholder="$t(`return.reasonPlaceholder`)"
            v-model="form.reason"
          ></el-input>
        </el-form-item>
        <el-form-item :label="$t(`return.returnDate`)">
          <el-date-picker
            v-model="form.returnDate"
            type="date"
            :placeholder="$t(`return.returnDatePlaceholder`)"
            value-format="yyyy-MM-dd"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submit" size="mini">{{
            $t(`return.confirm`)
          }}</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <el-dialog
      :title="$t(`return.excelDialogTitle`)"
      :visible="tableVisible"
      @close="tableVisible = false"
    >
      <ReturnTable
        :data="excelData"
        @fatherMethod="closeReturnTable"
      ></ReturnTable>
    </el-dialog>

    <el-dialog
      :title="$t(`return.updateDialogTitle`)"
      :visible="updateFormVisible"
      @close="updateFormVisible = false"
    >
      <UpdateForm
        :form="updateForm"
        @fatherMethod="closeUpdateForm"
      ></UpdateForm>
    </el-dialog>

    <el-dialog
      :title="$t(`return.dialogTitle1`)"
      :visible="changeReturnDaysVisible"
      @close="changeReturnDaysVisible = false"
    >
      <div>
        {{ $t(`return.days`)
        }}<el-input
          v-model="returnDays"
          type="number"
          clearable
          style="width: 130px"
        ></el-input>
      </div>
      <el-button
        type="primary"
        @click="setReturnDays"
        size="mini"
        style="margin: 30px"
        >{{ $t(`return.confirm`) }}</el-button
      >
    </el-dialog>

    <el-dialog title="Monthly Overstock" :visible.sync="visible1" width="55%">
      <ProductReturn
        style="padding-right: 0.5rem"
        :returns="returns"
        :returnDays="returnDays"
      ></ProductReturn>
    </el-dialog>
  </div>
</template>

<script>
import pageHeader from "@/components/pageHeader/index.vue";
import store from "@/store";
import { getProducts, selectAllPaged, deleteById, insert } from "@/api/return";
import { getReturnDays, setReturnDays, getReturns } from "@/api/board";
import ProductReturn from "@/view/screen/components/ProductReturn/index.vue";
import FilterHeader from "@/components/FilterHeader";
import ReturnTable from "./returnTable.vue";
import UpdateForm from "./updateForm.vue";
export default {
  name: "data-return",
  data() {
    return {
      base_api: process.env.VUE_APP_BASE_API,
      returnRecords: [],
      conditionsFields: [], // 记录参与筛选的列信息
      form: {},
      checkList: [],
      areaOptions: [
        {
          value: "UK",
          label: "UK",
        },
        {
          value: "China/HK",
          label: "China/HK",
        },
        {
          value: "US",
          label: "US",
        },
        //{
        //  value: "Poland",
        //  label: "Poland",
       // },
      ],
      products: [],
      tableVisible: false,
      headers: {
        token: store.getters.token,
      },
      page: {
        pageSize: 10,
        pageNum: 1,
        total: 1000,
        queryCondition: {
          product: "",
          area: "",
          startTime: "",
          endTime: "",
        },
      },
      visible: false,
      title: "",
      excelData: [],
      updateForm: {},
      updateFormVisible: false,
      returnDays: 10,
      changeReturnDaysVisible: false,
      visible1: false,
      returns: [],
    };
  },
  created() {
    // 实例被创建之后执行代码
    this.getRecords();
    this.getProducts();
    this.getReturnDays();
    this.getReturns();
  },
  computed: {
    // 计算属性
  },
  components: {
    // 组件的引用
    FilterHeader,
    ReturnTable,
    UpdateForm,
    ProductReturn,
    pageHeader,
  },
  methods: {
    // 方法
    submitToQuery() {
      this.page.pageNum = 1;
      this.getRecords();
    },
    checkChange(option) {
      this.page.queryCondition.area = option.length == 1 ? option[0] : "";
    },
    openDialog(type) {
      if (type == 1) {
        this.visible = !this.visible;
        this.form = {};
        this.title = "Add Return";
      }
      if (type == 2) {
        this.title = "update Return";
        this.updateFormVisible = true;
      }
      //this.visible = !this.visible
    },
    async getRecords() {
      const { data: res } = await selectAllPaged(this.page);
      console.log(res);
      if (res.code == 200) {
        this.returnRecords = res.data.data;
        this.page.total = res.data.total;
      } else {
        this.$message({
          type: "warning",
          message: res.msg,
        });
      }
    },
    async submit() {
      const { data: res } = await insert(this.form);
      if (res.code == 200) {
        this.$message({
          type: "success",
          message: "insert successfully!",
        });
        this.form = {};
        this.getRecords();
        //this.getReturnDays()
        this.getReturns();
      } else {
        this.$message({
          type: "warning",
          message: "insert fail!",
        });
      }
      this.visible = false;
    },
    async getProducts() {
      const { data: res } = await getProducts();
      if (res.code == 200) {
        this.products = res.data;
      } else {
        this.$message({
          type: "warning",
          message: res.msg,
        });
      }
    },
    querySearch(queryString, cb) {
      console.log(queryString);
      cb(this.products);
    },
    handleSuccess(res) {
      if (res.code == 200) {
        console.log(res.data);
        this.title = "excel解析数据";
        this.excelData = res.data;
        this.tableVisible = true;
      } else {
        this.$message({
          type: "warning",
          message: res.msg,
        });
      }
    },
    beforeUpload(file) {
      const fileName = file.name;
      // if (
      //   (fileName !== "Return_China&HK.xlsx") &
      //   (fileName !== "Return_Poland.xlsx") &
      //   (fileName !== "Return_UK.xlsx") &
      //   (fileName !== "Return_US.xlsx")
      // )
      if (
        (fileName !== "Return_China&HK.xlsx") &
        (fileName !== "Return_UK.xlsx") &
        (fileName !== "Return_US.xlsx")
      ){
        this.$confirm("请上传Return_XXXX.xlsx", this.$t(`eol.tips`), {
          confirmButtonText: this.$t(`eol.confirm`),
          cancelButtonText: this.$t(`eol.cancel`),
          type: "warning",
        });
        return false;
      }
    },
    handleCurrentChange(val) {
      this.page.pageNum = val;
      this.getRecords();
    },
    handleSizeChange(val) {
      this.page.pageSize = val;
      this.getRecords();
    },
    cellStyle({ rowIndex }) {
      if (rowIndex % 2 == 0) {
        return "background: #fff;";
      } else {
        return "background: #fff;";
      }
    },
    async deleteById(id) {
      this.$confirm(this.$t(`return.deleteTips`), this.$t(`return.tips`), {
        confirmButtonText: this.$t(`return.confirm`),
        cancelButtonText: this.$t(`return.cancel`),
        type: "warning",
      })
        .then(async () => {
          const { data: res } = await deleteById(id);
          if (res.code == 200) {
            this.$message({
              type: "success",
              message: "delete successfully!",
            });
            this.getRecords();
            //this.getReturnDays()
            this.getReturns();
          } else {
            this.$message({
              type: "warning",
              message: "Delete fail!",
            });
          }
        })
        .catch((e) => {
          //console.log(e);
          this.$message({
            type: "info",
            message: this.$t(`clock.cancelTooltip`),
          });
        });
    },
    tableFilter(data, reset) {
      let flag = true; // 判断条件里有没有该列，用来判断是新增还是更新
      if (!reset) {
        // 参与筛选的列信息，有则更新
        this.conditionsFields.forEach((item) => {
          if (item.fieldName === data.fieldName) {
            item.conditions = data.conditions;
            flag = false;
          }
        });
        // 没有则添加
        if (flag) {
          this.conditionsFields.push(data);
        }
      }
      // 遍历所有筛选条件进行过滤
      this.conditionsFields.filter((fields, index) => {
        console.log(index);
        if (fields.filterType === "text" && fields.conditions.text !== "") {
          this.page.queryCondition[fields.fieldName] = fields.conditions.text;
        } else if (
          fields.filterType === "radio" &&
          fields.conditions.radio !== ""
        ) {
          this.page.queryCondition[fields.fieldName] = fields.conditions.radio;
        } else if (
          fields.filterType === "date" &&
          (fields.conditions.date1 || fields.conditions.date2)
        ) {
          this.page.queryCondition.startTime = fields.conditions.date1;
          this.page.queryCondition.endTime = fields.conditions.date2;
        }
      });
      this.getRecords();
    },
    tableFilterReset() {},
    closeReturnTable() {
      this.$refs.uploadRef.clearFiles();
      this.tableVisible = false;
      this.getRecords();
    },
    closeUpdateForm() {
      this.getRecords();
      this.updateFormVisible = false;
    },
    update(row) {
      console.log(row);
      this.openDialog(2);
      this.updateForm = row;
    },
    async getReturnDays() {
      const { data: res } = await getReturnDays();
      if (res.code == 200) {
        this.returnDays = res.data;
      } else {
        this.$message({
          type: "warning",
          message: res.msg,
        });
      }
    },
    changeReturnDays() {
      this.changeReturnDaysVisible = true;
    },
    async setReturnDays() {
      const { data: res } = await setReturnDays(this.returnDays);
      if (res.code == 200) {
        this.$message({
          type: "success",
          message: "update returnDays successfully!",
        });
        this.changeReturnDaysVisible = false;
        this.getReturnDays();
        this.getReturns();
      } else {
        this.$message({
          type: "warning",
          message: res.msg,
        });
      }
    },
    async getReturns() {
      const { data: res } = await getReturns();
      console.log(res);
      if (res.code == 200) {
        this.returns = res.data;
      } else {
        this.$message({
          type: "warning",
          message: res.msg,
        });
      }
    },
  },
  mounted() {
    // 页面进入时加载内容
  },
  watch: {
    // 监测变化
  },
};
</script>
<style lang="scss" scoped>
.el-form-item {
  margin-right: 30px;
}

.return-container {
  padding:0 0.6rem  1rem 0.6rem;

  .new-create {
    display: flex;
    padding-bottom: 20px;

    .create-button {
      margin-right: 15px;
    }
  }
}

.table-card {
  margin: 20px 20px;
}

.el-card ::v-deep .el-card__header {
  border: none;
}

.el-checkbox {
  margin-right: 10px;
}
</style>

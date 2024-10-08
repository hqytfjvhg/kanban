<!--  -->
<template>
  <div class="complaint-container">
    <pageHeader
      :title="$t(`complaint.pageTitle`)"
      :describe="$t(`complaint.pageDesc`)"
    ></pageHeader>
    <div style="margin-left: 1rem">
      <el-form :inline="true" :model="form" size="mini" class="form-box">
        <el-form-item :label="$t(`return.product`)" :span="1">
          <el-input
            v-model="page.queryCondition.product"
            clearable
            :placeholder="$t(`return.productPlaceholder`)"
            style="width: 220px"
          ></el-input>
        </el-form-item>
        <el-form-item :placeholder="$t(`return.areaPlaceholder`)" :span="1">
          <el-checkbox-group
            v-model="checkList"
            @change="checkChange"
            :min="0"
            :max="1"
          >
            <el-checkbox label="Row"></el-checkbox>
            <el-checkbox label="China"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
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
        > <i class="el-icon-plus"></i>{{ $t(`complaint.add`) }}</el-button
      >
      <el-upload
        :action="base_api + '/info_screen/complaint/excel/handler'"
        multiple
        :limit="1"
        :on-success="handleSuccess"
        :headers="headers"
        ref="uploadRef"
        :before-upload="beforeUpload"
        :show-file-list="false"
      >
        <el-button size="mini" type="primary"><i class="el-icon-upload2"></i>{{
          $t(`complaint.batchAdd`)
        }}</el-button>
      </el-upload>
      <el-button
        class="create-button"
        type="success"
        @click="changeAvgDays"
        size="mini"
        style="margin-left: 15px"
      >
        {{ $t(`complaint.btnTitle1`) }} {{ avgDays }}
        {{ $t(`complaint.btnTitle2`) }}</el-button
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
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item
            ><a :href="base_api + '/' + 'template/Complaint_China.xlsx'" style="color:#606266">{{
              $t(`excelTemplate.china`)
            }}</a></el-dropdown-item
          >
          <el-dropdown-item
            ><a :href="base_api + '/' + 'template/Complaint_Row.xlsx'" style="color:#606266">{{
              $t(`excelTemplate.row`)
            }}</a></el-dropdown-item
          >
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <el-dialog
      :title="$t(`complaint.excelDialogTitle`)"
      :visible="visible"
      @close="visible = false"
    >
      <ComplaintTable
        :data="excelData"
        @fatherMethod="closeExcelTable"
      ></ComplaintTable>
    </el-dialog>

    <el-dialog
      :title="$t(`complaint.addDialogTitle`)"
      :visible="addFormVisible"
      @close="addFormVisible = false"
    >
      <AddForm @fatherMethod="closeAddForm"></AddForm>
    </el-dialog>

    <el-dialog
      :title="$t(`complaint.updateDialogTitle`)"
      :visible="updateFormVisible"
      @close="updateFormVisible = false"
    >
      <UpdateForm
        :form="updateForm"
        @fatherMethod="closeUpdateForm"
      ></UpdateForm>
    </el-dialog>

    <el-dialog
      :title="$t(`complaint.dialogTitle1`)"
      :visible="changeAvgDaysVisible"
      @close="changeAvgDaysVisible = false"
    >
      <div>
        {{ $t(`complaint.days`) }}:<el-input
          v-model="avgDays"
          clearable
          type="number"
          :placeholder="$t(`complaint.daysPlaceholder`)"
          style="width: 130px"
        ></el-input>
      </div>
      <el-button
        type="primary"
        @click="setAvgDays"
        size="mini"
        style="margin: 30px"
        >{{ $t(`complaint.confirm`) }}</el-button
      >
    </el-dialog>

    <el-table
      class="table-content"
      :data="complaints"
      :border="true"
      style="margin: 0 auto"
      stripe
    >
      <el-table-column
        prop="product"
        label="product"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="area"
        label="area"
        align="center"
      ></el-table-column>
      <el-table-column prop="reason" label="reason" align="center">
        <!-- <template slot-scope="scope">
                    <span v-if="scope.row.engSample == null">/</span>
                    <span v-else>{{ scope.row.engSample }}</span>
                </template> -->
      </el-table-column>
      <el-table-column
        prop="complaintDate"
        label="complaintDate"
        align="center"
      >
        <!-- <template slot-scope="scope">
                    <span v-if="scope.row.pp == null">/</span>
                    <span v-else>{{ scope.row.pp }}</span>
                </template> -->
      </el-table-column>
      <el-table-column prop="gmtCreate" label="gmtCreate" align="center">
      </el-table-column>
      <el-table-column prop="gmtModified" label="gmtModified" align="center">
      </el-table-column>
      <el-table-column label="operation" align="center" width="180">
        <template slot-scope="scope">
          <!-- <el-button
            round
            size="mini"
            type="primary"
            @click="update(scope.row)"
            >{{ $t(`complaint.update`) }}</el-button
          >
          <el-button
            round
            size="mini"
            type="danger"
            @click="deleteComplaint(scope.row.id)"
            >{{ $t(`complaint.delete`) }}</el-button
          > -->
          <div style="display: flex;justify-content: center;cursor: pointer;">
            <div @click="update(scope.row)" style="color:#409eff;">
              <span>{{ $t(`complaint.update`) }}</span>
            </div>
            <div @click="deleteComplaint(scope.row.id)" style="color:#409eff;margin-left: 10px;">
              <span>{{ $t(`complaint.delete`) }}</span>
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

    <el-dialog title="Avg. Complaints" :visible.sync="visible1" width="45%">
      <AvgTicket
        style="padding-right: 0.5rem"
        :complaints="avgComplaints"
      ></AvgTicket>
    </el-dialog>
  </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';
import pageHeader from "@/components/pageHeader/index.vue";
import AvgTicket from "@/view/screen/components/AvgTicket/index.vue";
import ComplaintTable from "./complaintTable.vue";
import UpdateForm from "./updateForm.vue";
import AddForm from "./addForm.vue";
import store from "@/store";
import { list, deleteById, selectAllPaged } from "@/api/complaint";
import { getAvgDays, setAvgDays, getComplaints } from "@/api/board";
export default {
  // import引入的组件需要注入到对象中才能使用
  components: { ComplaintTable, UpdateForm, AddForm, AvgTicket, pageHeader },
  name: "complaint-index",
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
      complaints: [],
      base_api: process.env.VUE_APP_BASE_API,
      headers: {
        token: store.getters.token,
      },
      excelData: [],
      visible: false,
      title: "",
      addFormVisible: false,
      updateFormVisible: false,
      updateForm: {},
      avgDays: 7,
      changeAvgDaysVisible: false,
      visible1: false,
      avgComplaints: [],
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
      areaOptions: [
        {
          value: "Row",
          label: "Row",
        },
        {
          value: "China",
          label: "China",
        },
      ],
      form: {},
      checkList: [],
    };
  },
  // 监听属性 类似于data概念
  computed: {},
  // 监控data中的数据变化
  watch: {},
  // 方法集合
  methods: {
    handleSuccess(res) {
      console.log(res.data);
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
      if (
        (fileName !== "Complaint_China.xlsx") &
        (fileName !== "Complaint_Row.xlsx")
      ) {
        this.$confirm("请上传Complaint_XXXX.xlsx", this.$t(`eol.tips`), {
          confirmButtonText: this.$t(`eol.confirm`),
          cancelButtonText: this.$t(`eol.cancel`),
          type: "warning",
        });
        return false;
      }
    },
    openDialog(type) {
      if (type == 1) {
        this.title = "新增Complaint";
        this.addFormVisible = true;
      }
      if (type == 2) {
        this.title = "更新表单";
        this.updateFormVisible = true;
      }
    },
    update(row) {
      this.updateForm = row;
      this.openDialog(2);
    },
    closeUpdateForm() {
      this.getRecords();
      this.getAvgComplaints();
      this.updateFormVisible = false;
    },
    closeAddForm() {
      this.getRecords();
      this.getAvgComplaints();
      this.addFormVisible = false;
    },
    closeExcelTable() {
      this.$refs.uploadRef.clearFiles();
      this.visible = false;
      this.getRecords();
      this.getAvgComplaints();
    },
    deleteComplaint(id) {
      this.$confirm(
        this.$t(`complaint.deleteTips`),
        this.$t(`complaint.tips`),
        {
          confirmButtonText: this.$t(`complaint.confirm`),
          cancelButtonText: this.$t(`complaint.cancel`),
          type: "warning",
        }
      )
        .then(async () => {
          const { data: res } = await deleteById(id);
          if (res.code == 200) {
            this.$message({
              type: "success",
              message: "delete Complaint successfully!",
            });
            this.getRecords();
            this.getAvgComplaints();
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
    async getComplaints() {
      const { data: res } = await list();
      if (res.code == 200) {
        this.complaints = res.data;
        this.$message({
          type: "success",
          message: "getComplaints successfully!",
        });
      } else {
        this.$message({
          type: "warning",
          message: res.msg,
        });
      }
    },
    async getAvgDays() {
      const { data: res } = await getAvgDays();
      if (res.code == 200) {
        this.avgDays = res.data;
      } else {
        this.$message({
          type: "warning",
          message: res.msg,
        });
      }
    },
    changeAvgDays() {
      this.changeAvgDaysVisible = true;
    },
    async setAvgDays() {
      const { data: res } = await setAvgDays(this.avgDays);
      if (res.code == 200) {
        this.$message({
          type: "success",
          message: "update avgDays successfully!",
        });
        this.changeAvgDaysVisible = false;
        this.getAvgComplaints();
      } else {
        this.$message({
          type: "warning",
          message: res.msg,
        });
      }
    },
    async getAvgComplaints() {
      const { data: res } = await getComplaints(); //7天内投诉票总数
      console.log(`getComplaints`, res);
      if (res.code == 200) {
        this.avgComplaints = res.data;
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
    },
    checkChange(option) {
      this.page.queryCondition.area = option.length == 1 ? option[0] : "";
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
      console.log(res);
      if (res.code == 200) {
        this.complaints = res.data.data;
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
    this.getAvgComplaints();
    this.getAvgDays();
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
.complaint-container {
  padding:0 0.6rem  1rem 0.6rem;

  .new-create {
    display: flex;
    padding-bottom: 20px;

    .create-button {
      margin-right: 15px;
    }
  }
}
</style>

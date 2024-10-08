<!--  -->
<template>
  <div class="complaint-unsolved-container">
    <pageHeader
      :title="$t(`unsolvedComplaint.pageTitle`)"
      :describe="$t(`unsolvedComplaint.pageDesc`)"
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
      >
        <i class="el-icon-plus"></i>{{ $t(`unsolvedComplaint.add`) }}</el-button
      >
      <el-upload
        :action="base_api + '/info_screen/complaintUnsolved/excel/handler'"
        multiple
        :limit="1"
        :on-success="handleSuccess"
        :headers="headers"
        ref="uploadRef"
        :before-upload="beforeUpload"
        :show-file-list="false"
      >
        <el-button size="mini" type="primary">
          <i class="el-icon-upload2"></i
          >{{ $t(`unsolvedComplaint.batchAdd`) }}</el-button
        >
      </el-upload>
      <el-button
        type="warning"
        size="mini"
        style="margin-left: 15px"
        @click="visible1 = true"
      >
        view
      </el-button>
      <el-dropdown style="margin-left: 15px">
        <!-- <span class="el-dropdown-link" style="color: blue">
          {{ $t(`excelTemplate.downloadTemplate`) }}
        </span> -->
        <el-button type="primary" size="mini">
          {{ $t(`excelTemplate.downloadTemplate`)
          }}<i class="el-icon-arrow-down el-icon--right"></i>
        </el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item
            ><a
              :href="base_api + '/' + 'template/Complaint_Unsolved_China.xlsx'"
              style="color: #606266"
              >{{ $t(`excelTemplate.china`) }}</a
            ></el-dropdown-item
          >
          <el-dropdown-item
            ><a
              :href="base_api + '/' + 'template/Complain_Unsolved_Row.xlsx'"
              style="color: #606266"
              >{{ $t(`excelTemplate.row`) }}</a
            ></el-dropdown-item
          >
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <el-dialog
      :title="$t(`unsolvedComplaint.excelDialogTitle`)"
      :visible="visible"
      @close="visible = false"
    >
      <ComplaintUnsolvedTable
        :data="excelData"
        @fatherMethod="closeExcelTable"
      ></ComplaintUnsolvedTable>
    </el-dialog>

    <el-dialog
      :title="$t(`unsolvedComplaint.addDialogTitle`)"
      :visible="addFormVisible"
      @close="addFormVisible = false"
    >
      <AddForm @fatherMethod="closeAddForm"></AddForm>
    </el-dialog>

    <el-dialog
      :title="$t(`unsolvedComplaint.updateDialogTitle`)"
      :visible="updateFormVisible"
      @close="updateFormVisible = false"
    >
      <UpdateForm
        :form="updateForm"
        @fatherMethod="closeUpdateForm"
      ></UpdateForm>
    </el-dialog>

    <el-table
      class="table-content"
      :data="complaintUnsolveds"
      :border="true"
      style="margin: 0 auto"
      stripe
    >
      <el-table-column
        prop="product"
        :label="$t(`unsolvedComplaint.product`)"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="area"
        :label="$t(`unsolvedComplaint.area`)"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="description"
        :label="$t(`unsolvedComplaint.description`)"
        align="center"
      >
        <!-- <template slot-scope="scope">
                    <span v-if="scope.row.engSample == null">/</span>
                    <span v-else>{{ scope.row.engSample }}</span>
                </template> -->
      </el-table-column>
      <el-table-column
        prop="receptionDate"
        :label="$t(`unsolvedComplaint.receptionDate`)"
        align="center"
      >
        <!-- <template slot-scope="scope">
                    <span v-if="scope.row.pp == null">/</span>
                    <span v-else>{{ scope.row.pp }}</span>
                </template> -->
      </el-table-column>
      <el-table-column
        prop="solutionDate"
        :label="$t(`unsolvedComplaint.solutionDate`)"
        align="center"
      >
        <!-- <template slot-scope="scope">
                    <span v-if="scope.row.mp == null">/</span>
                    <span v-else>{{ scope.row.mp }}</span>
                </template> -->
      </el-table-column>
      <el-table-column
        prop="isResolved"
        :label="$t(`unsolvedComplaint.isResolved`)"
        align="center"
      >
        <!-- <template slot-scope="scope">
                    <span v-if="scope.row.launch == null">/</span>
                    <span v-else>{{ scope.row.launch }}</span>
                </template> -->
      </el-table-column>
      <el-table-column
        prop="gmtCreate"
        :label="$t(`unsolvedComplaint.gmtCreate`)"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="gmtModified"
        :label="$t(`unsolvedComplaint.gmtModified`)"
        align="center"
      >
      </el-table-column>
      <el-table-column
        :label="$t(`unsolvedComplaint.operation`)"
        align="center"
        width="180"
      >
        <template slot-scope="scope">
          <!-- <el-button
            round
            size="mini"
            type="primary"
            @click="update(scope.row)"
            >{{ $t(`unsolvedComplaint.update`) }}</el-button
          >
          <el-button
            round
            size="mini"
            type="danger"
            @click="deleteComplaintUnsolved(scope.row.id)"
            >{{ $t(`unsolvedComplaint.delete`) }}</el-button
          > -->
          <div style="display: flex; justify-content: center; cursor: pointer">
            <div @click="update(scope.row)" style="color: #409eff">
             <span>{{ $t(`unsolvedComplaint.update`) }}</span>
            </div>
            <div
              @click="deleteComplaintUnsolved(scope.row.id)"
              style="color: #409eff; margin-left: 10px"
            >
              <span>{{ $t(`unsolvedComplaint.delete`) }}</span>
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

    <el-dialog title="Unsolved Complaints" :visible.sync="visible1" width="45%">
      <UnsolvedTicket
        style="padding-right: 0.5rem"
        :unsolvedComplaints="unsolvedComplaints"
      ></UnsolvedTicket>
    </el-dialog>
  </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';
import pageHeader from "@/components/pageHeader/index.vue";
import UnsolvedTicket from "@/view/screen/components/UnsolvedTicket/index.vue";
import ComplaintUnsolvedTable from "./complaintUnsolvedTable.vue";
import UpdateForm from "./updateForm.vue";
import AddForm from "./addForm.vue";
import store from "@/store";
import { list, deleteById, selectAllPaged } from "@/api/complaintUnsolved";
import { getUnsolvedComplaints } from "@/api/board";
export default {
  // import引入的组件需要注入到对象中才能使用
  components: {
    ComplaintUnsolvedTable,
    UpdateForm,
    AddForm,
    UnsolvedTicket,
    pageHeader,
  },
  name: "complaint-unsolved",
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
      complaintUnsolveds: [],
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
      visible1: false,
      unsolvedComplaints: [],
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
        (fileName !== "Complaint_Unsolved_China.xlsx") &
        (fileName !== "Complain_Unsolved_Row.xlsx")
      ) {
        this.$confirm(
          "请上传Complaint_Unsolved_XXXX.xlsx",
          this.$t(`eol.tips`),
          {
            confirmButtonText: this.$t(`eol.confirm`),
            cancelButtonText: this.$t(`eol.cancel`),
            type: "warning",
          }
        );
        return false;
      }
    },
    openDialog(type) {
      if (type == 1) {
        this.title = "add complaintUnsolved";
        this.addFormVisible = true;
      }
      if (type == 2) {
        this.title = "update complaintUnsolved";
        this.updateFormVisible = true;
      }
    },
    update(row) {
      this.updateForm = row;
      this.openDialog(2);
    },
    closeUpdateForm() {
      this.getRecords();
      this.updateFormVisible = false;
    },
    closeAddForm() {
      this.getRecords();
      this.addFormVisible = false;
    },
    closeExcelTable() {
      this.$refs.uploadRef.clearFiles();
      this.visible = false;
      this.getRecords();
    },
    async getComplaintUnsolveds() {
      const { data: res } = await list();
      if (res.code == 200) {
        this.complaintUnsolveds = res.data;
        this.$message({
          type: "success",
          message: "getComplaintUnsolveds successfully!",
        });
      } else {
        this.$message({
          type: "warning",
          message: res.msg,
        });
      }
    },
    deleteComplaintUnsolved(id) {
      this.$confirm(
        this.$t(`unsolvedComplaint.deleteTips`),
        this.$t(`unsolvedComplaint.tips`),
        {
          confirmButtonText: this.$t(`unsolvedComplaint.confirm`),
          cancelButtonText: this.$t(`unsolvedComplaint.cancel`),
          type: "warning",
        }
      )
        .then(async () => {
          const { data: res } = await deleteById(id);
          if (res.code == 200) {
            this.$message({
              type: "success",
              message: "delete ComplaintUnsolved successfully!",
            });
            this.getRecords();
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
    async getUnsolvedComplaints() {
      const { data: res } = await getUnsolvedComplaints(); //7天内投诉票总数
      console.log(`getUnsolvedComplaints`, res);
      if (res.code == 200) {
        this.unsolvedComplaints = res.data;
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
        this.complaintUnsolveds = res.data.data;
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
    this.getUnsolvedComplaints();
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
.complaint-unsolved-container {
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

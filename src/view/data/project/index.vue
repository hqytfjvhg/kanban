<template>
  <div
    id="project"
    class="project-container"
  >
    <pageHeader
      :title="$t(`project.pageTitle`)"
      :describe="$t(`project.pageDesc`)"
    ></pageHeader>
    <div style="margin-left: 1rem">
      <el-form
        :inline="true"
        size="mini"
        class="form-box"
        style="display: flex; width: 100%"
      >
        <el-form-item :label="$t(`project.subject`)">
          <!-- <el-input
            v-model="page.queryCondition.subject"
            clearable
            :placeholder="$t(`project.subjectPlaceholder`)"
          ></el-input> -->
          <el-select
            v-model="page.queryCondition.subject"
            :placeholder="$t(`project.subjectPlaceholder`)"
            :clearable="true"
          >
            <el-option
              v-for="item in subjects"
              :key="item.value"
              :label="item.value"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <!-- <el-form-item label="year:">
          <el-input v-model="page.queryCondition.year" clearable placeholder="please input year" ></el-input>
      </el-form-item> -->
        <el-form-item :label="$t(`project.month`)">
          <!-- <el-input
            v-model="page.queryCondition.month"
            clearable
            :placeholder="$t(`project.monthPlaceholder`)"
          ></el-input> -->
          <el-date-picker
            v-model="page.queryCondition.month"
            :placeholder="$t(`project.monthPlaceholder`)"
            type="month"
            value-format="yyyy/M"
          />
        </el-form-item>
        <el-form-item style="margin-right: 10px">
          <el-button
            icon="el-icon-search"
            type="primary"
            @click="getProjects"
          >{{ $t(`project.query`) }}</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div
      class="new-create"
      style="margin-left: 1rem"
    >
      <el-button
        class="create-button"
        type="primary"
        @click="openDialog"
        size="mini"
      ><i class="el-icon-plus"></i>{{ $t(`project.add`) }}</el-button>
      <el-button
        type="warning"
        size="mini"
        @click="visible1 = true"
        style="margin-left: 0"
      >
        <!-- view -->
        <i class="el-icon-view"></i> {{ $t(`int.view`) }}
      </el-button>
    </div>

    <!-- <el-button type="primary" icon="el-icon-plus" circle @click="openDialog"
      style="position: absolute;bottom:5rem;right:10rem;z-index: 99;width:3rem;height: 3rem;"></el-button>
    <el-button type="success" icon="el-icon-view" circle @click="visible1 = true"
      style="position: absolute;bottom:5rem;right:6rem;z-index: 99;width:3rem;height: 3rem;"></el-button> -->

    <el-table
      :data="pageVo.data"
      stripe
      border
    >
      <el-table-column
        type="index"
        :label="$t(`project.index`)"
        width="60"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="subject"
        :label="$t(`project.subject`)"
        align="center"
      ></el-table-column>
      <!-- <el-table-column prop="year" label="year" align="center"></el-table-column> -->
      <el-table-column
        prop="month"
        :label="$t(`project.month`)"
        align="center"
        :formatter="formatTime"
        sortable
      ></el-table-column>
      <el-table-column
        prop="content"
        :label="$t(`project.content`)"
        align="center"
      >
        <template slot-scope="scope">
          <el-input
            v-if="scope.row.itemId == currentUpdateId"
            v-model="updateForm.content"
            type="textarea"
            autosize
          ></el-input>
          <div v-else>{{ scope.row.content }}</div>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t(`project.operation`)"
        align="center"
      >
        <template slot-scope="scope">
          <div
            v-if="scope.row.itemId == currentUpdateId"
            style="display: flex; justify-content: center; cursor: pointer"
          >
            <!-- <el-button type="success" round size="mini" @click="confireUpdate">{{ $t(`project.confirm`) }}</el-button>
            <el-button type="warning" round size="mini" @click="cancelUpdate">{{
              $t(`project.cancel`)
            }}</el-button> -->
            <div
              @click="confireUpdate"
              style="color: #409eff"
            >
              <span>{{ $t(`project.confirm`) }}</span>
            </div>
            <div
              @click="cancelUpdate"
              style="color: #409eff; margin-left: 10px"
            >
              <span>{{ $t(`project.cancel`) }}</span>
            </div>
          </div>
          <div
            v-else
            style="display: flex; justify-content: center; cursor: pointer"
          >
            <!-- <el-button
              type="primary"
              round
              size="mini"
              @click="update(scope.row)"
              >{{ $t(`project.update`) }}</el-button
            >
            <el-button
              type="danger"
              round
              size="mini"
              @click="deleteProject(scope.row.itemId)"
              >{{ $t(`project.delete`) }}</el-button
            > -->
            <div
              @click="update(scope.row)"
              style="color: #409eff"
            >
              <span>{{ $t(`project.update`) }}</span>
            </div>
            <div
              @click="deleteProject(scope.row.itemId)"
              style="color: #409eff; margin-left: 10px"
            >
              <span>{{ $t(`project.delete`) }}</span>
            </div>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <div
      class="block"
      style="margin: 20px auto"
    >
      <el-pagination
        background
        layout="total, sizes, prev, pager, next, jumper"
        :current-page.sync="page.pageNum"
        @size-change="handleSizeChange"
        :total="pageVo.total"
        :page-size="page.pageSize"
        style="float: right; margin-bottom: 20px"
        @current-change="handleCurrentChange"
      >
      </el-pagination>
    </div>

    <div
      class="table"
      v-if="tableVisable"
    >
      <el-card class="table-card">
        <div
          slot="header"
          class="clearfix"
        >
          <span>excel data</span>
          <el-button
            style="float: right; padding: 3px 0"
            type="primary"
            @click="submitToBatch"
          >confirm Batch operations</el-button>
        </div>
        <el-table
          class="table-content"
          :data="excelData"
        >
          <el-table-column
            prop="title"
            label="title"
            width="180"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="current"
            label="current"
            width="180"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="month1"
            label="month1"
            width="180"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="month2"
            label="month2"
            width="180"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="month3"
            label="month3"
            width="180"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="month4"
            label="month4"
            width="180"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="month5"
            label="month5"
            width="180"
            align="center"
          ></el-table-column>
        </el-table>
      </el-card>
    </div>
    <!-- 新增 -->
    <el-dialog
      :title="title"
      :visible.sync="visible"
      width="35%"
    >
      <el-form
        :model="addForm"
        label-width="120px"
        ref="addForm"
        :rules="rules"
      >
        <el-form-item
          :label="$t(`project.subject`)"
          prop="subject"
        >
          <el-select
            v-model="addForm.subject"
            :placeholder="$t(`project.subjectPlaceholder`)"
          >
            <el-option
              v-for="item in subjects"
              :key="item.value"
              :label="item.value"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <!-- <el-form-item label="year:">
              <el-input type="number" v-model="addForm.year" placeholder="请输入year"></el-input>
          </el-form-item> -->
        <el-form-item
          :label="$t(`project.month`)"
          prop="month"
        >
          <!-- <el-input type="number" v-model="addForm.month" placeholder="请输入month"></el-input> -->
          <el-date-picker
            v-model="addForm.month"
            type="month"
            :placeholder="$t(`project.monthPlaceholder`)"
            value-format="yyyy-MM-dd"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item
          :label="$t(`project.content`)"
          prop="content"
        >
          <el-input
            class="inline-input"
            v-model="addForm.content"
            :placeholder="$t(`project.contentPlaceholder`)"
            type="textarea"
            :rows="5"
          ></el-input>
        </el-form-item>
        <!-- <el-form-item>
          <el-button type="primary" @click="submit" round size="mini">{{
            $t(`project.confirm`)
          }}</el-button>
        </el-form-item> -->
        <div style="display: flex; justify-content: center">
          <span
            slot="footer"
            class="dialog-footer"
          >
            <el-button
              @click="visible = false"
              size="mini"
            >{{
              $t(`int.cancel`)
            }}</el-button>
            <el-button
              type="primary"
              @click="submit('addForm')"
              size="mini"
            >{{
              $t(`project.confirm`)
            }}</el-button>
          </span>
        </div>
      </el-form>
    </el-dialog>

    <el-dialog
      title="Project Calendar"
      :visible.sync="visible1"
      width="55%"
    >
      <ProjectDesc
        style="padding-top: 0rem; margin-left: 0.6rem; margin-right: 0.3rem"
        :projectDescs="projectDescs"
      >
      </ProjectDesc>
    </el-dialog>
  </div>
</template>

<script>
import pageHeader from "@/components/pageHeader/index.vue";
import {
  batchAdd,
  selectProjectItemQueryAndPage,
  updateProjectItem,
  deleteProjectItemById,
  insertProjectItem,
} from "@/api/project";
import { getProjectDescs } from "@/api/board";
import ProjectDesc from "@/view/screen/components/projectDesc/index.vue";
import store from "@/store";
export default {
  name: "data-project",
  components: {
    ProjectDesc,
    pageHeader,
  },
  data() {
    return {
      base_api: process.env.VUE_APP_BASE_API,
      pageVo: {},
      currentUpdateId: 0,
      updateForm: {},
      addForm: {
        subject: '',
        content: '',
        month: ''
      },
      excelData: [],
      tableVisable: false,
      headers: {
        token: store.getters.token,
      },
      page: {
        pageSize: 10,
        pageNum: 1,
        queryCondition: {
          subject: "",
          year: null,
          month: null,
        },
      },
      title: "",
      visible: false,
      form: "",
      subjects: [
        {
          value: "LAUNCHES",
          label: "LAUNCHES",
        },
        {
          value: "SPM/RPM",
          label: "SPM/RPM",
        },
        {
          value: "PROMOTIONS",
          label: "PROMOTIONS",
        },
      ],
      visible1: false,
      projectDescs: [],
    };
  },
  computed: {
    rules() {
      return {
        content: [
          {
            required: true,
            message: this.$t(`project.contentPlaceholder`),
            trigger: "blur",
          },
        ],
        month: [
          {
            required: true,
            message: this.$t(`project.monthPlaceholder`),
            trigger: "blur",
          },
        ],
        subject: [
          {
            required: true,
            message: this.$t(`project.subjectPlaceholder`),
            trigger: "blur",
          },
        ],
      };
    },
  },
  created() {
    // 实例被创建之后执行代码
    this.getProjects();
    this.getProjectDescs();
  },
  methods: {
    // 方法
    openDialog() {
      this.title = this.$t(`project.addDialogTitle`);
      this.visible = true;
      for (let i in this.addForm) {
        this.addForm[i] = ''
      }
      // 清除表单验证
      this.$nextTick(() => {
        this.$refs.addForm.clearValidate();
      })
    },
    async getProjects() {
      const { data: res } = await selectProjectItemQueryAndPage(this.page);
      if (res.code == 200) {
        this.pageVo = res.data;
      }
    },
    update(row) {
      console.log(row.itemId);
      this.currentUpdateId = row.itemId;
      this.updateForm = row; //此处应当传对象中对应键的值，而不是传引用
    },
    async deleteProject(itemId) {
      this.$confirm(this.$t(`project.deleteTips`), this.$t(`project.tips`), {
        confirmButtonText: this.$t(`project.confirm`),
        cancelButtonText: this.$t(`project.cancel`),
        type: "warning",
      })
        .then(async () => {
          const { data: res } = await deleteProjectItemById(itemId);
          if (res.code == 200) {
            this.$message({
              type: "success",
              message: this.$t(`clock.operationOK`),
            });
            this.getProjects();
            this.getProjectDescs();
          } else {
            this.$message({
              type: "warning",
              message: this.$t(`clock.operationError`),
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
    cancelUpdate() {
      this.getProjects();
      (this.currentUpdateId = 0), (this.updateForm = {});
      // this.$message({
      //   type: "info",
      //   message: this.$t(`clock.cancelTooltip`),
      // });
    },
    async confireUpdate() {
      console.log(this.updateForm);
      const { data: res } = await updateProjectItem(this.updateForm);
      if (res.code == 200) {
        this.$message({
          type: "success",
          message: this.$t(`clock.operationOK`),
        });
        this.getProjects();
        this.getProjectDescs();
        this.currentUpdateId = 0;
        this.updateForm = {};
      } else {
        this.$message({
          type: "warning",
          message: this.$t(`clock.operationError`),
        });
      }
    },
    async submit(addForm) {
      // const { data: res } = await insertProjectItem(this.addForm);
      // if (res.code == 200) {
      //   this.$message({
      //     type: "success",
      //     message: "Add project successfully!",
      //   });
      //   this.getProjects();
      //   this.getProjectDescs();
      //   this.addForm = {};
      // } else {
      //   this.$message({
      //     type: "warning",
      //     message: res.msg,
      //   });
      // }
      // this.visible = false;
      this.$refs[addForm].validate((valid) => {
        if (valid) {
          insertProjectItem(this.addForm).then((res) => {
            if (res.data.code == 200) {
              this.$message({
                type: "success",
                message: this.$t(`clock.operationOK`),
              });
              for (let i in this.addForm) {
                this.addForm[i] = "";
              }
              this.visible = false;
              this.getProjects();
              this.getProjectDescs();
            }
          });
        } else {
          // console.log("error submit!!");
          return false;
        }
      });
    },
    handleSuccess(res) {
      if (res.code == 200) {
        this.excelData = res.data;
        this.tableVisable = true;
      }
    },
    async submitToBatch() {
      console.log(this.excelData);
      const { data: res } = await batchAdd(this.excelData);
      if (res.code == 200) {
        this.$message({
          type: "success",
          message: this.$t(`clock.operationOK`),
        });
      }
    },
    handleCurrentChange(val) {
      this.page.pageNum = val;
      this.getProjects();
    },
    handleSizeChange(val) {
      this.page.pageSize = val;
      this.getProjects();
    },
    formatTime(row, column) {
      if (column.label === this.$t(`project.month`)) {
        const t1 = new Date(row.month);
        const month1 = t1.getMonth() + 1;
        const year1 = t1.getFullYear();
        return year1 + "/" + month1;
      }
    },
    async getProjectDescs() {
      const { data: res } = await getProjectDescs();
      console.log(`打印project desc`, res);
      if (res.code == 200) {
        this.projectDescs = res.data;
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
.table-card {
  margin: 20px 20px;
}

.project-container {
  padding: 0 0.6rem 1rem 0.6rem;

  .new-create {
    display: flex;
    padding-bottom: 20px;

    .create-button {
      margin-right: 15px;
    }
  }
}

.el-input {
  width: 95%;
}
</style>

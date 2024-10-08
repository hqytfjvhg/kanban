<template>
  <div id="seeTeam" class="seeTeam-container">
    <!-- <el-form :model="form" label-width="50" size="mini">
      <el-form-item label="Dept:">
        <el-input v-model="form.memberDept"></el-input>
      </el-form-item>
      <el-form-item label="name:">
        <el-input v-model="form.memberName"></el-input>
      </el-form-item>
      <el-form-item label="email:">
        <el-input v-model="form.memberEmail"></el-input>
      </el-form-item>
      <el-form-item label="duty:">
        <el-input v-model="form.duty"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submit">Add</el-button>
      </el-form-item>
      <el-form-item>
        <el-upload class="upload-demo" :action="base_api + '/info_screen/member/excel/handler'" multiple :limit="1"
          :on-success="handleSuccess" :headers="headers">
          <el-button size="small" type="primary">点击上传excel</el-button>
        </el-upload>
      </el-form-item>
    </el-form> -->
    <div class="new-create">
      <el-button
        class="create-button"
        type="success"
        @click="openDialog(1)"
        size="mini"
        ><i class="el-icon-plus"></i>{{ $t(`clock.addMember`) }}</el-button
      >
      <!-- <el-upload :action="base_api + '/info_screen/overstock/excel/handler'" multiple :limit="1" :on-success="handleSuccess" :headers="headers">
          <el-button size="mini" type="primary">批量新增 (excel)</el-button>
      </el-upload> -->
    </div>
    <div class="table" style="padding: 10px">
      <el-table
        class="table-content"
        stripe
        :data="members"
        :border="true"
        :height="innerHeight"
        style="width: 100%; margin: 0 auto"
      >
        <el-table-column
          align="center"
          type="index"
          :label="$t(`clock.index`)"
          width="60"
        ></el-table-column>
        <el-table-column
          prop="memberDept"
          :label="$t(`clock.department`)"
          align="center"
        >
          <template slot-scope="scope">
            <el-input
              v-if="scope.row.id == currentUpdateId"
              v-model="updateForm.memberDept"
            ></el-input>
            <span v-else>{{ scope.row.memberDept }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="memberName"
          :label="$t(`clock.name`)"
          align="center"
        >
          <template slot-scope="scope">
            <el-input
              v-if="scope.row.id == currentUpdateId"
              v-model="updateForm.memberName"
            ></el-input>
            <span v-else>{{ scope.row.memberName }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="avatar"
          :label="$t(`clock.avatar`)"
          width="130"
          align="center"
        >
          <template slot-scope="scope">
            <div v-if="scope.row.id == currentUpdateId">
              <el-upload
                class="avatar-uploader"
                :action="base_api + '/info_screen/member/avatar/upload'"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
              >
                <img
                  v-if="updateForm.avatar"
                  :src="base_api + updateForm.avatar"
                  class="avatar"
                  style="border-radius: 50%; width: 50px; height: 50px"
                />
                <i
                  v-else
                  class="el-icon-plus avatar-uploader-icon"
                  style="font-size: 20px; padding: 20px"
                ></i>
              </el-upload>
            </div>
            <div v-else>
              <el-avatar
                v-if="scope.row.avatar == null"
                :size="42"
                src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
                class="avatar"
              />
              <el-avatar
                v-else
                :size="42"
                :src="base_api + scope.row.avatar"
                class="avatar"
              />
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="memberEmail"
          :label="$t(`clock.email`)"
          align="center"
        >
          <template slot-scope="scope">
            <el-input
              v-if="scope.row.id == currentUpdateId"
              v-model="updateForm.memberEmail"
            ></el-input>
            <span v-else>{{ scope.row.memberEmail }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="duty" :label="$t(`clock.duty`)" align="center">
          <template slot-scope="scope">
            <el-input
              v-if="scope.row.id == currentUpdateId"
              v-model="updateForm.duty"
            ></el-input>
            <span v-else>{{ scope.row.duty }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="statu"
          :label="$t(`clock.state`)"
          width="80"
          align="center"
        >
          <template slot-scope="scope">
            <el-switch
              @change="changeStatus(scope.row.id)"
              v-model="scope.row.statu"
              active-color="#13ce66"
              inactive-color="#ff4949"
            >
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column
          :label="$t(`clock.operation`)"
          align="center"
          width="180"
        >
          <template slot-scope="scope">
            <div
              v-if="scope.row.id == currentUpdateId"
              style="display: flex; justify-content: center; cursor: pointer"
            >
              <!-- <el-button
                round
                size="mini"
                type="success"
                @click="confirmUpdate"
                >{{ $t(`clock.confirm`) }}</el-button
              >
              <el-button
                round
                size="mini"
                type="warning"
                @click="cancelUpdate"
                >{{ $t(`clock.cancel`) }}</el-button
              > -->
              <div @click="confirmUpdate" style="color: #409eff">

                <span>{{ $t(`clock.confirm`) }}</span>
              </div>
              <div
                @click="cancelUpdate"
                style="color: #409eff; margin-left: 10px"
              >
                <span>{{ $t(`clock.cancel`) }}</span>
              </div>
            </div>
            <div
              v-if="scope.row.id != currentUpdateId"
              style="display: flex; justify-content: center; cursor: pointer"
            >
              <!-- <el-button
                round
                size="mini"
                type="primary"
                @click="update(scope.row)"
                >{{ $t(`clock.update`) }}</el-button
              >
              <el-button
                round
                size="mini"
                type="danger"
                @click="deleteMember(scope.row.id)"
                >{{ $t(`clock.delete`) }}</el-button
              > -->
              <div @click="update(scope.row)" style="color: #409eff">
                <span>{{ $t(`clock.update`) }}</span>
              </div>
              <div
                @click="deleteMember(scope.row.id)"
                style="color: #409eff; margin-left: 10px"
              >
                <i class="el-icon-delete"></i
                ><span>{{ $t(`clock.delete`) }}</span>
              </div>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <!-- </el-card> -->
    </div>

    <div class="table" v-if="tableVisable">
      <el-card class="table-card">
        <div slot="header" class="clearfix">
          <span>excel data</span>
          <el-button
            style="float: right; padding: 3px 0"
            type="primary"
            @click="submitToBatch"
            >confirm batch add</el-button
          >
        </div>
        <el-table
          class="table-content"
          :data="excelData"
          border="true"
          style="width: 60%; margin: 0 auto"
        >
          <el-table-column
            prop="memberDept"
            label="dept"
            width="150"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="memberName"
            label="name"
            width="130"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="avatar"
            label="avatar"
            width="130"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="memberEmail"
            label="email"
            width="180"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="duty"
            label="duty"
            align="center"
          ></el-table-column>
        </el-table>
      </el-card>
    </div>

    <el-dialog
      :title="dialogTitle"
      :visible.sync="dialogVisible"
      width="75%"
      :append-to-body="true"
    >
      <chooseList
        :clockId="clockId"
        @fatherMethod="closeChooseList"
      ></chooseList>
    </el-dialog>
  </div>
</template>

<script>
import {
  getMembersByClockId,
  insert,
  updateStatu,
  batchAdd,
  updateMember,
  deleteById,
} from "@/api/member";
import chooseList from "./components/chooseList.vue";
import store from "@/store";
export default {
  components: { chooseList },
  name: "teamComponent",
  props: {
    clockId: {
      type: Number,
      default: 1,
    },
  },
  data() {
    return {
      members: [],
      form: {},
      headers: { token: store.getters.token },
      tableVisable: false,
      excelData: [],
      updateForm: {},
      currentUpdateId: 0,
      base_api: process.env.VUE_APP_BASE_API,
      innerHeight: 500,
      dialogTitle: this.$t(`clock.memberList`),
      dialogVisible: false,
    };
  },
  created() {
    // 实例被创建之后执行代码
    this.getHeight();
    this.getMembers();
  },
  methods: {
    // 方法
    openDialog(type) {
      if (type === 1) {
        (this.dialogTitle = this.$t(`clock.memberList`)),
          (this.dialogVisible = true);
      }
    },
    closeChooseList(val) {
      this.dialogVisible = false;
      if (val) {
        this.getMembers();
      }
    },
    getHeight() {
      let inner = document.documentElement.clientHeight;
      this.innerHeight = Math.round(inner * 0.75);
    },
    async getMembers() {
      const { data: res } = await getMembersByClockId(this.clockId);
      console.log(res.data);
      if (res.code == 200) {
        this.members = res.data;
      }
    },
    handleSuccess(res) {
      if (res.code == 200) {
        this.tableVisable = true;
        this.excelData = res.data;
      }
    },
    async submit() {
      console.log("submit");
      this.form.clockId = this.clockId;
      const { data: res } = await insert(this.form);
      if (res.code == 200) {
        this.$message({
          type: "success",
          message: this.$t(`clock.operationOK`),
        });
        this.form = {};
      }
      this.getMembers();
    },
    async changeStatus(id) {
      const { data: res } = await updateStatu(id);
      if (res.code == 200) {
        this.$message({
          type: "success",
          message: this.$t(`clock.operationOK`),
        });
        this.getMembers();
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
      this.getMembers();
    },
    update(row) {
      console.log(row);
      this.currentUpdateId = row.id;
      this.updateForm = row;
    },
    async deleteMember(id) {
      // console.log(id);
      this.$confirm(this.$t(`clock.deleteMember`), this.$t(`clock.tooltip`), {
        confirmButtonText: this.$t(`clock.buttonOk`),
        cancelButtonText: this.$t(`clock.buttonCancel`),
        type: "warning",
      })
        .then(async () => {
          const { data: res } = await deleteById(id);
          if (res.code == 200) {
            this.$message({
              type: "success",
              message: this.$t(`clock.operationOK`),
            });
            this.getMembers();
          } else {
            this.$message({
              type: "warning",
              message: this.$t(`clock.operationError`),
            });
          }
        })
        .catch((e) => {
          this.$message({
            type: "info",
            message: this.$t(`clock.cancelTooltip`),
          });
        });
    },
    cancelUpdate() {
      this.getMembers();
      this.currentUpdateId = 0;
      this.updateForm = {};
      this.$message({
            type: "info",
            message: this.$t(`clock.cancelTooltip`),
          });
    },
    async confirmUpdate() {
      console.log(this.updateForm);
      console.log(this.clockId);
      const { data: res } = await updateMember(this.updateForm);
      if (res.code == 200) {
        this.$message({
          type: "success",
          message: this.$t(`clock.operationOK`),
        });
        this.currentUpdateId = 0;
        this.updateForm = {};
        this.getMembers();
      } else {
        this.$message({
          type: "error",
          message: this.$t(`clock.operationError`),
        });
      }
    },
    handleAvatarSuccess(res) {
      if (res.code == 200) {
        this.updateForm.avatar = "\\" + res.data;
      } else {
        this.$message({
          type: "warning",
          message: res.msg,
        });
      }
    },
  },
  mounted() {
    window.onresize = () => {
      return (() => {
        this.getHeight();
      })();
    };
  },
};
</script>
<style lang='scss' scoped>
.new-create {
  display: flex;
  padding-bottom: 20px;

  .create-button {
    margin: 0 20px;
  }
}

.el-form {
  display: flex;
  padding: 0 20px;

  .el-form-item {
    display: flex;
    margin-right: 15px;
  }
}

.table-card {
  margin: 0 20px;
}

.el-card ::v-deep .el-card__header {
  border: none;
}

.el-card ::v-deep.el-drawer__header {
  border: 1px solid red;
}
</style>
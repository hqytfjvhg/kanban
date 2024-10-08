<template>
  <div class="user-container">
    <pageHeader
      :title="$t(`user.pageTitle`)"
      :describe="$t(`user.pageDesc`)"
    ></pageHeader>
    <el-form
      :inline="true"
      size="mini"
      class="form-box"
      style="display: flex; width: calc(100% - 1rem) ;padding-left:1rem"
    >
      <el-form-item :label="$t(`user.username`)">
        <el-input
          v-model="page.queryCondition.username"
          clearable
          :placeholder="$t(`user.usernamePlaceHolder`)"
        ></el-input>
      </el-form-item>
      <el-form-item :label="$t(`user.phone`)">
        <el-input
          v-model="page.queryCondition.phone"
          clearable
          :placeholder="$t(`user.phonePlaceHolder`)"
        ></el-input>
      </el-form-item>
      <el-form-item style="margin-right: 1px">
        <el-button icon="el-icon-search" type="primary" @click="getUserList">{{
          $t(`user.query`)
        }}</el-button>
        <el-button
          icon="el-icon-edit"
          type="primary"
          @click="saveDialog = true"
          style="margin-left: 15px;"
          >{{ $t(`user.save`) }}</el-button
        >
      </el-form-item>
    </el-form>

    <el-table :data="records" stripe border>
      <el-table-column
        align="center"
        :label="$t(`user.index`)"
        type="index"
        width="60"
      />
      <el-table-column
        prop="username"
        :label="$t(`user.username`)"
        align="center"
      />
      <el-table-column prop="phone" :label="$t(`user.phone`)" align="center" />
      <el-table-column prop="email" :label="$t(`user.email`)" align="center" />
      <el-table-column prop="roleList" :label="$t(`user.role`)" align="center">
        <template slot-scope="scope">
          <span>{{
            scope.row.roleList.length == 0 ? "暂未分配" : scope.row.roleList
          }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="state"
        :label="$t(`user.freezing`)"
        width="80"
        align="center"
      >
        <template slot-scope="scope">
          <el-switch
            @change="changeState(scope.row)"
            v-model="scope.row.state"
            active-color="#13ce66"
            inactive-color="#ff4949"
          >
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column
        prop="gmtCreate"
        :label="$t(`user.createAt`)"
        align="center"
      />
      <el-table-column
        prop="gmtModified"
        :label="$t(`user.updateAt`)"
        align="center"
      />
      <el-table-column :label="$t(`user.operation`)" align="center" width="240">
        <template slot-scope="scope">
          <!-- <el-link
            type="primary"
            @click="openDialog(scope.row.roles, scope.row.userId)"
            size="mini"
            style="padding: 0 10px"
            >{{ $t(`user.assignRole`) }}</el-link
          >
          <el-link
            type="danger"
            size="mini"
            style="padding: 0 10px"
            @click="openUpdate(scope.row)"
            >{{ $t(`user.edit`) }}</el-link
          >
          <el-link
            type="danger"
            @click="delectById(scope.row.userId)"
            size="mini"
            style="padding: 0 10px"
            >{{ $t(`user.delete`) }}</el-link
          > -->
          <div style="display: flex; justify-content: center; cursor: pointer">
            <div
              @click="openDialog(scope.row.roles, scope.row.userId)"
              style="color: #409eff; "
            >
              <span>{{ $t(`user.assignRole`)  }}</span>
            </div>
            <div
              @click="openUpdate(scope.row)"
              style="color: #409eff;margin-left: 10px "
            >
              <span>{{ $t(`user.edit`)  }}</span>
            </div>
            <div
              @click="delectById(scope.row.userId)"
              style="color: #409eff; margin-left: 10px"
            >
              <span>{{ $t(`user.delete`) }}</span>
            </div>
          </div>
        </template>
      </el-table-column>
    </el-table>
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

    <el-dialog
      :title="$t(`user.dialogTitle1`)"
      :visible.sync="visible"
      width="35%"
    >
      <el-form :model="form" label-width="120px">
        <el-checkbox-group
          v-model="roles"
          class="el-checkbox-style"
          :max="1"
          :min="0"
        >
          <el-checkbox
            class="el-checkbox-item"
            v-for="item in roleList"
            :key="item.roleId"
            :label="item.roleName"
          ></el-checkbox>
        </el-checkbox-group>
        <el-button
          class="sub-button"
          size="mini"
          type="primary"
          @click="submit"
          style="margin: 1rem auto; display: block"
          >{{ $t(`user.confirm`) }}</el-button
        >
      </el-form>
    </el-dialog>

    <!-- 新增用户dialog -->
    <el-dialog :title="$t(`user.save`)" :visible.sync="saveDialog" width="35%">
      <el-form
        :model="saveForm"
        ref="saveForm"
        label-width="120px"
        size="mini"
        :rules="rules"
      >
        <el-form-item :label="$t(`user.username`)" prop="username">
          <el-input v-model="saveForm.username" clearable></el-input>
        </el-form-item>
        <el-form-item :label="$t(`user.password`)" prop="password">
          <el-input
            v-model="saveForm.password"
            type="password"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item :label="$t(`user.phone`)" prop="phone">
          <el-input v-model="saveForm.phone" clearable></el-input>
        </el-form-item>
        <el-form-item :label="$t(`user.email`)" prop="email">
          <el-input v-model="saveForm.email" clearable></el-input>
        </el-form-item>
        <el-button
          class="sub-button"
          size="mini"
          type="primary"
          @click="submitSave"
          style="margin: 1rem auto; display: block"
          >confirm</el-button
        >
      </el-form>
    </el-dialog>

    <!-- 修改用户dialog -->
    <el-dialog
      :title="$t(`user.edit`)"
      :visible.sync="updateDialog"
      width="35%"
    >
      <el-form
        :model="updateForm"
        ref="updateForm"
        label-width="120px"
        size="mini"
        :rules="updateRules"
      >
        <el-form-item :label="$t(`user.username`)" prop="username">
          <el-input v-model="updateForm.username" clearable></el-input>
        </el-form-item>
        <el-form-item :label="$t(`user.phone`)" prop="phone">
          <el-input v-model="updateForm.phone" clearable></el-input>
        </el-form-item>
        <el-form-item :label="$t(`user.email`)" prop="email">
          <el-input v-model="updateForm.email" clearable></el-input>
        </el-form-item>
        <el-button
          class="sub-button"
          size="mini"
          type="primary"
          @click="submitUpdate"
          style="margin: 1rem auto; display: block"
          >confirm</el-button
        >
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import pageHeader from "@/components/pageHeader/index.vue";
import store from "@/store";
import {
  getUserList,
  getRoleList,
  deleteUser,
  batchAddRole,
  updateState,
  saveUser,
  updateUser,
} from "@/api/system";
export default {
  components: {
    pageHeader,
  },
  data() {
    return {
      records: [],
      visible: false,
      saveDialog: false,
      updateDialog: false,
      form: {},
      roleList: [],
      roles: [],
      userId: "", //
      currentAdminId: "",
      queryCondition: {},
      rules: {
        username: [
          { required: true, message: "username is required", trigger: "blur" },
        ],
        password: [
          { required: true, message: "password is required", trigger: "blur" },
        ],
      },
      updateRules: {
        username: [
          { required: true, message: "username is required", trigger: "blur" },
        ],
      },
      saveForm: {
        username: "",
        password: "",
        phone: "",
        email: "",
        state: "",
      },
      updateForm: {
        userId: "",
        username: "",
        password: "",
        phone: "",
        email: "",
        state: "",
      },
      page: {
        pageSize: 10,
        pageNum: 1,
        total: 1000,
        queryCondition: {},
      },
      role: store.getters.role,
    };
  },
  created() {
    this.userId = localStorage.getItem("username");
    this.getUserList();
    this.getRoleList();
  },
  methods: {
    openUpdate(row) {
      this.updateForm = JSON.parse(JSON.stringify(row));
      this.updateDialog = true;
    },
    // 确认修改用户
    submitUpdate() {
      this.$refs["updateForm"].validate((valid) => {
        if (valid) {
          updateUser(this.updateForm).then(() => {
            this.$message.success("Success");
            this.updateDialog = false;
            setTimeout(() => {
              this.getUserList();
            }, 10);
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 新增用户
    submitSave() {
      this.$refs["saveForm"].validate((valid) => {
        if (valid) {
          saveUser(this.saveForm).then(() => {
            this.$message.success("Success");
            this.saveDialog = false;
            setTimeout(() => {
              this.resetForm("saveForm");
              this.getUserList();
            }, 10);
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 重置表单
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    // 获取角色列表
    async getRoleList() {
      const { data: res } = await getRoleList();
      let data = res.data;
      this.roleList = data;
      // {roleId: 1, roleName: '超级管理员'}
    },
    openDialog(roles, id) {
      let array = [];
      for (let a = 0; a < roles.length; a++) {
        array.push(roles[a].roleName);
      }
      this.visible = true;
      this.roles = array;
      this.currentAdminId = id;
      this.form = {};
    },
    async submit() {
      var that = this;
      let selectOptions = [];
      that.roleList.forEach(function (item) {
        if (that.roles.includes(item.roleName)) {
          selectOptions.push(item.roleId);
        }
      });
      let data = {
        roleIds: selectOptions,
        userId: this.currentAdminId,
      };
      await batchAddRole(data).then(() => {
        that.$message.success("分配成功");
        that.visible = false;
        that.getUserList();
      });
    },
    async delectById(userId) {
      this.$confirm("确认删除此用户吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          const { data: res } = await deleteUser(userId);
          if (res.code == 200) {
            this.$message({
              type: "success",
              message: "Delete user successfully!",
            });
            this.getUserList();
          } else {
            this.$message({
              type: "warning",
              message: "Failed to delete user!",
            });
          }
        })
        .catch((e) => {
        //   console.log(e);
        this.$message({
            type: "info",
            message: this.$t(`clock.cancelTooltip`),
          });
        });
    },
    async getUserList() {
      var that = this;
      const { data: res } = await getUserList(this.page);
      console.log(res);
      let data = res.data.data;
      this.page.total = res.data.total;
      data.forEach(function (item, index) {
        data[index].roleList = that.getRole(item.roles);
      });
      this.records = data;
    },
    getRole(list) {
      let result = "";
      list.forEach(function (item) {
        result += (result ? "," : "") + item.roleName;
      });
      return result;
    },
    handleCurrentChange(val) {
      this.page.pageNum = val;
      this.getUserList();
    },
    handleSizeChange(val) {
      this.page.pageSize = val;
      this.getUserList();
    },
    async changeState(user) {
      if (this.$store.getters.username == user.username) {
        this.$message({
          type: "warning",
          message: "Cannot modify your own status.",
        });
      } else {
        const { data: res } = await updateState(user.username, user.state);
        if (res.code == 200) {
          this.$message({
            type: "success",
            message: "Updating state successfully.",
          });
        } else {
          this.$message({
            type: "warning",
            message: "Updating state fail.",
          });
        }
      }
      this.getUserList();
    },
  },
};
</script>

<style lang='scss' scoped>
.el-checkbox-style {
  display: flex;

  .el-checkbox-item {
    width: 25%;
  }
}

.sub-button {
  margin-top: 20px;
}

.user-container {
  padding: 0 0.6rem 1rem 0.6rem;
}

.new-create {
  display: flex;
  padding-bottom: 20px;

  .create-button {
    margin-right: 15px;
  }
}

.el-pagination {
  padding: 20px 0;
}

.el-checkbox {
  margin: 0;
  color: #888 !important;
}

.el-form {
  .el-form-item {
    margin: 0 20px 8px 0;

    .item-label {
      margin-right: 10px;
      font-size: 1rem;
    }
  }
}

.el-form-item__content {
  display: flex !important;
}

::v-deep .el-dialog__body {
  padding-top: 1rem;
}
</style>
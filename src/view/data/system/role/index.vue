<template>
  <div class="user-container">
    <pageHeader
      :title="$t(`role.pageTitle`)"
      :describe="$t(`role.pageDesc`)"
    ></pageHeader>
    <el-button
      type="primary"
      size="mini"
      style="margin-bottom: 12px; margin-left: 1rem"
      @click="openAdd"
    >
      <i class="el-icon-plus"></i>{{ $t(`role.add`) }}</el-button
    >
    <el-table :data="records" stripe border>
      <el-table-column
        align="center"
        :label="$t(`role.index`)"
        type="index"
        width="60"
      ></el-table-column>
      <el-table-column
        prop="roleName"
        :label="$t(`role.role`)"
        align="center"
      ></el-table-column>
      <el-table-column :label="$t(`role.operation`)" align="center">
        <template slot-scope="scope">
          <!-- <el-link
            type="primary"
            @click="openDialog(scope.row)"
            size="mini"
            style="padding: 0 20px"
            >{{ $t(`role.edit`) }}</el-link
          >
          <el-link
            type="danger"
            v-if="scope.row.roleId !== 1 && scope.row.roleId !== 15"
            @click="delectById(scope.row.roleId)"
            size="mini"
            style="padding: 0 20px"
            >{{ $t(`role.delete`) }}</el-link
          >
          <el-link
            type="primary"
            @click="assignMenu(scope.row)"
            size="mini"
            style="padding: 0 20px"
            >{{ $t(`role.assignMenu`) }}</el-link
          >
          <el-link
            type="primary"
            @click="assignResource(scope.row)"
            size="mini"
            style="padding: 0 20px"
            >{{ $t(`role.assignResource`) }}</el-link
          >
        </template> -->
          <div style="display: flex; justify-content: center; cursor: pointer">
            <div @click="openDialog(scope.row)" style="color: #409eff">
              <span>{{ $t(`role.edit`) }}</span>
            </div>
            <div
              v-if="scope.row.roleId !== 1 && scope.row.roleId !== 15"
              @click="delectById(scope.row.roleId)"
              style="color: #409eff; margin-left: 10px"
            >
              <span>{{ $t(`role.delete`) }}</span>
            </div>
            <div
              @click="assignMenu(scope.row)"
              style="color: #409eff; margin-left: 10px"
            >
              <span>{{ $t(`role.assignMenu`) }}</span>
            </div>
            <div
              @click="assignResource(scope.row)"
              style="color: #409eff; margin-left: 10px"
            >
              <span>{{ $t(`role.assignResource`) }}</span>
            </div>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :title="dialog.title" :visible.sync="dialog.visible" width="35%">
      <el-form
        status-icon
        :rules="rules"
        :model="formData"
        label-width="100px"
        ref="formData"
      >
        <el-form-item label="角色名称:" prop="roleName">
          <el-input type="text" v-model="formData.roleName" />
        </el-form-item>
        <el-button
          class="sub-button"
          size="mini"
          type="primary"
          @click="submitForm('formData')"
          >{{ $t(`role.confirm`) }}</el-button
        >
      </el-form>
    </el-dialog>

    <el-drawer
      :title="drawer1.title"
      :visible.sync="drawer1.visible"
      direction="rtl"
      size="20%"
    >
      <assignMenu
        v-bind:role="role"
        :key="role.roleId"
        @fatherMethod="setDrawer1"
      ></assignMenu>
    </el-drawer>

    <el-drawer
      :title="drawer2.title"
      :visible.sync="drawer2.visible"
      direction="rtl"
      size="20%"
    >
      <assignResource
        v-bind:role="role"
        :key="role.roleId"
        @fatherMethod="setDrawer2"
      ></assignResource>
    </el-drawer>
  </div>
</template>

<script>
import { getRoleList } from "@/api/system";
import { add, update, deleteData } from "@/api/role";
import assignMenu from "./assign-menu.vue";
import assignResource from "./assign-resource.vue";
import pageHeader from "@/components/pageHeader/index.vue";
export default {
  components: {
    assignMenu,
    assignResource,
    pageHeader,
  },
  data() {
    return {
      records: [],
      dialog: {
        visible: false,
        title: "",
      },
      formData: {},
      rules: {
        roleName: [
          { required: true, message: "请输入角色名称", trigger: "blur" },
        ],
      },
      roleId: 0,
      drawer1: {
        title: "",
        visible: false,
      },
      drawer2: {
        title: "",
        visible: false,
      },
      role: {},
    };
  },
  created() {
    this.getRoleList();
  },
  methods: {
    delectById(id) {
      this.$confirm("确认删除此角色吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          deleteData(id).then((response) => {
            if (response.data.code == 200) {
              this.$message.success("删除成功");
              this.getRoleList();
            } else {
              this.$message.error("删除失败");
            }
          });
        })
        .catch((e) => {
          console.log(e);
        });
    },

    openDialog(data) {
      this.formData.roleName = data.roleName;
      this.formData.roleId = data.roleId;
      this.dialog.visible = true;
      this.dialog.title = "更新";
      this.$nextTick(() =>{
        this.$refs.formData.clearValidate();
      })
    },

    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.submitData();
        } else {
          return false;
        }
      });
    },

    async submitData() {
      let data = {
          roleId: this.formData.roleId,
          roleName: this.formData.roleName,
        },
        response = null;
      if (this.dialog.title == "新增") {
        response = await add(data);
        console.log("response1", response);
      } else {
        response = await update(data);
        console.log("response1", response);
      }
      this.$message({
        type: response.data.code == 200 ? "success" : "error",
        message: response.data.code == 200 ? "保存成功" : "保存失败",
      });
      this.$refs["formData"].resetFields();
      this.dialog.visible = false;
      this.getRoleList();
    },

    openAdd() {
      this.formData = {};
      this.formData.roleId = 0;
      this.dialog.visible = true;
      this.dialog.title = "新增";
      this.$nextTick(() =>{
        this.$refs.formData.clearValidate();
      })
    },

    async getRoleList() {
      const { data: res } = await getRoleList();
      this.records = res.data;
      console.log(this.records);
    },
    assignMenu(role) {
      this.role = role;
      this.drawer1.title = "分配菜单：" + role.roleName;
      this.drawer1.visible = true;
    },
    assignResource(role) {
      this.role = role;
      this.drawer2.title = "分配资源权限：" + role.roleName;
      this.drawer2.visible = true;
    },
    setDrawer1() {
      console.log(`调用父方法`);
      this.drawer1.visible = false;
    },
    setDrawer2() {
      console.log(`调用父方法`);
      this.drawer2.visible = false;
    },
  },
};
</script>

<style lang='scss' scoped>
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

::v-deep .el-dialog .el-dialog__body {
  padding-top: 10px;

  .sub-button {
    margin-top: 10px;
  }
}

::v-deep .el-form {
  .el-form-item__label {
    text-align: left;
  }

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
</style>
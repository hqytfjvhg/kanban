<!--  -->
<template>
  <div class="members-container">
    <el-form
      :model="formData"
      label-width="50"
      size="mini"
      :rules="rules"
      ref="formData"
    >
      <el-form-item :label="$t(`clock.department`)" prop="memberDept">
        <el-input
          v-model="formData.memberDept"
          :placeholder="$t(`clock.depPlaceholder`)"
        />
      </el-form-item>
      <el-form-item :label="$t(`clock.name`)" prop="memberName">
        <el-input
          v-model="formData.memberName"
          :placeholder="$t(`clock.namePlaceholder`)"
        />
      </el-form-item>
      <el-form-item :label="$t(`clock.email`)" prop="memberEmail">
        <el-input
          v-model="formData.memberEmail"
          :placeholder="$t(`clock.emailPlaceholder`)"
        />
      </el-form-item>
      <el-form-item :label="$t(`clock.duty`)" prop="duty">
        <el-input
          v-model="formData.duty"
          :placeholder="$t(`clock.jobPlaceholder`)"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submit('formData')">
          <i class="el-icon-plus"></i>{{ $t(`clock.add`) }}</el-button
        >
      </el-form-item>
      <el-form-item>
        <el-upload
          class="upload-demo"
          :action="base_api + '/info_screen/member/excel/handler'"
          multiple
          :limit="1"
          :on-success="handleSuccess"
          :headers="headers"
          ref="uploadRef"
          :before-upload="beforeUpload"
          :show-file-list="false"
        >
          <el-button size="small" type="primary" @click="clearVerify"
            ><i class="el-icon-upload2"></i>{{ $t(`clock.upload`) }}</el-button
          >
        </el-upload>
      </el-form-item>
      <el-form-item>
        <!-- <a :href="base_api + '/' + 'template/Team_Contact.xlsx'">{{
          $t(`excelTemplate.downloadTemplate`)
        }}</a> -->
        <el-button type="primary" size="mini" @click="clearVerify">
          <i class="el-icon-download"></i>
          <a
            :href="base_api + '/' + 'template/Team_Contact.xlsx'"
            style="margin: 0.3rem 0.5rem 0.3rem 0; color: #fff"
            >{{ $t(`excelTemplate.downloadTemplate`) }}</a
          >
        </el-button>
      </el-form-item>
    </el-form>
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
          <!-- <el-button
            round
            size="mini"
            type="success"
            @click="confirmUpdate"
            v-if="scope.row.id == currentUpdateId"
            >{{ $t(`clock.confirm`) }}</el-button
          >
          <el-button
            round
            size="mini"
            type="warning"
            @click="cancelUpdate"
            v-if="scope.row.id == currentUpdateId"
            >{{ $t(`clock.cancel`) }}</el-button
          > -->
          <div
            style="display: flex; justify-content: center; cursor: pointer"
            v-if="scope.row.id == currentUpdateId"
          >
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
          <!-- <el-button
            round
            size="mini"
            type="primary"
            v-if="scope.row.id != currentUpdateId"
            @click="update(scope.row)"
            >{{ $t(`clock.update`) }}</el-button
          >
          <el-button
            round
            size="mini"
            type="danger"
            v-if="scope.row.id != currentUpdateId"
            @click="deleteMember(scope.row.id)"
            >{{ $t(`clock.delete`) }}</el-button
          > -->
          <div
            style="display: flex; justify-content: center; cursor: pointer"
            v-if="scope.row.id != currentUpdateId"
          >
            <div @click="update(scope.row)" style="color: #409eff">
              <span>{{ $t(`clock.update`) }}</span>
            </div>
            <div
              @click="deleteMember(scope.row.id)"
              style="color: #409eff; margin-left: 10px"
            >
              <span>{{ $t(`clock.delete`) }}</span>
            </div>
          </div>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog
      title="excel parsing data"
      :visible.sync="tableVisable"
      width="65%"
      :append-to-body="true"
    >
      <el-table
        class="table-content"
        :data="excelData"
        :border="true"
        style="width: 50%; margin: 0 auto"
        stripe
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
      <div style="text-align: center; margin: 20px 0">
        <el-button type="primary" @click="submitToBatch"> confirm </el-button>
        <el-button type="warning" @click="cancle"> cancel </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';
import {
  getMembers,
  updateStatu,
  updateMember,
  deleteById,
  insert,
  batchAdd,
} from "@/api/member";
import store from "@/store";
export default {
  // import引入的组件需要注入到对象中才能使用
  components: {},
  name: "membersList",
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
      members: [],
      updateForm: {},
      currentUpdateId: 0,
      innerHeight: 700,
      formData: {
        memberDept: "",
        memberName: "",
        memberEmail: "",
        duty: "",
      }, //
      headers: { token: store.getters.token },
      tableVisable: false,
      excelData: [],
      rules: {
        memberDept: [
          { required: true, message: this.$t(`clock.depPlaceholder`), trigger: "blur" },
        ],
        memberName: [
          { required: true, message: this.$t(`clock.namePlaceholder`), trigger: "blur" },
        ],
      },
    };
  },
  // 监听属性 类似于data概念
  computed: {},
  // 监控data中的数据变化
  watch: {},
  // 方法集合
  methods: {
    async getMembers() {
      const { data: res } = await getMembers();
      if (res.code == 200) {
        this.members = res.data;
      } else {
        this.$message({
          type: "warning",
          message: res.msg,
        });
      }
    },
    // 新增提交
    submit(formData) {
      this.$refs[formData].validate((valid) => {
        if (valid) {
          insert(this.formData).then((res) => {
            if (res.data.code == 200) {
              this.$message({
                type: "success",
                message: this.$t(`clock.operationOK`),
              });
              for (let i in this.formData) {
                this.formData[i] = "";
              }
            }
          });
        } else {
          // console.log("error submit!!");
          return false;
        }
      });
      this.getMembers();
    },
    // 清除表单校验
    clearVerify() {
      this.$refs.formData.clearValidate();
    },
    handleSuccess(res) {
      if (res.code == 200) {
        this.tableVisable = true;
        this.excelData = res.data;
        this.$refs.uploadRef.clearFiles();
      } else {
        this.$message({
          type: "warning",
          message: res.msg,
        });
      }
    },
    cancle() {
      this.tableVisable = false;
      this.excelData = [];
      this.$refs.uploadRef.clearFiles();
    },
    async changeStatus(id) {
      this.$refs.formData.clearValidate();
      const { data: res } = await updateStatu(id);
      if (res.code == 200) {
        this.$message({
          type: "success",
          message: this.$t(`clock.operationOK`),
        });
        this.getMembers();
      } else {
        this.$message({
          type: "warning",
          message: res.msg,
        });
      }
    },
    update(row) {
      // console.log(row);
      this.$refs.formData.clearValidate();
      this.currentUpdateId = row.id;
      this.updateForm = row;
    },
    async deleteMember(id) {
      this.$refs.formData.clearValidate();
      this.$confirm(this.$t(`clock.deleteMember`), this.$t(`award.tips`), {
        confirmButtonText: this.$t(`award.confirm`),
        cancelButtonText: this.$t(`award.cancel`),
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
              message: "delete member fail!",
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
      // console.log(this.updateForm)
      // console.log(this.clockId)
      this.$refs.formData.clearValidate();
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
    async submitToBatch() {
      //console.log(this.excelData)
      const { data: res } = await batchAdd(this.excelData);
      if (res.code == 200) {
        this.$message({
          type: "success",
          message: this.$t(`clock.operationOK`),
        });
        this.visible = false;
        this.excelData = [];
        this.getMembers();
      } else {
        this.$message({
          type: "warning",
          message: this.$t(`clock.operationError`),
        });
      }
    },
    beforeUpload(file) {
      const fileName = file.name;
      const rightFilename = "Team_Contact.xlsx";
      if (fileName !== rightFilename) {
        this.$confirm("请上传Team_Contact.xlsx", this.$t(`eol.tips`), {
          confirmButtonText: this.$t(`eol.confirm`),
          cancelButtonText: this.$t(`eol.cancel`),
          type: "warning",
        });
        return false;
      }
    },
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.getMembers();
  },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
  beforeCreate() {}, // 生命周期 - 创建之前
  beforeMount() {}, // 生命周期 - 挂载之前
  beforeUpdate() {}, // 生命周期 - 更新之前
  updated() {}, // 生命周期 - 更新之后
  beforeDestroy() {}, // 生命周期 - 销毁之前
  destroyed() {}, // 生命周期 - 销毁完成
  activated() {}, // 如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style lang='scss' scoped>
//  @import url(); 引入公共css类
.el-form {
  display: flex;
  padding: 0 20px;
  flex-wrap: wrap;

  .el-form-item {
    display: flex;
    margin-right: 15px;
  }
}
</style>
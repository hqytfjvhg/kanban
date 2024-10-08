<!--  -->
<template>
  <div class="eol-container">
    <pageHeader
      :title="$t(`eol.pageTitle`)"
      :describe="$t(`eol.pageDesc`)"
    ></pageHeader>
    <div class="new-create" style="margin-left: 1rem">
      <el-button
        class="create-button"
        type="primary"
        @click="openDialog(1)"
        size="mini"
        ><i class="el-icon-plus"></i>{{ $t(`eol.add`) }}</el-button
      >
      <el-upload
        :action="base_api + '/info_screen/eol/excel/handler'"
        multiple
        :limit="1"
        :on-success="handleSuccess"
        :headers="headers"
        ref="uploadRef"
        :before-upload="beforeUpload"
        :show-file-list="false"
      >
        <el-button size="mini" type="primary"
          ><i class="el-icon-upload2"></i>{{ $t(`eol.batchAdd`) }}</el-button
        >
      </el-upload>
      <el-button
        type="warning"
        size="mini"
        style="margin-left: 15px"
        @click="visible1 = true"
      >
        <!-- view -->
        <i class="el-icon-view"></i> {{ $t(`int.view`) }}
      </el-button>
      <!-- <a
        :href="base_api + '/' + 'template/EOL.xlsx'"
        style="margin: 0.3rem 0.5rem"
        >{{ $t(`excelTemplate.downloadTemplate`) }}</a
      > -->
      <el-button type="primary" size="mini" style="margin-left: 15px">
        <i class="el-icon-download"></i>
        <a
          :href="base_api + '/' + 'template/EOL.xlsx'"
          style="margin: 0.3rem 0.5rem 0.3rem 0; color: #fff"
          >{{ $t(`excelTemplate.downloadTemplate`) }}</a
        >
      </el-button>
    </div>
    <el-dialog
      :title="$t(`eol.excelDialogTitle`)"
      :visible="visible"
      @close="visible = false"
    >
      <EolTable :data="excelData" @fatherMethod="closeEolTable"></EolTable>
    </el-dialog>
    <!-- 新增 -->
    <el-dialog
      :title="dialogTitle"
      :visible="addFormVisible"
      @close="addFormVisible = false"
      width="35%"
    >
      <!-- <AddForm @fatherMethod="closeAddForm"></AddForm> -->
      <el-form
        :model="formData"
        label-width="120px"
        ref="formData"
        :rules="rules"
      >
        <el-form-item :label="$t(`eol.name`)" prop="name">
          <el-input
            type="text"
            :placeholder="$t(`eol.namePlaceholder`)"
            v-model="formData.name"
          ></el-input>
        </el-form-item>
        <el-form-item label="mQty2:">
          <el-input
            v-model="formData.mqty"
            type="number"
            placeholder="please input mqty2"
          >
          </el-input>
        </el-form-item>
        <el-form-item label="lastMQty:">
          <el-input
            v-model="formData.lastMQty"
            type="number"
            placeholder="please input lastMQty"
          >
          </el-input>
        </el-form-item>
        <el-form-item label="thisMQty:">
          <el-input
            v-model="formData.thisMQty"
            type="number"
            placeholder="please input thisMQty"
          >
          </el-input>
        </el-form-item>
        <div style="display: flex; justify-content: center">
          <span slot="footer" class="dialog-footer">
            <el-button @click="addFormVisible = false" size="mini">{{
              $t(`int.cancel`)
            }}</el-button>
            <el-button type="primary" @click="submit('formData')" size="mini">{{
              $t(`eol.confirm`)
            }}</el-button>
          </span>
        </div>
      </el-form>
    </el-dialog>

    <el-dialog
      :title="$t(`eol.updateDialogTitle`)"
      :visible="updateFormVisible"
      @close="updateFormVisible = false"
    >
      <UpdateForm
        :form="updateForm"
        @fatherMethod="closeUpdateForm"
      ></UpdateForm>
    </el-dialog>
    <!-- 表格 -->
    <el-table
      class="table-content"
      :data="eols"
      :border="true"
      style="margin: 0 auto"
      stripe
    >
      <el-table-column
        prop="name"
        :label="$t(`eol.name`)"
        align="center"
      ></el-table-column>
      <el-table-column prop="mqty" label="M.QTY2" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.mqty == 0">/</span>
          <span v-else>{{ scope.row.mqty }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="lastMQty" label="Last M.QTY" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.lastMQty == 0">/</span>
          <span v-else>{{ scope.row.lastMQty }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="thisMQty" label="This M.QTY" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.thisMQty == 0">/</span>
          <span v-else>{{ scope.row.thisMQty }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t(`eol.operation`)" align="center" width="180">
        <template slot-scope="scope">
          <!-- <el-button
            round
            size="mini"
            type="primary"
            @click="update(scope.row)"
            >{{ $t(`eol.update`) }}</el-button
          >
          <el-button
            round
            size="mini"
            type="danger"
            @click="deleteEol(scope.row.id)"
            >{{ $t(`eol.delete`) }}</el-button
          > -->
          <div style="display: flex; justify-content: center; cursor: pointer">
            <div @click="update(scope.row)" style="color: #409eff">
              <span>{{ $t(`eol.update`) }}</span>
            </div>
            <div
              @click="deleteEol(scope.row.id)"
              style="color: #409eff; margin-left: 10px"
            >
              <span>{{ $t(`eol.delete`) }}</span>
            </div>
          </div>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="EOL" :visible.sync="visible1" width="45%">
      <EolTableBoard style="margin: 0 0.5rem" :eols="eols"></EolTableBoard>
    </el-dialog>
  </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';
import pageHeader from "@/components/pageHeader/index.vue";
import store from "@/store";
import EolTable from "./eolTable.vue";
import EolTableBoard from "@/view/screen/components/EolTable/index.vue";
import AddForm from "./addForm.vue";
import UpdateForm from "./updateForm.vue";
import { list, deleteById, add, update } from "@/api/eol";
export default {
  // import引入的组件需要注入到对象中才能使用
  components: { EolTable, AddForm, UpdateForm, EolTableBoard, pageHeader },
  name: "eol_index",
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
      eols: [],
      updateForm: {},
      visible1: false,
      eols: [],
      formData: {},
      dialogTitle: "",
    };
  },
  // 监听属性 类似于data概念
  computed: {
    rules() {
      return {
        name: [
          {
            required: true,
            message: this.$t(`eol.namePlaceholder`),
            trigger: "blur",
          },
        ],
      };
    },
  },
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
      }
    },
    async getEols() {
      const { data: res } = await list();
      if (res.code == 200) {
        this.eols = res.data;
        // this.$message({
        //   type: "success",
        //   message: "getProductTestings successfully!",
        // });
      } else {
        this.$message({
          type: "warning",
          message: res.msg,
        });
      }
    },
    // 更新
    update(row) {
      this.formData = JSON.parse(JSON.stringify(row));
      this.dialogTitle = this.$t(`eol.updateDialogTitle`);
      this.addFormVisible = true;
    },
    // 删除
    deleteEol(id) {
      this.$confirm(this.$t(`eol.deleteTips`), this.$t(`eol.tips`), {
        confirmButtonText: this.$t(`eol.confirm`),
        cancelButtonText: this.$t(`eol.cancel`),
        type: "warning",
      })
        .then(async () => {
          const { data: res } = await deleteById(id);
          if (res.code == 200) {
            this.getEols();
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
    // 新增按钮事件
    openDialog() {
      this.dialogTitle = this.$t(`eol.addDialogTitle`);
      this.addFormVisible = true;
      for (let i in this.formData) {
        this.formData[i] = "";
      }
      this.$nextTick(() => {
        this.$refs.formData.clearValidate();
      });
    },
    closeEolTable() {
      this.$refs.uploadRef.clearFiles();
      this.visible = false;
      this.getEols();
    },
    closeAddForm() {
      this.addFormVisible = false;
      this.getEols();
    },
    closeUpdateForm() {
      this.getEols();
      this.updateFormVisible = false;
    },
    beforeUpload(file) {
      const fileName = file.name;
      const rightFilename = "EOL.xlsx";
      if (fileName !== rightFilename) {
        this.$confirm("请上传EOL.xlsx", this.$t(`eol.tips`), {
          confirmButtonText: this.$t(`eol.confirm`),
          cancelButtonText: this.$t(`eol.cancel`),
          type: "warning",
        });
        return false;
      }
    },
    // 新增提交
    submit(formData) {
      this.$refs[formData].validate((valid) => {
        if (valid) {
          if (this.dialogTitle == this.$t(`eol.addDialogTitle`)) {
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
          this.getEols();
        } else {
          // console.log("error submit!!");
          return false;
        }
      });
    },
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    this.getEols();
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
.eol-container {
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

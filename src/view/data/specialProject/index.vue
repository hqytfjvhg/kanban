<template>
  <div id="index" class="show-container">
    <pageHeader
      :title="$t(`specialProject.productTitle`)"
      :describe="$t(`specialProject.productDesc`)"
    ></pageHeader>
    <div class="new-create" style="margin-left: 1rem">
      <el-button
        class="create-button"
        type="primary"
        @click="openDialog"
        size="mini"
        ><i class="el-icon-plus"></i>{{ $t(`int.add`) }}</el-button
      >
    </div>
    <!-- 列表 -->
    <div class="table">
      <el-table
        class="table-content"
        :data="shows"
        style="width: 100%"
        :border="true"
        stripe
      >
        <el-table-column
          :label="$t(`clock.index`)"
          width="80"
          align="center"
          type="index"
        ></el-table-column>
        <el-table-column
          prop="name"
          :label="$t(`excelTemplate.name`)"
          align="center"
        >
          <template slot-scope="scope">
            <el-input
              v-if="scope.row.id == currentUpdateId"
              v-model="formData.name"
            ></el-input>
            <div v-else>{{ scope.row.name }}</div>
          </template>
        </el-table-column>
        <el-table-column
          prop="productDate"
          :label="$t(`product.productDate`)"
          align="center"
        >
          <template slot-scope="scope">
            <div v-if="$i18n.locale == 'ch'">{{ scope.row.productDate }}</div>
            <div v-else>{{ formatDate(scope.row.productDate) }}</div>
          </template>
        </el-table-column>
        <el-table-column
          prop="content"
          :label="$t(`product.content`)"
          align="center"
        >
          <template slot-scope="scope">
            <el-input
              type="textarea"
              :rows="5"
              v-if="scope.row.id == currentUpdateId"
              v-model="formData.content"
            />
            <div v-else>{{ scope.row.content }}</div>
          </template>
        </el-table-column>

        <el-table-column :label="$t(`ext.operation`)" align="center">
          <template slot-scope="scope">
            <div
              v-if="scope.row.id == currentUpdateId"
              style="display: flex; justify-content: center; cursor: pointer"
            >
              <div @click="confirmUpdate(scope.row)" style="color: #409eff">
                <span>{{ $t(`ext.confirm`) }}</span>
              </div>
              <div
                @click="cancelUpdate"
                style="color: #409eff; margin-left: 10px"
              >
                <span>{{ $t(`ext.cancel`) }}</span>
              </div>
            </div>

            <div
              v-else
              style="display: flex; justify-content: center; cursor: pointer"
            >
              <div @click="update(scope.row)" style="color: #409eff">
                <span>{{ $t(`ext.update`) }}</span>
              </div>
              <div
                @click="deleteById(scope.row.id)"
                style="color: #409eff; margin-left: 10px"
              >
                <span>{{ $t(`ext.delete`) }}</span>
              </div>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 新增 -->
    <el-dialog
      :title="dialog.title"
      :visible.sync="dialog.visible"
      width="500px"
      :destroy-on-close="true"
    >
      <el-form
        :model="formData"
        label-width="120px"
        ref="formData"
        :rules="rules"
      >
        <el-form-item :label="$t(`excelTemplate.name`)" prop="name">
          <el-input
            type="text"
            :placeholder="$t(`eol.namePlaceholder`)"
            v-model="formData.name"
          ></el-input>
        </el-form-item>
        <el-form-item :label="$t(`product.content`)" prop="content">
          <el-input
            type="textarea"
            :rows="7"
            :placeholder="$t(`product.contentDesc`)"
            v-model="formData.content"
          ></el-input>
        </el-form-item>
        <el-form-item :label="$t(`product.productDate`)" prop="productDate">
          <el-date-picker
            v-model="formData.productDate"
            type="date"
            :placeholder="$t(`vacation.datePlaceholder`)"
            value-format="yyyy-MM-dd"
          >
          </el-date-picker>
        </el-form-item>
        <div style="display: flex; justify-content: center">
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialog.visible = false" size="mini">{{
              $t(`int.cancel`)
            }}</el-button>
            <el-button type="primary" @click="submit('formData')" size="mini">{{
              $t(`ext.confirm`)
            }}</el-button>
          </span>
        </div>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { addProduct, updateProduct, deleteById, getData } from "@/api/product";
import pageHeader from "@/components/pageHeader/index.vue";
export default {
  data() {
    return {
      shows: [],
      formData: {
        name: "",
        content: "",
        productDate: "",
        id: "",
        company: false,
      },
      updateShow: {},
      currentUpdateId: 0,
      dialog: {
        title: "",
        visible: false,
      },
    };
  },
  created() {
    // 实例被创建之后执行代码
  },
  computed: {
    // 计算属性
    rules() {
      var checkDate = function (rule, value, callback) {
        callback();
      };
      return {
        name: [
          {
            required: true,
            message: this.$t(`product.nameDesc`),
            trigger: "blur",
          },
        ],
        content: [
          {
            required: true,
            message: this.$t(`product.contentDesc`),
            trigger: "blur",
          },
        ],
        productDate: [
          {
            required: true,
            message: this.$t(`vacation.datePlaceholder`),
            trigger: "blur",
          },
          { validator: checkDate, trigger: "blur" },
        ],
      };
    },
  },
  components: {
    // 组件的引用
    pageHeader,
  },
  methods: {
    formatDate(data) {
      let dates = new Date(data);
      const day = dates.getDate();
      const month = dates.getMonth() + 1;
      const year = dates.getFullYear();
      // 根据需要的格式进行调整，例如：'dd/MM/yyyy'
      return `${day.toString().padStart(2, "0")}/${month
        .toString()
        .padStart(2, "0")}/${year}`;
    },
    // 方法
    openDialog() {
      this.dialog.title = this.$t(`product.addDialogTitle`);
      this.dialog.visible = !this.dialog.visible;
      for (let i in this.formData) {
        this.formData[i] = "";
      }
      this.$nextTick(() => {
        this.$refs.formData.clearValidate();
      });
    },
    // 列表数据
    async getShows() {
      const { data: res } = await getData("false");
      // console.log(res.data);
      if (res.code == 200) {
        this.shows = res.data;
      } else {
        this.$message({
          type: "warning",
          message: res.msg,
        });
      }
    },
    // 更新按钮
    update(row) {
      // this.currentUpdateId = row.id;
      this.dialog.visible = true;
      this.dialog.title = this.$t(`product.updateNews`);
      this.formData = JSON.parse(JSON.stringify(row));
      // console.log(this.formData.productDate, 44);
      this.formData.productDate = new Date(this.formData.productDate);
      // console.log(this.formData.productDate, 55);
      this.$nextTick(() => {
        this.$refs.formData.clearValidate();
      });
    },
    // 时间转换
    // 中国标准时间 转换成 年月日
    formatDateTime(data) {
      let date = new Date(data);
      var y = date.getFullYear();
      var m = date.getMonth() + 1;
      m = m < 10 ? "0" + m : m;
      var d = date.getDate();
      d = d < 10 ? "0" + d : d;
      var h = date.getHours();
      var minute = date.getMinutes();
      minute = minute < 10 ? "0" + minute : minute;
      // return y + '-' + m + '-' + d+' '+h+':'+minute;
      return y + "-" + m + "-" + d;
    },
    // 提交新增
    submit(formData) {
      this.$refs[formData].validate((valid) => {
        if (valid) {
          this.formData.company = false;
          if (this.dialog.title == this.$t(`product.addDialogTitle`)) {
            // this.formData.productDate =(this.formData.productDate).replace(/-/g, '/');
            addProduct(this.formData).then((res) => {
              if (res.data.code == 200) {
                this.$message({
                  type: "success",
                  message: this.$t(`clock.operationOK`),
                });
                for (let i in this.formData) {
                  this.formData[i] = "";
                }
                this.dialog.visible = false;
                this.getShows();
              }
            });
          } else {
            this.formData.productDate = this.formatDateTime(
              this.formData.productDate
            );
            updateProduct(this.formData).then((res) => {
              if (res.data.code == 200) {
                this.$message({
                  type: "success",
                  message: "update notice successfully!",
                });
                this.getShows();
                this.dialog.visible = false;
                for (let i in this.formData) {
                  this.formData[i] = "";
                }
              } else {
                this.$message({
                  type: "warning",
                  message: res.msg,
                });
              }
            });
          }
        } else {
          // console.log("error submit!!");
          return false;
        }
      });
    },
    // 删除
    deleteById(id) {
      this.$confirm(this.$t(`award.deleteTips`), this.$t(`ext.tips`), {
        confirmButtonText: this.$t(`ext.confirm`),
        cancelButtonText: this.$t(`ext.cancel`),
        type: "warning",
      })
        .then(async () => {
          const { data: res } = await deleteById(id);
          if (res.code == 200) {
            this.$message({
              type: "success",
              // message: "delete successfully!",
              message: this.$t(`clock.operationOK`),
            });
            this.getShows();
          } else {
            this.$message({
              type: "warning",
              message: res.msg,
            });
          }
        })
        .catch((e) => {
          // console.log(e);
          // this.$message({
          //   type: "info",
          //   message: this.$t(`clock.cancelTooltip`),
          // });
        });
    },
    // 更新
    async confirmUpdate(row) {
      if (this.formData.content == "") {
        this.$message({
          type: "warning",
          message: this.$t(`product.warningTips`),
        });
        return;
      }
      if (this.formData.name == "") {
        this.$message({
          type: "warning",
          message: this.$t(`product.warningTips`),
        });
        return;
      }
      if (this.formData.productDate == "") {
        this.$message({
          type: "warning",
          message: this.$t(`product.warningTips`),
        });
        return;
      }
      const { data: res } = await updateProduct(this.formData);
      if (res.code == 200) {
        this.$message({
          type: "success",
          message: "update notice successfully!",
        });
        this.getShows();
        this.currentUpdateId = 0;
        for (let i in this.formData) {
          this.formData[i] = "";
        }
      } else {
        this.$message({
          type: "warning",
          message: res.msg,
        });
      }
    },
    cancelUpdate() {
      this.currentUpdateId = 0;
      for (let i in this.formData) {
        this.formData[i] = "";
      }
      this.getShows();
    },
  },
  mounted() {
    // 页面进入时加载内容
    this.getShows();
  },
  watch: {
    // 监测变化
  },
};
</script>
<style lang="scss" scoped>
.show-container {
  padding: 0 0.6rem 1rem 0.6rem;

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

.demo-table-expand {
  font-size: 0;
  margin: 10px 60px;
}

.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}

.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}

.el-card ::v-deep .el-card__header {
  border: none;
}
</style>

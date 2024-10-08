<!--  -->
<template>
  <div class="productTesting">
    <pageHeader
      :title="$t(`productTesting.pageTitle`)"
      :describe="$t(`productTesting.pageDesc`)"
    ></pageHeader>
    <div class="new-create" style="margin-left: 1rem">
      <el-button
        class="create-button"
        type="primary"
        @click="openDialog(1)"
        size="mini"
        > <i class="el-icon-plus"></i>{{ $t(`productTesting.add`) }}</el-button
      >
      <el-upload
        :action="base_api + '/info_screen/productTesting/excel/handler'"
        multiple
        :limit="1"
        :on-success="handleSuccess"
        :headers="headers"
        ref="uploadRef"
        :before-upload="beforeUpload"
        :show-file-list="false"
      >
        <el-button size="mini" type="primary"><i class="el-icon-upload2"></i>{{
          $t(`productTesting.batchAdd`)
        }}</el-button>
      </el-upload>
      <el-button
        type="warning"
        size="mini"
        style="margin-left: 15px"
        @click="visible1 = true"
      >
        view
      </el-button>
      <!-- <a
        :href="base_api + '/' + 'template/Product_Testing_Stage.xlsx'"
        style="margin: 0.3rem 0.5rem"
        >{{ $t(`excelTemplate.downloadTemplate`) }}</a
      > -->
      <el-button type="primary" size="mini" style="margin-left: 15px">
        <i class="el-icon-download"></i>
        <a :href="base_api + '/' + 'template/Product_Testing_Stage.xlsx'" style="margin: 0.3rem 0.5rem 0.3rem 0;color: #fff;">{{
          $t(`excelTemplate.downloadTemplate`) }}</a>
      </el-button>
    </div>
    <el-dialog
      :title="$t(`productTesting.excelDialogTitle`)"
      :visible="visible"
      @close="visible = false"
    >
      <ProductTestingTable
        :data="excelData"
        @fatherMethod="closeTable"
      ></ProductTestingTable>
    </el-dialog>

    <el-dialog
      :title="$t(`productTesting.addDialogTitle`)"
      :visible="addFormVisible"
      @close="addFormVisible = false"
    >
      <AddForm @fatherMethod="closeAddForm"></AddForm>
    </el-dialog>

    <el-dialog
      :title="$t(`productTesting.updateDialogTitle`)"
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
      :data="productTestings"
      :border="true"
      style="margin: 0 auto"
      stripe
    >
      <el-table-column
        prop="product"
        label="product"
        align="center"
      ></el-table-column>
      <el-table-column prop="engSample" label="engSample" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.engSample == null">/</span>
          <span v-else>{{ scope.row.engSample }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="pp" label="pp" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.pp == null">/</span>
          <span v-else>{{ scope.row.pp }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="mp" label="mp" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.mp == null">/</span>
          <span v-else>{{ scope.row.mp }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="launch" label="launch" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.launch == null">/</span>
          <span v-else>{{ scope.row.launch }}</span>
        </template>
      </el-table-column>
      <el-table-column label="operation" align="center" width="180">
        <template slot-scope="scope">
          <!-- <el-button
            round
            size="mini"
            type="primary"
            @click="update(scope.row)"
            >{{ $t(`productTesting.update`) }}</el-button
          >
          <el-button
            round
            size="mini"
            type="danger"
            @click="deleteProductTesting(scope.row.id)"
            >{{ $t(`productTesting.delete`) }}</el-button
          > -->
          <div style="display: flex;justify-content: center;cursor: pointer;">
            <div @click="update(scope.row)" style="color:#409eff;">
              <span>{{ $t(`productTesting.update`) }}</span>
            </div>
            <div @click="deleteProductTesting(scope.row.id)" style="color:#409eff;margin-left: 10px;">
              <span>{{ $t(`productTesting.delete`) }}</span>
            </div>
          </div>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog
      title="Product Testing Stage"
      :visible.sync="visible1"
      width="55%"
    >
      <ProductTesting :data="productTestings"></ProductTesting>
    </el-dialog>
  </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';
import pageHeader from "@/components/pageHeader/index.vue";
import { list, deleteById } from "@/api/productTesting";
import ProductTestingTable from "./productTestingTable.vue";
import ProductTesting from "@/view/screen/components/ProductTesting/index.vue";
import UpdateForm from "./updateForm.vue";
import AddForm from "./addForm.vue";
import store from "@/store";
export default {
  // import引入的组件需要注入到对象中才能使用
  components: {
    ProductTestingTable,
    AddForm,
    UpdateForm,
    ProductTesting,
    pageHeader,
  },
  name: "productTesting",
  // props: {
  //     data: {
  //         type: String,
  //         required: true,
  //         default: function () {
  //             return []
  //         }
  //     }
  // },
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
      addFormVisible: false,
      productTestings: [],
      updateFormVisible: false,
      updateForm: {},
      visible1: false,
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
        this.title = "Product Testing Stage Excel Data";
      } else {
        this.$message({
          type: "warning",
          message: res.msg,
        });
      }
    },
    beforeUpload(file) {
      const fileName = file.name;
      const rightFilename = "Product_Testing_Stage.xlsx";
      if (fileName !== rightFilename) {
        this.$confirm("请上传Product_Testing_Stage.xlsx", this.$t(`eol.tips`), {
          confirmButtonText: this.$t(`eol.confirm`),
          cancelButtonText: this.$t(`eol.cancel`),
          type: "warning",
        });
        return false;
      }
    },
    openDialog(type) {
      if (type == 1) {
        this.title = "填写ProductTesting表单";
        this.addFormVisible = true;
      }
      if (type == 2) {
        this.title = "更新表单";
        this.updateFormVisible = true;
      }
    },
    async getProductTestings() {
      const { data: res } = await list();
      if (res.code == 200) {
        this.productTestings = res.data;
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
    update(row) {
      this.updateForm = row;
      this.openDialog(2);
    },
    deleteProductTesting(id) {
      this.$confirm(
        this.$t(`productTesting.deleteTips`),
        this.$t(`productTesting.tips`),
        {
          confirmButtonText: this.$t(`productTesting.confirm`),
          cancelButtonText: this.$t(`productTesting.cancel`),
          type: "warning",
        }
      )
        .then(async () => {
          const { data: res } = await deleteById(id);
          if (res.code == 200) {
            this.$message({
              type: "success",
              message: "delete successfully!",
            });
            this.getProductTestings();
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
    closeUpdateForm() {
      this.getProductTestings();
      this.updateFormVisible = false;
    },
    closeAddForm() {
      this.getProductTestings();
      this.addFormVisible = false;
    },
    closeTable() {
      this.$refs.uploadRef.clearFiles();
      this.getProductTestings();
      this.visible = false;
    },
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    this.getProductTestings();
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
.productTesting {
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

<template>
  <div id="stage" class="stage-container">
    <pageHeader
      :title="$t(`productStage.pageTitle`)"
      :describe="$t(`productStage.pageDesc`)"
    ></pageHeader>
    <!-- position: absolute;top:9.5rem;right:3rem -->
    <div class="new-create" style="margin-left: 1rem">
      <el-button
        class="create-button"
        type="primary"
        @click="openDialog"
        size="mini"
        ><i class="el-icon-plus"></i>{{ $t(`productStage.add`) }}</el-button
      >
      <el-upload
        :action="base_api + '/info_screen/stage/excel/handler'"
        multiple
        :limit="1"
        :on-success="handleSuccess"
        :headers="headers"
        ref="uploadRef"
        :before-upload="beforeUpload"
        :show-file-list="false"
      >
        <el-button size="mini" type="primary"
          ><i class="el-icon-upload2"></i
          >{{ $t(`productStage.batchAdd`) }}</el-button
        >
      </el-upload>
      <el-button
        type="warning"
        size="mini"
        style="margin-left: 1rem"
        @click="visible1 = true"
      >
        view
      </el-button>

      <!-- <a :href="base_api + '/' + 'template/Product_Stage.xlsx'" style="margin: 0.3rem 0.5rem">{{
        $t(`excelTemplate.downloadTemplate`) }}</a> -->
      <el-button type="primary" size="mini" style="margin-left: 15px">
        <i class="el-icon-download"></i>
        <a
          :href="base_api + '/' + 'template/Product_Stage.xlsx'"
          style="margin: 0.3rem 0.5rem 0.3rem 0; color: #fff"
          >{{ $t(`excelTemplate.downloadTemplate`) }}</a
        >
      </el-button>
    </div>
    <!-- 
    <el-upload :action="base_api + '/info_screen/stage/excel/handler'" multiple :limit="1" :on-success="handleSuccess"
            :headers="headers" ref="uploadRef" style="position: absolute;top:8.5rem;right:3rem">
            <el-button size="mini" type="primary">{{ $t(`productStage.batchAdd`) }}</el-button>
        </el-upload>
        <el-button type="primary" icon="el-icon-plus" circle @click="openDialog"
            style="position: absolute;bottom:3rem;right:10rem;z-index: 99;width:3rem;height: 3rem;"></el-button>
        <el-button type="success" icon="el-icon-view" circle @click="visible1 = true"
            style="position: absolute;bottom:3rem;right:6rem;z-index: 99;width:3rem;height: 3rem;"></el-button> -->

    <el-table :data="stages" :border="true" stripe>
      <el-table-column
        align="center"
        :label="$t(`productStage.index`)"
        type="index"
        width="60"
      ></el-table-column>
      <el-table-column
        prop="product"
        :label="$t(`productStage.product`)"
        align="center"
      >
        <template slot-scope="scope">
          <el-input
            v-if="currentUpdateId == scope.row.stageId"
            v-model="updateForm.product"
          ></el-input>
          <span v-else>{{ scope.row.product }}</span>
        </template>
      </el-table-column>

      <!-- <el-table-column
        prop="bates"
        :label="$t(`productStage.bates`)"
        align="center"
      >
        <template slot-scope="scope">
          <el-date-picker
            class="el-date-picker"
            v-if="currentUpdateId == scope.row.stageId"
            v-model="updateForm.bates"
            value-format="yyyy-MM-dd"
            type="date"
            placeholder="please select date"
          ></el-date-picker>
          <span v-else>{{ scope.row.bates }}</span>
        </template>
      </el-table-column> -->
      <el-table-column prop="pp" :label="$t(`productStage.pp`)" align="center">
        <template slot-scope="scope">
          <el-date-picker
            class="el-date-picker"
            v-if="currentUpdateId == scope.row.stageId"
            v-model="updateForm.pp"
            value-format="yyyy-MM-dd"
            type="date"
            placeholder="please select date"
          ></el-date-picker>
          <span v-else>{{ scope.row.pp }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="mp" :label="$t(`productStage.mp`)" align="center">
        <template slot-scope="scope">
          <el-date-picker
            class="el-date-picker"
            v-if="currentUpdateId == scope.row.stageId"
            v-model="updateForm.mp"
            value-format="yyyy-MM-dd"
            type="date"
            placeholder="please select date"
          ></el-date-picker>
          <span v-else>{{ scope.row.mp }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="despatch"
        :label="$t(`productStage.despatch`)"
        align="center"
      >
        <template slot-scope="scope">
          <el-date-picker
            class="el-date-picker"
            v-if="currentUpdateId == scope.row.stageId"
            v-model="updateForm.despatch"
            value-format="yyyy-MM-dd"
            type="date"
            placeholder="please select date"
          ></el-date-picker>
          <span v-else>{{ scope.row.despatch }}</span>
        </template>
      </el-table-column>
      <!-- <el-table-column
        prop="pr"
        :label="$t(`productStage.pr`)"
        width="160"
        align="center"
      >
        <template slot-scope="scope">
          <el-date-picker
            class="el-date-picker"
            v-if="currentUpdateId == scope.row.stageId"
            v-model="updateForm.pr"
            value-format="yyyy-MM-dd"
            type="date"
            placeholder="please select date"
          ></el-date-picker>
          <span v-else>{{ scope.row.pr }}</span>
        </template>
      </el-table-column> -->
      <el-table-column
        prop="launch"
        :label="$t(`productStage.launch`)"
        align="center"
      >
        <template slot-scope="scope">
          <el-date-picker
            class="el-date-picker"
            v-if="currentUpdateId == scope.row.stageId"
            v-model="updateForm.launch"
            value-format="yyyy-MM-dd"
            type="date"
            placeholder="please select date"
          ></el-date-picker>
          <span v-else>{{ scope.row.launch }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t(`productStage.operation`)"
        align="center"
        width="250"
      >
        <template slot-scope="scope">
          <div
            v-if="currentUpdateId == scope.row.stageId"
            style="display: flex; justify-content: center; cursor: pointer"
          >
            <!-- <el-button type="success" round size="mini" @click="confirmUpdate">{{ $t(`productStage.confirm`)
            }}</el-button>
            <el-button type="warning" round size="mini" @click="cancelUpdate">{{
              $t(`productStage.cancel`)
            }}</el-button> -->
            <div @click="confirmUpdate" style="color: #409eff">
              <span>{{ $t(`productStage.confirm`) }}</span>
            </div>
            <div
              @click="cancelUpdate"
              style="color: #409eff; margin-left: 10px"
            >
              <span>{{ $t(`productStage.cancel`) }}</span>
            </div>
          </div>
          <!-- <div v-else>
            <el-button type="primary" round size="mini" @click="update(scope.row)">{{ $t(`productStage.update`)
            }}</el-button>
            <el-button type="danger" round size="mini" @click="deleteByProduct(scope.row.stageId)">{{
              $t(`productStage.delete`) }}</el-button>
          </div> -->
          <div
            v-else
            style="display: flex; justify-content: center; cursor: pointer"
          >
            <div @click="update(scope.row)" style="color: #409eff">
              <span>{{ $t(`productStage.update`) }}</span>
            </div>
            <div
              @click="deleteByProduct(scope.row.stageId)"
              style="color: #409eff; margin-left: 10px"
            >
              <span>{{ $t(`productStage.delete`) }}</span>
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

    <el-dialog
      class="table"
      title="excel parsing data"
      :visible.sync="tableVisable"
      width="65%"
    >
      <el-table class="table-content" :border="true" stripe :data="excelData">
        <el-table-column
          prop="product"
          label="product"
          width="100"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="bates"
          label="bates"
          width="180"
          align="center"
        ></el-table-column>
        <el-table-column prop="pp" label="pp" width="180" align="center">
        </el-table-column>
        <el-table-column
          prop="mp"
          label="mp"
          width="180"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="despatch"
          label="despatch"
          width="180"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="pr"
          label="pr"
          width="180"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="launch"
          label="launch"
          width="180"
          align="center"
        ></el-table-column>
      </el-table>
      <!-- <el-button style="margin:1rem auto;display:block;text-align: center;" type="primary" @click="submitToBatch">confirm</el-button> -->
      <div style="text-align: center; margin: 20px 0">
        <el-button type="primary" @click="submitToBatch"> confirm </el-button>
        <el-button type="warning" @click="cancle"> cancel </el-button>
      </div>
    </el-dialog>
<!-- 新增 -->
    <el-dialog
      :title="$t(`productStage.addDialogTitle`)"
      :visible.sync="visible"
      width="35%"
    >
      <el-form :model="form" label-width="120px">
        <el-form-item :label="$t(`productStage.product`)">
          <el-input
            type="text"
            :placeholder="$t(`productStage.productPlaceholder`)"
            v-model="form.product"
          ></el-input>
        </el-form-item>
        <!-- <el-form-item :label="$t(`productStage.bates`)">
          <el-date-picker
            v-model="form.bates"
            type="date"
            :placeholder="$t(`productStage.batesPlaceholder`)"
            value-format="yyyy-MM-dd"
          ></el-date-picker>
        </el-form-item> -->
        <el-form-item :label="$t(`productStage.pp`)">
          <el-date-picker
            v-model="form.pp"
            type="date"
            :placeholder="$t(`productStage.ppPlaceholder`)"
            value-format="yyyy-MM-dd"
          ></el-date-picker>
        </el-form-item>
        <el-form-item :label="$t(`productStage.mp`)">
          <el-date-picker
            v-model="form.mp"
            type="date"
            :placeholder="$t(`productStage.mpPlaceholder`)"
            value-format="yyyy-MM-dd"
          ></el-date-picker>
        </el-form-item>
        <el-form-item :label="$t(`productStage.despatch`)">
          <el-date-picker
            v-model="form.despatch"
            type="date"
            :placeholder="$t(`productStage.despatchPlaceholder`)"
            value-format="yyyy-MM-dd"
          ></el-date-picker>
        </el-form-item>
        <!-- <el-form-item :label="$t(`productStage.pr`)">
          <el-date-picker
            v-model="form.pr"
            type="date"
            :placeholder="$t(`productStage.prPlaceholder`)"
            value-format="yyyy-MM-dd"
          ></el-date-picker>
        </el-form-item> -->
        <el-form-item :label="$t(`productStage.launch`)">
          <el-date-picker
            v-model="form.launch"
            type="date"
            :placeholder="$t(`productStage.launchPlaceholder`)"
            value-format="yyyy-MM-dd"
          ></el-date-picker>
        </el-form-item>
        <!-- <el-form-item>
          <el-button type="primary" @click="submit" size="mini">{{
            $t(`productStage.confirm`)
          }}</el-button>
        </el-form-item> -->
        <div style="display: flex; justify-content: center">
          <span slot="footer" class="dialog-footer">
            <el-button @click="visible = false" size="mini">{{
              $t(`int.cancel`)
            }}</el-button>
            <el-button type="primary" @click="submit('addForm')" size="mini">{{
              $t(`productStage.confirm`)
            }}</el-button>
          </span>
        </div>
      </el-form>
    </el-dialog>

    <el-dialog title="Product Stage" :visible.sync="visible1" width="55%">
      <ProductStage
        style="margin: 0 0.6rem; margin-top: 15px; margin-bottom: 0"
        :stages="productStages"
      ></ProductStage>
    </el-dialog>
  </div>
</template>

<script>
import pageHeader from "@/components/pageHeader/index.vue";
import store from "@/store";
import ProductStage from "@/view/screen/components/ProductStage/index.vue";
import {
  getProducts,
  batchAdd,
  updateStage,
  selectAllPaged,
  deleteById,
  add,
} from "@/api/stage";
import { getProductStages } from "@/api/board";
export default {
  name: "data-stage",
  components: {
    ProductStage,
    pageHeader,
  },
  data() {
    return {
      base_api: process.env.VUE_APP_BASE_API,
      stages: [],
      currentUpdateId: 0,
      updateForm: {},
      form: {},
      products: [],
      excelData: [],
      tableVisable: false,
      headers: {
        token: store.getters.token,
      },
      page: {
        pageSize: 10,
        pageNum: 1,
        total: 1000,
      },
      title: "",
      visible: false,
      visible1: false,
      productStages: [],
    };
  },
  created() {
    // 实例被创建之后执行代码
    this.getStageList();
    this.getProducts();
    this.getProductStages();
  },
  methods: {
    // 方法
    openDialog() {
      this.title = "add product stage";
      this.visible = !this.visible;
    },
    async getStageList() {
      const { data: res } = await selectAllPaged(this.page);
      if (res.code == 200) {
        this.stages = res.data.data;
        this.page.total = res.data.total;
      } else {
        this.$message({
          type: "warning",
          message: res.msg,
        });
      }
    },
    update(row) {
      this.currentUpdateId = row.stageId;
      this.updateForm = row;
    },
    deleteByProduct(id) {
      this.$confirm(
        this.$t(`productStage.deleteTips`),
        this.$t(`productStage.tips`),
        {
          confirmButtonText: this.$t(`productStage.confirm`),
          cancelButtonText: this.$t(`productStage.cancel`),
          type: "warning",
        }
      )
        .then(async () => {
          // console.log(id);
          const { data: res } = await deleteById(id);
          if (res.code == 200) {
            this.$message({
              type: "success",
              message: this.$t(`clock.operationOK`),
            });
            this.getStageList();
            this.getProductStages();
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
    // 取消更新
    cancelUpdate() {
      this.getStageList();
      (this.currentUpdateId = 0), (this.updateForm = {});
      // this.$message({
      //   type: "info",
      //   message: this.$t(`clock.cancelTooltip`),
      // });
    },
    async confirmUpdate() {
      console.log(this.updateForm);
      const { data: res } = await updateStage(this.updateForm);
      if (res.code == 200) {
        this.$message({
          type: "success",
          message: this.$t(`clock.operationOK`),
        });
        this.getStageList();
        this.getProductStages();
        this.currentUpdateId = 0;
        this.updateForm = {};
      } else {
        this.$message({
          type: "error",
          message: this.$t(`clock.operationError`),
        });
      }
    },
    async submit() {
      console.log(this.form);
      const { data: res } = await add(this.form);
      if (res.code == 200) {
        this.$message({
          type: "success",
          message: this.$t(`clock.operationOK`),
        });
        this.getStageList();
        this.getProductStages();
        this.form = {};
      } else {
        this.$message({
          type: "error",
          message: this.$t(`clock.operationError`),
        });
      }
    },
    async getProducts() {
      const { data: res } = await getProducts();
      if (res.code == 200) {
        this.products = res.data;
      }
    },
    querySearch(searchString, cb) {
      console.log(searchString);
      cb(this.products);
    },
    handleSuccess(res) {
      if (res.code == 200) {
        this.excelData = res.data;
        this.tableVisable = true;
      } else {
        this.$message({
          type: "warning",
          message: res.msg,
        });
      }
    },
    cancle() {
      this.$refs.uploadRef.clearFiles();
      this.excelData = [];
      this.tableVisable = false;
    },
    async submitToBatch() {
      const { data: res } = await batchAdd(this.excelData);
      if (res.code == 200) {
        this.$message({
          type: "success",
          message: this.$t(`clock.operationOK`),
        });
        this.$refs.uploadRef.clearFiles();
        this.getProductStages();
        this.getStageList();
        this.tableVisable = false;
        this.excelData = [];
      } else {
        this.$message({
          type: "warning",
          message: res.msg,
        });
      }
    },
    handleCurrentChange(val) {
      this.page.pageNum = val;
      this.getStageList();
    },
    handleSizeChange(val) {
      this.page.pageSize = val;
      this.getStageList();
    },
    async getProductStages() {
      const { data: res } = await getProductStages();
      if (res.code == 200) {
        this.productStages = res.data;
      } else {
        this.$message({
          type: "warning",
          message: res.msg,
        });
      }
    },
    beforeUpload(file) {
      const fileName = file.name;
      const rightFilename = "Product_Stage.xlsx";
      if (fileName !== rightFilename) {
        this.$confirm("请上传Product_Stage.xlsx", this.$t(`eol.tips`), {
          confirmButtonText: this.$t(`eol.confirm`),
          cancelButtonText: this.$t(`eol.cancel`),
          type: "warning",
        });
        return false;
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
.stage-container {
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

.el-card ::v-deep .el-card__header {
  border: none;
}

.el-date-picker {
  width: 90%;
}
</style>

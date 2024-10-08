<template>
  <div id="overstock" class="overstock-container">
    <el-form
      :inline="true"
      size="mini"
      class="form-box"
      style="display: flex; width: 100%"
    >
      <el-form-item label="subject:">
        <el-input
          v-model="page.queryCondition.subject"
          clearable
          placeholder="请输入subject"
        ></el-input>
      </el-form-item>
      <el-form-item label="year:">
        <el-input
          v-model="page.queryCondition.year"
          clearable
          placeholder="请输入year"
        ></el-input>
      </el-form-item>
      <el-form-item label="month:">
        <el-input
          v-model="page.queryCondition.month"
          clearable
          placeholder="请输入month"
        ></el-input>
      </el-form-item>
      <el-form-item style="margin-right: 10px">
        <el-button icon="el-icon-search" type="primary" @click="getProjects"
          >查询</el-button
        >
      </el-form-item>
    </el-form>

    <div class="new-create">
      <el-button
        class="create-button"
        type="success"
        @click="openDialog(1)"
        size="mini"
        >新增</el-button
      >
      <el-upload
        :action="base_api + '/info_screen/overstock/excel/handler'"
        multiple
        :limit="1"
        :on-success="handleSuccess"
        :headers="headers"
      >
        <el-button size="mini" type="primary">批量新增 (excel)</el-button>
      </el-upload>
    </div>

    <el-table
      class="table-content"
      :data="overstocks"
      style="width: 100%"
      :border="true"
      stripe
    >
      <el-table-column
        prop="overstockId"
        label="ID"
        width="100"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="product"
        label="product"
        width="300"
        align="center"
      >
        <template slot="header" slot-scope="scope">
          <FilterHeader
            :column="scope.column"
            field-name="product"
            filter-type="text"
            @tableFilter="tableFilter"
            @resetFilter="tableFilterReset"
          />
        </template>
        <template slot-scope="scope">
          <el-input
            v-if="scope.row.overstockId == currentUpdateId"
            v-model="form.product"
          ></el-input>
          <div v-else>{{ scope.row.product }}</div>
        </template>
      </el-table-column>
      <el-table-column
        prop="quantity"
        label="quantity"
        width="300"
        align="center"
      >
        <template slot="header" slot-scope="scope">
          <FilterHeader
            :column="scope.column"
            field-name="quantity"
            filter-type="number"
            @tableFilter="tableFilter"
            @resetFilter="tableFilterReset"
          />
        </template>
        <template slot-scope="scope">
          <el-input
            v-if="scope.row.overstockId == currentUpdateId"
            v-model="form.quantity"
          ></el-input>
          <div v-else>{{ scope.row.quantity }}</div>
        </template>
      </el-table-column>
      <el-table-column
        prop="unitPrice"
        label="unitPrice"
        width="300"
        align="center"
      >
        <template slot-scope="scope">
          <el-input
            v-if="scope.row.overstockId == currentUpdateId"
            v-model="form.unitPrice"
          ></el-input>
          <div v-else>{{ scope.row.unitPrice }}</div>
        </template>
      </el-table-column>
      <el-table-column
        prop="totalPrice"
        label="totalPrice"
        width="200"
        align="center"
      >
        <template slot="header" slot-scope="scope">
          <FilterHeader
            :column="scope.column"
            field-name="totalPrice"
            filter-type="number"
            @tableFilter="tableFilter"
            @resetFilter="tableFilterReset"
          />
        </template>
      </el-table-column>
      <el-table-column label="operation" align="center">
        <template slot-scope="scope">
          <div
            v-if="scope.row.overstockId == currentUpdateId"
            style="display: flex; justify-content: space-around"
          >
            <div>
              <el-button type="success" @click="confirmUpdate" round size="mini"
                >confirm</el-button
              >
            </div>
            <div>
              <el-button type="warning" @click="cancelUpdate" round size="mini"
                >cancel</el-button
              >
            </div>
          </div>
          <div v-else style="display: flex; justify-content: space-around">
            <div>
              <el-button
                type="primary"
                @click="update(scope.row)"
                round
                size="mini"
                >update</el-button
              >
            </div>
            <div>
              <el-button
                type="danger"
                @click="deleteOverstock(scope.row.overstockId)"
                round
                size="mini"
                >delete</el-button
              >
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

    <div class="table" v-if="tableVisable">
      <el-card class="table-card">
        <div slot="header" class="clearfix">
          <span>excel data</span>
          <el-button
            style="float: right; padding: 3px 0"
            type="primary"
            @click="submitToBatch"
            >确认批量操作</el-button
          >
        </div>
        <el-table
          class="table-content"
          :data="excelData"
          :border="true"
          style="width: 60%; margin: 0 auto"
        >
          <el-table-column
            prop="product"
            label="product"
            width="250"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="quantity"
            label="quantity"
            width="250"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="unitPrice"
            label="unitPrice"
            align="center"
          ></el-table-column>
        </el-table>
      </el-card>
    </div>

    <el-dialog :title="dialog.title" :visible.sync="dialog.visible" width="35%">
      <el-form :model="form" label-width="120px">
        <el-form-item label="product:">
          <el-input v-model="form.product" placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item label="quantity:">
          <el-input v-model="form.quantity" placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item label="unitPrice:">
          <el-input
            v-model="form.unitPrice"
            placeholder="请输入内容"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitAddForm()" size="mini"
            >confirm</el-button
          >
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
//import { getOverstock } from '@/api/marketing';
import {
  getProducts,
  batchAdd,
  selectAllPaged,
  addOverstock,
  deleteById,
  updateOverstock,
} from "@/api/overstock";
import store from "@/store";
import FilterHeader from "@/components/FilterHeader";
export default {
  name: "data-overstock",
  data() {
    return {
      base_api: process.env.VUE_APP_BASE_API,
      overstocks: [],
      conditionsFields: [], // 记录参与筛选的列信息
      form: {},
      currentUpdateId: 0,
      addForm: {},
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
        queryCondition: {
          product: "",
          quantityMin: "",
          quantityMax: "",
          totalPriceMin: "",
          totalPriceMax: "",
        },
      },
      dialog: {
        title: "",
        visible: false,
      },
    };
  },
  created() {
    // 实例被创建之后执行代码
    this.getOverstocks();
    this.getProducts();
  },
  components: { FilterHeader },
  methods: {
    // 方法
    async getOverstocks() {
      const { data: res } = await selectAllPaged(this.page);
      console.log(res);
      if (res.code == 200) {
        this.overstocks = res.data.data;
        this.page.total = res.data.total;
      }
    },
    openDialog(type) {
      if (type == 1) {
        this.form = {};
        this.dialog.title = "Add Overstock";
      } else {
        this.dialog.title = "Update Overstock";
        this.form = {};
      }
      this.dialog.visible = !this.visible;
    },
    submit() {
      console.log(this.form);
    },
    update(row) {
      this.form = row;
      this.currentUpdateId = row.overstockId;
    },
    async deleteOverstock(overstockId) {
      const { data: res } = await deleteById(overstockId);
      if (res.code == 200) {
        this.$message({
          type: "success",
          message: "Delete overstock successfully!",
        });
        this.getOverstocks();
      } else {
        this.$message({
          type: "warning",
          message: "Delete overstock project fail!",
        });
      }
    },
    cancelUpdate() {
      this.currentUpdateId = 0;
      this.form = {};
    },
    async confirmUpdate() {
      console.log(this.form);
      const { data: res } = await updateOverstock(this.form);
      if (res.code == 200) {
        this.$message({
          type: "success",
          message: "Update overstock successfully!",
        });
        this.getOverstocks();
        this.currentUpdateId = 0;
        this.form = {};
      } else {
        this.$message({
          type: "warning",
          message: "Update overstock project fail!",
        });
      }
    },
    async submitAddForm() {
      console.log(this.form);
      const { data: res } = await addOverstock(this.form);
      if (res.code == 200) {
        this.$message({
          type: "success",
          message: "Add overstock successfully!",
        });
        this.getOverstocks();
        this.form = {};
        this.dialog.visible = false;
      } else {
        this.$message({
          type: "warning",
          message: res.msg,
        });
      }
    },
    async submitToBatch() {
      console.log(this.excelData);
      const { data: res } = await batchAdd(this.excelData);
      if (res.code == 200) {
        this.tableVisable = false;
        this.getOverstocks();
      }
    },
    handleSuccess(res) {
      if (res.code == 200) {
        this.tableVisable = true;
        this.excelData = res.data;
      }
    },
    async getProducts() {
      console.log(`get products`);
      const { data: res } = await getProducts();
      if (res.code == 200) {
        this.products = res.data;
      }
    },
    querySearch(searchString, cb) {
      console.log(searchString);
      cb(this.products);
    },
    handleCurrentChange(val) {
      this.page.pageNum = val;
      this.getOverstocks();
    },
    handleSizeChange(val) {
      this.page.pageSize = val;
      this.getOverstocks();
    },
    tableFilter(data, reset) {
      let flag = true; // 判断条件里有没有该列，用来判断是新增还是更新
      if (!reset) {
        // 参与筛选的列信息，有则更新
        this.conditionsFields.forEach((item) => {
          if (item.fieldName === data.fieldName) {
            item.conditions = data.conditions;
            flag = false;
          }
        });
        // 没有则添加
        if (flag) {
          this.conditionsFields.push(data);
        }
      }
      // 遍历所有筛选条件进行过滤
      this.conditionsFields.filter((fields, index) => {
        console.log(index);
        if (fields.filterType === "text" && fields.conditions.text !== "") {
          this.page.queryCondition[fields.fieldName] = fields.conditions.text;
        } else if (
          fields.filterType === "radio" &&
          fields.conditions.radio !== ""
        ) {
          this.page.queryCondition[fields.fieldName] = fields.conditions.radio;
        } else if (
          fields.filterType === "date" &&
          (fields.conditions.date1 || fields.conditions.date2)
        ) {
          this.page.queryCondition.startTime = fields.conditions.date1;
          this.page.queryCondition.endTime = fields.conditions.date2;
        } else if (
          fields.filterType === "number" &&
          (fields.conditions.number1 || fields.conditions.number2)
        ) {
          if (fields.fieldName === "quantity") {
            this.page.queryCondition.quantityMin = fields.conditions.number1;
            this.page.queryCondition.quantityMax = fields.conditions.number2;
          }
          if (fields.fieldName === "totalPrice") {
            this.page.queryCondition.totalPriceMin = fields.conditions.number1;
            this.page.queryCondition.totalPriceMax = fields.conditions.number2;
          }
        }
      });

      this.getOverstocks();
    },
    tableFilterReset(data) {
      // 清空当前列筛选条件
      this.conditionsFields.forEach((item, index) => {
        if (item.fieldName === data.fieldName) {
          if (item.fieldName == "handlerDate") {
            this.page.queryCondition.startTime = "";
            this.page.queryCondition.endTime = "";
          }
          if (item.fieldName == "quantity") {
            this.page.queryCondition.quantityMin = "";
            this.page.queryCondition.quantityMax = "";
          }
          if (item.fieldName == "totalPrice") {
            this.page.queryCondition.totalPriceMin = "";
            this.page.queryCondition.totalPriceMax = "";
          }
          this.page.queryCondition[item.fieldName] = null;
          this.conditionsFields.splice(index, 1);
        }
      });
      if (this.conditionsFields.length === 0) {
        // 没有筛选条件了直接请求列表
        this.getOverstocks();
      } else {
        // 有筛选条件就再去筛选
        this.tableFilter(data, true);
      }
    },
  },
};
</script>
<style lang='scss' scoped>
.overstock-container {
  padding:0 0.6rem  1rem 0.6rem;

  .new-create {
    display: flex;
    padding-bottom: 20px;

    .create-button {
      margin-right: 15px;
    }
  }
  // 上传文件列表样式
  el-upload-list {
    display: inline-block;
  }
  .el-upload-list__item:first-child {
    margin-top: 0px;
  }
  .el-upload-list__item-name {
    display: inline;
  }
}

.table-card {
  margin: 20px 20px;
}

.el-card ::v-deep .el-card__header {
  border: none;
}

// 上传文件列表样式
el-upload-list {
  display: inline-block;
}
.el-upload-list__item:first-child {
  margin-top: 0px;
}
.el-upload-list__item-name {
  display: inline;
}
</style>
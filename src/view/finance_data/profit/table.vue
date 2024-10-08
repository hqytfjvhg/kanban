<template>
  <!-- 盈亏机型管理 -->
  <div class="user-container">
    <pageHeader
      :title="$t(`finance.profit.title`)"
      :describe="$t(`finance.profit.describe`)"
    ></pageHeader>
    <div class="new-create">
      <el-button
        class="create-button"
        type="primary"
        @click="openDialog(1)"
        size="mini"
        ><i class="el-icon-plus"></i>{{ $t(`finance.add`) }}</el-button
      >
      <el-button
        size="mini"
        type="success"
        @click="copyUrl()"
        style="margin-left: 15px"
        ><i class="el-icon-view"></i>{{ $t(`finance.viewKanban`) }}</el-button
      >
      <el-button size="mini" @click="getMachine" style="margin-left: 15px">
        <i class="el-icon-refresh"></i>{{ $t(`finance.reload`) }}</el-button
      >
      <!-- <el-link
        @click="copyUrl()"
        type="warning"
        size="mini"
        style="margin-left: 5px"
        >{{ $t(`finance.copyTheKanbanAddress`) }}</el-link
      > -->
    </div>
    <el-table :data="machineData" stripe border>
      <el-table-column
        type="index"
        :label="$t(`finance.profit.index`)"
        width="50"
        align="center"
      >
      </el-table-column>
      <el-table-column
        :label="$t(`finance.profit.machineName`)"
        prop="machineName"
        align="center"
      ></el-table-column>
      <el-table-column
        :label="$t(`finance.profit.bomCost`)"
        prop="bomCost"
        align="center"
      ></el-table-column>
      <el-table-column
        :label="$t(`finance.profit.promotionExpense`)"
        prop="promotionExpense"
        align="center"
      ></el-table-column>
      <el-table-column
        :label="$t(`finance.profit.brandExpense`)"
        prop="brandExpense"
        align="center"
      ></el-table-column>
      <el-table-column
        :label="$t(`finance.profit.freight`)"
        prop="freight"
        align="center"
      ></el-table-column>
      <el-table-column
        :label="$t(`finance.profit.wastage`)"
        prop="wastage"
        align="center"
      ></el-table-column>
      <el-table-column
        :label="$t(`finance.profit.websitePlatformCost`)"
        prop="websitePlatformCost"
        width="110"
        align="center"
      ></el-table-column>
      <el-table-column
        :label="$t(`finance.profit.packingExpense`)"
        prop="packingExpense"
        align="center"
      ></el-table-column>
      <el-table-column
        :label="$t(`finance.profit.taxes`)"
        prop="taxes"
        align="center"
      ></el-table-column>
      <el-table-column
        :label="$t(`finance.profit.salesCommission`)"
        prop="salesCommission"
        align="center"
      ></el-table-column>
      <el-table-column
        :label="$t(`finance.profit.other`)"
        prop="other"
        align="center"
      ></el-table-column>
      <el-table-column
        :label="$t(`finance.profit.developmentExpense`)"
        prop="developmentExpense"
        align="center"
      ></el-table-column>
      <el-table-column
        :label="$t(`finance.profit.sellingExpense`)"
        prop="sellingExpense"
        align="center"
      ></el-table-column>
      <el-table-column
        :label="$t(`finance.profit.managerExpense`)"
        prop="managerExpense"
        align="center"
      ></el-table-column>
      <el-table-column
        :label="$t(`finance.profit.otherExpense`)"
        prop="otherExpense"
        align="center"
      ></el-table-column>
      <!-- 操作栏 -->
      <el-table-column
        :label="$t(`finance.operation`)"
        align="center"
        width="120"
      >
        <template slot-scope="scope">
          <!-- <el-link
            type="primary"
            size="mini"
            @click="updateMachine(scope.row)"
            >{{ $t(`finance.edit`) }}</el-link
          >
          <el-link
            type="primary"
            size="mini"
            @click="deleteMachine(scope.row.id)"
            style="margin-left: 10px"
            >{{ $t(`finance.delete`) }}</el-link
          > -->
          <div style="display: flex; justify-content: center; cursor: pointer">
            <div @click="updateMachine(scope.row)" style="color: #409eff">
              <span>{{ $t(`finance.edit`) }}</span>
            </div>
            <div
              @click="deleteMachine(scope.row.id)"
              style="color: #409eff; margin-left: 10px"
            >
              <span>{{ $t(`finance.delete`) }}</span>
            </div>
          </div>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog
      :title="dialog.title"
      :visible.sync="dialog.visible"
      width="30%"
      :close-on-click-modal="false"
      top="1vh"
      class="dialog"
    >
      <el-form :model="form" label-width="120px">
        <el-form-item
          v-for="(item, index) in addMachineFormData"
          :key="item"
          :label="item.label"
          class="form-item"
        >
          <el-input
            v-model="item.value"
            clearable
            size="small"
            :disabled="item.label == 'ID'"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submit" size="mini">{{
            $t(`menu.confirm`)
          }}</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import pageHeader from "@/components/pageHeader/index.vue";

import {
  getAllMachineType,
  addMachineType,
  updateMachineType,
  deleteMachineType,
} from "@/api/profit/table.js";
export default {
  components: {
    pageHeader,
  },
  data() {
    return {
      machineData: [],
      dialog: {
        title: "",
        visible: false,
      },
      update: false, //判断更新还是新增
      addMachineFormData: [
        { label: "机型名称", value: "", name: "machineName" },
        { label: "BOM成本", value: "", name: "bomCost" },
        { label: "推广费", value: "", name: "promotionExpense" },
        { label: "品牌费", value: "", name: "brandExpense" },
        { label: "运费", value: "", name: "freight" },
        { label: "损耗", value: "", name: "wastage" },
        { label: "网站平台费用", value: "", name: "websitePlatformCost" },
        { label: "包装费", value: "", name: "packingExpense" },
        { label: "税金", value: "", name: "taxes" },
        { label: "销售提成", value: "", name: "salesCommission" },
        { label: "其他", value: "", name: "other" },
        { label: "研发成本", value: "", name: "developmentExpense" },
        { label: "销售费用", value: "", name: "sellingExpense" },
        { label: "管理费用", value: "", name: "managerExpense" },
        { label: "其他费用", value: "", name: "otherExpense" },
      ],
    };
  },
  mounted() {
    this.getMachine();
  },
  methods: {
    async getMachine() {
      const { data: res } = await getAllMachineType();
      // console.log(res.data);
      if (res.code == 200) {
        this.machineData = res.data;
      }
    },
    updateMachine(row) {
      this.openDialog(2);
      let index = this.addMachineFormData.findIndex(
        (item) => item.name == "id"
      );
      if (index == -1) {
        this.addMachineFormData.push({ label: "ID", value: "", name: "id" });
      }

      this.addMachineFormData.forEach((item) => {
        if (row[item.name]) item.value = row[item.name];
      });

      this.update = true;
    },
    openDialog(type) {
      if (type === 1) {
        this.dialog.title = "新增机型";
        this.update = false;
        let index = this.addMachineFormData.findIndex(
          (item) => item.name == "id"
        );
        if (index !== -1) {
          this.addMachineFormData.splice(index, 1);
        }
        this.addMachineFormData.forEach((item) => (item.value = ""));
        console.log(this.addMachineFormData);
      } else if (type === 2) {
        this.dialog.title = "更新机型";
      }
      this.dialog.visible = true;
    },
    async submit() {
      let formData = {};
      this.addMachineFormData.forEach((item) => {
        formData[item.name] = item.value;
      });
      const hasInvalidFormat = this.addMachineFormData.some((item, index) => {
        if (
          index === 0 &&
          !isNaN(item.value) &&
          !isNaN(parseFloat(item.value))
        ) {
          console.log(
            item,
            !isNaN(item.value) && !isNaN(parseFloat(item.value)),
            1
          );
          return true;
        } else if (
          index !== 0 &&
          (typeof Number(item.value) !== "number" || isNaN(item.value))
        ) {
          console.log(item, typeof Number(item.value), 2);
          return true;
        }
        return false;
      });

      if (this.addMachineFormData.find((item) => item.value == "")) {
        this.$message({
          type: "warning",
          message: "数据不能为空",
        });
      } else if (hasInvalidFormat) {
        this.$message({
          type: "warning",
          message: "格式错误：机型名称数据格式为文本，其余数据格式为数字",
        });
      } else if (!this.update) {
        const { data: res } = await addMachineType(formData);
        if (res.code == 200) {
          this.dialog.visible = false;
          this.$message({
            type: "success",
            message: "add successfully!",
          });
          this.addMachineFormData.forEach((item) => (item.value = ""));
          this.getMachine();
        }
      } else {
        const { data: res } = await updateMachineType(formData);

        if (res.code == 200) {
          this.dialog.visible = false;
          this.$message({
            type: "success",
            message: "update successfully!",
          });
          this.addMachineFormData.forEach((item) => (item.value = ""));
          this.getMachine();
        }
      }
    },
    async deleteMachine(id) {
      const confirm = await this.$confirm("是否确定删除此数据?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      });
      if (confirm) {
        const { data: res } = await deleteMachineType([id]);
        if (res.code == 200) {
          this.$message({
            type: "success",
            message: "delete successfully!",
          });
          this.getMachine();
        }
      }
    },
    toPath(path) {
      if (path == "——") return;
      this.$router.push({ path: path });
    },
    copyUrl() {
      // var url = window.location.host + "/#/info_screen/screen/profit";
      const localUrl = window.location.href.substring(
        0,
        window.location.href.lastIndexOf("#") + 1
      );
      const url = `${localUrl}${"/info_screen/screen/profit"}`;
      setTimeout(() => {
        // 新标签打开链接
        window.open(url);
      }, 300);
      // var cInput = document.createElement("input");
      // cInput.value = url;
      // document.body.appendChild(cInput);
      // cInput.select(); // 选取文本框内容

      // 执行浏览器复制命令
      // 复制命令会将当前选中的内容复制到剪切板中（这里就是创建的input标签）
      // Input要在正常的编辑状态下原生复制方法才会生效

      // document.execCommand("copy");

      // this.$message({
      //   type: "success",
      //   message: "看板地址复制成功",
      // });
      // // 复制成功后再将构造的标签 移除
      // document.body.removeChild(cInput);
    },
  },
};
</script>

<style lang="scss" scoped>
.user-container {
  padding: 0 0.6rem 1rem 0.6rem;
}
.new-create {
  padding-bottom: 20px;
}
.form-item.el-form-item {
  margin-bottom: 8px !important;
}
.dialog {
  margin: 0 auto !important;
}
</style>

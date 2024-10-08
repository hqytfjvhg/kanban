<!--  -->
<template>
  <div class="main-div">
    <el-card class="el-card">
      <div slot="header" class="clearfix">
        <span>{{ $t(`finance.departmentalFinancialManagement.title`) }}</span>

        <el-link
          style="float: right; padding: 3px 0"
          @click="toPath('/info_screen/fdata/screen/cost')"
          >{{
            $t(`finance.departmentalFinancialManagement.viewKanban`)
          }}</el-link
        >
        <el-link
          style="float: right; padding: 3px 0; right: 15px"
          icon="el-icon-document-copy"
          @click="copyUrl()"
          >{{
            $t(`finance.departmentalFinancialManagement.copyTheKanbanAddress`)
          }}</el-link
        >
        <el-link
          style="float: right; padding: 3px 0; right: 30px"
          icon="el-icon-refresh"
          @click="loadTableData()"
          >{{ $t(`finance.financialManagement.reload`) }}</el-link
        >
      </div>
      <div>
        <div class="main-description">
          {{ $t(`finance.departmentalFinancialManagement.describe`) }}
        </div>
        <el-tabs v-model="activeName" tab-position="top">
          <el-tab-pane
            :label="
              $t(
                `finance.departmentalFinancialManagement.departmentExpenseBudgetSummary`
              )
            "
            name="部门费用预算汇总"
          >
            <vxe-toolbar perfect>
              <template #buttons>
                <vxe-button
                  icon="vxe-icon-edit"
                  status="perfect"
                  @click="editData(1)"
                  >{{ $t(`finance.edit`) }}</vxe-button
                >
              </template>
            </vxe-toolbar>
            <vxe-table
              border
              :data="listDeptAll.record"
              :row-config="{ isCurrent: true, isHover: true, height: 40 }"
              :column-config="{ resizable: true }"
              align="center"
              show-overflow
              :show-header="false"
              :row-style="rowStyle"
            >
              <vxe-column type="seq" label="序号"></vxe-column>
              <vxe-column field="value1" />
              <vxe-column title="本年累计/Current year" field="value2" />
              <vxe-column title="本年目标/Forecast" field="value3" />
              <vxe-column title="差异率/Difference" field="value4" />
            </vxe-table>
          </el-tab-pane>
          <el-tab-pane
            :label="
              $t(
                `finance.departmentalFinancialManagement.monthlyTrendOfDepartmentalExpenses`
              )
            "
            name="部门费用月度趋势"
          >
            <vxe-toolbar perfect>
              <template #buttons>
                <vxe-button
                  icon="vxe-icon-edit"
                  status="perfect"
                  @click="editData(2)"
                  >{{ $t(`finance.edit`) }}</vxe-button
                >
              </template>
            </vxe-toolbar>
            <vxe-table
              border
              :data="listDeptMonth.record"
              :row-config="{ isCurrent: true, isHover: true, height: 40 }"
              :column-config="{ resizable: true }"
              align="center"
              show-overflow
              :show-header="false"
              :row-style="rowStyle"
            >
              <vxe-column type="seq" label="序号"></vxe-column>
              <vxe-column field="value1" width="250px" />
              <vxe-column field="value2" />
              <vxe-column field="value3" />
              <vxe-column field="value4" />
              <vxe-column field="value5" />
              <vxe-column field="value6" />
              <vxe-column field="value7" />
              <vxe-column field="value8" />
              <vxe-column field="value9" />
              <vxe-column field="value10" />
              <vxe-column field="value11" />
              <vxe-column field="value12" />
              <vxe-column field="value13" />
            </vxe-table>
          </el-tab-pane>
        </el-tabs>
      </div>
    </el-card>
  </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';
import store from "@/store";
import {
  getDepartmentExpenseBudgetSummaryTableData,
  getMonthlyTrendOfDepartmentalExpensesTableData,
} from "@/api/financeApi";
export default {
  // import引入的组件需要注入到对象中才能使用
  components: {},
  name: "department-data",
  data() {
    // 这里存放数据
    return {
      activeName: "部门费用预算汇总",
      base_api: process.env.VUE_APP_BASE_API,
      headers: {
        token: store.getters.token,
      },
      listDeptAll: {},
      listDeptMonth: {},
    };
  },
  // 监听属性 类似于data概念
  computed: {},
  // 监控data中的数据变化
  watch: {},
  // 方法集合
  methods: {
    // 获取部门费用预算汇总表格数据
    _getDepartmentExpenseBudgetSummaryTableData() {
      getDepartmentExpenseBudgetSummaryTableData().then((res) => {
        this.listDeptAll = res.data.data;
      });
    },
    //获取部门费用月度趋势表格数据
    _getMonthlyTrendOfDepartmentalExpensesTableData() {
      getMonthlyTrendOfDepartmentalExpensesTableData().then((res) => {
        this.listDeptMonth = res.data.data;
      });
    },
    /***
     * 进入在线Excel编辑数据
     * @param type
     */
    editData(type) {
      const query = {};
      switch (type) {
        case 1:
          // 部门费用预算汇总Excel表格
          query.gridKey = "departmentExpenseBudgetSummary";
          query.title = "部门费用预算汇总Excel表格";
          break;
        case 2:
          // 部门费用月度趋势Excel表格
          query.gridKey = "monthlyTrendOfDepartmentalExpenses";
          query.title = "部门费用月度趋势Excel表格";
          break;
      }
      this.$router.push({
        path: "/info_screen/excel/contributionEdit",
        query: query,
      });
    },
    // 设置表格第一行为表头样式
    rowStyle({ rowIndex }) {
      if ([0].includes(rowIndex)) {
        return {
          fontSize: "15px",
          fontWeight: "bold",
        };
      }
    },
    toPath(path) {
      if (path == "——") return;
      this.$router.push({ path: path });
    },
    copyUrl() {
      var url = window.location.host + "/#/info_screen/screen/finance/cost";

      var cInput = document.createElement("input");
      cInput.value = url;
      document.body.appendChild(cInput);
      cInput.select(); // 选取文本框内容

      // 执行浏览器复制命令
      // 复制命令会将当前选中的内容复制到剪切板中（这里就是创建的input标签）
      // Input要在正常的编辑状态下原生复制方法才会生效

      document.execCommand("copy");

      this.$message({
        type: "success",
        message: "看板地址复制成功",
      });
      // 复制成功后再将构造的标签 移除
      document.body.removeChild(cInput);
    },
    loadTableData() {
      setTimeout(() => {
        this._getDepartmentExpenseBudgetSummaryTableData();
        this._getMonthlyTrendOfDepartmentalExpensesTableData();
        this.$message.success("加载完成");
      }, 20);
    },
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.loadTableData();
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
<style lang="scss" scoped>
//  @import url(); 引入公共css类
@import "@/style/global";

.el-card {
  min-height: 800px;
}
</style>

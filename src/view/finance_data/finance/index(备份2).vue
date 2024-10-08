<!--  -->
<template>
  <div class="main-div">
    <el-card class="el-card">
      <div slot="header" class="clearfix">
        <span>{{ $t(`finance.financialManagement.title`) }}</span>

        <el-link
          style="float: right; padding: 3px 0"
          @click="toPath('/info_screen/fdata/screen/finance')"
          >{{ $t(`finance.financialManagement.viewKanban`) }}</el-link
        >
        <el-link
          style="float: right; padding: 3px 0; right: 15px"
          icon="el-icon-document-copy"
          @click="copyUrl()"
          >{{ $t(`finance.financialManagement.copyTheKanbanAddress`) }}</el-link
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
          {{ $t(`finance.financialManagement.describe`) }}
        </div>
        <el-tabs v-model="activeName" tab-position="top">
          <el-tab-pane
            :label="$t(`finance.financialManagement.overallFinancialBudget`)"
            name="总体财务预算"
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
              :data="listFinance.record"
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
            :label="$t(`finance.financialManagement.salesStatus`)"
            name="销售状况"
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
              :data="listSaleStatus.record"
              :row-config="{ isCurrent: true, isHover: true, height: 40 }"
              :column-config="{ resizable: true }"
              align="center"
              show-overflow
              :show-header="false"
              :row-style="rowStyle"
            >
              <vxe-column type="seq" label="序号"></vxe-column>
              <vxe-column title="收入/Income" field="value1" />
              <vxe-column title="销售额/Sales" field="value2" />
              <vxe-column title="销售目标/Forecast" field="value3" />
              <vxe-column title="销售目标/Forecast" field="value4" />
              <vxe-column title="上年同期/Last year" field="value5" />
              <vxe-column title="增长率/Rate of increase" field="value6" />
            </vxe-table>
          </el-tab-pane>
          <el-tab-pane
            :label="$t(`finance.financialManagement.monthlySalesTrend`)"
            name="销售月度趋势"
          >
            <vxe-toolbar perfect>
              <template #buttons>
                <vxe-button
                  icon="vxe-icon-edit"
                  status="perfect"
                  @click="editData(3)"
                  >{{ $t(`finance.edit`) }}</vxe-button
                >
              </template>
            </vxe-toolbar>
            <vxe-table
              border
              :data="listSaleMonth.record"
              :row-config="{ isCurrent: true, isHover: true, height: 40 }"
              :column-config="{ resizable: true }"
              align="center"
              show-overflow
              :show-header="false"
              :row-style="rowStyle"
            >
              <vxe-column type="seq" label="序号"></vxe-column>
              <vxe-column title="销售额/Sales" field="value1" width="200" />
              <vxe-column title="Jan." field="value2" />
              <vxe-column title="Feb." field="value3" />
              <vxe-column title="Mar." field="value4" />
              <vxe-column title="Apr." field="value5" />
              <vxe-column title="May." field="value6" />
              <vxe-column title="Jun." field="value7" />
              <vxe-column title="Jul." field="value8" />
              <vxe-column title="Aug." field="value9" />
              <vxe-column title="Sep." field="value10" />
              <vxe-column title="Oct." field="value11" />
              <vxe-column title="Nov." field="value12" />
              <vxe-column title="Dec." field="value13" />
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
  getOverallFinancialBudgetTableData,
  getSalesStatusTableData,
  getMonthlySalesTrendTableData,
} from "@/api/financeApi";
export default {
  // import引入的组件需要注入到对象中才能使用
  components: {},
  name: "finance-data",
  data() {
    // 这里存放数据
    return {
      activeName: "总体财务预算",
      base_api: process.env.VUE_APP_BASE_API,
      headers: {
        token: store.getters.token,
      },
      listFinance: {},
      listSaleStatus: {},
      listSaleMonth: {},
    };
  },
  // 监听属性 类似于data概念
  computed: {},
  // 监控data中的数据变化
  watch: {},
  // 方法集合
  methods: {
    // 设置表格第一行为表头样式
    rowStyle({ rowIndex }) {
      if ([0].includes(rowIndex)) {
        return {
          fontSize: "15px",
          fontWeight: "bold",
        };
      }
    },
    // 获取总体财务预算表格数据
    _getOverallFinancialBudgetTableData() {
      getOverallFinancialBudgetTableData().then((res) => {
        console.info(res.data);
        this.listFinance = res.data.data;
      });
    },
    // 获取销售状况表格数据
    _getSalesStatusTableData() {
      getSalesStatusTableData().then((res) => {
        this.listSaleStatus = res.data.data;
      });
    },
    //获取月度销售趋势表格数据
    _getMonthlySalesTrendTableData() {
      getMonthlySalesTrendTableData().then((res) => {
        this.listSaleMonth = res.data.data;
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
          // 总体财务预算Excel表格
          query.gridKey = "overallFinancialBudget";
          query.title = "总体财务预算Excel表格";
          break;
        case 2:
          // 销售状况Excel表格
          query.gridKey = "salesStatus";
          query.title = "销售状况Excel表格";
          break;
        case 3:
          // 月度销售趋势Excel表格
          query.gridKey = "monthlySalesTrend";
          query.title = "月度销售趋势Excel表格";
          break;
      }
      this.$router.push({
        path: "/info_screen/excel/contributionEdit",
        query: query,
      });
    },
    toPath(path) {
      if (path == "——") return;
      this.$router.push({ path: path });
    },
    copyUrl() {
      var url = window.location.host + "/#/info_screen/screen/finance/finance";

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
        this._getOverallFinancialBudgetTableData();
        this._getSalesStatusTableData();
        this._getMonthlySalesTrendTableData();
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

.main-description {
  color: #837b7b;
  font-size: 14px;
  margin-bottom: 20px;
}

.table-head-class {
  color: red;
}

.el-card {
  min-height: 800px;
}
</style>

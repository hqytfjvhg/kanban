<!--  -->
<template>
  <div class="main-div">
    <el-card class="el-card">
      <div slot="header" class="clearfix">
        <span>{{ $t(`finance.cashManagement.title`) }}</span>

        <el-link
          style="float: right; padding: 3px 0"
          @click="toPath('/info_screen/fdata/screen/money')"
          >{{ $t(`finance.cashManagement.viewKanban`) }}</el-link
        >
        <el-link
          style="float: right; padding: 3px 0; right: 15px"
          icon="el-icon-document-copy"
          @click="copyUrl()"
          >{{ $t(`finance.cashManagement.copyTheKanbanAddress`) }}</el-link
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
          {{ $t(`finance.cashManagement.describe`) }}
        </div>
        <el-tabs v-model="activeName" tab-position="top">
          <el-tab-pane
            :label="$t(`finance.cashManagement.balancePosition`)"
            name="余额状况"
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
              :data="listBalance.record"
              :row-config="{ isCurrent: true, isHover: true, height: 40 }"
              :column-config="{ resizable: true }"
              align="center"
              show-overflow
              :show-header="false"
              :row-style="rowStyle"
            >
              <vxe-column type="seq" label="序号"></vxe-column>
              <vxe-column field="value1" />
              <vxe-column field="value2" />
            </vxe-table>
          </el-tab-pane>
          <el-tab-pane
            :label="$t(`finance.cashManagement.purchasingMonthlyTrend`)"
            name="采购月度趋势"
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
              :data="listPurchase.record"
              :row-config="{ isCurrent: true, isHover: true, height: 40 }"
              :column-config="{ resizable: true }"
              align="center"
              show-overflow
              :show-header="false"
              :row-style="rowStyle"
            >
              <vxe-column type="seq" label="序号"></vxe-column>
              <vxe-column field="value1" width="300" />
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
          <el-tab-pane
            :label="$t(`finance.cashManagement.cashFlowSituation`)"
            name="现金流情况"
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
              :data="listCash.record"
              :row-config="{ isCurrent: true, isHover: true, height: 40 }"
              :column-config="{ resizable: true }"
              align="center"
              show-overflow
              :show-header="false"
              :row-style="rowStyle"
            >
              <vxe-column type="seq" label="序号"></vxe-column>
              <vxe-column field="value1" width="300" />
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
import {
  getBalancePositionTableData,
  getPurchasingMonthlyTrendTableData,
  getCashFlowSituationTableData,
} from "@/api/financeApi";
import store from "@/store";
export default {
  // import引入的组件需要注入到对象中才能使用
  components: {},
  name: "cash-data",
  data() {
    // 这里存放数据
    return {
      activeName: "余额状况",
      base_api: process.env.VUE_APP_BASE_API,
      headers: {
        token: store.getters.token,
      },
      listCash: {},
      listBalance: {},
      listPurchase: {},
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
    // 获取余额状况表格数据
    _getBalancePositionTableData() {
      getBalancePositionTableData().then((res) => {
        this.listBalance = res.data.data;
      });
    },
    // 获取采购月度趋势Excel表格数据
    _getPurchasingMonthlyTrendTableData() {
      getPurchasingMonthlyTrendTableData().then((res) => {
        this.listPurchase = res.data.data;
      });
    },
    // 获取现金流情况Excel表格数据
    _getCashFlowSituationTableData() {
      getCashFlowSituationTableData().then((res) => {
        this.listCash = res.data.data;
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
          // 余额状况Excel表格
          query.gridKey = "balancePosition";
          query.title = "余额状况Excel表格";
          break;
        case 2:
          // 采购月度趋势Excel表格
          query.gridKey = "purchasingMonthlyTrend";
          query.title = "采购月度趋势Excel表格";
          break;
        case 3:
          // 现金流情况Excel表格
          query.gridKey = "cashFlowSituation";
          query.title = "现金流情况Excel表格";
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
      var url = window.location.host + "/#/info_screen/screen/finance/money";

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
        this._getBalancePositionTableData();
        this._getPurchasingMonthlyTrendTableData();
        this._getCashFlowSituationTableData();
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

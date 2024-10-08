<template>
  <div class="profit-container">
    <h3>{{ $t(`finance.profit.title`) }}</h3>
    <el-row :gutter="20">
      <el-col :xl="7" :lg="7" :md="7">
        <!-- <el-table
          :data="saleTableData"
          :header-cell-style="{
            background: '#eef1f6',
            color: '#606266',
            textAlign: 'center',
          }"
          :border="true"
        >
          <el-table-column prop="income" label="收入"></el-table-column>
          <el-table-column prop="value" label="属性"></el-table-column>
          <el-table-column prop="sum" label="金额" width="150">
            <template slot-scope="scope">
              <el-input
                v-model="scope.row.sum"
                :clearable="true"
                oninput="value= value.match(/\d+(\.\d{0,2})?/) ? value.match(/\d+(\.\d{0,2})?/)[0] : ''"
                @blur="getNum(scope.row.sum)"
                placeholder="请输入金额"
              ></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="proportion" label="占比"> </el-table-column>
        </el-table> -->

        <!-- 成本测算 -->
        <el-table
          :data="costTableData"
          :header-cell-style="{
            background: '#eef1f6',
            color: '#606266',
            textAlign: 'center',
          }"
          stripe
          :border="true"
          :span-method="arraySpan"
          :cell-class-name="cellClassName"
        >
          <el-table-column :label="$t(`finance.profit.costEstimation`)">
            <el-table-column
              prop="cost"
              :label="$t(`finance.profit.revenue`)"
            ></el-table-column>
            <el-table-column
              prop="value"
              :label="$t(`finance.profit.attribute`)"
            ></el-table-column>
            <el-table-column
              prop="sum"
              align="right"
              :label="$t(`finance.profit.amount`)"
            >
              <!-- <template slot-scope="scope">
                <span v-if="scope.row.sum >= 1000">{{
                  scope.row.sum | fmtNum
                }}</span>
                <span v-else>{{ scope.row.sum }}</span>
              </template> -->
            </el-table-column>
            <el-table-column
              prop="proportion"
              align="right"
              :label="$t(`finance.profit.occupancy`)"
            ></el-table-column>
          </el-table-column>
        </el-table>
      </el-col>

      <el-col :xl="4" :lg="5" :md="6" class="mr">
        <!-- 销量 -->
        <!-- <el-table
          :data="saleNumData"
          :header-cell-style="{
            background: '#eef1f6',
            color: '#606266',
            textAlign: 'center',
          }"
          :border="true"
          :cell-class-name="saleCellName"
        >
          <el-table-column prop="sale" label="销量"></el-table-column>

          <el-table-column prop="num" label="数据" width="150">
            <template slot-scope="scope">
              <el-input
                v-model="scope.row.num"
                :clearable="true"
                oninput="value= value.match(/\d+(\.\d{0,2})?/) ? value.match(/\d+(\.\d{0,2})?/)[0] : ''"
                @input="handleCount(scope.row.num)"
                placeholder="请输入数量"
              ></el-input>
            </template>
          </el-table-column>
        </el-table> -->

        <!-- 结论 -->
        <el-table
          :data="totalTableData"
          :header-cell-style="{
            background: 'rgb(238, 241, 246)',
            color: '#606266',
            textAlign: 'center',
          }"
          stripe
          :border="true"
          :cell-class-name="totalCellName"
        >
          <el-table-column
            prop="cost"
            :label="$t(`finance.profit.conclusion`)"
          ></el-table-column>
          <el-table-column
            prop="sum"
            width="150"
            align="right"
            :label="$t(`finance.profit.data`)"
          >
            <template slot-scope="scope">
              <span v-if="scope.row.sum >= 1000 || scope.row.sum <= -1000">{{
                scope.row.sum | fmtNum
              }}</span>
              <span v-else>{{ scope.row.sum }}</span>
            </template>
          </el-table-column>
        </el-table>

        <!-- 图表辅助列 -->
        <el-table
          :data="chartTableData"
          :header-cell-style="{
            color: '#606266',
          }"
          stripe
          :border="true"
          :cell-class-name="cellClassName"
        >
          <el-table-column :label="$t(`finance.profit.chartAuxiliaryColumn`)">
            <el-table-column prop="category" :label="$t(`finance.profit.type`)">
            </el-table-column>
            <el-table-column
              prop="min"
              align="right"
              :label="$t(`finance.profit.min`)"
            >
              <template slot-scope="scope">
                <el-input
                  v-model="scope.row.min"
                  v-if="
                    scope.$index == 0 || scope.$index == 1 || scope.$index == 2
                  "
                  class="input-style"
                ></el-input>
                <!-- <span v-if="scope.row.min >= 1000">{{
                scope.row.min | fmtNum
              }}</span> -->
                <span v-else>{{ scope.row.min }}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="max"
              align="right"
              :label="$t(`finance.profit.max`)"
            >
              <!-- <template slot-scope="scope"> -->
              <!-- <el-input v-model="scope.row.max"></el-input> -->
              <!-- <span v-if="scope.row.max >= 1000">{{
                scope.row.max | fmtNum
              }}</span>
              <span v-else>{{ scope.row.max }}</span> -->
              <!-- </template> -->
            </el-table-column>
          </el-table-column>
        </el-table>
      </el-col>

      <el-col :xl="13" :lg="12" :md="11">
        <el-row :gutter="20">
          <el-col
            v-for="(sale, index) in saleInfo"
            :key="sale"
            :span="8"
            class="saleInfo"
          >
            <el-card>
              <div class="saleInfo-title">
                {{ sale.title }}
                <!-- <i
                  class="el-icon-circle-plus-outline"
                  v-if="index == 2"
                  @click="addMachine"
                ></i> -->
              </div>
              <div class="saleInfo-num">
                <el-input
                  v-model="sum"
                  v-if="index == 0"
                  @input="getNum(sum)"
                ></el-input>
                <el-input
                  v-model="saleNum"
                  v-if="index == 1"
                  @input="handleCount(saleNum)"
                ></el-input>
                <el-select
                  v-model="machine"
                  v-if="index == 2"
                  @change="changeMachineData"
                >
                  <el-option
                    v-for="item in machineOption"
                    :key="item.machineName"
                    :label="item.machineName"
                    :value="item.id"
                  ></el-option
                ></el-select>
              </div>
            </el-card>
          </el-col>
        </el-row>
        <!-- 图表 -->
        <div class="chart-container"><div class="line" id="line"></div></div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getAllMachineType } from "@/api/profit/table.js";
// import i18n from "@/language/index.ts";
export default {
  name: "profit-index",
  data() {
    return {
      sum: "600", // 单价
      saleNum: "1500", // 销售数量
      machineOption: [],
      machine: null, //绑定的机器
    };
  },
  filters: {
    // 金额千分位格式化
    fmtNum(val) {
      return val.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
    },
  },
  computed: {
    saleInfo() {
      return [
        { title: this.$t(`finance.profit.salesPrice`), sum: "" },
        { title: this.$t(`finance.profit.salesNum`), saleSum: "" },
        { title: this.$t(`finance.profit.modelSelection`), machine: "" },
      ];
    },
    costTableData() {
      return [
        {
          cost: this.$t(`finance.profit.ariableCost`),
          value: "",
          sum: "",
          proportion: "",
          name: "ariableCost",
        },
        {
          // cost: "BOM成本",
          cost: this.$t(`finance.profit.bomCost`),
          value: this.$t(`finance.profit.variablePriceRatio`),
          sum: "",
          proportion: "",
          name: "bomCost",
        },
        {
          cost: this.$t(`finance.profit.promotionExpense`),
          value: this.$t(`finance.profit.fixedPriceRatio`),
          sum: "",
          proportion: "",
          name: "promotionExpense",
        },
        {
          cost: this.$t(`finance.profit.brandExpense`),
          value: this.$t(`finance.profit.fixedPriceRatio`),
          sum: "",
          proportion: "",
          name: "brandExpense",
        },
        {
          cost: this.$t(`finance.profit.freight`),
          value: this.$t(`finance.profit.fixedFee`),
          sum: "",
          proportion: "",
          name: "freight",
        },
        {
          cost: this.$t(`finance.profit.wastage`),
          value: this.$t(`finance.profit.fixedFee`),
          sum: "",
          proportion: "",
          name: "wastage",
        },
        {
          cost: this.$t(`finance.profit.websitePlatformCost`),
          value: this.$t(`finance.profit.fixedPriceRatio`),
          sum: "",
          proportion: "",
          name: "websitePlatformCost",
        },
        {
          cost: this.$t(`finance.profit.packingExpense`),
          value: this.$t(`finance.profit.fixedPriceRatio`),
          sum: "",
          proportion: "",
          name: "packingExpense",
        },
        {
          cost: this.$t(`finance.profit.taxes`),
          value: this.$t(`finance.profit.fixedPriceRatio`),
          sum: "",
          proportion: "",
          name: "taxes",
        },
        {
          cost: this.$t(`finance.profit.salesCommission`),
          value: this.$t(`finance.profit.fixedPriceRatio`),
          sum: "",
          proportion: "",
          name: "salesCommission",
        },
        {
          cost: this.$t(`finance.profit.other`),
          value: this.$t(`finance.profit.fixedPriceRatio`),
          sum: "",
          proportion: "",
          name: "other",
        },
        {
          cost: this.$t(`finance.profit.unitContributionMargin`),
          value: "",
          sum: "",
          proportion: "",
          name: "unitContributionMargin",
        },
        {
          cost: this.$t(`finance.profit.totalFixedCost`),
          value: "",
          sum: "",
          proportion: "",
          name: "totalFixedCost",
        },
        {
          cost: this.$t(`finance.profit.developmentExpense`),
          value: this.$t(`finance.profit.fixedFee`),
          sum: "",
          proportion: "",
          name: "developmentExpense",
        },
        {
          cost: this.$t(`finance.profit.sellingExpense`),
          value: this.$t(`finance.profit.fixedFee`),
          sum: "",
          proportion: "",
          name: "sellingExpense",
        },
        {
          cost: this.$t(`finance.profit.managerExpense`),
          value: this.$t(`finance.profit.fixedFee`),
          sum: "",
          proportion: "",
          name: "managerExpense",
        },
        {
          cost: this.$t(`finance.profit.otherExpense`),
          value: this.$t(`finance.profit.fixedFee`),
          sum: "",
          proportion: "",
          name: "otherExpense",
        },
      ];
    },
    // 结论
    totalTableData() {
      return [
        {
          cost: this.$t(`finance.profit.totalSalesRevenue`),
          sum: "",
        },
        {
          cost: this.$t(`finance.profit.totalCost`),
          sum: "",
        },
        {
          cost: this.$t(`finance.profit.totalMarginalContribution`),
          sum: "",
        },
        {
          cost: this.$t(`finance.profit.profitMargin`),
          sum: "",
        },
        {
          cost: this.$t(`finance.profit.breakevenSalesVolume`),
          sum: "",
        },
      ];
    },
    // 图表
    chartTableData() {
      return [
        {
          category: this.$t(`finance.profit.salesVolume`),
          min: "0",
          max: "",
        },
        {
          category: this.$t(`finance.profit.totalRevenue`),
          min: "0",
          max: "",
        },
        {
          category: this.$t(`finance.profit.variableCosts`),
          min: "0",
          max: "",
        },
        {
          category: this.$t(`finance.profit.totalCost`),
          min: "",
          max: "",
        },
        {
          category: this.$t(`finance.profit.fixedCost`),
          min: "",
          max: "",
        },
      ];
    },
  },
  watch: {
    "$i18n.locale": {
      handler() {
        this.getMachine();
      },
      immediate: true,
    },
  },
  methods: {
    // 初始化
    init() {
      // 设置数据
      this.setIncome(); // 设置成本表格-金额
      this.getNum(); // 获取销售单价
      this.handleCount(); // 设置销售数量
    },
    // 设置成本表格-金额
    setIncome() {
      let noIndex = [11, 12, 13, 14, 15, 16];
      // 设置变动成本-金额
      this.costTableData[0].sum = this.costTableData.reduce(
        (prev, cur, curIndex) => {
          if (!noIndex.includes(curIndex)) {
            return Number(cur.sum) + prev;
          }
          return prev;
        },
        0
      );

      // 固定成本合计-金额
      this.costTableData[12].sum = this.costTableData.reduce(
        (prev, cur, curIndex) => {
          if (noIndex !== 11 && noIndex !== 12 && noIndex.includes(curIndex)) {
            return Number(cur.sum) + prev;
          }
          return prev;
        },
        0
      );
    },
    /**
     * 获取销售单价
     * @param {*} v 数目
     */
    getNum(v) {
      v = v || this.sum;
      if (!v) return;

      this.sum = v;
      this.setData(); // 设置销售单价表格数据
    },
    // 设置销售单价表格数据
    setData() {
      // 不计算的列数
      let noIndex = [11, 12, 13, 14, 15, 16, 17];

      // 单位边际贡献
      this.costTableData[11].sum = this.getFixNum(
        this.sum - this.costTableData[0].sum
      );

      // 占比
      this.costTableData.forEach((item, i) => {
        if (!noIndex.includes(i)) {
          this.costTableData[i].proportion = this.getRoundNum(
            item.sum / this.sum
          );
        }
      });
      // 单位边际贡献-占比
      this.costTableData[11].proportion = this.getRoundNum(
        this.costTableData[11].sum / this.sum
      );

      this.setCountData(); // 设置结论表格数据
    },

    /**
     * 设置销售数量
     * @param {*} v 数目
     */
    handleCount(v) {
      if (!v) return;
      console.log(v, "数目");
      this.saleNum = v;
      this.setCountData(); // 设置结论表格数据
    },
    // 设置结论表格数据
    setCountData() {
      // 销售总收入
      this.totalTableData[0].sum = this.getFixNum(this.sum * this.saleNum);
      this.totalTableData[1].sum = this.getFixNum(
        this.costTableData[0].sum * this.saleNum + this.costTableData[12].sum
      );

      this.totalTableData[2].sum = this.getFixNum(
        this.saleNum * this.costTableData[11].sum
      );
      this.totalTableData[3].sum = this.getRoundNum(
        (this.totalTableData[0].sum - this.totalTableData[1].sum) /
          this.totalTableData[0].sum
      );

      this.totalTableData[4].sum = Math.round(
        this.costTableData[12].sum / this.costTableData[11].sum,
        0
      );

      // 固定成本合计-占比
      if (this.totalTableData[0].sum) {
        this.costTableData[12].proportion = this.getRoundNum(
          this.costTableData[12].sum / this.totalTableData[0].sum
        );
        this.costTableData[13].proportion = this.getRoundNum(
          this.costTableData[13].sum / this.totalTableData[0].sum
        );
        this.costTableData[14].proportion = this.getRoundNum(
          this.costTableData[14].sum / this.totalTableData[0].sum
        );
        this.costTableData[15].proportion = this.getRoundNum(
          this.costTableData[15].sum / this.totalTableData[0].sum
        );
        this.costTableData[16].proportion = this.getRoundNum(
          this.costTableData[16].sum / this.totalTableData[0].sum
        );
      }

      this.setChartTable(); // 设置图表表格数据
    },
    // 设置图表表格数据
    setChartTable() {
      this.chartTableData[0].max = this.saleNum;
      this.chartTableData[1].max = this.totalTableData[0].sum;

      this.chartTableData[2].max = this.getFixNum(
        this.costTableData[0].sum * this.chartTableData[0].max
      );
      this.chartTableData[4].max = this.chartTableData[4].min =
        this.costTableData[12].sum;
      this.chartTableData[3].min =
        Number(this.chartTableData[2].min) + this.chartTableData[4].min;

      this.chartTableData[3].max = this.getFixNum(
        Number(this.chartTableData[2].max) + this.chartTableData[4].max
      );

      // 图表
      this.setChart();
    },

    /**
     * 百分比取整
     * @param {*} val 数目
     */
    getRoundNum(val) {
      return Math.round(val.toFixed(2) * 100) + "%";
    },
    /**
     * 整数不保留小数
     * @param {*} val 数目
     */
    getFixNum(val) {
      return Number.isInteger(val) ? val : Number(val).toFixed(2);
    },
    /**
     * 成本表格-单元格居中
     * @param {*} rowIndex 行序号
     * @param {*} columnIndex 列序号
     */
    arraySpan({ rowIndex, columnIndex }) {
      if (
        (rowIndex === 11 && columnIndex === 0) ||
        (rowIndex === 12 && columnIndex === 0)
      ) {
        return [1, 2];
      } else if (
        (rowIndex === 11 && columnIndex === 1) ||
        (rowIndex === 12 && columnIndex === 1)
      ) {
        return [0, 0];
      }
    },
    /**
     * 成本表格-单元格样式设置
     * @param {*} rowIndex 行序号
     * @param {*} columnIndex 列序号
     */
    cellClassName({ rowIndex, columnIndex }) {
      if ((rowIndex === 11 || rowIndex === 12) && columnIndex === 0)
        return "cell-center";
      return rowIndex % 2 === 0 ? "" : "table-row-striped";
    },
    /**
     * 结论表格-单元格样式设置
     * @param {*} rowIndex 行序号
     * @param {*} columnIndex 列序号
     */
    totalCellName({ rowIndex, columnIndex }) {
      if (rowIndex === 4 && columnIndex === 1) return "red";
      return rowIndex % 2 === 0 ? "" : "table-row-striped";
    },
    /**
     * 销售表格-单元格样式设置
     * @param {*} rowIndex 行序号
     * @param {*} columnIndex 列序号
     */
    saleCellName({ rowIndex, columnIndex }) {
      if (rowIndex === 0 && columnIndex === 1) return "yellow";
    },

    // 图表-折线图
    setChart() {
      // 蓝色线-总收入
      const data = [this.chartTableData[1].min, this.chartTableData[1].max];
      // 橙色线-变动成本
      const data2 = [this.chartTableData[2].min, this.chartTableData[2].max];
      // 灰色线-总成本
      const data3 = [this.chartTableData[3].min, this.chartTableData[3].max];
      // 黄色线-固定成本
      const data4 = [this.chartTableData[4].min, this.chartTableData[4].max];

      // x轴刻度数组
      const saleNum = Number(this.saleNum);
      const moreNum = "1" + this.saleNum.slice(1);

      let xAxisData = [this.chartTableData[0].min, this.chartTableData[0].max];
      // res = 0,
      // count = saleNum / moreNum;
      // for (let i = 0; i <= count; i++) {
      //   if (i == 0 || i == Math.floor(count)) {
      //     res = i * moreNum;

      //     // x轴刻度处理
      //     if (res <= saleNum) {
      //       xAxisData.push(res);

      //       // 最后刻度处理
      //       // if (res == Math.floor(saleNum) || (res + moreNum) > Math.floor(saleNum)) {
      //       //   let data = (Math.floor(count) + 1) * moreNum
      //       //   // 小于50，单独处理
      //       //   if (saleNum < 50) data = res + 5

      //       //   xAxisData.push(Math.floor(data));
      //       // }
      //     }
      //   }
      // }

      // 折线图配置
      let option = {
        tooltip: {
          show: true,
          trigger: "item",
        },
        legend: {
          data: ["总收入", "变动成本", "总成本", "固定成本"],
        },
        xAxis: {
          type: "category",
          min: this.chartTableData[0].min,
          max: this.saleNum,
          data: xAxisData,
          boundaryGap: false,
          axisPointer: {
            show: true,
          },
          axisLine: {
            show: true,
          },
          splitNumber: 5,
          axisTick: {
            alignWithLabel: true,
            interval: "auto",
          },
          axisLabel: {
            show: true,
            interval: "auto",
          },
        },
        yAxis: {
          type: "value",
          axisLine: {
            show: true,
          },
        },
        grid: {
          containLabel: true,
          left: "3%",
          right: "3%",
          bottom: "3%",
        },

        series: [
          {
            data,
            type: "line",
            name: "总收入",
          },
          {
            data: data2,
            type: "line",
            name: "变动成本",
          },
          {
            data: data3,
            type: "line",
            name: "总成本",
          },
          {
            data: data4,
            type: "line",
            name: "固定成本",
          },
        ],
      };
      let lineChart = this.$echarts.init(document.getElementById("line"));
      lineChart.setOption(option);
    },
    async getMachine() {
      const { data: res } = await getAllMachineType();
      // console.log(res);
      if (res.code == 200) {
        this.machineOption = res.data;
        this.machine = this.machineOption[0].id;
        this.changeMachineData(this.machineOption[0].id);
      }
    },
    async changeMachineData(value) {
      if (value) {
        const machineData = this.machineOption.filter(
          (item) => item.id == value
        )[0];
        // console.log(machineData);

        this.costTableData.map((item) => {
          if (machineData[item.name]) {
            item.sum = machineData[item.name];
          } else {
            item.sum = "";
          }
        });
        this.init();
      }
    },
  },
  created() {
    document.title = "Profit Dashboard";
  },
  async mounted() {
    // 页面进入时加载内容

    await this.getMachine();
    // this.init();
  },
};
</script>
<style lang="scss">
.profit-container {
  padding: 0 50px;

  .line {
    width: 100%;
    flex-grow: 1;
    height: calc(100vh - 170px);
  }
  .title {
    width: 30%;
    display: inline-block;
    height: 40px;
    line-height: 40px;
    color: #606266;
    background-color: #eef1f6;
    box-sizing: border-box;
    padding-left: 5px;
  }

  .mr {
    display: grid;
    align-content: space-between;
    height: calc(100vh - 40px);
  }

  .cell-center {
    color: #606266;
    background-color: #c0c4cc !important;
    text-align: center;
    vertical-align: middle;
  }

  h3 {
    font-size: 20px;
    font-weight: bold;
    color: #333;
    margin: 6px;
  }

  .red {
    color: #fa2121;
    background-color: #c0c4cc !important;
  }
  .table-row-striped {
    background: #f5f7fa !important;
  }
  .yellow {
    background-color: #f9ee03;
  }
  .saleInfo {
    margin-bottom: 20px;
    // height: 50px;
    .saleInfo-title {
      font-weight: 700;
      height: 30px;
      line-height: 30px;
      color: #409eff;
    }
    .saleInfo-num {
      // width: 50%;
    }
  }
  .input-style .el-input__inner {
    border: 1px solid #409eff;
  }
}
</style>

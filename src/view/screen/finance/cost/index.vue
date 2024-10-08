<!--  -->
<template>
  <div
    id="cost-container"
    class="cost-container"
  >
    <ChangeLan class="change-lan"></ChangeLan>
    <div
      class="first-row top-left-parent"
      :style="'height:' + this.firstHeight + 'px;'"
    >
      <div class="top-left-text">{{ topLeftCornerOfTheFinancialBoard_ }}</div>
      <div class="cost-table">
        <el-table
          class="table"
          style="margin:auto 1.4.5rem;width:100%; padding: 5px;"
          :data="cost"
          :height="this.tableHeight - 40 + 'px'"
          :cell-style="cellStyle"
        >
          <el-table-column
            type="index"
            width="40"
          />
          <el-table-column
            v-if="$i18n.locale === 'ch'"
            align="center"
            :label="$t(`cost.department`)"
            prop="name"
          >
          </el-table-column>
          <el-table-column
            v-else
            align="center"
            :label="$t(`cost.department`)"
            prop="enName"
          >
          </el-table-column>
          <el-table-column
            align="center"
            :label="$t(`cost.expense`)"
            prop="cost"
          >
          </el-table-column>
          <el-table-column
            align="center"
            :label="$t(`cost.forecast`)"
            prop="budget"
          >
          </el-table-column>
          <el-table-column
            align="center"
            :label="$t(`cost.difference`)"
            prop="rate"
            :formatter="formatRate"
          >
            <template slot-scope="scope">
              <span
                v-if="scope.row.rate > 0"
                style="color: red"
              >{{ scope.row.rate }}%</span>
              <span v-else>{{ scope.row.rate }}%</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 办事处 -->
      <div class="chart-group top-left-parent">
        <div class="top-left-text">{{ topLeftCornerOfTheFinancialBoard_ }}</div>
        <div
          class="charts1"
          style="display: flex;"
        >
          <div
            id="circle1"
            style="flex: 1"
            :style="'height:' + (this.circleChartHeight - 10) + 'px;' + 'width:' + (this.circleChartWidth - 20) + 'px;'"
          ></div>
          <div
            id="circle2"
            style="flex: 1"
            :style="'height:' + (this.circleChartHeight - 10) + 'px;' + 'width:' + (this.circleChartWidth - 20) + 'px;'"
          ></div>
          <div
            id="circle3"
            style="flex: 1"
            :style="'height:' + (this.circleChartHeight - 10) + 'px;' + 'width:' + (this.circleChartWidth - 20) + 'px;'"
          ></div>
          <div
            id="circle4"
            style="flex: 1"
            :style="'height:' + (this.circleChartHeight - 10) + 'px;' + 'width:' + (this.circleChartWidth - 20) + 'px;'"
          ></div>
        </div>
        <div
          class="charts2"
          style="display: flex"
        >
          <div
            id="circle5"
            style="flex: 1"
            :style="
              'height:' +
              (this.circleChartHeight - 10) +
              'px;' +
              'width:' +
              (this.circleChartWidth - 20) +
              'px;'
            "
          ></div>
          <div
            id="circle6"
            style="flex: 1"
            :style="
              'height:' +
              (this.circleChartHeight - 10) +
              'px;' +
              'width:' +
              (this.circleChartWidth - 20) +
              'px;'
            "
          ></div>
          <div
            id="circle7"
            style="flex: 1"
            :style="
              'height:' +
              (this.circleChartHeight - 10) +
              'px;' +
              'width:' +
              (this.circleChartWidth - 20) +
              'px;'
            "
          ></div>
          <div
            id="circle8"
            style="flex: 1"
            :style="
              'height:' +
              (this.circleChartHeight - 10) +
              'px;' +
              'width:' +
              (this.circleChartWidth - 20) +
              'px;'
            "
          ></div>
        </div>
      </div>
    </div>
    <!-- 费用 -->
    <div
      class="second-row"
      :style="'height:' + this.secondHeight + 'px;'"
    >
      <div
        class="cost-count top-left-parent"
        style="text-align: center;"
      >
        <div
          class="top-left-text"
          style="margin: 20px;"
        >
          {{ topLeftCornerOfTheFinancialBoard_ }}
        </div>
        <div
          class="sale-volumn"
          style="height: 50%;margin:1rem 2rem"
        >
          <div
            class="title"
            style="font-size: 3rem; color: aquamarine; margin-bottom: 15px"
          >
            {{ $t(`cost.totalExpense`) }}
          </div>
          <div
            class="content"
            style="font-size: 4.5rem; color: aquamarine"
          >
            {{ total.volume }}
          </div>
        </div>
        <div
          class="sale-budget"
          style="height: 40%;margin:1rem 2rem"
        >

          <div
            class="title"
            style="font-size: 3rem; color: aquamarine; margin-bottom: 15px"
          >
            {{ $t(`cost.torecastExpense`) }}
          </div>
          <div
            class="content"
            style="font-size: 4.5rem; color: aquamarine"
          >
            {{ total.budget }}
          </div>
        </div>
      </div>
      <!-- 费用月度趋势 -->
      <div class="top-left-parent">
        <div class="top-left-text" style="    margin: 20px;">{{ topLeftCornerOfTheFinancialBoard_ }}</div>
        <div
          class="line-chart"
          id="lineChart"
          :style="{
            width: lineChartWidth + 'px',
            height: lineChartHeight + 'px',
          }"
        ></div>
      </div>
      <!-- 部门费用图 -->
      <div class="top-left-parent">
        <div
          class="top-left-text"
          style="margin: 20px;"
        >
          {{ topLeftCornerOfTheFinancialBoard_ }}
        </div>
        <div
          class="bar-chart"
          id="barChart"
          :style="{
            width: barChartWidth + 'px',
            height: barChartHeight + 'px',
          }"
        ></div>
      </div>
    </div>
  </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';
import { topLeftCornerOfTheFinancialBoard } from "../constant";
import { deptAll, deptMonth } from "@/api/board";
import ChangeLan from "@/components/changeLan/index.vue";
export default {
  // import引入的组件需要注入到对象中才能使用
  components: { ChangeLan },
  name: "cost-screen",
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
      topLeftCornerOfTheFinancialBoard_: topLeftCornerOfTheFinancialBoard,
      loading: null,
      firstHeight: 0,
      secondHeight: 0,
      circleChartHeight: 0,
      circleChartWidth: 0,
      tableHeight: 0,
      tableWidth: 0,
      lineChartWidth: 0,
      lineChartHeight: 0,
      barChartWidth: 0,
      barChartHeight: 0,
      cost: [],
      total: {
        volume: "",
        budget: "",
      },
      circleOptions1: {
        title: {
          text: "UK办事处",
          left: "center",
          textStyle: {
            fontSize: 20,
            color: "#eee",
          },
        },
        tooltip: {
          trigger: "item",
        },
        legend: {
          show: false,
          left: "left",
          bottom: "5%",
          itemWidth: 24, // 设置宽度
          itemHeight: 14, // 设置高度
          itemGap: 5, // 设置间距
          textStyle: {
            // 文字颜色
            color: "#fff",
            // 字体粗细 'normal','bold','bolder','lighter',100 | 200 | 300 | 400...
            fontWeight: "400",
            // 字体系列
            fontFamily: "Source Han Sans CN",
            // 字体大小
            fontSize: 12,
          },
        },
        series: [
          {
            name: "UK办事处",
            type: "pie",
            radius: ["40%", "70%"],
            center: ['50%', '55%'],
            avoidLabelOverlap: false,
            label: {
              fontSize: 16,
              position: "inner",
              fontWeight: "bold",
              color: "#eee",
              formatter: "{b|{b}} {c|{c}}",
              rich: {
                b: {
                  fontSize: 14,
                },
              },
            },
            emphasis: {
              label: {
                show: true,
                fontSize: 40,
                fontWeight: "bold",
              },
            },
            labelLine: {
              show: false,
            },
            data: [
              { value: 2876346, name: "费用" },
              { value: 2640553, name: "预算" },
            ],
          },
        ],
      },
      circleOptions2: {
        title: {
          text: "USA办事处",
          left: "center",
          textStyle: {
            fontSize: 20,
            color: "#eee",
          },
        },
        tooltip: {
          trigger: "item",
        },
        legend: {
          show: false,
          left: "left",
          bottom: "5%",
          itemWidth: 24, // 设置宽度
          itemHeight: 14, // 设置高度
          itemGap: 5, // 设置间距
          textStyle: {
            // 文字颜色
            color: "#fff",
            // 字体粗细 'normal','bold','bolder','lighter',100 | 200 | 300 | 400...
            fontWeight: "400",
            // 字体系列
            fontFamily: "Source Han Sans CN",
            // 字体大小
            fontSize: 12,
          },
        },
        series: [
          {
            name: "USA办事处",
            type: "pie",
            radius: ["40%", "70%"],
            center: ['50%', '55%'],
            avoidLabelOverlap: false,
            label: {
              fontSize: 16,
              position: "inner",
              fontWeight: "bold",
              color: "#eee",
              formatter: "{b|{b}} {c|{c}}",
              rich: {
                b: {
                  fontSize: 14,
                },
              },
            },
            emphasis: {
              label: {
                show: true,
                fontSize: 40,
                fontWeight: "bold",
              },
            },
            labelLine: {
              show: false,
            },
            data: [
              { value: 2876346, name: "费用" },
              { value: 2640553, name: "预算" },
            ],
          },
        ],
      },
      circleOptions3: {
        title: {
          text: "HK办事处",
          left: "center",
          textStyle: {
            fontSize: 20,
            color: "#eee",
          },
        },
        tooltip: {
          trigger: "item",
        },
        legend: {
          show: false,
          left: "left",
          bottom: "5%",
          itemWidth: 24, // 设置宽度
          itemHeight: 14, // 设置高度
          itemGap: 5, // 设置间距
          textStyle: {
            // 文字颜色
            color: "#fff",
            // 字体粗细 'normal','bold','bolder','lighter',100 | 200 | 300 | 400...
            fontWeight: "400",
            // 字体系列
            fontFamily: "Source Han Sans CN",
            // 字体大小
            fontSize: 12,
          },
        },
        series: [
          {
            name: "HK办事处",
            type: "pie",
            radius: ["40%", "70%"],
            center: ['50%', '55%'],
            avoidLabelOverlap: false,
            label: {
              fontSize: 16,
              position: "inner",
              fontWeight: "bold",
              color: "#eee",
              formatter: "{b|{b}} {c|{c}}",
              rich: {
                b: {
                  fontSize: 14,
                },
              },
            },
            emphasis: {
              label: {
                show: true,
                fontSize: 40,
                fontWeight: "bold",
              },
            },
            labelLine: {
              show: false,
            },
            data: [
              { value: 2876346, name: "费用" },
              { value: 2640553, name: "预算" },
            ],
          },
        ],
      },
      circleOptions4: {
        title: {
          text: "研发部",
          left: "center",
          textStyle: {
            fontSize: 20,
            color: "#eee",
          },
        },
        tooltip: {
          trigger: "item",
        },
        legend: {
          show: false,
          left: "left",
          bottom: "5%",
          itemWidth: 24, // 设置宽度
          itemHeight: 14, // 设置高度
          itemGap: 5, // 设置间距
          textStyle: {
            // 文字颜色
            color: "#fff",
            // 字体粗细 'normal','bold','bolder','lighter',100 | 200 | 300 | 400...
            fontWeight: "400",
            // 字体系列
            fontFamily: "Source Han Sans CN",
            // 字体大小
            fontSize: 12,
          },
        },
        series: [
          {
            name: "研发部",
            type: "pie",
            radius: ["40%", "70%"],
            center: ['50%', '55%'],
            avoidLabelOverlap: false,
            label: {
              fontSize: 16,
              position: "inner",
              fontWeight: "bold",
              color: "#eee",
              formatter: "{b|{b}} {c|{c}}",
              rich: {
                b: {
                  fontSize: 14,
                },
              },
            },
            emphasis: {
              label: {
                show: true,
                fontSize: 40,
                fontWeight: "bold",
              },
            },
            labelLine: {
              show: false,
            },
            data: [
              { value: 2876346, name: "费用" },
              { value: 2640553, name: "预算" },
            ],
          },
        ],
      },
      circleOptions5: {
        title: {
          text: "供应链",
          left: "center",
          textStyle: {
            fontSize: 20,
            color: "#eee",
          },
        },
        tooltip: {
          trigger: "item",
        },
        legend: {
          show: false,
          left: "left",
          bottom: "5%",
          itemWidth: 24, // 设置宽度
          itemHeight: 14, // 设置高度
          itemGap: 5, // 设置间距
          textStyle: {
            // 文字颜色
            color: "#fff",
            // 字体粗细 'normal','bold','bolder','lighter',100 | 200 | 300 | 400...
            fontWeight: "400",
            // 字体系列
            fontFamily: "Source Han Sans CN",
            // 字体大小
            fontSize: 12,
          },
        },
        series: [
          {
            name: "供应链",
            type: "pie",
            radius: ["40%", "70%"],
            center: ['50%', '55%'],
            avoidLabelOverlap: false,
            label: {
              fontSize: 16,
              position: "inner",
              fontWeight: "bold",
              color: "#eee",
              formatter: "{b|{b}} {c|{c}}",
              rich: {
                b: {
                  fontSize: 14,
                },
              },
            },
            emphasis: {
              label: {
                show: true,
                fontSize: 40,
                fontWeight: "bold",
              },
            },
            labelLine: {
              show: false,
            },
            data: [
              { value: 2876346, name: "费用" },
              { value: 2640553, name: "预算" },
            ],
          },
        ],
      },
      circleOptions6: {
        title: {
          text: "行政费用",
          left: "center",
          textStyle: {
            fontSize: 20,
            color: "#eee",
          },
        },
        tooltip: {
          trigger: "item",
        },
        legend: {
          show: false,
          left: "left",
          bottom: "5%",
          itemWidth: 24, // 设置宽度
          itemHeight: 14, // 设置高度
          itemGap: 5, // 设置间距
          textStyle: {
            // 文字颜色
            color: "#fff",
            // 字体粗细 'normal','bold','bolder','lighter',100 | 200 | 300 | 400...
            fontWeight: "400",
            // 字体系列
            fontFamily: "Source Han Sans CN",
            // 字体大小
            fontSize: 12,
          },
        },
        series: [
          {
            name: "行政费用",
            type: "pie",
            radius: ["40%", "70%"],
            center: ['50%', '55%'],
            avoidLabelOverlap: false,
            label: {
              fontSize: 16,
              position: "inner",
              fontWeight: "bold",
              color: "#eee",
              formatter: "{b|{b}} {c|{c}}",
              rich: {
                b: {
                  fontSize: 14,
                },
              },
            },
            emphasis: {
              label: {
                show: true,
                fontSize: 40,
                fontWeight: "bold",
              },
            },
            labelLine: {
              show: false,
            },
            data: [
              { value: 2876346, name: "费用" },
              { value: 2640553, name: "预算" },
            ],
          },
        ],
      },
      circleOptions7: {
        title: {
          text: "市场部",
          left: "center",
          textStyle: {
            fontSize: 20,
            color: "#eee",
          },
        },
        tooltip: {
          trigger: "item",
        },
        legend: {
          show: false,
          left: "left",
          bottom: "5%",
          itemWidth: 24, // 设置宽度
          itemHeight: 14, // 设置高度
          itemGap: 5, // 设置间距
          textStyle: {
            // 文字颜色
            color: "#fff",
            // 字体粗细 'normal','bold','bolder','lighter',100 | 200 | 300 | 400...
            fontWeight: "400",
            // 字体系列
            fontFamily: "Source Han Sans CN",
            // 字体大小
            fontSize: 12,
          },
        },
        series: [
          {
            name: "市场部",
            type: "pie",
            radius: ["40%", "70%"],
            center: ['50%', '55%'],
            avoidLabelOverlap: false,
            label: {
              fontSize: 16,
              position: "inner",
              fontWeight: "bold",
              color: "#eee",
              formatter: "{b|{b}} {c|{c}}",
              rich: {
                b: {
                  fontSize: 14,
                },
              },
            },
            emphasis: {
              label: {
                show: true,
                fontSize: 40,
                fontWeight: "bold",
              },
            },
            labelLine: {
              show: false,
            },
            data: [
              { value: 2876346, name: "费用" },
              { value: 2640553, name: "预算" },
            ],
          },
        ],
      },
      circleOptions8: {
        title: {
          text: "财务部",
          left: "center",
          textStyle: {
            fontSize: 20,
            color: "#eee",
          },
        },
        tooltip: {
          trigger: "item",
        },
        legend: {
          show: false,
          left: "left",
          bottom: "5%",
          itemWidth: 24, // 设置宽度
          itemHeight: 14, // 设置高度
          itemGap: 5, // 设置间距
          textStyle: {
            // 文字颜色
            color: "#fff",
            // 字体粗细 'normal','bold','bolder','lighter',100 | 200 | 300 | 400...
            fontWeight: "400",
            // 字体系列
            fontFamily: "Source Han Sans CN",
            // 字体大小
            fontSize: 12,
          },
        },
        series: [
          {
            name: "财务部",
            type: "pie",
            radius: ["40%", "70%"],
            center: ['50%', '55%'],
            avoidLabelOverlap: false,
            label: {
              fontSize: 16,
              position: "inner",
              fontWeight: "bold",
              color: "#eee",
              formatter: "{b|{b}} {c|{c}}",
              rich: {
                b: {
                  fontSize: 14,
                },
              },
            },
            emphasis: {
              label: {
                show: true,
                fontSize: 40,
                fontWeight: "bold",
              },
            },
            labelLine: {
              show: false,
            },
            data: [
              { value: 2876346, name: "费用" },
              { value: 2640553, name: "预算" },
            ],
          },
        ],
      },
      // 费用月度趋势图
      lineOptions: {
        title: {
          text: "费用月度趋势图",
          left: "center",
          textStyle: {
            fontSize: 20,
            color: "#eee",
          },
        },
        grid: {
          top: "15%", // 数字或者百分比形式的距离
          left: "2%",
          right: "5%",
          bottom: "5%",
          containLabel: true, // 如果使用 `containLabel: true`，则可以确保标签（label）内容完全显示
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            crossStyle: {
              color: "#999",
            },
          },
        },
        toolbox: {
          feature: {
            dataView: { show: true, readOnly: false },
            magicType: { show: true, type: ["line", "bar"] },
            restore: { show: true },
            saveAsImage: { show: true },
          },
          iconStyle: {
            borderColor: "#7fffd4",
          },
        },
        legend: {
          data: ["费用", "费用预算"],
          left: "right",
          top: "8%",
          right: "3%",
          itemWidth: 24, // 设置宽度
          itemHeight: 14, // 设置高度
          itemGap: 5, // 设置间距
          textStyle: {
            // 文字颜色
            color: "#fff",
            // 字体粗细 'normal','bold','bolder','lighter',100 | 200 | 300 | 400...
            fontWeight: "400",
            // 字体系列
            fontFamily: "Source Han Sans CN",
            // 字体大小
            fontSize: 12,
          },
        },
        xAxis: [
          {
            type: "category",
            data: [
              "1月",
              "2月",
              "3月",
              "4月",
              "5月",
              "6月",
              "7月",
              "8月",
              "9月",
              "10月",
              "11月",
              "12月",
            ],
            axisPointer: {
              type: "shadow",
            },
          },
        ],
        yAxis: [
          {
            type: "value",
            name: "",
            min: 0,
            max: 1251,
            splitNumber: 4,
            axisLabel: {
              formatter: function (value) {
                var txt = [];
                if (value >= 10000) {
                  txt.push(Math.floor(value / 1000));
                } else {
                  txt.push(value);
                }
                return txt;
              },
            },
            splitLine: {
              //修改背景线条样式
              show: true,
              lineStyle: {
                color: "rgba(238,238,238,0.5)",
                type: "dashed",
              },
            },
          },
        ],
        series: [
          {
            name: "费用",
            type: "bar",
            color: "#5e8aae",
            tooltip: {
              valueFormatter: function (value) {
                return "$ " + value;
              },
            },
            data: [895, 108, 895, 108, 895, 108, 895, 108, 895, 108, 895, 108],
          },
          {
            name: "费用预算",
            type: "bar",
            color: "#2feea2",
            tooltip: {
              valueFormatter: function (value) {
                return "$ " + value;
              },
            },
            data: [
              1251, 573, 1251, 573, 1251, 573, 1251, 573, 1251, 573, 1251, 573,
            ],
          },
        ],
      },
      // 部门费用图
      barOptions: {
        title: {
          text: "部门费用图",
          left: "center",
          textStyle: {
            fontSize: 20,
            color: "#eee",
          },
        },
        grid: {
          top: "16%", // 数字或者百分比形式的距离
          left: "2%",
          right: "5%",
          bottom: "10%",
          containLabel: true, // 如果使用 `containLabel: true`，则可以确保标签（label）内容完全显示
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            crossStyle: {
              color: "#999",
            },
          },
        },
        toolbox: {
          feature: {
            dataView: { show: true, readOnly: false },
            magicType: { show: true, type: ["line", "bar"] },
            restore: { show: true },
            saveAsImage: { show: true },
          },
          iconStyle: {
            borderColor: "#7fffd4",
          },
        },
        legend: {
          data: ["费用", "预算", "预算完成率"],
          left: "right",
          top: "8%",
          left: "middle",
          itemWidth: 24, // 设置宽度
          itemHeight: 14, // 设置高度
          itemGap: 5, // 设置间距
          textStyle: {
            // 文字颜色
            color: "#fff",
            // 字体粗细 'normal','bold','bolder','lighter',100 | 200 | 300 | 400...
            fontWeight: "400",
            // 字体系列
            fontFamily: "Source Han Sans CN",
            // 字体大小
            fontSize: 12,
          },
        },
        xAxis: [
          {
            type: "category",
            data: [
              "UK办事处",
              "USA办事处",
              "研发部",
              "供应链",
              "行政费用",
              "市场部",
              "财务部",
              "人力部",
              "信息部",
            ],
            axisPointer: {
              type: "shadow",
            },
          },
        ],
        yAxis: [
          {
            show: true, // 是否显示坐标轴线、坐标轴刻度线和坐标轴上的文字
            axisTick: {
              show: true, // 是否显示坐标轴刻度线
            },
            axisLine: {
              show: true, // 是否显示坐标轴线
            },
            axisLabel: {
              show: true, // 是否显示坐标轴上的文字
            },
            splitLine: {
              show: false, // 是否显示网格线
            },
            type: "value",
            name: "",
            min: 0,
            max: 0,
            splitNumber: 7,
          },
          {
            show: true, // 是否显示坐标轴线、坐标轴刻度线和坐标轴上的文字
            axisTick: {
              show: true, // 是否显示坐标轴刻度线
            },
            axisLine: {
              show: true, // 是否显示坐标轴线
            },
            axisLabel: {
              show: true, // 是否显示坐标轴上的文字
              formatter: "{value}%",
            },
            splitLine: {
              show: false, // 是否显示网格线
            },
            type: "value",
            name: "Rates",
            min: 0,
            max: 120,
            splitNumber: 7,
          },
        ],
        series: [
          {
            name: "费用",
            type: "bar",
            color: "#73c0de",
            tooltip: {
              valueFormatter: function (value) {
                return "$ " + value;
              },
            },
            data: [
              2876345, 1495994.77, 709901.38, 725656.83, 268101.98, 297032.16,
              135166.1, 162095.46, 116113,
            ],
          },
          {
            name: "预算",
            type: "bar",
            color: "#fc8452",
            tooltip: {
              valueFormatter: function (value) {
                return "$ " + value;
              },
            },
            data: [
              2640553, 116113, 1210583.5, 832610.4, 251146.8, 443210.6,
              166952.5, 163460.6, 116295.3,
            ],
          },
          {
            name: "预算完成率",
            type: "line",
            yAxisIndex: 1,
            tooltip: {
              valueFormatter: function (value) {
                return value + " %";
              },
            },
            data: [109, 72, 59, 87, 107, 67, 81, 99, 100],
          },
        ],
      },
    };
  },
  // 监听属性 类似于data概念
  computed: {},
  // 监控data中的数据变化
  watch: {
    "$i18n.locale": {
      //监听语言的变化，每次变动都要重新渲染图表
      handler() {
        this.getDeptAll().then(() => {
          this.getDeptMonth().then(() => {
            this.destroyAllCharts();
            this.drawLine();
          });
        });
      },
    },
  },
  // 方法集合
  methods: {
    Loading() {
      this.loading = this.$loading({
        lock: true,
        text: "Loading",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
    },
    getHeight() {
      //分割高度
      var containerBox = document.getElementById("cost-container");


      //分割高度
      //var htmlEle = document.documentElement
      //var winWidth = htmlEle.clientWidth || document.body.clientWidth
      var winWidth = containerBox.clientWidth;

      this.rem = Math.ceil(winWidth / 115);
      document.documentElement.style.fontSize = this.rem + "px";

      let winHeight = window.innerHeight;
      this.firstHeight = Math.ceil(winHeight * 0.5);
      this.secondHeight = Math.ceil(winHeight * 0.5);

      this.circleChartHeight = Math.round(winHeight * 0.5 * 0.5);
      this.circleChartWidth = Math.round(winWidth * 0.67 * 0.25);

      this.tableHeight = Math.round(winHeight * 0.5);
      this.tableWidth = Math.round(winWidth * 0.33);

      this.lineChartHeight = Math.round(winHeight * 0.5);
      this.lineChartWidth = Math.round(winWidth * 0.33);

      this.barChartHeight = Math.round(winHeight * 0.5);
      this.barChartWidth = Math.round(winWidth * 0.33);

      this.loading.close();
    },
    drawLine() {
      this.saleLine1 = this.$echarts.init(document.getElementById("circle1"));
      this.saleLine2 = this.$echarts.init(document.getElementById("circle2"));
      this.saleLine3 = this.$echarts.init(document.getElementById("circle3"));
      this.saleLine4 = this.$echarts.init(document.getElementById("circle4"));
      this.saleLine5 = this.$echarts.init(document.getElementById("circle5"));
      this.saleLine6 = this.$echarts.init(document.getElementById("circle6"));
      this.saleLine7 = this.$echarts.init(document.getElementById("circle7"));
      this.saleLine8 = this.$echarts.init(document.getElementById("circle8"));
      this.lineChart = this.$echarts.init(document.getElementById("lineChart"));
      this.barChart = this.$echarts.init(document.getElementById("barChart"));

      //设置部门费用图的标题、legendData
      this.barOptions.title.text = this.$t(`cost.departmentalExpense`);
      const legendData = [];
      legendData[0] = this.$t(`cost.expense`);
      legendData[1] = this.$t(`cost.forecast`);
      legendData[2] = this.$t(`cost.difference`);
      this.barOptions.legend.data = legendData;

      this.barOptions.series[0].name = this.$t(`cost.expense`);
      this.barOptions.series[1].name = this.$t(`cost.forecast`);
      this.barOptions.series[2].name = this.$t(`cost.difference`);

      this.lineOptions.legend.data = legendData;

      this.lineOptions.series[0].name = this.$t(`cost.expense`);
      this.lineOptions.series[1].name = this.$t(`cost.forecast`);

      //圆环中项的中英文赋值
      this.circleOptions1.series[0].data[0].name = this.$t(`cost.expense`);
      this.circleOptions1.series[0].data[1].name = this.$t(`cost.forecast`);
      this.circleOptions2.series[0].data[0].name = this.$t(`cost.expense`);
      this.circleOptions2.series[0].data[1].name = this.$t(`cost.forecast`);
      this.circleOptions3.series[0].data[0].name = this.$t(`cost.expense`);
      this.circleOptions3.series[0].data[1].name = this.$t(`cost.forecast`);
      this.circleOptions4.series[0].data[0].name = this.$t(`cost.expense`);
      this.circleOptions4.series[0].data[1].name = this.$t(`cost.forecast`);
      this.circleOptions5.series[0].data[0].name = this.$t(`cost.expense`);
      this.circleOptions5.series[0].data[1].name = this.$t(`cost.forecast`);
      this.circleOptions6.series[0].data[0].name = this.$t(`cost.expense`);
      this.circleOptions6.series[0].data[1].name = this.$t(`cost.forecast`);
      this.circleOptions7.series[0].data[0].name = this.$t(`cost.expense`);
      this.circleOptions7.series[0].data[1].name = this.$t(`cost.forecast`);
      this.circleOptions8.series[0].data[0].name = this.$t(`cost.expense`);
      this.circleOptions8.series[0].data[1].name = this.$t(`cost.forecast`);

      //费用月度趋势
      this.lineOptions.title.text = this.$t(`cost.monthlyTrendOfExpense`);

      // 绘制图表
      this.saleLine1.setOption(this.circleOptions1);
      this.saleLine2.setOption(this.circleOptions2);
      this.saleLine3.setOption(this.circleOptions3);
      this.saleLine4.setOption(this.circleOptions4);
      this.saleLine5.setOption(this.circleOptions5);
      this.saleLine6.setOption(this.circleOptions6);
      this.saleLine7.setOption(this.circleOptions7);
      this.saleLine8.setOption(this.circleOptions8);

      this.lineChart.setOption(this.lineOptions);
      this.barChart.setOption(this.barOptions);
    },
    destroyAllCharts() {
      this.saleLine1.dispose();
      this.saleLine2.dispose();
      this.saleLine3.dispose();
      this.saleLine4.dispose();
      this.saleLine5.dispose();
      this.saleLine6.dispose();
      this.saleLine7.dispose();
      this.saleLine8.dispose();

      this.lineChart.dispose();
      this.barChart.dispose();
    },
    cellStyle({ rowIndex }) {
      if (rowIndex % 2 == 0) {
        return "background: #15184d;padding:0.4.5rem 0rem";
      } else if (rowIndex % 2 == 1) {
        return "background: #252963;padding:0.4.5rem 0rem";
      }
    },
    formatRate(row, column, cellValue) {
      return cellValue + "%";
    },
    async getDeptAll() {
      const { data: res } = await deptAll(this.$i18n.locale);
      console.log(res);
      if (res.code == 200) {
        this.cost = res.data.table;
        this.barOptions.xAxis[0].data = res.data.xData;
        this.barOptions.series[0].data = res.data.costs;
        this.barOptions.series[1].data = res.data.budgets;
        this.barOptions.series[2].data = res.data.rates;

        this.barOptions.yAxis[0].min = res.data.minValue1;
        this.barOptions.yAxis[0].max = res.data.maxValue1;

        this.barOptions.yAxis[1].min = res.data.minValue2;
        this.barOptions.yAxis[1].max = res.data.maxValue2;

        if (this.$i18n.locale == "ch") {
          this.circleOptions1.title.text = res.data.table[0].name;
          this.circleOptions2.title.text = res.data.table[1].name;
          this.circleOptions3.title.text = res.data.table[2].name;
          this.circleOptions4.title.text = res.data.table[3].name;
          this.circleOptions5.title.text = res.data.table[4].name;
          this.circleOptions6.title.text = res.data.table[5].name;
          this.circleOptions7.title.text = res.data.table[6].name;
          this.circleOptions8.title.text = res.data.table[7].name;
        } else {
          this.circleOptions1.title.text = res.data.table[0].enName;
          this.circleOptions2.title.text = res.data.table[1].enName;
          this.circleOptions3.title.text = res.data.table[2].enName;
          this.circleOptions4.title.text = res.data.table[3].enName;
          this.circleOptions5.title.text = res.data.table[4].enName;
          this.circleOptions6.title.text = res.data.table[5].enName;
          this.circleOptions7.title.text = res.data.table[6].enName;
          this.circleOptions8.title.text = res.data.table[7].enName;
        }

        this.circleOptions1.series[0].data[0].value = res.data.table[0].cost;
        this.circleOptions1.series[0].data[1].value = res.data.table[0].budget;

        this.circleOptions2.series[0].data[0].value = res.data.table[1].cost;
        this.circleOptions2.series[0].data[1].value = res.data.table[1].budget;

        this.circleOptions3.series[0].data[0].value = res.data.table[2].cost;
        this.circleOptions3.series[0].data[1].value = res.data.table[2].budget;

        this.circleOptions4.series[0].data[0].value = res.data.table[3].cost;
        this.circleOptions4.series[0].data[1].value = res.data.table[3].budget;

        this.circleOptions5.series[0].data[0].value = res.data.table[4].cost;
        this.circleOptions5.series[0].data[1].value = res.data.table[4].budget;

        this.circleOptions6.series[0].data[0].value = res.data.table[5].cost;
        this.circleOptions6.series[0].data[1].value = res.data.table[5].budget;

        this.circleOptions7.series[0].data[0].value = res.data.table[6].cost;
        this.circleOptions7.series[0].data[1].value = res.data.table[6].budget;

        this.circleOptions8.series[0].data[0].value = res.data.table[7].cost;
        this.circleOptions8.series[0].data[1].value = res.data.table[7].budget;

        this.total.volume = res.data.volume;
        this.total.budget = res.data.budget;
      }
    },
    async getDeptMonth() {
      const { data: res } = await deptMonth(this.$i18n.locale);
      // console.log(res.data);
      if (res.code == 200) {
        this.lineOptions.legend.data = res.data.legendData;
        this.lineOptions.series[0].name = res.data.series[0].name;
        this.lineOptions.series[0].data = res.data.series[0].data;
        this.lineOptions.series[1].name = res.data.series[1].name;
        this.lineOptions.series[1].data = res.data.series[1].data;

        this.lineOptions.xAxis[0].data = res.data.xData;

        this.lineOptions.yAxis[0].min = res.data.minValue;
        this.lineOptions.yAxis[0].max = res.data.maxValue;
        // 设置不显示数据为0的折现点
        let arr = [];
        res.data.series[0].data.forEach((op) => {
          if (op === 0) {
            op = null;
          }
          arr.push(op);
        });
        this.lineOptions.series[0].data = arr;

        let arrIn = [];
        res.data.series[1].data.forEach((op) => {
          if (op === 0) {
            op = null;
          }
          arrIn.push(op);
        });
        this.lineOptions.series[1].data = arrIn;

      }
    },
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created() { },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    document.title = "Department Financial Dashboard";
    this.getDeptAll();
    this.getDeptMonth();

    this.Loading();

    const that = this;
    window.onresize = () => {
      return (() => {
        that.getHeight();
        that.destroyAllCharts();
        setTimeout(() => {
          that.drawLine();
        }, 200);
      })();
    };

    setTimeout(() => {
      this.getHeight();
    }, 200);

    setTimeout(() => {
      this.drawLine();
    }, 200);
  },
  beforeCreate() { }, // 生命周期 - 创建之前
  beforeMount() { }, // 生命周期 - 挂载之前
  beforeUpdate() { }, // 生命周期 - 更新之前
  updated() { }, // 生命周期 - 更新之后
  beforeDestroy() { }, // 生命周期 - 销毁之前
  destroyed() { }, // 生命周期 - 销毁完成
  activated() { }, // 如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style lang='scss' scoped>
//  @import url(); 引入公共css类

/* 需要显示看板左上角内容的父容器 */
.top-left-parent {
  position: relative;
}

/* 显示 "看板左上角固定" 的文字样式 */
.top-left-text {
  z-index: 1;
  position: absolute;
  top: 0;
  left: 0;
  margin: 10px;
  /* 可根据需要调整文字与边界的距离 */
  font-size: 18px;
  /* 可根据需要调整字体大小 */
}

.cost-container {
  width: 100%;
  height: 100%;
  background: #17113c;
  color: #eee;
  font-family: Arial, Helvetica, sans-serif;
  //position: fixed;
  overflow: auto;
}

.change-lan {
  position: absolute;
  top: 0.8rem;
  right: 0.8rem;
  z-index: 99;
}

.first-row {
  //height: 50%;
  display: flex;
  justify-content: space-around;
}

.second-row {
  //height: 50%;
  display: flex;
  justify-content: space-around;
}

.cost-table {
  background-color: #272956;
  margin: 10px;
  border-radius: 8px;
  width: 33%;
  padding: 10px;
}

.chart-group {
  background-color: #272956;
  margin: 10px;
  border-radius: 8px;
  width: 67%;
}

.cost-count {
  background-color: #272956;
  // margin: 10px;
  border-radius: 8px;
  width: 33%;
}

.line-chart {
  background-color: #272956;
  // margin: 10px;
  border-radius: 8px;
  width: 33%;
  // margin:0 10px
}

.bar-chart {
  background-color: #272956;
  // margin: 10px;
  border-radius: 8px;
  //height: 100%;
  width: 33%;
}

.table {
  background-color: rgba($color: #fff, $alpha: 0.05);
  background-color: #272956;
  border-radius: 10px;
  color: #eee;
  font-size: 1rem;
}

.table {
  ::v-deep .is-scrolling-none {
    overflow: hidden;
    overflow-y: auto;
    overflow-x: scroll;
  }

  ::v-deep .is-scrolling-none::-webkit-scrollbar {
    display: none;
  }

  ::v-deep .el-table--scrollable-y ::-webkit-scrollbar {
    display: none;
  }

  ::v-deep .el-table--scrollable-x ::-webkit-scrollbar {
    display: none;
  }
}

.table ::v-deep .el-table__row > td {
  /* 去除表格线 */
  border: none;
}

.table ::v-deep .el-table th {
  /* 去除上边框 */
  border: none;
}

.el-table::before {
  /* 去除下边框 */
  background: transparent;
}

::v-deep .el-table tr {
  background-color: transparent;
}

::v-deep .el-table th.el-table__cell {
  /* 表头背景颜色 */
  background-color: #272956;
  color: pink;
}

/*表头下划线*/
// ::v-deep .el-table th.el-table__cell.is-leaf{
//   border-bottom:none;
// }

</style>
<style>
.cost-container::-webkit-scrollbar {
  width: 0;
}</style>

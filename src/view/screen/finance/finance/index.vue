<!--  -->
<template>
  <div id="finance-container" class="finance-container">
    <ChangeLan class="change-lan"></ChangeLan>
    <div
      class="first-row"
      :style="'height:' + (this.firstHeight - 31) + 'px;'"
      style="display: flex; justify-content: space-around; padding-bottom: 1rem"
    >
      <div
        class="dashboard-group top-left-parent"
        style="width: 32%; background-color: #272956; border-radius: 8px"
      >
        <div class="top-left-text">{{ topLeftCornerOfTheFinancialBoard_ }}</div>
        <div
          class="dashboard-row1"
          style="
            height: 45%;
            display: flex;
            justify-content: center;
            padding: 20px 15px 0;
          "
        >
          <div
            class="dashboard1"
            id="sale-chart"
            style="width: 50%; height: 100%"
          ></div>
          <div
            class="dashboard2"
            id="sale-chart2"
            style="width: 50%; height: 100%"
          ></div>
        </div>
        <div
          class="dashboard-row2"
          style="height: calc(50% - 1rem); display: flex; justify-content: space-around;margin-top:1rem"
        >
          <div
            class="dashboard3"
            id="sale-chart3"
            style="width: 50%; height: 100%"
          ></div>
          <div
            class="dashboard4"
            id="sale-chart4"
            style="width: 50%; height: 100%"
          ></div>
        </div>
      </div>
      <div
        class="top-left-parent"
        style="
          width: 33%;
          background-color: #272956;
          border-radius: 8px;
          text-align: center;
        "
      >
        <div class="top-left-text">{{ topLeftCornerOfTheFinancialBoard_ }}</div>
        <div
          class="sale-volumn"
          style="
            height: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
          "
        >
          <div>
            <div
              class="title"
              style="font-size: 3rem; color: aquamarine; margin-bottom: 15px"
            >
              {{ $t(`finance.salesAmount`) }}
            </div>
            <div class="content" style="font-size: 5.5rem; color: aquamarine">
              {{ saleVolume }}
            </div>
          </div>
        </div>
        <div
          class="sale-budget"
          style="
            height: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
          "
        >
          <div>
            <div
              class="title"
              style="font-size: 3rem; color: aquamarine; margin-bottom: 15px"
            >
              {{ $t(`finance.salesBudget`) }}
            </div>
            <div class="content" style="font-size: 5.5rem; color: aquamarine">
              {{ saleBudget }}
            </div>
          </div>
        </div>
      </div>
      <!-- 收入占比 -->
      <div
        class="top-left-parent"
        style="
          width: 33%;
          background-color: #272956;
          border-radius: 8px;
          padding: 5px 0;
        "
      >
        <div class="top-left-text">{{ topLeftCornerOfTheFinancialBoard_ }}</div>
        <div
          class="income"
          id="income-rate"
          style="width: 98%; height: 100%"
        ></div>
      </div>
    </div>

    <div
      class="second-row"
      :style="'height:' + this.secondHeight + 'px;'"
      style="display: flex; justify-content: space-around"
    >
      <!-- 销售月度趋势 -->
      <div
        class="sale top-left-parent"
        style="
          width: 32%;
          background-color: #272956;
          border-radius: 8px;
          padding: 5px 0;
        "
      >
        <div class="top-left-text">{{ topLeftCornerOfTheFinancialBoard_ }}</div>
        <div
          id="line-chart"
          class="line-chart"
          :style="{ width: this.incomeWidth + 'px' }"
          style="height: 100%"
        ></div>
      </div>
      <!-- 损益 -->
      <div
        class="top-left-parent"
        style="width: 33%; background-color: #272956; border-radius: 8px"
      >
        <div class="top-left-text">{{ topLeftCornerOfTheFinancialBoard_ }}</div>
        <el-table
          class="table"
          style="padding: 10px 0; width: 100%"
          :data="alls"
          :cell-style="cellStyle"
          :height="this.incomeHeight - 30 + 'px'"
        >
          <el-table-column type="index" width="20px" />
          <el-table-column
            v-if="$i18n.locale === 'ch'"
            align="center"
            :label="$t(`finance.profitAndLoss`)"
            prop="name"
            min-width="25%"
          >
          </el-table-column>
          <el-table-column
            v-else
            align="center"
            :label="$t(`finance.profitAndLoss`)"
            prop="enName"
            min-width="25%"
          >
          </el-table-column>
          <el-table-column
            align="center"
            :label="$t(`finance.incomeStatement`)"
            prop="profit"
            width="120px"
          >
          </el-table-column>
          <el-table-column
            align="center"
            :label="$t(`finance.outcomeStatement`)"
            prop="budget"
            width="100px"
          >
          </el-table-column>
          <el-table-column
            align="center"
            :label="$t(`finance.budgetVariance`)"
            prop="rate"
            width="100px"
            :formatter="formatRate"
          >
            <template slot-scope="scope">
              <span v-if="scope.row.rate > 0" style="color: red"
                >{{ scope.row.rate }}%</span
              >
              <span v-else>{{ scope.row.rate }}%</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 支出占比 -->
      <div
        class="top-left-parent"
        style="
          width: 33%;
          background-color: #272956;
          border-radius: 8px;
          padding: 5px 0;
        "
      >
        <div class="top-left-text">{{ topLeftCornerOfTheFinancialBoard_ }}</div>
        <div
          class="outcome"
          id="outcome-rate"
          :style="{
            width: this.incomeWidth + 'px',
            height: this.incomeHeight + 'px',
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
import { alls, outcomes, saleMonth, incomes, saleRates } from "@/api/board";
import ChangeLan from "@/components/changeLan/index.vue";
export default {
  // import引入的组件需要注入到对象中才能使用
  components: { ChangeLan },
  name: "finance-screen",
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
      //chart
      myChart: null,
      myChart1: null,
      myChart2: null,
      myChart3: null,
      income: null,
      outcome: null,
      saleLine: null,

      loading: null,
      firstHeight: 0,
      secondHeight: 0,
      dashboard1Width: 0,
      dashboard1Height: 0,
      incomeWidth: 0,
      incomeHeight: 0,
      outcomeWidth: 0,
      outcomeHeight: 0,
      rem: 0,
      alls: [],
      outcomes: [],
      saleStatus: [],
      saleMonth: [],
      saleVolume: "",
      saleBudget: "",
      // 仪表盘
      options: {
        tooltip: {
          formatter: "{a} <br/>{b} : {c}%",
        },
        series: [
          {
            name: "百分比",
            startAngle: 178,
            endAngle: 2,
            type: "gauge",
            radius: "101%",
            splitNumber: 5,
            detail: {
              formatter: "{value}%",
              fontSize: "1.3rem",
              color: "#fff",
              offsetCenter: [0, "30%"],
            },
            title: {
              //设置仪表盘中间显示文字样式
              textStyle: {
                // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                fontWeight: "bolder",
                fontSize: 18,
                fontStyle: "italic",
                color: "#fff",
              },
              offsetCenter: [0, "60%"],
            },
            axisLine: {
              // 仪表盘轴线相关配置。
              show: true, // 是否显示仪表盘轴线。
              roundCap: false, // 是否在两端显示成圆形。
              lineStyle: {
                // 仪表盘轴线样式。 { color , width , shadowBlur , shadowColor , shadowOffsetX , shadowOffsetY , opacity }
                width: 35,
                color: [
                  [1, "#454771"],
                  // [0.8, 'orange'],
                  // [1, '#fd666d'],
                ], // 颜色区间设置
              },
            },
            pointer: {
              // 仪表盘指针。
              show: true, // 是否显示指针。
              showAbove: true, // 指针是否显示在标题和仪表盘详情上方。
              icon: "path://M2.9,0.7L2.9,0.7c1.4,0,2.6,1.2,2.6,2.6v115c0,1.4-1.2,2.6-2.6,2.6l0,0c-1.4,0-2.6-1.2-2.6-2.6V3.3C0.3,1.9,1.4,0.7,2.9,0.7z", // ECharts 提供的标记类型包括 circle|rect|roundRect|triangle|diamond|pin|arrow|none，可以通过 'image://url' 设置为图片，其中 URL 为图片的链接，或者 dataURI。
              offsetCenter: [0, 0], // 相对于仪表盘中心的偏移位置，数组第一项是水平方向的偏移，第二项是垂直方向的偏移。可以是绝对的数值，也可以是相对于仪表盘半径的百分比。
              length: "101%", // 指针长度，可以是绝对数值，也可以是相对于半径的半分比。
              width: 11, // 指针宽度。
              itemStyle: {
                // 指针样式。{ color , borderColor , borderWidth , borderType , borderDashOffset , borderCap , borderJoin , borderMiterLimit , shadowBlur , shadowColor , shadowOffsetX , shadowOffsetY , opacity }
                color: "#dfe2dd",
                borderColor: "#272956",
                borderWidth: 6,
              },
            },
            anchor: {
              // 表盘中指针的固定点。跟仪表盘指针配置差不多
              show: true,
              size: 21,
              showAbove: true, // 固定点是否显示在指针上面。
              //icon: 'circle', // ECharts 提供的标记类型包括 circle|rect|roundRect|triangle|diamond|pin|arrow|none，可以通过 'image://url' 设置为图片，其中 URL 为图片的链接，或者 dataURI。
              offsetCenter: [0, 0], // 相对于仪表盘中心的偏移位置，数组第一项是水平方向的偏移，第二项是垂直方向的偏移。可以是绝对的数值，也可以是相对于仪表盘半径的百分比。
              itemStyle: {
                // 指针样式。{ color , borderColor , borderWidth , borderType , borderDashOffset , borderCap , borderJoin , borderMiterLimit , shadowBlur , shadowColor , shadowOffsetX , shadowOffsetY , opacity }
                color: "#dfe2dd",
                shadowColor: "rgba(0, 0, 0, 0.3)",
                shadowBlur: 8,
                shadowOffsetX: 2,
                shadowOffsetY: 4,
              },
            },
            splitLine: {
              // 分隔线样式。
              show: false, // 是否显示分隔线。
              distance: -20, // 分隔线与轴线的距离。
              length: 20, // 分隔线线长。支持相对半径的百分比。
              lineStyle: {
                // { color , width , type , dashOffset , cap , join , miterLimit , shadowBlur , shadowColor , shadowOffsetX , shadowOffsetY , opacity }
                color: "#fff",
                width: 4,
              },
            },
            axisTick: {
              // 刻度样式。
              show: false, // 是否显示刻度。
              splitNumber: 5, // 分隔线之间分割的刻度数。默认 5
              distance: -20, // 分隔线与轴线的距离。
              length: 8, // 刻度线长。支持相对半径的百分比。
              lineStyle: {
                // { color , width , type , dashOffset , cap , join , miterLimit , shadowBlur , shadowColor , shadowOffsetX , shadowOffsetY , opacity }
                color: "#fff",
                width: 1,
              },
            },
            axisLabel: {
              formatter: function (v) {
                if (v === 0) return "\r\n\r\n0";
                if (v === 100) return "\r\n\r\n100";
              },
              show: true, // 是否轴线显示标签。
              color: "#ccc", // 文字的颜色。 默认 auto 归属区间颜色
              fontStyle: "normal", // 文字字体的风格。 normal|italic|oblique
              fontWeight: "bold", // 文字字体的粗细。 normal|bold|bolder|lighter
              distance: 10, // 标签与刻度线的距离。
              fontSize: 20, // 字体样式相关

              // formatter: '{value} km/h', // 刻度标签的内容格式器，支持字符串模板和回调函数两种形式。
              // formatter: function (value) {
              //     return value + 'km/h';
              // },
            },
            data: [
              {
                value: 73,
                name: this.$t(`finance.saleCompletionRate`),
                //name: `{a|Sales completion rate}`,
                itemStyle: {
                  // 数据项的指针样式。
                  color: "auto", // 图形的颜色。
                  borderWidth: 1, // 描边线宽。为 0 时无描边。
                  borderColor: "#eee",
                },
              },
            ],
          },
        ],
      },
      options2: {
        tooltip: {
          formatter: "{a} <br/>{b} : {c}%",
        },
        series: [
          {
            name: "百分比",
            startAngle: 178,
            endAngle: 2,
            type: "gauge",
            radius: "101%",
            splitNumber: 5,
            detail: {
              formatter: "{value}%",
              fontSize: "1.3rem",
              color: "#fff",
              offsetCenter: [0, "30%"],
            },
            title: {
              //设置仪表盘中间显示文字样式
              textStyle: {
                // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                fontWeight: "bolder",
                fontSize: 20,
                fontStyle: "italic",
                color: "#fff",
              },
              offsetCenter: [0, "60%"],
            },
            axisLine: {
              // 仪表盘轴线相关配置。
              show: true, // 是否显示仪表盘轴线。
              roundCap: false, // 是否在两端显示成圆形。
              lineStyle: {
                // 仪表盘轴线样式。 { color , width , shadowBlur , shadowColor , shadowOffsetX , shadowOffsetY , opacity }
                width: 35,
                color: [
                  [1, "#454771"],
                  // [0.8, 'orange'],
                  // [1, '#fd666d'],
                ], // 颜色区间设置
              },
            },
            pointer: {
              // 仪表盘指针。
              show: true, // 是否显示指针。
              showAbove: true, // 指针是否显示在标题和仪表盘详情上方。
              icon: "path://M2.9,0.7L2.9,0.7c1.4,0,2.6,1.2,2.6,2.6v115c0,1.4-1.2,2.6-2.6,2.6l0,0c-1.4,0-2.6-1.2-2.6-2.6V3.3C0.3,1.9,1.4,0.7,2.9,0.7z", // ECharts 提供的标记类型包括 circle|rect|roundRect|triangle|diamond|pin|arrow|none，可以通过 'image://url' 设置为图片，其中 URL 为图片的链接，或者 dataURI。
              offsetCenter: [0, 0], // 相对于仪表盘中心的偏移位置，数组第一项是水平方向的偏移，第二项是垂直方向的偏移。可以是绝对的数值，也可以是相对于仪表盘半径的百分比。
              length: "101%", // 指针长度，可以是绝对数值，也可以是相对于半径的半分比。
              width: 11, // 指针宽度。
              itemStyle: {
                // 指针样式。{ color , borderColor , borderWidth , borderType , borderDashOffset , borderCap , borderJoin , borderMiterLimit , shadowBlur , shadowColor , shadowOffsetX , shadowOffsetY , opacity }
                color: "#dfe2dd",
                borderColor: "#272956",
                borderWidth: 6,
              },
            },
            anchor: {
              // 表盘中指针的固定点。跟仪表盘指针配置差不多
              show: true,
              size: 21,
              showAbove: true, // 固定点是否显示在指针上面。
              //icon: 'circle', // ECharts 提供的标记类型包括 circle|rect|roundRect|triangle|diamond|pin|arrow|none，可以通过 'image://url' 设置为图片，其中 URL 为图片的链接，或者 dataURI。
              offsetCenter: [0, 0], // 相对于仪表盘中心的偏移位置，数组第一项是水平方向的偏移，第二项是垂直方向的偏移。可以是绝对的数值，也可以是相对于仪表盘半径的百分比。
              itemStyle: {
                // 指针样式。{ color , borderColor , borderWidth , borderType , borderDashOffset , borderCap , borderJoin , borderMiterLimit , shadowBlur , shadowColor , shadowOffsetX , shadowOffsetY , opacity }
                color: "#dfe2dd",
                shadowColor: "rgba(0, 0, 0, 0.3)",
                shadowBlur: 8,
                shadowOffsetX: 2,
                shadowOffsetY: 4,
              },
            },
            splitLine: {
              // 分隔线样式。
              show: false, // 是否显示分隔线。
              distance: -20, // 分隔线与轴线的距离。
              length: 20, // 分隔线线长。支持相对半径的百分比。
              lineStyle: {
                // { color , width , type , dashOffset , cap , join , miterLimit , shadowBlur , shadowColor , shadowOffsetX , shadowOffsetY , opacity }
                color: "#fff",
                width: 4,
              },
            },
            axisTick: {
              // 刻度样式。
              show: false, // 是否显示刻度。
              splitNumber: 5, // 分隔线之间分割的刻度数。默认 5
              distance: -20, // 分隔线与轴线的距离。
              length: 8, // 刻度线长。支持相对半径的百分比。
              lineStyle: {
                // { color , width , type , dashOffset , cap , join , miterLimit , shadowBlur , shadowColor , shadowOffsetX , shadowOffsetY , opacity }
                color: "#fff",
                width: 1,
              },
            },
            axisLabel: {
              formatter: function (v) {
                if (v === 0) return "\r\n\r\n0";
                if (v === 100) return "\r\n\r\n100";
              },
              show: true, // 是否轴线显示标签。
              color: "#ccc", // 文字的颜色。 默认 auto 归属区间颜色
              fontStyle: "normal", // 文字字体的风格。 normal|italic|oblique
              fontWeight: "bold", // 文字字体的粗细。 normal|bold|bolder|lighter
              distance: 10, // 标签与刻度线的距离。
              fontSize: 20, // 字体样式相关

              // formatter: '{value} km/h', // 刻度标签的内容格式器，支持字符串模板和回调函数两种形式。
              // formatter: function (value) {
              //     return value + 'km/h';
              // },
            },
            data: [
              {
                value: 73,
                name: this.$t(`finance.saleCompletionRate`),
                //name: `{a|Sales completion rate}`,
                itemStyle: {
                  // 数据项的指针样式。
                  color: "auto", // 图形的颜色。
                  borderWidth: 1, // 描边线宽。为 0 时无描边。
                  borderColor: "#eee",
                },
              },
            ],
          },
        ],
      },
      // 饼图
      options1: {
        title: {
          text: "海外销售完成率",
          left: "center",
          textStyle: {
            fontSize: 18,
            color: "#fff",
          },
        },
        tooltip: {
          trigger: "item",
          textStyle: {
            color: "#666",
          },
        },
        legend: {
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
            name: "海外销售完成率",
            type: "pie",
            radius: ["40%", "70%"],
            center: ['50%', '55%'],
            avoidLabelOverlap: false,
            label: {
              show: true,
              position: "center",
              formatter: function (arg) {
                return Math.round(arg.percent * 100) / 100 + "%";
              },
              fontSize: 25,
              color: "pink",
            },
            emphasis: {
              label: {
                show: true,
                fontSize: 38,
                fontWeight: "bold",
              },
            },
            labelLine: {
              show: false,
            },
            data: [
              // { value: 71, name: '海外销售' },
              // { value: 29, name: '未完成' },
            ],
          },
        ],
      },
      options3: {
        title: {
          text: "国内销售完成率",
          left: "center",
          textStyle: {
            fontSize: 20,
            color: "#fff",
          },
        },
        tooltip: {
          trigger: "item",
          textStyle: {
            color: "#666",
          },
        },
        legend: {
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
            name: "国内销售完成率",
            type: "pie",
            radius: ["40%", "70%"],
            center: ['50%', '55%'],
            avoidLabelOverlap: false,
            label: {
              show: true,
              position: "center",
              formatter: function (arg) {
                return Math.round(arg.percent * 100) / 100 + "%";
              },
              fontSize: 25,
              color: "pink",
            },
            emphasis: {
              label: {
                show: true,
                fontSize: 25,
                fontWeight: "bold",
              },
            },
            labelLine: {
              show: false,
            },
            data: [
              // { value: 74, name: '国内销售' },
              // { value: 26, name: '未完成' },
            ],
          },
        ],
      },
      // 收入占比
      incomeOptions: {
        title: {
          text: "收入占比",
          subtext: "",
          left: "center",
          textStyle: {
            fontSize: 25,
            color: "#eee",
          },
        },
        tooltip: {
          trigger: "item",
          valueFormatter: function (value) {
            return value + " ￥";
          },
        },
        legend: {
          show: false,
          left: "left",
          bottom: "5%",
          itemWidth: 24, // 设置宽度
          itemHeight: 14, // 设置高度
          itemGap: 5,
        },
        series: [
          {
            name: "收入占比",
            type: "pie",
            radius: "40%", // 调整饼图半径大小
            data: [
              // { value: 11843121, name: '收入占比' },
              // { value: 1242982, name: 'test' },
              // { value: 319473, name: '测试' },
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
            label: {
              normal: {
                show: true,
                position: "outside", //标签的位置
                textStyle: {
                  fontWeight: 100,
                  fontSize: 17,
                  color: "pink",
                },
                width: 200, // 文本显示宽度
                overflow: "break", // 文字超出宽度是否截断或者换行, 默认截断显示 ...
                distanceToLabelLine: 10, // 文字与 label line 之间的距离。
                formatter: function (params) {
                  var percent = params.percent.toFixed(1); // 将百分比四舍五入到小数点后一位
                  return params.name + " " + percent + "%"; // 返回格式化的标签内容
                },
                rich: {
                  name: {
                    fontSize: 12,
                  },
                },
              },
            },
          },
        ],
      },
      //支出占比
      outcomeOptions: {
        title: {
          text: "支出占比",
          subtext: "",
          left: "center",
          textStyle: {
            fontSize: 25,
            color: "#eee",
          },
        },
        tooltip: {
          trigger: "item",
          valueFormatter: function (value) {
            return value + " ￥";
          },
        },
        legend: {
          show: false,
          // orient: 'vertical',
          // left: 'left'
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
            name: "支出占比",
            type: "pie",
            radius: "40%",
            data: [
              // {
              //   id: 2,
              //   name: '营业成本',
              //   value: 7799352,
              //   budget: 11184130.98,
              //   per: '-30%'
              // },
              // {
              //   id: 3,
              //   name: '测试数据 ',
              //   value: 27294,
              //   budget: 90150,
              //   per: '-70%'
              // }
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
            labelLine: {
              // 视觉引导线
              show: true,
            },
            label: {
              normal: {
                show: true,
                position: "outside", //标签的位置
                textStyle: {
                  fontWeight: 100,
                  fontSize: 16,
                  color: "pink",
                },
                width: 200, // 文本显示宽度
                overflow: "break", // 文字超出宽度是否截断或者换行, 默认截断显示 ...
                distanceToLabelLine: 10, // 文字与 label line 之间的距离。
                formatter: function (params) {
                  var percent = params.percent.toFixed(1); // 将百分比四舍五入到小数点后一位
                  return params.name + " " + percent + "%"; // 返回格式化的标签内容
                },
                rich: {
                  name: {
                    fontSize: 16,
                  },
                },
              },
            },
          },
        ],
      },
      saleMonthOptions: {
        title: {
          text: "销售月度趋势图",
          left: "center",
          textStyle: {
            fontSize: 25,
            color: "#eee",
          },
        },
        grid: {
          top: "16%", // 数字或者百分比形式的距离
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
          data: ["销售额", "销售预算", "上年同期"],
          // left: 'right',
          top: "8%",
          right: "3%",
          itemWidth: 20, // 设置宽度
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
            max: 1256,
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
            name: "测试数据",
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
            name: "test-data",
            type: "bar",
            color: "#a26ea2",
            tooltip: {
              valueFormatter: function (value) {
                return "$ " + value;
              },
            },
            data: [
              1251, 573, 1251, 573, 1251, 573, 1251, 573, 1251, 573, 1251, 573,
            ],
          },
          {
            name: "上年同期",
            type: "line",
            color: "#feea2e",
            tooltip: {
              valueFormatter: function (value) {
                return "$ " + value;
              },
            },
            data: [
              1256, 1076, 1256, 1076, 1562, 1076, 1256, 1076, 1256, 1076, 1256,
              1076,
            ],
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
        this.getsaleMonth().then(() => {
          this.getOutcomes().then(() => {
            this.getIncomes().then(() => {
              this.destroyAllChart();
              this.drawLine();
            });
          });
        });
      },
      immediate: false,
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
      var containerBox = document.getElementById("finance-container");
      //分割高度
      var winWidth = containerBox.clientWidth;
      this.rem = Math.ceil(winWidth / 115); //使用页面宽带的1.15%来做rem
      document.documentElement.style.fontSize = this.rem + "px"; //设置字体大小


      var winHeight = window.innerHeight;
      this.firstHeight = Math.ceil(winHeight * 0.5); //第一模块高度
      this.secondHeight = Math.ceil(winHeight * 0.5);
      this.dashboard1Width = Math.ceil(winWidth * 0.33 * 0.5);
      this.dashboard1Height = Math.ceil(winHeight * 0.5 * 0.5);
      this.incomeWidth = Math.ceil(winWidth * 0.32);
      this.incomeHeight = Math.ceil(winHeight * 0.5);
      this.loading.close();
    },
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      this.myChart = this.$echarts.init(document.getElementById("sale-chart"));
      this.myChart1 = this.$echarts.init(
        document.getElementById("sale-chart2")
      );
      this.myChart2 = this.$echarts.init(
        document.getElementById("sale-chart3")
      );
      this.myChart3 = this.$echarts.init(
        document.getElementById("sale-chart4")
      );

      this.income = this.$echarts.init(document.getElementById("income-rate"));
      this.outcome = this.$echarts.init(
        document.getElementById("outcome-rate")
      );
      this.saleLine = this.$echarts.init(document.getElementById("line-chart"));

      this.options.series[0].data[0].name = this.$t(
        `finance.salesCompletionRate`
      );
      this.options2.series[0].data[0].name = this.$t(`finance.salesGrowthRate`);
      this.options1.title.text = this.$t(`finance.overseasSalesCompletionRate`);
      this.options3.title.text = this.$t(`finance.domesticSalesCompletionRate`);
      this.incomeOptions.title.text = this.$t(`finance.incomeShare`);
      this.outcomeOptions.title.text = this.$t(`finance.costShare`);
      this.saleMonthOptions.title.text = this.$t(`finance.monthlySalesTrend`);

      // 绘制图表
      this.myChart.setOption(this.options);
      this.myChart1.setOption(this.options2);
      this.myChart2.setOption(this.options1);
      this.myChart3.setOption(this.options3);
      // 设置饼状图文字显示宽度，一定要保证容器大小计算要在图表绘制之前执行, 文字显示宽度为容器宽度的三分之一
      this.incomeOptions.series[0].label.normal.width = this.incomeWidth / 3;
      // console.error(
      //   ">>>>>>>>>>>>>>>",
      //   this.incomeOptions.series[0].label.normal
      // );
      this.income.setOption(this.incomeOptions);
      this.outcome.setOption(this.outcomeOptions);
      this.saleLine.setOption(this.saleMonthOptions);
    },
    cellStyle({ rowIndex }) {
      if (rowIndex % 2 == 0) {
        return "background: #15184d;";
      } else if (rowIndex % 2 == 1) {
        return "background: #252963;";
      }
    },
    async getAlls() {
      const { data: res } = await alls();
      if (res.code == 200) {
        this.alls = res.data;
      }
    },
    async getOutcomes() {
      const { data: res } = await outcomes(this.$i18n.locale);
      console.log(res);
      if (res.code == 200) {
        this.outcomes = res.data;
        this.outcomeOptions.series[0].data = res.data;
      }
    },
    async getIncomes() {
      const { data: res } = await incomes(this.$i18n.locale);
      console.log(res);
      if (res.code == 200) {
        this.incomeOptions.series[0].data = res.data;
      }
    },
    async getsaleMonth() {
      const { data: res } = await saleMonth(this.$i18n.locale);
      console.log(res.data);
      if (res.code == 200) {
        this.saleMonthOptions.legend.data = res.data.legendData;
        this.saleMonthOptions.series[0].name = res.data.series[0].name;
        this.saleMonthOptions.series[0].data = res.data.series[0].data;
        this.saleMonthOptions.series[1].name = res.data.series[1].name;
        this.saleMonthOptions.series[1].data = res.data.series[1].data;
        this.saleMonthOptions.series[2].name = res.data.series[2].name;
        this.saleMonthOptions.series[2].data = res.data.series[2].data;

        this.saleMonthOptions.xAxis[0].data = res.data.xData;

        this.saleMonthOptions.yAxis[0].min = res.data.minValue;
        this.saleMonthOptions.yAxis[0].max = res.data.maxValue;
        // 设置不显示数据为0的折现点
        let arr = [];
        res.data.series[0].data.forEach((op) => {
          if (op === 0) {
            op = null;
          }
          arr.push(op);
        });
        this.saleMonthOptions.series[0].data = arr;

        let arrIn = [];
        res.data.series[1].data.forEach((op) => {
          if (op === 0) {
            op = null;
          }
          arrIn.push(op);
        });
        this.saleMonthOptions.series[1].data = arrIn;

        let arrOut = [];
        res.data.series[2].data.forEach((op) => {
          if (op === 0) {
            op = null;
          }
          arrOut.push(op);
        });
        this.saleMonthOptions.series[2].data = arrOut;
      }
    },
    async getSaleRates() {
      const { data: res } = await saleRates();
      if (res.code == 200) {
        this.options.series[0].data[0].value = (
          res.data.completion_all * 100
        ).toFixed(0);
        this.options.series[0].axisLine.lineStyle.color = [];

        var color1 = [];
        var color2 = [];

        // 数据值设置只保留1位，用于设置渐变色
        const value1 = res.data.completion_all.toFixed(1);
        const value2 = res.data.growth.toFixed(1);

        // 仪表盘渐变色设置 起始位置的样式, 位置下标范围 0.1 ~ 1

        // 设置第一个样式的截止位置等于 数据值
        color1.push(value1);
        color1.push("#04d140");

        color2.push(1);
        color2.push("#454771");
        this.options.series[0].axisLine.lineStyle.color.push(color1);
        this.options.series[0].axisLine.lineStyle.color.push(color2);

        this.options2.series[0].data[0].value = (res.data.growth * 100).toFixed(
          0
        );
        this.options2.series[0].axisLine.lineStyle.color = [];

        var color3 = [];
        var color4 = [];

        color3.push(value2);
        color3.push("#04d140");
        this.options2.series[0].axisLine.lineStyle.color.push(color3);

        color4.push(1);
        color4.push("#454771");
        this.options2.series[0].axisLine.lineStyle.color.push(color4);

        console.info(JSON.stringify(this.options));
        console.info(JSON.stringify(this.options2));

        this.saleVolume = res.data.sale_volume;
        this.saleBudget = res.data.sale_budget;
        this.options1.series[0].data[0] = res.data.completion_row * 100;
        this.options1.series[0].data[1] = 100 - res.data.completion_row * 100;

        this.options3.series[0].data[0] = res.data.completion_cn * 100;
        this.options3.series[0].data[1] = 100 - res.data.completion_cn * 100;
      }
    },
    formatRate(row, column, cellValue) {
      return cellValue + "%";
    },
    destroyAllChart() {
      this.myChart.dispose();
      this.myChart1.dispose();
      this.myChart2.dispose();
      this.myChart3.dispose();

      this.income.dispose();
      this.outcome.dispose();
      this.saleLine.dispose();
    },
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  // 生命周期 - 挂载完成（可以访问DOM元素）
  async mounted() {
    document.title = "Financial Dashboard";

    this.Loading();

    await this.getAlls();
    await this.getOutcomes();
    await this.getIncomes();
    await this.getsaleMonth();
    await this.getSaleRates();

    const that = this;
    // 监测屏幕分辨率
    window.onresize = () => {
      return (async () => {
        await that.getHeight();
        await that.destroyAllChart(); //销毁echarts图表
        await that.drawLine(); //初始化echarts图表
      })();
    };

    setTimeout(async () => {
      await this.getHeight();
      await this.drawLine();
    }, 200);
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

.change-lan {
  position: absolute;
  top: 0.8rem;
  right: 0.8rem;
  z-index: 99;
}

.finance-container {
  width: calc(100% - 20px);
  // height: calc(100% - 20px);
  background: #17113c;
  color: #eee;
  font-family: Arial, Helvetica, sans-serif;
  //position: fixed;
  overflow: auto;
  padding: 10px;
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

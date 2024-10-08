<!--  -->
<template>
  <div
    id="money-container"
    class="money-container"
  >
    <ChangeLan class="change-lan"></ChangeLan>
    <div
      class="first-row"
      :style="'height:' + this.firstHeight + 'px;'"
    >
      <div
        class="balance top-left-parent"
      >
        <div class="top-left-text">{{ topLeftCornerOfTheFinancialBoard_ }}</div>
        <!-- 周末余额 -->
        <div
          id="balance-chart"
          :style="
            'height:' +
            this.balanceHeight +
            'px;' +
            'width:' +
            (this.balanceWidth - 30) +
            'px;'
          "
        ></div>
      </div>
      <!-- 现金流 -->
      <div
        class="cash-flow top-left-parent"
      >
        <div class="top-left-text">{{ topLeftCornerOfTheFinancialBoard_ }}</div>
        <div
          id="cash-chart"
          :style="
            'height:' +
            this.cashHeight +
            'px;' +
            'width:' +
            (this.cashWidth - 30) +
            'px;'
          "
        ></div>
      </div>
    </div>
    <!-- 采购月度趋势 -->
    <div class="second-row">
      <div
        class="purchase top-left-parent"
      >
        <div class="top-left-text">{{ topLeftCornerOfTheFinancialBoard_ }}</div>
        <div
          id="purchase-chart"
          :style="
            'height:' +
            this.purchaseHeight +
            'px;' +
            'width:' +
            (this.purchaseWidth - 30) +
            'px;'
          "
        ></div>
      </div>
    </div>
  </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';
import { topLeftCornerOfTheFinancialBoard } from "./../constant";
import { purchase, cash, balance } from "@/api/board";
import ChangeLan from "@/components/changeLan/index.vue";
export default {
  // import引入的组件需要注入到对象中才能使用
  components: { ChangeLan },
  name: "money-screen",
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
      //charts
      balanceChart: null,
      cashChart: null,
      purchaseChart: null,

      firstHeight: 0,
      secondHeight: 0,
      balanceHeight: 0,
      balanceWidth: 0,
      cashHeight: 0,
      cashWidth: 0,
      purchaseHeight: 0,
      purchaseWidth: 0,
      balanceOptions: {
        title: {
          text: "周末余额:[1665488]",
          subtext: "",
          left: "center",
          textStyle: {
            fontSize: 25,
            color: "#eee",
          },
          subtextStyle: {
            fontSize: 20,
            color: "#eee",
          },
        },
        tooltip: {
          trigger: "item",
          valueFormatter: function (value) {
            return " $" + value;
          },
        },
        legend: {
          show: false,
          // orient: 'vertical',
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
            name: "周末余额",
            type: "pie",
            radius: "50%",
            data: [
              { value: 261928, name: "境内账户" },
              { value: 567856, name: "香港账户" },
              { value: 734409, name: "海外账户" },
              { value: 91294, name: "私人账户" },
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
                  // fontWeight: 300,
                  // fontSize: 18,
                  // color: "pink",
                },
                width: 200, // 文本显示宽度
                overflow: "break", // 文字超出宽度是否截断或者换行, 默认截断显示 ...
                distanceToLabelLine: 10, // 文字与 label line 之间的距离。
                formatter: '  {b|{b}}  {c|${c}} ',
                // formatter: function (params) {
                //   return params.name + " $" + params.value;
                // },
                rich: {
                  c: {
                    fontSize: 27,
                    fontWeight: 300,
                    color: "pink",
                  },
                  b: {
                    fontSize: 18,
                    fontWeight: 300,
                    color: "pink",
                  }
                },
              },
            },
          },
        ],
      },
      // 现金流状况
      cashOptions: {
        title: {
          text: "现金流状况图",
          left: "center",
          textStyle: {
            fontSize: 25,
            color: "#eee",
          },
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
        grid: {
          top: "15%", // 数字或者百分比形式的距离
          left: "2%",
          right: "2%",
          bottom: "7%",
          containLabel: true, // 如果使用 `containLabel: true`，则可以确保标签（label）内容完全显示
        },
        toolbox: {
          right: "3%",
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
        // legend: {
        //   data: ['现金流入', '现金流出', '净流量']
        // },
        legend: {
          // orient: 'vertical',
          // left: 'right',
          top: "8%",
          right: "8%",
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
            min: -227,
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
            name: "现金流入",
            type: "bar",
            color: "#3ba272",
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
            name: "现金流出",
            type: "bar",
            color: "#ea8a8a",
            tooltip: {
              valueFormatter: function (value) {
                return "$ " + value;
              },
            },
            data: [895, 800, 895, 108, 895, 600, 895, 108, 895, 600, 895, 500],
          },
          {
            name: "净流量",
            type: "line",
            color: "#ea7ccc",
            tooltip: {
              valueFormatter: function (value) {
                return "$ " + value;
              },
            },
            data: [365, -227, 356, 465, 356, -27, 356, 465, 356, -27, 356, 73],
          },
        ],
      },
      // 采购月度趋势
      purchaseOptions: {
        title: {
          text: "采购月度趋势图",
          left: "center",
          textStyle: {
            fontSize: 25,
            color: "#eee",
          },
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
        grid: {
          top: "15%", // 数字或者百分比形式的距离
          left: "2%",
          right: "2%",
          bottom: "7%",
          containLabel: true, // 如果使用 `containLabel: true`，则可以确保标签（label）内容完全显示
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
          data: ["采购支出", "采购预算"],
          top: "8%",
          right: "5%",
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
            name: "采购支出",
            type: "bar",
            color: "#fac858",
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
            name: "采购预算",
            type: "bar",
            color: "#73c0de",
            tooltip: {
              valueFormatter: function (value) {
                return "$ " + value;
              },
            },
            data: [895, 800, 895, 108, 895, 600, 895, 108, 895, 600, 895, 500],
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
        console.info("语言变化");
        this.getBalance().then(() => {
          this.getPurchase().then(() => {
            this.getCash().then(() => {
              this.destroyAllCharts();
              this.drawLine();
            });
          });
        });
      },
      immediate: true,
      deep: true,
    },
  },
  // 方法集合
  methods: {
    async Loading() {
      this.loading = this.$loading({
        lock: true,
        text: "Loading",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
    },
    async getHeight() {
      var containerBox = document.getElementById("money-container");

      //分割高度
      //var htmlEle = document.documentElement
      //var winWidth = htmlEle.clientWidth || document.body.clientWidth
      var winWidth = containerBox.clientWidth;

      this.rem = Math.ceil(winWidth / 115);
      document.documentElement.style.fontSize = this.rem + "px";

      let winHeight = window.innerHeight;
      this.firstHeight = Math.ceil(winHeight * 0.5);
      this.secondHeight = Math.ceil(winHeight * 0.5);

      this.balanceHeight = Math.round(winHeight * 0.5);
      this.balanceWidth = Math.round(winWidth * 0.4);

      this.cashHeight = Math.round(winHeight * 0.5);
      this.cashWidth = Math.round(winWidth * 0.6);

      this.purchaseHeight = Math.round(winHeight * 0.5);
      this.purchaseWidth = winWidth;

      this.loading.close();
    },
    async drawLine() {
      this.balanceChart = this.$echarts.init(
        document.getElementById("balance-chart")
      );
      this.cashChart = this.$echarts.init(
        document.getElementById("cash-chart")
      );
      this.purchaseChart = this.$echarts.init(
        document.getElementById("purchase-chart")
      );

      //采购月度

      this.purchaseOptions.title.text = this.$t(`money.purchasingMonthlyTrend`);

      const legendData = [];
      legendData[0] = this.$t(`money.actualPurchase`);
      legendData[1] = this.$t(`money.forecastPurchase`);

      this.purchaseOptions.legend.data = legendData;
      this.purchaseOptions.series[0].name = this.$t(`money.actualPurchase`);
      this.purchaseOptions.series[1].name = this.$t(`money.forecastPurchase`);

      //现金流状况
      this.cashOptions.title.text = this.$t(`money.cashFlow`);

      // 绘制图表
      // 设置饼状图文字显示宽度，一定要保证容器大小计算要在图表绘制之前执行, 文字显示宽度为容器宽度的三分之一
      // this.balanceOptions.series[0].label.normal.width = this.incomeWidth / 3
      // console.info(
      //   ">>>>>>>>>>>>>>>",
      //   this.balanceOptions.series[0].label.normal
      // );

      // console.info("输出", this.balanceOptions);
      this.balanceChart.setOption(this.balanceOptions);

      this.cashChart.setOption(this.cashOptions);

      // 数据更新之后，柱形图会自动更新 yAxis.max(坐标轴刻度最大值),这里还需要手动更新一下，不要让绘制的数据到最顶端，所以在柱形图已计算好的max刻度在加百分之10
      try {
        this.purchaseOptions.yAxis[0].max = (
          this.purchaseOptions.yAxis[0].max +
          this.purchaseOptions.yAxis[0].max * 0.1
        ).toFixed(1);
      } catch (error) {
        console.info();
      }

      this.purchaseChart.setOption(this.purchaseOptions);
    },
    async destroyAllCharts() {
      console.info("调用销毁全部");
      this.balanceChart.dispose();
      this.cashChart.dispose();
      this.purchaseChart.dispose();
    },
    async getPurchase() {
      const { data: res } = await purchase(this.$i18n.locale);
      if (res.code == 200) {
        this.purchaseOptions.legend.data = res.data.legendData;
        this.purchaseOptions.series[0].name = res.data.series[0].name;
        this.purchaseOptions.series[0].data = res.data.series[0].data;
        this.purchaseOptions.series[1].name = res.data.series[1].name;
        this.purchaseOptions.series[1].data = res.data.series[1].data;

        this.purchaseOptions.xAxis[0].data = res.data.xData;

        this.purchaseOptions.yAxis[0].min = res.data.minValue;
        this.purchaseOptions.yAxis[0].max = res.data.maxValue;

        // 设置不显示数据为0的折现点
        let arr = [];
        res.data.series[0].data.forEach((op) => {
          if (op === 0) {
            op = null;
          }
          arr.push(op);
        });
        this.purchaseOptions.series[0].data = arr;

        let arrIn = [];
        res.data.series[1].data.forEach((op) => {
          if (op === 0) {
            op = null;
          }
          arrIn.push(op);
        });
        this.purchaseOptions.series[1].data = arrIn;
      }
    },
    async getCash() {
      const { data: res } = await cash(this.$i18n.locale);
      if (res.code == 200) {
        this.cashOptions.legend.data = res.data.legendData;
        this.cashOptions.series[0].name = res.data.series[0].name;
        // let  cashInData = []
        // res.data.series[0].data.forEach(op =>{
        //   console.log(op,999);
        //   if(op != 0){
        //     cashInData.push(op)
        //     console.log(cashInData,998877);
        //   }
        // })

        // this.cashOptions.series[0].data = res.data.series[0].data;
        this.cashOptions.series[1].name = res.data.series[1].name;
        this.cashOptions.series[1].data = res.data.series[1].data;
        this.cashOptions.series[2].name = res.data.series[2].name;
        this.cashOptions.series[2].data = res.data.series[2].data;
        this.cashOptions.xAxis[0].data = res.data.xData;
        this.cashOptions.yAxis[0].min = res.data.minValue;
        this.cashOptions.yAxis[0].max = res.data.maxValue;
        // 设置不显示数据为0的折现点
        let arr = [];
        res.data.series[0].data.forEach((op) => {
          if (op === 0) {
            op = null;
          }
          arr.push(op);
        });
        this.cashOptions.series[0].data = arr;

        let arrIn = [];
        res.data.series[1].data.forEach((op) => {
          if (op === 0) {
            op = null;
          }
          arrIn.push(op);
        });
        this.cashOptions.series[1].data = arrIn;

        let arrOut = [];
        res.data.series[2].data.forEach((op) => {
          if (op === 0) {
            op = null;
          }
          arrOut.push(op);
        });
        this.cashOptions.series[2].data = arrOut;
      }
    },
    async getBalance() {
      const { data: res } = await balance(this.$i18n.locale);
      if (res.code == 200) {
        this.balanceOptions.series[0].data = res.data.list;
        const total = res.data.total;
        this.balanceOptions.title.text =
          this.$t(`money.weekendBalance`) + ":[$" + total + "]";

        /*
        if ((total / 1000).toFixed() < 1000) {
          console.info('》》》》', 1)
          this.balanceOptions.title.text = this.$t(`money.weekendBalance`) + ':[' + (total / 1000).toFixed() + ',' + total % 1000 + ']'
        } else {
          console.info('》》》》', 2)
          this.balanceOptions.title.text = this.$t(`money.weekendBalance`) + ':[' + (total / 1000000).toFixed() + ',' + ((total - (total / 1000000).toFixed() * 1000000) / 1000).toFixed() + ',' + (total % 1000).toFixed(2) + ']'
        }
        */
      }
    },
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  async created() { },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  async mounted() {
    this.Loading();
    await this.getHeight();
    document.title = "Cash Flow Dashboard";
    // this.getBalance().then(() => {
    //       this.getPurchase().then(() => {
    //         this.getCash().then(() => {
    //           this.destroyAllCharts()
    //           this.drawLine()
    //         })
    //       })
    //     })

    const that = this;
    window.onresize = () => {
      return (async () => {
        await that.destroyAllCharts();
        await that.getHeight();
        await that.drawLine();
      })();
    };
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

.money-container {
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

.balance {
  background-color: #272956;
  margin: 10px;
  border-radius: 8px;
  width: 40%;
}

.cash-flow {
  background-color: #272956;
  margin: 10px;
  border-radius: 8px;
  width: 60%;
}

.purchase {
  background-color: #272956;
  margin: 10px;
  border-radius: 8px;
  width: 100%;
}
</style>

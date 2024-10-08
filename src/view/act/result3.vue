<template>
  <div class="container">
    <div class="switch" @click="toSetState">
      <el-switch
        v-model="state"
        disabled
        active-color="#409EFF"
        inactive-color="#888"
      ></el-switch>
    </div>
    <li class="el-icon-picture-outline" @click="bigImg" />
    <div class="logo">
      <img src="@/assets/actLogo.png" />
      <div class="title">2024春茗节目投票</div>
    </div>
    <div class="echart-box">
      <div
        id="myChart"
        :style="{ width: '90%', height: '86vh' }"
        style="margin: 2rem 0 0 1rem"
      ></div>
    </div>
    <div class="canvas" v-show="qrCodeShow" @click="closeQrcImg">
      <canvas id="canvas"></canvas>
    </div>
  </div>
</template>

<script>
import { getTicketResult, reBoot, getTeamId, setState } from "@/api/act";
import QRCode from "qrcode";
export default {
  data() {
    return {
      totalTicketSum: [],
      solvedTicketSum: [],
      unsolvedTicketSum: [],
      condition1: {
        area: "all",
        product: "all",
        type: "total",
        days: 7,
      },
      condition2: {
        area: "all",
        product: "all",
        type: "solved",
        days: 7,
      },
      condition3: {
        area: "all",
        product: "all",
        type: "unsolved",
        days: 7,
      },
      options: {
        xAxis: {
          max: "dataMax",
          show: false,
        },
        // 2个
        yAxis: {
          type: "category",
          data: [], // '不再犹豫', '手扶拖拉机\n斯基很酷', '我爱上班', '群英荟萃'
          inverse: true,
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          animationDuration: 300,
          animationDurationUpdate: 300,
          max: 2, // only the largest 3 bars will be displayed
          axisLabel: {
            inside: false,
            textStyle: {
              fontSize: "50",
              color: "#ffffff",
              fontWeight: "bold",
            },
            margin: 20,
          },
        },

        color: ["#f6cb91", "#ff0000", "#f6cb91", "#ff0000", "#8e84b8"],
        textStyle: {
          fontSize: 18,
        },
        grid: {
          left: "18% ",
        },
        series: [
          {
            realtimeSort: true,
            name: "",
            type: "bar",
            barWidth: 100,
            // 2个
            data: [0, 0, 0],
            label: {
              show: true,
              position: "right",
              valueAnimation: true,
              color: "#ffffff",
              fontSize: 80,
              distance: 25,
              offset: [0, 10],
            },
            itemStyle: {
              normal: {
                color: function (params) {
                  let colorList = [
                    "#FF7F00 ",
                    "#ffff00",
                    "#66CCFF",
                    "#99cc33",
                    "#8e84b8",
                  ];
                  return colorList[params.dataIndex];
                },
              },
            },
          },
        ],
        animationDuration: 0,
        animationDurationUpdate: 3000,
        animationEasing: "linear",
        animationEasingUpdate: "linear",
      },
      qrCodeShow: false,
      thrLabel: [],
      firstLabel: ["不再犹豫", "手扶拖拉机\n斯基很酷", "我爱上班", "群英荟萃"],
      Interval: null,
      canEditState: true,
      teams: [],
      a: -1,
      b: -1,
      c: -1,
      state: false,
    };
  },
  methods: {
    toSetState() {
      let that = this;
      console.log(this.canEditState);
      if (!this.canEditState) return;
      this.canEditState = false;
      setTimeout(() => {
        this.canEditState = true;
      }, 2000);

      console.log("state:" + that.state);

      if (that.state) {
        reBoot().then((res) => {
          that.state = res.data.state;
        });
        return;
      }

      let data = { state: true };
      setState(data).then((res) => {
        that.state = res.data.state;
      });
    },
    getId() {
      var that = this;
      getTeamId().then((res) => {
        if (res.code == 200) {
          let data = JSON.parse(res.data);
          console.log(data);
          for (let a = 0; a < 5; a++) {
            if (data[a]) {
              if (that.a < 0) {
                that.a = a;
              } else if (that.b < 0) {
                that.b = a;
              } else if (that.c < 0) {
                that.c = a;
              }
            }
          }
          that.options.yAxis.data = [];
          that.options.yAxis.data.push(that.firstLabel[that.a]);
          that.options.yAxis.data.push(that.firstLabel[that.b]);
          that.options.yAxis.data.push(that.firstLabel[that.c]);
          that.drawLine();
          that.getResult();
        }
      });
    },
    qrCode() {
      var canvas = document.getElementById("canvas");
      // 调用函数去生成二维码，参数依次为：二维码的容器、要生成的内容、回调函数
      QRCode.toCanvas(
        canvas,
        // "http://votedv2.ifi-cloud.com",
        window.location.origin + "/#/act/votedv2/index3",
        { margin: 2, height: 200, width: 500 },
        function (error) {
          if (error) {
            console.error(error);
          } else {
            console.log("success!");
          }
        }
      );
    },
    bigImg() {
      this.qrCodeShow = true;
      this.qrCode();
    },
    drawLine() {
      var that = this;
      // 基于准备好的dom，初始化echarts实例
      let myChart = that.$echarts.init(document.getElementById("myChart"));

      // 绘制图表
      function run() {
        that.getResult().then((res) => {
          that.options.series[0].data = res;
          myChart.setOption({
            series: [
              {
                type: "bar",
                data: that.options.series[0].data,
              },
            ],
          });
        });
      }
      // setTimeout(function () {
      run();
      // }, 0);
      setInterval(function () {
        run();
      }, 1000);
      myChart.setOption(that.options);
    },
    async getResult() {
      let res = await getTicketResult();
      if (res.code == 200) {
        let arr = res.data;
        let data = [];
        // 2个
        data[0] = arr[this.a + 1];
        data[1] = arr[this.b + 1];
        data[2] = arr[this.c + 1];
        this.state = arr["state"];
        return data;
      }
    },
    closeQrcImg() {
      this.qrCodeShow = false;
    },
  },
  mounted() {
    // 页面进入时加载内容

    document.title = "春茗节目投票";
    this.getId();
  },
};
</script>

<style lang="scss" scoped>
.el-icon-picture-outline {
  position: fixed;
  font-size: 31px;
  color: white;
  right: 20px;
  top: 20px;
}

.container {
  widows: 100vw;
  height: 100vh;
  background: #272f3e;

  .switch {
    position: absolute;
    top: 20px;
    left: 20px;
  }

  .canvas {
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 999;
    top: 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .echart-box {
    display: flex;
    justify-content: center;
    margin-top: -50px;
  }

  .logo {
    padding: 30px 0 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      width: 100px;
      height: 50px;
      margin-right: 15px;
    }
  }

  .title {
    text-align: center;
    font-weight: bold;
    font-size: 60px;
    background-image: linear-gradient(to bottom, #fae4b5, #fae4b5, #f6cb91);
    background-clip: text;
    -webkit-background-clip: text;
    color: transparent;
  }
}
</style>

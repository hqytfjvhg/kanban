<template>
  
  <div class="view-container">

    <!-- <el-row :gutter="40">
      <el-col :xs='24' :sm="24" :lg="12">
          <el-card>
              <pie-chart v-if="flag" :legendData="categoryTotal.nameList" :seriesData="categoryTotal.nameAndValueList"/>
          </el-card>
      </el-col>
      <el-col :xs='24' :sm="24" :lg="12">
          <el-card>
              <bar-chart v-if="flag" :xAxisData="monthTotal.yearMonthList" :seriesData="monthTotal.aritcleTotalList" />
          </el-card>
      </el-col>
    </el-row> -->
  
    <el-card style="display: flex">
      <div id="myChart" :style="{ width: '500px', height: '300px' }" style="margin:2rem 0 0 1rem"></div>
    </el-card>

    <!-- <div style="display: flex;flex-direction:row;background: #fff;margin:20px">
      <div style="padding:0 10px">
        <div style="padding:0 60px">{{ totalTicketSum.area }}>{{ totalTicketSum.product }}>{{ totalTicketSum.type }}>{{
          totalTicketSum.within
        }}</div>
        <el-table class="table-content" :data="totalTicketSum.list" style="margin-left:50px;">
          <el-table-column align="center" type="index" width="50"></el-table-column>
          <el-table-column prop="product" label="product" width="100" align="center">
          </el-table-column>
          <el-table-column prop="area" label="Area" width="200" align="center">
          </el-table-column>
          <el-table-column prop="total" label="total_ticket" width="100" align="center"></el-table-column>
        </el-table>
      </div>
      <div style="padding:0 10px">
        <div style="padding:0 60px">{{ solvedTicketSum.area }}>{{ solvedTicketSum.product }}>{{
          solvedTicketSum.type
        }}>{{ solvedTicketSum.within }}
        </div>
        <el-table class="table-content" :data="solvedTicketSum.list" style="margin-left:50px;">
          <el-table-column align="center" type="index" width="50"></el-table-column>
          <el-table-column prop="product" label="product" width="100" align="center">
          </el-table-column>
          <el-table-column prop="area" label="Area" width="200" align="center">
          </el-table-column>
          <el-table-column prop="total" label="total_ticket" width="100" align="center"></el-table-column>
        </el-table>
      </div>
      <div style="padding:0 10px">
        <div style="padding:0 60px">
          {{ unsolvedTicketSum.area }}>{{ unsolvedTicketSum.product }}>{{ unsolvedTicketSum.type }}>{{
            unsolvedTicketSum.within
          }}
        </div>
        <el-table class="table-content" :data="unsolvedTicketSum.list" style="margin-left:50px;">
          <el-table-column align="center" type="index" width="50"></el-table-column>
          <el-table-column prop="product" label="product" width="100" align="center">
          </el-table-column>
          <el-table-column prop="area" label="Area" width="200" align="center">
          </el-table-column>
          <el-table-column prop="total" label="total_ticket" width="100" align="center"></el-table-column>
        </el-table>
      </div>
    </div> -->
  </div>
</template>

<script>
import { getTicketSum } from '@/api/ticket';
export default {
  name: 'ticket-view',
  data() {
    return {
      totalTicketSum: [],
      solvedTicketSum: [],
      unsolvedTicketSum: [],
      condition1: {
        area: 'all',
        product: 'all',
        type: 'total',
        days: 7
      },
      condition2: {
        area: 'all',
        product: 'all',
        type: 'solved',
        days: 7
      },
      condition3: {
        area: 'all',
        product: 'all',
        type: 'unsolved',
        days: 7
      },
      options1: {
        title: {
          text: '7天内新增票数',
          subtext: 'Fake Data'
        },
        legend: {
          data: ['Row', 'China']
        },
        xAxis: {
          type: 'category',
          boundaryGap: [0, 0.01],
          data: ['bule', 'zen1.0', 'stream1.0', 'go bar', 'product']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: 'Row',
            data: [15, 210, 170, 50, 70],
            type: 'bar',
            label: {
              show: true,
              position: 'top',
              formatter: function (param) {
                console.log(param)
                return param.data;
              }
            }
          },
          {
            name: 'China',
            data: [120, 200, 150, 80, 70],
            type: 'bar',
            label: {
              show: true,
              position: 'top',
              formatter: function (param) {
                console.log(param)
                return param.data;
              }
            }
          }
        ],
        // series: [
        //     {
        //         name: 'zen1.0',
        //         data: [new Date('2022-12-12'), new Date('2023-01-17'), new Date('2023-02-12'), new Date('2023-02-28'), new Date('2023-03-12'), new Date('2023-03-30')],
        //         type: 'line',
        //         label: {
        //             show: true,
        //             position: 'top',
        //             formatter: function (param) {
        //                 console.log(param)
        //                 return param.data.getMonth() + 1 + '/' + param.data.getDate();
        //             }
        //         },
        //     },
        //     {
        //         name: 'blue4.0',
        //         data: [new Date('2022-11-10'), new Date('2023-01-01'), new Date('2023-02-15'), new Date('2023-04-28'), new Date('2023-07-12'), new Date('2023-08-30')],
        //         type: 'line',
        //         //stack: 'Total',
        //         label: {
        //             show: true,
        //             position: 'bottom',
        //             formatter: function (param) {
        //                 return param.data.getMonth() + 1 + '/' + param.data.getDate();
        //             }
        //         },
        //     }
        // ]
      }
    }
  },
  methods: {
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById("myChart"));
      // 绘制图表
      myChart.setOption(this.options1);
    },
    setOption(data) {
      let xDate = []
      for (let index = 0; index < data.length; index++) {
        let element = data[index];
        let product = element.product
        if (!xDate.includes(product)) {
          xDate.push(product)
        }
      }

    },
    async getAddTicketSum(area, product, type, days) {
      const { data: res } = await getTicketSum(area, product, type, days)
      if (res.code == 200) {
        this.totalTicketSum = res.data
      }
      console.log(this.totalTicketSum)
    },
    async getSolvedTicket(area, product, type, days) { 
      const { data: res } = await getTicketSum(area, product, type, days)
      if (res.code == 200) {
        this.solvedTicketSum = res.data
      }
      console.log(this.solvedTicketSum)
    },
    async getUnsolvedTicket(area, product, type, days) {
      const { data: res } = await getTicketSum(area, product, type, days)
      if (res.code == 200) {
        this.unsolvedTicketSum = res.data
      }
      console.log(this.unsolvedTicketSum)
    },
  },
  mounted() { // 页面进入时加载内容
    // this.getAddTicketSum("all", "all", "unsolved", 100)
    this.getAddTicketSum(this.condition1.area, this.condition1.product, this.condition1.type, this.condition1.days)
    this.getSolvedTicket(this.condition2.area, this.condition2.product, this.condition2.type, this.condition2.days)
    this.getUnsolvedTicket(this.condition3.area, this.condition3.product, this.condition3.type, this.condition3.days)
    this.drawLine()
    console.log(this.$route)
  },
  watch: { // 监测变化

  }
}
</script>
<style lang='scss' scoped>
  .view-container {
    padding: 2rem 0 0 1rem;
    display: flex;
  }
</style>
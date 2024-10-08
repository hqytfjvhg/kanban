<template>
  <div id="index" class="marketing-container">
    <div class="title flex-center" id="title">Marketing</div>
    <div class="first-group" id="first-group">
      <div class="time-box" v-for="item in rowClockList" :key="item.clockId">
        <!-- 时间 -->
        <div class="clock-group" id="clock-group">
          <CrayonClock
            :timeZone="Number(item.clockTimezone)"
            :country="item.clockArea"
          />
        </div>
        <!---->
        <div class="separate" id="separate"></div>
        <div class="list" id="list">
          <div class="list-content-contain">
            <autoscroll
              class="list-content"
              :height="scrolHeight + 'px'"
              v-if="item.members.length > 0"
              :speed="20"
            >
              <div
                v-for="it in item.members"
                :key="it.memberId"
                style="margin-top: 0.6rem"
              >
                <el-row>
                  <el-col :span="7">
                    <div class="dept-box">
                      <div class="dept-item">{{ it.memberDept }}</div>
                    </div>
                    <div class="membersName">{{ it.memberName }}</div>
                  </el-col>
                  <el-col :span="17">
                    <div class="duty">{{ it.duty }}</div>
                  </el-col>
                </el-row>
              </div>
            </autoscroll>
            <div
              class="list-content flex-center"
              :style="
                'font-family: Arial; color: #ccc; height:' +
                scrolHeight +
                'px; font-size: 1.2rem;'
              "
              v-else
            >
              No information
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="second-group">
      <div class="ticket">
        <div class="data-box" id="data-box">
          <div class="data-title" id="data-title">Stage</div>
          <el-table
            size="mini"
            class="table-style diy-style"
            :data="stages"
            height="100"
            ref="stage"
            :cell-style="stageCellStyle"
            :header-cell-style="stageHeaderCellStyle"
          >
            <el-table-column prop="product" align="center" :width="stateWidth">
              <template slot="header"> product</template>
            </el-table-column>
            <el-table-column
              align="center"
              label="Bates"
              prop="bates"
              :width="stateWidth"
              >07-Mar-23</el-table-column
            >
            <el-table-column
              align="center"
              label="PP"
              prop="pp"
              :width="stateWidth"
              >07-Mar-23</el-table-column
            >/
            <el-table-column
              align="center"
              label="MP"
              prop="mp"
              :width="stateWidth"
            />
            <el-table-column
              align="center"
              label="Despatch"
              prop="despatch"
              :width="stateWidth"
              style="font-size: 0.5rem !important"
            />
            <el-table-column
              align="center"
              label="PR"
              prop="pr"
              :width="stateWidth"
            />
            <el-table-column
              align="center"
              label="Launch"
              prop="launch"
              :width="lastStateWidth"
            />
          </el-table>
        </div>
        <div class="data-box" style="margin-left: 0.8rem">
          <div class="data-title" id="data-title">Calendar project</div>
          <el-table
            size="mini"
            class="table-style"
            :data="project"
            height="100"
            ref="project"
            :cell-style="calendarCellStyle"
            :header-cell-style="stageHeaderCellStyle"
          >
            <el-table-column prop="subject" align="center" :width="stateWidth">
              <template slot="header">Project</template>
            </el-table-column>
            <el-table-column
              align="left"
              :label="monthArray[new Date().getMonth()]"
              prop="current"
              :width="stateWidth"
            />
            <el-table-column
              align="left"
              :label="monthArray[new Date().getMonth() + 1]"
              prop="month1"
              :width="stateWidth"
            />
            <el-table-column
              align="left"
              :label="monthArray[new Date().getMonth() + 2]"
              prop="month2"
              :width="stateWidth"
            />
            <el-table-column
              align="left"
              :label="monthArray[new Date().getMonth() + 3]"
              prop="month3"
              :width="stateWidth"
            />
            <el-table-column
              align="left"
              :label="monthArray[new Date().getMonth() + 4]"
              prop="month4"
              :width="stateWidth"
            />
            <el-table-column
              align="left"
              :label="monthArray[new Date().getMonth() + 5]"
              prop="month5"
              :width="lastStateWidth"
            />
          </el-table>
        </div>
      </div>
    </div>

    <div class="third-group">
      <div class="third-box">
        <div class="stock-box" id="stock-box">
          <div class="stock-title" id="ticket-title">Overstock</div>
          <el-table
            :data="overstock"
            :height="100"
            ref="overstock"
            :cell-style="overstockCellStyle"
            :header-cell-style="overstockHeaderCellStyle"
            style="background: transparent"
          >
            <el-table-column align="center" type="index" width="30">
              <template slot-scope="scope">
                <span
                  v-if="scope.$index + 1 == 1"
                  style="color: gold; font-weight: bold"
                  >1</span
                >
                <span
                  v-else-if="scope.$index + 1 == 2"
                  style="color: red; font-weight: bold"
                  >2</span
                >
                <span
                  v-else-if="scope.$index + 1 == 3"
                  style="color: green; font-weight: bold"
                  >3</span
                >
                <span v-else-if="scope.$index + 1 == 4" style="color: #ccc"
                  >4</span
                >
                <span v-else style="color: #ccc">{{ scope.$index + 1 }}</span>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              label="product"
              prop="product"
              :width="stockCellWidth"
            />
            <el-table-column
              align="center"
              label="$"
              prop="totalPrice"
              :width="stockCellWidth"
            />
            <el-table-column
              align="center"
              label="product"
              prop="product"
              :width="stockCellWidth"
            />
            <el-table-column
              align="center"
              label="quantity"
              prop="quantity"
              :width="lastStockCellWidth"
            />
          </el-table>
        </div>
        <div class="stock-box">
          <div class="stock-title" id="ticket-title">Sale</div>
          <el-table
            :data="sale"
            :height="100"
            ref="sale"
            :cell-style="overstockCellStyle"
            :header-cell-style="overstockHeaderCellStyle"
            style="background-color: transparent"
          >
            <el-table-column align="center" type="index" width="30">
              <template slot-scope="scope">
                <span
                  v-if="scope.$index + 1 == 1"
                  style="color: gold; font-weight: bold"
                  >1</span
                >
                <span
                  v-else-if="scope.$index + 1 == 2"
                  style="color: red; font-weight: bold"
                  >2</span
                >
                <span
                  v-else-if="scope.$index + 1 == 3"
                  style="color: green; font-weight: bold"
                  >3</span
                >
                <span v-else-if="scope.$index + 1 == 4" style="color: #ccc"
                  >4</span
                >
                <span v-else style="color: #ccc">{{ scope.$index + 1 }}</span>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              label="Product"
              prop="product"
              :width="stockCellWidth"
            />
            <el-table-column
              align="center"
              label="iFi"
              prop="saleIfi"
              :width="stockCellWidth"
            />
            <el-table-column
              align="center"
              label="Distributor"
              prop="saleDistrib"
              :width="stockCellWidth"
            />
            <el-table-column
              align="center"
              label="Total"
              prop="total"
              :width="lastStockCellWidth"
            />
          </el-table>
        </div>
        <div class="notice-box">
          <div class="notice-title" id="ticket-title">Urgent notice</div>
          <el-carousel
            :height="carouselHeight + 'px'"
            :interval="30000"
            style="width: 100%"
          >
            <el-carousel-item v-for="i in notices" :key="i.gmtCreate">
              <div class="notice-content">
                <div class="notice-left-item">
                  <el-avatar
                    :size="3 * rem"
                    src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
                    class="avatar"
                  />
                  <div class="name">{{ i.publisher }}</div>
                </div>
                <div class="notice-right-item">
                  <div class="notice-right-item-top">
                    <div class="notice-item-title">{{ i.title }}</div>
                    <div class="notice-message">{{ i.message }}</div>
                  </div>
                  <div class="notice-right-item-bot">
                    Published on: {{ i.gmtCreate }}
                  </div>
                </div>
              </div>
            </el-carousel-item>
          </el-carousel>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CrayonClock from "@/components/crayonClock/index.vue";
import autoscroll from "z-vue-autoscroll";
//import { vueClock } from 'vue-clock-lonlyape'
import { getScreen } from "@/api/screen";
import {
  selectProjectCalendar,
  getStage,
  getOverstock,
  getSalesRanking,
} from "@/api/marketing";
// import topHeader from './top-header.vue'
import { selectUnexpiredNotice } from "@/api/notices";

export default {
  name: "marketing-screen",
  data() {
    return {
      loading: null,
      websock: null,
      lockReconnect: false,
      timeout: 60 * 1000,
      timeoutObj: null,
      serverTimeoutObj: null,
      timeoutnum: null,
      topic: "marketing",
      screen: {},
      background: {},
      stages: [],
      project: [],
      rowClockList: [],
      colClockList: [],
      rem: 0,
      overstock: [],
      sale: [],
      notice: {},
      notices: [],
      secondHeight: 0,
      thirdHeight: 0,
      scrolHeight: 0,
      colScrolHeight: 0,
      stageTableHeadHeight: 0,
      stageTableCellHeight: 0,
      secondScrollHeight: 0,
      monthArray: [
        "Jan.",
        "Feb.",
        "Mar.",
        "Apr.",
        "May.",
        "Jun.",
        "Jul.",
        "Aug.",
        "Sep.",
        "Oct.",
        "Nov.",
        "Dec.",
      ],
      calendarTableHeadHeight: 0,
      calendarTableCellHeight: 0,
      overstockTableHeadHeight: 0,
      overstockTableCellHeight: 0,
      stateWidth: 0,
      lastStateWidth: 0,
      stockBoxHeight: 0,
      stockCellWidth: 0,
      lastStockCellWidth: 0,
      carouselHeight: 0,
    };
  },
  computed: {
    // 计算属性
    twoDimNotices() {
      let twoDimensionArray = [];
      let noticesLength = this.notices.length;
      let carouselNum = Math.ceil(noticesLength / 2);
      for (let index = 1; index <= carouselNum; index++) {
        if (index == carouselNum && noticesLength % 2 != 0) {
          let oneDimensionArray = [];
          for (let index = 0; index < noticesLength % 2; index++) {
            oneDimensionArray.push(this.notices[index + (carouselNum - 1) * 2]);
          }
          twoDimensionArray.push(oneDimensionArray);
        } else {
          let oneDimensionArray = [];
          oneDimensionArray.push(this.notices[0 + (index - 1) * 2]);
          oneDimensionArray.push(this.notices[1 + (index - 1) * 2]);
          twoDimensionArray.push(oneDimensionArray);
        }
      }

      return twoDimensionArray;
    },
  },
  watch: {
    // 监测变化
    screen: {
      handler: function () {},
      deep: true,
      immediate: true,
    },
    notices: {
      handler: function () {},
      deep: true,
      immediate: true,
    },
  },
  async created() {
    // this.Loading()
    setTimeout(() => {
      this.getHeight();
    }, 1200);
    this.getScreenStyle();

    this.getProjects();

    this.getStages();

    this.getOverstocks();

    this.getSalesRankings();
  },
  components: {
    // 组件的引用
    autoscroll,
    CrayonClock,
    // topHeader
    //, vueClock
  },
  methods: {
    thousands(num) {
      var str = num.toString();
      var reg =
        str.indexOf(".") > -1 ? /(\d)(?=(\d{3})+\.)/g : /(\d)(?=(?:\d{3})+$)/g;
      return str.replace(reg, "$1,");
    },
    // Loading() {
    //   this.loading = this.$loading({
    //     lock: true,
    //     text: 'Loading',
    //     spinner: 'el-icon-loading',
    //     background: 'rgba(0, 0, 0, 0.7)'
    //   });
    // },
    getHeight() {
      var htmlEle = document.documentElement;
      var winWidth = htmlEle.clientWidth || document.body.clientWidth;
      this.rem = Math.ceil(winWidth / 115);
      document.documentElement.style.fontSize = this.rem + "px";

      let winHeight = window.innerHeight;
      let firstHeight = Math.ceil(winHeight * 0.35);
      let clockHeight = document.getElementById("clock-group").clientHeight;
      this.scrolHeight = firstHeight - clockHeight - 2.5 * this.rem;
      this.colScrolHeight =
        (firstHeight - clockHeight * 2 - 5.8 * this.rem) / 2;

      let dataBox = document.getElementById("data-box").clientWidth;
      this.stateWidth = Math.floor(dataBox / 7);
      this.lastStateWidth = dataBox - 6 * this.stateWidth;

      this.secondHeight = Math.round(winHeight * 0.28);
      this.thirdHeight = Math.round(winHeight * 0.3);

      this.stockBoxHeight = Math.floor((this.thirdHeight - 4.8 * this.rem) / 4);

      var stockBoxWidth = document.getElementById("stock-box").clientWidth;
      this.stockCellWidth = Math.floor((stockBoxWidth - 30) / 4);
      this.lastStockCellWidth = stockBoxWidth - 30 - 3 * this.stockCellWidth;

      this.carouselHeight = Math.floor(this.thirdHeight - 4.6 * this.rem);
      //this.loading.close();
    },
    // /**
    //  * 滚动控制器
    //  * @param {*} table 表格名
    //  * @param {*} speed 速度
    //  */

    tableScroll(table, speed) {
      // 拿到表格挂载后的真实DOM
      const divData = table.bodyWrapper;

      setInterval(() => {
        if (divData.scrollHeight - divData.clientHeight > 10) {
          if (divData.clientHeight + divData.scrollTop < divData.scrollHeight) {
            divData.scrollTop += 1; // 元素自增距离顶部1像素

            if (
              divData.clientHeight + divData.scrollTop >=
              divData.scrollHeight
            ) {
              setTimeout(() => {
                divData.scrollTop = 0; // 重置table距离顶部距离
              }, 3000);
            }
          }
        }
      }, speed);
    },
    initWebSocket: function () {
      //var url = window._CONFIG['domianURL'].replace("http://", "ws://") + "websocket/" + userId;
      //var url = "ws://120.79.22.70:8081/websocket/" + this.topic
      var websocket_url = process.env.VUE_APP_WEBSOCKET_URL + this.topic;
      this.websock = new WebSocket(websocket_url);
      this.websock.onopen = this.websocketOnOpen;
      this.websock.onerror = this.websocketOnError;
      this.websock.onmessage = this.websocketonmessage;
      this.websock.onclose = this.websocketclose;
    },
    //连接后调用
    websocketOnOpen: function () {
      this.start();
    },
    websocketOnError: function (e) {
      console.log("websocket 连接错误" + e);
      this.initWebSocket();
    },
    websocketSend: function (data) {
      this.websock.send(data);
    },
    websocketonmessage: function (e) {
      this.reset();
      if (e.data == "UPDATE_TEAM") {
        this.getScreenStyle();
      }
      if (e.data == "UPDATE_NOTICES") {
        this.getNotices();
      }
      if (e.data == "UPDATE_PROJECT") {
        this.getProjects();
      }
      if (e.data == "UPDATE_STAGE") {
        this.getStages();
      }
      if (e.data == "UPDATE_OVERSTOCK") {
        this.getOverstocks();
      }
      if (e.data == "UPDATE_SALE") {
        this.getSalesRankings();
      }
    },
    // 关闭连接时调用
    websocketclose: function () {},
    reconnet() {
      var that = this;
      if (that.lockReconnect) {
        return;
      }
      that.lockReconnect = true;
      //没连接上会一直重连，设置延迟避免请求过多
      that.timeoutnum && clearTimeout(that.timeoutnum);

      that.timeoutnum = setTimeout(() => {
        that.initWebSocket();
        that.lockReconnect = false;
      }, 5000);
    },
    reset() {
      var that = this;
      clearTimeout(that.timeoutObj);
      clearTimeout(that.serverTimeoutObj);
      that.start();
    },
    start() {
      var self = this;
      self.timeoutObj && clearTimeout(self.timeoutObj);
      //如果内层心跳检测倒计时存在的话，清除掉
      self.serverTimeoutObj && clearTimeout(self.serverTimeoutObj);
      self.timeoutObj = setTimeout(() => {
        if (self.websock.readyState === 1) {
          const heartCheckParam = {
            isHeart: true,
            topic: this.topic,
            context: "心跳中",
          };
          self.websock.send(JSON.stringify(heartCheckParam));
        } else {
          self.reconnet();
        }
        self.serverTimeoutObj = setTimeout(() => {
          self.websock.close();
        }, self.timeout);
      }, self.timeout);
    },
    async getScreenStyle() {
      var that = this;
      const { data: res } = await getScreen(2);
      if (res.code == 200) {
        this.screen = res.data;
        that.rowClockList = [];
        //that.colClockList = []
        for (let a = 0; a < 6; a++) {
          //a < 6 ? that.rowClockList.push(that.screen.clocks[a]) : that.colClockList.push(that.screen.clocks[a])
          if (a == 4) continue;
          a < 6
            ? that.rowClockList.push(that.screen.clocks[a])
            : that.colClockList.push(that.screen.clocks[a]);
        }
      }
    },
    async getProjects() {
      const { data: res1 } = await selectProjectCalendar();
      if (res1.code == 200) {
        this.project = res1.data;
      }
    },
    async getStages() {
      const { data: res2 } = await getStage();
      if (res2.code == 200) {
        this.stages = res2.data;
      }
    },
    async getOverstocks() {
      var that = this;
      const { data: res3 } = await getOverstock();
      if (res3.code == 200) {
        let data = res3.data;
        data.forEach(function (item, index) {
          let totalPrice = that.thousands(item.totalPrice);
          data[index].totalPrice = totalPrice.includes(",")
            ? totalPrice.substring(0, totalPrice.lastIndexOf(",")) + "k"
            : totalPrice;
          let quantity = that.thousands(item.quantity);
          data[index].quantity = quantity;
        });
        that.overstock = data;
      }
    },
    async getSalesRankings() {
      var that = this;
      const { data: res4 } = await getSalesRanking();
      if (res4.code == 200) {
        let data = res4.data;
        console.log("data1", data);
        data.forEach(function (item, index) {
          data[index].saleIfi = that.thousands(data[index].saleIfi);
          data[index].saleDistrib = that.thousands(data[index].saleDistrib);
          data[index].total = that.thousands(data[index].total);
        });
        this.sale = data;
      }
    },
    //标注今天日期重点样式
    setBKColor({ row, columnIndex }) {
      var Dates = new Date();
      var Y = Dates.getFullYear();
      var M = Dates.getMonth() + 1;
      var D = Dates.getDate();
      var times = Y + (M < 10 ? "-0" : "-") + M + (D < 10 ? "-0" : "-") + D;
      if (row.bates === times && columnIndex == 1) {
        return "color:#ff4949";
      }
      if (row.pp === times && columnIndex == 2) {
        return "color:#ff4949";
      }
      if (row.mp === times && columnIndex == 3) {
        return "color:#ff4949";
      }
      if (row.despatch === times && columnIndex == 4) {
        return "color:#ff4949";
      }
      if (row.pr === times && columnIndex == 5) {
        return "color:#ff4949";
      }
      if (row.launch === times && columnIndex == 6) {
        return "color:#ff4949";
      } else {
        return "font-weight:500;color:#ebf9ff ";
      }
    },
    async getNotices() {
      //getNotices
      const { data: res5 } = await selectUnexpiredNotice(2);
      if (res5.code == 200) {
        this.notices = res5.data;
        this.notice = res5.data[0];
      }
    },

    // overstock
    overstockCellStyle({ rowIndex, columnIndex }) {
      if (rowIndex % 2 == 0 && columnIndex == 0) {
        return (
          "font-size: 1rem; background: #15184d; border: none; border-right: 1px solid #252963; padding: 0; height: " +
          this.stockBoxHeight +
          "px;"
        );
      } else if (rowIndex % 2 == 0 && columnIndex == 2) {
        return (
          "font-size: 1rem; background: #15184d; border: none; border-right: 1px solid #dddddd88; padding: 0; height: " +
          this.stockBoxHeight +
          "px; color: white;"
        );
      } else if (rowIndex % 2 == 0 && columnIndex == 4) {
        return (
          "font-size: 1rem; background: #15184d; border: none; padding: 0; height: " +
          this.stockBoxHeight +
          "px; color: white;"
        );
      } else if (rowIndex % 2 == 0) {
        return (
          "font-size: 1rem; background: #15184d; border: none; border-right: 1px solid #252963; padding: 0; height: " +
          this.stockBoxHeight +
          "px; color: white;"
        );
      } else if (rowIndex % 2 == 1 && columnIndex == 0) {
        return (
          "font-size: 1rem; background: #252963; border: none; border-right: 1px solid #171717; padding: 0; height: " +
          this.stockBoxHeight +
          "px"
        );
      } else if (rowIndex % 2 == 1 && columnIndex == 2) {
        return (
          "font-size: 1rem; background: #252963; border: none; border-right: 1px solid #171717; padding: 0; height: " +
          this.stockBoxHeight +
          "px; color: white;"
        );
      } else if (rowIndex % 2 == 1 && columnIndex == 4) {
        return (
          "font-size: 1rem; background: #252963; border: none; padding: 0; height: " +
          this.stockBoxHeight +
          "px; color: white;"
        );
      } else {
        return (
          "font-size: 1rem; background: #252963; border: none; border-right: 1px solid #15184d; padding: 0; height: " +
          this.stockBoxHeight +
          "px; color: white;"
        );
      }
    },

    overstockHeaderCellStyle({ columnIndex }) {
      if (columnIndex == 2) {
        return (
          "background: #0f0938; border: none; border-right: 1px solid #555; padding: 0; height:" +
          this.stockBoxHeight +
          "px; color: white;"
        );
      } else if (columnIndex == 4) {
        return (
          "background: #0f0938; border: none; padding: 0; height:" +
          this.stockBoxHeight +
          "px; color: white;"
        );
      } else {
        return (
          "background: #0f0938; border: none; border-right: 1px solid #333; padding: 0; height:" +
          this.stockBoxHeight +
          "px; color: white;"
        );
      }
    },

    // calendar
    calendarCellStyle({ rowIndex, columnIndex }) {
      this.calendarTableCellHeight = Math.round(
        (this.secondHeight - 3.8 * this.rem) / 4
      );
      if (rowIndex % 2 == 0 && columnIndex == 0) {
        return (
          "font-size: 1rem; background: #15184d; border: none; border-right: 1px solid #dddddd88; padding: 0; height: " +
          this.calendarTableCellHeight +
          "px; color: white; word-break: break-all;"
        );
      } else if (rowIndex % 2 == 0 && columnIndex == 6) {
        return (
          "font-size: 1rem; background: #15184d; border: none; padding: 0; height: " +
          this.calendarTableCellHeight +
          "px; color: white; word-break: break-all;"
        );
      } else if (rowIndex % 2 == 0) {
        return (
          "font-size: 1rem; background: #15184d; border: none; border-right: 1px solid #EEEEEE50; padding: 0; height: " +
          this.calendarTableCellHeight +
          "px; color: white; word-break: break-all;"
        );
      } else if (rowIndex % 2 == 1 && columnIndex == 0) {
        return (
          "font-size: 1rem; background: #252963; border: none; border-right: 1px solid #000; padding: 0; height: " +
          this.calendarTableCellHeight +
          "px; color: white; word-break: break-all;"
        );
      } else if (rowIndex % 2 == 1 && columnIndex == 6) {
        return (
          "font-size: 1rem; background: #252963; border: none; padding: 0; height: " +
          this.calendarTableCellHeight +
          "px; color: white; word-break: break-all;"
        );
      } else {
        return (
          "font-size: 1rem; background: #252963; border: none; border-right: 1px solid #171717; padding: 0; height: " +
          this.calendarTableCellHeight +
          "px; color: white; word-break: break-all;"
        );
      }
    },

    // stage
    stageCellStyle({ rowIndex, columnIndex }) {
      this.stageTableCellHeight = Math.round(
        (this.secondHeight - 3.8 * this.rem) / 6
      );
      this.stageTableHeadHeight = this.stageTableCellHeight - 5;
      if (rowIndex % 2 == 0 && columnIndex == 0) {
        return (
          "font-size: 1rem; background: #15184d; border: none; border-right: 1px solid #dddddd88; padding: 0; height: " +
          this.stageTableCellHeight +
          "px; color: white; word-break: break-all;"
        );
      } else if (rowIndex % 2 == 0 && columnIndex == 6) {
        return (
          "font-size: 1rem; background: #15184d; border: none; padding: 0; height: " +
          this.stageTableCellHeight +
          "px; color: white; word-break: break-all;"
        );
      } else if (rowIndex % 2 == 0) {
        return (
          "font-size: 1rem; background: #15184d; border: none; border-right: 1px solid #EEEEEE50; padding: 0; height: " +
          this.stageTableCellHeight +
          "px; color: white; word-break: break-all;"
        );
      } else if (rowIndex % 2 == 1 && columnIndex == 0) {
        return (
          "font-size: 1rem; background: #252963; border: none; border-right: 1px solid #000; padding: 0; height: " +
          this.stageTableCellHeight +
          "px; color: white; word-break: break-all;"
        );
      } else if (rowIndex % 2 == 1 && columnIndex == 6) {
        return (
          "font-size: 1rem; background: #252963; border: none; padding: 0; height: " +
          this.stageTableCellHeight +
          "px; color: white; word-break: break-all;"
        );
      } else {
        return (
          "font-size: 1rem; background: #252963; border: none; border-right: 1px solid #171717; padding: 0; height: " +
          this.stageTableCellHeight +
          "px; color: white; word-break: break-all;"
        );
      }
    },
    stageHeaderCellStyle(option) {
      if (option.columnIndex == 6) {
        return (
          "background: #0f0938; border: none; padding: 0; height:" +
          this.stageTableHeadHeight +
          "px; color: white; text-align: center;"
        );
      } else {
        return (
          "background: #0f0938; border: none; border-right: 1px solid #555555; padding: 0; height:" +
          this.stageTableHeadHeight +
          "px; color: white; text-align: center; "
        );
      }
    },
  },
  mounted() {
    // 页面进入时加载内容
    const that = this;
    window.onresize = () => {
      return (() => {
        that.getHeight();
      })();
    };
    this.initWebSocket();
    const stage = this.$refs.stage;
    const sale = this.$refs.sale;
    const project = this.$refs.project;

    this.tableScroll(stage, 50);
    this.tableScroll(sale, 50);
    this.tableScroll(project, 50);
    this.getNotices();
  },
  destroyed: function () {
    // 离开页面生命周期函数
    this.websocketclose();
  },
};
</script>
<style lang="scss" scoped>
@import "../../../style/screen_global";

.flex-center {
  display: flex;
  align-items: center;
  justify-content: center;
}

.marketing-container {
  width: 100%;
  height: 100vh;
  background: #17113c;
  color: #eee;
  font-family: Arial, Helvetica, sans-serif;

  .title {
    font-weight: bold;
    height: 7%;
    text-align: center;
    font-size: 2.2rem;
    font-family: Arial;
  }

  .first-group {
    display: flex;
    justify-content: space-around;
    padding: 0 0.5rem;
    height: 35%;

    .time-box {
      flex: 1;
      display: flex;
      flex-direction: column;

      .clock-group {
        background-color: #272956;
        border-radius: 8px;
        margin: 0 0.4rem;
      }

      .separate {
        background: #17113c;
        min-height: 0.71rem;
      }

      .list {
        padding: 0 0.4rem;
        display: flex;
        height: 100%;

        .list-content-contain {
          background-color: #272956;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          padding: 0.9rem;

          .list-content {
            font-family: Arial;
            overflow: hidden;
            width: 100%;

            .dept-box {
              display: flex;
              padding-right: 1rem;
              align-items: center;

              .dept-item {
                background: #eee;
                color: #17113c;
                padding: 2px 4px;
                word-break: break-all;
                font-size: 0.8rem;
                border-radius: 2px;
              }
            }

            .membersName {
              margin-top: 0.2rem;
              font-size: 0.9rem;
            }

            .duty {
              font-size: 1.2rem;
              word-break: break-all;
              text-align: justify;
              text-justify: distribute-all-lines;
              line-height: 1.4rem;
            }
          }
        }
      }
    }
  }

  .second-group {
    height: 28%;
    display: flex;
    padding: 0 0.9rem 0;

    .ticket {
      padding-top: 0.8rem;
      width: 100%;
      display: flex;
      background: #17113c;

      .data-box {
        flex: 1;
        display: flex;
        overflow: hidden;
        flex-direction: column;
        align-items: center;
        background-color: #272956;
        border-radius: 8px;

        .table-style {
          color: #ffffffdd;
          background-color: transparent;
          font-size: 1rem !important;
          line-height: 1.5rem;
        }

        .diy-style {
          ::v-deep.cell {
            white-space: nowrap;
            text-overflow: initial;
            background-color: transparent;
            padding: 0.5rem 0;
          }

          ::v-deep.tr {
            background-color: transparent;
          }
        }

        .data-title {
          font-weight: bold;
          font-size: 1.3rem;
          height: 3rem;
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
        }
      }
    }
  }

  .third-group {
    height: 30%;
    padding: 0 0.8rem;
    display: flex;

    .third-box {
      padding: 0.8rem 0 1rem;
      display: flex;
      width: 100%;
    }

    .stock-box {
      flex: 5;
      background-color: #272956;
      border-top-left-radius: 8px;
      border-top-right-radius: 8px;
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-right: 0.8rem;
      overflow: hidden;

      .stock-title {
        font-weight: bold;
        font-size: 1.3rem;
        height: 3rem;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
      }
    }

    .notice-box {
      flex: 6;
      background-color: #272956;
      border-top-left-radius: 8px;
      border-top-right-radius: 8px;
      display: flex;
      flex-direction: column;
      align-items: center;

      .notice-content {
        display: flex;
        height: 100%;

        .notice-left-item {
          flex: 2;
          display: flex;
          flex-direction: column;
          align-items: center;

          .avatar {
            margin: 0.8rem 0 0.6rem;
          }

          .name {
            font-size: 1.1rem;
          }
        }

        .notice-right-item {
          flex: 11;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 0 1.1rem 1rem;

          .notice-right-item-top {
            .notice-item-title {
              font-size: 1.3rem;
              font-weight: bold;
              margin-top: 0.8rem;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
            }

            .notice-message {
              font-size: 1.2rem;
              margin: 0.7rem 0.8rem 0 0;
              word-break: break-all;
              text-align: justify;
              line-height: 1.4rem;
              text-justify: distribute-all-lines;
            }
          }

          .notice-right-item-bot {
            text-align: end;
            padding-bottom: 1.2rem;
            padding-right: 1rem;
            font-size: 1rem;
            color: #ccc;
          }
        }
      }

      .notice-title {
        font-weight: bold;
        font-size: 1.3rem;
        height: 3rem;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
      }
    }

    .urgent-notice {
      .urgent-title {
        font-weight: bold;
        font-size: 1.3rem;
        height: 3rem;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
      }
    }
  }
}

.stage,
.calendar-project,
.overstock,
.sales-table {
  background-color: rgba($color: #fff, $alpha: 0.05);
  background-color: #272956;
  border-radius: 10px;
}

.stage,
.calendar-project,
.overstock,
.sales-table {
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

.stage ::before {
  left: 0;
  bottom: 0;
  width: 100%;
  height: 0px;
}

.calendar-project ::before {
  left: 0;
  bottom: 0;
  width: 100%;
  height: 0px;
}

.stage ::v-deep .el-table__row > td {
  /* 去除表格线 */
  border: none;
}

.calendar-project ::v-deep .el-table__row > td {
  /* 去除表格线 */
  border: none;
}

.overstock ::v-deep .el-table__row > td {
  /* 去除表格线 */
  border: none;
}

.sales-table ::v-deep .el-table__row > td {
  /* 去除表格线 */
  border: none;
}

.stage ::v-deep .el-table th {
  /* 去除上边框 */
  border: none;
}

.calendar-project ::v-deep .el-table th {
  /* 去除上边框 */
  border: none;
}

.overstock ::v-deep .el-table th {
  /* 去除上边框 */
  border: none;
}

.sales-table ::v-deep .el-table th {
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

//调整Data-v边框样式
.calendar-project-border::after {
  content: "Project Calendar";
  position: absolute;
  left: 40px;
  top: -5px;
  width: 200px;
  text-align: center;
  font-size: 20px;
  color: rgb(243, 243, 247);
  font-weight: 600;
  background-image: url("../../../assets/bg/pg-k3-1.png");
  border-radius: 50%;
}

.stage-border::after {
  content: "Product Stage";
  position: absolute;
  left: 40px;
  top: -5px;
  width: 200px;
  text-align: center;
  font-size: 20px;
  color: rgb(243, 243, 247);
  font-weight: 600;
  background-image: url("../../../assets/bg/pg-k3-1.png");
  border-radius: 50%;
  z-index: 1;
}

.sales-border::after {
  content: "Sales Ranking";
  position: absolute;
  left: 40px;
  top: -5px;
  width: 180px;
  text-align: center;
  font-size: 20px;
  color: rgb(243, 243, 247);
  font-weight: 600;
  background-image: url("../../../assets/bg/bg.png");
  border-radius: 50%;
}

.overstock-border::after {
  content: "Overstock";
  position: absolute;
  left: 20px;
  top: -5px;
  width: 120px;
  text-align: center;
  font-size: 20px;
  color: rgb(247, 243, 247);
  font-weight: 600;
  background-image: url("../../../assets/bg/bg.png");
  border-radius: 50%;
}

.demo-table-expand {
  font-size: 0;
  //margin: 10px 60px
}

.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}

.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}

::v-deep.cell {
  line-height: 1.6rem;
  padding: 0.5rem;
}

::v-deep.el-table th.el-table__cell > .cell {
  white-space: nowrap;
  text-overflow: initial;
  font-size: 1rem;
}
</style>

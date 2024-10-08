<template>
  <div id='index' class="sts-container">

    <!-- title -->
    <div class="title flex-center" id="title">Tech support</div>

    <!-- time-board -->
    <div class="first-group" id="first-group">
      <div class="time-box" v-for="item in rowClockList" :key="item.clockId">
        <!-- 时间 -->
        <div class="clock-group" id="clock-group">
          <CrayonClock :timeZone="Number(item.clockTimezone)" :country="item.clockArea"/>
        </div>
        <div class="separate" id="separate"></div>
        <div class="list" id="list">
          <div class="list-content-contain">
            <autoscroll class="list-content" :height="scrolHeight + 'px'" v-if="item.members.length > 0" :speed="20">
              <div v-for="it in item.members" :key="it.memberId" style="margin-top: 0.6rem;">
                <el-row>
                  <el-col :span="7">
                    <div class="dept-box">
                      <div class="dept-item">{{it.memberDept}}</div>
                    </div>
                    <div class="membersName">{{it.memberName}}</div>
                  </el-col>
                  <el-col :span="17">
                    <div class="duty">{{it.duty}}</div>
                  </el-col>
                </el-row>
              </div>
            </autoscroll>
            <div class="list-content flex-center" :style="'font-family: Arial; color: #ccc; height:' + scrolHeight + 'px; font-size: 1.2rem;'" v-else>No information</div>
          </div>
        </div>
      </div>
      <div style="flex: 1; display: flex; flex-direction: column;">
        <div class="time-box" v-for="(item, index) in colClockList" :key="index">
          <!-- 时间 -->
          <div class="clock-group" id="clock-group" >
            <CrayonClock :timeZone="Number(item.clockTimezone)" :country="item.clockArea"/>
          </div>
          <div class="separate" id="separate"></div>
          <div class="list" id="list">
            <div class="list-content-contain">
              <autoscroll class="list-content" v-if="item.members.length > 0" :height="colScrolHeight + 'px'" :speed="30">
                <div v-for="it in item.members" :key="it.memberId" style="margin-top: 0.6rem;">
                  <el-row>
                    <el-col :span="7">
                      <div class="dept-box">
                        <div class="dept-item">{{it.memberDept}}</div>
                      </div>
                      <div class="membersName">{{it.memberName}}</div>
                    </el-col>
                    <el-col :span="17">
                      <div class="duty">{{it.duty}}</div>
                    </el-col>
                  </el-row>
                </div>
              </autoscroll>
              <div class="list-content flex-center" :style="'font-family: Arial;  color: #ccc; font-size: 1.3rem; '" v-else>No information</div>
            </div>
          </div>
          <div class="separate" id="separate" v-if="index == 0"></div>
        </div>
      </div>
    </div>

    <div class="second-group" >
      <div class="ticket">
        <div class="ticket-box">
          <div class="ticket-title" id="ticket-title">Seven-day Avg. ticket(R=Row, C=CN)</div>
          <el-table class="table-style" :data="avgTicket" ref="avgTable" :cell-style="cellStyle" :height="ticketTableHeight" :header-cell-style="headerCellStyle" :header-row-style="headerRowStyle">
            <el-table-column type="index" width="30">
              <template slot-scope="scope">
                <span v-if="scope.$index+1 == 1" style="color: gold; font-weight: bold;">1</span>
                <span v-else-if="scope.$index+1 == 2" style="color: red; font-weight: bold;">2</span>
                <span v-else-if="scope.$index+1 == 3" style="color: green; font-weight: bold;">3</span>
                <span v-else-if="scope.$index+1 == 4" style="color: #ccc;">4</span>
                <span v-else style="color: #ccc;">5</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="Products" prop="rowProduct">
              <template slot-scope="scope">{{scope.row.rowProduct == null ? '-' : scope.row.rowProduct}}</template>
            </el-table-column>
            <el-table-column align="center" label="No.of Tickets" prop="rowNum" :width="Math.ceil(8 * rem)">
              <template slot-scope="scope">
                {{ scope.row.rowNum == null ? '-' : scope.row.rowNum }}
              </template>
            </el-table-column>
            <el-table-column align="center" label="Products" prop="chinaProduct">
              <template slot-scope="scope">
                {{ scope.row.chinaProduct == null ? '-' : scope.row.chinaProduct }}
              </template>
            </el-table-column>
            <el-table-column align="center" label="No.of Tickets" prop="chinaNum" :width="Math.ceil(8 * rem)">
              <template slot-scope="scope">
                {{ scope.row.chinaNum == null ? '-' : scope.row.chinaNum }}
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="ticket-box" id="ticket-box" style="margin: 0 0.8rem;">
          <div class="ticket-title" id="ticket-title">Unsolved ticket</div>
          <el-table class="table-style" :data="unsolvedTicket" ref="unsolvedTicket" :height="ticketTableHeight" :cell-style="cellStyle" :header-cell-style="headerCellStyle" :header-row-style="headerRowStyle">
            <el-table-column align="center" type="index" width="30">
              <template slot-scope="scope">
                <span v-if="scope.$index+1 == 1" style="color: gold; font-weight: bold;">1</span>
                <span v-else-if="scope.$index+1 == 2" style="color: red; font-weight: bold;">2</span>
                <span v-else-if="scope.$index+1 == 3" style="color: green; font-weight: bold;">3</span>
                <span v-else-if="scope.$index+1 == 4" style="color: #ccc;">4</span>
                <span v-else style="color: #ccc;">{{ scope.$index+1 }}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="Product(R)" prop="rowProduct">
              <template slot-scope="scope">
                {{ scope.row.rowProduct == null ? '-' : scope.row.rowProduct }}
              </template>
            </el-table-column>
            <el-table-column align="center" label="num" prop="rowNum" :width="Math.ceil(5 * rem)">
              <template slot-scope="scope">
                {{ scope.row.rowNum == null ? '-' : scope.row.rowNum }}
              </template>
            </el-table-column>
            <el-table-column align="center" label="Product(C)" prop="chinaProduct">
              <template slot-scope="scope">
                {{ scope.row.chinaProduct == null ? '-' : scope.row.chinaProduct }}
              </template>
            </el-table-column>
            <el-table-column align="center" label="num" prop="chinaNum" :width="Math.ceil(5 * rem)">
              <template slot-scope="scope">
                {{ scope.row.chinaNum == null ? '-' : scope.row.chinaNum }}
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="ticket-box">
          <div class="ticket-title" id="ticket-title">Product return</div>
          <el-table class="table-style" :height="ticketTableHeight"  :data="productReturn" :cell-style="cellStyle" :header-cell-style="headerCellStyle" :header-row-style="headerRowStyle" ref="productReturn">
            <el-table-column align="center" type="index" width="30">
              <template slot-scope="scope">
                <span v-if="scope.$index+1 == 1" style="color: gold; font-weight: bold;">1</span>
                <span v-else-if="scope.$index+1 == 2" style="color: red; font-weight: bold;">2</span>
                <span v-else-if="scope.$index+1 == 3" style="color: green; font-weight: bold;">3</span>
                <span v-else-if="scope.$index+1 == 4" style="color: #ccc;">4</span>
                <span v-else style="color: #ccc;">{{ scope.$index+1 }}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="MTD(R)" prop="rowMonthProduct,rowMonthNum" :width="ticketWidth">
              <template slot-scope="scope">
                <span v-if="scope.row.rowMonthProduct">{{ scope.row.rowMonthProduct }} / {{ scope.row.rowMonthNum }}</span>
                <span v-else>-</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="YTD(R)" prop="rowYearProduct,rowYearNum" :width="ticketWidth">
              <template slot-scope="scope">
                <span v-if="scope.row.rowYearProduct">{{ scope.row.rowYearProduct }} / {{ scope.row.rowYearNum }}</span>
                <span v-else>-</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="MTD(C)" prop="chinaMonthProduct,chinaMonthNum" :width="ticketWidth">
              <template slot-scope="scope">
                <span v-if="scope.row.chinaMonthProduct">{{ scope.row.chinaMonthProduct }} / {{ scope.row.chinaMonthNum }}</span>
                <span v-else>-</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="YTD(C)" prop="chinaYearProduct,chinaYearNum" :width="ticketWidth">
              <template slot-scope="scope">
                <span v-if="scope.row.chinaYearProduct">{{ scope.row.chinaYearProduct }} / {{ scope.row.chinaYearNum }}</span>
                <span v-else>-</span>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>

    <div class="third-group">
      <div class="third-box">
        <div class="third-item">
          <div class="item-title" id="ticket-title">Stage</div>
          <el-table :data="stages" :height="280" :cell-style="stageCellStyle" size="mini" ref="stage" :header-cell-style="stageHeaderCellStyle">
          <el-table-column type="index" width="30" />
            <el-table-column align="center" prop="product">
              <template slot="header">Product</template>
            </el-table-column>
            <el-table-column align="center" label="Bates" prop="bates">
            </el-table-column>
            <el-table-column align="center" label="PP" prop="pp">
            </el-table-column>
            <el-table-column align="center" label="MP" prop="mp">
            </el-table-column>
            <el-table-column align="center" label="Despatch" prop="despatch">
            </el-table-column>
            <el-table-column align="center" label="PR" prop="pr">
            </el-table-column>
            <el-table-column align="center" label="Launch" prop="launch">
            </el-table-column>
          </el-table>
        </div>

        <div class="third-item" style="margin-left: 0.8rem;">
          <div class="item-title" id="ticket-title">Urgent Notices</div>
          <el-carousel :interval="3000" :height="carouselHeight + 'px'" style="width: 100%;">
            <el-carousel-item v-for="i in notices" :key="i.gmtCreate">
              <div class="notice-content">
                <div class="notice-left-item">
                  <el-avatar :size="3 * rem" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" class="avatar"/>
                  <div class="name">{{i.publisher}}</div>
                </div>
                <div class="notice-right-item">
                  <div class="notice-right-item-top">
                    <div class="notice-title">{{ i.title }}</div>
                    <div class="notice-message">{{ i.message }}</div>
                  </div>
                  <div class="notice-right-item-bot">Published on: {{ i.gmtCreate }}</div>
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
  // import topHeader from './top-header.vue'
  import CrayonClock from '@/components/crayonClock/index.vue'
  //import { vueClock } from 'vue-clock-lonlyape'
  import autoscroll from 'z-vue-autoscroll'
  import { getScreen } from '@/api/screen';
  import { getReturnTable, getAvgTicket, getUnsolvedTicket, getStage } from '@/api/sts';
  import { selectUnexpiredNotice } from '@/api/notices';
  // import { cp } from 'fs';
  export default {
    name: 'sts-screen',
    data() {
      return {

        loading: null,
        //websocket
        websock: null,
        lockReconnect: false,
        timeout: 60 * 1000,
        timeoutObj: null,
        serverTimeoutObj: null,
        timeoutnum: null,
        topic: 'sts',
        rowClockList: [],
        colClockList: [],
        screen: {},
        background: {},
        avgTicket: [
          {
            chinaProduct: "product-1",
            chinaNum: 0,
            rowProduct: "product-2",
            rowNum: 0
          }
        ],
        unsolvedTicket: [
          {
            rowProduct: "product-1",
            rowNum: 2,
            chinaProduct: "product-3",
            chinaNum: 3
          }
        ],
        productReturn: [
          {
            rowMonthProduct: "product-1",
            rowMonthNum: 0,
            rowYearProduct: "product-2",
            rowYearNum: 0,
            chinaMonthProduct: "product-3",
            chinaMonthNum: 0,
            chinaYearProduct: "product-4",
            chinaYearNum: 0
          }
        ],
        stages: [
          {
            product: "product-1",
            bates: "2022.10.11",
            pp: "2022.10.11",
            mp: "2022.10.11",
            despatch: "2022.10.11",
            pr: "2022.10.11",
            launch: "2022.10.11"
          }
        ],
        notices: [
        ],
        notice: {},
        scrolHeight: 0,
        colScrolHeight: 0,
        secondHeight: 0,
        ticketTableHeight: 0,
        thirdHeight: 0,
        ticketTableCellHeight: 0,
        ticketTableHeadHeight: 0,
        stageTableCellHeight: 0,
        stageTableHeadHeight: 0,
        rem: 0,
        StageHeight: 0,
        carouselHeight: 0,
        ticketWidth: 0
      }
    },
    watch: { // 监测变化
      screen: {
        handler: function (newV, oldV) {
          console.log(newV, oldV)
        },
        deep: true,
        immediate: true
      },
      notices: {
        handler: function (newV, oldV) {
          console.log(newV, oldV)
        },
        deep: true,
        immediate: true
      }
    },
    computed: { // 计算属性
      // carouselNum() {
      //   let noticesLength = this.notices.length
      //   return parseInt(noticesLength / 3) + 1
      // },

      twoDimNotices() {
        let twoDimensionArray = []
        let noticesLength = this.notices.length
        let carouselNum = noticesLength
        for (let index = 0; index < carouselNum; index++) {
          if (index == carouselNum && noticesLength % 3 != 0) {
            let oneDimensionArray = []
            for (let index = 0; index < noticesLength % 3; index++) {
              oneDimensionArray.push(this.notices[index + (carouselNum - 1) * 3])
            }
            twoDimensionArray.push(oneDimensionArray)

          } else {
            let oneDimensionArray = []
            oneDimensionArray.push(this.notices[0 + (index - 1) * 3])
            oneDimensionArray.push(this.notices[1 + (index - 1) * 3])
            oneDimensionArray.push(this.notices[2 + (index - 1) * 3])
            twoDimensionArray.push(oneDimensionArray)
          }

        }

        return twoDimensionArray
      }
    },
    async created() {

      //this.Loading()
      setTimeout(() => {
        this.getHeight()
      }, 1500);
      this.getScreenStyle()

      this.getReturns()

      this.getAvgTickets()

      this.getUnsolvedTickets()

      this.getStages()

      this.getNotices()
    },
    components: { autoscroll, CrayonClock },
    methods: { // 方法
      Loading() {
        this.loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
      },
      getHeight() {
        var htmlEle = document.documentElement
        var winWidth = htmlEle.clientWidth || document.body.clientWidth
        this.rem = Math.ceil(winWidth/115)
        document.documentElement.style.fontSize = this.rem + 'px'

        var winHeight = window.innerHeight
        const firstHeight = Math.ceil(winHeight*0.35)
        const clockHeight = document.getElementById("clock-group").clientHeight
        this.scrolHeight = firstHeight - clockHeight - (2.5 * this.rem)
        this.colScrolHeight = (firstHeight - (clockHeight * 2) - (5.8 * this.rem)) / 2

        this.secondHeight = Math.ceil(winHeight * 0.28)
        this.thirdHeight = Math.ceil(winHeight * 0.3)
        this.carouselHeight = Math.floor(this.thirdHeight - 5 * this.rem)

        const ticketBoxHeight = document.getElementById('ticket-box').clientWidth
        this.ticketWidth = Math.ceil((ticketBoxHeight - 30) / 4)
        // setTimeout(() => {
        //   this.loading.close();
        // }, 1000);
      },

      /**
       * 滚动控制器
       * @param {*} table 表格名
       * @param {*} speed 速度
       */
      tableScroll(table, speed) {

        // 拿到表格挂载后的真实DOM
        const divData = table.bodyWrapper// 拿到表格中承载数据的div元素

        setInterval(() => {
          if (divData.scrollHeight - divData.clientHeight > 10) {
            if (divData.clientHeight + divData.scrollTop < divData.scrollHeight) {
              divData.scrollTop += 1// 元素自增距离顶部1像素

              if (divData.clientHeight + divData.scrollTop >= divData.scrollHeight) {
                setTimeout(() => {
                  divData.scrollTop = 0// 重置table距离顶部距离
                }, 3000);
              }
            }
          }
        }, speed)
      },

      initWebSocket: function () {

        var websocket_url = process.env.VUE_APP_WEBSOCKET_URL + this.topic
        this.websock = new WebSocket(websocket_url);
        this.websock.onopen = this.websocketOnOpen;
        this.websock.onerror = this.websocketOnError;
        this.websock.onmessage = this.websocketonmessage;
        this.websock.onclose = this.websocketclose

      },
      //连接后调用
      websocketOnOpen: function () {
        this.start()
      },
      websocketOnError: function () {
        this.initWebSocket()
      },
      websocketSend: function (data) {
        this.websock.send(data)
      },
      websocketonmessage: function (e) {
        console.log(`e`,e)
        this.reset()
        if (e.data == "UPDATE_NOTICES") {
          this.getNotices()
        }
        if (e.data == "UPDATE_TICKET") {
          this.getAvgTickets()
          this.getUnsolvedTickets()
        }
        if (e.data == "UPDATE_RETURN") {
          this.getReturns()
        }
        if (e.data == "UPDATE_STAGE") {
          this.getStages()
        }
        if (e.data == "UPDATE_TEAM") {
          this.getScreenStyle()
        }
      },

      // 关闭连接时调用
      websocketclose: function () {
      },

      reconnet() {
        var that = this
        if (that.lockReconnect) {
          return
        }
        that.lockReconnect = true
        //没连接上会一直重连，设置延迟避免请求过多
        that.timeoutnum && clearTimeout(that.timeoutnum)

        that.timeoutnum = setTimeout(() => {
          that.initWebSocket()
          that.lockReconnect = false
        }, 5000);
      },

      reset() {
        var that = this
        clearTimeout(that.timeoutObj)
        clearTimeout(that.serverTimeoutObj)
        that.start()
      },

      start() {
        var self = this
        self.timeoutObj && clearTimeout(self.timeoutObj)

        //如果内层心跳检测倒计时存在的话，清除掉
        self.serverTimeoutObj && clearTimeout(self.serverTimeoutObj)

        self.timeoutObj = setTimeout(() => {
          if (self.websock.readyState === 1) {

            const heartCheckParam = {
              isHeart: true,
              topic: this.topic,
              context: '心跳中'
            }
            self.websock.send(JSON.stringify(heartCheckParam))
          } else {
            self.reconnet()
          }
          self.serverTimeoutObj = setTimeout(() => {
            self.websock.close()
          }, self.timeout);
        }, self.timeout);
      },
      async getScreenStyle() {
        var that = this
        const { data: res } = await getScreen(3)
        if (res.code == 200) {
          this.screen = res.data
          that.rowClockList = []
          that.colClockList = []
          for ( let a = 0; a < 6; a ++) {
            a < 4 ? that.rowClockList.push(that.screen.clocks[a]) : that.colClockList.push(that.screen.clocks[a])
          }
        }
      },
      async getReturns() {
        //get returnTable
        const { data: res1 } = await getReturnTable()
        if (res1.code == 200) {
          this.productReturn = res1.data
        }
      },
      async getAvgTickets() {
        //getAvgTicket
        const { data: res2 } = await getAvgTicket()
        if (res2.code == 200) {
          this.avgTicket = res2.data
        }
      },
      async getUnsolvedTickets() {
        //getUnsolvedTicket
        const { data: res3 } = await getUnsolvedTicket()
        if (res3.code == 200) {
          this.unsolvedTicket = res3.data
        }
      },
      async getStages() {
        //getStages
        const { data: res4 } = await getStage()
        if (res4.code == 200) {
          this.stages = res4.data
        }
      },
      async getNotices() {
        //getNotices
        const { data: res5 } = await selectUnexpiredNotice(3)
        if (res5.code == 200) {
          this.notices = res5.data
          this.notice = res5.data[0]
        }
      },
      cellStyle({ rowIndex, columnIndex }) {
        this.ticketTableCellHeight = Math.ceil( ((this.secondHeight - 5 - (3.8 * this.rem)) / 6) )
        this.ticketTableHeadHeight = Math.ceil( this.secondHeight - (3.8 * this.rem) - (this.ticketTableCellHeight * 5))
        this.ticketTableHeight = Math.ceil(this.ticketTableHeadHeight * 5)
        if (rowIndex % 2 == 0 && columnIndex == 0) {
          return 'background: #15184d; border: none; border-right: 1px solid #252963; padding: 0; height: '+ this.ticketTableCellHeight +'px'
        } else if (rowIndex % 2 == 0 && columnIndex == 2) {
          return 'font-size: 1rem; background: #15184d; border: none; border-right: 1px solid #dddddd88; padding: 0; height: '+ this.ticketTableCellHeight +'px'
        } else if (rowIndex % 2 == 0 && columnIndex == 4) {
          return 'font-size: 1rem; background: #15184d; border: none; padding: 0; height: '+ this.ticketTableCellHeight +'px'
        } else if (rowIndex % 2 == 0) {
          return 'font-size: 1rem; background: #15184d; border: none; border-right: 1px solid #252963; padding: 0; height: '+ this.ticketTableCellHeight +'px'
        }else if (rowIndex % 2 == 1 && columnIndex == 0) {
          return 'background: #252963; border: none; border-right: 1px solid #171717; padding: 0; height: '+ this.ticketTableCellHeight +'px'
        } else if (rowIndex % 2 == 1 && columnIndex == 2) {
          return 'font-size: 1rem; background: #252963; border: none; border-right: 1px solid #171717; padding: 0; height: '+ this.ticketTableCellHeight +'px'
        } else if (rowIndex % 2 == 1 && columnIndex == 4) {
          return 'font-size: 1rem; background: #252963; border: none; padding: 0; height: '+ this.ticketTableCellHeight +'px'
        } else {
          return 'font-size: 1rem; background: #252963; border: none; border-right: 1px solid #15184d; padding: 0; height: '+ this.ticketTableCellHeight +'px'
        }
      },
      stageCellStyle({rowIndex, columnIndex}) {
        this.stageTableCellHeight = Math.round((this.thirdHeight - 4.8 * this.rem) / 6)
        this.stageTableHeadHeight = this.stageTableCellHeight - 6
        if (rowIndex % 2 == 0 && columnIndex == 1) {
          return 'font-size: 1rem; background: #15184d; border: none; border-right: 1px solid #dddddd88; padding: 0; height: '+ this.stageTableCellHeight +'px; color: white;'
        } else if (rowIndex % 2 == 0 && columnIndex == 7) {
          return 'font-size: 1rem; background: #15184d; border: none; padding: 0; height: '+ this.stageTableCellHeight +'px; color: white;'
        } else if (rowIndex % 2 == 0) {
          return 'font-size: 1rem; background: #15184d; border: none; border-right: 1px solid #252963; padding: 0; height: '+ this.stageTableCellHeight +'px; color: white;'
        } else if (rowIndex % 2 == 1 && columnIndex == 1) {
          return 'font-size: 1rem; background: #252963; border: none; border-right: 1px solid #171717; padding: 0; height: '+ this.stageTableCellHeight +'px; color: white;'
        } else if (rowIndex % 2 == 1 && columnIndex == 7) {
          return 'font-size: 1rem; background: #252963; border: none; padding: 0; height: '+ this.stageTableCellHeight +'px; color: white;'
        } else {
          return 'font-size: 1rem; background: #252963; border: none; border-right: 1px solid #15184d00; padding: 0; height: '+ this.stageTableCellHeight +'px; color: white;'
        }
      },
      headerCellStyle({ columnIndex }) {
        if (columnIndex == 2) {
          return "background: #0f0938; white-space:nowrap; border: none; border-right: 1px solid #555; padding: 0; height:" + this.ticketTableHeadHeight +'px; color: white;'
        } else if (columnIndex == 4) {
          return "background: #0f0938; white-space:nowrap; border: none; padding: 0; height:" + this.ticketTableHeadHeight +'px; color: white;'
        } else {
          return "background: #0f0938; white-space:nowrap; border: none; border-right: 1px solid #333; padding: 0; height:" + this.ticketTableHeadHeight +'px; color: white;'
        }
      },
      stageHeaderCellStyle({ columnIndex }) {
        if (columnIndex == 7) {
          return "background: #0f0938; border: none; padding: 0; height:" + this.stageTableHeadHeight +'px; color: white; font-weight: bold;'
        } else {
          return "background: #0f0938; border: none; padding: 0; height:" + this.stageTableHeadHeight +'px; color: white; border-right: 1px solid #555;'
        }
      },
      headerRowStyle() {
        return 'height: 2.5rem;'
      }
    },
    mounted() {
      const that = this
      window.onresize = () => {
        return (() => {
          that.getHeight()
        })()
      }
      this.initWebSocket()
      const stage = this.$refs.stage
      const unsolvedTicket = this.$refs.unsolvedTicket
      const productReturn = this.$refs.productReturn
      this.tableScroll(stage, 50)
      this.tableScroll(unsolvedTicket, 51)
      this.tableScroll(productReturn, 52)

    }
  }
</script>

<style lang='scss' scoped>
  @import "../../../style/screen_global";

  .flex-center {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .el-table, .el-table__expanded-cell {
    background-color: transparent;
  }


  ::v-deep.el-carousel {
    display: flex;
  }

  ::v-deep.el-carousel__container {
    width: 100%;
    height: 22vh;
  }

  .sts-container {
    width: 100%;
    height: 100vh;
    background: #17113C;
    color: #EEEEEE;
    font-family: Arial;

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
          background: #17113C;
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
                  color: #17113C;
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
                text-justify:distribute-all-lines;
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
      padding: 0 0.9rem;

      .ticket {
        padding-top: 0.8rem;
        width: 100%;
        display: flex;
        background: #17113C;

        .ticket-box {
          flex: 1;
          display: flex;
          overflow: hidden;
          flex-direction: column;
          align-items: center;
          background-color: #272956;
          border-radius: 8px;

          ::v-deep .el-table .cell {
            line-height: 1.8rem;
            padding: 0.5rem 0.5rem;
            text-align: center;
          }

          .table-style {
            color: #ffffffdd;
            background-color: transparent;
            font-size: 1rem;
          }

          .ticket-title {
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

        .third-item {
          flex: 1;
          background-color: #272956;
          border-top-left-radius: 8px;
          border-top-right-radius: 8px;
          display: flex;
          flex-direction: column;
          align-items: center;

          ::v-deep .el-table .cell {
            padding-right: 0;
            padding-left: 0;
            text-align: center;
          }

          .notice-content {
            height: 100%;
            display: flex;

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
                .notice-title {
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
                  text-justify:distribute-all-lines;
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

          .item-title {
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

  }

  ::v-deep .el-table tr {
    background-color: transparent;
  }

  //重写el-table样式，背景透明度
  .unsolved-ticket,
  .stage,
  .product-return,
  .product-ticket {

    background-color: rgba($color: #ddd, $alpha: 0.05);
    background-color: #272956;
    border-radius: 10px;

    ::v-deep .el-table,
    .el-table_expanded-cell {
      background-color: transparent;
    }

    ::v-deep .el-table th {
      background-color: transparent !important;
      ;
    }

    ::v-deep .el-table tr {
      background-color: transparent !important;
    }

    ::v-deep .el-table--enable-row-transition .el-table_body td,
    .el-table .cell {
      background-color: transparent;
    }
  }

  .el-table::before {
    left: 0;
    bottom: 0;
    width: 100%;
    height: 0px;
  }

  //el-table 隐藏滚动条
  .stage,
  .unsolved-ticket,
  .product-return,
  .product-ticket {
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

  //去除表格线
  .stage ::v-deep .el-table__row>td {
    /* 去除表格线 */
    border: none;
  }

  .product-return ::v-deep .el-table__row>td {
    /* 去除表格线 */
    border: none;
  }

  .unsolved-ticket ::v-deep .el-table__row>td {
    /* 去除表格线 */
    border: none;
  }

  .product-ticket ::v-deep .el-table__row>td {
    /* 去除表格线 */
    border: none;
  }

  .stage ::v-deep .el-table th.is-leaf {
    /* 去除上边框 */
    border: none;
  }

  .product-return ::v-deep .el-table th {
    /* 去除上边框 */
    border: none;
  }

  .unsolved-ticket ::v-deep .el-table th {
    /* 去除上边框 */
    border: none;
  }



  .product-ticket ::v-deep .el-table th {
    /* 去除上边框 */
    border: none;
  }



  .stage ::v-deep .el-table::before {
    /* 去除下边框 */
    height: 0;
  }

  .product-ticket ::v-deep .el-table::before {
    /* 去除下边框 */
    height: 0;
  }

  .unsolved-ticket ::v-deep .el-table::before {
    /* 去除下边框 */
    height: 0;
  }

  .product-return ::v-deep .el-table::before {
    /* 去除下边框 */
    height: 0;
  }

  .el-table--border,
  .el-table--group {
    /*去除多级表头，左上边框 */
    border: none;
  }

  .el-table--border::after,
  .el-table--group::after {
    top: 0;
    right: 0;
    width: 0px;
    height: 100%;
  }

  //表格斜线样式
  .left {
    text-align: left;
    position: relative;
    padding-left: 10px;
  }

  .left::after {
    content: '';
    width: 100%;
    height: 0px;
    position: absolute;
    top: 0;
    left: 0;
  }

  .right {
    text-align: right;
    padding-right: 10px;
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

</style>

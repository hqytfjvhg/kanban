<template>
  <div class='company-container'>
    <!-- title -->
    <div class="title flex-center" id="title">Company</div>

    <!-- time-board -->
    <div class="first-group" id="first-group">
      <div class="time-box" v-for="item in rowClockList" :key="item.clockId">
        <!-- 时间 -->
        <div class="clock-group" id="clock-group">
          <CrayonClock :timeZone="Number(item.clockTimezone)" :country="item.clockArea" />
        </div>
        <div class="separate" id="separate"></div>
        <div class="list" id="list">
          <div class="list-content-contain">
            <autoscroll class="list-content" :height="scrolHeight + 'px'" v-if="item.members.length > 0" :speed="20">
              <div v-for="it in item.members" :key="it.memberId" style="margin-top: 0.6rem;">
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
            <div class="list-content flex-center"
              :style="'font-family: Arial; color: #ccc; height:' + scrolHeight + 'px; font-size: 1.2rem;'" v-else>No
              information</div>
          </div>
        </div>
      </div>
      <div style="flex: 1; display: flex; flex-direction: column;">
        <div class="time-box" v-for="item in colClockList" :key="item.clockId">
          <!-- 时间 -->
          <div class="clock-group" id="clock-group">
            <CrayonClock :timeZone="Number(item.clockTimezone)" :country="item.clockArea" />
          </div>
          <div class="separate" id="separate"></div>
          <div class="list" id="list">
            <div class="list-content-contain">
              <autoscroll class="list-content" v-if="item.members.length > 0" :height="colScrolHeight + 'px'" :speed="30">
                <div v-for="it in item.members" :key="it.memberId" style="margin-top: 0.6rem;">
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
              <div class="list-content flex-center"
                :style="'font-family: Arial; color: #ccc; font-size: 1.2rem; height: ' + colScrolHeight + 'px;'" v-else>No
                information</div>
            </div>
          </div>
          <div class="separate" id="separate" v-if="item.clockId == 5"></div>
        </div>
      </div>
    </div>

    <div class="second-group" id="second-group">
      <div class="calendar-box" id="calendar-box">
        <div class="calendar">
          <div class="calendar-tip">Holidays</div>
          <div class="calendar-content">
            <vc-calendar class="vc-calendar" color="blue" style="margin-right: 0.5rem;" :pane="1"
              :attributes="areaVocations" :is-dark="true" locale="en" />
            <vc-calendar ref="calendar" class="vc-calendar" color="blue" :pane="2" :attributes="areaVocations"
              :is-dark="true" locale="en" :step="2" />
          </div>
          <div style="display: flex; align-items: center; height: 5rem; font-family: Arial; padding-bottom: 0.6rem;">
            <div class="holiday-tip" style="background: red;"></div>
            <div style="color: red; margin-right: 1rem;">CN</div>
            <div class="holiday-tip" style="background: #67C23A;"></div>
            <div style="color: #67C23A; margin-right: 1rem;">UK</div>
            <div class="holiday-tip" style="background: #409EFF;"></div>
            <div style="color: #409EFF; margin-right: 1rem;">US</div>
            <!-- <div class="holiday-tip" style="background: yellow;"></div> -->
            <!-- <div style="color: yellow; margin-right: 1rem;">Poland</div> -->
            <div class="holiday-tip" style="background: #ED64A6;"></div>
            <div style="color: #ED64A6; margin-right: 1rem;">Today</div>
          </div>
        </div>
      </div>

      <div class="key-news">
        <div class="news-box">
          <div class="news-tip">Int. News</div>
          <autoscroll :height="newsHeight + 'px'" :speed="20">
            <div v-if = "keyNews.length === 0" style="padding:100px">
              None Int. News
            </div>
            <div v-if = "keyNews.length !== 0" v-for="item in keyNews" :key="item.keynewId" class="news-content">
              <el-row class="news-item">
                <el-col :span="4" style="margin-right: 1rem;">
                  <div class="news-publish-box">
                    <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
                      style="width: 3rem; height: 3rem"></el-avatar>
                    <div style="font-size:1rem; margin-top:6px;color:rgba(255, 255, 255,0.8); word-break: break-all;">{{
                      item.publisher }}</div>
                  </div>
                </el-col>
                <el-col :span="20">
                  <div
                    style="line-height: 1.5em; text-align: justify; word-break: break-all; text-justify: distribute-all-lines; font-size: 1.4rem;">
                    {{ item.message }}</div>
                  <div style="font-size:1rem; margin-top:10px; color:rgba(255, 255, 255,0.5); text-align: end;">
                    {{ item.gmtCreate }}</div>
                  <div style="font-size:1rem; margin-top:3px; color:rgba(255, 255, 255,0.5); text-align: end;">
                    {{ item.title }}</div>
                </el-col>
              </el-row>
            </div>
          </autoscroll>
        </div>
      </div>

      <div class="key-news">
        <div class="news-box">
          <div class="news-tip">Ext. News</div>
          <autoscroll :height="newsHeight + 'px'" :speed="20">
            <div v-if="showNews.length === 0" style="padding:100px">
              None Ext. News
            </div>
            <div v-for="item in showNews" :key="item.showId" class="news-content">
              <el-row class="news-item">
                <el-col :span="4" style="margin-right: 1rem;">
                  <div class="news-publish-box">
                    <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
                      style="width: 3rem; height: 3rem"></el-avatar>
                    <div style="font-size:1rem; margin-top:6px;color:rgba(255, 255, 255,0.8); word-break: break-all;">{{
                      item.publisher }}</div>
                  </div>
                </el-col>
                <el-col :span="20">
                  <div
                    style="line-height: 1.5em; word-break: break-all; text-align: justify; text-justify: distribute-all-lines;  font-size: 1.4rem;">
                    {{ item.message }}</div>
                  <div style="font-size:1rem; margin-top:10px; color:rgba(255, 255, 255,0.5); text-align: end;">
                    {{ item.gmtCreate }}</div>
                  <div style="font-size:1rem; margin-top:3px; color:rgba(255, 255, 255,0.5); text-align: end;">
                    {{ item.title }}</div>
                </el-col>
              </el-row>
            </div>
          </autoscroll>
        </div>
      </div>

      <div class="award-news">
        <autoscroll :height="calendarHeight + 'px'" :speed="20" class="award-box">
          <div v-for="item in awards" :key="item.id">
            <img :src="base_api + '/' + item.imageUrl" mode="widthFix" style="display:block; width: 100%;" />
          </div>
        </autoscroll>
      </div>
    </div>
  </div>
</template>

<script>
import CrayonClock from '@/components/crayonClock/index.vue'
import autoscroll from 'z-vue-autoscroll'
import { getScreen } from '@/api/screen';
import { getAreaVocations } from '@/api/vocation';
import { selectUnexpiredNews } from '@/api/keynew';
import { selectUnexpiredShow } from '@/api/show';
import { selectAwardsStateIsTrue } from '@/api/awards';

export default {
  name: 'CompanyScreen',
  data() {

    const date = new Date();
    const month = date.getMonth();
    const year = date.getFullYear();
    return {
      testMsg: 0,
      base_api: process.env.VUE_APP_BASE_API,
      websock: null,
      lockReconnect: false,
      timeout: 60 * 1000,
      timeoutObj: null,
      serverTimeoutObj: null,
      timeoutnum: null,
      topic: 'company',
      month,
      year,
      screen: {
        clocks: []
      }, //时间列表信息
      rowClockList: [],
      colClockList: [],
      background: {},
      keyNews: [],
      showNews: [],
      awards: [],
      today: '',
      areaVocations: [],
      scrolHeight: 0, //first高度
      colScrolHeight: 0, //first高度
      calendarHeight: 0, //日历高度
      newsHeight: 0,
      attributes: [],
      rem: 0,
      calendarMidHeight: 0
    }

  },
  async created() { // 实例被创建之后执行代码

  },

  async mounted() { // 页面进入时加载内容
    const that = this
    window.onresize = () => {
      return (() => {
        that.getHeight()
      })()
    }

    setTimeout(() => {
      this.getHeight()
    }, 1000);

    this.initWebSocket()

    this.getScreenStyle()

    this.selectAwards()

    this.getAreaVocations()

    this.getShows()

    this.getKeyNews()

    const calendar = this.$refs.calendar

    await calendar.move(1)

  },
  components: { autoscroll, CrayonClock },

  methods: {

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
      console.log("websocket 连接错误" + e);
      this.initWebSocket()
    },
    websocketSend: function (data) {
      this.websock.send(data)
    },
    websocketonmessage: function (e) {
      console.log("e", e)
      this.reset()
      if (e.data == "UPDATE_TEAM") {
        this.getScreenStyle()
      }
      if (e.data == "UPDATE_NEWS") {
        this.getKeyNews()
      }
      if (e.data == "UPDATE_SHOWS") {
        this.getShows()
      }
      if (e.data == "UPDATE_VACATION") {
        this.getAreaVocations()
      }
      if (e.data == "UPDATE_AWARDS") {
        this.selectAwards()
      }
    },
    // 关闭连接时调用
    websocketclose: function () {
      this.reconnet()
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
          console.log(`关闭websocket`)
        }, self.timeout);
      }, self.timeout);
    },
    async getScreenStyle() {
      var that = this
      const { data: res } = await getScreen(1)
      if (res.code == 200) {
        this.screen = res.data
        that.rowClockList = []
        that.colClockList = []
        for (let a = 0; a < 6; a++) {
          a < 4 ? that.rowClockList.push(that.screen.clocks[a]) : that.colClockList.push(that.screen.clocks[a])
        }
      }
    },
    async getAreaVocations() {
      const { data: res } = await getAreaVocations()
      if (res.code == 200) {
        console.log("areaVocations", res.data)
        this.areaVocations = res.data
        this.areaVocations.push({
          key: 'vocation',
          highlight: 'pink',
          dates: new Date()
        })
      }
    },

    // 获取key news
    async getKeyNews() {
      const { data: res } = await selectUnexpiredNews()
      if (res.code == 200) {
        this.keyNews = res.data
      }
    },
    async getShows() {
      const { data: res } = await selectUnexpiredShow()
      if (res.code == 200) {
        this.showNews = res.data
      }
    },
    async selectAwards() {
      const { data: res } = await selectAwardsStateIsTrue()
      if (res.code == 200) {
        this.awards = res.data
      }
    },
    time() {
      //定时任务，实时改变时间
      // this.today = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate())
      this.today = new Date()
      this.anyDateNextMonth = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 15)
      setInterval(() => {
        this.today = new Date()
        this.anyDateNextMonth = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 15)
      }, 1000)
    },
    getHeight() {

      var calendarBox = null
      while(calendarBox===null){
         calendarBox = document.getElementById('calendar-box')
      }
      var calendarBoxHeight = calendarBox.clientHeight

      var htmlEle = document.documentElement
      var winWidth = htmlEle.clientWidth || document.body.clientWidth
      const rem = Math.ceil(winWidth / 115)
      document.documentElement.style.fontSize = rem + 'px'

      // 设置日历宽度
      console.log('calendarBoxHeight', calendarBoxHeight - (11 * rem))

      var winHeight = window.innerHeight
      const firstHeight = Math.round(winHeight * 0.42)
      const clockHeight = document.getElementById("clock-group").clientHeight
      this.scrolHeight = firstHeight - clockHeight - (2.5 * rem)
      this.colScrolHeight = (firstHeight - (clockHeight * 2) - (8 * rem)) / 2

      var secondHeight = winHeight / 2

      this.newsHeight = secondHeight - (6 * rem)
      this.calendarHeight = Math.round(secondHeight - (1.8 * rem))
      this.calendarMidHeight = Math.ceil(secondHeight - (8.5 * rem)) + 'px;'


    },
  },

  destroyed: function () { // 离开页面生命周期函数
    this.websocketclose();
  },
  watch: { // 监测变化
    screen: {
      handler: function () {
      },
      deep: true,
      immediate: true
    },
  }
}
</script>

<style lang='scss' scoped>
@import "@/style/screen_global";
.holiday-tip {
  width: 0.8rem;
  height: 0.8rem;
  border-radius: 0.5rem;
  margin-right: 0.5rem;
}

::v-deep.vc-calendar {
  width: 100%;
  height: 100%;
  padding-bottom: 2rem;
  overflow: hidden;

  .vc-dot {
    width: 0.4rem;
    height: 0.4rem;
  }

  .vc-arrow {
    display: none !important;
  }


  .vc-pane-container {
    display: flex;

    .vc-pane-layout {
      width: 100%;

      .vc-pane {
        min-width: 0px;
        height: 100%;
        padding-bottom: 1.6rem;
      }
    }


  }

  .vc-highlight {
    width: 2rem;
    height: 2rem;
  }

  .vc-header {
    padding-bottom: 0.3rem;
  }

  // 日期表格
  .vc-weeks {
    min-width: 0;
    height: 100%;

    /* 星期标识 */
    .vc-weekday {
      padding: 0;
      font-size: 1rem;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .vc-day {
      min-height: 0;
      padding: 0;
      margin: 0;

      .vc-day-content {
        line-height: 0;
        width: 1rem;
        height: 1rem;
        font-size: 0.7rem;
      }
    }
  }
}

.flex-center {
  display: flex;
  align-items: center;
  justify-content: center;
}

.company-container {
  width: 100%;
  height: 100vh;
  background: #17113C;
  color: #EEEEEE;
  font-family: Arial, Helvetica, sans-serif;

  .title {
    font-weight: bold;
    height: 7%;
    text-align: center;
    font-size: 2.2rem;
    font-family: Arial;
    padding-top: 5px;
  }

  .first-group {
    height: 42%;
    display: flex;
    justify-content: space-around;
    padding: 0 0.5rem;

    .time-box {
      flex: 1;
      display: flex;
      flex-direction: column;
      // overflow: hidden;

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
              margin-top: 0.1rem;
              font-size: 0.9rem;
            }

            .duty {
              font-size: 1.4rem;
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
    height: 50%;
    display: flex;
    text-align: center;
    padding: 0 0.9rem;

    .calendar-box {
      flex: 3;
      padding: 0.8rem 0;
      overflow: hidden;

      .calendar {
        display: flex;
        flex-direction: column;
        background: #272956;
        border-radius: 8px;
        height: 100%;
        padding: 0 12px 0;

        .calendar-tip {
          font-weight: bold;
          font-size: 1.4rem;
          display: flex;
          align-items: center;
          justify-content: center;
          height: 6rem;
        }

        .calendar-content {
          height: 90%;
          display: flex;
        }
      }
    }
  }




  .key-news {
    flex: 2;
    padding: 0.8rem 0 0.8rem 0.8rem;

    .news-box {

      display: flex;
      flex-direction: column;
      background: #272956;
      border-radius: 8px;
      height: 100%;
      padding: 0 12px 0;
      justify-content: space-evenly;

      .news-tip {
        font-weight: bold;
        font-size: 1.4rem;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 2.5rem;
        border-bottom: 1px solid #cccccc50;
      }

      .news-content {
        padding: 1rem 0.5rem 1rem 0;
        border-bottom: solid rgba(255, 255, 255, 0.2) 0.5px;

        .news-item {
          display: flex;
          justify-content: space-between;
        }

        .news-publish-box {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
      }
    }
  }

  .award-news {
    flex: 2;
    padding: 0.8rem 0 1rem 0.8rem;

    .award-box {
      border-radius: 3px;
    }
  }
}
</style>

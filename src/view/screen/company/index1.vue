<!--  -->
<template>
  <div class="CompanyScreen">
    <div class="title flex-center" id="title" :style="'height:' + titleHeight">Company</div>
    <!-- <AreaClock class="first-part"></AreaClock> -->
    <div class="first-part" style="margin:0 0.8rem">
      <el-row>
        <el-col :xs="12" :sm="12" :lg="{ span: '4-8' }" v-for="item in clocks" :key="item.clockId">
          <div class="clock-group" id="clock-group" :style="'height:' + clockHeight">
            <CrayonClock :timeZone="Number(item.clockTimezone)" :country="item.clockArea" :timeFormat="item.timeFormat" />
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="separate" id="separate"></div>
    <div class="members" style="margin:0 0.8rem">
      <el-row>
        <el-col :xs="12" :sm="12" :lg="{ span: '4-8' }" v-for="(item, index) in members" :key="item.id">
          <CardComponent :height="membersHeight" :rem="rem" :members="item"></CardComponent>
        </el-col>
      </el-row>
    </div>
    <div class="separate" id="separate"></div>
    <div class="second-part" style="display: flex;margin:0 1.2rem 1rem 0">
      <NationalHoliday :rem="rem" style="margin-left:1.5rem;flex:3;" :height="holidayHeight"
        :contentHeight="contentHeight" :holidays="holidays"></NationalHoliday>
      <div style="margin-left:1rem;flex:4;height: 100%;">
        <KeyNews :keyNews="keyNews" style="width: 100%;" :height="height2"></KeyNews>
        <div class="separate" id="separate"></div>
        <AwardsIfr :awards="intAwards" style="width: 100%;" :height="height1" :rem="rem"></AwardsIfr>
      </div>
      <div style="margin-left:1rem;flex:4;height: 100%;">
        <ExtNews :extNews="extNews" style="width: 100%;" :height="height2"></ExtNews>
        <div class="separate" id="separate"></div>
        <AwardsIfr :awards="extAwards" style="width: 100%;" :height="height1" :rem="rem"></AwardsIfr>
      </div>
    </div>
  </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';
import NationalHoliday from '@/view/screen/components/NationalHolidays/index.vue'
import ExtNews from '@/view/screen/components/ExtNews/index.vue'
import KeyNews from '@/view/screen/components/KeyNews/index.vue'
import AwardsIfr from '@/view/screen/components/AwardsIfr/index.vue'
import CrayonClock from '@/components/crayonClock/index.vue'
import CardComponent from '@/view/screen/components/AreaClock/card.vue'
import { getClocksByScreenId, getMembersByScreenId, getAwards } from '@/api/board'
import { selectUnexpiredNews } from '@/api/keynew';
import { selectUnexpiredShow } from '@/api/show';
import { getAreaVocations } from '@/api/vocation';
export default {
  // import引入的组件需要注入到对象中才能使用
  components: {
    NationalHoliday, ExtNews, KeyNews, AwardsIfr, CrayonClock, CardComponent
  },
  name: 'CompanyScreen',
  data() {
    // 这里存放数据
    return {

      loading: null,
      websock: null,
      lockReconnect: false,
      timeout: 60 * 1000,
      timeoutObj: null,
      serverTimeoutObj: null,
      timeoutnum: null,
      topic: 'company',

      rem: '',
      titleHeight: '',
      height1: '',
      height2: '',
      membersHeight: '',
      clockHeight: '',
      holidayHeight: '',
      contentHeight: '',
      clocks: [],
      members: [],
      intAwards: [],
      extAwards: [],
      keyNews: [],
      extNews: [],
      holidays: [],
      timer: null,
    };
  },
  // 监听属性 类似于data概念
  computed: {},
  // 监控data中的数据变化
  watch: {},
  // 方法集合
  methods: {
    getHeight() {
      console.log('获取宽高')

      var htmlEle = document.documentElement
      var winWidth = htmlEle.clientWidth || document.body.clientWidth
      const rem = Math.ceil(winWidth / 115)
      document.documentElement.style.fontSize = rem + 'px'
      this.rem = rem + 'px'
      console.log(rem)

      var winHeight = window.innerHeight
      const titleHeight = Math.round(winHeight * 0.06)
      const clockHeight = Math.round(winHeight * 0.08)

      const height1 = Math.round(winHeight * 0.42)
      const height2 = Math.round(winHeight * 0.25)
      const holidayHeight = Math.round(winHeight * 0.72)
      const contentHeight = holidayHeight / 27

      const membersHeight = Math.round(winHeight * 0.06)


      //const clockHeight = document.getElementById("clock-group").clientHeight
      this.titleHeight = titleHeight + 'px'
      this.clockHeight = clockHeight + 'px'
      this.height1 = height1 + 'px'
      this.height2 = height2 + 'px'
      this.membersHeight = membersHeight + 'px'
      this.holidayHeight = holidayHeight + 'px'
      this.contentHeight = contentHeight + 'px'
      console.log(`titleHeight`, this.titleHeight)
      console.log(`clockHeight`, this.clockHeight)
      console.log(`height1`, this.height1)
      console.log(`height2`, this.height2)
      console.log(`holidayHeight`, this.holidayHeight)
      console.log(`contentHeight`, this.contentHeight)
      console.log(`membersHeight`, this.membersHeight)
      // this.scrolHeight = firstHeight - clockHeight - (2.5 * rem)
      // this.colScrolHeight = (firstHeight - (clockHeight * 2) - (8 * rem)) / 2

      // 设置日历宽度
      //console.log('calendarBoxHeight', calendarBoxHeight - (11 * rem))
    },
    async getClocks() {
      const { data: res } = await getClocksByScreenId(1)
      if (res.code == 200) {
        this.clocks = res.data
      }
    },
    async getMembers() {
      const { data: res } = await getMembersByScreenId(1)
      console.log(res.data)
      if (res.code == 200) {
        this.members = res.data
      }
    },
    async getIntAwards() {
      const { data: res } = await getAwards(1) //1——So/Me
      if (res.code == 200) {
        this.intAwards = res.data
      }
    },
    async getExtAwards() {
      const { data: res } = await getAwards(0)//0——Award
      if (res.code == 200) {
        this.extAwards = res.data
      }
    },
    async getAreaVocations() {
      const { data: res } = await getAreaVocations()
      if (res.code == 200) {
        console.log("areaVocations", res.data)
        this.holidays = res.data
        this.holidays.push({
          key: 'vocation',
          highlight: 'pink',
          dates: new Date()
        })
      }
    },
    initWebSocket: function () {
      //var url = window._CONFIG['domianURL'].replace("http://", "ws://") + "websocket/" + userId;
      //var url = "ws://120.79.22.70:8081/websocket/" + this.topic
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
    websocketOnError: function (e) {
      console.log("websocket 连接错误" + e);
      this.initWebSocket()
    },
    websocketSend: function (data) {
      this.websock.send(data)
    },
    websocketonmessage: function (e) {
      this.reset()
      if (e.data == "UPDATE_TEAM") {
        this.getMembers()
      }
      if (e.data == "UPDATE_NEWS") {
        this.getKeyNews()
      }
      if (e.data == "UPDATE_SHOWS") {
        this.getShows()
      }
      if (e.data == "UPDATE_AWARDS") {
        this.getIntAwards()
        this.getExtAwards()
      }
      if (e.data == "UPDATE_VACATION") {
        this.getAreaVocations()
      }
      if (e.data == "UPDATE_CLOCK") {
        this.getClocks()
      }
    },
    // 关闭连接时调用
    websocketclose: function () {
    }
    ,
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
    async getKeyNews() {
      const { data: res } = await selectUnexpiredNews()
      if (res.code == 200) {
        this.keyNews = res.data
      }
    },
    async getShows() {
      const { data: res } = await selectUnexpiredShow()
      if (res.code == 200) {
        this.extNews = res.data
      }
    },
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created() {

  },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    const that = this
    window.onresize = () => {
      return (() => {
        that.getHeight()
      })()
    }
    this.initWebSocket()
    this.getClocks()
    this.getMembers()
    this.getIntAwards()
    this.getExtAwards()
    this.getKeyNews()
    this.getShows()
    this.getAreaVocations()

    setTimeout(() => {
      this.getHeight()
    }, 1000);

    //每60秒更新一次时间，更新当前日期
    this.timer = setInterval(() => {
      this.getAreaVocations()
    }, 60000)
  },
  beforeCreate() { }, // 生命周期 - 创建之前
  beforeMount() { }, // 生命周期 - 挂载之前
  beforeUpdate() { }, // 生命周期 - 更新之前
  updated() { }, // 生命周期 - 更新之后
  beforeDestroy() { }, // 生命周期 - 销毁之前
  destroyed() {
    this.websocketclose();
  }, // 生命周期 - 销毁完成
  activated() { }, // 如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
<style lang='scss' scoped>
//  @import url(); 引入公共css类
.el-col-lg-4-8 {
  width: 20%;
}

.clock-group {
  background-color: #272956;
  border-radius: 8px;
  margin: 0 0.4rem;
}

.separate {
  background: #17113C;
  min-height: 0.71rem;
}

.CompanyScreen {
  width: 100%;
  height: 100vh;
  background: #17113C;
  color: #EEE;
  font-family: Arial, Helvetica, sans-serif;
  overflow: hidden;

  .title {
    font-weight: bold;
    height: 7%;
    text-align: center;
    font-size: 2.2rem;
    font-family: Arial;
    padding-top: 5px;
  }
}

.flex-center {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>

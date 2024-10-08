<!--  -->
<template>
  <div class="StsScreen">
    <!-- title -->
    <div class="title flex-center" id="title" :style="'height:' + titleHeight">Tech support</div>
    <!-- <AreaClock></AreaClock> -->
    <div class="first-part" style="margin:0 0.8rem">
      <el-row>
        <el-col :xs="12" :sm="12" :lg="{ span: '4-8' }" v-for="item in clocks" :key="item.clockId">
          <div class="clock-group" id="clock-group" :style="'height:' + clockHeight">
            <CrayonClock :timeZone="Number(item.clockTimezone)" :country="item.clockArea" :timeFormat="item.timeFormat"/>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="separate" id="separate"></div>
    <div class="members" style="margin:0 0.8rem">
      <el-row>
        <el-col :xs="12" :sm="12" :lg="{ span: '4-8' }" v-for="item in members" :key="item.id">
          <CardComponent :height="membersHeight" :rem="rem" :members="item"></CardComponent>
        </el-col>
      </el-row>
    </div>
    <div class="separate" id="separate"></div>
    <div class="second-part" style="margin:0rem 1.2rem">
      <el-row>
        <el-col :xs="12" :sm="12" :lg="7">
          <AvgTicket style="padding-right:0.5rem" :height="secondHeight" :rem="rem" :complaints="complaints"></AvgTicket>
        </el-col>

        <el-col :xs="12" :sm="12" :lg="8">
          <ProductReturn style="padding-right:0.5rem" :height="secondHeight" :rem="rem" :returns="returns" :returnDays="returnDays"></ProductReturn>
        </el-col>
        <el-col :xs="12" :sm="12" :lg="9">
          <SoftwareStage :height="secondHeight" :rem="rem" :SoftwareStages="softwares"></SoftwareStage>
        </el-col>
      </el-row>
    </div>
    <div class="separate" id="separate"></div>
    <div class="third-part" style="margin:0rem 1.2rem">
      <el-row>
        <el-col :xs="12" :sm="12" :lg="4">
          <UnsolvedTicket style="padding-right:0.5rem" :height="thirdHeight" :rem="rem" :unsolvedComplaints="unsolvedComplaints"></UnsolvedTicket>
        </el-col>
        <el-col :xs="12" :sm="12" :lg="12">
          <ProductTesting style="" :rem="rem" :height="thirdHeight" :data="productTestings"></ProductTesting>
        </el-col>
        <el-col :xs="12" :sm="12" :lg="8">
          <UrgentNotice style="margin-left: 0.5rem;" :boxHeight="thirdHeight" :height="urgentNoticeHeight" :notices="notices"></UrgentNotice>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';
import CrayonClock from '@/components/crayonClock/index.vue'
import AreaClock from '@/view/screen/components/AreaClock/index.vue'
import CardComponent from '@/view/screen/components/AreaClock/card.vue'
import AvgTicket from '@/view/screen/components/AvgTicket/index.vue'
import UnsolvedTicket from '@/view/screen/components/UnsolvedTicket/index.vue'
import ProductReturn from '@/view/screen/components/ProductReturn/index.vue'
import SoftwareStage from '@/view/screen/components/SoftwareStage/index.vue'
import ProductTesting from '@/view/screen/components/ProductTesting/index.vue'
import UrgentNotice from '@/view/screen/components/UrgentNotices/index.vue'
import {
  getClocksByScreenId, getMembersByScreenId,
  getNotices,getProductTestings,getSoftwares,getReturns,getComplaints,getUnsolvedComplaints,getReturnDays
} from '@/api/board'
export default {
  // import引入的组件需要注入到对象中才能使用
  components: {
    CrayonClock, AreaClock, AvgTicket, UnsolvedTicket, ProductReturn,
    SoftwareStage, ProductTesting, UrgentNotice, CardComponent
  },
  name: 'StsScreen',
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

      loading: null,
      websock: null,
      lockReconnect: false,
      timeout: 60 * 1000,
      timeoutObj: null,
      serverTimeoutObj: null,
      timeoutnum: null,
      topic: 'sts',

      rem: '',
      titleHeight: '',
      clockHeight: '',
      membersHeight: '',
      secondHeight: '',
      thirdHeight: '',
      urgentNoticeHeight: '',
      clocks: [],
      members: [],
      notices: [],
      productTestings:[],
      softwares:[],
      returns:[],
      complaints:[],
      unsolvedComplaints:[],
      returnDays:10,

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
      const membersHeight = Math.round(winHeight * 0.06)
      const secondHeight = Math.round(winHeight * 0.365)
      const thirdHeight = Math.round(winHeight * 0.35)

      this.titleHeight = titleHeight + 'px'
      this.clockHeight = clockHeight + 'px'
      this.membersHeight = membersHeight + 'px'
      this.secondHeight = secondHeight + 'px'
      this.thirdHeight = thirdHeight + 'px'
      this.urgentNoticeHeight = thirdHeight * 0.9 + 'px'
      console.log(`titleHeight`, this.titleHeight)
      console.log(`clockHeight`, this.clockHeight)
      console.log(`membersHeight`, this.membersHeight)
      console.log(`secondHeight`, this.secondHeight)
      console.log(`thirdHeight`, this.thirdHeight)
    },
    async getClocks() {
      const { data: res } = await getClocksByScreenId(3)
      if (res.code == 200) {
        this.clocks = res.data
      }
    },
    async getMembers() {
      const { data: res } = await getMembersByScreenId(3)
      console.log(res.data)
      if (res.code == 200) {
        this.members = res.data
      }
    },
    async getNotices() {
      const { data: res } = await getNotices(3)
      if (res.code == 200) {
        this.notices = res.data
      }
    },
    async getProductTestings(){
      const { data: res } = await getProductTestings()
      console.log(`getProductTesting`,res)
      if (res.code == 200) {
        this.productTestings = res.data
      }
    },
    async getSoftwares(){
      const { data: res } = await getSoftwares()
      if (res.code == 200) {
        this.softwares = res.data
      }
    },
    async getReturns(){
      const { data:res } = await getReturns()
      console.log(res)
      if (res.code == 200) {
        this.returns = res.data
      }
    },
    async getComplaints(){
      const { data:res } = await getComplaints() //7天内投诉票总数
      console.log(`getComplaints`,res)
      if (res.code == 200) {
        this.complaints = res.data
      }
    },
    async getUnsolvedComplaints(){
      const { data:res } = await getUnsolvedComplaints() //7天内投诉票总数
      console.log(`getUnsolvedComplaints`,res)
      if (res.code == 200) {
        this.unsolvedComplaints = res.data
      }
    },
    async getReturnDays(){
      const {data:res} = await getReturnDays()
      if (res.code == 200) {
        this.returnDays = res.data
      }
    },
    initWebSocket: function () {
      //var url = window._CONFIG['domianURL'].replace("http://", "ws://") + "websocket/" + userId;
      //var url = "ws://120.79.22.70:8081/websocket/" + this.topic
      console.log(`初始化websocket`)
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
      if (e.data == "UPDATE_NOTICES") {
        this.getNotices()
      }
      if(e.data == "UPDATE_PRODUCT_TESTING"){
        this.getProductTestings()
      }
      if(e.data == "UPDATE_SOFTWARE"){
        this.getSoftwares()
      }
      if (e.data == "UPDATE_RETURN") {
        this.getReturns()
        this.getReturnDays()
      }
      if (e.data == "UPDATE_COMPLAINT") {
        this.getComplaints()
      }
      if (e.data == "UPDATE_COMPLAINT_UNSOLVED") {
        this.getUnsolvedComplaints()
      }
      if(e.data == "UPDATE_CLOCK"){
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
    }
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
    this.getNotices()
    this.getProductTestings()
    this.getSoftwares()
    this.getReturns()
    this.getComplaints()
    this.getUnsolvedComplaints()
    this.getReturnDays()

    setTimeout(() => {
      this.getHeight()
    }, 1000);
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

.StsScreen {
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

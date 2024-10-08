<!-- 2023-12-21 改版 -->
<template>
  <div class="main">
    <!-- 标题 -->
    <div class="header">
      <h3 class="header-title">Tech support</h3>
    </div>
    <!-- 时钟列表 -->
    <div class="content-clock">
      <div
        :style="{ width: clockWidth, float: 'left' }"
        v-for="item in clocks"
        :key="item.clockId"
      >
        <div
          class="clock-group"
          id="clock-group"
        >
          <CrayonClock
            :timeZone="Number(item.clockTimezone)"
            :country="item.clockArea"
            :timeFormat="item.timeFormat"
          />
        </div>
      </div>
    </div>
    <div style="margin: 0px 20px">
      <!-- 垂直表格容器 -->
      <el-col
        :xs="24"
        :sm="24"
        :lg="16"
      >
        <div style="margin-bottom: 8px">
          <SoftwareStage
            :height="secondHeight"
            :rem="rem"
            :SoftwareStages="softwares"
          />
        </div>
        <div>
          <ProductTesting
            :rem="rem"
            :height="thirdHeight"
            :data="productTestings"
          />
        </div>
      </el-col>
      <el-col
        :xs="24"
        :sm="24"
        :lg="8"
      >
        <UrgentNotice
          style="margin: 0 0.2rem 0 0.5rem; width: 100%"
          :boxHeight="tableHeight"
          :height="urgentNoticeHeight"
          :rem="rem"
          :notices="notices"
          noticeTitle="Urgent Notices"
        />
      </el-col>
    </div>
    <div class="footer" />
  </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';
import CrayonClock from "@/components/crayonClock/index.vue";
import SoftwareStage from "@/view/screen/components/SoftwareStage/index.vue";
import ProductTesting from "@/view/screen/components/ProductTesting/index.vue";
import UrgentNotice from "@/view/screen/components/UrgentNotices/index.vue";
import {
  getClocksByScreenId,
  getNotices,
  getProductTestings,
  getSoftwares,
} from "@/api/board";
export default {
  // import引入的组件需要注入到对象中才能使用
  components: {
    CrayonClock,
    SoftwareStage,
    ProductTesting,
    UrgentNotice,
  },
  name: "StsScreen",
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
      topic: "sts",
      rem: "",
      clockWidth: "",
      tableHeight: "",
      secondHeight: "",
      thirdHeight: "",
      urgentNoticeHeight: "",
      clocks: [],
      notices: [],
      productTestings: [],
    };
  },
  // 监听属性 类似于data概念
  computed: {},
  // 监控data中的数据变化
  watch: {},
  // 方法集合
  methods: {
    getHeight() {
      console.log("获取宽高");

      var htmlEle = document.documentElement;
      // 屏幕宽度
      const winWidth = htmlEle.clientWidth || document.body.clientWidth;
      // 屏幕高度
      const winheight = htmlEle.clientHeight || document.body.clientHeight;

      const rem = Math.ceil(winWidth / 115);
      document.documentElement.style.fontSize = rem + "px";
      this.rem = rem + "px";

      // 计算单个时钟卡片宽度, 屏幕宽度 / 时钟卡片数量
      const singleClockCardWidth = (winWidth - 15) / this.clocks.length + "px";
      this.clockWidth = singleClockCardWidth;

      // 计算表格容器高度, 屏幕高度减去头部标签、时钟列表、底部固定元素高度,以及margin等高度 剩余的就是表格容器高度
      const tableHeight = winheight - 172 - 30 - 30;
      this.tableHeight = tableHeight + "px";

      // 计算 Software/Firmware 表格高度
      const secondHeight = (tableHeight - 10) / 2 + 60;

      // 计算 Product Testing Stage 表格高度
      const thirdHeight = (tableHeight - 10) / 2 - 60;

      this.secondHeight = secondHeight + "px";
      this.thirdHeight = thirdHeight + "px";
      this.urgentNoticeHeight = tableHeight * 0.9 + "px";
    },
    async getClocks() {
      const { data: res } = await getClocksByScreenId(3);
      if (res.code == 200) {
        res.data.forEach((op) => {
          if (op.clockArea != "Poland") {
            this.clocks.push(op);
          }
        });
      }
    },
    async getNotices() {
      const { data: res } = await getNotices(3);
      if (res.code == 200) {
        this.notices = res.data;
      }
    },
    async getProductTestings() {
      const { data: res } = await getProductTestings();
      console.log(`getProductTesting`, res);
      if (res.code == 200) {
        this.productTestings = res.data;
      }
    },
    async getSoftwares() {
      const { data: res } = await getSoftwares();
      if (res.code == 200) {
        this.softwares = res.data;
      }
    },
    initWebSocket: function () {
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
        this.getMembers();
      }
      if (e.data == "UPDATE_NOTICES") {
        this.getNotices();
      }
      if (e.data == "UPDATE_PRODUCT_TESTING") {
        this.getProductTestings();
      }
      if (e.data == "UPDATE_SOFTWARE") {
        this.getSoftwares();
      }
      if (e.data == "UPDATE_RETURN") {
        this.getReturns();
        this.getReturnDays();
      }
      if (e.data == "UPDATE_COMPLAINT") {
        this.getComplaints();
      }
      if (e.data == "UPDATE_COMPLAINT_UNSOLVED") {
        this.getUnsolvedComplaints();
      }
      if (e.data == "UPDATE_CLOCK") {
        this.getClocks();
      }
    },
    // 关闭连接时调用
    websocketclose: function () { },
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
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  async created() { },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  async mounted() {
    // 更改页面标签
    document.title = "Tech Support Dashboard";
    // 因为计算容器高宽需要等待数据渲染完成之后才能计算正确，必须保证等待数据渲染完成
    await this.initWebSocket();
    await this.getClocks();
    await this.getNotices();
    await this.getProductTestings();
    await this.getSoftwares();
    const that = this;
    window.onresize = () => {
      return (async () => {
        await that.getHeight();
      })();
    };
    setTimeout(async () => {
      await this.getHeight();
    }, 100);
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
};
</script>
<style lang="scss" scoped>
@import "@/style/ScreenTableCss.scss";

.content-clock {
  height: 120px;
  width: 100%;
  margin: 1px 10px 10px 10px;
  .clock-group {
    background-color: #272956;
    border-radius: 8px;
    margin: 0 0.4rem;
    height: 100%;
  }
}
</style>

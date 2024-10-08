<!-- 2023-12-21 改版 -->
<!-- 公司看板大屏 -->
<template>
  <div class="main">
    <!-- 标题 -->
    <div class="header">
      <h3 class="header-title">Company</h3>
    </div>
    <!-- 时钟列表 -->
    <div class="content-clock">
      <div
        :style="{ width: clockWidth, float: 'left' }"
        v-for="item in clocks"
        :key="item.clockId"
      >
        <div class="clock-group" id="clock-group">
          <CrayonClock
            :timeZone="Number(item.clockTimezone)"
            :country="item.clockArea"
            :timeFormat="item.timeFormat"
          />
        </div>
      </div>
    </div>

    <div style="display: flex; margin: 0 0.5rem 0 1rem">
      <!-- 左侧日历 -->
      <NationalHoliday
        :rem="rem"
        :height="holidayHeight"
        :contentHeight="contentHeight"
        :holidays="holidays"
        :style="{ width: calendarWidth }"
      />
      <!-- 右侧表格 -->
      <CompanyScreenTable
        :height="holidayHeight"
        :style="{ width: demoTableWight, 'margin-left': '10px' }"
        :stages="stages"
      />
    </div>
    <div class="footer" />
  </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';
import NationalHoliday from "@/view/screen/components/NationalHolidays/index.vue";
import ExtNews from "@/view/screen/components/ExtNews/index.vue";
import KeyNews from "@/view/screen/components/KeyNews/index.vue";
import AwardsIfr from "@/view/screen/components/AwardsIfr/index.vue";
import CrayonClock from "@/components/crayonClock/index.vue";
import { getClocksByScreenId, getAwards } from "@/api/board";
import { selectUnexpiredNews } from "@/api/keynew";
import { selectUnexpiredShow } from "@/api/show";
import { getAreaVocations } from "@/api/vocation";
import CompanyScreenTable from "@/view/screen/components/CompanyScreenTable/index.vue";
import { getData } from "@/api/product";
export default {
  // import引入的组件需要注入到对象中才能使用
  components: {
    NationalHoliday,
    ExtNews,
    KeyNews,
    AwardsIfr,
    CrayonClock,
    CompanyScreenTable,
  },
  name: "CompanyScreen",
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
      topic: "company",
      rem: "",
      clockWidth: "",
      height1: "",
      height2: "",
      holidayHeight: "",
      contentHeight: "",
      calendarWidth: "",
      demoTableWight: "",
      clocks: [],
      members: [],
      intAwards: [],
      extAwards: [],
      keyNews: [],
      extNews: [],
      holidays: [],
      stages: [],
      timer: null,
    };
  },
  // 监听属性 类似于data概念
  computed: {},
  // 监控data中的数据变化
  watch: {},
  // 方法集合
  methods: {
    async getHeight() {
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

      // 计算日历容器高度, 屏幕高度减去头部标签、时钟列表、底部固定元素高度,以及margin等高度 剩余的就是表格容器高度
      const tableHeight = winheight - 172 - 30 - 30;
      const contentHeight = tableHeight / 27;

      // 计算日历、表格宽度，日历宽度固定小于表格
      const calendarWidth = winWidth / 2 - 200 + "px";
      const demoTableWight = winWidth / 2 + 210 + "px";

      this.calendarWidth = calendarWidth;
      this.demoTableWight = demoTableWight;
      // 计算图片轮播容器第一行和第二行的高度, 第一行和第二行的总高度和日历高度是一样的，直接取日历高度计算.
      const imgHeight = tableHeight / 2 - 30;
      const height1 = imgHeight;
      const height2 = imgHeight;

      this.height1 = height1 + "px";
      this.height2 = height2 + "px";
      this.holidayHeight = tableHeight + "px";
      this.contentHeight = contentHeight + "px";
    },
    async getClocks() {
      const { data: res } = await getClocksByScreenId(1);
      if (res.code == 200) {
        res.data.forEach((op) => {
          if (op.clockArea != "Poland") {
            this.clocks.push(op);
          }
        });
      }
    },
    async getProductData() {
      const { data: res } = await getData("true");
      if (res.code == 200) {
        this.stages = res.data;
      }
    },
    async getIntAwards() {
      const { data: res } = await getAwards(1); //1——So/Me
      if (res.code == 200) {
        this.intAwards = res.data;
      }
    },
    async getExtAwards() {
      const { data: res } = await getAwards(0); //0——Award
      if (res.code == 200) {
        this.extAwards = res.data;
      }
    },
    async getAreaVocations() {
      const { data: res } = await getAreaVocations();
      if (res.code == 200) {
        res.data.map((item) => {
          item.dot = { style: { backgroundColor: item.dot } };
          return item;
        });
        this.holidays = res.data;
        this.holidays.push({
          key: "vocation",
          highlight: {
            color: "red",
            fillMode: "solid",
            style: { backgroundColor: "#34a853" },
          },
          dates: new Date(),
        });
      }
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
        this.getMembers();
      }
      if (e.data == "UPDATE_NEWS") {
        this.getKeyNews();
      }
      if (e.data == "UPDATE_SHOWS") {
        this.getShows();
      }
      if (e.data == "UPDATE_AWARDS") {
        this.getIntAwards();
        this.getExtAwards();
      }
      if (e.data == "UPDATE_VACATION") {
        this.getAreaVocations();
      }
      if (e.data == "UPDATE_CLOCK") {
        this.getClocks();
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
    async getKeyNews() {
      const { data: res } = await selectUnexpiredNews();
      if (res.code == 200) {
        this.keyNews = res.data;
      }
    },
    async getShows() {
      const { data: res } = await selectUnexpiredShow();
      if (res.code == 200) {
        this.extNews = res.data;
      }
    },
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  async created() {
    // await this.getIntAwards()
    // await this.getExtAwards()
    // await this.getKeyNews()

    //每60秒更新一次时间，更新当前日期
    this.timer = setInterval(() => {
      this.getAreaVocations();
    }, 60000);
  },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  async mounted() {
    // 更改页面标签
    document.title = "Company Dashboard";
    // 因为计算容器高宽需要等待数据渲染完成之后才能计算正确，必须保证等待数据渲染完成
    await this.initWebSocket();
    await this.getClocks();
    await this.getShows();
    await this.getAreaVocations();
    await this.getProductData();
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
  beforeCreate() {}, // 生命周期 - 创建之前
  beforeMount() {}, // 生命周期 - 挂载之前
  beforeUpdate() {}, // 生命周期 - 更新之前
  updated() {}, // 生命周期 - 更新之后
  beforeDestroy() {}, // 生命周期 - 销毁之前
  destroyed() {
    this.websocketclose();
  }, // 生命周期 - 销毁完成
  activated() {}, // 如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style lang="scss" scoped>
//  @import url(); 引入公共css类
@import "@/style/ScreenTableCss.scss";
.header {
  background: none !important;
}
.content-clock {
  height: 120px;
  width: 100%;
  margin: 1px 10px 10px 10px;
  // display: flex;
  // justify-content: space-between;

  .clock-group {
    background-color: #272956;
    border-radius: 8px;
    margin: 0 0.4rem;
    height: 100%;
  }
}

.separate {
  background: #17113c;
  min-height: 0.71rem;
}
</style>

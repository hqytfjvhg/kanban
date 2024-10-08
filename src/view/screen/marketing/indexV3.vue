<!-- 2023-12-20 改版 -->
<template>
  <div class="main">
    <!-- 标题 -->
    <div class="header">
      <h3 class="header-title">Marketing</h3>
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
    <div style="margin: 0 1rem">
      <!-- Product Stage表格 -->
      <el-col :xs="24" :sm="24" :lg="16">
        <ProductStage
          :rem="rem"
          :stages="productStages"
          :height="tableHeight1"
        />
        <SpecialProjects
          :rem="rem"
          :stages="specialProjectsStages"
          :height="tableHeight2"
          style="margin-top: 10px"
        />
      </el-col>
      <!-- Urgent Notices 通知消息列表 -->
      <el-col :xs="24" :sm="24" :lg="8">
        <UrgentNotice
          style="margin: 0 0.2rem 0 0.5rem; width: 100%"
          :boxHeight="tableHeight1"
          :height="urgentNoticeHeight"
          :rem="rem"
          :notices="showsData"
          noticeTitle="Shows"
        />
        <UrgentNotice
          style="margin: 10px 0 0 0.5rem; width: 100%"
          :boxHeight="tableHeight2"
          :height="urgentNoticeHeight2"
          :rem="rem"
          :notices="notices"
          noticeTitle="Urgent Notices"
        />
      </el-col>
    </div>
    <!-- <div class="footer" /> -->
  </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';
import CrayonClock from "@/components/crayonClock/index.vue";
import ProductStage from "@/view/screen/components/ProductStage/index.vue";
import UrgentNotice from "@/view/screen/components/UrgentNotices/index.vue";
import SpecialProjects from "@/view/screen/components/SpecialProjects/index.vue";
import { getClocksByScreenId, getNotices, getProductStages } from "@/api/board";

import { getAllNotice } from "@/api/notices";
import { getAll } from "@/api/show";
import { getData } from "@/api/product";
export default {
  // import引入的组件需要注入到对象中才能使用
  components: {
    CrayonClock,
    ProductStage,
    UrgentNotice,
    SpecialProjects,
  },
  name: "MarketingScreen",
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
      topic: "marketing",
      rem: "",
      clockWidth: "",
      tableHeight: "",
      tableHeight1: "",
      tableHeight2: "",
      urgentNoticeHeight: "",
      urgentNoticeHeight2: "",
      clocks: [],
      members: [],
      notices: [],
      showsData: [],
      projectDescs: [],
      eols: [],
      overstocks: [],
      productStages: [],
      specialProjectsStages: [],
      monthOverstockType: 1,
    };
  },
  // 监听属性 类似于data概念
  computed: {},
  // 监控data中的数据变化
  watch: {},
  // 方法集合
  methods: {
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
    websocketOnError: function () {
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
      if (e.data == "UPDATE_PROJECT") {
        this.getProjectDescs();
      }
      if (e.data == "UPDATE_STAGE") {
        this.getProductStages();
      }
      if (e.data == "UPDATE_OVERSTOCK") {
        //this.getOverstocks()
      }
      if (e.data == "UPDATE_SALE") {
        //this.getSalesRankings()
      }
      if (e.data == "UPDATE_EOL") {
        this.getEols();
      }
      if (e.data == "UPDATE_MONTH_OVERSTOCK") {
        this.getMonthOverstockType();
        this.getOverstocks();
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

    getHeight() {
      const htmlEle = document.documentElement;
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

      // 计算表格父容器内的两个表格高度,第一个表格设置固定比第二个表格高20px
      const childTableHeight = tableHeight / 2 - 10;
      this.tableHeight1 = childTableHeight + 30 + "px";
      this.tableHeight2 = childTableHeight - 20 + "px";
      // 计算表格容器内的通知容器内部文字显示高度
      this.urgentNoticeHeight = tableHeight / 2 - 45 + "px";
      this.urgentNoticeHeight2 = tableHeight / 2 - 91 + "px";
    },
    // 加载特殊项目表格数据
    async initDefaultDemoData() {
      // const date = new Date()
      // //for (let i = 0, size = 20; i < size; i++) {
      // //this.specialProjectsStages.push({ 'product': date.getTime(), 'date': '2023-07-16', 'content': date.getTime() + ' This is an example text that doesn t make any sense' })
      // // }
      const { data: res } = await getData("false");
      if (res.code == 200) {
        this.specialProjectsStages = res.data;
      }
    },
    // 加载时钟列表
    async getClocks() {
      const { data: res } = await getClocksByScreenId(2);
      if (res.code == 200) {
        // this.clocks = res.data
        res.data.forEach((op) => {
          if (op.clockArea != "Poland") {
            this.clocks.push(op);
          }
        });
      }
    },
    // 紧急通知
    async getNotices() {
      const { data: res } = await getAllNotice();
      if (res.code == 200) {
        this.notices = res.data;

        // this.notices = [
        //   {memberId:0,publisher:'测试1',memberName:'name',title:'测试数据',message:'测试消息',gmtCreate:'laizzzzz'},
        // ]
      }
    },
    // 展会消息
    async getShowsData() {
      const { data: res } = await getAll();
      if (res.code == 200) {
        this.showsData = res.data;
      }
    },

    async getProductStages() {
      const { data: res } = await getProductStages();
      if (res.code == 200) {
        this.productStages = res.data;
      }
    },
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  async created() {},
  // 生命周期 - 挂载完成（可以访问DOM元素）
  async mounted() {
    // 更改页面标签
    document.title = "Marketing Dashboard";
    // 因为计算容器高宽需要等待数据渲染完成之后才能计算正确，必须保证等待数据渲染完成
    await this.initWebSocket();
    await this.getClocks();
    await this.getNotices();
    await this.getProductStages();
    await this.getShowsData();
    await this.initDefaultDemoData();
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
:deep(.el-table__empty-block .el-table__empty-text) {
  display: none !important;
}
.header {
  background: none !important;
}
</style>

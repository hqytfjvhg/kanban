<!--  -->
<template>
  <div class="MarketingScreen">
    <div class="title flex-center" id="title" :style="'height:' + titleHeight">
      Marketing
    </div>
    <div class="first-part" style="margin: 0 0.8rem">
      <el-row>
        <el-col
          :xs="12"
          :sm="12"
          :lg="{ span: '4-8' }"
          v-for="item in clocks"
          :key="item.clockId"
        >
          <div
            class="clock-group"
            id="clock-group"
            :style="'height:' + clockHeight"
          >
            <CrayonClock
              :timeZone="Number(item.clockTimezone)"
              :country="item.clockArea"
              :timeFormat="item.timeFormat"
            />
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="separate" id="separate"></div>
    <div class="second-part" style="margin: 0 0.8rem">
      <el-row>
        <div>
          <el-col :xs="12" :sm="12" :lg="{ span: '4-10' }">
            <div>
              <!-- <el-col :xs="12" :sm="12" :lg="{ span: '4-11' }" v-for="(item, index) in members"
                                v-if="index < 2" :key="item.id">
                                <CardComponent style="margin:0 0.1rem" :height="membersHeight" :members="item">
                                </CardComponent>
                            </el-col> -->
            </div>
            <div>
              <el-col :xs="12" :sm="12" :lg="{ span: '4-12' }">
                <ProductStage
                  style=""
                  :rem="rem"
                  :height="productStageHeight"
                  :stages="productStages"
                ></ProductStage>
              </el-col>
            </div>
          </el-col>
        </div>
        <el-col :xs="12" :sm="12" :lg="{ span: '4-9' }">
          <ProjectDesc
            style="padding-top: 0rem; margin-left: 0.6rem; margin-right: 0.3rem"
            :height="projectDescHeight"
            :projectDescs="projectDescs"
            :rem="rem"
          ></ProjectDesc>
        </el-col>
      </el-row>
    </div>
    <div class="separate" id="separate"></div>
    <div class="third-part" style="margin: 0 0.9rem">
      <el-col :xs="12" :sm="12" :lg="8">
        <OverstockMonth
          style="margin: 0 0.5rem"
          :height="thirdBoxHeight"
          :rem="rem"
          :overstocks="overstocks"
          :type="monthOverstockType"
        >
        </OverstockMonth>
      </el-col>
      <el-col :xs="12" :sm="12" :lg="8">
        <EolTable
          style="margin: 0 0.5rem"
          :height="thirdBoxHeight"
          :rem="rem"
          :eols="eols"
        ></EolTable>
      </el-col>
      <el-col :xs="12" :sm="12" :lg="8">
        <UrgentNotice
          style="margin: 0 0.2rem 0 0.5rem"
          :boxHeight="thirdBoxHeight"
          :height="urgentNoticeHeight"
          :rem="rem"
          :notices="notices"
        ></UrgentNotice>
      </el-col>
    </div>
  </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';
import CrayonClock from "@/components/crayonClock/index.vue";
import CardComponent from "@/view/screen/components/AreaClock/card.vue";
import ProjectDesc from "@/view/screen/components/projectDesc/index.vue";
import ProductStage from "@/view/screen/components/ProductStage/index.vue";
import OverstockMonth from "@/view/screen/components/OverstockMonth/index.vue";
import EolTable from "@/view/screen/components/EolTable/index.vue";
import UrgentNotice from "@/view/screen/components/UrgentNotices/index.vue";
import {
  getClocksByScreenId,
  getMembersByScreenId,
  getNotices,
  getProjectDescs,
  getEols,
  getOverstocks,
  getProductStages,
  getMonthOverstockType,
} from "@/api/board";
export default {
  // import引入的组件需要注入到对象中才能使用
  components: {
    CrayonClock,
    CardComponent,
    ProjectDesc,
    ProductStage,
    OverstockMonth,
    EolTable,
    UrgentNotice,
  },
  name: "MarketingScreen",
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
      topic: "marketing",

      rem: "",
      titleHeight: "",
      clockHeight: "",
      membersHeight: "",
      productStageHeight: "",
      projectDescHeight: "",
      thirdBoxHeight: "",
      urgentNoticeHeight: "",
      clocks: [],
      members: [],
      notices: [],
      projectDescs: [],
      eols: [],
      overstocks: [],
      productStages: [],
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
      console.log("获取宽高");

      var htmlEle = document.documentElement;
      var winWidth = htmlEle.clientWidth || document.body.clientWidth;
      const rem = Math.ceil(winWidth / 115);
      document.documentElement.style.fontSize = rem + "px";
      this.rem = rem + "px";
      console.log(rem);

      var winHeight = window.innerHeight;
      const titleHeight = Math.round(winHeight * 0.06);
      const clockHeight = Math.round(winHeight * 0.08);
      const membersHeight = Math.round(winHeight * 0.06);

      //  productStageHeight
      // projectDescHeight
      // thirdBoxHeight

      // const productStageHeight = Math.round(winHeight * 0.35)
      const productStageHeight = Math.round(winHeight * 0.41) + 15 + 1.8 * rem;
      const projectDescHeight = Math.round(winHeight * 0.41) + 15 + 1.8 * rem;
      const thirdBoxHeight = Math.round(winHeight * 0.365);

      this.titleHeight = titleHeight + "px";
      this.clockHeight = clockHeight + "px";
      this.membersHeight = membersHeight + "px";

      this.productStageHeight = productStageHeight + "px";
      this.projectDescHeight = projectDescHeight + "px";
      this.thirdBoxHeight = thirdBoxHeight + "px";
      this.urgentNoticeHeight = thirdBoxHeight * 0.9 + "px";
      console.log(`titleHeight`, this.titleHeight);
      console.log(`clockHeight`, this.clockHeight);
      console.log(`membersHeight`, this.membersHeight);
    },
    async getClocks() {
      const { data: res } = await getClocksByScreenId(2);
      if (res.code == 200) {
        this.clocks = res.data;
      }
    },
    async getMembers() {
      const { data: res } = await getMembersByScreenId(2);
      console.log(res.data);
      if (res.code == 200) {
        this.members = res.data;
      }
    },
    async getNotices() {
      const { data: res } = await getNotices(2);
      if (res.code == 200) {
        this.notices = res.data;
      }
    },
    async getProjectDescs() {
      const { data: res } = await getProjectDescs();
      console.log(`打印project desc`, res);
      if (res.code == 200) {
        this.projectDescs = res.data;
      }
    },
    async getEols() {
      const { data: res } = await getEols();
      console.log(res);
      if (res.code == 200) {
        this.eols = res.data;
      }
    },
    async getOverstocks() {
      const { data: res } = await getOverstocks();
      console.log(res);
      if (res.code == 200) {
        this.overstocks = res.data;
      }
    },
    async getMonthOverstockType() {
      const { data: res } = await getMonthOverstockType();
      if (res.code == 200) {
        this.monthOverstockType = res.data;
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
  created() {},
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    const that = this;
    window.onresize = () => {
      return (() => {
        that.getHeight();
      })();
    };

    this.initWebSocket();

    this.getClocks();
    this.getMembers();
    this.getNotices();
    this.getProjectDescs();
    this.getEols();
    this.getMonthOverstockType();
    this.getOverstocks();
    this.getProductStages();

    setTimeout(() => {
      this.getHeight();
    }, 1000);
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

.el-col-lg-4-8 {
  width: 20%;
}

.el-col-lg-4-9 {
  width: 60%;
}

.el-col-lg-4-10 {
  width: 40%;
}

.el-col-lg-4-11 {
  width: 50%;
}

.el-col-lg-4-12 {
  width: 100%;
}

.MarketingScreen {
  width: 100%;
  height: 100vh;
  background: #17113c;
  color: #eee;
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

.clock-group {
  background-color: #272956;
  border-radius: 8px;
  margin: 0 0.4rem;
}

.separate {
  background: #17113c;
  min-height: 0.71rem;
}
</style>

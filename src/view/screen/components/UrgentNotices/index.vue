<!--  -->
<template>
  <div class="urgent-notice" :style="{ fontSize: rem }">
    <div class="third-item" :style="'height:' + boxHeight">
      <div class="item-title" id="ticket-title" style="margin-top: 10px">
        {{ noticeTitle }}
      </div>
      <el-carousel :interval="15000" :height="height" style="width: 100%">
        <el-carousel-item v-for="i in notices" :key="i.gmtCreate">
          <div class="notice-content">
            <div
              class="notice-left-item"
              v-if="i.memberId === 0 || i.memberId === null"
            >
              <el-avatar
                style="width: 6rem; height: 6rem"
                src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
                class="avatar"
              />
              <div class="name">{{ i.publisher }}</div>
            </div>
            <div class="notice-left-item" v-else>
              <el-avatar
                style="width: 6rem; height: 6rem"
                :src="base_api + i.avatar"
                class="avatar"
              />
              <div class="name">{{ i.memberName }}</div>
            </div>
            <div class="notice-right-item">
              <div class="notice-right-item-top">
                <div class="notice-title">{{ i.title }}</div>
                <div
                  class="notice-message"
                  style="word-break: keep-all"
                  :style="{ 'font-size': rem }"
                >
                  {{ i.message }}
                </div>
              </div>
              <div
                class="notice-right-item-bot"
                v-if="noticeTitle == 'Urgent Notices'"
              >
                Published on: {{ i.gmtCreate }}
              </div>
              <div class="notice-right-item-bot" v-else>
                Published on: {{ i.gmtCreate }}
              </div>
            </div>
          </div>
        </el-carousel-item>
      </el-carousel>
    </div>
  </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';
import { selectUnexpiredNotice } from "@/api/notices";

export default {
  // import引入的组件需要注入到对象中才能使用
  components: {},
  name: "index",
  props: {
    height: {
      type: String,
      // required: true,
      default: "200",
    },
    noticeTitle: {
      type: String,
      default: "",
    },
    weight: {
      type: String,
      // required: true
      default: "100px",
    },
    boxHeight: {
      type: String,
      // required: true,
      default: "300px",
    },
    screenId: {
      type: Number,
      default: 3,
    },
    rem: {
      type: String,
      default: "",
    },
    notices: {
      type: Array,
      default: function () {
        return [];
      },
    },
  },
  data() {
    // 这里存放数据
    return {
      data: [],
      base_api: process.env.VUE_APP_BASE_API,
    };
  },
  // 监听属性 类似于data概念
  computed: {},
  // 监控data中的数据变化
  watch: {
    rem: {
      handler: function () {
        document.documentElement.style.fontSize = this.rem;
        console.log(`urgent notice module change document rem` + this.rem);
      },
      immediate: true,
    },
  },
  // 方法集合
  methods: {
    async getNotices() {
      //getNotices
      const { data: res } = await selectUnexpiredNotice(this.screenId);
      if (res.code == 200) {
        this.data = res.data;
        //this.notice = res.data[0]
      }
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
    },
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    this.getHeight();
    this.getNotices();
  },
  beforeCreate() {}, // 生命周期 - 创建之前
  beforeMount() {}, // 生命周期 - 挂载之前
  beforeUpdate() {}, // 生命周期 - 更新之前
  updated() {}, // 生命周期 - 更新之后
  beforeDestroy() {}, // 生命周期 - 销毁之前
  destroyed() {}, // 生命周期 - 销毁完成
  activated() {}, // 如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style lang='scss' scoped>
//  @import url(); 引入公共css类
.third-item {
  flex: 1;
  background-color: #272956;
  // border-top-left-radius: 8px;
  // border-top-right-radius: 8px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;

  // border: 0.1rem solid #578AEF;

  ::v-deep .el-table .cell {
    padding-right: 0;
    padding-left: 0;
    text-align: center;
  }

  .notice-content {
    height: 100%;
    display: flex;
    color: #eee;
    padding: 0px 10px;

    .notice-left-item {
      flex: 2;
      display: flex;
      flex-direction: column;
      align-items: center;

      .avatar {
        margin: 0.8rem 0 0.6rem;
      }

      .name {
        font-size: 1rem;
      }
    }

    .notice-right-item {
      flex: 11;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 0.8rem 0.1rem 1rem 1.5rem;

      .notice-right-item-top {
        .notice-title {
          font-size: 1.2rem;
          font-weight: 600;
          margin-top: 0.2rem;
          word-wrap: break-word;
          overflow-wrap: break-word;
          margin-bottom: 20px;
        }

        .notice-message {
          // font-size: 1.1rem;
          font-weight: 700;
          margin: 0.7rem 0.8rem 0 0;
          word-break: break-all;
          text-align: justify;
          line-height: 1.4rem;
          text-justify: distribute-all-lines;
          display: block;
          text-decoration-line: underline;
          text-decoration-thickness: initial;
          text-decoration-style: dotted;
          text-decoration-color: #736969;
        }
      }

      .notice-right-item-bot {
        text-align: right;
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
    color: #eee;
  }
}
:deep(.el-carousel__indicators--horizontal) {
  display: none !important;
}
</style>

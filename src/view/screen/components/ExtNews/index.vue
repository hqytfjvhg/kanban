<!--  -->
<template>
  <div class="ExtNew">
    <div class="key-news">
      <div class="news-box">
        <div class="news-tip">Ext. News</div>
        <autoscroll :height="height" :speed="30">
          <div v-if="extNews.length === 0" style="padding:5rem;font-size: 3rem;">
            None Ext. News
          </div>
          <div v-for="item in extNews" :key="item.showId" class="news-content">
            <el-row class="news-item">
              <el-col :span="4" style="margin-right: 1rem;">
                <div class="news-publish-box" v-if="item.memberId === 0 || item.memberId === null">
                  <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
                    style="width: 5rem; height: 5rem"></el-avatar>
                  <div
                    style="font-size:1rem; margin-top:6px;color:rgba(255, 255, 255,0.8); word-break: break-all;font-weight: 600;">
                    {{
                      item.publisher }}</div>
                </div>
                <div class="news-publish-box" v-else>
                  <el-avatar :src="base_api + item.avatar" style="width: 5rem; height: 5rem"></el-avatar>
                  <div
                    style="font-size:1rem; margin-top:6px;color:rgba(255, 255, 255,0.8); word-break: break-all;font-weight: 600;">
                    {{
                      item.memberName }}</div>
                </div>
              </el-col>
              <el-col :span="20">
                <div
                  style="line-height: 1.5em; word-break: keep-all; text-align: justify; text-justify: distribute-all-lines;  font-size: 1.4rem;font-weight: 600;">
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
  </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';
import { selectUnexpiredShow } from '@/api/show';
import autoscroll from 'z-vue-autoscroll'
export default {
  // import引入的组件需要注入到对象中才能使用
  components: { autoscroll },
  name: 'ExtNews',
  props: {
    height: {
      type: String,
      //required: true,
      default: '15.5rem'
    },
    rem: {
      type: String,
      default: ''
    },
    extNews: {
      type: Array,
      default: function () {
        return []
      }
    }
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
        document.documentElement.style.fontSize = this.rem
        console.log(`CardComponent change document rem` + this.rem)
      },
      immediate: true
    },
  },
  // 方法集合
  methods: {
    async getShows() {
      const { data: res } = await selectUnexpiredShow()
      if (res.code == 200) {
        this.data = res.data
      }
    },
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created() {

  },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    this.getShows()
  },
  beforeCreate() { }, // 生命周期 - 创建之前
  beforeMount() { }, // 生命周期 - 挂载之前
  beforeUpdate() { }, // 生命周期 - 更新之前
  updated() { }, // 生命周期 - 更新之后
  beforeDestroy() { }, // 生命周期 - 销毁之前
  destroyed() { }, // 生命周期 - 销毁完成
  activated() { }, // 如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
<style lang='scss' scoped>
//  @import url(); 引入公共css类
.key-news {
  flex: 2;
  //padding: 0rem 0 0.3rem 0.8rem;

  .news-box {

    display: flex;
    flex-direction: column;
    background: #272956;
    border-radius: 8px;
    height: 100%;
    // padding: 0 12px 0;
    justify-content: space-evenly;

    // border: 0.15rem solid #578AEF;


    // border: 0.15rem solid transparent;
    // background-clip: padding-box, border-box;
    // background-origin: padding-box, border-box;
    // background-image: linear-gradient(to right, #272956, #272956), linear-gradient(90deg, #8F41E9, #578AEF);

    .news-tip {
      font-weight: bold;
      font-size: 1.4rem;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 2.5rem;
      color: #EEE;
      //border-bottom: 1px solid #cccccc50;
    }

    .news-content {
      padding: 1rem 0.5rem 1rem 0;
      border-bottom: solid rgba(255, 255, 255, 0.2) 0.5px;
      color: #EEE;

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
</style>

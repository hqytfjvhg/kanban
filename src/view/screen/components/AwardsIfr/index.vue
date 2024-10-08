<!--  -->
<template>
  <div class="AwardsIfr">
    <div class="award-news">
      <autoscroll v-if="awards.length!==0" :height="height" :speed="20" class="award-box">
        <div  v-for="item in awards" :key="item.id">
          <img :src="base_api + '/' + item.imageUrl" mode="widthFix" style="display:block; width: 100%;" />
        </div>
      </autoscroll>
      <div v-else style="padding: 5rem;font-size: 3rem;">NO DATA !</div>
    </div>
  </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';
import { selectAwardsStateIsTrue } from '@/api/awards';
import autoscroll from 'z-vue-autoscroll'
export default {
  // import引入的组件需要注入到对象中才能使用
  components: { autoscroll },
  name: 'index',
  props: {
    height: {
      type: String,
      //required: true,
      default: '15.5rem'
    },
    rem: {
      type: String,
      //required: true,
      default: ''
    },
    awards: {
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
        console.log(`AwardsIfr change document rem` + this.rem)
      },
      immediate: true
    },
  },
  // 方法集合
  methods: {
    async selectAwards() {
      const { data: res } = await selectAwardsStateIsTrue(1)
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
    this.selectAwards()
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
.award-news {
  flex: 2;

  //padding: 0.8rem 0 1rem 0.8rem;
  .award-box {

    // border: 0.3rem solid transparent;
    // background-clip: padding-box, border-box;
    // background-origin: padding-box, border-box;
    // background-image: linear-gradient(to right, #272956, #272956), linear-gradient(90deg, #8F41E9, #578AEF);
    border-radius: 3px;
    //border: 0.15rem solid #9348e9;


  }
}
</style>

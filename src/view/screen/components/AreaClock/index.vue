<!--  -->
<template>
  <div class="area-clock">
    <div class="first-group" id="first-group">
      <div class="time-box" v-for="(item,index) in data" :key="item.clockId">
        <!-- 时间 -->
        <div class="clock-group" id="clock-group">
          <CrayonClock :timeZone="Number(item.clockTimezone)" :country="item.clockArea" :timeFormat="item.timeFormat" />
        </div>
        <div class="separate" id="separate"></div>
        <CardComponent :members="item.members"></CardComponent>
      </div>

    </div>
  </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';

import CrayonClock from '@/components/crayonClock/index.vue'
import CardComponent from '@/view/screen/components/AreaClock/card.vue'
//import { vueClock } from 'vue-clock-lonlyape'
import { getScreen } from '@/api/screen';
export default {
  // import引入的组件需要注入到对象中才能使用
  components: { CrayonClock,CardComponent },
  name: 'area-clock',
  props: {
    screenId: {
      type: Number,
      //required: true,
      default: 1
    },
    width: {
      type: String,
      //required:true,
      //default:''
    },
    height: {
      type: Number,
      //required:true,
      default: 100
    }
  },
  data() {
    // 这里存放数据
    return {
      data: []
    };
  },
  // 监听属性 类似于data概念
  computed: {},
  // 监控data中的数据变化
  watch: {},
  // 方法集合
  methods: {
    async getScreen() {
      var that = this
      const { data: res } = await getScreen(this.screenId)
      if (res.code == 200) {
        this.screen = res.data
        that.data = []
        //that.colClockList = []
        for (let a = 0; a < 6; a++) {
          //a < 6 ? that.rowClockList.push(that.screen.clocks[a]) : that.colClockList.push(that.screen.clocks[a])
          if (a == 4)
            continue
          a < 6 ? that.data.push(that.screen.clocks[a]) : that.data.push(that.screen.clocks[a])

        }
      }
    }

  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created() {

  },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    this.getScreen()

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
.el-col-lg-4-8 {
    width: 20%;
}

.flex-center {
  display: flex;
  align-items: center;
  justify-content: center;
}

.area-clock {
  .title {
    font-weight: bold;
    height: 7%;
    text-align: center;
    font-size: 2.2rem;
    font-family: Arial;
  }

  .first-group {
    display: flex;
    justify-content: space-around;
    padding: 0 0.5rem;
    height: 35%;

    .time-box {
      flex: 1;
      display: flex;
      flex-direction: column;

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
            width: 100%;

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
              margin-top: 0.2rem;
              font-size: 0.9rem;
            }

            .duty {
              font-size: 1.2rem;
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
}
</style>

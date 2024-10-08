<!-- 公司大屏中的两个日历组件 -->
<template>
  <div class="calendar" :style="{ height: height }">
    <!-- #409EFF -->
    <div class="calendar-tip" style="color: #eee">Holidays</div>
    <div class="calendar-content">
      <vc-calendar
        class="vc-calendar"
        color="blue"
        :style="cssVars"
        style="margin-right: 0.5rem"
        :pane="1"
        :attributes="holidays"
        :is-dark="true"
        locale="en"
      />
      <!-- <div style="margin:2rem"></div> -->
      <vc-calendar
        ref="calendar"
        :style="cssVars"
        class="vc-calendar"
        color="blue"
        :pane="2"
        :attributes="holidays"
        style="margin-top: 1rem"
        :is-dark="true"
        locale="en"
        :step="2"
      />
    </div>
    <div
      style="
        display: flex;
        align-items: center;
        justify-content: center;
        height: 3rem;
        font-family: Arial;
        padding-bottom: 0.6rem;
      "
    >
      <!-- style="
          background: rgb(83, 83, 83);
          width: 0.8rem;
          height: 0.8rem;
          margin-right: 0.5rem;
        "  -->
      <div class="work-style"></div>
      <div style="color: #ea4335; margin-right: 1rem">CN working day</div>
      <div class="holiday-tip" style="background: #f2ff00"></div>
      <div style="color: #f2ff00; margin-right: 1rem">CN</div>
      <div class="holiday-tip" style="background: #4285f4"></div>
      <div style="color: #4285f4; margin-right: 1rem">UK</div>
      <div class="holiday-tip" style="background: #b5b5b5"></div>
      <div style="color: #b5b5b5; margin-right: 1rem">US</div>
      <!-- <div class="holiday-tip" style="background: #ecc94b;"></div>
      <div style="color: #ecc94b; margin-right: 1rem;">Poland</div> -->
      <div class="holiday-tip" style="background: #34a853"></div>
      <div style="color: #34a853">Today</div>
    </div>
  </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';
export default {
  // import引入的组件需要注入到对象中才能使用
  components: {},
  name: "NationalHoliday",
  props: {
    rem: {
      type: String,
      //required: true,
      default: "",
    },
    holidays: {
      type: Array,
      default: function () {
        return [];
      },
    },
    height: {
      type: String,
      default: "100%",
    },
    contentHeight: {
      type: String,
      default: "30px",
    },
  },
  data() {
    // 这里存放数据
    return {
      testData: [
        {
          key: "today",
          dates: new Date(),
          highlight: {
            color: "red",
          },
        },
        {
          dot: { style: { backgroundColor: "#48bb78" } },
          dates: [
            new Date(2024, 8, 1),
            new Date(2024, 8, 2),
            new Date(2024, 8, 3),
            new Date(2024, 8, 4),
          ],
        },
      ],
    };
  },
  // 监听属性 类似于data概念
  computed: {
    cssVars() {
      return {
        "--contentHeight": this.contentHeight,
      };
    },
  },
  // 监控data中的数据变化
  watch: {
    rem: {
      handler: function () {
        document.documentElement.style.fontSize = this.rem;
        // console.log(`holiday change document rem` + this.rem);
      },
      immediate: true,
    },
  },
  // 方法集合
  methods: {
    //判断中国工作日就变为三角形
    checkAndConvertDotsToTriangles() {
      if (this.holidays) {
        const dots = document.querySelectorAll(".vc-dot");

        dots.forEach((dot) => {
          const computedStyle = window.getComputedStyle(dot);
          const bgColor = computedStyle.getPropertyValue("background-color");

          if (bgColor === "rgb(83, 83, 83)") {
            dot.classList.add("triangle-dot");
            dot.style.backgroundColor = "transparent";
            // dot.classList.remove("vc-dot");
          } else {
            dot.classList.remove("triangle-dot"); // 可选，如果需要移除其他颜色的三角形样式
          }
        });
      }
    },
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  // 生命周期 - 挂载完成（可以访问DOM元素）
  async mounted() {
    // this.getAreaVocations()
    const calendar = this.$refs.calendar;
    await calendar.move(1);
    // console.log(this.holidays, "数据");
    // this.$nextTick(() => {
    //   setTimeout(() => {
    //     this.checkAndConvertDotsToTriangles();
    //   }, 200);
    // });

    // //每60秒更新一次时间，更新当前日期
    // this.timer = setInterval(() => {
    //   this.getAreaVocations()
    //   }, 60000)
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
<style lang="scss" scoped>
//  @import url(); 引入公共css类
.holiday-tip {
  width: 0.8rem;
  height: 0.8rem;
  // border-radius: 0.5rem;
  margin-right: 0.5rem;
}

.work-style {
  width: 0.8rem;
  height: 0.8rem;
  margin-right: 0.5rem;
  background: #ea4335;
}
// .work-style::after {
//   content: "";
//   position: absolute;
//   // top: -75%;
//   // left: -25%;
//   transform: translate(-20%, -43%);
//   width: 0;
//   height: 0;
//   border-top: 0.6rem solid transparent;
//   border-bottom: 0.6rem solid rgb(83, 83, 83);
//   border-left: 0.6rem solid transparent;
//   border-right: 0.6rem solid transparent;
// }
// ::v-deep .triangle-dot::before,
// .triangle-dot::after {
//   content: "";
//   position: absolute;
//   top: -69%;
//   // left: -25%;
//   transform: translate(-15%, -17%);
//   width: 0;
//   height: 0;
//   border-top: 0.4rem solid transparent !important;
//   border-bottom: 0.4rem solid rgb(83, 83, 83) !important;
//   border-left: 0.4rem solid transparent !important;
//   border-right: 0.4rem solid transparent !important;
//   // z-index: 99;
//   // display: block !important;
// }
::v-deep .vc-container {
  box-sizing: none !important;
}
::v-deep.vc-calendar {
  width: 100%;
  padding-bottom: 1rem;
  overflow: hidden;

  .vc-dot {
    width: 0.4rem;
    height: 0.4rem;
  }
  //TODO
  // .triangle-dot::after {
  //   content: "";
  //   position: absolute;
  //   // border-style: solid;
  //   // border-width: 5px 5px 0 5px;
  //   // border-color: #535353 transparent transparent; /* 使用与背景颜色相同的颜色 */
  //   top: -69%;
  //   // left: -25%;
  //   transform: translate(-15%, -13%);
  //   width: 0;
  //   height: 0;
  //   border-top: 0.4rem solid transparent;
  //   border-bottom: 0.4rem solid rgb(83, 83, 83);
  //   border-left: 0.4rem solid transparent;
  //   border-right: 0.4rem solid transparent;
  //   // transform-origin: left bottom;
  //   // transform: rotate(45deg);
  // }
  .vc-arrow {
    display: none !important;
  }

  .vc-dots {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 1.7rem;
    width: auto;
    .vc-dot {
      border-radius: 0 !important;
    }
  }
  .vc-weeks {
    padding: 0.1rem;
    .vc-day {
      // padding-top: 0.5rem !important;
    }
  }

  .vc-pane-container {
    display: flex;

    .vc-pane-layout {
      width: 100%;

      .vc-pane {
        min-width: 0px;
        height: 100%;
        padding-bottom: 1rem;
      }
    }
  }

  //当前日期样式 todo
  .vc-highlight {
    min-width: 1.4rem !important; //var(--contentHeight)
    min-height: 1.4rem !important; //var(--contentHeight)
    margin-left: 1px;
    // margin-top: 1px;
  }

  .vc-header {
    padding-bottom: 0.8rem;
  }

  // 日期表格
  .vc-weeks {
    min-width: 0;
    height: 100%;

    /* 星期标识 */
    .vc-weekday {
      padding: 0;
      font-size: 1rem;
      display: flex;
      justify-content: center;
      align-items: center;
      line-height: 24px !important;
    }

    .vc-day {
      min-height: 0;
      padding: 0;
      margin: 0;

      .vc-day-content {
        line-height: 0;
        width: 2rem;
        font-size: 1rem;
        height: var(--contentHeight);
        // margin-bottom: 0.5rem;
      }
    }
  }
}
::v-deep .vc-highlight {
  width: 0;
  height: 0;
}
.calendar {
  display: flex;
  flex-direction: column;
  background: #181a45;
  border-radius: 8px;
  padding: 0 0.8rem 0;
  //border:0.1rem solid;
  // border: 0.15rem solid #578AEF;

  .calendar-tip {
    //color:'#fff';
    font-weight: bold;
    font-size: 1.4rem;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 4rem;
  }
}

// }
</style>

<!-- 2023-12-23 新增特殊项目表格，当前页面目前还是固定静态数据没有接入后台，用于 marketing 大屏页面使用  -->
<template>
  <div class="ProductStage">
    <div class="ticket-box" id="ticket-box" :style="'height:' + height">
      <div class="ticket-title" id="ticket-title">Special Projects</div>
      <el-table
        class="table-style"
        :data="stages"
        height="100"
        size="mini"
        ref="stage"
        :cell-style="cellStyle"
        :header-cell-style="headerCellStyle"
        :header-row-style="headerRowStyle"
        :empty-text="emptyText"
      >
        <el-table-column
          align="center"
          label="Product"
          prop="name"
          width="300px"
        />
        <el-table-column
          align="center"
          label="Date"
          prop="productDate"
          width="160px"
        >
          <template slot-scope="scope">
            {{ formatDate(scope.row.productDate) }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="Content" prop="content" />
      </el-table>
    </div>
  </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';
// import { formatDate } from "@/utils/timeConvert";
export default {
  // import引入的组件需要注入到对象中才能使用
  components: {},
  name: "SpecialProjects",
  props: {
    height: {
      type: String,
      default: "339px",
    },
    rem: {
      type: String,
      default: "",
    },
    stages: {
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
      ticketTableCellHeight: "",
      emptyText: "No Data",
    };
  },
  // 监听属性 类似于data概念
  computed: {},
  // 监控data中的数据变化
  watch: {
    rem: {
      handler: function () {
        document.documentElement.style.fontSize = this.rem;
        console.log(`CardComponent change document rem` + this.rem);
      },
      immediate: true,
    },
  },
  // 方法集合
  methods: {
    // 时间格式转换
    formatDate(data) {
      let date = new Date(data);
      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();
      // 根据需要的格式进行调整，例如：'dd/MM/yyyy'
      return `${day.toString().padStart(2, "0")}/${month
        .toString()
        .padStart(2, "0")}/${year}`;
    },
    cellStyle({ rowIndex, columnIndex }) {
      this.ticketTableCellHeight = Math.ceil(
        (this.height - 5 - 3.8 * this.rem) / 6
      );
      //this.ticketTableHeadHeight = Math.ceil(this.height - (3.8 * this.rem) - (this.ticketTableCellHeight * 5))
      //this.ticketTableHeight = Math.ceil(this.ticketTableHeadHeight * 5)
      if (rowIndex % 2 == 0 && columnIndex == 0) {
        return (
          "background: #15184d; border: none; border-right: 1px solid #252963; padding: 0;font-weight: 600; height: " +
          this.ticketTableCellHeight +
          "px"
        );
      } else if (rowIndex % 2 == 0 && columnIndex == 2) {
        return (
          "font-size: 0.9rem; background: #15184d; border: none; border-right: 1px solid #dddddd88; padding: 0;font-weight: 600; height: " +
          this.ticketTableCellHeight +
          "px"
        );
      } else if (rowIndex % 2 == 0 && columnIndex == 4) {
        return (
          "font-size: 0.9rem; background: #15184d; border: none; padding: 0;font-weight: 600; height: " +
          this.ticketTableCellHeight +
          "px"
        );
      } else if (rowIndex % 2 == 0) {
        return (
          "font-size: 0.9rem; background: #15184d; border: none; border-right: 1px solid #252963; padding: 0; font-weight: 600;height: " +
          this.ticketTableCellHeight +
          "px"
        );
      } else if (rowIndex % 2 == 1 && columnIndex == 0) {
        return (
          "background: #252963; border: none; border-right: 1px solid #171717; padding: 0;font-weight: 600; height: " +
          this.ticketTableCellHeight +
          "px"
        );
      } else if (rowIndex % 2 == 1 && columnIndex == 2) {
        return (
          "font-size: 0.9rem; background: #252963; border: none; border-right: 1px solid #171717; padding: 0; font-weight: 600;height: " +
          this.ticketTableCellHeight +
          "px"
        );
      } else if (rowIndex % 2 == 1 && columnIndex == 4) {
        return (
          "font-size: 0.9rem; background: #252963; border: none; padding: 0;font-weight: 600; height: " +
          this.ticketTableCellHeight +
          "px"
        );
      } else {
        return (
          "font-size: 0.9rem; background: #252963; border: none; border-right: 1px solid #15184d; padding: 0;font-weight: 600; height: " +
          this.ticketTableCellHeight +
          "px"
        );
      }
    },
    headerCellStyle({ columnIndex }) {
      if (columnIndex == 2) {
        return (
          "font-weight: 600;background: #0f0938; white-space:nowrap; border: none; border-right: 1px solid #555; padding: 0; height:" +
          this.ticketTableCellHeight +
          "px; color: white;"
        );
      } else if (columnIndex == 4) {
        return (
          "font-weight: 600;background: #0f0938; white-space:nowrap; border: none; padding: 0; height:" +
          this.ticketTableCellHeight +
          "px; color: white;"
        );
      } else {
        return (
          "font-weight: 600;background: #0f0938; white-space:nowrap; border: none; border-right: 1px solid #333; padding: 0; height:" +
          this.ticketTableCellHeight +
          "px; color: white;"
        );
      }
    },
    headerRowStyle() {
      return "height: 2.5rem;";
    },
    tableScroll(table, speed) {
      // 拿到表格挂载后的真实DOM
      const divData = table.bodyWrapper;
      setInterval(() => {
        if (divData.scrollHeight - divData.clientHeight > 10) {
          if (
            divData.clientHeight + divData.scrollTop <
            divData.scrollHeight - 1
          ) {
            divData.scrollTop += 1; // 元素自增距离顶部1像素
            // console.log(`scrollHeight`, divData.scrollHeight)
            // console.log('clientHeight', divData.clientHeight)
            // console.log('scrollTop', divData.scrollTop)
            if (
              divData.clientHeight + divData.scrollTop >=
              divData.scrollHeight - 1
            ) {
              setTimeout(() => {
                divData.scrollTop = 0; // 重置table距离顶部距离
              }, 2000);
            }
          }
        }
      }, speed);
    },
    formatTime(row, column) {
      //const week = ["Sun.", "Mon.", "Tues.", "Wed.", "Thur.", "Fri.", "Sat."];
      const months = [
        "Jan.",
        "Feb.",
        "Mar.",
        "Apr.",
        "May.",
        "Jun.",
        "Jul.",
        "Aug.",
        "Sept.",
        "Oct.",
        "Nov.",
        "Dec.",
      ];
      if (column.label === "Date") {
        if (row.date === null) return "/";
        const t1 = new Date(row.date);
        const date1 = t1.getDate().toString();
        const month1 = t1.getMonth();
        const year1 = t1.getFullYear() - 2000;
        return date1 + "-" + months[month1] + "-" + year1;
      } else return "format";
    },
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  // 生命周期 - 挂载完成（可以访问DOM元素）
  async mounted() {
    const stage = this.$refs.stage;
    await this.tableScroll(stage, 50);
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
@import "@/style/ScreenTableCss.scss";

.ticket-box {
  // border: 0.1rem solid #578AEF;
}

.flex-center {
  display: flex;
  align-items: center;
  justify-content: center;
}

.el-table,
.el-table__expanded-cell {
  background-color: transparent;
}

::v-deep.el-carousel {
  display: flex;
}

::v-deep.el-carousel__container {
  width: 100%;
  height: 22vh;
}

.ticket-box {
  //flex: 1;
  display: flex;
  overflow: hidden;
  flex-direction: column;
  align-items: center;
  background-color: #272956;
  border-radius: 8px;
  height: 320px;

  ::v-deep .el-table .cell {
    line-height: 1.8rem;
    padding: 0.5rem 0.5rem;
    text-align: center;
  }

  .table-style {
    color: #ffffffdd;
    background-color: transparent;
    font-size: 1rem;
  }

  .ticket-title {
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

::v-deep .el-table tr {
  background-color: transparent;
}

//重写el-table样式，背景透明度
.unsolved-ticket,
.stage,
.product-return,
.product-ticket {
  background-color: rgba($color: #ddd, $alpha: 0.05);
  background-color: #272956;
  border-radius: 10px;

  ::v-deep .el-table,
  .el-table_expanded-cell {
    background-color: transparent;
  }

  ::v-deep .el-table th {
    background-color: transparent !important;
  }

  ::v-deep .el-table tr {
    background-color: transparent !important;
  }

  ::v-deep .el-table--enable-row-transition .el-table_body td,
  .el-table .cell {
    background-color: transparent;
  }
}

.el-table::before {
  left: 0;
  bottom: 0;
  width: 100%;
  height: 0px;
}

//el-table 隐藏滚动条
.stage,
.unsolved-ticket,
.product-return,
.product-ticket {
  ::v-deep .is-scrolling-none {
    overflow: hidden;
    overflow-y: auto;
    overflow-x: scroll;
  }

  ::v-deep .is-scrolling-none::-webkit-scrollbar {
    display: none;
  }

  ::v-deep .el-table--scrollable-y ::-webkit-scrollbar {
    display: none;
  }

  ::v-deep .el-table--scrollable-x ::-webkit-scrollbar {
    display: none;
  }
}

//去除表格线
.stage ::v-deep .el-table__row > td {
  /* 去除表格线 */
  border: none;
}

.product-return ::v-deep .el-table__row > td {
  /* 去除表格线 */
  border: none;
}

.unsolved-ticket ::v-deep .el-table__row > td {
  /* 去除表格线 */
  border: none;
}

.product-ticket ::v-deep .el-table__row > td {
  /* 去除表格线 */
  border: none;
}

.stage ::v-deep .el-table th.is-leaf {
  /* 去除上边框 */
  border: none;
}

.product-return ::v-deep .el-table th {
  /* 去除上边框 */
  border: none;
}

.unsolved-ticket ::v-deep .el-table th {
  /* 去除上边框 */
  border: none;
}

.product-ticket ::v-deep .el-table th {
  /* 去除上边框 */
  border: none;
}

.stage ::v-deep .el-table::before {
  /* 去除下边框 */
  height: 0;
}

.product-ticket ::v-deep .el-table::before {
  /* 去除下边框 */
  height: 0;
}

.unsolved-ticket ::v-deep .el-table::before {
  /* 去除下边框 */
  height: 0;
}

.product-return ::v-deep .el-table::before {
  /* 去除下边框 */
  height: 0;
}

.el-table--border,
.el-table--group {
  /*去除多级表头，左上边框 */
  border: none;
}

.el-table--border::after,
.el-table--group::after {
  top: 0;
  right: 0;
  width: 0px;
  height: 100%;
}

//表格斜线样式
.left {
  text-align: left;
  position: relative;
  padding-left: 10px;
}

.left::after {
  content: "";
  width: 100%;
  height: 0px;
  position: absolute;
  top: 0;
  left: 0;
}

.right {
  text-align: right;
  padding-right: 10px;
}

.demo-table-expand {
  font-size: 0;
  //margin: 10px 60px
}

.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}

.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}

::v-deep .table-style .el-table__empty-block {
  display: none !important;
}
</style>

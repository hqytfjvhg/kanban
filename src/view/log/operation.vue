<!--
* @description  参数1
* @fileName  operation
* @author Arvin
* @date 2022-11-18 09:47:15
* @version V1.0.0
!-->

<template>
  <div id="operation" class="operation-container">
    <div class="list" style="background: #fff; margin: 20px">
      <div class="table">
        <vxe-table
          :data="pageVo.data"
          border
          size="mini"
          align="center"
          max-height="650"
          class="mytable-scrollbar"
          :column-config="{ resizable: true }"
        >
          <vxe-column field="operatorId" title="用户ID" width="240px" />
          <vxe-column field="operator" title="用户名" width="240px" />
          <vxe-column field="model" title="模块" />
          <vxe-column field="type" title="类型" />
          <vxe-column
            field="description"
            title="描述"
            show-header-overflow
            show-overflow="title"
            show-footer-overflow
          />
          <vxe-column
            field="result"
            title="结果"
            show-header-overflow
            show-overflow="title"
            show-footer-overflow
          />
          <vxe-column field="operationTime" title="操作时间" />
        </vxe-table>
      </div>
      <div class="block" style="display: flex; justify-content: flex-end">
        <el-pagination
          background
          layout="total, sizes, prev, pager, next, jumper"
          :current-page.sync="pageVo.pageNum"
          @size-change="handleSizeChange"
          :total="pageVo.total"
          style="padding: 15px"
          :page-size="pageVo.pageSize"
          @current-change="handleCurrentChange"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import { queryAndPage } from "@/api/log";
export default {
  name: "style-operation",
  data() {
    return {
      page: {
        pageSize: 10,
        pageNum: 1,
        total: 1000,
        queryCondition: {},
      },
      pageVo: {
        pageSize: 10,
        pageNum: 1,
        total: 1000,
        data: [],
      },
    };
  },
  created() {
    // 实例被创建之后执行代码
  },
  computed: {
    // 计算属性
  },
  components: {
    // 组件的引用
  },
  methods: {
    // 方法
    async getPageVo() {
      const { data: res } = await queryAndPage(this.page);
      if (res.code == 200) {
        this.pageVo = res.data;
      }
    },
    handleCurrentChange(val) {
      this.page.pageNum = val;
      this.getPageVo();
    },
    handleSizeChange(val) {
      this.page.pageSize = val;
      this.getPageVo();
    },
  },
  mounted() {
    // 页面进入时加载内容
    this.getPageVo();
  },
  watch: {
    // 监测变化
  },
};
</script>
<style lang='scss' scoped>
/*滚动条整体部分*/
</style>
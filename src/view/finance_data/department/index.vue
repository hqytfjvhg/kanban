<!-- 这个是原部门财务管理页面，因为修改Excel协同编辑改动比较大，所以备份一份原始数据  -->
<template>
  <div class="department-container">
    <pageHeader
      title="部门财务管理"
      describe="这个模块管理公司各部门财务情况，包括部门费用预算和部门费用月度趋势，仅支持以下两个表格的excel导入。点击以下按钮查看看板效果。"
    ></pageHeader>
    <div class="new-create" style="margin-left: 1rem">
      <!-- <router-link target="_blank" :to="{ path: '/info_screen/screen/finance/cost' }"> -->
      <el-button
        size="mini"
        @click="toPath('/info_screen/fdata/screen/cost')"
        type="success"
        plain
        >查看看板</el-button
      >
      <!-- </router-link> -->
      <el-link
        @click="copyUrl()"
        type="warning"
        size="mini"
        style="margin-left: 10px"
        >复制看板地址</el-link
      >
    </div>
    <el-divider></el-divider>
    <div class="first-row">
      <div
        class=""
        style="font-size: 20px; border-bottom: 1px solid #e6ebf5; padding: 1rem"
      >
        部门费用预算汇总
      </div>
      <div class="new-create" style="padding: 1rem">
        <el-upload
          :action="base_api + '/info_screen/fdDeptAll/excel/handler'"
          multiple
          :limit="1"
          :on-success="handleSuccess1"
          :headers="headers"
          :before-upload="beforeUpload1"
        >
          <el-button size="mini" type="primary"
            ><i class="el-icon-upload2"></i>Excel上传</el-button
          >
        </el-upload>
        <!-- <a
          :href="base_api + '/' + 'template/Department_Expense_Budget.xlsx'"
          style="margin: 0.3rem 0.8rem"
          >{{ $t(`excelTemplate.downloadTemplate`) }}</a
        > -->
        <el-button type="primary" size="mini" style="margin-left: 15px">
          <i class="el-icon-download"></i>
          <a
            :href="base_api + '/' + 'template/Department_Expense_Budget.xlsx'"
            style="margin: 0.3rem 0.5rem 0.3rem 0; color: #fff"
            >{{ $t(`excelTemplate.downloadTemplate`) }}</a
          >
        </el-button>
      </div>
      <div style="padding: 0 1rem 1rem 1rem">
        <el-table class="table1" :data="listDeptAll"  stripe>
          <el-table-column type="index" width="50" label="序号" />
          <el-table-column align="center" label="部门/Department" prop="name">
            <template slot-scope="scope">
              {{ scope.row.name }}/{{ scope.row.enName }}
            </template>
          </el-table-column>
          <el-table-column align="center" label="费用/Expense" prop="cost">
          </el-table-column>
          <el-table-column align="center" label="目标/Forecast" prop="budget">
          </el-table-column>
          <el-table-column align="center" label="差异率/Difference" prop="rate">
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div class="second-row" >
      <div   style="font-size: 20px; border-bottom: 1px solid #e6ebf5; padding: 1rem">
        部门费用月度趋势
      </div>
      <div class="new-create" style="padding: 1rem">
        <el-upload
          :action="base_api + '/info_screen/fdDeptMonth/excel/handler'"
          multiple
          :limit="1"
          :on-success="handleSuccess2"
          :headers="headers"
          :before-upload="beforeUpload2"
        >
          <el-button size="mini" type="primary"><i class="el-icon-upload2"></i>Excel上传</el-button>
        </el-upload>
        <!-- <a
          :href="base_api + '/' + 'template/Monthly_Department_Expense.xlsx'"
          style="margin: 0.3rem 0.8rem"
          >{{ $t(`excelTemplate.downloadTemplate`) }}</a
        > -->
        <el-button type="primary" size="mini" style="margin-left: 15px">
          <i class="el-icon-download"></i>
          <a
            :href="base_api + '/' + 'template/Monthly_Department_Expense.xlsx'"
            style="margin: 0.3rem 0.5rem 0.3rem 0; color: #fff"
            >{{ $t(`excelTemplate.downloadTemplate`) }}</a
          >
        </el-button>
      </div>
      <div style="padding: 0 1rem 1rem 1rem">
      <el-table class="table2" :data="listDeptMonth"  stripe>
        <el-table-column align="center" label="费用/Expense" prop="name">
          <template slot-scope="scope">
            {{ scope.row.name }}/{{ scope.row.enName }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="Jan." prop="value1">
        </el-table-column>
        <el-table-column align="center" label="Feb." prop="value2">
        </el-table-column>
        <el-table-column align="center" label="Mar." prop="value3">
        </el-table-column>
        <el-table-column align="center" label="Apr." prop="value4">
        </el-table-column>
        <el-table-column align="center" label="May." prop="value5">
        </el-table-column>
        <el-table-column align="center" label="Jun." prop="value6">
        </el-table-column>
        <el-table-column align="center" label="Jul." prop="value7">
        </el-table-column>
        <el-table-column align="center" label="Aug." prop="value8">
        </el-table-column>
        <el-table-column align="center" label="Sep." prop="value9">
        </el-table-column>
        <el-table-column align="center" label="Oct." prop="value10">
        </el-table-column>
        <el-table-column align="center" label="Nov." prop="value11">
        </el-table-column>
        <el-table-column align="center" label="Dec." prop="value12">
        </el-table-column>
      </el-table>
    </div>
    </div>

    <el-dialog :title="dialog1.title" :visible.sync="dialog1.visible">
      <el-table class="table1" :data="deptAll" border stripe>
        <el-table-column type="index" width="50" label="序号/Index" />
        <el-table-column align="center" label="部门/Department" prop="name">
          <template slot-scope="scope">
            {{ scope.row.name }}/{{ scope.row.enName }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="费用/Expense" prop="cost">
        </el-table-column>
        <el-table-column align="center" label="目标/Forecast" prop="budget">
        </el-table-column>
        <el-table-column align="center" label="差异率/Difference" prop="rate">
        </el-table-column>
      </el-table>
      <el-button
        type="primary"
        style="display: block; margin: 10px auto"
        @click="submitDeptAll"
        >保存</el-button
      >
    </el-dialog>

    <el-dialog :title="dialog2.title" :visible.sync="dialog2.visible">
      <el-table class="table2" :data="deptMonth" border stripe>
        <el-table-column align="center" label="费用/Expense" prop="name">
          <template slot-scope="scope">
            {{ scope.row.name }}/{{ scope.row.enName }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="Jan." prop="value1">
        </el-table-column>
        <el-table-column align="center" label="Feb." prop="value2">
        </el-table-column>
        <el-table-column align="center" label="Mar." prop="value3">
        </el-table-column>
        <el-table-column align="center" label="Apr." prop="value4">
        </el-table-column>
        <el-table-column align="center" label="May." prop="value5">
        </el-table-column>
        <el-table-column align="center" label="Jun." prop="value6">
        </el-table-column>
        <el-table-column align="center" label="Jul." prop="value7">
        </el-table-column>
        <el-table-column align="center" label="Aug." prop="value8">
        </el-table-column>
        <el-table-column align="center" label="Sep." prop="value9">
        </el-table-column>
        <el-table-column align="center" label="Oct." prop="value10">
        </el-table-column>
        <el-table-column align="center" label="Nov." prop="value11">
        </el-table-column>
        <el-table-column align="center" label="Dec." prop="value12">
        </el-table-column>
      </el-table>
      <el-button
        type="primary"
        style="display: block; margin: 10px auto"
        @click="submitDeptMonth"
        >保存</el-button
      >
    </el-dialog>
  </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';
import pageHeader from "@/components/pageHeader/index.vue";
import store from "@/store";
import {
  saveBatchDeptAll,
  listDeptAll,
  saveBatchDeptMonth,
  listDeptMonth,
} from "@/api/finance";
export default {
  // import引入的组件需要注入到对象中才能使用
  components: {
    pageHeader,
  },
  name: "department-data",
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
      base_api: process.env.VUE_APP_BASE_API,
      headers: {
        token: store.getters.token,
      },
      deptAll: [],
      deptMonth: [],
      listDeptAll: [],
      listDeptMonth: [],
      dialog1: {
        title: "部门费用总表",
        visible: false,
      },
      dialog2: {
        title: "部门费用月趋势表",
        visible: false,
      },
    };
  },
  // 监听属性 类似于data概念
  computed: {},
  // 监控data中的数据变化
  watch: {},
  // 方法集合
  methods: {
    toPath(path) {
      if (path == "——") return;
      this.$router.push({ path: path });
    },
    handleSuccess1(res) {
      if (res.code == 200) {
        console.log(res.data);
        this.deptAll = res.data;
        this.dialog1.visible = true;
      }
    },
    handleSuccess2(res) {
      if (res.code == 200) {
        console.log(res.data);
        this.deptMonth = res.data;
        this.dialog2.visible = true;
      }
    },
    /**
     * 精度格式化
     * @param {*} row
     * @param {*} column
     * @param {*} cellValue
     */
    formatRate(row, column, cellValue) {
      return (cellValue * 100).toFixed(0) + "%";
    },
    async submitDeptAll() {
      const { data: res } = await saveBatchDeptAll(this.deptAll);
      if (res.code == 200) {
        this.dialog1.visible = false;
        this.getListDeptAll();
      }
    },
    async getListDeptAll() {
      const { data: res } = await listDeptAll();
      console.log(res.data);
      if (res.code == 200) {
        this.listDeptAll = res.data;
      }
    },
    async submitDeptMonth() {
      const { data: res } = await saveBatchDeptMonth(this.deptMonth);
      if (res.code == 200) {
        this.dialog2.visible = false;
        this.getListDeptMonth();
      }
    },
    async getListDeptMonth() {
      const { data: res } = await listDeptMonth();
      console.log(res.data);
      if (res.code == 200) {
        this.listDeptMonth = res.data;
      }
    },
    copyUrl() {
      var url = window.location.host + "/#/info_screen/screen/finance/cost";

      var cInput = document.createElement("input");
      cInput.value = url;
      document.body.appendChild(cInput);
      cInput.select(); // 选取文本框内容

      // 执行浏览器复制命令
      // 复制命令会将当前选中的内容复制到剪切板中（这里就是创建的input标签）
      // Input要在正常的编辑状态下原生复制方法才会生效

      document.execCommand("copy");

      this.$message({
        type: "success",
        message: "看板地址复制成功",
      });
      // 复制成功后再将构造的标签 移除
      document.body.removeChild(cInput);
    },
    beforeUpload1(file) {
      console.log(file.name);
      const fileName = file.name;
      const rightFilename = "Department_Expense_Budget.xlsx";
      if (fileName !== rightFilename) {
        this.$confirm(
          "请上传Department_Expense_Budget.xlsx",
          this.$t(`eol.tips`),
          {
            confirmButtonText: this.$t(`eol.confirm`),
            cancelButtonText: this.$t(`eol.cancel`),
            type: "warning",
          }
        );
        return false;
      }
    },
    beforeUpload2(file) {
      console.log(file.name);
      const fileName = file.name;
      const rightFilename = "Monthly_Department_Expense.xlsx";
      if (fileName !== rightFilename) {
        this.$confirm(
          "请上传Monthly_Department_Expense.xlsx",
          this.$t(`eol.tips`),
          {
            confirmButtonText: this.$t(`eol.confirm`),
            cancelButtonText: this.$t(`eol.cancel`),
            type: "warning",
          }
        );
        return false;
      }
    },
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    this.getListDeptAll();
    this.getListDeptMonth();
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
.department-container {
  padding: 0 0.6rem 1rem 0.6rem;
  height: 100%;

  .new-create {
    display: flex;
    // padding-bottom: 20px;
  }
}

.first-row {
  // height: 65%;
  // border: 1px solid;
  border-radius: 4px;
  border: 1px solid #e6ebf5;
  // padding: 1rem;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

.second-row {
  // height: 35%;
  // margin: 30px 0;
  // // border: 1px solid;
  border-radius: 4px;
  border: 1px solid #e6ebf5;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  margin-top: 20px;
}
</style>
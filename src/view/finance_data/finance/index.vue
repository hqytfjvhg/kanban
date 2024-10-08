<!-- 这个是原总体财务管理页面，因为修改Excel协同编辑改动比较大，所以备份一份原始数据  -->
<template>
  <div class="finance-container">
    <pageHeader
      title="总体财务管理"
      describe="这个模块管理公司总体财务情况，包括销售情况和总体收入与各项支出，仅支持以下三个表格的excel导入。点击以下按钮查看看板效果。"
    ></pageHeader>
    <div>
      <div class="new-create" style="margin-left: 1rem">
        <!-- <router-link target="_blank" :to="{ path: '/info_screen/screen/finance/finance' }"> -->
        <el-button
          size="mini"
          type="success"
          @click="toPath('/info_screen/fdata/screen/finance')"
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
        <div class="part1">
          <div
            class=""
            style="
              font-size: 20px;
              border-bottom: 1px solid #e6ebf5;
              padding: 1rem;
            "
          >
            总体财务预算
          </div>
          <div class="new-create" style="padding: 1rem">
            <el-upload
              :action="base_api + '/info_screen/fdAll/excel/handler'"
              multiple
              :limit="1"
              :on-success="handleSuccess1"
              :headers="headers"
              :before-upload="beforeUpload1"
            >
              <el-button size="mini" type="primary">
                <i class="el-icon-upload2"></i>Excel上传</el-button
              >
            </el-upload>
            <!-- <a
              :href="base_api + '/' + 'template/Overall_Financial_Budget.xlsx'"
              style="margin: 0.3rem 0.8rem"
              >{{ $t(`excelTemplate.downloadTemplate`) }}</a
            > -->
            <el-button type="primary" size="mini" style="margin-left: 15px">
              <i class="el-icon-download"></i>
              <a
                :href="
                  base_api + '/' + 'template/Overall_Financial_Budget.xlsx'
                "
                style="margin: 0.3rem 0.5rem 0.3rem 0; color: #fff"
                >{{ $t(`excelTemplate.downloadTemplate`) }}</a
              >
            </el-button>
          </div>

          <div style="padding: 0 1rem 1rem 1rem">
            <el-table class="table1" :data="core" stripe>
              <el-table-column type="index" width="50" label="序号" />
              <el-table-column
                align="center"
                label="损益/Profit and loss"
                prop="name"
              >
                <template slot-scope="scope">
                  {{ scope.row.name }}/{{ scope.row.enName }}
                </template>
              </el-table-column>
              <el-table-column
                align="center"
                label="本年累计/Current year"
                prop="profit"
              >
              </el-table-column>
              <el-table-column
                align="center"
                label="本年目标/Forecast"
                prop="budget"
              >
              </el-table-column>
              <el-table-column
                align="center"
                label="差异率/Difference"
                prop="rate"
              >
              </el-table-column>
            </el-table>
          </div>
        </div>
        <div class="part2">
          <div
            class="title"
            style="
              font-size: 20px;
              border-bottom: 1px solid #e6ebf5;
              padding: 1rem;
            "
          >
            销售状况
          </div>
          <div class="new-create" style="padding: 1rem">
            <el-upload
              :action="base_api + '/info_screen/fdSaleStatus/excel/handler'"
              multiple
              :limit="1"
              :on-success="handleSuccess2"
              :headers="headers"
              :before-upload="beforeUpload2"
            >
              <el-button size="mini" type="primary"
                ><i class="el-icon-upload2"></i>Excel上传</el-button
              >
            </el-upload>
            <!-- <a
              :href="base_api + '/' + 'template/Sales_Status.xlsx'"
              style="margin: 0.3rem 0.8rem"
              >{{ $t(`excelTemplate.downloadTemplate`) }}</a
            > -->
            <el-button type="primary" size="mini" style="margin-left: 15px">
              <i class="el-icon-download"></i>
              <a
                :href="base_api + '/' + 'template/Sales_Status.xlsx'"
                style="margin: 0.3rem 0.5rem 0.3rem 0; color: #fff"
                >{{ $t(`excelTemplate.downloadTemplate`) }}</a
              >
            </el-button>
          </div>
          <div style="padding: 0 1rem 1rem 1rem">
            <el-table class="" :data="listSaleStatus" stripe>
              <el-table-column type="index" width="50" label="序号" />
              <el-table-column align="center" label="收入/Income" prop="name">
                <template slot-scope="scope">
                  {{ scope.row.name }}/{{ scope.row.enName }}
                </template>
              </el-table-column>
              <el-table-column
                align="center"
                label="销售额/Sales"
                prop="profit"
              >
              </el-table-column>
              <el-table-column
                align="center"
                label="销售目标/Forecast"
                prop="budget"
              >
              </el-table-column>
              <el-table-column
                align="center"
                label="销售目标/Forecast"
                prop="completionRate"
                :formatter="formatRate"
              >
              </el-table-column>
              <el-table-column
                align="center"
                label="上年同期/Last year"
                prop="lastYear"
              >
              </el-table-column>
              <el-table-column
                align="center"
                label="增长率/Rate of increase"
                prop="growthRate"
                :formatter="formatRate"
              >
              </el-table-column>
            </el-table>
          </div>
        </div>
      </div>
      <!-- <el-divider></el-divider> -->
      <div class="second-row">
        <div>
          <div class="title" style="
              font-size: 20px;
              border-bottom: 1px solid #e6ebf5;
              padding: 1rem;
            ">
            销售月度趋势
          </div>
          <div class="new-create" style="padding: 1rem">
            <el-upload
              :action="base_api + '/info_screen/fdSaleMonth/excel/handler'"
              multiple
              :limit="1"
              :on-success="handleSuccess3"
              :headers="headers"
              :before-upload="beforeUpload3"
            >
              <el-button size="mini" type="primary"><i class="el-icon-upload2"></i>Excel上传</el-button>
            </el-upload>

            <!-- <a
              :href="base_api + '/' + 'template/Monthly_Sales_Trend.xlsx'"
              style="margin: 0.3rem 0.8rem"
              >{{ $t(`excelTemplate.downloadTemplate`) }}</a
            > -->
            <el-button type="primary" size="mini" style="margin-left: 15px">
              <i class="el-icon-download"></i>
              <a
                :href="base_api + '/' + 'template/Monthly_Sales_Trend.xlsx'"
                style="margin: 0.3rem 0.5rem 0.3rem 0; color: #fff"
                >{{ $t(`excelTemplate.downloadTemplate`) }}</a
              >
            </el-button>
          </div>
          <div style="padding: 0 1rem 1rem 1rem">
          <el-table class="" :data="listSaleMonth" stripe>
            <el-table-column align="center" label="销售额/Sales" prop="name">
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
      </div>
    </div>
    <el-dialog :title="dialog1.title" :visible.sync="dialog1.visible">
      <el-table class="table1" :data="all" border stripe>
        <el-table-column type="index" width="50" label="序号" />
        <el-table-column
          align="center"
          label="损益/Profit and loss"
          prop="name"
        >
          <template slot-scope="scope">
            {{ scope.row.name }}/{{ scope.row.enName }}
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="本年累计/Current year"
          prop="profit"
        >
        </el-table-column>
        <el-table-column align="center" label="本年目标/Forecast" prop="budget">
        </el-table-column>
        <el-table-column align="center" label="差异率/Difference" prop="rate">
        </el-table-column>
      </el-table>
      <el-button
        type="primary"
        style="display: block; margin: 10px auto"
        @click="submitCore"
        >保存</el-button
      >
    </el-dialog>

    <el-dialog :title="dialog2.title" :visible.sync="dialog2.visible">
      <el-table class="table2" :data="saleStatus" border stripe>
        <el-table-column align="center" label="收入/Income" prop="name">
          <template slot-scope="scope">
            {{ scope.row.name }}/{{ scope.row.enName }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="销售额/Sales" prop="profit">
        </el-table-column>
        <el-table-column align="center" label="销售目标/Forecast" prop="budget">
        </el-table-column>
        <el-table-column
          align="center"
          label="销售目标/Forecast"
          prop="completionRate"
          :formatter="formatRate"
        >
        </el-table-column>
        <el-table-column
          align="center"
          label="上年同期/Last year"
          prop="lastYear"
        >
        </el-table-column>
        <el-table-column
          align="center"
          label="增长率/Rate of increase"
          prop="growthRate"
          :formatter="formatRate"
        >
        </el-table-column>
      </el-table>
      <el-button
        type="primary"
        style="display: block; margin: 10px auto"
        @click="submitSaleStatus"
        >保存</el-button
      >
    </el-dialog>

    <el-dialog :title="dialog3.title" :visible.sync="dialog3.visible">
      <el-table class="table2" :data="saleMonth" border stripe>
        <el-table-column align="center" label="销售额/Sales" prop="name">
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
        @click="submitSaleMonth"
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
  saveBatchCore,
  listCore,
  saveBatchSaleStatus,
  listSaleStatus,
  saveBatchSaleMonth,
  listSaleMonth,
} from "@/api/finance";
export default {
  // import引入的组件需要注入到对象中才能使用
  components: {
    pageHeader,
  },
  name: "finance-data",
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
      core: [],
      listSaleStatus: [],
      listSaleMonth: [],
      all: [],
      saleStatus: [],
      saleMonth: [],
      dialog1: {
        title: "财务总预算表",
        visible: false,
      },
      dialog2: {
        title: "销售状况表",
        visible: false,
      },
      dialog3: {
        title: "销售月度趋势表",
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
        this.all = res.data;
        this.dialog1.visible = true;
      }
    },
    handleSuccess2(res) {
      if (res.code == 200) {
        console.log(res.data);
        this.saleStatus = res.data;
        this.dialog2.visible = true;
      }
    },
    handleSuccess3(res) {
      if (res.code == 200) {
        console.log(res.data);
        this.saleMonth = res.data;
        this.dialog3.visible = true;
      }
    },
    formatRate(row, column, cellValue) {
      return (cellValue * 100).toFixed(0) + "%";
    },
    async submitCore() {
      const { data: res } = await saveBatchCore(this.all);
      if (res.code == 200) {
        this.dialog1.visible = false;
        this.getCore();
      }
    },
    async getCore() {
      const { data: res } = await listCore();
      // console.log(res.data)
      if (res.code == 200) {
        this.core = res.data;
      }
    },
    async submitSaleStatus() {
      const { data: res } = await saveBatchSaleStatus(this.saleStatus);
      if (res.code == 200) {
        this.dialog2.visible = false;
        this.getSaleStatus();
      }
    },
    async getSaleStatus() {
      const { data: res } = await listSaleStatus();
      console.log(res.data);
      if (res.code == 200) {
        this.listSaleStatus = res.data;
      }
    },
    async submitSaleMonth() {
      const { data: res } = await saveBatchSaleMonth(this.saleMonth);
      if (res.code == 200) {
        this.dialog3.visible = false;
        this.getSaleMonth();
      }
    },
    async getSaleMonth() {
      const { data: res } = await listSaleMonth();
      console.log(res.data);
      if (res.code == 200) {
        this.listSaleMonth = res.data;
      }
    },
    copyUrl() {
      var url = window.location.host + "/#/info_screen/screen/finance/finance";

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
      const rightFilename = "Overall_Financial_Budget.xlsx";
      if (fileName !== rightFilename) {
        this.$confirm(
          "请上传Overall_Financial_Budget.xlsx",
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
      const rightFilename = "Sales_Status.xlsx";
      if (fileName !== rightFilename) {
        this.$confirm("请上传Sales_Status.xlsx", this.$t(`eol.tips`), {
          confirmButtonText: this.$t(`eol.confirm`),
          cancelButtonText: this.$t(`eol.cancel`),
          type: "warning",
        });
        return false;
      }
    },
    beforeUpload3(file) {
      console.log(file.name);
      const fileName = file.name;
      const rightFilename = "Monthly_Sales_Trend.xlsx";
      if (fileName !== rightFilename) {
        this.$confirm("请上传Monthly_Sales_Trend.xlsx", this.$t(`eol.tips`), {
          confirmButtonText: this.$t(`eol.confirm`),
          cancelButtonText: this.$t(`eol.cancel`),
          type: "warning",
        });
        return false;
      }
    },
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    this.getCore();
    this.getSaleStatus();
    this.getSaleMonth();
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

.finance-container {
  padding: 0 0.6rem 1rem 1rem;
  height: 100%;
}

.first-row {
  height: 65%;
  display: flex;
  justify-content: space-between;

  .new-create {
    display: flex;
    padding-bottom: 20px;
  }
}

.second-row {
  // height: 35%;
  margin: 20px 0 10px 0;
  // border: 1px solid;
  border-radius: 4px;
  border: 1px solid #e6ebf5;
  // padding: 1rem;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);

  .new-create {
    display: flex;
    padding-bottom: 20px;
  }
}

.part1 {
  // border: 1px solid;
  width: 50%;
  border-radius: 4px;
  border: 1px solid #e6ebf5;
  // padding: 1rem;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

.part2 {
  // border: 1px solid;
  width: calc(50% - 10px);
  border-radius: 4px;
  border: 1px solid #e6ebf5;
  // padding: 1rem;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  margin-left: 1rem;
}
</style>

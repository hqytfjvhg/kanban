<!-- 这个是原总体财务管理页面，因为修改Excel协同编辑改动比较大，所以备份一份原始数据  -->
<template>
  <div class="cash-container">
    <pageHeader
      title="现金流管理"
      describe="这个模块管理公司现金流情况，包括周末余额和采购月度趋势以及现金流情况。点击以下按钮查看看板效果。"
    ></pageHeader>
    <div class="new-create" style="margin-left: 1rem">
      <!-- <router-link target="_blank" :to="{ path: '/info_screen/screen/finance/money' }"> -->
      <el-button
        size="mini"
        type="success"
        @click="toPath('/info_screen/fdata/screen/money')"
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
        style="font-size: 20px; border-bottom: 1px solid #e6ebf5; padding: 1rem"
      >
        余额状况
      </div>
      <div class="new-create" style="padding: 1rem">
        <el-upload
          :action="base_api + '/info_screen/fdBalance/excel/handler'"
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
          :href="base_api + '/' + 'template/Balance_Status.xlsx'"
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
        <el-table class="table2" :data="listBalance" stripe>
          <el-table-column
            type="index"
            width="100"
            label="序号/Index"
            align="center"
          />
          <el-table-column
            align="center"
            label="账户类别/Account"
            prop="category"
          >
            <template slot-scope="scope">
              {{ scope.row.category }}/{{ scope.row.enCategory }}
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="周末余额/Balance"
            prop="balance"
          >
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div class="second-row">
      <div
        style="font-size: 20px; border-bottom: 1px solid #e6ebf5; padding: 1rem"
      >
        采购月度趋势
      </div>
      <div class="new-create" style="padding: 1rem">
        <el-upload
          :action="base_api + '/info_screen/fdPurchase/excel/handler'"
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
          :href="base_api + '/' + 'template/Monthly_Procurement_Trend.xlsx'"
          style="margin: 0.3rem 0.8rem"
          >{{ $t(`excelTemplate.downloadTemplate`) }}</a
        > -->
        <el-button type="primary" size="mini" style="margin-left: 15px">
          <i class="el-icon-download"></i>
          <a
            :href="base_api + '/' + 'template/Monthly_Procurement_Trend.xlsx'"
            style="margin: 0.3rem 0.5rem 0.3rem 0; color: #fff"
            >{{ $t(`excelTemplate.downloadTemplate`) }}</a
          >
        </el-button>
      </div>
      <div style="padding: 0 1rem 1rem 1rem">
        <el-table class="table2" :data="listPurchase" stripe>
          <el-table-column
            align="center"
            label="材料采购/Material purchase"
            prop="name"
            width="220"
          >
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
    <div class="third-row">
      <div
        style="font-size: 20px; border-bottom: 1px solid #e6ebf5; padding: 1rem"
      >
        现金流情况
      </div>
      <div class="new-create" style="padding: 1rem">
        <el-upload
          :action="base_api + '/info_screen/fdCash/excel/handler'"
          multiple
          :limit="1"
          :on-success="handleSuccess3"
          :headers="headers"
          :before-upload="beforeUpload3"
        >
          <el-button size="mini" type="primary"
            ><i class="el-icon-upload2"></i>Excel上传</el-button
          >
        </el-upload>
        <!-- <a
          :href="base_api + '/' + 'template/Cash_Flow_Situation.xlsx'"
          style="margin: 0.3rem 0.8rem"
          >{{ $t(`excelTemplate.downloadTemplate`) }}</a
        > -->
        <el-button type="primary" size="mini" style="margin-left: 15px">
          <i class="el-icon-download"></i>
          <a
            :href="base_api + '/' + 'template/Cash_Flow_Situation.xlsx'"
            style="margin: 0.3rem 0.5rem 0.3rem 0; color: #fff"
            >{{ $t(`excelTemplate.downloadTemplate`) }}</a
          >
        </el-button>
      </div>
      <div style="padding: 0 1rem 1rem 1rem">
        <el-table class="table2" :data="listCash" stripe>
          <el-table-column
            align="center"
            label="现金流量/Cash flow"
            prop="name"
            width="220"
          >
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
      <el-table class="table2" :data="balance" stripe>
        <el-table-column
          align="center"
          type="index"
          width="100"
          label="序号/Index"
        />
        <el-table-column
          align="center"
          label="账户类别/Account"
          prop="category"
        >
          <template slot-scope="scope">
            {{ scope.row.category }}/{{ scope.row.enCategory }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="周末余额/Balance" prop="balance">
        </el-table-column>
      </el-table>
      <el-button
        type="primary"
        style="display: block; margin: 10px auto"
        @click="submitBalance"
        >保存</el-button
      >
    </el-dialog>

    <el-dialog
      :title="dialog2.title"
      :visible.sync="dialog2.visible"
      width="85%"
    >
      <el-table class="table2" :data="purchase" border stripe>
        <el-table-column
          align="center"
          label="材料采购/Material purchase"
          prop="name"
          width="220"
        >
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
        @click="submitPurchase"
        >保存</el-button
      >
    </el-dialog>

    <el-dialog
      :title="dialog3.title"
      :visible.sync="dialog3.visible"
      width="85%"
    >
      <el-table class="table2" :data="cash" border stripe>
        <el-table-column
          align="center"
          label="现金流量/Cash flow"
          prop="name"
          width="220"
        >
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
        @click="submitCash"
        >保存</el-button
      >
    </el-dialog>
  </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';
import pageHeader from "@/components/pageHeader/index.vue";
import {
  saveBatchBalance,
  listBalance,
  saveBatchPurchase,
  listPurchase,
  saveBatchCash,
  listCash,
} from "@/api/finance";
import store from "@/store";
export default {
  // import引入的组件需要注入到对象中才能使用
  components: {
    pageHeader,
  },
  name: "cash-data",
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
      cash: [],
      balance: [],
      purchase: [],
      dialog1: {
        title: "余额状况表",
        visible: false,
      },
      dialog2: {
        title: "采购月度趋势",
        visible: false,
      },
      dialog3: {
        title: "现金流情况",
        visible: false,
      },
      listCash: [],
      listBalance: [],
      listPurchase: [],
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
        this.balance = res.data;
        this.dialog1.visible = true;
      }
    },
    handleSuccess2(res) {
      if (res.code == 200) {
        console.log(res.data);
        this.purchase = res.data;
        this.dialog2.visible = true;
      }
    },
    handleSuccess3(res) {
      if (res.code == 200) {
        console.log(res.data);
        this.cash = res.data;
        this.dialog3.visible = true;
      }
    },
    async submitBalance() {
      const { data: res } = await saveBatchBalance(this.balance);
      if (res.code == 200) {
        this.dialog1.visible = false;
        this.getListBalance();
      }
    },
    async getListBalance() {
      const { data: res } = await listBalance();
      console.log(res.data);
      if (res.code == 200) {
        this.listBalance = res.data;
      }
    },
    async submitPurchase() {
      const { data: res } = await saveBatchPurchase(this.purchase);
      if (res.code == 200) {
        this.dialog2.visible = false;
        this.getListPurchase();
      }
    },
    async getListPurchase() {
      const { data: res } = await listPurchase();
      console.log(res.data);
      if (res.code == 200) {
        this.listPurchase = res.data;
      }
    },
    async submitCash() {
      const { data: res } = await saveBatchCash(this.cash);
      if (res.code == 200) {
        this.dialog3.visible = false;
        this.getListCash();
      }
    },
    async getListCash() {
      const { data: res } = await listCash();
      console.log(res.data);
      if (res.code == 200) {
        this.listCash = res.data;
      }
    },
    copyUrl() {
      var url = window.location.host + "/#/info_screen/screen/finance/money";

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
      const rightFilename = "Balance_Status.xlsx";
      if (fileName !== rightFilename) {
        this.$confirm("请上传Balance_Status.xlsx", this.$t(`eol.tips`), {
          confirmButtonText: this.$t(`eol.confirm`),
          cancelButtonText: this.$t(`eol.cancel`),
          type: "warning",
        });
        return false;
      }
    },
    beforeUpload2(file) {
      console.log(file.name);
      const fileName = file.name;
      const rightFilename = "Monthly_Procurement_Trend.xlsx";
      if (fileName !== rightFilename) {
        this.$confirm(
          "请上传Monthly_Procurement_Trend.xlsx",
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
    beforeUpload3(file) {
      console.log(file.name);
      const fileName = file.name;
      const rightFilename = "Cash_Flow_Situation.xlsx";
      if (fileName !== rightFilename) {
        this.$confirm("请上传Cash_Flow_Situation.xlsx", this.$t(`eol.tips`), {
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
    this.getListBalance();
    this.getListCash();
    this.getListPurchase();
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
.cash-container {
  padding: 0 0.6rem 1rem 0.6rem;
  height: 100%;

  .new-create {
    display: flex;
    // padding-bottom: 20px;
  }
}

.first-row {
  border-radius: 4px;
  border: 1px solid #e6ebf5;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

.second-row {
  border-radius: 4px;
  border: 1px solid #e6ebf5;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  margin-top: 24px;
}

.third-row {
  border-radius: 4px;
  border: 1px solid #e6ebf5;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  margin-top: 24px;
}
</style>

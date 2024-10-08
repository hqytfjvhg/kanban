<template>
  <div id="index">
    <!-- <pageHeader
      :title="$t(`home.welcome`)"
      :describe="$t(`home.descript`)"
    ></pageHeader> -->

    <!-- 修改6/24 -->
    <!-- <div style="font-size: 20px; margin: 10px 20px; color: #6f5b5b">
      {{ $t(`home.openDashboardQuickly`) }}
    </div> -->
    <div
      style="
        font-size: 20px;
        margin: 20px;
        font-weight: 600;
        color: rgba(0, 0, 0, 0.88);
      "
    >
      {{ $t(`home.title`) }}
      <!-- <span
        style="
          font-size: 12px;
          color: #6f5b5b;
          font-weight: 400;
          color: #9f9a9a;
        "
      >
        （ {{ $t(`home.openDashboardQuickly`) }}）</span
      > -->
    </div>
    <el-card class="box-card">
      <div>
        <el-link @click="openLink('/info_screen/screen/company')">{{
          $t(`home.company`)
        }}</el-link>
      </div>
    </el-card>

    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>{{ $t(`home.finance`) }}</span>
      </div>
      <div>
        <div>
          <el-link
            style="margin-bottom: 20px"
            @click="openLink('/info_screen/screen/finance/finance')"
            >{{ $t(`finance.financialManagement.title`) }}</el-link
          >
        </div>
        <div>
          <el-link
            style="margin-bottom: 20px"
            @click="openLink('/info_screen/screen/finance/cost')"
            >{{ $t(`finance.departmentalFinancialManagement.title`) }}</el-link
          >
        </div>
        <div>
          <el-link
            style="margin-bottom: 20px"
            @click="openLink('/info_screen/screen/finance/money')"
            >{{ $t(`finance.cashManagement.title`) }}</el-link
          >
        </div>
        <div>
          <el-link @click="openLink('/info_screen/screen/profit')">{{
            $t(`finance.profit.title`)
          }}</el-link>
        </div>
      </div>
    </el-card>

    <el-card class="box-card">
      <div>
        <el-link @click="openLink('/info_screen/screen/marketing')">{{
          $t(`home.marketing`)
        }}</el-link>
      </div>
    </el-card>

    <el-card class="box-card">
      <div>
        <el-link @click="openLink('/info_screen/screen/sts')"
          >STS - Tech support</el-link
        >
      </div>
    </el-card>
  </div>
</template>

<script>
import logo from "@/assets/logo_center.png";
import pageHeader from "@/components/pageHeader/index.vue";
export default {
  name: "home-index",
  components: {
    // 组件的引用
    pageHeader,
  },
  data() {
    return {
      role: this.$store.getters.role,
      baseURL: process.env.VUE_APP_BASE_API,
      background: {
        image: logo,
      },
    };
  },
  props: {},
  created() {
    // 实例被创建之后执行代码

    console.log(`menus`, this.$store.getters.menus);
  },
  computed: {
    // 计算属性
  },
  methods: {
    // 方法
    openLink(link) {
      const localUrl = window.location.href.substring(
        0,
        window.location.href.lastIndexOf("#") + 1
      );
      const url = `${localUrl}${link}`;
      const cInput = document.createElement("input");
      cInput.value = url;
      document.body.appendChild(cInput);
      cInput.select(); // 选取文本框内容

      // 执行浏览器复制命令
      // 复制命令会将当前选中的内容复制到剪切板中（这里就是创建的input标签）
      // Input要在正常的编辑状态下原生复制方法才会生效

      document.execCommand("copy");

      // this.$message({
      //   type: "success",
      //   message: "看板地址复制成功",
      // });
      // 复制成功后再将构造的标签 移除
      document.body.removeChild(cInput);

      setTimeout(() => {
        // 新标签打开链接
        window.open(url);
      }, 300);
    },
  },
  mounted() {
    // 页面进入时加载内容
  },
  watch: {
    // 监测变化
  },
};
</script>
<style lang="scss" scoped>
.home-container {
  padding: 0px 20px;
}

.box-card {
  width: 660px;
  margin: 0px 20px;
  margin-bottom: 20px;
  
}
.el-link{
  font-size: 16px;
}
</style>

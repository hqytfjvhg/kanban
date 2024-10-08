<!--  -->
<template>
  <div class="excelTemplates">
    <pageHeader
      :title="$t(`excelTemplate.pageTitle`)"
      :describe="$t(`excelTemplate.pageDesc`)"
    ></pageHeader>
    <el-table
      :data="excelTemplates"
      :border="true"
      style="margin: 0 auto; width: 100%"
      stripe
    >
      <el-table-column
        :label="$t(`excelTemplate.index`)"
        type="index"
        width="150"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="tag"
        :label="$t(`excelTemplate.tag`)"
        width="400"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="name"
        :label="$t(`excelTemplate.name`)"
        width="400"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="url"
        :label="$t(`excelTemplate.uploadExcel`)"
        align="center"
      >
        <template slot-scope="scope">
          <div v-if="scope.row.url === null">
            <el-upload
              :action="base_api + '/info_screen/excel/template/upload'"
              multiple
              :limit="1"
              :on-success="handleSuccess"
              :headers="headers"
              :show-file-list="false"
              :before-upload="beforeUpload"
            >
              <el-button
                size="mini"
                type="primary"
                plain
                @click="upload(scope.row)"
                >{{ $t(`excelTemplate.upload`) }}</el-button
              >
            </el-upload>
          </div>
          <div v-else>
            <el-upload
              :action="base_api + '/info_screen/excel/template/upload'"
              multiple
              :limit="1"
              :on-success="handleSuccess"
              :headers="headers"
              :show-file-list="false"
              :before-upload="beforeUpload"
            >
              <el-button
                size="mini"
                type="warning"
                plain
                @click="upload(scope.row)"
                >{{ $t(`excelTemplate.reupload`) }}</el-button
              >
            </el-upload>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t(`excelTemplate.operation`)"
        align="center"
        width="300"
      >
        <template slot-scope="scope">
          <div v-if="scope.row.url !== null">
            <a
              :href="base_api + '/' + scope.row.url"
              style="color: #409eff; text-decoration: none"
              >{{ $t(`excelTemplate.downloadTemplate`) }}</a
            >
          </div>
          <div v-else>{{ $t(`excelTemplate.uploadTips`) }}</div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';
import store from "@/store";
import { list, update } from "@/api/excelTemplate";
import pageHeader from "@/components/pageHeader/index.vue";
export default {
  // import引入的组件需要注入到对象中才能使用
  components: {
    pageHeader,
  },
  name: "excel-template",
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
      excelTemplates: [],
      base_api: process.env.VUE_APP_BASE_API,
      headers: {
        token: store.getters.token,
      },
      excelTemplate: {},
    };
  },
  // 监听属性 类似于data概念
  computed: {},
  // 监控data中的数据变化
  watch: {},
  // 方法集合
  methods: {
    async handleSuccess(res) {
      console.log(res.data);
      console.log(this.excelTemplate);
      if (res.code == 200) {
        this.excelTemplate.url = res.data;
        const { data: res1 } = await update(this.excelTemplate);
        if (res1.code == 200) {
          this.$message({
            type: "success",
            message: "upload successfully.",
          });
        }
      }
    },
    upload(row) {
      this.excelTemplate = row;
    },
    // 上传前
    beforeUpload(file) {
      console.log(file.name);
      const fileName = file.name;
      const rightFilename = this.excelTemplate.tag + ".xlsx";
      if (fileName !== rightFilename) {
        this.$confirm("请上传与标签名一致的excel文件", this.$t(`eol.tips`), {
          confirmButtonText: this.$t(`eol.confirm`),
          cancelButtonText: this.$t(`eol.cancel`),
          type: "warning",
        });
        return false;
      }
    },
    async getExcelTemplates() {
      const { data: res } = await list();
      this.excelTemplates = res.data;
    },
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    this.getExcelTemplates();
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
.excelTemplates {
  padding: 0 0.6rem 1rem 0.6rem;
}
</style>
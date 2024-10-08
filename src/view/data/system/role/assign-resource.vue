<!--分配角色  -->
<template>
  <div class="assign-resource-container">
    <!-- <div>{{ role }}</div> -->
    <div class="check-box" style="margin: 70px" v-for="item in resources">
      <el-checkbox
        :indeterminate="isIndeterminate"
        v-model="checkAll"
        @change="handleCheckAllChange"
        >{{ item.categoryName }}</el-checkbox
      >
      <div style="margin: 15px 0"></div>
      <el-checkbox-group v-model="checkedResources">
        <!-- @change="handleCheckedCitiesChange" -->
        <el-checkbox
          style="padding: 3px"
          v-for="resource in item.resources"
          :label="resource.id"
          :key="resource.id"
          >{{ resource.description }}</el-checkbox
        >
      </el-checkbox-group>
    </div>
    <el-button
      type="primary"
      style="display: block; margin: 10px auto"
      @click="submit"
      >提交</el-button
    >
  </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';
import { getResourceList, getResourceListGroupByCategory } from "@/api/system";
import { getResourceIdsByRoleId, assignResourcesByRoleId } from "@/api/role";
export default {
  // import引入的组件需要注入到对象中才能使用
  components: {},
  name: "assign-resource",
  props: {
    role: {
      type: Object,
      required: true,
    },
  },
  data() {
    // 这里存放数据
    return {
      resources: [],
      checkedResources: [3, 5, 7],
      isIndeterminate: true,
      checkAll: false,
      queryCondition: {
        category: "",
        name: "",
        url: "",
      },
    };
  },
  // 监听属性 类似于data概念
  computed: {},
  // 监控data中的数据变化
  watch: {},
  // 方法集合
  methods: {
    handleCheckAllChange(val) {
      this.checkedResources = val ? this.resources : [];
      this.isIndeterminate = false;
    },
    async getResource() {
      const { data: res } = await getResourceList(this.queryCondition);
      if (res.code == 200) {
        this.resources = res.data;
      } else {
        this.$message({
          type: "warning",
          message: res.msg,
        });
      }
      const { data: res1 } = await getResourceListGroupByCategory(
        this.queryCondition
      );
      if (res1.code == 200) {
        this.resources = res1.data;
      } else {
        this.$message({
          type: "warning",
          message: res.msg,
        });
      }
    },
    async getCheckedResources(roleId) {
      const { data: res } = await getResourceIdsByRoleId(roleId);
      if (res.code == 200) {
        this.checkedResources = res.data;
      } else {
        this.$message({
          type: "warning",
          message: res.msg,
        });
      }
    },
    async submit() {
      //console.log(this.currentRoleResources)
      console.log(this.checkedResources);
      const { data: res } = await assignResourcesByRoleId(
        this.role.roleId,
        this.checkedResources
      );
      if (res.code == 200) {
        this.getCheckedResources(this.role.roleId);
        this.$emit("fatherMethod");
        this.$message({
          type: "success",
          message: "分配成功",
        });
      } else {
        this.$message({
          type: "warning",
          message: res.msg,
        });
      }
    },
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.getResource();
    this.getCheckedResources(this.role.roleId);
  },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
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
</style>

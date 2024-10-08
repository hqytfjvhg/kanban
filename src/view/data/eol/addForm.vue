<!--  -->
<template>
  <div class="addForm">
    <el-form :model="form" label-width="120px">
      <el-form-item label="name:" style="width: 25rem">
        <el-input
          type="text"
          placeholder="please input the name"
          v-model="form.name"
        ></el-input>
      </el-form-item>
      <el-form-item label="mQty2:" style="width: 25rem">
        <el-input
          v-model="form.mqty"
          type="number"
          placeholder="please input mqty2"
        >
        </el-input>
      </el-form-item>
      <el-form-item label="lastMQty:" style="width: 25rem">
        <el-input
          v-model="form.lastMQty"
          type="number"
          placeholder="please input lastMQty"
        >
        </el-input>
      </el-form-item>
      <el-form-item label="thisMQty:" style="width: 25rem">
        <el-input
          v-model="form.thisMQty"
          type="number"
          placeholder="please input thisMQty"
        >
        </el-input>
      </el-form-item>
      <!-- <el-form-item>
                <el-button type="primary" @click="submit" size="mini">confirm</el-button>
            </el-form-item> -->
      <div style="display: flex; justify-content: center">
        <span slot="footer" class="dialog-footer">
          <el-button @click="visible = false" size="mini">{{
            $t(`int.cancel`)
          }}</el-button>
          <el-button type="primary" @click="submit('formData')" size="mini">{{
            $t(`notice.confirm`)
          }}</el-button>
        </span>
      </div>
    </el-form>
  </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';
import { add } from "@/api/eol";
export default {
  // import引入的组件需要注入到对象中才能使用
  components: {},
  name: "addForm",
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
      form: {},
    };
  },
  // 监听属性 类似于data概念
  computed: {},
  // 监控data中的数据变化
  watch: {},
  // 方法集合
  methods: {
    async submit() {
      console.log(this.form);
      const { data: res } = await add(this.form);
      if (res.code == 200) {
        this.$message({
          type: "success",
          message: "add successfully!",
        });
        this.form = {};
        this.$emit("fatherMethod");
      } else {
        this.$message({
          type: "warning",
          message: res.msg,
        });
      }
    },
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created() {},
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
<style lang='scss' scoped>
//  @import url(); 引入公共css类
</style>
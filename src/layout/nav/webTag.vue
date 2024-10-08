
<template>
  <div class="container" :class="current ? 'background' : 'border'">
    <div class="dot" v-if="current"></div>
    <div class="title">{{ $t(title) }}</div>
    <!-- 首页不关闭 -->
    <div v-show="title != 'route.home'" @click.stop="closePage">
      <i class="el-icon-close"></i>
    </div>
  </div>
</template>

<script>
export default {
  name: 'webTag',
  props: {
    title: {
      type: String
    },
    current: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    closePage() { this.$emit('deletePage', this.title) }
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created() { },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted() { },
  beforeCreate() { }, // 生命周期 - 创建之前
  beforeMount() { }, // 生命周期 - 挂载之前
  beforeUpdate() { }, // 生命周期 - 更新之前
  updated() { }, // 生命周期 - 更新之后
  beforeDestroy() { }, // 生命周期 - 销毁之前
  destroyed() { }, // 生命周期 - 销毁完成
  activated() { }, // 如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
<style lang='scss' scoped>
.border {
  border: 1px solid #CCC;
}

.background {
  background-color: #42b983;
  color: white;
}

.container {
  display: flex;
  margin: 2px 6px 3px 0;
  border-radius: 2px;
  align-items: center;
  padding: 0.4rem 0.7rem;
  font-size: 0.8rem;

  .dot {
    width: 0.6rem;
    height: 0.6rem;
    background-color: white;
    border-radius: 0.4rem;
    margin-right: 0.3rem;
  }

  .container:hover {
    cursor: pointer
  }

  .el-icon-close {
    //font-size: 1px;
    margin-left: 0.2rem;
  }
}
</style>
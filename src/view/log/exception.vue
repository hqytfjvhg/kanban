<!--
* @description  参数1
* @fileName  exception
* @author Arvin
* @date 2022-11-18 09:46:55
* @version V1.0.0
!-->

<template>
  <div id='exception' class="exception-container">
    <pageHeader 
      :title="$route.meta.title" 
      :describe="'异常日志。记录管理员的异常操作。'"
      style="margin-bottom: 10px;">
    </pageHeader>
    log-exception
  </div>
</template>

<script>
import pageHeader from '@/components/pageHeader/index.vue'
export default {
  name: 'log-exception',
  data() {
    return {

    }
  },
  created() { // 实例被创建之后执行代码

  },
  computed: { // 计算属性

  },
  components: { // 组件的引用
    pageHeader
  },
  methods: { // 方法

  },
  mounted() { // 页面进入时加载内容

  },
  watch: { // 监测变化

  }
}
</script>
<style lang='scss' scoped>

</style>
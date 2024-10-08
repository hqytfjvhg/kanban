<!--  -->
<template>
  <div class="info-container">
    <el-card class="box-card" style="margin:30px;width:30%">
      <div slot="header" class="clearfix">
        <span>{{ $t(`my.myInfo`) }}</span>
        <!-- <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button> -->
      </div>
      <div class="user-profile">
        <div class="box-center">
          <PanThumb :height="'100px'" :width="'100px'" :hoverable="false">
            <div style="font-size:1.2rem">Hello</div>
            <div style="font-size:1rem">{{ username }}</div>
            <!-- <div><span v-for="(item, index) in role" :key="index">{{ item }}</span></div> -->
          </PanThumb>
        </div>
        <div class="box-center" style="text-align: center;">
          <div class="user-name text-center">{{ username }}</div>
          <div class="user-role text-center text-muted">
            <div><span v-for="(item, index) in role" :key="index" style="margin-right:5px;">{{ item }}</span></div>
          </div>
        </div>
      </div>

    </el-card>
  </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';
import PanThumb from '@/components/PanThumb'
export default {
  // import引入的组件需要注入到对象中才能使用
  components: { PanThumb },
  name: 'info-index',
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
      avatar: this.$store.getters.avatar,
      role: this.$store.getters.role,
      username: this.$store.getters.username,
      base_api: process.env.VUE_APP_BASE_API,
    };
  },
  // 监听属性 类似于data概念
  computed: {},
  // 监控data中的数据变化
  watch: {},
  // 方法集合
  methods: {

  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created() {
    console.log(`avatar`, this.avatar)
    console.log(`role`, this.role)
    console.log(`username`, this.username)
  },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {

  },
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
//  @import url(); 引入公共css类

.box-center {
  margin: 0 auto;
  display: table;
}

.text-muted {
  color: #777;
}

.user-profile {
  .user-name {
    font-weight: bold;
  }

  .box-center {
    padding-top: 10px;

  }

  .user-role {
    padding-top: 10px;
    font-weight: 400;
    font-size: 14px;
  }

  .box-social {
    padding-top: 30px;

    .el-table {
      border-top: 1px solid #dfe6ec;
    }
  }

  .user-follow {
    padding-top: 20px;
  }
}

.user-bio {
  margin-top: 20px;
  color: #606266;

  span {
    padding-left: 4px;
  }

  .user-bio-section {
    font-size: 14px;
    padding: 15px 0;

    .user-bio-section-header {
      border-bottom: 1px solid #dfe6ec;
      padding-bottom: 10px;
      margin-bottom: 10px;
      font-weight: bold;
    }
  }
}</style>
<template>
  <div class="container">
    <div class="container-left">
      <div class="web-box">
        <el-image style="width: 1.5rem; height: 1.5rem" :src="logo" fit="cover">
        </el-image>
        <div class="web-title">{{ $t(`app.name`) }}</div>
      </div>
      <MENU ref="menuRef"></MENU>
    </div>
    <div class="container-rigth">
      <NAV :currentRoute="$route" @deleteTabs="deleteTabs"></NAV>
      <KeepAlive>
        <router-view />
      </KeepAlive>
    </div>
  </div>
</template>




<script>
import MENU from "@/layout/menu/index.vue";
import NAV from "@/layout/nav/index.vue";
export default {
  name: "layout-index",
  data() {
    return {
      logo: require("@/assets/logo.png"),
      
    };
  },
  components: { MENU, NAV },
  methods:{
    deleteTabs(name){
      this.$refs.menuRef.activeMenu = name
      console.log(this.$refs.menuRef.activeMenu,'现在打开的页面name');
    },

  }
};
</script>
<style lang="scss" scoped>
.container {
  display: flex;
  width: 100vw;
  height: 100vh;
  background: white;
  // background-image: linear-gradient(-90deg,#828282, #06115B);
  overflow: hidden;

  .container-left {
    flex: 1;
    height: 100%;
    background-color: #eee;
    overflow: auto;
    .web-box {
      background: #eee;
      color: #111010;
      padding: 20px 0;
      display: flex;
      justify-content: center;
      align-items: flex-end;

      .web-title {
        display: block;
        font-weight: 700;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-size: 20px;
        margin-left: 10px;
      }
    }
  }

  .container-rigth {
    flex: 5;
    overflow: auto;
    margin-bottom: 1rem;
  }
}
</style>

<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
  created() {
  },
};
</script>


<style lang="scss">
::-webkit-scrollbar {
  width: 0 !important;
}

::-webkit-scrollbar {
  width: 0 !important;
  height: 0;
}

/**
** 全局body 滚动栏样式
*/
body {
  ::-webkit-scrollbar {
    width: 10px !important;
    /*滚动条宽度*/
    height: 10px !important;
    /*滚动条高度*/
  }

  /*定义滚动条轨道 内阴影+圆角*/
  ::-webkit-scrollbar-track {
    box-shadow: 0px 1px 3px #ccced2 inset !important;
    /*滚动条的背景区域的内阴影*/
    border-radius: 10px !important;
    /*滚动条的背景区域的圆角*/
    background-color: #ccced2 !important;
    /*滚动条的背景颜色*/
  }

  /*定义滑块 内阴影+圆角*/
  ::-webkit-scrollbar-thumb {
    box-shadow: 0px 1px 3px rgb(118, 146, 161) inset !important;
    /*滚动条的内阴影*/
    border-radius: 10px !important;
    /*滚动条的圆角*/
    background-color: #71838d !important;
    /*滚动条的背景颜色*/
  }
}
</style>


<template>
  <div>
    <el-menu
      class="el-menu-vertical-demo"
      background-color="#eee"
      text-color="#111010"
      active-text-color="#409EFF"
      :collapse="isCollapse"
      :default-active="activeMenu"
      @select="handleSelect"
    >
      <div v-for="(item, index) in menus" :key="index">
        <el-menu-item
          v-if="item.children.length == 0"
          :index="item.name"
          @click="toPath(item.uri)"
        >
          <i :class="item.icon"></i>
          <span
            v-if="$i18n.locale === 'ch'"
            slot="title"
            class="el-menu-item-title"
            >{{ item.title }}</span
          >
          <span v-else slot="title" class="el-menu-item-title">{{
            item.enTitle
          }}</span>
        </el-menu-item>

        <el-submenu v-else :index="item.name">
          <template slot="title">
            <div @click="toPath(item.uri)">
              <i :class="item.icon"></i>
              <span
                v-if="$i18n.locale === 'ch'"
                slot="title"
                class="el-menu-item-title"
                >{{ item.title }}</span
              >
              <span v-else slot="title" class="el-menu-item-title">{{
                item.enTitle
              }}</span>
            </div>
          </template>
          <div v-for="(item1, index) in item.children" :key="index">
            <el-menu-item
              v-if="item1.children.length == 0"
              :index="item1.name"
              @click="toPath(item1.uri)"
            >
              <i :class="item1.icon"></i>
              <span
                v-if="$i18n.locale === 'ch'"
                slot="title"
                class="el-menu-item-title"
                >{{ item1.title }}</span
              >
              <span v-else slot="title" class="el-menu-item-title">{{
                item1.enTitle
              }}</span>
            </el-menu-item>

            <el-submenu v-else :index="item1.name">
              <template slot="title">
                <i :class="item1.icon" @click="toPath(item1.uri)"></i>
                <span
                  v-if="$i18n.locale === 'ch'"
                  slot="title"
                  class="el-menu-item-title"
                  >{{ item1.title }}</span
                >
                <span v-else slot="title" class="el-menu-item-title">{{
                  item1.enTitle
                }}</span>
              </template>
              <div v-for="(item2, index) in item1.children" :key="index">
                <el-menu-item
                  v-if="item2.children.length == 0"
                  :index="item2.name"
                  @click="toPath(item2.uri)"
                >
                  <i :class="item2.icon"></i>
                  <span
                    v-if="$i18n.locale === 'ch'"
                    slot="title"
                    class="el-menu-item-title"
                    >{{ item2.title }}</span
                  >
                  <span v-else slot="title" class="el-menu-item-title">{{
                    item2.enTitle
                  }}</span>
                </el-menu-item>

                <el-submenu v-else :index="item2.name">
                  <template slot="title">
                    <i :class="item1.icon"></i>
                    <span
                      v-if="$i18n.locale === 'ch'"
                      slot="title"
                      class="el-menu-item-title"
                      >{{ item2.title }}</span
                    >
                    <span v-else slot="title" class="el-menu-item-title">{{
                      item2.enTitle
                    }}</span>
                  </template>
                </el-submenu>
              </div>
            </el-submenu>
          </div>
        </el-submenu>
      </div>
    </el-menu>
  </div>
</template>

<script>
import { getRole } from "@/api/role";
export default {
  name: "layout-menu",
  props: {
    changMenu: "",
  },
  data() {
    return {
      menus: this.$store.getters.menus,
      isCollapse: false,
      activeMenu: this.$route.name,
    };
  },
  created() {
    // 实例被创建之后执行代码
  },
  computed: {
    // 计算属性
  },
  components: {
    // 组件的引用
  },
  methods: {
    // 菜单选中
    handleSelect(key, keyPath) {
      // console.log(key,keyPath,this.$route.name,147963);
      sessionStorage.setItem("activeMenuName", key);
      // console.log(this.menus,'kkkkk');
      // console.log(
      //   sessionStorage.getItem("activeMenuName"),
      //   "选中的菜单name",
      // );
      // console.log(this.$route.name,'当前路由name')
    },
    // 方法
    toPath(path) {
      if (path == "——") return;
      this.$router.push({ path: path });
    },
    //获取菜单
    async getMenus() {
      const { data: res } = await getRole();
      // console.log(`res`, res);
      if (res.code == 200) {
        this.menus = res.data.menuTreeList;
      }
    },
  },
  mounted() {
    // 页面进入时加载内容
    //if (this.menus.length == 0) {}
    this.getMenus().then(() => {
      console.log(`menus`, this.menus);
    });
    this.activeMenu = sessionStorage.getItem("activeMenuName");
  },
  watch: {
    // 监测变化
  },
};
</script>
<style lang="scss" scoped>
.el-menu-vertical-demo {
  border: none;

  ::v-deep.el-menu {
    background-color: transparent;

    .el-submenu {
      .el-menu-item {
        // background-color: #1f2d3d !important;
      }

      .el-menu-item:hover,
      .el-menu-item:focus {
        // background-color: #001528 !important;
      }
    }

    .el-menu-item-group {
      .el-menu-item-group__title {
        display: none;
      }

      .el-menu-item {
        // background-color: #1f2d3d !important;
      }

      .el-menu-item:hover,
      .el-menu-item:focus {
        background-color: #001528 !important;
      }

      .el-submenu {
        .el-submenu__title {
          // background-color: #1f2d3d !important;
        }

        .el-submenu__title:hover,
        .el-submenu__title:focus {
          background-color: #001528 !important;
        }

        .el-menu-item-group {
          .el-menu-item {
            background-color: #13202e !important;
          }

          .el-menu-item:hover {
            background-color: #325274 !important;
          }

          .el-menu-item:visited {
            background-color: #13202e !important;
          }
        }
      }
    }
  }

  i {
    color: currentColor;
    font-size: 1.5rem;
    margin-right: 0.7rem;
  }

  span {
    font-size: 1rem;
  }
}
</style>

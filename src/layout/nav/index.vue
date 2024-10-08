<template>
  <div class="nav-container">
    <div class="breadcrumb-box">
      <div class="breadcrumb-content">
        <i class="el-icon-s-fold" @click="setIsCollapse"></i>
        <el-breadcrumb separator-class="el-icon-caret-right">
          <el-breadcrumb-item
            v-for="item in currentRoute.matched"
            :key="item.path"
          >
            {{ $t(item.meta.title) }}
          </el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="account-box">
        <div class="change-lan" style="margin: 5px">
          <ChangeLan></ChangeLan>
        </div>
        <el-dropdown trigger="click" style="margin: 5px">
          <span class="el-dropdown-link">
            <div
              class="userInfo"
              style="display: flex; justify-content: space-around"
            >
              <img src="@/assets/avatar.png" class="avatar" />
              <div class="username" style="margin: auto 5px">
                {{ username }}
              </div>
              <div style="margin: auto 2px">
                <i class="el-icon-caret-bottom" style="font-size: 10px"></i>
              </div>
            </div>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item
              @click.native="toPath({ path: '/info_screen/home' })"
              >{{ $t(`app.home`) }}</el-dropdown-item
            >
            <el-dropdown-item
              @click.native="toPath({ path: '/info_screen/user/password' })"
              >{{ $t(`app.updatePassword`) }}</el-dropdown-item
            >
            <!-- <el-dropdown-item @click.native="toPath({ path: '/info_screen/register' })">注册</el-dropdown-item> -->
            <el-dropdown-item @click.native="logout">{{
              $t(`app.logout`)
            }}</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
    <div class="webTag">
      <webTag
        v-for="item in webTags"
        :key="item.path"
        :title="item.meta.title"
        :current="item.meta.title == currentRoute.meta.title"
        @click.native="toPath(item.path,item)"
        @deletePage="deletePage"
      >
      </webTag>
    </div>
  </div>
</template>

<script>
import ChangeLan from "@/components/changeLan/index.vue";
import { Loading } from "element-ui";
import webTag from "./webTag.vue";
export default {
  name: "layout-nav",
  props: {
    currentRoute: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      webTags: [],
      username: this.$store.getters.username,
      avatar: this.$store.getters.avatar,
      base_api: process.env.VUE_APP_BASE_API,
    };
  },
  components: {
    // 组件的引用
    webTag,
    ChangeLan,
  },
  methods: {
    // 方法
    logout() {
      window.localStorage.removeItem("token");
      Loading.service({ background: "rgba(0, 0, 0, 0.7)" });
      setTimeout(() => {
        location.reload();
      }, 100);
    },
    toPath(path,item) {
      console.log(item,888);
      this.$router.push(path);
      sessionStorage.setItem('activeMenuName',item.name)
      this.$emit('deleteTabs',item.name)
    },
    deletePage(title) {
      // console.log(`关闭页面：`, title,);
      // 查找关闭的页面对应下标
      let flag = false;
      let index;
      for (let i = 0; i < this.webTags.length; i++) {
        if (title == this.webTags[i].meta.title) {
          flag = true;
          index = i;
          break;
        }
      }
      if (flag) {
        this.webTags.splice(index, 1);
        if (this.currentRoute.meta.title == title) {
          // 关闭的是当前激活的页面，如果标签页数量为0则打开首页，否则打开 -1的页面
          if (this.webTags.length == 0) {
            this.$router.push({ path: "/" });
            sessionStorage.setItem('activeMenuName','ifiBord Dashboard')
            this.$emit('deleteTabs','ifiBord Dashboard')
          } else {
            this.$router.push(this.webTags[this.webTags.length-1].path);
            sessionStorage.setItem('activeMenuName',this.webTags[this.webTags.length-1].name)
            this.$emit('deleteTabs',this.webTags[this.webTags.length-1].name)
          }
        }
      }
    },
    setIsCollapse() {
      console.log(
        localStorage.getItem("isCollapse") == null
          ? false
          : localStorage.getItem("isCollapse")
      );
      // localStorage.setItem("isCollapse", true);
    },
  },
  mounted() {
    // 页面进入时加载内容
  },
  watch: {
    // 监测变化
    currentRoute: {
      handler: function () {
        // console.log(this.currentRoute.matched,'面包')
        const length = this.webTags.length;
        if (length == 10) this.webTags.splice(0, 1);
        let flag = true;
        for (let i = 0; i < this.webTags.length; i++) {
          if (this.currentRoute.meta.title == this.webTags[i].meta.title) {
            flag = false;
            break;
          }
        }
        if (flag) {
          this.webTags.push(this.currentRoute);
        }
       
      },
      deep: true,
      immediate: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.avatar {
  width: 30px;
  height: 30px;
  background-position: center center;
  background-size: cover;
  border-radius: 50%;
  overflow: hidden;
  transform-origin: 95% 40%;
  transition: all 0.3s ease-in-out;
}

.tags-box {
  display: flex;
  align-items: center;
  border-bottom: 1px solid gold;
}

.account-box {
  display: flex;
  align-items: flex-end;
}

::v-deep.el-breadcrumb {
  font-size: 15px;

  .el-breadcrumb-item {
    color: yellow !important;
  }

  .el-breadcrumb__inner {
    color: #333363;
  }

  .el-icon-caret-right {
    color: #777;
  }
}

.el-icon-s-fold {
  font-size: 1.5rem;
  margin-right: 1rem;
}

.nav-container {
  background-color: white;
  padding: 0 0.6em;
  cursor: pointer;
}

.breadcrumb-box {
  display: flex;
  justify-content: space-between;
  height: 3.2rem;
  border-bottom: 1px solid #eee;
  box-shadow: 0 1px 0 0 #eee;
}

.breadcrumb-content {
  display: flex;
  align-items: center;
  color: #333363;
}

.webTag {
  border-bottom: 2px solid #ddd;
 // box-shadow: 0 1px 0 0 #ddd;
  display: flex;
  -webkit-box-shadow: 0 0 1px 0 rgba(0, 0, 0, .12), 0 0 1px 0 rgba(0, 0, 0, .04);
  padding: 5px 5px 0;
}

.account:hover {
  cursor: pointer;
}
</style>

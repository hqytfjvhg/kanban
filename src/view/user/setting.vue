<!--  -->
<template>
  <div class="setting-container">
    <div
      class="setting-box"
      style="margin: 20px auto; height: 650px; width: 97%; background: #fff"
    >
      <el-tabs tab-position="left" style="padding: 30px 20px; height: 90%">
        <el-tab-pane :label="$t(`my.baseSetting`)">
          <div class="base" style="margin: 20px">
            <div class="title" style="font-size: 30px">
              {{ $t(`my.baseSetting`) }}
            </div>
            <div
              class="content"
              style="
                display: flex;
                justify-content: space-around;
                margin: 30px 20px;
              "
            >
              <div class="form">
                <el-form
                  label-position="right"
                  label-width="100px"
                  :model="userForm"
                >
                  <el-form-item :label="$t(`my.username`)">
                    <el-input
                      v-model="userForm.username"
                      style="width: 800px"
                    ></el-input>
                  </el-form-item>
                  <el-form-item :label="$t(`my.phone`)">
                    <el-input
                      v-model="userForm.phone"
                      style="width: 800px"
                    ></el-input>
                  </el-form-item>
                  <!-- <el-form-item :label="$t(`my.email`)">
                                        <el-input v-model="userForm.email" style="width: 800px"></el-input>
                                    </el-form-item> -->
                  <el-form-item>
                    <el-button
                      type="primary"
                      style="margin-left: 100px"
                      @click="confirm"
                      >{{ $t(`my.save`) }}</el-button
                    >
                  </el-form-item>
                </el-form>
              </div>
              <div
                class="avatar-upload"
                style="
                  border: 1px dashed #dedede;
                  margin: auto;
                  border-radius: 50%;
                "
              >
                <el-upload
                  class="avatar-uploader"
                  :action="base_api + '/info_screen/user/avatar/upload'"
                  :show-file-list="false"
                  :on-success="handleAvatarSuccess"
                >
                  <img
                    v-if="userForm.avatar"
                    :src="base_api + userForm.avatar"
                    class="avatar"
                    style="border-radius: 50%"
                  />
                  <i
                    v-else
                    class="el-icon-plus avatar-uploader-icon"
                    style="font-size: 50px; padding: 50px"
                  ></i>
                </el-upload>
              </div>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane :label="$t(`my.safeSetting`)">
          <div class="safe" style="margin: 20px">
            <div class="title" style="font-size: 30px">
              {{ $t(`my.safeSetting`) }}
            </div>
            <div class="safe-content" style="margin: 30px 20px">
              <div
                class="list"
                style="
                  display: flex;
                  justify-content: space-between;
                  border-bottom: 1px solid #dedede;
                  padding: 10px;
                "
              >
                <div class="list-item">
                  <div class="title" style="padding: 5px; font-size: 20px">
                    {{ $t(`my.password`) }}
                  </div>
                  <div
                    class="describe"
                    style="padding: 5px; font-size: 15px; color: #409eff"
                  >
                    {{ $t(`my.passwordStrength`) }}strong
                  </div>
                </div>
                <!-- <el-button
                  class="update"
                  style="margin: auto 10px"
                  type="text"
                  @click="toPath({ path: '/info_screen/user/password' })"
                  >{{ $t(`my.update`) }}</el-button
                > -->
                <el-button
                  class="update"
                  style="margin: auto 10px"
                  type="text"
                  @click="updateBaseInfo($t(`my.editPassword`))"
                  >{{ $t(`my.update`) }}</el-button
                >
              </div>
              <div
                class="list"
                style="
                  display: flex;
                  justify-content: space-between;
                  border-bottom: 1px solid #dedede;
                  padding: 10px;
                "
              >
                <div class="list-item">
                  <div class="title" style="padding: 5px; font-size: 20px">
                    {{ $t(`my.phone`) }}
                  </div>
                  <div
                    class="describe"
                    style="padding: 5px; font-size: 15px; color: #409eff"
                  >
                    {{ $t(`my.phoneBound`) }}:{{ user.phone }}
                  </div>
                </div>
                <!-- <el-button
                  class="update"
                  style="margin: auto 10px"
                  type="text"
                  >{{ $t(`my.update`) }}</el-button
                > -->
                <el-button
                  class="update"
                  style="margin: auto 10px"
                  type="text"
                  @click="updateBaseInfo($t(`my.editPhone`))"
                  >{{ $t(`my.update`) }}</el-button
                >
              </div>
              <div
                class="list"
                style="
                  display: flex;
                  justify-content: space-between;
                  border-bottom: 1px solid #dedede;
                  padding: 10px;
                "
              >
                <div class="list-item">
                  <div class="title" style="padding: 5px; font-size: 20px">
                    {{ $t(`my.email`) }}
                  </div>
                  <div
                    class="describe"
                    style="padding: 5px; font-size: 15px; color: #409eff"
                  >
                    {{
                      user.email === null ? this.$t(`my.unbinding`) : user.email
                    }}
                  </div>
                </div>
                <!-- <el-button
                  class="update"
                  style="margin: auto 10px"
                  type="text"
                  @click="toPath({ path: '/info_screen/user/bindEmail' })"
                  >{{ $t(`my.bound`) }}</el-button
                > -->
                <el-button
                  class="update"
                  style="margin: auto 10px"
                  type="text"
                  @click="updateBaseInfo($t(`my.bindEmail`))"
                  >{{ $t(`my.bound`) }}</el-button
                >
              </div>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
    <!-- 个人设置修改弹窗 -->
    <el-dialog
      :title="editTitle"
      :visible.sync="editShow"
      width="30%"
      :destroy-on-close="true"
    >
      <!-- 密码 -->
      <div v-if="editTitle == $t(`my.editPassword`)">
        <el-form :model="editForm" :rules="rules" ref="editForm" size="mini">
          <el-form-item :label="$t(`my.originalPassword`)" prop="oldPass">
            <el-input v-model="editForm.oldPass"></el-input>
          </el-form-item>
          <el-form-item :label="$t(`my.newPassword`)" prop="newPass">
            <el-input v-model="editForm.newPass"></el-input>
          </el-form-item>
          <el-form-item :label="$t(`my.duplicatePassword`)" prop="confirmPass">
            <el-input v-model="editForm.confirmPass"></el-input>
          </el-form-item>
        </el-form>
        <div
          slot="footer"
          class="dialog-footer"
          style="display: flex; justify-content: flex-end"
        >
          <el-button @click="editShow = false">{{ $t(`my.cancel`) }}</el-button>
          <el-button type="primary" @click="submitForm('editForm')">{{
            $t(`my.submit`)
          }}</el-button>
        </div>
      </div>
      <!-- 电话 -->
      <div v-if="editTitle == $t(`my.editPhone`)">
        <el-form :model="editForm" :rules="rules" ref="editForm" size="mini">
          <el-form-item :label="$t(`my.phoneInfo`)" prop="phone">
            <el-input v-model="editForm.phone"></el-input>
          </el-form-item>
        </el-form>
        <div
          slot="footer"
          class="dialog-footer"
          style="display: flex; justify-content: flex-end"
        >
          <el-button @click="editShow = false">{{ $t(`my.cancel`) }}</el-button>
          <el-button type="primary" @click="submitFormPhone('editForm')">{{
            $t(`my.submit`)
          }}</el-button>
        </div>
      </div>
      <!-- 邮箱  -->
      <div v-if="editTitle == $t(`my.bindEmail`)">
        <el-form :model="editForm" :rules="rules" ref="editForm" size="mini">
          <el-form-item :label="$t(`my.emailInfo`)" prop="email">
            <el-input v-model="editForm.email"></el-input>
          </el-form-item>
          <el-form-item
            :label="$t(`my.VerificationCodeInfo`)"
            prop="VerificationCode"
          >
            <el-input v-model="editForm.VerificationCode"></el-input>
          </el-form-item>
        </el-form>
        <div
          slot="footer"
          class="dialog-footer"
          style="display: flex; justify-content: flex-end"
        >
          <el-button @click="editShow = false">{{ $t(`my.cancel`) }}</el-button>
          <el-button type="primary" @click="submitFormEmail('editForm')">{{
            $t(`my.submit`)
          }}</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';
import { updateBase, getUserInfo, updatePassword } from "@/api/user";
export default {
  // import引入的组件需要注入到对象中才能使用
  components: {},
  name: "userSetting",
  //props: {
  //  handA: {
  //    type: String,
  //    required: true
  //    default: '100'
  //  }
  //},
  data() {
    // 这里存放数据
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.editForm.newPass) {
        callback(new Error(this.$t(`my.comfirmPassInfo`)));
      } else {
        callback();
      }
    };
    return {
      base_api: process.env.VUE_APP_BASE_API,
      userForm: {
        username: "",
        phone: "",
        avatar: "",
      },
      user: {},
      editShow: false,
      editTitle: "",
      editForm: {
        oldPass: "",
        phone: "",
        email: "",
        newPass: "",
        confirmPass: "",
        VerificationCode: "",
      },
    };
  },
  // 监听属性 类似于data概念
  computed: {
    //   表单验证
    rules() {
      var validatePass = (rule, value, callback) => {
        if (value === "") {
          callback(new Error("请再次输入密码"));
        } else if (value !== this.editForm.newPass) {
          callback(new Error(this.$t(`my.comfirmPassInfo`)));
        } else {
          callback();
        }
      };
      return {
        oldPass: [
          // { validator: validateOldPass, trigger: "blur" },
          {
            required: true,
            message: this.$t(`my.oldPassInfo`),
            trigger: "blur",
          },
        ],
        phone: [
          {
            required: true,
            message: this.$t(`my.phoneInfo`),
            trigger: "blur",
          },
        ],
        email: [
          {
            required: true,
            message: this.$t(`my.emailInfo`),
            trigger: "blur",
          },
        ],
        VerificationCode: [
          {
            required: true,
            message: this.$t(`my.VerificationCodeInfo`),
            trigger: "blur",
          },
        ],
        newPass: [
          {
            required: true,
            message: this.$t(`my.newPassInfo`),
            trigger: "blur",
          },
        ],
        confirmPass: [
          {
            required: true,
            message: this.$t(`my.comfirmPassInfo`),
            trigger: "blur",
          },
          { validator: validatePass, trigger: "blur" },
        ],
      };
    },
  },
  // 监控data中的数据变化
  watch: {},
  // 方法集合
  methods: {
    // 密码修改提交
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.editShow = false;
          const { data: res } = updatePassword(this.editForm);
          this.$message({
            type: res.code == 200 ? "success" : "error",
            message: res.msg,
          });
          if (res.code == 200) {
            localStorage.removeItem("token");
            this.$store.commit("SET_TOKEN", "");
            // this.$router.go(0)
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 手机号修改提交
    submitFormPhone(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
        } else {
          return false;
        }
      });
    },
    // 绑定邮箱
    submitFormEmail(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const { data: res } = bindEmail(
            this.editForm.email,
            this.editForm.VerificationCode
          );
          if (res.code == 200) {
            this.$message({
              type: "success",
              message: this.editForm.email + "绑定成功",
            });
            this.email = "";
            this.code = "";
            this.success = false;
          } else {
            this.$message({
              type: "error",
              message: this.editForm.email + "绑定失败",
            });
          }
        } else {
          return false;
        }
      });
    },
    updateBaseInfo(type) {
      for (let i in this.editForm) {
        this.editForm[i] = "";
      }
      this.editShow = true;
      this.editTitle = type;
      if (type == "password") {
        this.editTitle = "修改密码";
      }
      if (type == "phone") {
        this.editTitle = "修改电话";
      }
    },
    handleAvatarSuccess(res) {
      if (res.code == 200) {
        this.userForm.avatar = "\\" + res.data;
      }
    },
    async confirm() {
      console.log(this.userForm);
      const { data: res } = await updateBase(this.userForm);
      console.log(res);
      if (res.code == 200) {
        //update localstorage and state about username and avatar
        if (this.userForm.username != "") {
          localStorage.setItem("username", this.userForm.username);
          this.$store.commit("SET_USERNAME", this.userForm.username);
          localStorage.removeItem("token");
          this.$store.commit("SET_TOKEN", "");
        }
        if (this.userForm.avatar != "") {
          localStorage.setItem("avatar", this.userForm.avatar);
          this.$store.commit("SET_AVATAR", this.userForm.avatar);
        }
        this.$message({
          type: "success",
          message: "设置基本个人信息成功",
        });
        this.$router.go(0);
      }
    },
    toPath(path) {
      this.$router.push(path);
    },
    async getUserInfo() {
      const { data: res } = await getUserInfo();
      //console.log(res)
      if (res.code == 200) {
        this.user = res.data;
      }
    },
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    this.getUserInfo();
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
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
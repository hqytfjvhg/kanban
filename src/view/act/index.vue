<template>
  <!-- 此页面为手机投票页面 -->
  <div class="container" :style="height">
    <div class="top-box">
      <div class="logo">
        <img src="@/assets/actLogo.png" alt="" />
      </div>
      <div class="title">春茗节目评选</div>
    </div>
    <div class="ticket-bottom">
      <div style="width: 93%; border-radius: 2px; padding-top: 20px">
        <div class="ticket-box">
          <!-- 5个 -->
          <div class="ticket-content">
            <div class="ticket-item">
              <img
                src="https://linyi-oss.oss-cn-shenzhen.aliyuncs.com/1.jpg"
                alt=""
                @click="changeOne(1)"
              />
              <el-checkbox
                v-model="checkeds[0].checked"
                :disabled="checkeds[0].disabled"
                @change="handleCheckAllChange(1)"
                >不再犹豫</el-checkbox
              >
            </div>
            <div class="ticket-item">
              <img
                src="https://linyi-oss.oss-cn-shenzhen.aliyuncs.com/2.jpg"
                alt=""
                @click="changeOne(2)"
              />
              <el-checkbox
                v-model="checkeds[1].checked"
                :disabled="checkeds[1].disabled"
                @change="handleCheckAllChange(2)"
                >手扶拖拉机斯基很酷</el-checkbox
              >
            </div>
          </div>
          <div class="ticket-content">
            <div class="ticket-item">
              <img
                src="https://linyi-oss.oss-cn-shenzhen.aliyuncs.com/3.jpg"
                alt=""
                @click="changeOne(3)"
              />
              <el-checkbox
                v-model="checkeds[2].checked"
                :disabled="checkeds[2].disabled"
                @change="handleCheckAllChange(3)"
                >我爱上班</el-checkbox
              >
            </div>
            <div class="ticket-item">
              <img
                src="https://linyi-oss.oss-cn-shenzhen.aliyuncs.com/4.jpg"
                alt=""
                @click="changeOne(4)"
              />
              <el-checkbox
                v-model="checkeds[3].checked"
                :disabled="checkeds[3].disabled"
                @change="handleCheckAllChange(4)"
                >群英荟萃</el-checkbox
              >
            </div>
          </div>
          <!-- <div class="ticket-content">
                                                <div class="ticket-item">
                                                        <img src="https://linyi-oss.oss-cn-shenzhen.aliyuncs.com/5.jpg" alt="" @click="changeOne(5)">
                                                        <el-checkbox v-model="checkeds[4].checked" :disabled="checkeds[4].disabled" @change="handleCheckAllChange(5)">野狼Disco</el-checkbox>
                                                </div>
                                                <div class="ticket-item"></div>
                                        </div> -->
          <div class="bottom-button">
            <el-button
              type="primary"
              :disabled="disabled"
              @click="confirmResult"
              >立即提交</el-button
            >
          </div>
          <!-- 5个 -->
          <div class="ticket-tip">必选2个节目才可提交</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { toTicket, getStoId, getTeamId } from "@/api/act";
export default {
  data() {
    return {
      active: 1,
      disabled: true,
      checkeds: [
        {
          checked: false,
          disabled: false,
        },
        {
          checked: false,
          disabled: false,
        },
        {
          checked: false,
          disabled: false,
        },
        {
          checked: false,
          disabled: false,
        },
        {
          checked: false,
          disabled: false,
        },
      ],
      count: 0,
      height: 0,
      stoId: null,
    };
  },
  mounted() {
    console.log(2);
  },
  created() {
    document.title = "春茗节目投票";
    this.height = "height:" + (window.innerHeight + 50) + "px";
    this.getUuid();
  },
  methods: {
    getUuid() {
      getStoId().then((res) => {
        this.stoId = res.data.stoId;
      });
      getTeamId().then((res) => {
        if (res.code == 200) {
          if (res.data) {
            let data = JSON.parse(res.data);
            let count = 0;
            for (let a = 0; a < 5; a++) {
              count += data[a];
            }
            switch (count) {
              case 2:
                this.$router.push({ path: "/act/votedv2/index2" });
                break;
              case 3:
                this.$router.push({ path: "/act/votedv2/index3" });
                break;
              default:
                break;
            }
          }
        }
      });
    },
    changeOne(what) {
      if (!this.disabled && this.checkeds[what - 1].disabled) {
        return;
      }
      this.checkeds[what - 1].checked = !this.checkeds[what - 1].checked;
      this.count = 0;

      // 5个
      for (let a = 0; a < 5; a++) {
        if (this.checkeds[a].checked) {
          this.count++;
        }
      }
      if (this.count >= 2) {
        for (let a = 0; a < 5; a++) {
          if (!this.checkeds[a].checked) {
            this.checkeds[a].disabled = true;
          }
        }
        this.disabled = false;
      } else {
        for (let a = 0; a < 5; a++) {
          this.checkeds[a].disabled = false;
        }
        this.disabled = true;
      }
    },
    handleCheckAllChange(val) {
      this.count = 0;

      // 5个
      for (let a = 0; a < 5; a++) {
        if (this.checkeds[a].checked) {
          this.count++;
        }
      }
      console.log(this.count);
      if (this.count >= 2) {
        for (let a = 0; a < 5; a++) {
          if (!this.checkeds[a].checked) {
            this.checkeds[a].disabled = true;
          }
        }
        this.disabled = false;
      } else {
        for (let a = 0; a < 5; a++) {
          this.checkeds[a].disabled = false;
        }
        this.disabled = true;
      }
    },
    confirmResult() {
      // 2个的时候需要更改
      var that = this;
      let a = localStorage.getItem(that.stoId);
      if (a) {
        this.$message({
          type: "error",
          message: "每个用户每轮只能投一次，提交失败",
          iconClass: " ", // 这个会覆盖图标类名，为了实现去掉图标的操作
          customClass: "el-message--error", // 这个是由于上面设置了iconClass会覆盖掉type，所以需要再设置
        });
        return;
      }

      let data = [
        this.checkeds[0].checked ? 1 : 0,
        this.checkeds[1].checked ? 1 : 0,
        this.checkeds[2].checked ? 1 : 0,
        this.checkeds[3].checked ? 1 : 0,
        this.checkeds[4].checked ? 1 : 0,
      ];
      toTicket(data).then((res) => {
        if (res.code == 200) {
          if (!a) {
            localStorage.setItem(that.stoId, "fff");
          }
          this.$message({
            type: "success",
            message: "投票成功，感谢您的参与！",
            iconClass: " ", // 这个会覆盖图标类名，为了实现去掉图标的操作
            customClass: "el-message--success", // 这个是由于上面设置了iconClass会覆盖掉type，所以需要再设置
          });
        } else {
          this.$message({
            type: "error",
            message: res.respMsg,
            iconClass: " ", // 这个会覆盖图标类名，为了实现去掉图标的操作
            customClass: "el-message--error", // 这个是由于上面设置了iconClass会覆盖掉type，所以需要再设置
          });
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
html {
  background: #272f3e !important;
}

.container {
  font-family: "微软雅黑";
  background: #272f3e;
  width: 100%;
  height: 100vh;
  padding: 20px 0;

  .ticket-bottom {
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 2px;
    padding: 0.8rem 0 0;
    width: 100%;

    .ticket-box {
      display: flex;
      flex-direction: column;
      align-items: center;

      .ticket-content {
        width: 100%;
        display: flex;
        justify-content: space-around;
        margin-bottom: 20px;

        .ticket-item {
          width: 46%;
          display: flex;
          flex-direction: column;

          img {
            width: 100%;
            height: 130px;
            margin-bottom: 5px;
            border-radius: 8px;
          }

          .el-checkbox {
            color: white;
          }
        }
      }

      .ticket-tip {
        color: white;
        font-weight: bold;
        font-size: 1rem;
        margin: 10px 0 20px;
      }
    }
  }

  .top-box {
    display: flex;
    align-items: center;
    justify-content: center;
    padding-top: 0.5rem;
  }

  .logo {
    margin-right: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 2px 3px;

    img {
      width: 60px;
    }
  }

  .title {
    font-size: 2rem;
    font-weight: bold;
    color: #f9e2af;
    font-family: "Franklin Gothic Medium";
  }

  .tip-box {
    display: flex;
    align-items: center;
    margin-top: 1.2rem;

    .line {
      background-color: #ffe3b4;
      height: 1px;
      width: 3rem;
    }

    .tip-content {
      color: #ffe3b4;
      font-weight: bold;
      margin: 0 1rem;
      font-size: 1.2rem;
      font-family: "Courier New", Courier, monospace;
    }
  }
}
</style>

<template>
  <!-- 用于控制几只队伍的评选 -->
  <div class="container" :style="height">
    <div class="top-box">
      <div class="logo">
        <img src="@/assets/actLogo.png" alt="" />
      </div>
      <div class="title">选择哪几队评选</div>
    </div>
    <div class="ticket-bottom">
      <div style="width: 93%; border-radius: 2px; padding-top: 20px">
        <div class="ticket-box">
          <!-- '不再犹豫', '手扶拖拉机\n斯基很酷', '我爱上班', '群英荟萃' -->
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
                >不再犹豫 ：{{ recode[0] }}票</el-checkbox
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
                >手扶拖拉机斯基很酷 ：{{ recode[1] }}票</el-checkbox
              >
            </div>
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
                >我爱上班 ：{{ recode[2] }}票</el-checkbox
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
                >群英荟萃 ：{{ recode[3] }}票</el-checkbox
              >
            </div>
            <!-- <div class="ticket-item">
                                                        <img src="https://linyi-oss.oss-cn-shenzhen.aliyuncs.com/5.jpg" alt="" @click="changeOne(5)">
                                                        <el-checkbox v-model="checkeds[4].checked" :disabled="checkeds[4].disabled" @change="handleCheckAllChange(5)">群英荟萃 ：{{ recode[4] }}票</el-checkbox>
                                                </div> -->
          </div>
          <div class="bottom-button">
            <el-button
              type="primary"
              :disabled="disabled"
              @click="confirmResult"
              >立即提交</el-button
            >
          </div>
          <div style="color: white; margin-top: 13px" v-if="choices">
            当前选择的是{{ choices }}
          </div>
          <div class="bottom-button" v-if="choices">
            <el-button type="primary" :disabled="disabled" @click="toTick"
              >前往投票</el-button
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { setTeamId, getTicketResult, reBoot } from "@/api/act";
export default {
  data() {
    return {
      active: 1,
      disabled: false,
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
      a: 0,
      b: 0,
      c: 0,
      choices: "",
      teams: [],
      type: 0,
      firstLabel: ["不再犹豫", "手扶拖拉机斯基很酷", "我爱上班", "群英荟萃"],
      recode: [],
    };
  },
  created() {
    document.title = "春茗节目投票";
    this.height = "height:" + window.innerHeight + "px";
    this.getResult();
  },
  methods: {
    // 获取名次
    getPlace(score) {
      let min = score.reduce((a, b) => (a < b ? b : a));
    },
    async getResult() {
      let res = await getTicketResult();
      if (res.code == 200) {
        let arr = res.data;
        let data = [];
        data[0] = arr[1];
        data[1] = arr[2];
        data[2] = arr[3];
        data[3] = arr[4];
        data[4] = arr[5];
        this.recode = data;
        this.getPlace(data);
      }
    },
    async toTick() {
      var that = this;
      if (that.type == 2) {
        that.$router.push({
          path: "/act/votedv2/result2",
          query: {
            teams: that.teams,
          },
        });
      } else {
        that.$router.push({
          path: "/act/votedv2/result3",
          query: {
            teams: that.teams,
          },
        });
      }
    },
    changeOne(what) {
      this.checkeds[what - 1].checked = !this.checkeds[what - 1].checked;
    },
    handleCheckAllChange() {},
    confirmResult() {
      var that = this;
      let data = [];
      let choices = "";
      that.type = 0;
      for (let a = 0; a < 5; a++) {
        data.push(that.checkeds[a].checked ? 1 : 0);
        if (that.checkeds[a].checked) {
          choices += " - " + that.firstLabel[a] + "，";
          that.type += 1;
        }
      }
      setTeamId(data).then((res) => {
        if (res.code == 200) {
          this.$message({
            type: "success",
            message: "选择成功！",
          });
          that.choices = choices;
          that.teams = data;
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  font-family: "微软雅黑";
  background: #272f3e;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 20px 0;

  .ticket-bottom {
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 2px;
    padding: 1rem 0 0;
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
          width: 15%;
          display: flex;
          flex-direction: column;

          img {
            width: 100%;
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
    margin-top: 0.5rem;
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

  .bottom-button {
    margin-top: 50px;
  }
}
</style>

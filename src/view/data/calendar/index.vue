<!--
* @description  参数1
* @fileName  calendar
* @author Arvin
* @date 2022-11-22 09:38:52
* @version V1.0.0
!-->

<template>
  <div id="calendar" class="calendar-container" style="padding-bottom: 50px">
    <pageHeader
      :title="$t(`vacation.pageTitle`)"
      :describe="$t(`vacation.pageDesc`)"
    ></pageHeader>
    <!-- <div class="new-create">
      <el-button type="primary" size="mini" style="" @click="visible1 = true">
        <i class="el-icon-view" style="font-size: 0.8rem;"> see</i>
      </el-button>
    </div> -->
    <el-button
      type="warning"
      circle
      @click="visible1 = true"
      style="
        position: absolute;
        bottom: 5rem;
        right: 6rem;
        z-index: 99;
        width: 3rem;
        height: 3rem;
      "
    ></el-button>

    <el-calendar class="calendar">
      <template slot="dateCell" slot-scope="{ date, data }">
        <div @click.stop="handleBianJi(data.day)">
          <p :class="rqi.indexOf(data.day) > -1 ? 'is-selected' : ''">
            {{ data.day.split("-").slice(1).join("-") }}
            <template v-if="rqi.indexOf(data.day) > -1">
              <div
                v-for="(item, index) in rqineirong[data.day]"
                :key="index"
                style="display: flex; margin: 0.3rem"
              >
                <el-tooltip
                  class="item"
                  effect="dark"
                  :content="$t(`vacation.clickDelete`)"
                  placement="top-start"
                >
                  <!-- cn -->
                  <div
                    v-if="item.area === 'China'"
                    @click.stop="deleteConnection(item)"
                    class="holiday-tip"
                    style="background: #f2ff00"
                  ></div>
                  <!-- uk -->
                  <div
                    v-if="item.color === 'green'"
                    @click.stop="deleteConnection(item)"
                    class="holiday-tip"
                    style="background: #4285f4"
                  ></div>
                  <!-- us -->
                  <div
                    v-if="item.color === 'blue'"
                    @click.stop="deleteConnection(item)"
                    class="holiday-tip"
                    style="background: #b5b5b5"
                  ></div>
                  <div
                    v-if="item.color === 'yellow'"
                    @click.stop="deleteConnection(item)"
                    class="holiday-tip"
                    style="background: #ecc94b"
                  ></div>
                  <div
                    v-if="item.area === 'CN working day'"
                    @click.stop="deleteConnection(item)"
                    class="holiday-tip"
                    style="background: #ea4335"
                  ></div>
                </el-tooltip>
                <div
                  style="
                    font-size: 1rem;
                    width: 100%;
                    font-family: Arial, Helvetica, sans-serif;
                  "
                >
                  {{ item.area }} : {{ item.type }}
                </div>
              </div>
            </template>
          </p>
        </div>
      </template>
    </el-calendar>
    <!-- 新增假期 -->
    <el-dialog
      :title="dialog.title"
      :visible.sync="dialog.visible"
      width="500px"
      :destroy-on-close="true"
    >
      <el-form
        :model="addForm"
        label-width="100px"
        ref="addForm"
        :rules="rules"
      >
        <el-form-item :label="$t(`vacation.date`)" prop="vacationDate">
          <el-date-picker
            v-model="addForm.vacationDate"
            type="daterange"
            :placeholder="$t(`vacation.datePlaceholder`)"
            value-format="yyyy-MM-dd"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item :label="$t(`vacation.region`)" prop="area">
          <el-select
            v-model="addForm.area"
            :placeholder="$t(`vacation.regionPlaceholder`)"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t(`vacation.name`)" prop="type">
          <el-input
            v-model="addForm.type"
            style="width: 15rem"
            :placeholder="$t(`vacation.namePlaceholder`)"
          ></el-input>
        </el-form-item>
        <!-- <el-form-item :label="$t(`vacation.isWork`)" prop="isWork">
          <el-radio v-model="addForm.isWork" label="true">{{
            $t(`vacation.yes`)
          }}</el-radio>
          <el-radio v-model="addForm.isWork" label="false">{{
            $t(`vacation.no`)
          }}</el-radio>
        </el-form-item> -->
        <el-form-item>
          <!-- <el-button type="primary" @click="addDate" size="mini"
            >{{$t(`clock.confirm`)}}</el-button
          > -->
          <div>
            <span slot="footer" class="dialog-footer">
              <el-button @click="dialog.visible = false" size="small">{{
                $t(`clock.cancel`)
              }}</el-button>
              <el-button
                type="primary"
                @click="addDate('addForm')"
                size="small"
                >{{ $t(`clock.confirm`) }}</el-button
              >
            </span>
          </div>
        </el-form-item>
      </el-form>
    </el-dialog>

    <el-dialog title="Holidays" :visible.sync="visible1" width="35%">
      <NationalHoliday :rem="rem" :holidays="holidays"> </NationalHoliday>
    </el-dialog>
  </div>
</template>

<script>
import {
  addVacationDate,
  deleteVacationConnection,
  getVocationDates,
  getAreaVocations,
} from "@/api/vocation";
import NationalHoliday from "@/view/screen/components/NationalHolidays/index.vue";
import pageHeader from "@/components/pageHeader/index.vue";
export default {
  name: "data-calendar",
  data() {
    return {
      base_api: process.env.VUE_APP_BASE_API,
      vocationDates: [],
      queryForm: {},
      conditionsFields: [], // 记录参与筛选的列信息
      page: {
        pageSize: 10,
        pageNum: 1,
        total: 1000,
        queryCondition: {
          area: "",
          startTime: "",
          endTime: "",
        },
      },
      dialog: {
        title: this.$t(`vacation.addTitle`),
        visible: false,
      },
      addForm: {
        date: "",
        type: "",
        area: "",
        vacationDate: [],
        // isWork: null,
      },
      options: [
        {
          value: "CN working day",
          label: "CN working day",
        },
        {
          value: "China",
          label: "China",
        },
        {
          value: "US",
          label: "US",
        },
        {
          value: "UK",
          label: "UK",
        },
        // {
        //   value: "Poland",
        //   label: "Poland",
        // },
      ],
      form: [],
      rqi: [],
      rqineirong: {},
      allVocations: [],
      visible1: false,
      holidays: [],
      rem: "",
    };
  },
  created() {
    // 实例被创建之后执行代码
  },
  computed: {
    // 计算属性
    rules() {
      return {
        area: [
          {
            required: true,
            message: this.$t(`vacation.regionPlaceholder`),
            trigger: "blur",
          },
        ],
        type: [
          {
            required: true,
            message: this.$t(`vacation.namePlaceholder`),
            trigger: "blur",
          },
        ],
        // isWork: [
        //   {
        //     required: true,
        //     message: this.$t(`vacation.namePlaceholder`),
        //     trigger: "change",
        //   },
        // ],
      };
    },
  },
  components: {
    // 组件的引用
    pageHeader,
    NationalHoliday,
  },
  methods: {
    // 方法
    openDialog() {
      this.dialog.title = this.$t(`vacation.addTitle`);
      this.dialog.visible = !this.dialog.visible;
      (this.addForm = {
        date: "",
        type: "",
        area: "",
        vacationDate: [],
      }),
        // for (let i in this.addForm) {
        //   this.addForm[i] = "";
        // }
        this.$nextTick(() => {
          this.$refs.addForm.clearValidate();
        });
    },
    //提交
    addDate(addForm) {
      console.log(this.addForm, addForm, "shuju1");
      let formData = JSON.parse(JSON.stringify(this.addForm));
      if (formData.vacationDate[0] === formData.vacationDate[1]) {
        formData.vacationDate = formData.vacationDate[0];
        this.addVacation(formData);
      } else {
        const start = new Date(formData.vacationDate[0]);
        const end = new Date(formData.vacationDate[1]);
        // let dates = [];
        while (start <= end) {
          // 将日期格式化为 YYYY-MM-DD 形式
          const formattedDate = start.toISOString().split("T")[0];
          formData.vacationDate = formattedDate;
          this.addVacation(formData);
          // dates.push(formattedDate);
          // 增加一天
          start.setDate(start.getDate() + 1);
        }

        // console.log(dates, "日期");
      }

      // this.$refs[addForm].validate((valid) => {
      //   if (valid) {
      //     addVacationDate(this.addForm).then((res) => {
      //       if (res.data.code == 200) {
      //         this.$message({
      //           type: "success",
      //           message: this.$t(`clock.operationOK`),
      //         });
      //         this.dialog.visible = !this.dialog.visible;
      //         this.getAllVocations().then(() => {
      //           this.rqi = [];
      //           this.rqineirong = [];
      //           for (var i = 0; i < this.allVocations.length; i++) {
      //             if (this.rqi.indexOf(this.allVocations[i]) === -1) {
      //               this.rqi.push(this.allVocations[i].vacationDate);
      //               if (
      //                 this.rqineirong[this.allVocations[i].vacationDate] ===
      //                 undefined
      //               ) {
      //                 this.rqineirong[this.allVocations[i].vacationDate] = [];
      //                 this.rqineirong[this.allVocations[i].vacationDate].push(
      //                   this.allVocations[i]
      //                 );
      //               } else {
      //                 this.rqineirong[this.allVocations[i].vacationDate].push(
      //                   this.allVocations[i]
      //                 );
      //               }
      //             }
      //           }
      //         });
      //         for (let i in this.addForm) {
      //           this.addForm[i] = "";
      //         }
      //         this.getAreaVocations();
      //       } else {
      //         this.$message({
      //           type: "warning",
      //           message: "Add vacation fail.Maybe it already exists !",
      //         });
      //       }
      //     });
      //   }
      // });
    },
    //提交假期的请求
    addVacation(data) {
      this.$refs.addForm.validate((valid) => {
        if (valid) {
          addVacationDate(data).then((res) => {
            if (res.data.code == 200) {
              this.$message({
                type: "success",
                message: this.$t(`clock.operationOK`),
              });
              this.dialog.visible = false;
              this.getAllVocations().then(() => {
                this.rqi = [];
                this.rqineirong = [];
                for (var i = 0; i < this.allVocations.length; i++) {
                  if (this.rqi.indexOf(this.allVocations[i]) === -1) {
                    this.rqi.push(this.allVocations[i].vacationDate);
                    if (
                      this.rqineirong[this.allVocations[i].vacationDate] ===
                      undefined
                    ) {
                      this.rqineirong[this.allVocations[i].vacationDate] = [];
                      this.rqineirong[this.allVocations[i].vacationDate].push(
                        this.allVocations[i]
                      );
                    } else {
                      this.rqineirong[this.allVocations[i].vacationDate].push(
                        this.allVocations[i]
                      );
                    }
                  }
                }
              });
              // for (let i in this.addForm) {
              //   this.addForm[i] = "";
              // }
              this.addForm = {
                date: "",
                type: "",
                area: "",
                vacationDate: [],
              };
              this.getAreaVocations();
            } else {
              this.$message({
                type: "warning",
                message: "Add vacation fail.Maybe it already exists !",
              });
            }
          });
        }
      });
    },

    deleteConnection(row) {
      this.$confirm(this.$t(`award.deleteTips`), this.$t(`award.tips`), {
        confirmButtonText: this.$t(`award.confirm`),
        cancelButtonText: this.$t(`award.cancel`),
        type: "warning",
      })
        .then(async () => {
          const { data: res } = await deleteVacationConnection(
            row.vacationTypeId,
            row.vacationDateId
          );
          if (res.code == 200) {
            this.$message({
              type: "success",
              message: this.$t(`clock.operationOK`),
            });
            this.getAllVocations().then(() => {
              this.rqi = [];
              this.rqineirong = [];
              for (var i = 0; i < this.allVocations.length; i++) {
                if (this.rqi.indexOf(this.allVocations[i]) === -1) {
                  this.rqi.push(this.allVocations[i].vacationDate);
                  if (
                    this.rqineirong[this.allVocations[i].vacationDate] ===
                    undefined
                  ) {
                    this.rqineirong[this.allVocations[i].vacationDate] = [];
                    this.rqineirong[this.allVocations[i].vacationDate].push(
                      this.allVocations[i]
                    );
                  } else {
                    this.rqineirong[this.allVocations[i].vacationDate].push(
                      this.allVocations[i]
                    );
                  }
                }
              }
              // console.log(this.rqi);
              // console.log(this.rqineirong);
            });
            this.getAreaVocations();
          } else {
            this.$message({
              type: "warning",
              message: "delete record fail!",
            });
          }
        })
        .catch((e) => {
          console.log(e);
        });
    },
    async getAllVocations() {
      const { data: res } = await getVocationDates();
      if (res.code == 200) {
        this.allVocations = res.data;
      }
    },
    handleBianJi(day) {
      this.openDialog();
      this.addForm.vacationDate = [day, day];
    },
    async getAreaVocations() {
      const { data: res } = await getAreaVocations();
      if (res.code == 200) {
        console.log("areaVocations", res.data);
        this.holidays = res.data;
        this.holidays.push({
          key: "vocation",
          highlight: "pink",
          dates: new Date(),
        });
      } else {
        this.$message({
          type: "warning",
          message: res.msg,
        });
      }
    },
    getHeight() {
      console.log("获取宽高");
      var htmlEle = document.documentElement;
      var winWidth = htmlEle.clientWidth || document.body.clientWidth;
      const rem = Math.ceil(winWidth / 115);
      //document.documentElement.style.fontSize = rem + 'px'
      this.rem = rem + "px";
      console.log(rem);
    },
  },
  mounted() {
    // 页面进入时加载内容
    this.getAllVocations().then(() => {
      for (var i = 0; i < this.allVocations.length; i++) {
        if (this.rqi.indexOf(this.allVocations[i]) === -1) {
          this.rqi.push(this.allVocations[i].vacationDate);
          if (
            this.rqineirong[this.allVocations[i].vacationDate] === undefined
          ) {
            this.rqineirong[this.allVocations[i].vacationDate] = [];
            this.rqineirong[this.allVocations[i].vacationDate].push(
              this.allVocations[i]
            );
          } else {
            this.rqineirong[this.allVocations[i].vacationDate].push(
              this.allVocations[i]
            );
          }
        }
      }
    });
    this.getAreaVocations();
    this.getHeight();
  },
  watch: {
    // 监测变化
  },
};
</script>
<style lang="scss" scoped>
.calendar-container {
  padding: 0 0.6rem 1rem 0.6rem;

  .new-create {
    display: flex;
    padding-bottom: 20px;

    .create-button {
      margin-right: 15px;
    }
  }
}

.el-pagination {
  padding: 20px 0;
}

.el-card ::v-deep .el-card__header {
  border: none;
}

.el-table ::v-deep .el-table__cell {
  padding: 6px 0;
}

.Calendarselect {
  top: 61px;
  position: relative;
  text-align: right;
  padding-right: 16px;
}

.holiday-tip {
  display: inline-block;
  position: relative;
  width: 0.8rem;
  height: 0.8rem;
  // border-radius: 50%;
  margin-right: 0.5rem;
}

// .holiday-tip .tip-text {
//         background-color: #ccc;
//         width:120px;
//         position: absolute;
//         left: 14px;
//         top: 5px;
//         display: none;
//   }

.holiday-tip:hover {
  background-color: aqua;
}

// .holiday-tip:hover .tip-text{
//   display: inline-block;
// }

.calendar ::v-deep .el-calendar-table .el-calendar-day {
  // width: 13rem;
  height: 7rem;
}
</style>

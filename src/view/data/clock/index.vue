<template>
  <div id="clocks" class="clocks-contain">
    <pageHeader
      :title="$t(`clock.title`)"
      :describe="$t(`clock.desc`)"
    ></pageHeader>
    <div style="margin-left: 1rem">
      <el-form :inline="true" :model="form" size="mini" class="form-box">
        <el-form-item :label="$t(`clock.screen`)">
          <el-input
            v-model="condition.screen"
            clearable
            :placeholder="$t(`clock.screenPlaceholder`)"
            aria-autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item :label="$t(`clock.area`)" style="margin-right: 15px">
          <el-input
            type="text"
            v-model="condition.area"
            clearable
            :placeholder="$t(`clock.areaPlaceholder`)"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            icon="el-icon-search"
            type="primary"
            @click="submitToQuery"
            >{{ $t(`clock.query`) }}</el-button
          >
        </el-form-item>
        <el-form-item style="margin-left: 5px">
          <el-button
            icon="el-icon-search"
            type="primary"
            @click="seeMembersList"
            >{{ $t(`clock.seeAllMembers`) }}</el-button
          >
        </el-form-item>
      </el-form>
    </div>
    <el-table
      :data="clocks"
      style="width: 100%"
      border
      :row-class-name="tableRowClassName"
      stripe
    >
      <el-table-column
        prop="id"
        label="id"
        width="60"
        align="center"
      ></el-table-column>
      <el-table-column prop="screen" :label="$t(`clock.screen`)" align="center">
        <template slot-scope="scope">
          {{
            scope.row.screenId == 1
              ? "company"
              : scope.row.screenId == 2
              ? "marketing"
              : "sts"
          }}
        </template>
      </el-table-column>
      <el-table-column
        prop="clockArea"
        :label="$t(`clock.area`)"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="clockTimezone"
        :label="$t(`clock.timezone`)"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="timeFormat"
        :label="$t(`clock.timeFormat`)"
        align="center"
      ></el-table-column>
      <el-table-column
        :label="$t(`clock.operation`)"
        align="center"
        width="330"
      >
        <template slot-scope="scope">
          <!-- <el-button
            type="primary"
            round
            size="mini"
            @click="toSeeTeam(scope.row.id)"
            >{{ $t(`clock.see`) }}</el-button
          >
          <el-button
            type="warning"
            round
            size="mini"
            icon="el-icon-refresh-right"
            @click="toUpdate(scope.row)"
            >{{ $t(`clock.update`) }}</el-button
          > -->
          <div style="display: flex; justify-content: center; cursor: pointer">
            <div @click="toSeeTeam(scope.row.id)" style="color: #409eff">
              <span>{{ $t(`clock.see`) }}</span>
            </div>
            <div
              @click="toUpdate(scope.row)"
              style="color: #409eff; margin-left: 10px"
            >
              <span>{{ $t(`clock.update`) }}</span>
            </div>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <!-- <el-dialog :title="transferDialogTitle" :visible.sync="dialogVisible">
            <el-transfer v-model="value" :data="data" :key="currentClockId"
                :titles="transferTitle" :button-texts="buttonTexts"></el-transfer>
            <div class="button-box">
                <el-button type="primary" @click="update" size="mini">confirm</el-button>
                <el-button @click="dialogVisible = false" size="mini">cancel</el-button>
            </div>
        </el-dialog> -->

    <el-dialog
      :title="title"
      :visible="updateFormVisible"
      @close="updateFormVisible = false"
    >
      <UpdateForm
        :form="updateForm"
        @fatherMethod="closeUpdateForm"
      ></UpdateForm>
    </el-dialog>

    <el-dialog
      :title="$t(`clock.updateTeam`)"
      :visible.sync="teamVisible"
      width="75%"
    >
      <teamVue v-bind:clockId="teamClockId" :key="teamClockId"></teamVue>
    </el-dialog>

    <el-drawer
      :title="$t(`clock.teamInfo`)"
      :visible.sync="drawer"
      direction="rtl"
      size="70%"
    >
      <teamVue v-bind:clockId="teamClockId" :key="teamClockId"></teamVue>
    </el-drawer>

    <el-dialog
      :title="$t(`clock.memberList`)"
      :visible.sync="membersVisible"
      width="75%"
      :destroy-on-close="true"
    >
      <memberList></memberList>
    </el-dialog>
  </div>
</template>

<script>
// import { vueClock } from 'vue-clock-lonlyape'
import { getClockListByScreenId, getAllClock } from "@/api/clock";
import { batchUpdateStatu } from "@/api/member";
import teamVue from "./team.vue";
import memberList from "./components/members.vue";
import UpdateForm from "./updateForm.vue";
// import FilterHeader from '@/components/FilterHeader'
import pageHeader from "@/components/pageHeader/index.vue";
export default {
  name: "clockList",
  props: [],
  data() {
    return {
      clocks: [],
      tableDataCopy: {}, // 深度拷贝的tableData对象，用来筛选数据
      conditionsFields: [], // 记录参与筛选的列信息
      screenId: 1,
      dialogVisible: false,
      teamVisible: false,
      currentClockId: 1, //当前被选择更新团队成员的所在时钟clockId
      currentMembers: [],
      data: [],
      value: [],
      firstValue: [], //最初状态为true的列表
      teamClockId: 2,
      drawer: false,
      condition: {
        area: "",
        screen: "",
      },
      transferTitle: ["隐藏列表", "显示列表"],
      buttonTexts: ["隐藏", "显示"],
      form: {},
      transferDialogTitle: "",
      membersVisible: false,
      updateFormVisible: false,
      updateForm: {},
      title: "",
    };
  },
  created() {
    // 实例被创建之后执行代码
  },
  computed: {
    //取fistValue 与 value 并集 - 交集
    memberIdList() {
      //取并集
      const list1 = this.firstValue
        .concat(this.value)
        .filter((elem, index, Array) => {
          return index === Array.indexOf(elem);
        });
      //取交集
      const list2 = this.firstValue.filter((v) => this.value.indexOf(v) != -1);
      const list3 = list1.filter((v) => list2.indexOf(v) == -1);
      console.log(list3);
      return list3;
    },
  },
  components: {
    // 组件的引用
    // FilterHeader,
    teamVue,
    memberList,
    UpdateForm,
    pageHeader,
  },
  methods: {
    // 方法
    tableRowClassName() {
      // console.log("rowIndex", rowIndex)
      // if (rowIndex === 1) {
      return "warning-row1";
      // } else if (rowIndex === 3) {
      //     return 'success-row';
      // }
      // return '';
    },
    toSeeTeam(clockId) {
      console.log(clockId);
      this.teamClockId = clockId;
      this.drawer = true;
    },
    async toUpdate(row) {
      // console.log(row.clockId)
      // this.currentClockId = row.clockId
      // this.transferDialogTitle = (row.screenId == 1 ? 'company' : (row.screenId == 2 ? 'marketing' : 'sts'))  + " : " +  row.clockArea
      // const { data: res } = await getMembersByClockId(row.clockId)
      // console.log(res.data)
      // if (res.code == 200) {
      //     this.currentMembers = res.data
      //     this.generateData()
      // }
      // this.dialogVisible = true
      this.updateFormVisible = true;
      this.updateForm = row;
    },
    closeUpdateForm() {
      //this.getComplaints()
      this.updateFormVisible = false;
    },
    async update() {
      console.log(this.memberIdList);
      console.log(this.currentClockId);

      const { data: res } = await batchUpdateStatu(
        this.currentClockId,
        this.memberIdList
      );

      if (res.code == 200) {
        this.$message({
          type: "success",
          message: this.$t(`clock.operationOK`),
        });
      } else {
        this.$message({
          type: "warning",
          message: res.msg,
        });
      }

      this.dialogVisible = false;
    },
    generateData() {
      this.data = [];
      this.value = [];
      this.firstValue = [];
      console.log(this.currentMembers.length);
      for (let i = 0; i < this.currentMembers.length; i++) {
        console.log(this.currentMembers[i]);
        this.data.push({
          key: this.currentMembers[i].memberId,
          label: this.currentMembers[i].memberName,
        });
        if (this.currentMembers[i].statu) {
          this.value.push(this.currentMembers[i].memberId);
          this.firstValue.push(this.currentMembers[i].memberId);
        }
      }
    },
    tableFilter(data, reset) {
      let flag = true; // 判断条件里有没有该列，用来判断是新增还是更新
      let filterData = this.tableDataCopy; // 最终过滤信息
      if (!reset) {
        // 参与筛选的列信息，有则更新
        this.conditionsFields.forEach((item) => {
          if (item.fieldName === data.fieldName) {
            item.conditions = data.conditions;
            flag = false;
          }
        });
        // 没有则添加
        if (flag) {
          this.conditionsFields.push(data);
        }
      }
      // 遍历所有筛选条件进行过滤
      this.conditionsFields.filter((fields, index) => {
        console.log(index);
        filterData = filterData.filter((item) => {
          // 文本
          if (fields.filterType === "text" && fields.conditions.text !== "") {
            return (
              item[fields.fieldName] &&
              item[fields.fieldName].indexOf(fields.conditions.text) > -1
            );
            // 复选框
          } else if (
            fields.filterType === "checkbox" &&
            fields.conditions.checkbox.length !== 0
          ) {
            return fields.conditions.checkbox.includes(item[fields.fieldName]);
            // 单选按钮
          } else if (
            fields.filterType === "radio" &&
            fields.conditions.radio !== ""
          ) {
            return (
              item[fields.fieldName] !== null &&
              item[fields.fieldName].toString() ===
                fields.conditions.radio.toString()
            );
            // 日期
          } else if (
            fields.filterType === "date" &&
            (fields.conditions.date1 || fields.conditions.date2)
          ) {
            if (!fields.conditions.date1) {
              return item[fields.fieldName] <= fields.conditions.date2;
            } else if (!fields.conditions.date2) {
              return item[fields.fieldName] >= fields.conditions.date1;
            } else {
              return (
                item[fields.fieldName] >= fields.conditions.date1 &&
                item[fields.fieldName] <= fields.conditions.date2
              );
            }
            // 数值
          } else if (
            fields.filterType === "number" &&
            (fields.conditions.number1 || fields.conditions.number2)
          ) {
            if (!fields.conditions.number1) {
              return item[fields.fieldName] <= fields.conditions.number2;
            } else if (!fields.conditions.number2) {
              return item[fields.fieldName] >= fields.conditions.number1;
            } else {
              return (
                item[fields.fieldName] >= fields.conditions.number1 &&
                item[fields.fieldName] <= fields.conditions.number2
              );
            }
          } else {
            // 遍历完没找到符合条件的，则直接返回
            return item;
          }
        });
      });
      this.clocks = this.$set(this, "clocks", filterData);
    },
    async tableFilterReset(data) {
      // 清空当前列筛选条件
      this.conditionsFields.forEach((item, index) => {
        if (item.fieldName === data.fieldName) {
          this.conditionsFields.splice(index, 1);
        }
      });
      if (this.conditionsFields.length === 0) {
        // 没有筛选条件了直接请求列表
        const { data: res2 } = await getAllClock();
        if (res2.code == 200) {
          this.clocks = res2.data;
        }
      } else {
        // 有筛选条件就再去筛选
        this.tableFilter(data, true);
      }
    },
    async submitToQuery() {
      const { data: res } = await getAllClock(this.condition);
      if (res.code == 200) {
        this.clocks = res.data;
      }
      this.tableDataCopy = JSON.parse(JSON.stringify(this.clocks));
    },
    seeMembersList() {
      this.membersVisible = true;
    },
  },
  async mounted() {
    // 页面进入时加载内容
    if (this.$route.query.screenId != null) {
      this.screenId = this.$route.query.screenId;
      const { data: res1 } = await getClockListByScreenId(this.screenId);
      console.log(res1);
      if (res1.code == 200) {
        this.clocks = res1.data;
      }
      this.tableDataCopy = JSON.parse(JSON.stringify(this.clocks));
    } else {
      const { data: res2 } = await getAllClock(this.condition);
      if (res2.code == 200) {
        this.clocks = res2.data;
      }
      this.tableDataCopy = JSON.parse(JSON.stringify(this.clocks));
    }
  },
  watch: {
    // 监测变化
  },
};
</script>

<style lang="scss" scoped>
.warning-row1 {
  background: #102903 !important;
}

.success-row1 {
  background: #102903 !important;
}

.clocks-contain {
  padding: 0 0.6rem 1rem 0.6rem;

  .form-box {
    margin: 0;
  }
}

.el-transfer {
  display: flex;
  justify-content: space-between;
  align-items: center;

  ::v-deep .el-transfer-panel {
    flex: 3;
  }

  ::v-deep .el-transfer__buttons {
    flex: 2;
    text-align: center;
  }
}

.button-box {
  display: flex;
  margin-top: 20px;
}
</style>

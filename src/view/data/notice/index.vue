<template>
  <div id="notice" class="notice-container">
    <pageHeader
      :title="$t(`notice.pageTitle`)"
      :describe="$t(`notice.pageDesc`)"
    ></pageHeader>
    <div class="new-create" style="margin-left: 1rem">
      <el-button
        class="create-button"
        type="primary"
        @click="openDialog"
        size="mini"
        ><i class="el-icon-plus"></i>{{ $t(`notice.add`) }}</el-button
      >
      <el-button
        type="warning"
        size="mini"
        style="margin-left: 0"
        @click="visible1 = true"
      >
        view marketing
      </el-button>
      <el-button
        type="warning"
        size="mini"
        style="margin-left: 15px"
        @click="visible2 = true"
      >
        view test support
      </el-button>
    </div>
    <el-table :data="notices" border stripe>
      <el-table-column
        align="center"
        :label="$t(`notice.index`)"
        type="index"
        width="60"
      ></el-table-column>
      <el-table-column
        prop="title"
        :label="$t(`notice.title`)"
        align="center"
        width="200"
      >
        <template slot-scope="scope">
          <el-input
            v-if="scope.row.urgentNoticeId == currentUpdateId"
            v-model="updateNotice.title"
          ></el-input>
          <div style="word-break: keep-all" v-else>{{ scope.row.title }}</div>
        </template>
      </el-table-column>
      <el-table-column
        prop="message"
        :label="$t(`notice.message`)"
        align="center"
        width="400"
      >
        <template slot-scope="scope">
          <el-input
            v-if="scope.row.urgentNoticeId == currentUpdateId"
            v-model="updateNotice.message"
            type="textarea"
            :rows="5"
          ></el-input>
          <div v-else style="word-break: keep-all">{{ scope.row.message }}</div>
          <!-- <div v-if="props.row.urgentNoticeId == currentUpdateId" >
                <el-input v-model="updateNotice.message" type="textarea" style="width: 50rem;"></el-input>
              </div>
              <div v-else  style="padding: 15px 12px; color: #555; font-size: medium;">{{ props.row.message }}</div> -->
        </template>
      </el-table-column>
      <el-table-column
        prop="screenId"
        :label="$t(`notice.module`)"
        align="center"
        width="120"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.screenId === 2 ? "marketing" : "sts" }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="publisher"
        :label="$t(`notice.publisher`)"
        align="center"
        width="100"
      >
        <template slot-scope="scope">
          <div v-if="scope.row.memberId === 0 || scope.row.memberId === null">
            <el-input
              v-if="scope.row.showId == currentUpdateId"
              v-model="updateShow.publisher"
            ></el-input>
            <div v-else>
              <div>
                <el-avatar
                  :size="42"
                  src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
                  class="avatar"
                />
                <div>{{ scope.row.publisher }}</div>
              </div>
            </div>
          </div>
          <div v-else>
            <div>
              <el-avatar
                :size="42"
                :src="base_api + scope.row.avatar"
                class="avatar"
              />
              <div>{{ scope.row.memberName }}</div>
            </div>
          </div>
        </template>
      </el-table-column>
      <!-- <el-table-column prop="gmtCreate" label="gmtCreate" align="center"></el-table-column> -->
      <el-table-column
        prop="gmtModified"
        :label="$t(`notice.lastModified`)"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="isExpire"
        :label="$t(`notice.state`)"
        width="90"
        align="center"
      >
        <template slot-scope="scope">
          <el-switch
            @change="updateIsExpire(scope.row.urgentNoticeId)"
            v-model="scope.row.isExpire"
            active-color="#ff4949"
            inactive-color="#13ce66"
          >
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column
        prop="expireTime"
        :label="$t(`notice.expiration`)"
        align="center"
      >
        <template slot-scope="scope">
          <el-date-picker
            v-if="scope.row.urgentNoticeId == currentUpdateId"
            v-model="updateNotice.expireTime"
            style="width: 90%"
            type="datetime"
            placeholder="select date"
            value-format="yyyy-mm-dd HH:mm:ss"
          ></el-date-picker>
          <span v-else>{{ scope.row.expireTime }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t(`notice.operation`)" align="center">
        <template slot-scope="scope">
          <div
            v-if="scope.row.urgentNoticeId == currentUpdateId"
            style="display: flex; justify-content: center; cursor: pointer"
          >
            <!-- <el-button
              type="success"
              round
              size="mini"
              @click="confirmUpdate"
              >{{ $t(`notice.confirm`) }}</el-button
            >
            <el-button type="warning" round size="mini" @click="cancelUpdate">{{
              $t(`notice.cancel`)
            }}</el-button> -->
            <div @click="confirmUpdate" style="color: #409eff">
              <span>{{ $t(`notice.confirm`) }}</span>
            </div>
            <div
              @click="cancelUpdate"
              style="color: #409eff; margin-left: 10px"
            >
              <span>{{ $t(`notice.cancel`) }}</span>
            </div>
          </div>
          <!-- <div v-else>
            <el-button type="primary" round size="mini" @click="update(scope.row)">{{ $t(`notice.update`) }}</el-button>
            <el-button type="danger" round size="mini" @click="deleteById(scope.row.urgentNoticeId)">{{
              $t(`notice.delete`) }}</el-button>
          </div> -->
          <div
            v-else
            style="display: flex; justify-content: center; cursor: pointer"
          >
            <div @click="update(scope.row)" style="color: #409eff">
              <span>{{ $t(`notice.update`) }}</span>
            </div>
            <div
              @click="deleteById(scope.row.urgentNoticeId)"
              style="color: #409eff; margin-left: 10px"
            >
              <span>{{ $t(`notice.delete`) }}</span>
            </div>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <!-- 新增紧急通知 -->
    <el-dialog
      :title="$t(`notice.addDialogTitle`)"
      :visible.sync="visible"
      width="38%"
    >
      <el-form
        :model="formData"
        label-width="120px"
        ref="formData"
        :rules="rules"
      >
        <el-form-item :label="$t(`notice.module`)" prop="screenId">
          <el-select
            v-model="formData.screenId"
            :placeholder="$t(`notice.modulePlaceholder`)"
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
        <el-form-item :label="$t(`notice.title`)" prop="title">
          <el-input
            type="text"
            :placeholder="$t(`notice.titlePlaceholder`)"
            v-model="formData.title"
          ></el-input>
        </el-form-item>
        <el-form-item :label="$t(`notice.message`)" prop="message">
          <el-input
            type="textarea"
            :rows="5"
            :placeholder="$t(`notice.messagePlaceholder`)"
            v-model="formData.message"
          ></el-input>
        </el-form-item>
        <el-form-item :label="$t(`notice.customPublisher`)">
          <el-switch v-model="flag"></el-switch>
          <span style="color: red; font-size: 0.8rem; margin-left: 0.2rem">{{
            $t(`notice.notes`)
          }}</span>
        </el-form-item>
        <el-form-item
          :label="$t(`notice.optionalPublisher`)"
          prop="member"
          v-if="!flag"
        >
          <el-select
            v-model="formData.memberId"
            :placeholder="$t(`notice.optionalPublisher`)"
          >
            <el-option
              v-for="item in members"
              :key="item.id"
              :label="item.memberName"
              :value="item.id"
            >
              <div>
                <span style="float: left; color: #8492a6; font-size: 15px">{{
                  item.memberName
                }}</span>
                <el-avatar
                  :src="base_api + item.avatar"
                  style="width: 35px; height: 35px; float: right"
                ></el-avatar>
              </div>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          :label="$t(`notice.customPublisher`)"
          prop="publisher"
          v-else
        >
          <el-input
            v-model="formData.publisher"
            :placeholder="$t(`notice.customPublisher`)"
          ></el-input>
        </el-form-item>
        <el-form-item :label="$t(`notice.expiration`)" prop="expireTime">
          <el-date-picker
            v-model="formData.expireTime"
            type="datetime"
            :placeholder="$t(`notice.expirationPlaceholder`)"
            value-format="yyyy-MM-dd HH:mm:ss"
          >
          </el-date-picker>
        </el-form-item>
        <!-- <el-form-item>
          <el-button type="primary" @click="submit('formData')" size="mini">{{
            $t(`notice.confirm`)
          }}</el-button>
        </el-form-item> -->
        <div style="display: flex; justify-content: center">
          <span slot="footer" class="dialog-footer">
            <el-button @click="visible = false" size="mini">{{
              $t(`int.cancel`)
            }}</el-button>
            <el-button type="primary" @click="submit('formData')" size="mini">{{
              $t(`notice.confirm`)
            }}</el-button>
          </span>
        </div>
      </el-form>
    </el-dialog>
    <!-- 查看市场 -->
    <el-dialog
      title="Marketing Urgent Notices"
      :visible.sync="visible1"
      width="55%"
    >
      <UrgentNotice
        style="margin: 0 0.2rem 0 0.5rem"
        :notices="notices1"
      ></UrgentNotice>
    </el-dialog>
    <!-- 技术支持紧急通知 -->
    <el-dialog
      title="Tech Support Urgent Notices"
      :visible.sync="visible2"
      width="55%"
    >
      <UrgentNotice
        style="margin: 0 0.2rem 0 0.5rem"
        :notices="notices2"
      ></UrgentNotice>
    </el-dialog>
  </div>
</template>

<script>
import pageHeader from "@/components/pageHeader/index.vue";
import {
  getAllNotice,
  deleteById,
  updateIsExpire,
  updateUrgentNotice,
  insert,
} from "@/api/notices";
import UrgentNotice from "@/view/screen/components/UrgentNotices/index.vue";
import { members } from "@/api/dingding";
import { getNotices } from "@/api/board";
export default {
  name: "data-notice",
  components: {
    UrgentNotice,
    pageHeader,
  },
  data() {
    return {
      base_api: process.env.VUE_APP_BASE_API,
      notices: [],
      updateNotice: {
        expireTime: "",
      },
      currentUpdateId: 0,
      formData: {
        message: "",
        title: "",
        screenId: "",
        expireTime: "",
      },
      options: [
        {
          value: 2,
          label: "Marketing",
        },
        {
          value: 3,
          label: "STS",
        },
      ],
      title: "",
      visible: false,
      members: [],
      flag: true,
      visible1: false,
      visible2: false,
      notices1: [],
      notices2: [],
    };
  },
  computed: {
    //   表单验证
    rules() {
      return {
        screenId: [
          {
            required: true,
            message: this.$t(`notice.modulePlaceholder`),
            trigger: "blur",
          },
        ],
        title: [
          {
            required: true,
            message: this.$t(`notice.titlePlaceholder`),
            trigger: "blur",
          },
        ],
        message: [
          {
            required: true,
            message: this.$t(`notice.messagePlaceholder`),
            trigger: "blur",
          },
        ],
        expireTime: [
          {
            required: true,
            message: this.$t(`notice.expirationPlaceholder`),
            trigger: "blur",
          },
        ],
      };
    },
  },
  created() {
    // 实例被创建之后执行代码
    this.getNotices();
    this.getMembers();
    this.getBoardNotices();
  },
  methods: {
    openDialog() {
      this.title = "add urgent notice";
      this.visible = true;
      for (let i in this.formData) {
        this.formData[i] = "";
      }
      this.$nextTick(() => {
        this.$refs.formData.clearValidate();
      })
    },
    async getNotices() {
      const { data: res } = await getAllNotice();
      // console.log(res.data);
      if (res.code == 200) {
        this.notices = res.data;
      }
    },
    async deleteById(id) {
      this.$confirm(this.$t(`notice.deleteTips`), this.$t(`notice.tips`), {
        confirmButtonText: this.$t(`notice.confirm`),
        cancelButtonText: this.$t(`notice.cancel`),
        type: "warning",
      })
        .then(async () => {
          const { data: res } = await deleteById(id);
          if (res.code == 200) {
            this.$message({
              type: "success",
              message: this.$t(`clock.operationOK`),
            });
            this.getNotices();
            this.getBoardNotices();
          } else {
            this.$message({
              type: "warning",
              message: this.$t(`clock.operationError`),
            });
          }
        })
        .catch((e) => {
          // console.log(e);
          this.$message({
            type: "info",
            message: this.$t(`clock.cancelTooltip`),
          });
        });
    },
    async updateIsExpire(id) {
      const { data: res } = await updateIsExpire(id);
      if (res.code == 200) {
        this.$message({
          type: "success",
          message: this.$t(`clock.operationOK`),
        });
        this.getNotices();
        this.getBoardNotices();
      }
    },
    async updateUrgentNotice() {
      // console.log(this.updateNotice);
      const { data: res } = await updateUrgentNotice(this.updateNotice);
      if (res.code == 200) {
        this.$message({
          type: "success",
          message: this.$t(`clock.operationOK`),
        });
        this.getNotices();
        this.getBoardNotices();
        this.currentUpdateId = 0;
        this.updateNotic = {};
      } else {
        this.$message({
          type: "warning",
          message: res.msg,
        });
      }
    },
    update(row) {
      this.currentUpdateId = row.urgentNoticeId;
      this.updateNotice = row;
    },
    confirmUpdate() {
      this.updateUrgentNotice();
    },
    cancelUpdate() {
      this.currentUpdateId = 0;
      this.updateNotic = {};
    },
    submit(formData) {
      // const { data: res } = await insert(this.form);
      // if (res.code == 200) {
      //   this.$message({
      //     type: "success",
      //     message: this.$t(`clock.operationOK`),
      //   });
      //   this.getNotices();
      //   this.getBoardNotices();
      //   this.form = {};
      // } else {
      //   this.$message({
      //     type: "warning",
      //     message: this.$t(`clock.operationError`),
      //   });
      // }
      // this.visible = false;
      this.$refs[formData].validate((valid) => {
        if (valid) {
          insert(this.formData).then((res) => {
            if (res.data.code == 200) {
              this.$message({
                type: "success",
                message: this.$t(`clock.operationOK`),
              });
              for (let i in this.formData) {
                this.formData[i] = "";
              }
              this.visible = false;
              this.getNotices();
              this.getBoardNotices();
            }
          });
        } else {
          // console.log("error submit!!");
          return false;
        }
      });
    },
    async getMembers() {
      const { data: res } = await members();
      if (res.code == 200) {
        this.members = res.data;
      } else {
        this.$message({
          type: "warning",
          message: res.msg,
        });
      }
    },
    async getBoardNotices() {
      const { data: res } = await getNotices(2);
      const { data: res1 } = await getNotices(3);
      if (res.code == 200) {
        this.notices1 = res.data;
      } else {
        this.$message({
          type: "warning",
          message: res.msg,
        });
      }
      if (res1.code == 200) {
        this.notices2 = res1.data;
      } else {
        this.$message({
          type: "warning",
          message: res.msg,
        });
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.table-card {
  margin: 20px 20px;
}

.demo-table-expand {
  font-size: 0;
  margin: 10px 60px;
}

.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}

.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}

.el-card ::v-deep .el-card__header {
  border: none;
}

.notice-container {
  padding: 0 0.6rem 1rem 0.6rem;

  .new-create {
    display: flex;
    padding-bottom: 20px;

    .create-button {
      margin-right: 15px;
    }
  }
}
</style>

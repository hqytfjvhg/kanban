<!--
* @description  参数1
* @fileName  index
* @author Arvin
* @date 2022-11-25 17:10:58
* @version V1.0.0
!-->

<template>
  <div id="index" class="show-container">
    <pageHeader
      :title="$t(`ext.pageTitle`)"
      :describe="$t(`ext.pageDesc`)"
    ></pageHeader>
    <div class="new-create" style="margin-left: 1rem">
      <el-button
        class="create-button"
        type="primary"
        @click="openDialog"
        size="mini"
        ><i class="el-icon-plus"></i>{{ $t(`int.add`) }}</el-button
      >
      <el-button
        type="warning"
        size="mini"
        style="margin-left: 0"
        @click="visible1 = true"
      >
        <!-- view -->
        <i class="el-icon-view"></i> {{ $t(`int.view`) }}
      </el-button>
    </div>

    <!-- <el-button type="primary" icon="el-icon-plus" circle @click="openDialog"
            style="position: absolute;bottom:5rem;right:10rem;z-index: 99;width:3rem;height: 3rem;"></el-button> -->
    <!-- <el-button type="success" icon="el-icon-view" circle @click="visible1 = true"
            style="position: absolute;bottom:5rem;right:6rem;z-index: 99;width:3rem;height: 3rem;"></el-button> -->

    <div class="table">
      <el-table
        class="table-content"
        :data="shows"
        style="width: 100%"
        :border="true"
        stripe
      >
        <el-table-column
          type="index"
          :label="$t(`project.index`)"
          width="100"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="title"
          :label="$t(`ext.title`)"
          width="220"
          align="center"
        >
          <template slot-scope="scope">
            <el-input
              v-if="scope.row.showId == currentUpdateId"
              v-model="updateShow.title"
            ></el-input>
            <div v-else>{{ scope.row.title }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="message" :label="$t(`ext.message`)" width="400">
          <template slot-scope="scope">
            <el-input
              type="textarea"
              :rows="5"
              v-if="scope.row.showId == currentUpdateId"
              v-model="updateShow.message"
            ></el-input>
            <div v-else>{{ scope.row.message }}</div>
          </template>
        </el-table-column>
        <el-table-column
          prop="publisher"
          :label="$t(`ext.publisher`)"
          width="150"
          align="center"
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
        <!-- <el-table-column prop="gmtCreate" label="create" width="200" align="center"></el-table-column> -->
        <el-table-column
          prop="gmtModified"
          :label="$t(`ext.lastModified`)"
          width="200"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="isExpire"
          :label="$t(`ext.state`)"
          width="90"
          align="center"
        >
          <template slot-scope="scope">
            <el-switch
              @change="updateIsExpire(scope.row.showId)"
              v-model="scope.row.isExpire"
              active-color="#ff4949"
              inactive-color="#13ce66"
            >
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column
          prop="expireTimeString"
          :label="$t(`ext.expiration`)"
          width="200"
          align="center"
        >
          <template slot-scope="scope">
            <el-date-picker
              v-if="scope.row.showId == currentUpdateId"
              v-model="updateShow.expireTimeString"
              type="datetime"
              value-format="yyyy-MM-dd HH:mm:ss"
              placeholder="please select datetime"
              style="width: 160px"
            >
            </el-date-picker>
            <span v-else>{{ scope.row.expireTimeString }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t(`ext.operation`)" align="center">
          <template slot-scope="scope">
            <div
              v-if="scope.row.showId == currentUpdateId"
              style="display: flex; justify-content: center; cursor: pointer"
            >
              <!-- <div>
                <el-button
                  round
                  size="mini"
                  type="success"
                  @click="confirmUpdate"
                  >{{ $t(`ext.confirm`) }}</el-button
                >
              </div>
              <div>
                <el-button
                  round
                  size="mini"
                  type="warning"
                  @click="cancelUpdate"
                  >{{ $t(`ext.cancel`) }}</el-button
                >
              </div> -->
              <div @click="confirmUpdate" style="color: #409eff">
                <span>{{ $t(`ext.confirm`) }}</span>
              </div>
              <div
                @click="cancelUpdate"
                style="color: #409eff; margin-left: 10px"
              >
                <span>{{ $t(`ext.cancel`) }}</span>
              </div>
            </div>

            <div
              v-else
              style="display: flex; justify-content: center; cursor: pointer"
            >
              <!-- <div>
                <el-button
                  type="primary"
                  round
                  size="mini"
                  @click="update(scope.row)"
                  >{{ $t(`ext.update`) }}</el-button
                >
              </div>
              <div>
                <el-button
                  type="danger"
                  round
                  size="mini"
                  @click="deleteById(scope.row.showId)"
                  >{{ $t(`ext.delete`) }}</el-button
                >
              </div> -->
              <div @click="update(scope.row)" style="color: #409eff">
                <span>{{ $t(`ext.update`) }}</span>
              </div>
              <div
                @click="deleteById(scope.row.showId)"
                style="color: #409eff; margin-left: 10px"
              >
                <span>{{ $t(`ext.delete`) }}</span>
              </div>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div class="table" v-if="tableVisable">
      <el-card class="table-card">
        <div slot="header" class="clearfix">
          <span>excel data</span>
          <el-button
            style="float: right; padding: 3px 0"
            type="primary"
            @click="submitToBatch"
            >Confirm Batch Operations
          </el-button>
        </div>
        <el-table
          class="table-content"
          :data="excelData"
          border="true"
          style="width: 70%; margin: 0 auto"
        >
          <el-table-column type="expand">
            <template slot-scope="props">
              <div
                style="
                  font-size: 28px;
                  color: blue;
                  font-family: 'Times New Roman', Times, serif;
                  padding: 20px 50px;
                "
              >
                content
              </div>
              <el-form label-position="left" inline class="demo-table-expand">
                <el-form-item
                  v-for="(value, name) in props.row.content"
                  :label="name + ':'"
                  :key="name"
                >
                  <span>{{ value }}</span>
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>
          <el-table-column
            prop="title"
            label="title"
            width="330"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="expireTime"
            label="expiration datetime"
            width="220"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="gmtCreate"
            label="create time"
            width="220"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="gmtModified"
            label="last modify"
            align="center"
          ></el-table-column>
        </el-table>
      </el-card>
    </div>
    <!-- 新增展会消息 -->
    <el-dialog
      :title="dialog.title"
      :visible.sync="dialog.visible"
      width="35%"
      :destroy-on-close="true"
    >
      <el-form
        :model="formData"
        label-width="150px"
        ref="formData"
        :rules="rules"
      >
        <el-form-item :label="$t(`ext.title`)" prop="title">
          <el-input
            type="text"
            :placeholder="$t(`ext.titlePlaceholder`)"
            v-model="formData.title"
          ></el-input>
        </el-form-item>
        <el-form-item :label="$t(`ext.message`)" prop="message">
          <el-input
            type="textarea"
            :rows="5"
            :placeholder="$t(`ext.messagePlaceholder`)"
            v-model="formData.message"
          ></el-input>
        </el-form-item>
        <el-form-item :label="$t(`ext.customPublisher`)">
          <el-switch v-model="flag"></el-switch>
          <span style="color: red; font-size: 0.8rem; margin-left: 0.2rem">{{
            $t(`ext.notes`)
          }}</span>
        </el-form-item>
        <el-form-item
          :label="$t(`ext.optionalPublisher`)"
          prop="member"
          v-if="!flag"
        >
          <el-select
            v-model="formData.memberId"
            :placeholder="$t(`ext.optionalPublisher`)"
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
          :label="$t(`ext.customPublisher`)"
          prop="publisher"
          v-else
        >
          <el-input
            v-model="formData.publisher"
            :placeholder="$t(`ext.customPublisher`)"
          ></el-input>
        </el-form-item>
        <el-form-item :label="$t(`ext.expiration`)" prop="expireTimeString">
          <el-date-picker
            v-model="formData.expireTimeString"
            type="datetime"
            :placeholder="$t(`ext.expirationPlaceholder`)"
            value-format="yyyy-MM-dd HH:mm:ss"
          >
          </el-date-picker>
        </el-form-item>
        <div style="display: flex; justify-content: center">
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialog.visible = false" size="mini">{{
              $t(`int.cancel`)
            }}</el-button>
            <el-button type="primary" @click="submit('formData')" size="mini">{{
              $t(`ext.confirm`)
            }}</el-button>
          </span>
        </div>
      </el-form>
    </el-dialog>

    <el-dialog
      title="Ext. News"
      :visible.sync="visible1"
      width="35%"
      :destroy-on-close="true"
    >
      <ExtNews :extNews="extNews"></ExtNews>
    </el-dialog>
  </div>
</template>

<script>
import {
  insert,
  batchAdd,
  getAll,
  deleteById,
  updateIsExpire,
  updateShow,
} from "@/api/show";
import { selectUnexpiredShow } from "@/api/show";
import ExtNews from "@/view/screen/components/ExtNews/index.vue";
import { members } from "@/api/dingding";
import store from "@/store";
import pageHeader from "@/components/pageHeader/index.vue";
export default {
  name: "show-index",
  data() {
    return {
      base_api: process.env.VUE_APP_BASE_API,
      shows: [],
      formData: {
        title: "",
        message: "",
        memberId: "",
        // memberName: '',
        expireTime: null,
        publisher: "",
        expireTimeString:''
      },
      excelData: [],
      tableVisable: false,
      headers: { token: store.getters.token },
      updateShow: {},
      currentUpdateId: 0,
      dialog: {
        title: this.$t(`ext.addDialogTitle`),
        visible: false,
      },
      members: [],
      flag: true,
      visible1: false,
    };
  },
  created() {
    // 实例被创建之后执行代码
  },
  computed: {
    // 计算属性
    rules() {
      return {
        title: [
          {
            required: true,
            message: this.$t(`int.titlePlaceholder`),
            trigger: "blur",
          },
        ],
        message: [
          {
            required: true,
            message: this.$t(`int.messagePlaceholder`),
            trigger: "blur",
          },
        ],
        expireTime: [
          {
            required: true,
            message: this.$t(`int.expirationPlaceholder`),
            trigger: "blur",
          },
        ],
      };
    },
  },
  components: {
    // 组件的引用
    pageHeader,
    ExtNews,
  },
  methods: {
    // 方法
    openDialog() {
      this.dialog.title = this.$t(`ext.addDialogTitle`);
      this.dialog.visible = !this.dialog.visible;
      for (let i in this.formData) {
        this.formData[i] = "";
      }
    },
    async getShows() {
      const { data: res } = await getAll();
      // console.log(res.data);
      if (res.code == 200) {
        this.shows = res.data;
      } else {
        this.$message({
          type: "warning",
          message: res.msg,
        });
      }
    },
    // 提交新增
    submit(formData) {
      // console.log(this.form);
      // const { data: res } = await insert(this.form);
      // if (res.code == 200) {
      //   this.$message({
      //     type: "success",
      //     message: "insert form successfully!",
      //   });
      //   this.dialog.visible = !this.dialog.visible;
      //   this.getShows();
      //   this.form = {};
      // } else {
      //   this.$message({
      //     type: "warning",
      //     message: "insert form fail!",
      //   });
      // }
      this.$refs[formData].validate((valid) => {
        this.formData.expireTime = null
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
              this.dialog.visible = false;
              this.getShows();
            }
          });
        } else {
          // console.log("error submit!!");
          return false;
        }
      });
    },
    handleSuccess(res) {
      console.log(`get excelTable`);
      if (res.code == 200) {
        this.excelData = res.data;
        this.tableVisable = true;
      } else {
        this.$message({
          type: "warning",
          message: res.msg,
        });
      }
    },
    async submitToBatch() {
      console.log(this.excelData);
      console.log(this.excelData);
      const { data: res } = await batchAdd(this.excelData);
      if (res.code == 200) {
        this.$message({
          type: "success",
          message: "batch successfully!",
        });
      } else {
        this.$message({
          type: "warning",
          message: res.msg,
        });
      }
    },
    deleteById(id) {
      this.$confirm(this.$t(`ext.deleteTips`), this.$t(`ext.tips`), {
        confirmButtonText: this.$t(`ext.confirm`),
        cancelButtonText: this.$t(`ext.cancel`),
        type: "warning",
      })
        .then(async () => {
          const { data: res } = await deleteById(id);
          if (res.code == 200) {
            this.$message({
              type: "success",
              // message: "delete successfully!",
              message: this.$t(`clock.operationOK`),
            });
            this.getShows();
          } else {
            this.$message({
              type: "warning",
              message: res.msg,
            });
          }
        })
        .catch((e) => {
          // console.log(e);
          // this.$message({
          //   type: "info",
          //   message: this.$t(`clock.cancelTooltip`),
          // });
        });
    },
    async updateIsExpire(id) {
      const { data: res } = await updateIsExpire(id);
      if (res.code == 200) {
        this.$message({
          type: "success",
          message: this.$t(`clock.operationOK`),
        });
        this.getShows();
        this.getExtNews();
      } else {
        this.$message({
          type: "warning",
          message: res.msg,
        });
      }
    },
    async updateShow1() {
      // console.log(this.updateShow);
      this.updateShow.expireTime = null
      const { data: res } = await updateShow(this.updateShow);
      if (res.code == 200) {
        this.$message({
          type: "success",
          message: "update notice successfully!",
        });
        this.getShows();
        this.getExtNews();
        this.currentUpdateId = 0;
        this.updateShow = {};
      } else {
        this.$message({
          type: "warning",
          message: res.msg,
        });
      }
    },
    update(row) {
      this.currentUpdateId = row.showId;
      this.updateShow = row;
    },
    confirmUpdate() {
      this.updateShow1();
    },
    cancelUpdate() {
      this.currentUpdateId = 0;
      this.updateShow = {};
      this.getShows();
      // this.$message({
      //   type: "info",
      //   message: this.$t(`clock.cancelTooltip`),
      // });
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
    async getExtNews() {
      const { data: res } = await selectUnexpiredShow();
      if (res.code == 200) {
        this.extNews = res.data;
      } else {
        this.$message({
          type: "warning",
          message: res.msg,
        });
      }
    },
  },
  mounted() {
    // 页面进入时加载内容
    this.getShows();
    this.getMembers();
    this.getExtNews();
  },
  watch: {
    // 监测变化
  },
};
</script>
<style lang="scss" scoped>
.show-container {
  padding: 0 0.6rem 1rem 0.6rem;

  .new-create {
    display: flex;
    padding-bottom: 20px;

    .create-button {
      margin-right: 15px;
    }
  }
}

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
</style>

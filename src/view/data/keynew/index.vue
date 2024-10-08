<!--
* @description  参数1
* @fileName  index
* @author Arvin
* @date 2022-11-25 17:10:29
* @version V1.0.0
!-->

<template>
  <div id="index" class="keynew-container">
    <pageHeader
      :title="$t(`int.pageTitle`)"
      :describe="$t(`int.pageDesc`)"
    ></pageHeader>
    <div class="new-create" style="margin-left: 1rem">
      <el-button
        class="create-button"
        type="primary"
        @click="openDialog"
        size="mini"
        ><i class="el-icon-plus"></i> {{ $t(`int.add`) }}</el-button
      >
      <!-- 查看未过期信息 -->
      <el-button
        type="warning"
        size="mini"
        style="margin-left: 0"
        @click="
          visible1 = true;
          getUnexpiredNews();
        "
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
        :data="keynews"
        style="width: 100%"
        :border="true"
        stripe
      >
        <el-table-column
          prop="keynewId"
          label="id"
          width="100"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="title"
          :label="$t(`int.title`)"
          width="220"
          align="center"
        >
          <template slot-scope="scope">
            <el-input
              v-if="scope.row.keynewId == currentUpdateId"
              v-model="updateForm.title"
            ></el-input>
            <div style="word-break: keep-all" v-else>{{ scope.row.title }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="message" :label="$t(`int.message`)" width="400">
          <template slot-scope="scope">
            <!-- <div>{{updateForm.message}}</div> -->
            <el-input
              v-if="scope.row.keynewId == currentUpdateId"
              v-model="updateForm.message"
              type="textarea"
              :rows="5"
            ></el-input>
            <div style="word-break: keep-all" v-else>
              {{ scope.row.message }}
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="publisher"
          :label="$t(`int.publisher`)"
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
        <!-- <el-table-column prop="gmtCreate" label="创建时间" width="200" align="center"></el-table-column> -->
        <el-table-column
          prop="gmtModified"
          :label="$t(`int.lastModified`)"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="isExpire"
          :label="$t(`int.state`)"
          align="center"
        >
          <template slot-scope="scope">
            <el-switch
              @change="updateIsExpire(scope.row.keynewId)"
              v-model="scope.row.isExpire"
              active-color="#ff4949"
              inactive-color="#13ce66"
            >
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column
          :label="$t(`int.expiration`)"
          width="200"
          align="center"
        >
          <template slot-scope="scope">
            <el-date-picker
              v-if="scope.row.keynewId == currentUpdateId"
              v-model="updateForm.expireTime"
              type="datetime"
              value-format="yyyy-MM-dd HH:mm:ss"
              :placeholder="$t('int.expirationPlaceholder')"
            >
            </el-date-picker>
            <span v-else>{{ scope.row.expireTime }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t(`int.operation`)" align="center">
          <template slot-scope="scope">
            <div
              v-if="scope.row.keynewId == currentUpdateId"
              style="display: flex; justify-content: center; cursor: pointer"
            >
              <!-- <div>
                <el-button round size="mini" type="success" @click="confirmUpdate">{{ $t(`int.confirm`) }}</el-button>
              </div> -->
              <div @click="confirmUpdate(scope.row)" style="color: #409eff">
                <span>{{ $t(`int.confirm`) }}</span>
              </div>
              <!-- <div>
                <el-button round size="mini" type="warning" @click="cancelUpdate">{{ $t(`int.cancel`) }}</el-button>
              </div> -->
              <div
                @click="cancelUpdate()"
                style="color: #409eff; margin-left: 10px"
              >
                <span>{{ $t(`int.cancel`) }}</span>
              </div>
            </div>

            <div
              v-else
              style="display: flex; justify-content: center; cursor: pointer"
            >
              <!-- <div style="flex: 1">
                <el-button round size="mini" type="primary" @click="update(scope.row)">{{ $t(`int.update`) }}</el-button>
              </div> -->
              <div @click="update(scope.row)" style="color: #409eff">
                <span>{{ $t(`int.update`) }}</span>
              </div>
              <!-- <div style="flex: 1">
                <el-button round size="mini" type="danger" @click="deleteById(scope.row.keynewId)">{{ $t(`int.delete`)
                }}</el-button>
              </div> -->
              <div
                @click="deleteById(scope.row.keynewId)"
                style="color: #409eff; margin-left: 10px"
              >
                <span>{{ $t(`int.delete`) }}</span>
              </div>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div class="table" v-if="tableVisable">
      <el-card class="table-card">
        <div slot="header" class="clearfix">
          <span>Int. news</span>
          <el-button
            style="float: right; padding: 3px 0"
            type="primary"
            @click="submitToBatch"
            >Confirm Batch Operations
          </el-button>
        </div>
        <el-table class="table-content" :data="excelData">
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
            width="300"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="expireTime"
            label="expiration datetime"
            width="180"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="gmtCreate"
            label="gmtCreate"
            width="180"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="gmtModified"
            label="gmtModified"
            width="180"
            align="center"
          ></el-table-column>
        </el-table>
      </el-card>
    </div>

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
        <el-form-item :label="$t(`int.title`)" prop="title">
          <el-input
            type="text"
            :placeholder="$t(`int.titlePlaceholder`)"
            v-model="formData.title"
          ></el-input>
        </el-form-item>
        <el-form-item :label="$t(`int.message`)" prop="message">
          <el-input
            type="textarea"
            :rows="5"
            :placeholder="$t(`int.messagePlaceholder`)"
            v-model="formData.message"
          ></el-input>
        </el-form-item>
        <el-form-item :label="$t(`int.customPublisher`)">
          <el-switch v-model="flag"></el-switch>
          <span style="color: red; font-size: 0.8rem; margin-left: 0.2rem">{{
            $t(`int.notes`)
          }}</span>
        </el-form-item>
        <el-form-item
          :label="$t(`int.optionalPublisher`)"
          prop="memberId"
          v-if="!flag"
        >
          <el-select
            v-model="formData.memberId"
            :placeholder="$t(`int.optionalPublisher`)"
            :clearable="true"
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
          :label="$t(`int.customPublisher`)"
          prop="publisher"
          v-else
        >
          <el-input
            v-model="formData.publisher"
            :placeholder="$t(`int.customPublisher`)"
          ></el-input>
        </el-form-item>
        <el-form-item :label="$t(`int.expiration`)" prop="expireTime">
          <el-date-picker
            v-model="formData.expireTime"
            type="datetime"
            :placeholder="$t(`int.expirationPlaceholder`)"
            value-format="yyyy-MM-ddTHH:mm:ss"
          >
          </el-date-picker>
        </el-form-item>

        <div style="display: flex; justify-content: center">
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialog.visible = false" size="mini">{{
              $t(`int.cancel`)
            }}</el-button>
            <el-button type="primary" @click="submit('formData')" size="mini">{{
              $t(`int.confirm`)
            }}</el-button>
          </span>
        </div>
      </el-form>
    </el-dialog>

    <el-dialog :title="$t(`int.viewInfo`)" :visible.sync="visible1" width="35%">
      <KeyNews :keyNews="unexpiredNews" style="width: 100%"></KeyNews>
    </el-dialog>
  </div>
</template>

<script>
import store from "@/store";
import {
  insert,
  batchAdd,
  getAll,
  updateIsExpire,
  updateKeyNew,
  deleteById,
} from "@/api/keynew";
import KeyNews from "@/view/screen/components/KeyNews/index.vue";
import { selectUnexpiredNews } from "@/api/keynew";
import { members } from "@/api/dingding";
import pageHeader from "@/components/pageHeader/index.vue";
export default {
  name: "keynew-index",
  data() {
    return {
      base_api: process.env.VUE_APP_BASE_API,
      keynews: [],
      formData: {
        title: "",
        message: "",
        expireTime: "",
        publisher: "",
        memberId: "",
      },
      excelData: [],
      tableVisable: false,
      headers: { token: store.getters.token },
      currentUpdateId: 0,
      updateForm: {
        expireTime: "",
        expireTimeString: "",
        message: "",
        title: "",
      },
      dialog: {
        title: "Add Keynew",
        visible: false,
      },
      memebers: [],
      flag: true,
      visible1: false,
      unexpiredNews: [],
      // rules: {
      //   title: [
      //     { required: true, message: this.$t(`int.titlePlaceholder`), trigger: "blur" },
      //   ],
      //   message: [
      //     { required: true, message: this.$t(`int.messagePlaceholder`), trigger: "blur" },
      //   ],
      //   expireTime: [
      //     { required: true, message:this.$t(`int.expirationPlaceholder`) , trigger: "blur" },
      //   ],
      // },
    };
  },
  created() {
    // 实例被创建之后执行代码
  },
  computed: {
    // 计算属性
    //   表单验证
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
    KeyNews,
  },
  methods: {
    // 方法
    openDialog() {
      this.dialog.title = this.$t(`int.addDialogTitle`);
      this.dialog.visible = !this.dialog.visible;
      for(let i in this.formData){
        this.formData[i] = ''
      }
    },
    async getKeynews() {
      const { data: res } = await getAll();
      if (res.code == 200) {
        this.keynews = res.data;
      } else {
        this.$message({
          type: "warning",
          message: res.msg,
        });
      }
    },

    submit(formData) {
      // const { data: res } = await insert(this.formData);
      // if (res.code == 200) {
      //   this.$message({
      //     type: "success",
      //     message: this.$t(`clock.operationOK`),
      //   });
      //   this.dialog.visible = false;
      //   this.getKeynews();
      //   this.form = {};
      // } else {
      //   this.$message({
      //     type: "warning",
      //     message: res.msg,
      //   });
      // }
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
              this.dialog.visible = false;
              this.getKeynews();
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
          message: this.$t(`clock.operationOK`),
        });
      } else {
        this.$message({
          type: "warning",
          message: res.msg,
        });
      }
    },
    deleteById(id) {
      this.$confirm(this.$t(`int.deleteTips`), this.$t(`int.tips`), {
        confirmButtonText: this.$t(`int.confirm`),
        cancelButtonText: this.$t(`int.cancel`),
        type: "warning",
      })
        .then(async () => {
          const { data: res } = await deleteById(id);
          if (res.code == 200) {
            this.$message({
              type: "success",
              message: this.$t(`clock.operationOK`),
            });
            this.getKeynews();
          } else {
            this.$message({
              type: "warning",
              message: res.msg,
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
        this.getKeynews();
        // this.getUnexpiredNews();
      } else {
        this.$message({
          type: "warning",
          message: res.msg,
        });
      }
    },
    async updateKeyNew1() {
      // console.log(this.updateForm);
      const { data: res } = await updateKeyNew(this.updateForm);
      if (res.code == 200) {
        this.$message({
          type: "success",
          message: this.$t(`clock.operationOK`),
        });
        this.getKeynews();
        this.currentUpdateId = 0;
        this.updateForm = {};
      } else {
        this.$message({
          type: "warning",
          message: res.msg,
        });
      }
    },
    update(row) {
      this.currentUpdateId = row.keynewId;
      this.updateForm.title = row.title;
      this.updateForm.message = row.message;
      this.updateForm.expireTime = row.expireTime;
      this.updateForm.isExpire = row.isExpire;
      this.updateForm.keynewId = row.keynewId;
    },
    confirmUpdate() {
      this.updateForm.expireTimeString = this.updateForm.expireTime;
      this.updateForm.expireTime = null;
      this.updateKeyNew1();
    },
    cancelUpdate() {
      this.currentUpdateId = 0;
      this.updateForm = {};
      this.getKeynews();
      this.$message({
        type: "info",
        message: this.$t(`clock.cancelTooltip`),
      });
    },
    addContentItem() {
      this.$set(this.updateForm.content, this.contentKey, this.contentValue);
      // console.log(this.updateForm);
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
    async getUnexpiredNews() {
      const { data: res } = await selectUnexpiredNews();
      if (res.code == 200) {
        this.unexpiredNews = res.data;
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
    this.getKeynews();
    this.getMembers();
  },
  watch: {
    // 监测变化
  },
};
</script>
<style lang="scss" scoped>
.keynew-container {
  padding: 0 0.6rem 1rem 0.6rem;

  .new-create {
    display: flex;
    padding-bottom: 20px;

    .create-button {
      margin-right: 15px;
    }
  }
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

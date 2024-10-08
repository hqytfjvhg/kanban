<template>
  <div class="awards-container">
    <pageHeader
      :title="$t(`award.pageTitle`)"
      :describe="$t(`award.pageDesc`)"
    ></pageHeader>
    <div class="new-create" style="margin-left: 1rem">
      <el-button
        class="create-button"
        type="success"
        @click="openDialog"
        size="mini"
        ><i class="el-icon-download"></i
        >{{ $t(`award.generateImage`) }}</el-button
      >
      <el-upload
        :action="base_api + '/info_screen/awards/excel/handler'"
        multiple
        :limit="1"
        :on-success="handleSuccess"
        :headers="headers"
        ref="uploadRef"
        :before-upload="beforeUpload"
        :show-file-list="false"
      >
        <el-button size="mini" type="primary"
          ><i class="el-icon-upload2"></i>{{ $t(`award.batchAdd`) }}</el-button
        >
      </el-upload>
      <el-button
        type="warning"
        size="mini"
        style="margin-left: 15px"
        @click="visible1 = true"
      >
        <!-- view -->
        <i class="el-icon-view"></i> {{ $t(`int.view`) }}
      </el-button>
      <el-button type="primary" size="mini" style="margin-left: 15px">
        <i class="el-icon-download"></i>
        <a
          :href="base_api + '/' + 'template/Media_Links.xlsx'"
          style="margin: 0.3rem 0.5rem 0.3rem 0; color: #fff"
          >{{ $t(`excelTemplate.downloadTemplate`) }}</a
        >
      </el-button>
    </div>

    <!-- <el-upload :action="base_api + '/info_screen/awards/excel/handler'" multiple :limit="1" :on-success="handleSuccess"
            :headers="headers" ref="uploadRef" style="position: absolute;top:8.5rem;right:3rem">
            <el-button size="mini" type="primary">{{ $t(`award.batchAdd`) }}</el-button>
        </el-upload>
        <el-button type="primary" icon="el-icon-plus" circle @click="openDialog"
            style="position: absolute;bottom:5rem;right:10rem;z-index: 99;width:3rem;height: 3rem;"></el-button>-->
    <!-- <el-button type="success" icon="el-icon-view" circle @click="visible1 = true"
            style="position: absolute;bottom:5rem;right:6rem;z-index: 99;width:3rem;height: 3rem;"></el-button>  -->

    <div class="table">
      <el-table
        class="table-content"
        :data="awards"
        style="width: 100%"
        :border="true"
        stripe
      >
        <el-table-column
          type="index"
          :label="$t(`award.index`)"
          width="100"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="type"
          :label="$t(`award.type`)"
          width="100"
          align="center"
        >
          <template slot-scope="scope">
            <div v-if="scope.row.type">So/Me</div>
            <div v-else>awards</div>
          </template>
        </el-table-column>
        <el-table-column
          prop="title"
          :label="$t(`award.title`)"
          width="150"
          align="center"
        >
          <template slot-scope="scope">
            <div>{{ scope.row.title }}</div>
          </template>
        </el-table-column>
        <el-table-column
          prop="originUrl"
          :label="$t(`award.originUrl`)"
          width="330"
          align="center"
        >
          <template slot-scope="scope">
            <div>{{ scope.row.originUrl }}</div>
          </template>
        </el-table-column>
        <el-table-column
          prop="imageUrl"
          :label="$t(`award.imageUrl`)"
          width="150"
          align="center"
        >
          <template slot-scope="scope">
            <el-link
              v-if="scope.row.imageUrl !== null"
              :href="base_api + '\\' + scope.row.imageUrl"
              target="_blank"
              type="primary"
              >{{ $t(`award.seePicture`) }}</el-link
            >
            <span v-else style="color: red">unavailable</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="state"
          :label="$t(`award.state`)"
          width="100"
          align="center"
        >
          <template slot-scope="scope">
            <el-switch
              @change="changeState(scope.row.id)"
              v-model="scope.row.state"
              active-color="#13ce66"
              inactive-color="#ff4949"
            >
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column
          prop="result"
          :label="$t(`award.result`)"
          width="100"
          align="center"
        >
          <template slot-scope="scope">
            <span v-if="scope.row.result === 0">generating</span>
            <span v-if="scope.row.result === 1">success</span>
            <span v-if="scope.row.result === -1">fail</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="gmtCreateString"
          :label="$t(`award.gmtCreate`)"
          width="200"
          align="center"
        />
        <el-table-column
          prop="gmtModifiedString"
          :label="$t(`award.lastModified`)"
          width="200"
          align="center"
        >
        </el-table-column>
        <el-table-column :label="$t(`award.operation`)" align="center">
          <template slot-scope="scope">
            <div
              style="display: flex; justify-content: center; cursor: pointer"
            >
              <!-- <div>
                <el-button
                  type="danger"
                  round
                  size="mini"
                  @click="deleteAward(scope.row.id)"
                  >{{ $t(`award.delete`) }}</el-button
                >
              </div> -->
              <div
                @click="deleteAward(scope.row.id)"
                style="color: #409eff; margin-left: 10px"
              >
                <span>{{ $t(`award.delete`) }}</span>
              </div>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- <div style="text-align:center">
            <el-upload class="upload-demo" :action="base_api + '/info_screen/awards/excel/handler'" multiple :limit="1"
                :on-success="handleSuccess" :headers="headers">
                <el-button size="small" type="primary">点击上传excel</el-button>
            </el-upload>
        </div> -->

    <el-dialog
      title="excel parsing data"
      :visible.sync="tableVisable1"
      class="table"
      :destroy-on-close="true"
    >
      <el-table
        class="table-content"
        :data="excelData"
        :border="true"
        style="width: 80%; margin: 0 auto"
        stripe
      >
        <el-table-column
          prop="title"
          label="title"
          width="300"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="url"
          label="url"
          align="center"
        ></el-table-column>
      </el-table>
      <div style="text-align: center; margin: 20px 0">
        <el-button type="primary" @click="submitToBatch"> confirm </el-button>
        <el-button type="warning" @click="cancle"> cancel </el-button>
      </div>
    </el-dialog>
    <!-- 
        <div class="table" v-if="tableVisable2">
            <el-card class="table-card">
                <div slot="header" class="clearfix">
                    <span>p2iObjects</span>
                    <el-button style="float: right; padding: 3px 0" type="primary" @click="batchSave">批量保存</el-button>
                </div>
                <el-table class="table-content" :data="p2iObjects" border="true" style="width:80%;margin:0 auto">
                    <el-table-column prop="title" label="title" width="250" align="center"></el-table-column>
                    <el-table-column prop="status" label="status" width="250" align="center"></el-table-column>
                    <el-table-column prop="originUrl" label="originUrl" width="300" align="center"></el-table-column>
                    <el-table-column prop="image_url" label="image_url" width="300" align="center"></el-table-column>
                </el-table>
            </el-card>
        </div> -->

    <el-dialog
      :title="$t(`award.generateDialogTitle`)"
      :visible.sync="dialog.visible"
      width="35%"
      :destroy-on-close="true"
    >
      <el-form :model="addForm" label-width="120px">
        <el-form-item :label="$t(`award.type`)">
          <el-select
            v-model="addForm.type"
            filterable
            allow-create
            default-first-option
            :placeholder="$t(`award.typePlaceholder`)"
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
        <el-form-item :label="$t(`award.title`)">
          <el-input
            v-model="addForm.title"
            :placeholder="$t(`award.titlePlaceholder`)"
          ></el-input>
        </el-form-item>
        <el-form-item :label="$t(`award.originUrl`)">
          <el-input
            v-model="addForm.url"
            :placeholder="$t(`award.urlPlaceholder`)"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitAddForm" size="mini">{{
            $t(`award.confirm`)
          }}</el-button>
          <vue-element-loading
            :active="show"
            spinner="bar-fade-scale"
            color="#FF6700"
          />
        </el-form-item>
      </el-form>
    </el-dialog>

    <el-dialog title="Media News" :visible.sync="visible1" width="60%">
      <div
        style="display: flex; background: #17113c; padding: 1rem 1rem 0 1rem"
      >
        <div style="margin: 0.5rem; width: 50%">
          <AwardsIfr :awards="intAwards" :height="'30rem'"></AwardsIfr>
          <div
            style="
              margin: 0.1rem auto;
              text-align: center;
              font-size: 2rem;
              color: #fff;
            "
          >
            So/Me
          </div>
        </div>
        <div style="margin: 0.5rem; width: 50%">
          <AwardsIfr :awards="extAwards" :height="'30rem'"></AwardsIfr>
          <div
            style="
              margin: 0.1rem auto;
              text-align: center;
              font-size: 2rem;
              color: #fff;
            "
          >
            Awards
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  generatorImage,
  generatorImages,
  batchSave,
  selectAll,
  deleteById,
  changeState,
} from "@/api/awards";
import store from "@/store";
import pageHeader from "@/components/pageHeader/index.vue";
import AwardsIfr from "@/view/screen/components/AwardsIfr/index.vue";
import { getAwards } from "@/api/board";
export default {
  name: "awards-index",
  components: {
    pageHeader,
    AwardsIfr,
  },
  data() {
    return {
      base_api: process.env.VUE_APP_BASE_API,
      addForm: {},
      tableVisable1: false,
      excelData: [],
      headers: {
        token: store.getters.token,
      },
      p2iObjects: [],
      show: false,
      show1: false,
      awards: [],
      dialog: {
        visible: false,
      },
      options: [
        {
          value: 1,
          label: "So/Me",
        },
        {
          value: 0,
          label: "Awards",
        },
      ],
      visible1: false,
      intAwards: [],
      extAwards: [],
    };
  },
  methods: {
    openDialog() {
      this.dialog.visible = true;
      for(let i in this.addForm){
        this.addForm[i] = ''
      }
    },
    async submitAddForm() {
      console.log(this.addForm);
      const { data: res } = await generatorImage(this.addForm);
      if (res.code == 200) {
        this.getAll();
        this.getIntAwards();
        this.getExtAwards();
        this.dialog.visible = false;
      } else {
        this.$message({
          type: "warning",
          message: res.msg,
        });
      }

      console.log(res.data);
    },
    async submitToBatch() {
      const { data: res } = await generatorImages(this.excelData);
      if (res.code == 200) {
        this.tableVisable1 = false;
        this.$refs.uploadRef.clearFiles();
        this.getAll();
        this.getIntAwards();
        this.getExtAwards();
      } else {
        this.$message({
          type: "warning",
          message: res.msg,
        });
      }
      // console.log(res.data)
    },
    handleSuccess(res) {
      if (res.code == 200) {
        this.excelData = res.data;
        this.tableVisable1 = true;
      } else {
        this.$message({
          type: "warning",
          message: res.msg,
        });
      }
    },
    cancle() {
      this.excelData = [];
      this.tableVisable1 = false;
      this.$refs.uploadRef.clearFiles();
    },
    async batchSave() {
      // console.log("批量保存")
      // console.log(this.p2iObjects)
      const { data: res } = await this.p2iObjects;
      if (res.code == 200) {
        this.getIntAwards();
        this.getExtAwards();
        this.getAll();
        this.tableVisable2 = false;
      } else {
        this.$message({
          type: "warning",
          message: res.msg,
        });
      }
      console.log(res);
    },
    async getAll() {
      const { data: res } = await selectAll();
      if (res.code == 200) {
        this.awards = res.data;
      } else {
        this.$message({
          type: "warning",
          message: res.msg,
        });
      }
      console.log(res.data);
    },
    async changeState(id) {
      const { data: res } = await changeState(id);
      if (res.code == 200) {
        this.$message({
          type: "success",
          message: "update statu successfully!",
        });
        this.getAll();
        this.getIntAwards();
        this.getExtAwards();
      } else {
        this.$message({
          type: "warning",
          message: res.msg,
        });
      }
    },
    deleteAward(id) {
      this.$confirm(this.$t(`award.deleteTips`), this.$t(`award.tips`), {
        confirmButtonText: this.$t(`award.confirm`),
        cancelButtonText: this.$t(`award.cancel`),
        type: "warning",
      })
        .then(async () => {
          const { data: res } = await deleteById(id);
          if (res.code == 200) {
            this.$message({
              type: "success",
              message: "delete award successfully!",
            });
            this.getAll();
            this.getIntAwards();
            this.getExtAwards();
          } else {
            this.$message({
              type: "warning",
              message: "delete award fail!",
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
    async getIntAwards() {
      const { data: res } = await getAwards(1); //1——So/Me
      if (res.code == 200) {
        this.intAwards = res.data;
      } else {
        this.$message({
          type: "warning",
          message: res.msg,
        });
      }
    },
    async getExtAwards() {
      const { data: res } = await getAwards(0); //0——Award
      if (res.code == 200) {
        this.extAwards = res.data;
      } else {
        this.$message({
          type: "warning",
          message: res.msg,
        });
      }
    },
    beforeUpload(file) {
      const fileName = file.name;
      const rightFilename = "Media_Links.xlsx";
      if (fileName !== rightFilename) {
        this.$confirm("请上传Media_Links.xlsx", this.$t(`eol.tips`), {
          confirmButtonText: this.$t(`eol.confirm`),
          cancelButtonText: this.$t(`eol.cancel`),
          type: "warning",
        });
        return false;
      }
    },
  },
  created() {},
  mounted() {
    this.getAll();
    this.getIntAwards();
    this.getExtAwards();
  },
};
</script>

<style lang="scss">
.awards-container {
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

.el-card ::v-deep .el-card__header {
  border: none;
}
</style>

<template>
  <div class="user-container">
    <pageHeader
      :title="$t(`resource.pageTitle`)"
      :describe="$t(`resource.pageDesc`)"
    ></pageHeader>
    <el-form
      :inline="true"
      size="mini"
      class="form-box"
      style="display: flex; width: calc(100% - 1rem); margin-left: 1rem"
    >
      <el-form-item :label="$t(`resource.category`)">
        <el-autocomplete
          class="inline-input"
          placeholder="请输入内容"
          v-model="queryCondition.category"
          :fetch-suggestions="querySearch"
        ></el-autocomplete>
        <!-- <el-input v-model="queryCondition.category" clearable placeholder="category">
                                </el-input> -->
      </el-form-item>
      <el-form-item :label="$t(`resource.name`)">
        <el-input
          v-model="queryCondition.name"
          clearable
          placeholder="name"
        ></el-input>
      </el-form-item>
      <el-form-item :label="$t(`resource.url`)">
        <el-input
          v-model="queryCondition.url"
          clearable
          placeholder="url"
        ></el-input>
      </el-form-item>
      <el-form-item style="margin-right: 10px">
        <el-button
          icon="el-icon-search"
          type="primary"
          @click="getResourceList"
          >{{ $t(`resource.query`) }}</el-button
        >
      </el-form-item>
    </el-form>

    <div class="new-create" style="margin: 1rem 0 0 1rem">
      <el-button
        class="create-button"
        type="primary"
        @click="openDialog(1)"
        size="mini"
        ><i class="el-icon-plus"></i>{{ $t(`resource.addCategory`) }}</el-button
      >
      <el-button
        class="create-button"
        type="success"
        @click="openDialog(2)"
        size="mini"
        style="margin-left:0"
        ><i class="el-icon-plus"></i>{{ $t(`resource.addResource`) }}</el-button
      >
      <el-button
        class="create-button"
        type="warning"
        @click="getResourceCategory()"
        size="mini"
        style="margin-left:0"
        ><i class="el-icon-view"></i>{{ $t(`resource.seeCategory`) }}</el-button
      >
      <!-- <el-upload :action="base_api + '/info_screen/project/excel/handler'" multiple :limit="1"
                                :on-success="handleSuccess" :headers="headers">
                                <el-button size="mini" type="primary">批量新增 (excel)</el-button>
                        </el-upload> -->
    </div>

    <el-table :data="records" stripe border>
      <el-table-column
        align="center"
        :label="$t(`resource.index`)"
        type="index"
        width="60"
      ></el-table-column>
      <el-table-column
        prop="categoryName"
        :label="$t(`resource.category`)"
        align="center"
        width="180"
      ></el-table-column>
      <el-table-column
        prop="name"
        :label="$t(`resource.name`)"
        align="center"
        width="180"
      ></el-table-column>
      <el-table-column
        prop="url"
        :label="$t(`resource.url`)"
        align="center"
  
      ></el-table-column>
      <el-table-column
        prop="description"
        :label="$t(`resource.description`)"
        align="center"
        width="180"
      ></el-table-column>
      <el-table-column
        prop="gmtCreate"
        :label="$t(`resource.createAt`)"
        align="center"
        width="250"
      ></el-table-column>
      <el-table-column
        prop="gmtModified"
        :label="$t(`resource.updateAt`)"
        align="center"
        width="250"
      ></el-table-column>
      <el-table-column :label="$t(`resource.operation`)" align="center" width="140">
        <template slot-scope="scope">
          <!-- <el-link
            type="primary"
            size="mini"
            @click="update(scope.row)"
            style="padding: 0 20px"
            >{{ $t(`resource.update`) }}</el-link
          >
          <el-link
            type="danger"
            size="mini"
            @click="deleteResourceById(scope.row.id)"
            style="padding: 0 20px"
            >{{ $t(`resource.delete`) }}</el-link
          > -->
          <div style="display: flex; justify-content: center; cursor: pointer">
            <div  @click="update(scope.row)" style="color: #409eff">
              <span>{{ $t(`resource.update`) }}</span>
            </div>
            <div
              @click="deleteResourceById(scope.row.id)"
              style="color: #409eff; margin-left: 10px"
            >
              <span>{{ $t(`resource.delete`) }}</span>
            </div>
          </div>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog
      :title="dialog1.title"
      :visible.sync="dialog1.visible"
      width="35%"
    >
      <el-form :model="form" label-width="120px">
        <el-form-item :label="$t(`resource.category`)">
          <el-input v-model="form.name" placeholder="请输入category"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="addCategory" size="mini">{{
            $t(`resource.confirm`)
          }}</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <el-dialog
      :title="dialog2.title"
      :visible.sync="dialog2.visible"
      width="35%"
    >
      <el-form :model="form" label-width="120px">
        <el-form-item :label="$t(`resource.category`)">
          <el-autocomplete
            class="inline-input"
            placeholder="请输入内容"
            v-model="form.category"
            :fetch-suggestions="querySearch"
            @select="handleSelect"
          ></el-autocomplete>
        </el-form-item>
        <el-form-item :label="$t(`resource.name`)">
          <el-input v-model="form.name" placeholder="name"></el-input>
        </el-form-item>
        <el-form-item :label="$t(`resource.url`)">
          <el-input v-model="form.url" placeholder="请输入url"></el-input>
        </el-form-item>
        <el-form-item :label="$t(`resource.description`)">
          <el-input
            class="inline-input"
            v-model="form.description"
            placeholder="请输入description"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="addResource" size="mini">{{
            $t(`resource.confirm`)
          }}</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <el-dialog
      :title="dialog4.title"
      :visible.sync="dialog4.visible"
      width="35%"
    >
      <el-form :model="form" label-width="120px">
        <el-form-item :label="$t(`resource.category`)">
          <el-autocomplete
            class="inline-input"
            placeholder="请输入内容"
            v-model="form.categoryName"
            :fetch-suggestions="querySearch"
            @select="handleSelect"
          ></el-autocomplete>
        </el-form-item>
        <el-form-item :label="$t(`resource.name`)">
          <el-input v-model="form.name" placeholder="name"></el-input>
        </el-form-item>
        <el-form-item :label="$t(`resource.url`)">
          <el-input v-model="form.url" placeholder="请输入url"></el-input>
        </el-form-item>
        <el-form-item :label="$t(`resource.description`)">
          <el-input
            class="inline-input"
            v-model="form.description"
            placeholder="请输入description"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="updateResource" size="mini">{{
            $t(`resource.confirm`)
          }}</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <el-dialog
      :title="dialog3.title"
      :visible.sync="dialog3.visible"
      width="35%"
    >
      <el-form :model="form" label-width="120px">
        <el-form-item :label="$t(`resource.category`)">
          <el-input v-model="form.name" placeholder="请输入category"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitUpdateForm" size="mini">{{
            $t(`resource.confirm`)
          }}</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <el-drawer
      :title="drawer.title"
      :visible.sync="drawer.visible"
      direction="rtl"
      size="20%"
    >
      <el-table :data="categories" stripe border>
        <el-table-column
          align="center"
          label="ID"
          type="index"
          width="60"
        ></el-table-column>
        <el-table-column
          prop="name"
          :label="$t(`resource.category`)"
          align="center"
          width="180"
        ></el-table-column>
        <el-table-column :label="$t(`resource.operation`)" align="center">
          <template slot-scope="scope">
            <el-link
              type="primary"
              size="mini"
              @click="updateCategory(scope.row)"
              style="padding: 0 20px"
              >{{ $t(`resource.update`) }}</el-link
            >
            <el-link
              type="danger"
              size="mini"
              @click="deleteCategory(scope.row.id)"
              style="padding: 0 20px"
              >{{ $t(`resource.delete`) }}</el-link
            >
          </template>
        </el-table-column>
      </el-table>
    </el-drawer>
  </div>
</template>

<script>
import pageHeader from "@/components/pageHeader/index.vue";
import {
  getResourceList,
  addResourceCategory,
  getResourceCategories,
  addResource,
  deleteResourceCategoryById,
  updateResourceCategory,
  searchList,
  deleteResourceById,
  updateResource,
} from "@/api/system";
export default {
  components: {
    pageHeader,
  },
  data() {
    return {
      records: [],
      queryCondition: {
        category: "",
        name: "",
        url: "",
      },
      dialog1: {
        title: "",
        visible: false,
      },
      dialog2: {
        title: "",
        visible: false,
      },
      dialog3: {
        title: "",
        visible: false,
      },
      dialog4: {
        title: "",
        visible: false,
      },
      form: {},
      categories: [],
      drawer: {
        title: "资源分类列表",
        visible: false,
      },
      searchList: [],
    };
  },
  created() {
    this.getResourceList();
    this.getSearchList();
  },
  methods: {
    async getResourceList() {
      console.log(this.queryCondition);
      const { data: res } = await getResourceList(this.queryCondition);
      this.records = res.data;
      console.log(res);
    },
    openDialog(type) {
      if (type == 1) {
        (this.dialog1.title = "新增资源分类"), (this.dialog1.visible = true);
      }
      if (type == 2) {
        (this.dialog2.title = "新增资源"), (this.dialog2.visible = true);
      }
      if (type == 3) {
        (this.dialog3.title = "资源分类更新"), (this.dialog3.visible = true);
      }
      if (type == 4) {
        (this.dialog4.title = "更新资源"), (this.dialog4.visible = true);
      }
    },
    async addCategory() {
      const { data: res } = await addResourceCategory(this.form);
      if (res.code == 200) {
        this.$message({
          type: "success",
          message: "add category successfully.",
        });
        this.form = {};
        this.dialog1.visible = false;
      } else {
        this.$message({
          type: "warning",
          message: res.msg,
        });
      }
    },
    async getResourceCategory() {
      console.log(`查看分类`);
      this.drawer.visible = true;
      const { data: res } = await getResourceCategories();
      if (res.code == 200) {
        this.categories = res.data;
      } else {
        this.$message({
          type: "warning",
          message: res.msg,
        });
      }
    },
    async addResource() {
      console.log(this.form);
      const { data: res } = await addResource(this.form);
      if (res.code == 200) {
        this.$message({
          type: "success",
          message: "add resource successfully.",
        });
        this.form = {};
        this.dialog2.visible = false;
        this.getResourceList();
      } else {
        this.$message({
          type: "warn",
          message: "add resource fail.",
        });
      }
    },
    deleteCategory(id) {
      this.$confirm(this.$t(`resource.deleteTips`), this.$t(`resource.tips`), {
        confirmButtonText: this.$t(`resource.confirm`),
        cancelButtonText: this.$t(`resource.cancel`),
        type: "warning",
      })
        .then(async () => {
          const { data: res } = await deleteResourceCategoryById(id);
          if (res.code == 200) {
            this.$message({
              type: "success",
              message: "delete category successfully.",
            });
            const { data: res } = await getResourceCategories();
            if (res.code == 200) {
              this.categories = res.data;
            }
            this.getSearchList();
          } else {
            this.$message({
              type: "warning",
              message: res.msg,
            });
          }
        })
        .catch((e) => {
          console.log(e);
        });
    },
    updateCategory(row) {
      this.form = row;
      this.openDialog(3);
    },
    async submitUpdateForm() {
      const { data: res } = await updateResourceCategory(this.form);
      if (res.code == 200) {
        this.$message({
          type: "success",
          message: "update category successfully.",
        });
        this.form = {};
        this.dialog3.visible = false;
        this.getResourceList();
        this.getSearchList();
        this.getResourceCategories();
      } else {
        this.$message({
          type: "warning",
          message: "update category fail.",
        });
        this.getResourceCategories();
        this.form = {};
        this.dialog3.visible = false;
      }
    },
    querySearch(searchString, cb) {
      console.log(searchString);
      cb(this.searchList);
    },
    async getSearchList() {
      const { data: res } = await searchList();
      console.log(res);
      if (res.code == 200) {
        this.searchList = res.data;
      } else {
        this.$message({
          type: "warning",
          message: res.msg,
        });
      }
    },
    handleSelect(item) {
      console.log(item);
      this.form.categoryId = item.categoryId;
    },
    deleteResourceById(id) {
      this.$confirm(this.$t(`resource.deleteTips`), this.$t(`resource.tips`), {
        confirmButtonText: this.$t(`resource.confirm`),
        cancelButtonText: this.$t(`resource.cancel`),
        type: "warning",
      })
        .then(async () => {
          const { data: res } = await deleteResourceById(id);
          if (res.code == 200) {
            this.$message({
              type: "success",
              message: "delete resource successfully.",
            });
            this.getResourceList();
          } else {
            this.$message({
              type: "warning",
              message: res.msg,
            });
          }
        })
        .catch((e) => {
        //   console.log(e);
        this.$message({
            type: "info",
            message: this.$t(`clock.cancelTooltip`),
          });
        });
    },
    update(row) {
      this.form = row;
      this.openDialog(4);
    },
    async updateResource() {
      const { data: res } = await updateResource(this.form);
      if (res.code == 200) {
        this.form = {};
        this.dialog4.visible = false;
        this.getResourceList();
        this.$message({
          type: "success",
          message: "update resource successfully.",
        });
      } else {
        this.$message({
          type: "error",
          message: "update resource error.",
        });
      }
    },
  },
};
</script>

<style lang='scss' scoped>
.user-container {
  padding: 0 0.6rem 1rem 0.6rem;
}

.new-create {
  display: flex;
  padding-bottom: 20px;

  .create-button {
    margin-right: 15px;
  }
}

.el-pagination {
  padding: 20px 0;
}

.el-checkbox {
  margin: 0;
  color: #888 !important;
}

.el-form {
  .el-form-item {
    margin: 0 20px 8px 0;

    .item-label {
      margin-right: 10px;
      font-size: 1rem;
    }
  }
}

.el-form-item__content {
  display: flex !important;
}
</style>
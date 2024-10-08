<template>
  <!-- 菜单页面 -->
  <div class="user-container">
    <pageHeader
      :title="$t(`menu.pageTitle`)"
      :describe="$t(`menu.pageDesc`)"
    ></pageHeader>
    <div class="new-create" style="margin-left: 1rem">
      <el-button
        v-if="parentId !== null"
        class="el-icon-arrow-left"
        type="success"
        size="mini"
        @click="getMenuListById(parentId)"
        >{{ $t(`menu.previous`) }}</el-button
      >
      <el-button
        class="create-button"
        type="primary"
        @click="openDialog(1)"
        size="mini"
      >
        <i class="el-icon-plus"></i>{{ $t(`menu.addMenu`) }}</el-button
      >
      <!-- <el-button class="create-button" type="success" @click="openDialog(2)" size="mini">新增资源</el-button>
                        <el-button class="create-button" type="warning" @click="" size="mini">查看分类</el-button> -->
      <!-- <el-upload :action="base_api + '/info_screen/project/excel/handler'" multiple :limit="1"
                                :on-success="handleSuccess" :headers="headers">
                                <el-button size="mini" type="primary">批量新增 (excel)</el-button>
                        </el-upload> -->
    </div>

    <el-table :data="records" stripe border>
      <el-table-column
        align="center"
        :label="$t(`menu.index`)"
        type="index"
        width="60"
      ></el-table-column>
      <el-table-column
        prop="name"
        :label="$t(`menu.name`)"
        align="center"
        width="120"
      ></el-table-column>
      <el-table-column
        prop="title"
        :label="$t(`menu.title`)"
        align="center"
        width="150"
      ></el-table-column>
      <el-table-column
        prop="enTitle"
        :label="$t(`menu.enTitle`)"
        align="center"
        width="150"
      ></el-table-column>
      <el-table-column
        prop="uri"
        :label="$t(`menu.uri`)"
        align="center"
        width="120"
      ></el-table-column>
      <el-table-column
        prop="icon"
        :label="$t(`menu.icon`)"
        align="center"
        width="150"
      >
        <template slot-scope="scope">
          <i :class="scope.row.icon" style="font-size: 20px"></i>
        </template>
      </el-table-column>
      <el-table-column
        prop="children"
        :label="$t(`menu.children`)"
        align="center"
        width="120"
      >
        <template slot-scope="scope">
          <el-link
            v-if="scope.row.children.length !== 0"
            type="primary"
            @click="getChild(scope.row.children)"
            >{{ $t(`menu.next`) }}</el-link
          >
          <el-link v-else type="primary" disabled>{{
            $t(`menu.next`)
          }}</el-link>
        </template>
      </el-table-column>
      <el-table-column
        prop="level"
        :label="$t(`menu.level`)"
        align="center"
        width="100"
      ></el-table-column>
      <el-table-column
        prop="gmtCreate"
        :label="$t(`menu.creatAt`)"
        align="center"
        width="220"
      ></el-table-column>
      <el-table-column
        prop="gmtModified"
        :label="$t(`menu.updateAt`)"
        align="center"
        width="220"
      ></el-table-column>
      <el-table-column :label="$t(`menu.operation`)" align="center">
        <template slot-scope="scope">
          <!-- <el-link
            type="primary"
            size="mini"
            @click="updateMenu(scope.row)"
            style="padding: 0 20px"
            >{{ $t(`menu.edit`) }}</el-link
          >
          <el-link
            v-if="scope.row.children.length === 0"
            type="danger"
            size="mini"
            @click="deleteMenu(scope.row.id)"
            style="padding: 0 20px"
            >{{ $t(`menu.delete`) }}</el-link
          > -->
          <div style="display: flex; justify-content: center; cursor: pointer">
            <div @click="updateMenu(scope.row)" style="color: #409eff">
              <span>{{ $t(`menu.edit`) }}</span>
            </div>
            <div
              @click="deleteMenu(scope.row.id)"
              style="color: #409eff; margin-left: 10px"
            >
              <span>{{ $t(`menu.delete`) }}</span>
            </div>
          </div>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :title="dialog.title" :visible.sync="dialog.visible" width="35%">
      <el-form :model="form" label-width="120px">
        <el-form-item :label="$t(`menu.parent`)">
          <el-select v-model="form.parentId" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.title"
              :label="item.title"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t(`menu.name`)">
          <el-input v-model="form.name" placeholder="name"></el-input>
        </el-form-item>
        <el-form-item :label="$t(`menu.title`)">
          <el-input v-model="form.title" placeholder="title"></el-input>
        </el-form-item>
        <el-form-item :label="$t(`menu.enTitle`)">
          <el-input v-model="form.enTitle" placeholder="enTitle"></el-input>
        </el-form-item>
        <el-form-item :label="$t(`menu.uri`)">
          <el-input v-model="form.uri" placeholder="uri"></el-input>
        </el-form-item>
        <el-form-item :label="$t(`menu.icon`)">
          <el-input v-model="form.icon" placeholder="icon"></el-input>
        </el-form-item>

        <el-form-item :label="$t(`menu.level`)">
          <el-input v-model="form.level" placeholder="level"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submit" size="mini">{{
            $t(`menu.confirm`)
          }}</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import pageHeader from "@/components/pageHeader/index.vue";
import { getMenuList } from "@/api/system";
import { addMenu, updateMenu, deleteMenu, getMenuListById } from "@/api/menu";
export default {
  components: {
    pageHeader,
  },
  data() {
    return {
      records: [],
      options: [],
      dialog: {
        title: "",
        visible: false,
      },
      form: {},
      update: false,
      parentId: null,
    };
  },
  created() {
    this.getMenuList();
  },
  methods: {
    openDialog(type) {
      if (type == 1) {
        this.form = {};
        this.dialog.title = "新增菜单";
      } else {
        this.dialog.title = "更新菜单";
        this.form = {};
      }
      this.dialog.visible = !this.visible;
    },
    async getMenuList() {
      const { data: res } = await getMenuList();
      if (res.code == 200) {
        this.records = res.data;
        this.options = JSON.parse(JSON.stringify(res.data));
        this.options.push({ title: "无上级", id: this.records[0].parentId });
      } else {
        this.$message({
          type: "warning",
          message: res.msg,
        });
      }
    },
    getChild(children) {
      console.log(children);
      this.parentId = this.records[0].parentId;
      this.records = children;
      this.options = JSON.parse(JSON.stringify(this.records));
      this.options.push({ title: "无上级", id: this.records[0].parentId });
    },
    async submit() {
      console.log(this.form);
      if (this.update) {
        const { data: res } = await updateMenu(this.form);
        if (res.code == 200) {
          this.$message({
            type: "success",
            message: "update menu successfully.",
          });
          this.form = [];
          this.dialog.visible = false;
          this.getMenuListById(this.records[0].parentId);
          this.update = false;
        } else {
          this.$message({
            type: "warn",
            message: "update menu failure.",
          });
          this.form = [];
          this.dialog.visible = false;
          this.update = false;
          this.getMenuListById(this.records[0].parentId);
        }
      } else {
        const { data: res } = await addMenu(this.form);
        if (res.code == 200) {
          this.dialog.visible = false;
          this.$message({
            type: "success",
            message: "add menu successfully.",
          });
          this.getMenuListById(this.records[0].parentId);
        }
      }
    },
    deleteMenu(id) {
      this.$confirm("确认删除这条记录吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          const { data: res } = await deleteMenu(id);
          if (res.code == 200) {
            this.$message({
              type: "success",
              message: "delete menu successfully.",
            });
            this.getMenuListById(this.records[0].parentId);
          } else {
            this.$message({
              type: "warn",
              message: "delete menu failure.",
            });
            //this.getMenuListById(this.records[0].parentId)
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
    updateMenu(row) {
      this.openDialog(2);
      this.form = row;
      this.update = true;
    },
    async getMenuListById(id) {
      const { data: res } = await getMenuListById(id);
      if (res.code == 200) {
        this.records = res.data;
        this.parentId = res.data[0].parentId;
        this.options = JSON.parse(JSON.stringify(res.data));
        this.options.push({ title: "无上级", id: this.records[0].parentId });
        console.log(res);
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
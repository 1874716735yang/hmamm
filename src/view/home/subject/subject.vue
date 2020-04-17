<template>
  <div class="subject">
    <el-card>
      <el-form :inline="true" :model="form" class="demo-form-inline" ref="form">
        <el-form-item label="学科编号" prop="rid">
          <el-input v-model="form.rid"></el-input>
        </el-form-item>
        <el-form-item label="学科名称" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="创建者" prop="username">
          <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="zip">
          <el-select v-model="form.status" placeholder="请选择状态">
            <el-option label="禁用" value="0"></el-option>
            <el-option label="启用" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">搜索</el-button>
          <el-button @click="reset">清除</el-button>
          <el-button type="primary" @click="addSubject" v-if="$store.state.role!='学生'">
            <span>+</span> 新增学科
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <br />
    <el-card>
      <el-table :data="tableData" style="width: 100%" max-height="250">
        <el-table-column fixed prop="id" label="序号" width="100">
          <template
            slot-scope="scope"
          >{{(pagination.currentPage-1)*pagination.pageSize+scope.$index+1}}</template>
        </el-table-column>
        <el-table-column prop="rid" label="学科编号"></el-table-column>
        <el-table-column prop="name" label="学科名称"></el-table-column>
        <el-table-column prop="short_name" label="简称"></el-table-column>
        <el-table-column prop="username" label="创建者"></el-table-column>
        <el-table-column prop="create_time" label="创建日期"></el-table-column>
        <el-table-column prop="zip" label="状态">
          <template slot-scope="scope">{{scope.row.status==1?"启用":"禁用"}}</template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" v-if="$store.state.role!='学生'">
          <template slot-scope="scope">
            <el-button @click="edit(scope.row)" type="text" size="small">编辑</el-button>
            <el-button
              @click="sevet(scope.row.id)"
              type="text"
              size="small"
            >{{scope.row.status==0?"启用":"禁用"}}</el-button>
            <el-button @click="remnet(scope.row.id)" type="text" size="small" v-if="$store.state.role.includes('管理员')">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pagination.currentPage"
          :page-sizes="[1, 20, 30, 40]"
          :page-size="pagination.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pagination.total"
        ></el-pagination>
      </div>
    </el-card>
    <addSubject ref="addSubject" @add="onSubmit" :mode="mode"></addSubject>
  </div>
</template>

<script>
import {
  getSubjectData,
  seteSubjectData,
  deleSubjectData
} from "@/api/subject.js";
import addSubject from "./addSubject";
export default {
  components: {
    addSubject
  },
  data() {
    return {
      mode: "add",
      pagination: {
        pageSize: 1,
        currentPage: 1,
        total: 2
      },

      form: {
        rid: "", //学科编号
        name: "", //学科名称
        username: "", //创建者
        status: "" //状态
      },
      tableData: []
    };
  },
  methods: {
    getData() {
      let _page = {
        page: this.pagination.currentPage, //页码
        limit: this.pagination.pageSize, //页容
        ...this.form
      };
      window.console.log("用户", this.$route);
      document.title = this.$route.meta.teta;
      getSubjectData(_page).then(res => {
        this.tableData = res.data.items;
        this.pagination.total = res.data.pagination.total;
        window.console.log(res);
      });
    },
    // 点击搜索功能
    onSubmit() {
      console.log("submit!");
      this.pagination.currentPage = 1;
      this.getData();
    },
    // 点击清除功能
    reset() {
      this.$refs.form.resetFields();
      this.onSubmit();
    },
    //点击状态
    sevet(id) {
      seteSubjectData({ id: id }).then(() => {
        this.$message.success("设置状态成功");
        this.onSubmit();
      });
    },
    // 点击删除
    remnet(id) {
      this.$confirm("您是要删除此条数据吗?", "删除", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          window.console.log(id);
          deleSubjectData({ id: id }).then(() => {
            this.$message.success("删除成功!");
            this.onSubmit();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    //点击新增
    addSubject() {
      this.mode="add"
      this.$refs.addSubject.form={
          rid: "", //学科编号
        name: "", //学科名称
        short_name: "", //学科简称
        intro: "", //学科简介
        remark: "" //学
      }
      this.$refs.addSubject.dialogFormVisible = true;
    },
    handleSizeChange(size) {
      this.pagination.pageSize = size;
      this.pagination.currentPage = 1;
      this.getData();
    },
    handleCurrentChange(page) {
      this.pagination.currentPage = page;
      this.getData();
    },
    //点击编辑
    edit(row) {
      window.console.log(row);
      this.mode = "edit";
      this.$refs.addSubject.form = JSON.parse(JSON.stringify(row));
      this.$refs.addSubject.dialogFormVisible = true;
    }
  },

  created() {
    this.getData();
  }
};
</script>

<style lang="less">
.pagination {
  text-align: center;
}
</style>
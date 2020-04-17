<template>
  <div class="userList">
    <el-card>
      <el-form :inline="true" :model="form" class="demo-form-inline" ref="form">
        <el-form-item label="用户名称" prop="username">
          <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="用户邮箱" prop="email">
          <el-input v-model="form.email"></el-input>
        </el-form-item>
        <el-form-item label="角色" prop="role_id">
          <el-select v-model="form.role_id" placeholder="请选择状态">
            <el-option
              v-for="(value,key, index) in $store.state.roleObj"
              :key="index"
              :value="key"
              :label="value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search">搜索</el-button>
          <el-button @click="remond">清除</el-button>
          <el-button type="primary" @click="apped">
            <span>+</span> 新增用户
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <br />
    <el-card>
      <!-- 
        el-table   data绑定全部数据  
        el-table-column  栏   label当前栏的标题   width可以设置宽度  prop="当前栏对应数据字段名"
      自定义栏
          1：在需要自定义的栏里面加入template
          2:在该template上获取当前 行的所有数据   slot-scope="变量"
          注意点：该变量是一个局部变量，只能用于template里面
            变量.$index="当前数据的序号，从0开始"
            变量.row  当前 行的所有字段 数据      
      
      -->
      <el-table :data="tableData">
        <el-table-column label="序号" width="50px">
          <template
            slot-scope="scope"
          >{{(pagination.currentPage-1)*pagination.pageSize+scope.$index+1}}</template>
        </el-table-column>
        <el-table-column label="用户名 " prop="username"></el-table-column>
        <el-table-column label="电话 " prop="phone"></el-table-column>
        <el-table-column label="邮箱" prop="email"></el-table-column>
        <el-table-column label="角色 " prop="role"></el-table-column>
        <el-table-column label="备注" prop="remark"></el-table-column>
        <el-table-column label="状态" width="100px">
          <template slot-scope="scope">{{scope.row.status==1?'启用':'禁用'}}</template>
        </el-table-column>
        <el-table-column label="操作" width="270px">
          <template slot-scope="scope">
            <el-button @click="edit(scope.row)">编辑</el-button>
            <!-- scope 获取了整行数据   $index 数据索引项  0开始   row  接口返回的整行数据-->
            <el-button @click="setStatus(scope.row.id)">{{scope.row.status==0?'启用':'禁用'}}</el-button>
            <el-button @click="del(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pagination.currentPage"
          :page-sizes="[2, 20, 30, 40]"
          :page-size="pagination.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pagination.total"
        ></el-pagination>
      </div>
    </el-card>
    <adduserList ref="adduserList" :mode="mode"></adduserList>
  </div>
</template>

<script>
import adduserList from "./adduserList.vue";
import { getUserList, setUserList, deleUserList } from "@/api/userList.js";
// import { deleBusinessData, setBusinessStayus } from "@/api/business.js";
export default {
  components: {
    adduserList
  },
  
  data() {
    return {
      mode: "add",
      pagination: {
        pageSize: 2,
        currentPage: 1,
        total: 2
      },
      form: {
        username: "", //用户名
        email: "", //邮箱
        phone: "", //电话
        role_id: "", //角色
        scope: "", //状态
        remark: "" //用户备注
      },

      tableData: []
    };
  },
  methods: {
    // 点击搜索
    search() {
      this.pagination.currentPage = 1;
      this.userData();
    },
    //点击清除
    remond() {
      this.$refs.form.resetFields();
      this.userData();
    },
    userData() {
      let _user = {
        page: this.pagination.currentPage,
        limit: this.pagination.pageSize,
        ...this.form
      };
      getUserList(_user).then(res => {
        this.tableData = res.data.items;
        this.pagination.total = res.data.pagination.total;
        window.console.log(res);
      });
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pagination.pageSize = val;
      this.userData();
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.pagination.currentPage = val;
      this.userData();
    },
    // 新增
    apped() {
      this.mode = "add";
      this.$refs.adduserList. form= {
        username: "", //用户名
        email: "", //邮箱
        phone: "", //电话
        role_id: "", //角色
        scope: "" ,//状态
        remark: "" //用户备注
      }
      this.$refs.adduserList.dialogFormVisible = true;
    },
    //删除
    del(id) {
      this.$confirm("您是要删除此条数据吗?", "删除", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          window.console.log(id);
          deleUserList({ id: id }).then(() => {
            this.$message.success("删除成功!");
            this.search();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    //状态修改
    setStatus(id) {
      setUserList({ id: id }).then(() => {
        this.$message.success("状态修改成功!");
        this.userData();
      });
    },
    //点击编辑
    edit(row) {
      window.console.log(row);
      this.mode = "edit";
      this.$refs.adduserList.form = JSON.parse(JSON.stringify(row));
      this.$refs.adduserList.dialogFormVisible = true;
    }
  },
  created() {
    this.userData();
  }
};
</script>

<style>
</style>
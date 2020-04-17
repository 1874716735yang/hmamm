<template>
  <div class="business">
    <el-card>
      <el-form :inline="true" :model="form" class="demo-form-inline" ref="form">
        <el-form-item label="企业编号" prop="eid">
          <el-input v-model="form.eid"></el-input>
        </el-form-item>
        <el-form-item label="企业名称" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="创建者" prop="username">
          <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-select v-model="form.status" placeholder="请选择状态">
            <el-option label="禁用" value="0"></el-option>
            <el-option label="启用" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search">搜索</el-button>
          <el-button @click="remode">清除</el-button>
          <el-button type="primary" @click="apped">
            <span>+</span> 新增企业
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
        <el-table-column prop="rid" label="企业编号"></el-table-column>
        <el-table-column prop="name" label="企业名称"></el-table-column>
        <el-table-column prop="username" label="创建者"></el-table-column>
        <el-table-column prop="create_time" label="创建日期"></el-table-column>
        <el-table-column prop="status" label="状态">
          <template slot-scope="scope">
            <div :class="{red:scope.row.status==0}">{{scope.row.status==1?"启用":"禁用"}}</div>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作">
          <template slot-scope="scope">
            <el-button size="small" @click="edit(scope.row)">编辑</el-button>
            <el-button
              @click="setStatus(scope.row.id)"
              size="small"
              :type="scope.row.status==1?'info':'success'"
            >{{scope.row.status==0?"启用":"禁用"}}</el-button>
            <el-button size="small" @click="del(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="block">
        <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pagination.currentPage"
          :page-sizes="[1, 200, 300, 400]"
          :page-size="pagination.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pagination.total"
        ></el-pagination>
      </div>
    </el-card>
    <addBusiness ref="addBusiness" :mode="mode"></addBusiness>
  </div>
</template>

<script>
import addBusiness from "./addBusiness.vue";
import { getBusinessData,deleBusinessData,setBusinessStayus} from "@/api/business.js";
export default {
  components: {
    addBusiness
  },
  data() {
    return {
      mode:"add",
      pagination: {
        pageSize: 1,
        currentPage: 1,
        total: 2
      },
      form: {
        eid: "", //企业编号
        name: "", //企业名称
        username: "", //创建者
        status: "" //状态
      },
      tableData: []
    };
  },
  created() {
    this.getDota();
  },
  methods: {
    // 分装方法
    getDota() {
      let _params = {
        page: this.pagination.currentPage,
        limit: this.pagination.pageSize,
        ...this.form
      };
      getBusinessData(_params).then(res => {
        window.console.log("企业", res);
        this.tableData = res.data.items;
        this.pagination.total = res.data.pagination.total;
      });
    },
    // 点击搜索
    search() {
      window.console.log(this.form);
      this.pagination.currentPage = 1;
      this.getDota();
    },
    // 分页
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pagination.pageSize = val;
      this.search();
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.pagination.currentPage = val;
      this.getDota();
    },
    // 点击清除
    remode() {
      this.$refs.form.resetFields();
      this.search();
    },
    // 新增
    apped() {
       this.mode = "add";
       this.$refs.addBusiness.form= {
        eid: "", //企业编号
        name: "", //企业名称
        short_name: "", //企业简称
        intro: "", //企业简介
        remark: "" //企业备注
      }
      this.$refs.addBusiness.dialogFormVisible = true;
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
          deleBusinessData({ id: id }).then(() => {
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
    setStatus(id){
      setBusinessStayus({id:id}).then(()=>{
        this.$message.success("状态修改成功!");
        this.getDota();
      })
    },
    //点击编辑
    edit(row) {
      window.console.log(row);
      this.mode = "edit";
     this.$refs.addBusiness.form=JSON.parse(JSON.stringify(row))
     this.$refs.addBusiness.dialogFormVisible = true;
    }
  }
};
</script>

<style lang="less">
.business {
  .block {
    text-align: center;
  }
  .red {
    color: red;
  }
}
</style>
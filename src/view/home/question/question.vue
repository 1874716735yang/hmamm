<template>
  <div>
    <el-card>
      <el-form :model="form" label-width="80px" ref="form">
        <el-row>
          <el-col :span="5">
            <el-form-item label="学科" prop="subject">
              <el-select placeholder="请选择学科" v-model="form.subject">
                <el-option
                  v-for="(item, index) in getSubjectlist"
                  :label="item.name"
                  :key="index"
                  :value="item.id"
                  v-show="item.status==1"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="阶段" prop="step">
              <el-select placeholder="请选择阶段" v-model="form.step">
                <el-option
                  :label="value"
                  :value="+key"
                  v-for="(value, key,index) in stepObj"
                  :key="index"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="企业" prop="enterprise">
              <el-select placeholder="请选择企业" v-model="form.enterprise">
                <el-option
                  v-for="(item, index) in getBusinesslist"
                  :key="index"
                  :label="item.name"
                  :value="item.id"
                  v-show="item.status==1"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="题型" prop="type">
              <el-select placeholder="请选择题型" v-model="form.type">
                <el-option
                  v-for="(value, key,index) in typeObj"
                  :label="value"
                  :value="+key"
                  :key="index"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="难度" prop="difficulty">
              <el-select placeholder="请选择难度" v-model="form.difficulty">
                <el-option
                  v-for="(value, key,index) in difficultyObj"
                  :label="value"
                  :value="+key"
                  :key="index"
                ></el-option>
                <!-- <el-option label="简单" :value="1"></el-option>
                <el-option label="一般" :value="2"></el-option>
                <el-option label="困难" :value="3"></el-option>-->
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="作者" prop="username">
              <el-input v-model="form.username"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="状态" prop="status">
              <el-select placeholder="请选择状态" v-model="form.status">
                <el-option label="禁用" :value="0"></el-option>
                <el-option label="启用" :value="1"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="日期" prop="create_date">
              <div class="block">
                <el-date-picker type="date" placeholder="选择日期" v-model="form.create_date"></el-date-picker>
              </div>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="标题" prop="title">
              <el-input v-model="form.title"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label-width="10px">
              <el-button type="primary" @click="search">搜索</el-button>
              <el-button @click="reset">清除</el-button>
              <el-button type="primary" @click="add">+新增试题</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
    <br />
    <el-card>
      <el-table :data="questionlist" :border="true">
        <el-table-column label="序号">
          <template
            slot-scope="scope"
          >{{(pagination.currentPage-1)*pagination.pageSize+scope.$index+1}}</template>
        </el-table-column>
        <el-table-column label="题目">
          <template slot-scope="scope">
            <div v-html="scope.row.title"></div>
          </template>
        </el-table-column>
        <el-table-column label="学科.阶段">
          <template slot-scope="scope">{{scope.row.subject_name}}.{{stepObj[scope.row.step]}}</template>
        </el-table-column>
        <el-table-column label="题型">
          <template slot-scope="scope">{{typeObj[scope.row.type]}}</template>
        </el-table-column>
        <el-table-column label="企业" prop="enterprise_name"></el-table-column>
        <el-table-column label="创建者" prop="username"></el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">{{scope.row.status==0?'禁用':'启用'}}</template>
        </el-table-column>
        <el-table-column label="访问量" prop="reads"></el-table-column>
        <el-table-column label="操作" width="280px">
          <template slot-scope="scope">
            <el-button @click="edit(scope.row)">编辑</el-button>
            <el-button
              @click="setStatus(scope.row.id)"
              :type="scope.row.status==1?'info':'success'"
            >{{scope.row.status==0?'禁用':'启用'}}</el-button>
            <el-button @click="remove(scope.row.id)">删除</el-button>
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
    <addquestion
      ref="addquestion"
      :getSubjectlist="getSubjectlist"
      :getBusinesslist="getBusinesslist"
      :stepObj="stepObj"
      :typeObj="typeObj"
      :difficultyObj="difficultyObj"
      :mode="mode"
    ></addquestion>
  </div>
</template>

<script>
import { getSubjectData } from "@/api/subject.js";
import { getBusinessData } from "@/api/business.js";
import {
  questionlist,
  removequestionlist,
  statusquestionlist
} from "@/api/question.js";
import addquestion from "./addquestion";
export default {
  components: {
    addquestion
  },
  data() {
    return {
      mode: "add",
      pagination: {
        pageSize: 1,
        currentPage: 1,
        total: 1
      },
      form: {
        step: "", //
        enterprise: "", //
        type: "", //
        difficulty: "", //
        username: "", //
        status: "", //
        create: "", //
        title: "" //
      },
      stepObj: { 1: "初级", 2: "中级", 3: "高级" },
      typeObj: { 1: "单选", 2: "多选", 3: "简答" },
      difficultyObj: { 1: "简单", 2: "一般", 3: "困难" },
      getSubjectlist: [],
      getBusinesslist: [],
      questionlist: []
    };
  },
  created() {
    getSubjectData({ limit: 1000 }).then(res => {
      this.getSubjectlist = res.data.items;
      // window.close.log(res)
    });
    getBusinessData({ limit: 1000 }).then(res => {
      this.getBusinesslist = res.data.items;
      // window.close.log(res)
    });
    this.getData();
  },
  methods: {
    getData() {
      let _params = {
        page: this.pagination.currentPage,
        limit: this.pagination.pageSize,
        ...this.form
      };
      questionlist(_params).then(res => {
        this.questionlist = res.data.items;
        this.questionlist.forEach(item => {
          item.city = item.city.split(",");
          item.multiple_select_answer = item.multiple_select_answer.split(",");
        });
        this.pagination.total = res.data.pagination.total;
      });
    },
    //搜索
    search() {
      this.pagination.currentPage = 1;
      this.getData();
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
      this.getData();
    },
    // 新增
    add() {
      this.mode = "add";
      this.$refs.addquestion.form = {
        subject: "", //学科id标识
        step: "", //阶段
        enterprise: "", // 企业
        city: [], //省
        type: 1, //题型
        difficulty: 1, //题目难度
        title: "", //标题
        single_select_answer: "", //单选题
        multiple_select_answer: [], //多选题
        short_answer: "", //简答
        video: "", //解析视频
        answer_analyze: "", //答案解析
        remark: "", //答案备注
        select_options: [
          {
            label: "A",
            text: "狗不理",
            image: ""
          },
          {
            label: "B",
            text: "猫不理",
            image: ""
          },
          {
            label: "C",
            text: "麻花",
            image: ""
          },
          {
            label: "D",
            text: "炸酱面",
            image: ""
          }
        ]
      };
      this.$refs.addquestion.dialogVisible = true;
    },
    //清除
    reset() {
      this.$refs.form.resetFields();
      this.search();
    },
    //删除
    remove(id) {
      this.$confirm("您是要删除此条数据吗?", "删除", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          window.console.log(id);
          removequestionlist({ id: id }).then(() => {
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
    //状态
    setStatus(id) {
      statusquestionlist({ id: id }).then(() => {
        this.$message.success("状态修改成功!");
        this.getData();
      });
    },
    //编辑
    edit(row) {
      this.mode = "edit";
      this.$refs.addquestion.form = JSON.parse(JSON.stringify(row));
      this.$refs.addquestion.dialogVisible = true;
      window.console.log(JSON.parse(JSON.stringify(row)));
    }
  }
};
</script>

<style lang="less">
.block {
  text-align: center;
}
</style>
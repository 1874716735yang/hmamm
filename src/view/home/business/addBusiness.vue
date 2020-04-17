<template>
  <el-dialog :visible.sync="dialogFormVisible" class="addBusiness" width="600px">
    <div slot="title" class="title">{{mode=="add"?"新增企业":"编辑企业"}}</div>
    <el-form :model="form" label-width="100px" :rules="rules" ref="form">
      <!-- 企业编号 -->
      <el-form-item label="企业编号" prop="eid">
        <el-input v-model="form.eid"></el-input>
      </el-form-item>
      <!-- 企业名称 -->
      <el-form-item label="企业名称" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <!-- 企业简称 -->
      <el-form-item label="企业简称" prop="short_name">
        <el-input v-model="form.short_name"></el-input>
      </el-form-item>
      <!-- 企业简介 -->
      <el-form-item label="企业简介" prop="intro">
        <el-input v-model="form.intro"></el-input>
      </el-form-item>
      <!-- 企业备注 -->
      <el-form-item label="企业备注">
        <el-input v-model="form.remark"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="btn">
      <el-button @click="dialogFormVisible= false">取消</el-button>
      <el-button type="primary" @click="submitclick">确认</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { addBusinessData, editBusinessStayus } from "@/api/business";
export default {
  props: ["mode"],
  data() {
    return {
      dialogFormVisible: false,
      rules: {
        // 企业编号
        eid: [{ required: true, message: "请输入编号", trigger: "blur" }],
        // 企业名称
        name: [{ required: true, message: "请输入名称", trigger: "blur" }],
        // 企业简称
        short_name: [
          { required: true, message: "请输入企业简称", trigger: "blur" }
        ],
        // 企业简介
        intro: [{ required: true, message: "请输入企业简介", trigger: "blur" }]
      },
      form: {
        eid: "", //企业编号
        name: "", //企业名称
        short_name: "", //企业简称
        intro: "", //企业简介
        remark: "" //企业备注
      }
    };
  },
  methods: {
    submitclick() {
      this.$refs.form.validate(result => {
        window.console.log(result);
        if (result) {
          if (this.mode == "add") {
            addBusinessData(this.form).then(() => {
              this.$message.success("添加成功");
              this.dialogFormVisible = false;
              this.$parent.search();
            });
          }else{
             editBusinessStayus(this.form).then(() => {
              this.$message.success("编辑成功");
              this.dialogFormVisible = false;
              this.$parent.search();
            }); 
          }
        }
      });
    }
  }
};
</script>

<style lang="less">
.addBusiness {
  .el-dialog__header {
    padding: 0;
  }
  .el-dialog__headerbtn .el-dialog__close {
    color: #fff;
  }
  .title {
    height: 53px;
    background: rgba(3, 192, 249, 1);
    color: #fff;
    text-align: center;
    line-height: 53px;
  }
  .btn {
    text-align: center;
  }
}
</style>
<template>
  <el-dialog :visible.sync="dialogFormVisible" class="addSubject" width="600px" :show-close="true">
    <div slot="title" class="title">{{mode=="add"?"新增学科":"编辑学科"}}</div>
    <el-form :model="form" label-width="100px" :rules="rules" ref="form">
      <!-- 学科编号 -->
      <el-form-item label="学科编号" prop="rid">
        <el-input v-model="form.rid"></el-input>
      </el-form-item>
      <!-- 学科名称 -->
      <el-form-item label="学科名称" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <!-- 学科简称 -->
      <el-form-item label="学科简称">
        <el-input v-model="form.short_name"></el-input>
      </el-form-item>
      <!-- 学科简介 -->
      <el-form-item label="学科简介">
        <el-input v-model="form.intro"></el-input>
      </el-form-item>
      <!-- 学科备注 -->
      <el-form-item label="学科备注">
        <el-input v-model="form.remark"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="btn">
      <el-button @click="dialogFormVisible= false">取消</el-button>
      <el-button type="primary" @click="submitClick">确认</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { addSubjectData, editSubjectData } from "@/api/subject.js";
export default {
  props: {
    mode: {
      type: String,
      default: "add"
    }
  },
  data() {
    return {
      dialogFormVisible: false,
      form: {
        rid: "", //学科编号
        name: "", //学科名称
        short_name: "", //学科简称
        intro: "", //学科简介
        remark: "" //学科备注
      },
      rules: {
        // 学科编号
        rid: [{ required: true, message: "请输入编号", trigger: "blur" }],
        // 学科名称
        name: [{ required: true, message: "请输入名称", trigger: "blur" }]
      }
    };
  },
  watch: {
    dialogFormVisible(newVal) {
    //   this.$refs.form.clearValidate()
      if (newVal == false) {
        this.$refs.form.resetFields();
      }
    },
    mode() {
      this.$nextTick(() => {
        this.$refs.form.clearValidate();
      });
    }
  },
  methods: {
    submitClick() {
      this.$refs.form.validate(result => {
        window.console.log(result);
        if (result) {
          if (this.mode == "add") {
            addSubjectData(this.form).then(() => {
              this.$message.success("新增成功");
              this.dialogFormVisible = false;
              // this.$parent.onSubmit();
              this.$emit("add");
            });
          } else {
            editSubjectData(this.form).then(() => {
              this.$message.success("编辑成功");
              this.dialogFormVisible = false;
            //   this.$emit("add");
            this.$parent.onSubmit();
            });
          }
        }
      });
    }
  }
};
</script>

<style lang="less">
.addSubject {
  color: aliceblue;
  .title {
    height: 53px;
    background: rgba(3, 192, 249, 1);
    color: #fff;
    text-align: center;
    line-height: 53px;
  }
  .el-dialog__header {
    padding: 0;
  }
  .el-dialog__headerbtn .el-dialog__close {
    color: aliceblue;
  }
  .btn {
    text-align: center;
  }
}
</style>
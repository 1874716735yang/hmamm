<template>
  <el-dialog :visible.sync="dialogFormVisible" class="addBusiness" width="600px">
    <div slot="title" class="title">{{mode=="add"?"新增用户":"编辑用户"}}</div>
    <el-form :model="form" label-width="100px" :rules="rules" ref="form">
      <!-- 用户名 -->
      <el-form-item label="用户名" prop="username">
        <el-input v-model="form.username"></el-input>
      </el-form-item>
      <!-- 邮箱 -->
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="form.email"></el-input>
      </el-form-item>
      <!-- 电话 -->
      <el-form-item label="电话" prop="phone">
        <el-input v-model="form.phone"></el-input>
      </el-form-item>
      <!-- 角色 -->
      <el-form-item label="角色" prop="role_id">
          <el-select v-model="form.role_id" placeholder="请选择状态">
            <el-option
              v-for="(value,key, index) in $store.state.roleObj"
              :key="index"
              :value="+key"
              :label="value"
            ></el-option>
          </el-select>
        </el-form-item>
      <!-- 状态 -->
      <el-form-item label="状态" prop="status">
        <el-select placeholder="请选择状态" v-model="form.status">
          <el-option label="启用" :value="1"></el-option>
          <el-option label="禁用" :value="0"></el-option>
        </el-select>
      </el-form-item>
      <!-- 用户备注 -->
      <el-form-item label="用户备注" prop="remark">
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
// import { addUserList, editUserList } from "@/api/business";
import { editUserList,addUserList } from "@/api/userList.js";
export default {
  props: ["mode"],
  data() {
    return {
      dialogFormVisible: false,
      rules: {
        // 用户名
        username: [{ required: true, message: "请输入用户名", trigger: "blur" }],
        // 邮箱
        email: [{ required: true, message: "请输入邮箱", trigger: "blur" },
         {
            validator: (rule, value, callback) => {
              let _reg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
              if (_reg.test(value)) {
                callback();
              } else {
                callback("请正确输入邮箱号！");
              }
            },
            trigger: "blur"
          }],
        // 电话
        phone: [
          { required: true, message: "请输入电话", trigger: "blur" },
           {
            validator: (rule, value, callback) => {
              let _reg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;
              if (_reg.test(value)) {
                callback();
              } else {
                callback("请正确输入手机号！");
              }
            },
            trigger: "blur"
          }
        ],
        // 角色
        role_id: [{ required: true, message: "请输入角色", trigger: "blur" }]
      },
      form: {
        username: "", //用户名
        email: "", //邮箱
        phone: "", //电话
        role_id: "", //角色
        scope: "" ,//状态
        remark: "" //用户备注
      }
    };
  },
  watch: {
    // 写出需要监听的值，转换成去this的字符串，它本质是一个function(newVal,oldVal){}
    dialogFormVisible(newVal) {
      if (newVal == true) {
        //  执行一次清空验证处理
        // 使用表单的clearValidate()
        // 注意点，第一次打开弹框时，form表单根本没渲染出来，我们是访问不了的，需要加一个延时处理
        //$nextTick
        this.$nextTick(() => {
          this.$refs.form.clearValidate();
        });
        
      }
    }
  },
  methods: {
    submitclick() {
      this.$refs.form.validate(result => {
        window.console.log(result);
        if (result) {
          if (this.mode == "add") {
            addUserList(this.form).then(() => {
              this.$message.success("添加成功");
              this.dialogFormVisible = false;
              this.$parent.search();
            });
          }else{
             editUserList(this.form).then(() => {
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
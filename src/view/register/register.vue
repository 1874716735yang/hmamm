<template>
  <el-dialog :visible.sync="dialogFormVisible" class="register" width="600px" :show-close="false">
    <!-- 
      el-dialog
      visible.sync属性控该弹窗口是否显示
      slot可以重写title
      width属性用于设置宽度
      show-close	是否显示关闭按钮
    -->
    <div slot="title" class="title">用户注册</div>
    <el-form :model="form" label-width="100px" ref="form" :rules="rules">
      <!-- 头像、 -->
      <el-form-item label="头像" prop="avatar">
        <el-upload
          class="avatar-uploader"
          :action="baseUrl+'/uploads'"
          name="image"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <!-- 名称 -->
      <el-form-item label="昵称" prop="username">
        <el-input v-model="form.username"></el-input>
      </el-form-item>
      <!-- 邮箱 -->
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="form.email"></el-input>
      </el-form-item>
      <!-- 手机号 -->
      <el-form-item label="手机" prop="phone">
        <el-input v-model="form.phone"></el-input>
      </el-form-item>
      <!-- 密码 -->
      <el-form-item label="密码" prop="password">
        <el-input v-model="form.password" :show-password="true"></el-input>
      </el-form-item>
      <!-- 图形码 -->
      <el-form-item label="图形码" prop="code">
        <el-row>
          <el-col :span="16">
            <el-input v-model="form.code"></el-input>
          </el-col>
          <el-col :span="7" :offset="1" class="tup">
            <img :src="codeUrl" class="code" alt @click="codelai" />
          </el-col>
        </el-row>
      </el-form-item>
      <!-- 验证码 -->
      <el-form-item label="验证码" prop="rcode">
        <el-row>
          <el-col :span="16">
            <el-input v-model="form.rcode"></el-input>
          </el-col>
          <el-col :span="7" :offset="1">
            <el-button @click="clickRcode" :disabled="totalTime !=60">
              获取验证码
              <span v-if="totalTime !=60">{{totalTime}}</span>
            </el-button>
          </el-col>
        </el-row>
      </el-form-item>
    </el-form>
    <div slot="footer" class="btn">
      <el-button @click="dialogFormVisible= false">取消</el-button>
      <el-button type="primary" @click="singclick">确认</el-button>
    </div>
  </el-dialog>
</template>
<script>
import { gctphonecode, register } from "@/api/register.js";
export default {
  data() {
    return {
      totalTime: 60,
      codeUrl: process.env.VUE_APP_URL + "/captcha?type=sendsms",
      dialogFormVisible: false,
      baseUrl: process.env.VUE_APP_URL,
      imageUrl: "",
      form: {
        avatar: "", //头像
        username: "", //名称
        email: "", //邮箱
        phone: "", //手机
        password: "", //密码
        rcode: "", //验证码
        code: "" //图形码
      },
      rules: {
        // 头像、
        avatar: [{ required: true, message: "请上传头像", trigger: "change" }],
        // 名称
        username: [
          { required: true, message: "请输入名称", trigger: "change" }
        ],
        // 邮箱
        email: [
          { required: true, message: "请输入邮箱", trigger: "change" },
          {
            validator: (rule, value, callback) => {
              // 正则校验
              let _reg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
              if (_reg.test(value)) {
                callback();
              } else {
                callback("请正确输入邮箱地址");
              }
            }
          }
        ],
        // 手机号
        phone: [
          { required: true, message: "请输入手机号", trigger: "change" },
          {
            validator: (rule, value, callback) => {
              // 正则校验
              let _reg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;
              if (_reg.test(value)) {
                callback();
              } else {
                callback("请正确输入手机号");
              }
            }
          }
        ],
        // 密码
        password: [
          { required: true, message: "请输入密码", trigger: "change" },
          {
            min: 6,
            max: 12,
            message: "请输入6到12位长度密码",
            trigger: "change"
          }
        ],
        //图形码
        code: [
          { required: true, message: "请输入图形码", trigger: "change" },
          { min: 4, max: 4, message: "请输入正确的图形码", trigger: "change" }
        ],
        //验证码
        rcode: [
          { required: true, message: "请输入验证码", trigger: "change" },
          { min: 4, max: 4, message: "请输入正确的验证码", trigger: "change" }
        ]
      }
    };
  },
  // 监听器
   /*
  对某个值进行一个监听，如果它改变了，可以对它进行一些相应处理
  // 只要dialogFormVisible为false了就要清空表单
  1：放到watch:{}
  2：写要要监听的值  this.dialogFormVisible
  3：去掉this把该传转换成字符串 dialogFormVisible
  4:监听器本质就是一个function (newVal,oldval){}
     newVal当前值，oldVal修改前一刻的值
  */
  watch: {
    dialogFormVisible(newVal){
      if(newVal==false){
        this.$refs.form.resetFields()
        this.imageUrl=""
      }
    }
  },
  methods: {
    handleAvatarSuccess(res) {
      this.imageUrl = this.baseUrl + "/" + res.data.file_path;
      this.form.avatar = res.data.file_path;

      this.$refs.form.validateField("avatar");
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg" || file.type === "image/png";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    //注册确定按钮点击
    singclick() {
      // 全局验证
      this.$refs.form.validate(result => {
        window.console.log(result);
        if (result) {
          register(this.form).then(res => {
            //成功回调
            this.$message.success(res.data.captcha + "");
            //  alert(res.data.data.captcha+'');
            window.console.log(res);
           
              this.$message.success("注册成功");
              this.dialogFormVisible = false;
           
          });
        }
      });
    },
    // 点击切换验证码
    codelai() {
      this.codeUrl =
        process.env.VUE_APP_URL + "/captcha?type=sendsms&t=" + Date.now();
    },
    // 点击获取验证码校验手机号图片验证
    clickRcode() {
      let _post = true;
      this.$refs.form.validateField(["code", "phone"], error => {
        if (error != "") {
          _post = false;
        }
      });
      if (_post === false) {
        return;
      } else {
        gctphonecode({ code: this.form.code, phone: this.form.phone }).then(
          res => {
            //成功回调
            this.$message.success(res.data.captcha + "");
            //  alert(res.data.data.captcha+'');
            window.console.log(res);
            //  验证码倒计时
            this.totalTime--;
            let _interval = setInterval(() => {
              this.totalTime--;
              if (this.totalTime <= 0) {
                clearInterval(_interval);
                this.totalTime = 60;
              }
            }, 1000);
          }
        );
      }
    }
  }
};
</script>
<style lang="less">
.register {
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
  .avatar-uploader {
    width: 178px;
    margin: 0 auto;
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  .btn {
    text-align: center;
  }
  .tup {
    height: 40px;
    .code {
      width: 100%;
      height: 40px;
      border: 1px solid #ccc;
    }
  }
}
</style>
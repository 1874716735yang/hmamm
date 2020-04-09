<template>
  <div class="login">
    <!-- 左边 -->
    <div class="left">
      <div class="title">
        <img src="@/assets/imgs/loginlog.png" alt />
        <span class="titlename">黑马面面</span>
        <span class="titlename1">|</span>
        <span class="titlename2">用户登录</span>
      </div>
      <!-- 
        1:加一个el-form表单，再加入子项el-form-item
           :model属性，绑定表单元素的值
        2:在el-form-item下加入一个el-input
           v-model双向绑定表单元素的值
           placeholder
           prefix-icon  input前面图标
           show-password是否显示密码图标，以点点形式显示
           
      -->
      <el-form :model="form" :rules="rules" ref="form">
        <el-form-item prop="phone">
          <el-input prefix-icon="el-icon-user" v-model="form.phone" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            :show-password="true"
            prefix-icon="el-icon-lock"
            v-model="form.password"
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>

        <!-- 验证码 -->
        <el-form-item prop="code">
          <el-row>
            <el-col :span="16">
              <el-input v-model="form.code" prefix-icon="el-icon-key" placeholder="请输入验证码"></el-input>
            </el-col>
            <el-col :span="8">
              <img :src="codeUrl" alt @click="codelai" class="key" />
            </el-col>
          </el-row>
        </el-form-item>
        <!-- 多选框 -->
        <el-form-item prop="checked">
          <el-checkbox v-model="form.checked">
            我已阅读并同意
            <el-link type="primary">用户协议</el-link>和
            <el-link type="primary">隐私条款</el-link>
          </el-checkbox>
        </el-form-item>
        <!-- el-button按钮 -->
        <el-form-item>
          <el-button class="btn" type="primary" @click="loginclick">登录</el-button>
          <br />
          <el-button class="btn" type="primary" @click="regclick">注册</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- 右边 -->
    <div class="right">
      <img src="@/assets/imgs/login_banner_ele.png" alt />
    </div>
    <register ref="register"></register>
  </div>
</template>

<script>
import register from "../register/register.vue";
import { toLogin } from "@/api/login.js";
import { saveToken } from "@/utils/token.js";
export default {
  name: "login",
  components: {
    register
  },
  data() {
    return {
      codeUrl: process.env.VUE_APP_URL + "/captcha?type=login",
      form: {
        phone: "", //用户名
        password: "", //密码
        code: "", //验证码
        checked: "" //复选框
      },
      rules: {
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
        password: [
          { required: true, message: "请输入密码", trigger: "change" },
          {
            min: 6,
            max: 12,
            message: "请输入6到12位长度密码",
            trigger: "change"
          }
        ],
        code: [
          { required: true, message: "请输入验证码", trigger: "change" },
          { min: 4, max: 4, message: "请输入正确的验证码", trigger: "change" }
        ],
        checked: [
          { required: true, message: "请勾选协议", trigger: "change" },
          {
            validator: (rule, value, callback) => {
              if (value === true) {
                callback();
              } else {
                callback("请勾选协议");
              }
            }
          }
        ]
      }
    };
  },
  methods: {
    // 登录
    loginclick() {
      this.$refs.form.validate(valid => {
        if (valid == true) {
          toLogin(this.form).then(res => {
            this.$message.success("登陆成功");
            window.console.log(res);
            saveToken(res.data.token)
          });
        } else {
          this.$message.warning("请输入正确的消息");
        }
      });
    },
    // 点击切换验证码
    codelai() {
      this.codeUrl =
        process.env.VUE_APP_URL + "/captcha?type=login&t=" + Date.now();
    },
    // 注册
    regclick() {
      this.$refs.register.dialogFormVisible = true;
    }
  }
};
</script>

<style lang="less">
.login {
  // 盒子布局
  display: flex;
  // 水平布局
  justify-content: space-around;
  // 侧轴布局
  align-items: center;

  height: 788px;
  background: linear-gradient(
    225deg,
    rgba(20, 147, 250, 1),
    rgba(1, 198, 250, 1)
  );
  .left {
    width: 478px;
    height: 550px;
    background: rgba(245, 245, 245, 1);
    padding: 42px;
    .title {
      margin-bottom: 20px;
      .titlename {
        font-size: 24px;
        font-family: SourceHanSansCN;
        font-weight: 400;
        color: rgba(12, 12, 12, 1);
        margin: 0 15px 0;
      }
      .titlename1 {
        font-size: 24px;
        color: #ccc;
      }
      .titlename2 {
        font-size: 22px;
        margin-left: 15px;
      }
    }
    .key {
      width: 100%;
      height: 40px;
    }
    .btn {
      width: 100%;
    }
    .btn:nth-child(1) {
      margin-bottom: 26px;
    }
  }
}
</style>
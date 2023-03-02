<template>
  <el-form
    ref="form"
    label-width="70px"
    :inline="true"
    class="login-container"
    :model="form"
    :rules="rules"
  >
    <h3 class="login_title">系统登录</h3>
    <el-form-item label="用户名" prop="username">
      <el-input v-model="form.username" placeholder="请输入账号"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input
        type="password"
        v-model="form.password"
        placeholder="请输入密码"
      ></el-input>
    </el-form-item>
    <el-form-item>
      <el-button
        @click="submit"
        style="margin-left: 130px; margin-top: 10px"
        type="primary"
        >登录</el-button
      >
    </el-form-item>
  </el-form>
</template>

<script>
import Mock from "mockjs";
import Cookie from "js-cookie";
import { getMenu } from "../api";
import { Message } from "element-ui";
export default {
  name: "Login",
  data() {
    return {
      form: {
        username: "",
        password: "",
      },
      rules: {
        username: [
          { required: true, trigger: "blur", message: "请输入用户名" },
        ],
        password: [
          { required: true, trigger: "blur", message: "请输入密码  " },
        ],
      },
    };
  },
  methods: {
    submit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          getMenu(this.form).then(({ data }) => {
            console.log(data);
            if (data.code === 20000) {
              // token信息存入cookie用于不同页面间的通信
              Cookie.set("token", data.data.token);

              // 获取菜单的数据，存入store中
              //   this.$store.commit("setMenu", data.data.menu);
              //   this.$store.commit("addMenu", this.$router);
              // 跳转到首页
              this.$router.push("/home");
            } else {
              Message.error(data.data.message);
            }
          });
        }
      });
    },
  },
};
</script>

<style lang='less' scoped>
.login-container {
  width: 350px;
  border: 1px solid #eaeaee;
  margin: 100px auto;
  padding: 35px 35px 15px 35px;
  border-radius: 15px;
  background-color: #fff;
  box-shadow: 0 0 25px #cac6c6;
}
.login_title {
  margin: 0px auto 40px auto;
  text-align: center;
  color: #505458;
}
.el-button {
  margin: 0px auto 0px auto;
}
</style>
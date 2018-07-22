<template>
  <div class="login">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
      
    <el-form-item label="用户名" prop="username">
      <el-input v-model="ruleForm.username"></el-input>
    </el-form-item>

    <el-form-item label="密码" prop="password">
      <el-input v-model="ruleForm.password"></el-input>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="submitForm">登录</el-button>
      <el-button @click='resetForm'>重置</el-button>
    </el-form-item>
  </el-form>
</div>
</template>


<script>
import axios from "axios";

export default {
  data() {
    return {
      ruleForm: {
        username: "",
        password: ""
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名(必填)", trigger: "blur" },
          { min: 4, max: 12, message: "长度在 3 到 12 个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码(必填)", trigger: "blur" },
          { min: 6, max: 12, message: "长度在 3 到 6个字符", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    submitForm() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          // alert('submit!');
          this.handlelogin();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm() {
      this.$refs.ruleForm.resetFields();
    },
    handlelogin() {
      axios
        .post("http://localhost:8888/api/private/v1/login", this.ruleForm)
        .then(res => {
          console.log(res);
          const data = res.data;
          if (data.meta.status === 200) {
            // console.log('登录成功:',res)
            // put跳转到的路由
            localStorage.setItem("token", data.data.token);

            this.$router.push("/home");

            this.$message({
              message: "登录成功",
              type: "success",
              duration: 500
            });
          } else {
            this.$message({
              message: "登录失败:用户名或密码错误",
              type: "error",
              duration: 1000
            });
          }
        });
    }
  }
};
</script>
<style>
.login {
  width: 500px;
  background-color: #fff;
  border-radius: 10px;
  padding: 20px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%)
}
</style>


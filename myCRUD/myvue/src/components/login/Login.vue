<template>
 <div class="login">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
  <el-form-item label="用户名" prop="username">
    <el-input v-model="ruleForm.username"></el-input>
  </el-form-item>
  <el-form-item label="密码" prop="password">
    <el-input v-model="ruleForm.password"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="submitForm">登录</el-button>
    <el-button @click="resetForm('ruleForm')">重置</el-button>
  </el-form-item>
</el-form>
  </div>
</template>
<script>
import axios from "axios"
export default {
  data() {
    return {
      ruleForm: {
        username: "",
        password: ""
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 12, message: "长度在 3 到 12 个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 3, max: 8, message: "长度在 3 到 8 个字符", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    submitForm() {
      //  console.log(this.$refs.ruleForm)

      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          axios
            .post("http://localhost:8888/api/private/v1/login", this.ruleForm)
            .then(res => {
              // console.log(res)
              if (res.data.meta.status === 200) {
                localStorage.setItem("token", res.data.data.token);

                this.$router.push("/home");

              } else {
                this.$message({
                  message: "登录失败",
                  type: "error",
                  duration:1000
                });
              }
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>
<style>
.login {
   height: 100%;
   background-color: #2d434c;
  
}
.el-form {
  width: 500px;
  padding: 50px;
  padding-left: 20px;
  border-radius: 15px;
  background-color: #fff;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>


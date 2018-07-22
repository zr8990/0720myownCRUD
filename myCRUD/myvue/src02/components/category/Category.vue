<template>
 <div>
  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
  <el-form-item label="用户名" prop="name">
    <el-input v-model="ruleForm.username"></el-input>
  </el-form-item>

 <el-form-item label="密码" prop="password">
    <el-input v-model="ruleForm.password"></el-input>
  </el-form-item>

  <el-form-item>
    <el-button type="primary" @click="submitForm">登录</el-button>
    <el-button>重置</el-button>
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
          { required: true, message: "用户名", trigger: "blur" },
          { min: 3, max: 12, message: "长度在 3 到 12 个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "密码", trigger: "blur" },
          { min: 3, max: 6, message: "长度在 3 到 6 个字符", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    submitForm() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          axios
            .post(
              "http://localhost:8888/api/private/v1/login",this.ruleForm)
            .then((res) => {
              console.log(res);
              const data = res.data;
              if (data.meta.status === 200) {
                alert(123);
                this.$router.push("/login");
               
              }
            });
        } else {
           this.$message({
                  message: "登录失败",
                  type: "error",
                  duration:1000
                });
          // return false;
        }
      });
    },
    // resetForm(formName) {
    //   this.$refs[formName].resetFields();
    // }
  }
};
</script>
<style>
</style>


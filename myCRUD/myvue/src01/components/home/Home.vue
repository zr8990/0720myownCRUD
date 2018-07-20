<template>
  <div class="home">
  <el-container class="container">
    <el-header>
      <el-row>
        <el-col :span="8">
          <div class="grid-content bg-purple">
            <img src="../../assets/logo.png" alt="">
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple-light">
            电商后台管理系统
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple right">
            <b>欢迎上海前端22期星耀会员</b>
            <a href="javascript:;" class="red" @click='logout'>退出</a>
          </div>
          </el-col>
      </el-row>
    </el-header>
    <el-container class="content">
      <el-aside width="200px">
      <el-row>
        <el-col>
          <el-menu default-active="2" class="el-menu-vertical-demo"  background-color="#545c64" text-color="#fff"
        active-text-color="#ffd04b">
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>用户管理</span>
              </template>
              <el-menu-item index="1-1">      
                <i class="el-icon-menu"></i>
                  <span slot="title">用户列表</span>         
              </el-menu-item>
              </el-submenu>
              <el-submenu index="1">
                <template slot="title">
                  <i class="el-icon-location"></i>
                  <span>权限管理</span>
                </template>
              <el-menu-item index="1-2">      
                <i class="el-icon-menu"></i>
                <span slot="title">权限列表</span>         
              </el-menu-item>
              <el-menu-item index="1-3">      
                <i class="el-icon-menu"></i>
                <span slot="title">角色列表</span>         
              </el-menu-item>
          </el-submenu>
          </el-menu>
        </el-col>
      </el-row>
      </el-aside>
      <el-main><router-view></router-view></el-main>
    </el-container>
  </el-container>
  </div>
</template>
<script>
export default {
  methods: {
    /**
     * 退出要跳转到登录页并清理token
     */

    logout() {
      this.$confirm("是否确认退出?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          localStorage.removeItem("token");
          this.$router.push("/login");
          this.$message({
            type: "success",
            message: "退出成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消"
          });
        });
    }
  }
};
</script>
<style>
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}
.el-header .red {
  color: red;
  font-weight: 700;
}
.el-header .el-col .bg-purple-light {
  font-size: 32px;
  color: #fff;
  font-weight: 700;
  overflow: hidden;
}
.el-header .right {
  text-align: right;
}

.el-aside {
  background-color: #d3dce6;
  background-color: rgb(84, 92, 100);

  color: #333;
  height: 650px;
  line-height: 200px;
}
.container {
  width: 100%;
  height: 100%;
}
.container .content {
  display: flex;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  height: 650px;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
</style>



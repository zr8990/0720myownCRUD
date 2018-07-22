<template>
<div class="home">
    <el-container>
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
      <el-container>
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
                  <el-submenu index="2">
                    <template slot="title">
                      <i class="el-icon-location"></i>
                      <span>权限管理</span>
                    </template>
                    <el-menu-item index="2-1">      
                      <i class="el-icon-menu"></i>
                      <span slot="title">权限列表</span>         
                    </el-menu-item>
                    <el-menu-item index="1-3">      
                      <i class="el-icon-menu"></i>
                      <span slot="title">角色列表</span>         
                    </el-menu-item>
                  </el-submenu>
                  <el-submenu index="3">
                    <template slot="title">
                      <i class="el-icon-location"></i>
                      <span>商品管理</span>
                    </template>
                    <el-menu-item index="3-1">      
                      <i class="el-icon-menu"></i>
                      <span slot="title">商品列表</span>         
                    </el-menu-item>
                    <el-menu-item index="3-2">      
                      <i class="el-icon-menu"></i>
                      <span slot="title">分类参数</span>         
                    </el-menu-item>
                    <el-menu-item index="3-3">      
                      <i class="el-icon-menu"></i>
                      <span slot="title">商品分类</span>         
                    </el-menu-item>
                  </el-submenu>
                   <el-submenu index="4">
                    <template slot="title">
                      <i class="el-icon-location"></i>
                      <span>订单管理</span>
                    </template>
                    <el-menu-item index="4-1">      
                      <i class="el-icon-menu"></i>
                        <span slot="title">订单列表</span>         
                    </el-menu-item>
                  </el-submenu>
                   <el-submenu index="5">
                    <template slot="title">
                      <i class="el-icon-location"></i>
                      <span>数据统计</span>
                    </template>
                    <el-menu-item index="5-1">      
                      <i class="el-icon-menu"></i>
                        <span slot="title">数据报表</span>         
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
<style lang="less">
 .home{
   width: 100%;
   height: 100%;
 }
 .home>.el-container {
   height: 100%;
 }
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    height: 60px;
    .el-col:nth-child(1){
      text-align: left;
      img {
        width: 180px;
        height: 50px;
      }
    }
    .el-col:nth-child(2) {
      font-size: 36px;
      color: #fff;
      font-weight: 700;      
    }
    .el-col:nth-child(3){
      line-height:40px;
      text-align: right;
    }
    a {
      color: red;
      font-weight: 700;
      text-decoration: none;
    }
  }
  
  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: left;
  
  }
  
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
  }
  
  body > .el-container {
    margin-bottom: 40px;
  }

</style>



<template>
  <el-container>
    <el-header>
      <el-row>
        <el-col :span="8"><div class="grid-content bg-purple"><img src="../../assets/logo.png" alt=""></div></el-col>
        <el-col :span="8"><div class="grid-content bg-purple-light">电商后台管理系统</div></el-col>
        <el-col :span="8"><div class="grid-content bg-purple right">
          <span>欢迎上海前端22期星耀会员</span>
          <a href="javascript:;" @click='logout'>退出</a>
          </div></el-col>
      </el-row>
    </el-header>
    <el-container>
      <el-aside width="200px">
         <el-col :span="12">
            <el-menu
              default-active="2"
              class="el-menu-vertical-demo"
              
              background-color="#545c64"
              text-color="#fff"
              active-text-color="#ffd04b">
              <el-submenu index="1">
                <template slot="title">
                  <i class="el-icon-location"></i>
                  <span>用户管理</span>
                </template>
                    <el-menu-item index="1-1">
                      <i class="el-icon-menu"></i>
                      <span>用户列表</span>
                  </el-menu-item>  
              </el-submenu> 
              <el-submenu index="2">
                <template slot="title">
                  <i class="el-icon-location"></i>
                  <span>权限管理</span>
                </template>
                  <el-menu-item index="2-1">
                    <i class="el-icon-menu"></i>
                    <span>角色列表</span>
                </el-menu-item>  
                <el-menu-item index="2-2">
                      <i class="el-icon-menu"></i>
                      <span>权限列表</span>
                  </el-menu-item> 
              </el-submenu> 
              <el-submenu index="3">
                <template slot="title">
                  <i class="el-icon-location"></i>
                  <span>商品管理</span>
                </template>
                <el-menu-item index="3-1">
                  <i class="el-icon-menu"></i>
                  <span>商品列表</span>
              </el-menu-item>  
              <el-menu-item index="3-2">
                  <i class="el-icon-menu"></i>
                  <span>分类参数</span>
              </el-menu-item> 
              <el-menu-item index="3-3">
                  <i class="el-icon-menu"></i>
                  <span>商品分类</span>
              </el-menu-item> 
              </el-submenu> 
              <el-submenu index="4">
                <template slot="title">
                  <i class="el-icon-location"></i>
                  <span>订单管理</span>
                </template>
                    <el-menu-item index="4-1">
                      <i class="el-icon-menu"></i>
                      <span>订单列表</span>
                  </el-menu-item>  
              </el-submenu> 
              <el-submenu index="5">
                <template slot="title">
                  <i class="el-icon-location"></i>
                  <span>数据统计</span>
                </template>
                    <el-menu-item index="5-1">
                      <i class="el-icon-menu"></i>
                      <span>数据列表</span>
                  </el-menu-item>  
              </el-submenu> 
    </el-menu>
  </el-col>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
</el-container>
</template>
<script>
export default {
  methods:{
    logout(){
       this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {

           localStorage.removeItem('token') 
           this.$router.push('/login')
           this.$message({
            type: 'success',
            message: '退出成功!',
            
          });
        })   
          
    },
  }
}
</script>
<style lang='less'>
.el-container {
  height: 100%;
}
.el-header {
    background-color: #B3C0D1;
    color: #333;
    
    line-height: 60px;
    .el-col {
      
      .bg-purple-light {

        font-size: 34px;
        color: #fff;
        font-weight: 700;
         
      }
     .right {
        text-align: right;
        color: #000;
        font-weight: 700;
        a {
          color: red;
          font-weight: 700;
        }
      }
     
    }
  }
  
  .el-aside {

    color: #333;
    text-align: left;
  
   .el-col {
     width: 100%;
     height: 100%;
     .el-menu {
       height: 100%;
     }
   }
    .el-submenu {
      width: 200px;
    }
  }
  
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    /* line-height: 160px; */
  }
  
  body > .el-container {
    margin-bottom: 40px;
  }
  
  
</style>



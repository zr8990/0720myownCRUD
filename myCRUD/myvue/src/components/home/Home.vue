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
        <el-aside>
          <el-row>
            <el-col>
              <el-menu 
              :unique-opened="true"
              :default-active="$route.path.slice(1)" 
              :router = "true"
              class="el-menu-vertical-demo" background-color="#545c64" text-color="#fff"
              active-text-color="#ffd04b">
                  <el-submenu :index="menu.path" v-for = "menu in menuList" :key="menu.id">
                    <template slot="title">
                      <i class="el-icon-location"></i>
                      <span>{{menu.authName}}</span>
                    </template>
                    <el-menu-item :index="menu2.path" v-for=" menu2 in menu.children" :key="menu2.id">      
                      <i class="el-icon-menu"></i>
                        <span slot="title">{{menu2.authName}}</span>         
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
  data(){
    return {
      menuList:[]
    }
  },
  created(){
    this.getMenuList()
  },
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
    },
    async getMenuList(){
      const res = await this.$http.get(`/menus`)
      const {data,meta} = res.data
      // console.log(res)
      if(meta.status === 200){
        this.menuList = data
      }
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
    // text-align: center;
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
    // text-align: center;
  }
  
  body > .el-container {
    margin-bottom: 40px;
  }

</style>



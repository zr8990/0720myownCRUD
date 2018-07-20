<template>
  <div class="user-list">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>

<el-row>
  <el-col :span="8">
    <div class="grid-content bg-purple search">
      <el-input placeholder="请输入内容" v-model="input5" class="input-with-select">
        <el-button slot="append" icon="el-icon-search"></el-button>
      </el-input>
    </div>
  </el-col>
  <el-col :span="4">
    <div class="grid-content bg-purple-light">
      <el-button type="success" plain>成功按钮</el-button>
    </div>
    </el-col>

</el-row>
    

   <el-table
    :data="userList"
    stripe
    style="width: 100%">

     <el-table-column
      prop="username"
      label="姓名"
      width="180">
    </el-table-column>

    <el-table-column
      prop="email"
      label="邮箱"
      width="180">
    </el-table-column>
   
    <el-table-column
      prop="mobile"
      label="电话">
    </el-table-column>
    <el-table-column
      prop="mg_state"
      label="用户状态">
      <template slot-scope="scope">
        <el-switch
  v-model="scope.row.mg_state"
  active-color="#409EFF"
  inactive-color="#DCDFE6">
</el-switch>
      </template>
    
    </el-table-column>

    <el-table-column
      prop=""
      label="操作">
      <template slot-scope="scope">
        <el-row>
  
  <el-button type="primary" size="mini" icon="el-icon-edit" circle></el-button>
  
  <el-button type="danger" size="mini"  icon="el-icon-delete" circle></el-button>

  <el-button type="success" size="mini"  icon="el-icon-check" circle>分配角色</el-button>
</el-row>
      </template>
    </el-table-column>
  </el-table>
  <!-- 分页 -->
  <el-pagination background layout="prev, pager, next" :page-size='pageSize' :total="total" @curpage-change = 'getCurPageUserList'>
</el-pagination>
  </div>
  
</template>
<script>
import axios from "axios";
export default {
  // name: "UserList",
  data() {
    return {
  
      pageSize: 2,
      total: 0,
      value1:'',
      userList: [],
      searchText:''
    };
  },
  created() {
    this.getUserList();
  },
  methods: {
    getUserList(curpage = 1,searchText ='') {
      axios
        // 通过第二个参数params给get请求传参
        .get("http://localhost:8888/api/private/v1/users", {
          params: {
            query: searchText,
            pagenum: curpage,
            pagesize: this.pageSize
          },
          headers: {
            Authorization: localStorage.getItem("token")
          }
        })
        .then(res => {
          console.log(res);
          const {data,meta} = res.data;
          const {status} = meta;
          const {users,total} = data
          if (status === 200) {
            this.userList = users;
            this.total = total
          }
        });
    },
    /**
     * param{number} curPage
     */
    getCurPageUserList(curpage) {
      console.log("分页了", curpage);
      //
      this.getUserList(curpage,this.searchText);
    },
    search(){
      this.getUserList(1,this.searchText)
    }
  }
};
</script>

<style>
.el-row {
  margin-top: 10px;
  margin-bottom: 10px;
}
.search {
  border-radius: 15px;
}

.el-table {
  text-align: left;
}
.el-table-column {
  height: 10px;
  padding: 0
}
.el-button.is-circle {
  border-radius: 5px;
}
</style>

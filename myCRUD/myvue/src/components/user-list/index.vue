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
      <el-input placeholder="请输入内容" v-model="searchText" class="input-with-select">
        <el-button slot="append" icon="el-icon-search" @click='search'></el-button>
      </el-input>
    </div>
  </el-col>
  <el-col :span="4">
    <div class="grid-content bg-purple-light">
      <el-button type="success" plain @click="showDialogAdd">添加用户</el-button>
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
          inactive-color="#DCDFE6" @change="changeUserState(scope.row)">
        </el-switch>
       </template>
    
    </el-table-column>

    <el-table-column
      prop=""
      label="操作">
      <template slot-scope="scope">
        <el-row>
          <el-button type="primary" size="mini" icon="el-icon-edit" circle @click="showDialogEdit(scope.row)"></el-button>
          
          <el-button type="danger" size="mini"  icon="el-icon-delete" circle @click = "delUserInfo(scope.row.id)"></el-button>

          <el-button type="success" size="mini"  icon="el-icon-check" circle @click="showRoleList(scope.row)">分配角色</el-button>
        </el-row>
      </template>
    </el-table-column>
  </el-table>

  <!-- 分页 -->
  <el-pagination background layout="prev, pager, next" :page-size='pageSize' :total="total" @current-change = 'getCurPageUserList'>
  </el-pagination>

<!-- 添加用户对话框 -->
<el-dialog title="添加用户" :visible.sync="dialogFormVisible">
  <el-form :model="addUserForm" ref="addUserForm" :rules='rules' label-width="100px">
    <el-form-item label="用户名" prop="username">
      <el-input v-model="addUserForm.username" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input v-model="addUserForm.password" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="邮箱" prop="email">
      <el-input v-model="addUserForm.email" auto-complete="on"></el-input>
    </el-form-item>
    <el-form-item label="手机号" prop="mobile">
      <el-input v-model="addUserForm.mobile" auto-complete="off"></el-input>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="addUserInfo" >确 定</el-button>
  </div>
</el-dialog>

<!-- 修改用户对话框 -->
<el-dialog title="修改用户" :visible.sync="dialogEditFormVisible">
  <el-form :model="editUserForm" ref="editUserForm" :rules='rules' label-width="100px">
    <el-form-item label="用户名" prop="username">
      <el-input v-model="editUserForm.username" auto-complete="off" disabled></el-input>
    </el-form-item>
    <el-form-item label="邮箱" prop="email">
      <el-input v-model="editUserForm.email" auto-complete="on"></el-input>
    </el-form-item>
    <el-form-item label="手机号" prop="mobile">
      <el-input v-model="editUserForm.mobile" auto-complete="off"></el-input>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogEditFormVisible = false">取 消</el-button>
    <el-button type="primary"  @click="editUserInfo" >确 定</el-button>
  </div>
</el-dialog>

<!-- 角色分配 -->
<el-dialog title="分配角色" :visible.sync="dialogRoleFormVisible">
  <el-form :model="roleForm" label-width = "120px">
    <el-form-item label="用户名">
      <el-input v-model="roleForm.username" disabled></el-input>
    </el-form-item>
    <el-form-item label="角色列表">
      <el-select v-model="roleForm.list" placeholder="0">
        <el-option label="主管" value="manager"></el-option>
        <el-option label="程序员" value="technology"></el-option>
        <el-option label="测试" value="test"></el-option>
      </el-select>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogRoleFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="roleList">确 定</el-button>
  </div>
</el-dialog>
  </div>
</template>
<script>
import axios from "axios";
export default {
  /**
   * 指定组件的name属性，那么devtools工具中的组件数中会以name的属性为准，来显示组件的名称
   */
  name: "UserList",
  data() {
    return {
      pageSize: 2,//每页条数
      total: 0,//总条数
      // value1:'',
      userList: [],//用户列表数据
      searchText:'',//搜索文本

      dialogFormVisible: false,
      addUserForm: {
        username:'',
        password:'',
        email:'',
        mobile:''
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
          
        },

      dialogEditFormVisible: false,
      editUserForm: {
        username:'',
        email:'',
        mobile:'',
        id:-1
      },
      dialogRoleFormVisible: false,
      roleForm:{
        username:'',
        roleId:'',
        id:-1
      }
    }
    
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
          // console.log(res);
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
      // console.log("分页了", curpage);
      //
      this.getUserList(curpage,this.searchText);
    },
    search(){
      this.getUserList(1,this.searchText)
    },
    changeUserState(rowdata) {
      // console.log(111)
      const url = `/users/${rowdata.id}/state/${rowdata.mg_state}`
      
      this.$http
      .put(url)
      .then((res) => {
        console.log(res)
        const {data , meta } = res.data
        if(meta.status === 200){
            this.$message({
            message: data.mg_state === 1 ? '启用成功' : '禁用成功',
            type: 'success',
            duration:500
          });
        }else{
          this.$message({
            message: '操作失败',
            type: 'error',
            duration:500
          });
        }
         
      })
    },
    showDialogAdd() {
      this.dialogFormVisible = true
    },
    addUserInfo() {

        this.$refs.addUserForm.validate((valid) => {
          if (valid) {
            // alert('submit!');
            this.$http
            .post(`/users`,this.addUserForm)
            .then((res)=>{
              console.log(res)
              const { data,meta } = res.data
              if(meta.status === 201){
                this.dialogFormVisible = false
                this.getUserList()
                this.$refs.addUserForm.resetFields()

                this.$message({
                  message:"添加用户成功",
                  type: 'success',
                  duration:500
                });

              }else if(meta.status === 400){
                 this.$message({
                  message: meta.msg,
                  type: 'error',
                  
                });
              }
            })
          } else {      
            return false;
          }
        })
      },

    showDialogEdit(rows) {
      this.dialogEditFormVisible = true

      this.editUserForm.username = rows.username
      this.editUserForm.email = rows.email
      this.editUserForm.mobile = rows.mobile
      this.editUserForm.id = rows.id
      
    },
    editUserInfo(){
      const { id,email,mobile } = this.editUserForm
      this.$http
        .put(`/users/${id}`,{email,mobile})
        .then((res)=>{
          console.log(res)
          const { data , meta } = res.data
          if(meta.status === 200 ){
            this.dialogEditFormVisible = false
            this.$message({
              message:"更新用户成功",
              type: 'success',
              duration:500
            });
          }else{
            this.$message({
              message:meta.msg,
              type: 'error',
              duration:500
            });
          }  
        })
    },
    delUserInfo(id){
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$http
         .delete(`/users/${id}`)
         .then( (res) => {
           const { meta } = res.data
           if(meta.status === 200){
             this.getUserList()
              this.$message({
                type: 'success',
                message: '删除成功!'
              });    
            }
         })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });          
      });
    },
    showRoleList(Rows){
      this.dialogRoleFormVisible = true;
      this.roleForm.username =  Rows.username
      this.roleForm.roleId = Rows.role_id
      this.roleForm.id = Rows.id
    },
    roleList(){
      console.log(565)
      this.$http
        .put(`/users/${id}/`)
    }
  }
 }
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

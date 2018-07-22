
// import axios from 'axios'
export default {
  name:'userList',
  data() {
    return {
      userList: [],
      pageSize:2,
      total:0,
      searchText:'',
      curpage:1,

      dialogAddUser:false,
      addUserForm:{
        usernem:'',
        password:'',
        email:'',
        mobile:''
      },
      addUserRules:{
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 12, message: "长度在 3 到 12 个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 3, max: 8, message: "长度在 3 到 8 个字符", trigger: "blur" }
        ]
      },
      dialogEditUser:false,
      editUserForm:{
        username:'',
        email:'',
        mobile:'',
        id:-1
      },
      editUserRules:{
        email: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 20, message: "长度在 3 到 20 个字符", trigger: "blur" }
        ],
       
      },
    }
  },
  created(){
    this.getUserList();
  },
  methods:{
    getUserList(curpage=1,searchText=''){
      this.$http
      .get('/users',{
        params:{
          query:searchText,
          pagenum:curpage,
          pagesize:this.pageSize
        },
        // headers:{
        //   Authorization:localStorage.getItem('token')
        // }
      }).then(res=>{
        // console.log(res)
        const {data,meta} = res.data
        const {status} = meta
        const {users,total} = data
        if(status === 200) {
          this.userList = users
          this.total = total
          // this.curpage = 2
        }
      })
      
    },
    getCurPageUserList (curpage){
      this.getUserList(curpage,this.searchText)
    },
    search(){
      // console.log(11)
      this.curpage = 1
      this.getUserList(this.curpage,this.searchText)
    },
    /**
     * 
     * @param {obj} scope 要修改的状态
     */
    changeUserState(scope){
      // console.log(scope)

      const url = `/users/${scope.id}/state/${scope.mg_state}`
      // const url = 'http://localhost:8888/api/private/v1/users/'+user.id+'/state/' + user.mg_state
      // 基本地址http://localhost:8888/api/private/v1/
      // 接口地址：users/:uId/state/:type
      // uId 用户id不能为空，携带在url中
      this.$http
      .put(url)
      .then((res)=>{
        const { meta,data} = res.data
        if(meta.status === 200){
          this.$message({
            message:(data.mg_state === 1?'启用':'禁用')+'成功',
            type:'success',
            duration :500
          })
        }else{
          this.$message({
            message:'操作失败',
            type:'error'
          })
        }
      })
    },
    showAddUser(){
      console.log("谁在点我")
      this.dialogAddUser = true
    },
    addUser(){
      this.$refs.addUserForm.validate((valid)=>{
        if(valid){
          this.$http
          .post('/users',this.addUserForm)
          .then((res)=>{
            console.log(res)
            const {meta} = res.data
            if(meta.status === 201){
              this.dialogAddUser = false
              this.getUserList();
              this.$refs.addUserForm.resetFields()
              this.$message({
                message: '添加用户成功',
                type: 'success'
              });
            }else if(meta.status === 400){
              this.$message({
                message: meta.msg,
                type: 'error'
              });
            }else{
              return false
            }
          })
        }
      })
    },
    showEditUser(rowdata){
      this.dialogEditUser = true
      this.editUserForm.username = rowdata.username
      this.editUserForm.email = rowdata.email
      this.editUserForm.mobile = rowdata.mobile
      this.editUserForm.id = rowdata.id
    },
    editUser(){
      // console.log(22)
      const {id,email,mobile} = this.editUserForm

      this.$http
      .put(`/users/${id}`,{
        email,mobile
      })
      .then((res)=>{
        // console.log(res)
        const {meta} = res.data
        if(meta.status === 200){
          this.dialogEditUser = false
          this.getUserList(this.curpage)
        }else if(meta.status === 404){
          this.$message({
            message: meta.msg,
            type: 'error'
          });
        }else{
          return false
        }
      })
    },
    delUser(id){
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$http
        .delete(`/users/${id}`)
        .then(res => {
          
          this.getUserList(this.curpage)
        })
        
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });          
      });
        
      
    }
  }
}
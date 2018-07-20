
import axios from 'axios'
export default {
  data() {
    return {
      userList: [],
      pageSize:2,
      total:0,
      searchText:''
    }
  },
  created(){
    this.getUserList();
  },
  methods:{
    getUserList(curpage=1,searchText=''){
      axios.get('http://localhost:8888/api/private/v1/users',{
        params:{
          query:searchText,
          pagenum:curpage,
          pagesize:this.pageSize
        },
        headers:{
          Authorization:localStorage.getItem('token')
        }
      }).then(res=>{
        console.log(res)
        const {data,meta} = res.data
        const {status} = meta
        const {users,total} = data
        if(status === 200) {
          this.userList = users
          this.total = total
        }
      })
      
    },
    getCurPageUserList (curpage){
      this.getUserList(curpage,this.searchText)
    },
    search(){
      console.log(11)
      this.getUserList(1,this.searchText)
    }
  }
}
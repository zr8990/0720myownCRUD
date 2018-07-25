import ElTreeGrid from "element-tree-grid"

export default {
  data(){
    return {
      categoryList:[],
      total:0,
      pagesize:10,
      loading:true,
      categories:[],
      dialogCategoryFormVisible:false,
      categoryAddForm:{
        cat_name:"",
        cat_pid:[],
        cat_level:-1
      }
    }
  },
  created(){
    this.getCategoryList()
  },
  methods:{
    async getCategoryList(pagenum = 1){
      this.loading = true
      const res = await this.$http.get(`/categories`,{
        params:{
          pagenum,
          pagesize:this.pagesize
        }
      })
      const {data,meta} = res.data
      // console.log(res)
      if(meta.status === 200){
        this.categoryList = data.result
        this.total = data.total
        this.loading = false
      }
    },
    async showAddCategory(){
        const res = await this.$http.get(`/categories`,{
          params:{
            type:2
          }
        })
        const {data,meta} = res.data
        // console.log(data)
        if(meta.status === 200){
            this.categories = data
            this.dialogCategoryFormVisible = true
        }
      },
      async AddCategoryAssign(){
        let { cat_name:catName,cat_pid:catPid } = this.categoryAddForm
        const res = await this.$http.post(`/categories`,{
          cat_name:catName,
          cat_pid:catPid[catPid.length-1],
          cat_level:catPid.length
        })
        console.log(res)
        const { meta } = res.data
        if(meta.status === 201){
          this.dialogCategoryFormVisible = false
          this.getCategoryList()
          this.categoryAddForm.cat_name = ''
          this.categoryAddForm.cat_pid = []
          
        }
      }
    },
  components:{
  [ElTreeGrid.name]:ElTreeGrid
  }
}

import ElTreeGrid from "element-tree-grid"

export default {
  data(){
    return {
      categoryList:[],
      total:0,
      pagesize:10,
      loading:true,
      categories:[],
      dialogCategoryFormVisible:false

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
      const {data} = res.data
      // console.log(res)
      this.categoryList = data.result
      this.total = data.total
    },
    showAddCategory(){
      this.dialogCategoryFormVisible = true
    },
    async AddCategoryAssign(){
      const res = await this.$http.get(`/categories`,{
        params:{
          type:2
        }
      })
      const {data,meta} = res.
      console.log(data)
    }
   
  },
  components:{
    [ElTreeGrid.name]:ElTreeGrid
  }

}
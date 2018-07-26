import ElTreeGrid from 'element-tree-grid'
export default {
  data(){
    return {
      goodsList:[],
      query:'',
      pagesize:5,
      total:0,
      curpage:1
    }
  },
  created(){
    this.getGoodsList(this.$route.params.page)
  },
  watch:{
    $route (to, from) {
      this.getGoodsList(to.params.page)
    }
  },

  methods:{
    async getGoodsList(pagenum=1){
      const res = await this.$http.get(`/goods`,{
        params:{
          query:"",
          pagenum,
          pagesize:this.pagesize
        }
      })
    const { data,meta } = res.data
    console.log(data)
     if(meta.status === 200){
      this.goodsList = data.goods

      this.total = data.total
      this.curpage = +pagenum
     }
    },
    getCurPage (page) {
      this.$router.push(`/goods/${page}`)
    },
    
  }
}
import ElTreeGrid from 'element-tree-grid'
export default {
  data(){
    return {
      goodsList:[],
      query:'',
      pagesize:5,
      total:0
    }
  },
  created(){
    this.getGoodsList()
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
      this.pagenum = this.total/this.pagesize
     }
    },
    async getCurPage () {

    }
  }
}
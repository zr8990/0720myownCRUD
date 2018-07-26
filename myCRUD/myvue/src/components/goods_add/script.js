
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import { quillEditor } from 'vue-quill-editor'



export default {
  data() {
    return {
      active: 0,
      activeName:'basic',
      radio:'1',
      fileList: [],
      uploadUrl:"http://localhost:8888/api/private/v1/upload",
      uploadHeaders:{
        Authorization:localStorage.getItem('token')
      },
      cateGoodsList:[],
      goodsAddForm:{
        goods_name:'',
        goods_cat:[],
        goods_price:'',
        goods_number:'',
        goods_weight:'',
        goods_introduce:'',
        pics:[]
      },
    
    }
  },
  created(){
    this.getAddGoodsList()
  },
  methods: {
    async getAddGoodsList(){
      const res = await this.$http.get('/categories',{
        params:{
          type:3
        }
      })
      const { data, meta } = res.data
      // console.log(res)
      if(meta.status === 200) {
        this.cateGoodsList = data
      }
    },
    changeTab(tab){
      this.active = tab.index-0
    },
    next(activeIndex,tabName) {
      // if (this.active++ > 2) this.active = 0;
      this.active = activeIndex
      this.activeName = tabName
      console.log(11)
    },

    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleSuccess (response,file, fileList ) {
      this.goodsAddForm.pics.push({
        pic:response.data.tem_path
      })
    },
    async addGoods(){
      const res = await this.$http.post("/goods",{
        ...this.goodsAddForm,
        goods_cat:this.goodsAddForm.goods_cat.join(",")
      })
      console.log(res)
      const { meta } = res.data
      if(meta.status === 201){
        this.$message({
          type:'success',
          message:meta.msg
        })
        this.$router.push('/goods')
      }
    },
  
  },
  components: {
    quillEditor
  }

}
<template>
  <div class="rights">
    <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>活动管理</el-breadcrumb-item>
    <el-breadcrumb-item>活动列表</el-breadcrumb-item>
    <el-breadcrumb-item>活动详情</el-breadcrumb-item>
  </el-breadcrumb>

  <el-table
    :data="rightsList" stripe
    style="width: 100%">

    <el-table-column
      type="index"
      :index="indexMethod">
    </el-table-column>
    <el-table-column
      prop="authName"
      label="权限名称"
      width="180">
    </el-table-column>
    <el-table-column
      prop="path"
      label="路径"
      width="180">
    </el-table-column>
    <el-table-column
      prop="level"
      label="层级">

      <template slot-scope="props">
      <span v-if="props.row.level === '0'">一级</span>
      <span v-else-if="props.row.level === '1'">二级</span>
      <span v-else>三级</span>
      </template>
   
    </el-table-column>
    
     
  </el-table>
  </div>
</template>
<script>
export default {
  data(){
    return {
      rightsList:[]
    }
  },
  created(){
    this.getRightsList()
  },
  methods:{
    async getRightsList(){
      const res = await this.$http.get("/rights/list")
      const { data, meta } = res.data
      if(meta.status === 200){

        this.rightsList = data
      }
    },
    indexMethod(index) {
      return index ;
    }
  }
}
</script>
<style>
.el-breadcrumb {
  padding-bottom: 20px;
}
.el-main {
  text-align: left;
}
</style>



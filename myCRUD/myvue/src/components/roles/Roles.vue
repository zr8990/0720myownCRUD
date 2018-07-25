<template>
<div class="roles">
  <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>活动管理</el-breadcrumb-item>
    <el-breadcrumb-item>活动列表</el-breadcrumb-item>
    <el-breadcrumb-item>活动详情</el-breadcrumb-item>
  </el-breadcrumb>
  <!-- 列表 -->
  
  <el-table
    :data="rolesList" stripe
    style="width: 100%">
    <el-table-column type="expand">
       <template slot-scope="props">
        <el-form v-if = " props.row.children.length === 0">
          暂无权限，请分配
        </el-form>
        <el-form v-else label-position="left" inline class="demo-table-expand">
          <el-row v-for="menu1 in props.row.children" :key="menu1.id">
            <el-col :span = "4">
              <el-tag closable>
                {{menu1.authName}}
              </el-tag>
            </el-col>
            <el-col :span = "20">
              <el-row v-for = "menu2 in menu1.children" :key = "menu2.id">
                <el-col :span="4">
                  <el-tag type="success" closable>
                    {{menu2.authName}}
                  </el-tag>
                </el-col>
                <el-col :span="20">
                  <span v-for="menu3 in menu2.children" :key="menu3.id">
                    <el-tag type="warning" closable>
                      {{menu3.authName}}
                    </el-tag>
                  </span>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </el-form>
      </template>
    </el-table-column>
    <el-table-column
      type="index"
      :index="indexMethod">
    </el-table-column>
    <el-table-column
      prop="roleName"
      label="角色名称"
      width="180">
    </el-table-column>
    <el-table-column
      prop="roleDesc"
      label="描述"
      width="180">
    </el-table-column>
    <el-table-column
      label="操作">
      <template slot-scope="scope">
        <el-row>
          <el-button type="primary" size="mini" icon="el-icon-edit" @click="showDialogEdit(scope.row)"></el-button>
          
          <el-button type="danger" size="mini"  icon="el-icon-delete" @click = "delUserInfo(scope.row.id)"></el-button>

          <el-button type="success" size="mini"  icon="el-icon-check" @click="showRightsAssign(scope.row)">分配权限</el-button>
        </el-row>
      </template>

    </el-table-column>
  </el-table>
<!-- 树形图 -->
<el-dialog title="角色授权" :visible.sync="dialogTreeVisible">
  <el-tree
    :data="rightsTreeList"
    show-checkbox
    default-expand-all
    node-key="id"
    ref="rightsTree"
    highlight-current
    :props="defaultProps">
  </el-tree>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="addAssignRights">确 定</el-button>
  </div>
</el-dialog>
  </div>
</template>
<script>
export default {
  data(){
    return {
      rolesList:[],
      dialogTreeVisible:false,
      rightsTreeList:[],
      defaultProps:{
        label:'authName'
      },
      curSelRoleId:-1
    }
  },
  created(){
    this.getRolesList()
    // this.getRightsList()
  },
  methods:{
    async getRolesList(){
      const res = await this.$http.get(`/roles`)
      // console.log(res)
      const {data,meta} = res.data
      this.rolesList = data
      this.curSelRoleId = data.id
    },
    indexMethod(index) {
    return index 
    },
    async getRightsList(role){
      const res = await this.$http.get(`rights/tree`)
      const { data, meta } = res.data
      this.rightsTreeList = data
      this.dialogTreeVisible = true
      // console.log(data)
      this.$nextTick(()=>{
        const menuThreeIds = []
        role.children.forEach((menu1)=>{
          menu1.children.forEach((menu2)=>{
            menu2.children.forEach((menu3)=>{
              menuThreeIds.push(menu3.id)
            })
          })
        })
        this.$refs.rightsTree.setCheckedKeys(menuThreeIds)
      })
    },
    showRightsAssign(role){
      
      this.curSelRoleId = role.id
      this.getRightsList(role)
    },
    async addAssignRights(){
      const checkedRights = this.$refs.rightsTree.getCheckedKeys()
      const checkedHalfRights = this.$refs.rightsTree.getHalfCheckedKeys()
      const allChecked = [...checkedRights,...checkedHalfRights]

      const res = await this.$http.post(`/roles/${this.curSelRoleId}/rights`,{
        rids:allChecked.join(',')
      })
      console.log(res)
      const {meta} = res.data
      if(meta.status === 200){
        this.dialogTreeVisible = false
        this.getRolesList()
      }
      
    }
  }
  
}
</script>
<style lang = "less">
.el-breadcrumb {
  padding-bottom: 15px;
}
.el-main {
  text-align: left;
}
.el-form {
  
  &>.el-row {
    border-bottom: 1px dashed #ccc
  }
}
.el-row {
  padding:10px;
}
.el-tag {
  margin-right: 10px;
}
</style>



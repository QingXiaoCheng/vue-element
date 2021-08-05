<template>
  <div>
     <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="date"
        label="标题" >
        <template slot-scope="scope">
          <div class="table-title"> <span @click="toLookAr(scope)">{{ scope.row.title }} </span></div>
        </template>
      </el-table-column>
      <el-table-column
        prop="date"
        label="创建时间"
        width="180">
      </el-table-column>
      <el-table-column
        prop="status"
        label="状态" width="140">
      </el-table-column>
<el-table-column
        prop="count"
        label="阅读次数" width="140">
      </el-table-column>
     <el-table-column label="操作" width="240">
      <template slot-scope="scope">
        <el-button
          size="mini"
          type="primary"
          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        <el-button
          size="mini" 
          @click="handleDelete(scope.$index, scope.row)">查看</el-button>
          <el-button
          size="mini" 
          @click="handleDelete(scope.$index, scope.row)">移动</el-button>
      </template>
    </el-table-column>

    </el-table>
    
  </div>
</template>

<script>
export default{
  data(){
    return {
      searchkey: '',
      tableData: []
    }
  },
  created(){
    this.getTableData()
  },
  methods:{
    getTableData(){
      let data = {
        out:'FRAME',
        in:'interviewv'
      }
      this.$api.getTableList(data).then(res=>{ 
        this.tableData = res.data
      })
    },
     toLookAr(scope){ 
      this.$store.commit('setArticalId', scope.row.articleId)
      this.$router.push({
        name:'look',
        params: {
          articleId:scope.row.articleId,
          subfield: false,
          editable: false,
          toolbarsFlag: false
        }
      })
    },
    handleEdit(i, row){
      console.log(i, row);
      this.$router.push({
        name:'look',
        params: {
          articleId: row.articleId,
          subfield: false,
          editable: false,
          toolbarsFlag: false
        }
      })
    }
  }
}
</script>

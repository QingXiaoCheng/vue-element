<template>
  <div class="advancejs">
    <div class="advancejs-top">
      <div>
        <el-tag>标签一</el-tag>
        <el-tag type="success">标签二</el-tag>
        <el-tag type="info">标签三</el-tag> 
      </div>
      <el-input
          v-model="searchkey"
          size="mini"
          placeholder="输入关键字搜索"/>
    </div>
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="title"
        label="标题">
         <template slot-scope="scope">
          <div class="table-title"> <span @click="toLookAr(scope.row)">{{ scope.row.title }} </span></div>
        </template>
      </el-table-column> 
      <el-table-column
        prop="date"
        label="创建时间"
        width="180">
      </el-table-column>
       <el-table-column
        prop="status"
        label="状态"
        width="180">
      </el-table-column>
       <el-table-column
        prop="count"
        label="阅读次数"
        width="140">
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
export default {
  name:'advancejs',
  data(){
    return {
      searchkey: '',
      tableData: [{
          date: '2016-05-02',
          status: '完成',
          title: '理解 Javascript 执行上下文和执行栈',
          count:1,
          articleId: Math.random()
        }, {
          date: '2016-05-02',
          status: '完成',
          title: '理解 Javascript 执行上下文和变量对象',
          count:1,
          articleId: Math.random()
        },{
          date: '2016-05-02',
          status: '未完成',
          title: '理解 Javascript 内存机制',
          count:1,
          articleId: Math.random()
        }]
    }
  },
  created(){
    this.getTableData()
  },
  methods:{
    getTableData(){
      let data = {
        out:'JS',
        in:'advancejs'
      }
      this.$api.getTableList(data).then(res=>{ 
        console.log('==', res);
        this.tableData = res.data
      })
    },
    toLookAr(row){ 
      this.$store.commit('setArticalId', row.articleId)
      this.$router.push({
        name:'look',
        params: {
          articleId: row.articleId
        }
      })
    },
     handleEdit(i, row){
      console.log(i, row);
      this.$router.push({
        name:'look',
        params: {
          articleId: row.articleId,
          subfield: true,
          editable: true,
          toolbarsFlag: true
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.advancejs{
  background-color: #fff;
  width: 100%;
  height: 100%;
  padding: 10px;
  box-sizing: border-box;
  .advancejs-top{
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
    .el-input {
      width: 320px;
    } 
  }
  
}
</style>
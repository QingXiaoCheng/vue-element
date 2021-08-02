<template>
  <div>
     <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="date"
        label="标题" >
        <template slot-scope="scope">
          <div class="table-title"> <span @click="$router.push('look')">{{ scope.row.title }} </span></div>
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

      <!-- <el-table-column
      align="right" width="240">
      <template slot="header" slot-scope="scope">
        <el-input
          v-model="searchkey"
          size="mini"
          placeholder="输入关键字搜索"/>
      </template>
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        <el-button
          size="mini"
          type="primary"
          @click="handleDelete(scope.$index, scope.row)">详情</el-button>
      </template>
    </el-table-column> -->

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
       tableData: [{
          date: '2016-05-02',
          status: '完成',
          title: '理解 Javascript 执行上下文和执行栈',
          count:1,
          articleID: Math.random()
        }, {
          date: '2016-05-02',
          status: '完成',
          title: '理解 Javascript 执行上下文和变量对象',
          count:1,
          articleID: Math.random()
        },{
          date: '2016-05-02',
          status: '未完成',
          title: '理解 Javascript 内存机制',
          count:1,
          articleID: Math.random()
        }]
    }
  }
}
</script>

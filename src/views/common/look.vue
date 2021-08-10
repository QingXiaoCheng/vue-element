<template>
  <el-main style="padding:0;height:100%;"> 
    <div class="look-head">  
      <span class="demonstration" @click="drawer = true">获取url中的参数</span> 
    </div>
     <el-drawer
        title="我是标题"
        :visible.sync="drawer"
        :direction="direction"
        :before-close="handleClose"
        :modal-append-to-body="false" 
        :append-to-body="true">
        <span>我来啦!</span>
      </el-drawer>
    <div class="mavonEd" style="padding: 0 20px 20px 20px;">
      <mavon-editor v-model="lookValue" defaultOpen="preview" :subfield="subfield" :editable="editable" :toolbarsFlag="toolbarsFlag" />
    </div>
 
  </el-main>
  
</template>

<script>  
export default {
  name:'look',
  data(){
    return {
      lookValue: '',
      articleId:'',
      editable: false,  // 是否允许编辑
      toolbarsFlag: false,  // 释放展示工具栏
      subfield: false,  // false-单栏 true-双栏
      drawer: false,
      direction: '',
    }
  },
  created(){ 
    let { articleId, toolbarsFlag, editable, subfield} = this.$route.params
    this.articleId = articleId
    console.log('ac', articleId);
    this.toolbarsFlag = toolbarsFlag
    this.editable = editable
    this.subfield = subfield
    this.getArtical() 
    
  },
  mounted(){
    console.log(document.getElementsByClassName('el-main')[0]);
    let mainContent = document.getElementsByClassName('el-main')[0]
    mainContent.addEventListener("scroll", this.about);
  },
  methods:{ 
    getArtical() {
      let data = {
        articalId: this.articleId
      }
      this.$api.getArtical(data).then(res=>{  
        if(res.status === 200) {
          console.log(res,'=====');
          this.lookValue = res.data
        } 
      })
    },
    about(){
      console.log('about'); 
    }
  }
}
</script>


<style lang="less" > 
.look-head{
  margin-bottom: 20px;
  background-color: #fff;
  padding: 10px;
  padding-left: 20px;
  box-sizing: border-box;
  .demonstration{
    margin-right: 20px;
    color: #303133;
  }
}
 
</style>
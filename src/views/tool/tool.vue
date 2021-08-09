<template>
  <div class="look-content"> 
    <mavon-editor v-model="lookValue" defaultOpen="preview" :subfield="subfield" :editable="editable" :toolbarsFlag="toolbarsFlag" />
  </div>
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
      subfield: false  // false-单栏 true-双栏
    }
  },
  created(){ 
    let { articleId, toolbarsFlag, editable, subfield} = this.$route.params
    this.articleId = 'TOOL-tool-1'
    console.log('ac', articleId);
    this.toolbarsFlag = false
    this.editable = false
    this.subfield = false
    this.getArtical()
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
    }
  }
}
</script>


<style lang="less" >
 
</style>
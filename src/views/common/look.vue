<template>
  <div class="look-content"> 
    <mavon-editor v-model="lookValue" defaultOpen="preview" :subfield="false" :editable="false" :toolbarsFlag="false" />
  </div>
</template>

<script>
export default {
  name:'look',
  data(){
    return {
      lookValue: ``,
      articleId:'' 
    }
  },
  created(){ 
    this.articleId = this.$route.params.articleId
   
    this.getArtical()
  },
  methods:{ 
    getArtical() {
      let data = {
        articalId: this.articleId
      }
      this.$api.getArtical(data).then(res=>{  
        if(res.status === 200) {
          this.lookValue = res.data
        } 
      })
    }
  }
}
</script>


<style lang="less" scoped>
.look-content{
  // background-color: #fff;
  height: 100%;
  // padding:20px;
}
</style>
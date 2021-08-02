<template>
  <div class="createCon">
    <!-- https://codechina.csdn.net/mirrors/hinesboy/mavoneditor?utm_source=csdn_github_accelerator -->
    <mavon-editor v-model="value" @save="saveMavon"/>
  </div>
</template>

<script>
export default {
  data(){
    return { 
      value: '',
    }
  },
  methods:{
    saveMavon(value, render){
      console.log('mavon' ,value, render);
    }
  }
}
</script>

<style lang="less">
.createCon,.v-note-wrapper {
  width: 100%;
  height: 100%;
}

</style>
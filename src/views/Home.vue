<template>
  <div>
    <layout></layout>
  </div>
</template>
<script>
import layout from './layout/index.vue'

export default {
  name: 'home',
  components: {
    layout
  }
}
</script>

<style scoped>
.el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
}
</style>

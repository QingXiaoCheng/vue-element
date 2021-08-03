<template>
  <div class="createCon">
    <!-- https://codechina.csdn.net/mirrors/hinesboy/mavoneditor?utm_source=csdn_github_accelerator --> 
    <div class="selectMenu">
      <span class="demonstration">文章分类</span>
      <el-cascader
        v-model="menuValue"
        :options="menuOptions"
        @change="handleMenuChange" @focus="focusMenu" size="medium"
        clearable></el-cascader>
    </div>
    <mavon-editor v-model="mdValue" @save="saveMavon" />
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name:'createartical',
  data(){
    return { 
      mdValue: '',
      menuValue:''
    }
  },
  computed:{
     ...mapState(['menulist', 'menuOptions']),
     setRandom(){   // 生成随机六位数
       let randomStr = ''
       let len = 6
        let randomArr = [1,2, 3,4,5,6,7,8,9,0] 
        for(let i = 0; i<=len; i++) {
          var index = Math.floor(Math.random() * 9);
          randomStr += randomArr[index]
        }
        return randomStr
    }
  },
  created(){ 
    console.log('menulist', this.menulist);
  }, 
  methods:{
    saveMavon(value, render){
      console.log('mavon' ,value, render); 
      // console.log('setRandom', this.setRandom);
      var eleLink = document.createElement('a');
      eleLink.download = `${this.menuValue[0]}-${this.menuValue[1]}-${this.setRandom}.md`;
      eleLink.style.display = 'none';
      // 字符内容转变成blob地址
      var blob = new Blob([value]);
      eleLink.href = URL.createObjectURL(blob);
      console.log(eleLink.href,'href');
      // 触发点击
      document.body.appendChild(eleLink);
      eleLink.click(); 
    },
    handleMenuChange(value) {
      this.menuValue = value 
    },
    cMenulist(source) {   // 处理menulist为级联选择器需要的格式
      let target = [] 
      source.map((item, index)=>{
        target = target.concat({value: item.arti, label: item.menutitle})
        if(item.children instanceof Array) { 
          target[index].children = []
          item.children.map(i=>{
            target[index].children = target[index].children.concat({value: i.link, label: i.menutitle})
          })
          return target
        }
      })
      return target
    },
    focusMenu(){  
      let options = this.cMenulist(this.menulist)
      options.shift()  // 去除首页
      options.pop()  // 去除创建文章 
      console.log(options);
      this.$store.commit('setMenuOptions', options)
      // this.menuOptions = options
    }
  }
}
</script>

<style lang="less">
.createCon {
  width: 100%;
  height: 100%;
  position: relative;
  .selectMenu{
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
  .v-note-wrapper {
    width: 100%;
    height: 90%;
  }
}


</style>
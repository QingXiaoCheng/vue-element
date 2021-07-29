<template>
  <div class="content">
    <el-container style="height: 100vh;text-align:left;">
     <div class="aside" >
        <el-aside width="200px">
        <el-menu unique-opened router :default-active="activemenu" @select="selectMenu"> 
          <div v-for="item in menulist" :key="item.id" >
            <el-submenu :index="item.id" v-if="item.children">
              <template slot="title"><i :class="item.menuIcon"></i> {{item.menutitle}}</template> 
                <el-menu-item-group v-for="i in item.children" :key="i.id"> 
                <el-menu-item :index="i.id" :route="i.link">{{i.menutitle}}</el-menu-item> 
              </el-menu-item-group> 
            </el-submenu> 
            <el-menu-item :index="item.link" v-else>
              <i :class="item.menuIcon"></i>
              <span slot="title">{{item.menutitle}}</span>
            </el-menu-item> 
          </div>
            
             
        </el-menu>  
      </el-aside>
     </div> 
      <el-container>
        <el-header height="100px" > 
          <div class="header">
            <i class="el-icon-s-fold" style="margin-right: 15px"></i> 
            <el-breadcrumb separator="/">
             <el-breadcrumb-item :to="{ path: 'mainpage' }">首页</el-breadcrumb-item>
              <el-breadcrumb-item v-for="item in getBread" :key="item.menutitle">{{item.menutitle}}</el-breadcrumb-item>
              <!-- <el-breadcrumb-item :to="{ path: 'h5' }">H5</el-breadcrumb-item>  -->
            </el-breadcrumb>
          </div> 
          <div class="head-tag">
            <el-tag
            v-for="tag in tags"
            :key="tag.name"
            :closable="tag.closable" size="small"  @click="clickTag" :class="`${tag.tagclass}`">
            {{tag.name}} 
          </el-tag>
          </div>
        </el-header> 
        <el-main>
           <router-view/>
        </el-main>
         
      </el-container>
    </el-container>
  </div>
</template>

<script>  
export default{
  data(){
    return {
      menulist:[],
      tags: [
        { name: '首页', link: 'mainpage',closable:false, tagclass:'tagActive' },
        { name: '文档', link: '',closable:false, tagclass:'tagActive' }
      ],
      activemenu:'mainpage',
      activemenuP:['0']
    }
  },
  components:{ 
  },
  created(){ 
    this.$api.getmenu().then(res=>{
      // console.log(res, 'mock请求数据');
      this.menulist = res.data
    })
  },
  computed:{
    getBread(){ 
      let breadArr = this.flatFun(this.menulist) 
      let breadList = [] // {menutitle:'首页', link: "mainpage"}
      breadArr.forEach(item=>{
        if(item.id != 0) {
          if(this.activemenuP.includes(item.id) || this.activemenuP.includes(item.link)) {
          breadList.push({menutitle: item.menutitle, link: item.link})
          }
        }
        
      })  
      return breadList
    },
    
  },
  methods:{
    selectMenu(i,path){  
      this.activemenuP = path
      this.activemenu = i
    },
    flatFun(arr){ 
      let newArr = []
      arr.forEach(item=>{
        if(item.children) {
          newArr = newArr.concat(item)
          newArr = newArr.concat(this.flatFun(item.children))
        }else{
          newArr = newArr.concat(item)
        }
      })
      return newArr
    },
    clickTag(){

    }
  }
}
</script>


<style lang="less">

.content{
  height: 100%;
  overflow: hidden;
}
.aside{ 
  height: 100%;
  overflow: scroll;
  .el-aside,.el-menu{
    height: 100%;
  }
}
.header{
  padding: 20px;
  padding-left: 0;
  display: flex; 
  font-size: 24px;
  .el-icon-s-fold{
    line-height: 30px;
  }
  .el-breadcrumb{
    line-height: 30px;
  }
  
}

.head-tag {
  .el-tag{
    border-color: #d8dce5;
    color: #495060;
    border-radius: 0;
    margin-right: 5px;
    cursor: pointer;
    background-color: #fff;
    .el-tag__close{
      color: #495060; 
    }
    .el-tag__close:hover{
      background-color: #b4bccc
    }
    
  }
  .tagActive{
      background-color: #42b983;
      color: #fff;
      border-color: #42b983;
  }
  .tagActive::before{
    content: '';
    display: inline-block;
    background-color: #fff;
    width: 8px;
    height: 8px;
    position: relative;
    margin-right: 2px;
    border-radius: 50%;
  }
}
 
.el-main{
  background-color: #f0f2f5;
}
</style>

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
            <el-menu-item :index="item.id" :route="item.link" v-else>
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
            <div class="menuRight">  
              <el-dropdown trigger="click" placement="bottom-start"   @command="getDropdown">
                <img src="../../assets/icon/seticon.png" alt=""> 
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item command="personInfo">个人信息</el-dropdown-item> 
                  <el-dropdown-item command="logout" divided>退出登陆</el-dropdown-item> 
                </el-dropdown-menu>
              </el-dropdown>
            </div>
          </div> 
          <div class="head-tag">
            <el-tag
            v-for="tag in tags"
            :key="tag.name"
            :closable="tag.closable" size="small"  @click="clickTag(tag.id)" :class="`${tag.tagclass}`" @close="closeTag(tag.id)">
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
import { mapState } from 'vuex'
export default{
  data(){
    return {
      menulist:[],
      tags: [
        { id:'0',name: '首页', link: 'mainpage',closable:false, tagclass:'tagActive' }
      ], 
      activemenuP:['0']
    }
  },
  created(){    
    this.$api.getmenu().then(res=>{
      // console.log(res, 'mock请求数据');
      this.menulist = res.data
    })
  },
  watch:{
    $route(route) { 
      let breadArr = this.flatFun(this.menulist) 
      breadArr.forEach(item=>{ 
        if(item.link === route.name) {
          this.$store.commit('setActivemenu', item.id)
        }
      }) 
    }
  },
  mounted(){  
  },
  computed:{
     ...mapState(['activemenu']),
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
    } 
  },
  methods:{
    selectMenu(i,path){  
      this.activemenuP = path
      this.$store.commit('setActivemenu', i)  
      this.tags = this.tags.filter((item, index)=>{
        return item.id !== i
      })   
      this.tags.push({ id:i,name:this.getMenuItem(i).menutitle,closable:true, tagclass:'' }) 
      this.setTagClass(i)  
    },
    flatFun(arr){  // 二维数组转一维
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
    getMenuItem(i){  // 根据id获取菜单列表对应菜单项
      let breadArr = this.flatFun(this.menulist)
      let menuItem = {}
      breadArr.forEach(item=>{
        if(item.id === i) { 
          menuItem = {...item}
        }
      })
      return menuItem
    },
    getDropdown(drop){ 
      if(drop === 'personInfo') {
        this.$router.push('/personal')
      }else {
        this.$store.commit('setToken', '') 
        sessionStorage.removeItem('token') 
        this.$router.push('/login')
      }
    },
    clickTag(i){ 
      this.$router.push(this.getMenuItem(i).link) 
      let menuI = this.getMenuItem(i).id
      let frontMenuI = ''
      console.log(menuI);
      if(menuI[1]) {
        frontMenuI = menuI[0]
      }
      this.activemenuP = [frontMenuI, menuI] 
      this.setTagClass(i)
    },
    setTagClass(i) {   // 根据点击id获取tag项
      let findTag = {}
      this.tags.find(item=>{ 
        if(item.id === i) { 
          item.tagclass = 'tagActive'
          findTag = {...item}
        }else{
          item.tagclass = ''
        }
      })
      return findTag
    },
    closeTag(i) {
      this.tags = this.tags.filter(item=>{ 
        return item.id !== i
      })
      this.setTagClass(i-1)
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

.el-header{ 
  padding: 0!important;
  border-bottom: 1px solid #ccc;
}
.header{
  padding: 18px;
  padding-left: 20px;
  display: flex; 
  font-size: 24px;
  .el-icon-s-fold{
    line-height: 30px;
  }
  .el-breadcrumb{
    line-height: 30px;
  }
  .menuRight{
    position: absolute;
    right: 30px;
    img{
      width: 30px;
      height: 30px;
    }
  }
}

.head-tag {
  padding: 5px 20px;
  border-bottom: 1px solid #b4bccc; 
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

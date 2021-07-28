<template>
  <div class="content">
    <el-container style="height: 100vh;">
     <div class="aside" >
        <el-aside width="200px">
        <el-menu :default-openeds="['1']"  unique-opened>
          <el-submenu index="1">
            <template slot="title">H5</template>
            <el-menu-item-group> 
              <el-menu-item index="1-1">选项1</el-menu-item>
              <el-menu-item index="1-2">选项2</el-menu-item>
            </el-menu-item-group>
          </el-submenu>

          <el-submenu index="2">
            <template slot="title">CSS</template>
            <el-menu-item-group> 
              <el-menu-item index="2-1">选项1</el-menu-item>
              <el-menu-item index="2-2">选项2</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">JS基础</template>
            <el-menu-item-group> 
              <el-menu-item index="3-1">选项1</el-menu-item>
              <el-menu-item index="3-2">选项2</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="4">
            <template slot="title">JS高级</template>
            <el-menu-item-group> 
              <el-menu-item index="4-1">选项1</el-menu-item> 
            </el-menu-item-group>
          </el-submenu>

          <el-submenu index="5">
            <template slot="title">网络</template>
            <el-menu-item-group> 
              <el-menu-item index="5-1">选项1</el-menu-item>
              <el-menu-item index="5-2">选项2</el-menu-item>
            </el-menu-item-group>
          </el-submenu>

          <el-submenu index="6">
            <template slot="title">浏览器</template>
            <el-menu-item-group> 
              <el-menu-item index="6-1">选项1</el-menu-item>
              <el-menu-item index="6-2">选项2</el-menu-item>
            </el-menu-item-group>
          </el-submenu>

          <el-submenu index="7">
            <template slot="title">框架篇</template>
            <el-menu-item-group> 
              <el-menu-item index="7-1">选项1</el-menu-item>
              <el-menu-item index="7-2">选项2</el-menu-item>
            </el-menu-item-group>
          </el-submenu>

          <el-submenu index="8">
            <template slot="title">编程篇</template>
            <el-menu-item-group> 
              <el-menu-item index="8-1">选项1</el-menu-item>
              <el-menu-item index="8-2">选项2</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="9">
            <template slot="title">面试题收集</template>
            <el-menu-item-group> 
              <el-menu-item index="9-1">选项1</el-menu-item>
              <el-menu-item index="9-2">选项2</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>  
      </el-aside>
     </div>

      <el-container>
        <el-header height="200px">Header</el-header>
        <el-main>Main</el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style >

.content{
  height: 100%;
  overflow: hidden;
}
.aside{ 
  height: 100%;
  overflow: scroll;
}
</style>
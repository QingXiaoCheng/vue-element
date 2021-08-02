# 前端项目搭建
- 以下都是基于mac电脑

## 解决电脑打不开github的问题
- 1.新建一个访达窗口，同时按住shift command G三个键，进入前往文件夹页面
- 2.在输入框内输入/etc/hosts
- 3.找到hosts文件夹
- 4.由于hosts文件夹不可编辑，所以复制一份hosts文件先保存到本地桌面
- 5.在新的hosts文件夹里输入如下代码：然后点击保存。
```js
http://github.com 204.232.175.94 http://gist.github.com 107.21.116.220 
http://help.github.com 207.97.227.252 http://nodeload.github.com 199.27.76.130 
http://raw.github.com 107.22.3.110 http://status.github.com 204.232.175.78 
http://training.github.com 207.97.227.243 http://www.github.com
```
- 6.将/etc/hosts原来的文件删除，删除的时候需要输入你的电脑开机密码
- 7.再将修改后的保存到桌面的hosts文件拖拽到/etc文件夹下，期间有可能需要你输入开机密码，文件名最好是hosts
- 8.以上完成后，我们来到终端命令行ping 一下github, 不超时说明可以了`ping www.github.com`
- 9.浏览器里可以访问github



## 一、安装vue-cli
```js
sudo npm install -g @vue/cli 
```
1. 验证是否安装成功
`vue --version`或`vue -V`
- 问题：`zsh: command not found: vue`
- 解决：安装成功后，复制路径地址，填入变量配置
`export PATH="$PATH:/Users/chengxiaoqing/.npm-global/bin"`
- [vue-cli安装成功路径](https://z3.ax1x.com/2021/07/28/WouZAx.png)
- [解决办法](https://z3.ax1x.com/2021/07/28/WouH56.png)

## 二、创建vue项目
- 命令：`vue create 项目名`，`vue create vue-element`
```js
Your connection to the default yarn registry seems to be slow.
   Use https://registry.npm.taobao.org for faster installation? Yes
```
- `Manually select features`
- `Choose Vue version, Babel, Router, Vuex, CSS Pre-processors, Linter`
- `Sass/SCSS (with node-sass) `
- `Pick a linter / formatter config: Standard`
- `Lint on save`
- `In dedicated config files`独立文件放置

## 三、生成的目录结构

1. node_modules： 这个文件夹里面是我们项目需要的一些依赖；
2. public： 静态文件夹，这个文件夹中的资源不会被webpack编译，构建生产包的时候，会被直接拷贝一份；
3. assets：  是页面和组件中用到的静态资源，比如公共样式文件，字体文件，图片等，该文件夹与public的区别是：该文件夹中的资源会被webpack编译；
4. components：  文件夹中存放我们的组件；
5. views：  文件夹中存放我们的页面；
6. App.vue：  这个文件是我们所有vue页面的顶层文件；
7. main.js：  是我们整个项目的入口文件；
8. router.js：  是路由的配置文件；
9. store.js：  是vuex的配置文件；
10. .browserslistrc： 文件用于给开发者设置浏览器版本的范围；
11. .eslintrc.js： eslint配置文件；
12. .gitignore： 需要git忽略的文件；
13. babel.config.js： babel的配置工具；
14. package-lock.json： 记录项目依赖中各个依赖之间的关系和版本，防止npm包中有不遵守“相同大版本号的同一个库包，其接口符合兼容要求”这一规范，导致项目运行报错；
15. package.json： 项目的描述文件，包括项目名、依赖的版本、作者、命令、入口文件等信息。README.md： 项目的说明文档，项目介绍、License、一些命令（例如：启动命令、打包命令、单元测试命令等）


## 四、启动项目`npm run serve`


## 五、把项目发布到远程仓库
- 命令 `git remote add origin <远程仓库地址>`
`git remote add origin git@github.com:QingXiaoCheng/vue-element.git`
- git push origin master 
- 问题：报错
```js
Warning: Permanently added 'github.com,13.250.177.223' (RSA) to the list of known hosts.
git@github.com: Permission denied (publickey).
fatal: Could not read from remote repository.

Please make sure you have the correct access rights
and the repository exists.
```
- 解决办法：将ssh-key添加到仓库中去，这样才可以push上去

### 命令行查看电脑SSh-key
- 1. `cd ~/.ssh` 进入文件夹
- 2. `ls`查看文件夹下存在文件
- 3. `cat id_rsa.pub`打开id_rsa.pub文件






 ## 执行任何的npm命令都报错的问题
`Error: EEXIST: file already exists, mkdir '/Users/chengxiaoqing/.npm-global/bin/vue'`
解决：
- 访达里面快捷键 shift command G三个键，进入前往文件夹页面
- 输入/Users/chengxiaoqing/.npm-global，找到bin文件夹下vue文件，删除即可


## 安装cnpm和yarn成功后查看版本都显示无此命令
- 原因：可能是前面安装vue-cli报错后设置了prefix；
- 解决办法：
	- 使用命令`npm config list -l`查看prefix是否被覆盖了，看到原始的prefix被覆盖
	- 使用命令`npm config set prefix "/usr/local"`设置prefix为原始值
	- 安装cnpm `npm install -g cnpm --registry=https://registry.npm.taobao.org`
		- 报错`Error: EACCES: permission denied, access '/usr/local/lib/node_modules'`没有权限
	- 解决没有权限问题：加sudo
`sudo npm install -g cnpm --registry=https://registry.npm.taobao.org`
	- 查看cnpm版本`cnpm -v`


## 奇葩错误
```js
/Users/chengxiaoqing/Documents/exercise/vue-element/src/views/Home.vue
  3:12  error  Newline required at end of file but not found  eol-last
```
- 原因：最后一行没有空格
- 如何不进行eslink规范校验
	- 找到eslintrc.js文件删除'@vue/standard`
	- 重启项目



## 配置`vue.config.js`文件
- 每次配完都需要重启项目该配置项才会生效





## vue项目中，使用axios发送ajax请求，mock.js模拟数据的流程

- 安装axios和mockjs
```js
npm install -S axios
npm install -D mockjs
```

- 新建文件夹 src下新建mock和api文件夹
- mock文件夹下新建index.js文件和menu.json文件
- api文件夹下新建index.js

- api/index.js
```js
import axios from "axios";
export default {
  getmenu(data) {
    return  axios.get("/mock/menu")
  }
}
```
- mock/index.js
```js
import Mock from 'mockjs'

import menu from './menu.json'

const Random = Mock.Random 
console.log(Random);
const produceNewsData = function () {
  let newsList = []
  for (let i = 0; i < 20; i++) {
    let newNewsObject = {
      title: Random.ctitle(), 
      content: Random.cparagraph(), 
      createdTime: Random.date()  
    }
    newsList.push(newNewsObject)
  }

  return newsList
}
 


Mock.mock("/mock/menu", 'get', {code: 200, message:'成功', data: produceNewsData })
```
- mock/menu.json json数据
```js
[{
  "id":"1",
  "menuname": "JS"
},
{
  "id":"2",
  "menuname": "css"
},
{
  "id":"3",
  "menuname": "签署"
}]
```

- main.js文件
```js
import './mock/index'
import api from './api/index.js'

Vue.prototype.$api = api
```

- 页面使用
```js
this.$api.getmenu().then(res=>{
   console.log(res, 'mock随机生成数据');
})
```


## 使用less-loader报错问题
- 错误：`this.getOptions is not a function`
- 原因：less-loader版本太高
- 解决：
	- 删除已安装的less-loader：`npm uninstall less-loader`
	- 安装新less-loader：`npm install less-loader@6.0.0 --save-dev`
 	- 重启项目


## vue中使用markdown编辑器
- [官网](https://codechina.csdn.net/mirrors/hinesboy/mavoneditor?utm_source=csdn_github_accelerator)
- 安装mavonEditor
```js
npm install mavon-editor --save 或者
yarn add mavon-editor
```
- main.js中
```js
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
Vue.use(mavonEditor)
```
- 使用mavonEditor编辑markdown
页面文件中
```html
<template>
    <div>
        <mavon-editor v-model="value"/>
    </div>
</template>

<script>
export default {
    data() {
        return {
            value: '',
            defaultData: "preview"
        };
    },
};
</script> 
```

 
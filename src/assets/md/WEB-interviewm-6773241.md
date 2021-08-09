# webpack篇
## 1、什么是webpack
webpack是一个静态模块处理器，当它处理应用程序时，它会递归地构建一个关系依赖图，其中包含应用程序需要的每个模块，然后把所有这些模块打包成一个或多个包。
## 2、 使用webpack的打包过程
- 初始化：启动构建，读取和合并参数，加载plugin，实例化complier
- 编译：从Entry出发，针对每个Module串行调用对应的loader去翻译文件内容，再找到该Module依赖的Module，递归地进行编译处理
- 输出：对编译后的Module组合成Chunk，把Chunk转换成文件，输出到文件系统 


## 3、常用的loader
- file-loader：把文件输出到一个文件夹中，在代码中通过相对 URL 去引用输出的文件
- source-map-loader：加载额外的 Source Map 文件，以方便断点调试
- image-loader：加载并且压缩图片文件
- babel-loader：把 ES6 转换成 ES5
- css-loader：加载 CSS，支持模块化、压缩、文件导入等特性
- eslint-loader：通过 ESLint 检查 JavaScript 代码
## 4、常用的plugin
-  `npm i -D html-webpack-plugin`
- 处理vue文件 `VueLoaderPlugin` - `npm i vue-loader vu-template-compile -D`
- define-plugin：定义环境变量
- commons-chunk-plugin：提取公共代码
- uglifyjs-webpack-plugin：通过UglifyES压缩ES6代码 


## 5、 loader和plugin的区别
- 同：两者都是为了扩展webpack的功能。
- 异：
  - loader它只专注于转化文件（transform）这一个领域，完成压缩，打包，语言翻译; 而plugin不仅只局限在打包，资源的加载上，还可以打包优化和压缩，重新定义环境变量等
  - loader运行在打包文件之前（loader为在模块加载时的预处理文件）；plugins在整个编译周期都起作用
  - 一个loader的职责是单一的，只需要完成一种转换。一个loader其实就是一个Node.js模块。当需要调用多个loader去转换一个文件时，每个loader会链式的顺序执行
  - 在webpack运行的生命周期中会广播出许多事件，plugin会监听这些事件，在合适的时机通过webpack提供的API改变输出结果

## 6、webpack ，gulp和grunt
grunt和gulp是基于任务和流（Task、Stream），找到一个（或一类）文件，对其做一系列链式操作，更新流上的数据， 整条链式操作构成了一个任务，多个任务就构成了整个web的构建流程。
从构建思路上来说， gulp和grunt需要开发者将整个前端构建过程拆分成多个Task，并合理控制所有Task的调用关系； webpack需要开发者找到入口，并需要清楚对于不同的资源应该使用什么Loader做何种解析和加工

 
## 核心概念
### entry（入口）
告诉webpack要使用哪些模块，作为内部依赖图的开始

### output（出口）
告诉webpack在哪里输出它所构建的bundles，以及如何命名这些文件

### loader
处理非JS文件，把文件转换成webpack能处理的模块

loader 有两个属性：
- test 属性，用于标识出应该被对应的 
- loader 进行转换的某个或某些文件。
### plugin 从打包优化和压缩，一直到重新定义环境中的变量。插件接口功能极其强大，可以用来处理各种各样的任务。
### Module：
模块，在 Webpack 里一切皆模块，一个模块对应着一个文件。Webpack 会从配置的 Entry 开始递归找出所有依赖的模块。

### Chunk 代码块，一个 Chunk 由多个模块组合而成，用于代码合并与分割。

```js
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');  //引入plugin
 
module.exports = {
  // JavaScript 执行入口文件
  entry: './main.js',
  output: {
    // 把所有依赖的模块合并输出到一个 bundle.js 文件
    filename: 'bundle.js',
    // 输出文件都放到 dist 目录下
    path: path.resolve(__dirname, './dist'),
  },
  module: {
    rules: [
      {
        // 用正则去匹配要用该 loader 转换的 CSS 文件
        test: /\.css$/,
        use: [
            {loader: MiniCssExtractPlugin.loader},
            'css-loader',
        ],
      }
    ]
  },
  plugins: [
      new MiniCssExtractPlugin({
          filename: `[name]_[contenthash:8].css`,
          chunkFilename: '[id].css',
      })
  ]
};

```

## webpack打包优化
### 1、路由懒加载
```js
{
  path:'tool',
  name:'tool',
  component:resolve=>require(['../views/tool/tool.vue'], resolve)
}
或者

const showImage = () => import('@/components/common/showImage');
```
### 2、启用gzip压缩和关闭sourcemap
```js
productionSourceMap:false, // 不生成map文件，减少打包后的问及大小
productionZip: true
```
### 3、生产环境去掉console代码，减少代码体积，使用uglifyjs压缩代码
```js
plugins: [
    new UglifyJsPlugin({
        uglifyOptions: {
          compress: {
            warnings:false,
            drop_console:true, //去掉线上console
            pure_funcs:['console.log']
          }
        },
        sourceMap: config.build.productionSourceMap,
        parallel:true
    })
]
```
### 4、图片优化
- 尽量减少图片的使用
- 使用css3来代替图片效果
- 小图片通过一定的工具合成雪碧图或者转成base64。
### 5、引用的库尽量按需加载。
- 像一般的ui库element，vant等库都提供来按需加载的方式，避免全部引入，加大项目体积。
- 以**cdn方式**载入需要的库，也可以减少打包后的体积。

### 6、抽离公共代码块 splitChunkPlugin

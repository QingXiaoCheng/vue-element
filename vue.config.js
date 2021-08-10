const path = require('path') 
module.exports = {
  publicPath: '/',
  outputDir: 'dist',
  assetsDir: "",  // 放置生成的静态资源
  indexPath: "index.html",
  lintOnSave: false,
  runtimeCompiler: false,
  devServer: {
    host: '0.0.0.0', // 设置为0.0.0.0则所以地址都能访问
    port: 8081,
    open: true ,   // 设置自动打开浏览器
    proxy: {  // 反向代理
      '/api': {  // 代理api
        target: 'http://localhost:8081/', // 服务器api地址
        changeOrigin: true,  // 是否跨域
        ws: true,// proxy websockets
        pathRewrite: {
          '^/api': '/mock'  // 重写路径
        }
      }
    } 
  },
  css:{
    loaderOptions: {
      sass: {
        prependData: `
        @import "@/assets/css/common.scss";
        `
      },
      less:{}
    },
    extract: false // 是否使用css分离插件 ExtractTextPlugin
  },
  configureWebpack: {
    module: {
      rules: [
        {
          test: /\.md$/,
          use: ["text-loader"]
        }
      ]
    }
  }
}
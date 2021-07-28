const path = require('path')

module.exports = {
  publicPath: '/',
  outputDir: 'dist',
  assetsDir: "",
  indexPath: "index.html",
  lintOnSave: false,
  runtimeCompiler: false,
  devServer: {
    host: '0.0.0.0', // 设置为0.0.0.0则所以地址都能访问
    port: 8081,
    open: true    // 设置自动打开浏览器
  },
  css:{
    loaderOptions: {
      sass: {
        prependData: `
        @import "@/assets/css/common.scss";
        `
      }
    }
  }
}
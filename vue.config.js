'use strict'
const path = require('path')
function resolve(dir) {
  return path.join(__dirname, dir)
}

const name =  '' // page title 默认页面标题

const port = 5175 // dev
// All configuration item explanations can be find in https://cli.vuejs.org/config/

module.exports = {
  publicPath: './',
  outputDir: 'dist',
  assetsDir: 'static',
  lintOnSave: process.env.NODE_ENV === 'development',
  productionSourceMap: false, // 打包成 web页面 使用，一般建议 false，不然会生成很多map文件
  // productionSourceMap: true, // 使用 electron 打包成 桌面应用 使用
  devServer: {
    disableHostCheck: true,
    port: port,
    open: false,
    overlay: {
      warnings: false,
      errors: true
    }
  },
  configureWebpack: {
    name: name,
    resolve: {
      alias: {
        '@': resolve('src')
      }
      // devtool: 'souce-map'
    }
  }
}

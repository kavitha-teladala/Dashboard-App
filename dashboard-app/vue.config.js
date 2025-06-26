const { defineConfig } = require('@vue/cli-service')
const webpack = require('webpack')

module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    devtool: 'source-map',
    plugins: [new webpack.ProgressPlugin()]
  },
  devServer: {
    port: 8080,
    open: true
  }
})
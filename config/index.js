'use strict';

const path = require('path');

module.exports = {
  dev: {
    assetsPublicPath: '/',
    port: 8888,
  },
  build: {
    assetsRoot: path.join(__dirname, '../dist'),  // 绝对路径
    assetsSubDir: 'vuessr',  // 相对路径
    assetsPublicPath: '/',
  }
}
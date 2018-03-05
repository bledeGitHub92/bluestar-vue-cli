'use strict';

const path = require('path');

module.exports = {
  dev: {},
  prod: {
    // Paths
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'vuessr',
    assetsPublicPath: '/public/',
  }
}
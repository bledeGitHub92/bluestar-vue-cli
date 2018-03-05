## 本地开发

## 指定生产环境打包路径（服务器静态资源目录）

## 代码分割（异步组件）

## 静态资源管理（全局CSS、JS库 etc.）

### 第三方的 css vs *.vue 文件中的 css

第三方 css 不会频繁改动，缓存时间长。而 *.vue 文件中的 css 改动频繁，缓存时间短。

所以把 第三方 css 和 *.vue 文件中的 css 分开打包。

### 打包第三方 css 代码（例如 normalize.css ect.）

在 webpack.client.js 中使用 import 'vendor.css' 加载。

通过 extract-text-webpact-plugin 提取为单独的样式文件，打上 contenthash 实现缓存。

### 打包 *.vue 文件中的 css

通过 vue-loader 配合 extract-text-webpack-plugin 提取成单独的样式文件，打上 contenthash 实现缓存。

## Vue 插件编写（全局组件、扩展 Vue 原型 etc.）

## 路由

## 数据获取

## 集成脚手架
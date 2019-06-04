# my-vue-project

## 启动并在浏览器打开项目
```
npm run dev
```

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


### 配置项目

##### 启动
```
vue ui
```
##### Vue 项目管理器
```
http://localhost:8000/project/select
```
##### 项目仪表盘
```
http://localhost:8000/dashboard
```

### 关于快速生成页面脚本说明

#### 安装插件

##### 安装 silly-datetime 插件
```
npm install silly-datetime --save-dev
```
用来获取系统时间。

##### 安装 chalk 插件
```
npm install chalk --save-dev
```
chalk 是一个颜色的插件，用来修改命令行显示颜色，更美观。

#### 使用插件
##### 配置
```
  "scripts": {
    "views": "node scripts/generateView/generateView.js views",
    "cpt": "node scripts/generateView/generateView.js cpt",
    "page": "node scripts/generateView/generateView.js page"
  }
```
在 package.json 中配置

##### 1、生成 vue 普通页面
```
npm run views file-name
```
会生成在 views 目录下

##### 2、生成 vue 组件
```
npm run cpt file-name
```
会生成在 components 目录下

##### 3、生成单个页面
```
npm run page views/components/tables/file-name.vue
```

默认会生成在 src 目录下的，需要拼写文件名后缀。

####以上方式都支持多层目录创建
```
npm run views aaa/bbb/ccc-ddd/file-name
```

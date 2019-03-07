# react-redux-antd-sample-kit

一个基于react+redux+antd基础框架

### 运行
*install 安装依赖*
```bash
npm install
```

*运行开发模式,注意查看输出的配置信息*
```bash
npm run dev
```
*运行编译*
```bash
npm run prod
```

### eslint规则
> 继承自 [Airbnb](https://github.com/airbnb/javascript) 规范
### 目录结构

```
.
├── build                    # webpack配置
├── config                   # 项目配置
├── dist                     # build目录
├── locales                  # 国际化配置文件
├── public                   # 静态资源
├── src                      # 程序源文件
│   ├── assets               # 内部静态资源
│   ├── common               # 存放router和menu配置等
│   ├── components           # 全局可复用组件
│   ├── containers           # 全局可复用组件容器
│   ├── layouts              # 布局
│   ├── models               # models
│   ├── pages                # 页面
│   │   └── Home             # 页面文件夹
│   │       ├── components   # 页面组件
│   │       └── index.js     # 页面入口文件
│   ├── store                # Redux指定块
│   │   ├── createStore.js   # 创建和使用redux store
│   │   └── reducers.js      # Reducer注册和注入
│   ├── styles               # 主样式
│   ├── templates            # 模板
│   ├── idnex.js             # 程序启动入口
└── tests                    # 测试
```

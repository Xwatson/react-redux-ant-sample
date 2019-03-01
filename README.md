#react-redux-antd-sample-kit

### 特性
* react+redux
* route嵌入异步模块加载器
* 动态注入Reducer
* react热更新
* eslint代码检测
* 国际化
* ...

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
npm run compile
```
*运行build*
```bash
npm run build
```

### eslint规则
继承自airbnb规范
### 结构

```
.
├── bin                      # 启动脚本
├── build                    # webpack配置
├── config                   # 项目配置
├── dist                     # build目录
├── locales                  # 国际化配置文件
├── public                   # 静态资源
├── src                      # 程序源文件
│   ├── assets               # 内部静态资源
│   ├── components           # 全局可复用组件
│   ├── containers           # 全局可复用组件容器
│   ├── layouts              # 主页布局
│   ├── localesEntry         # 国际化配置入口
│   ├── routes               # 主路由
│   │   ├── index.js         # 用store启动主程序路由
│   │   └── Items            # 分支
│   │       ├── index.js     # 路由定义和代码异步分割
│   │       ├── components   # 组件
│   │       ├── container    # 链接action和store
│   │       └── modules      # reducers/constants/actions的集合
│   ├── store                # Redux指定块
│   │   ├── createStore.js   # 创建和使用redux store
│   │   └── reducers.js      # Reducer注册和注入
│   ├── styles               # 样式
│   ├── main.js              # 程序启动入口
└── tests                    # 单元测试
```

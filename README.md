#react-ant-sample

### 参考react-redux-starter-kit框架，使用ant UI完成的基本功能架构

### 特性
* react+redux
* route嵌入异步模块加载器
* 动态注册Reducer
* react热更新
* eslint代码检测
* 国际化
* ...

### eslint规则
* 代码缩进为4格
* jsx缩进为4格
* jsx中属性使用双引号
* 函数声明请在‘()’后空格，如：function() {}
* 花括号'{}'内前后需要空格，如：{ test1, test2 }
* 三元表达式可换行但 ’ ? ‘和‘ : ’ 不可独自占行，正确格式如：true ? <br />
　　　　　　　　　　　　　　　　　　　　　　　　　　　　111 : <br />
　　　　　　　　　　　　　　　　　　　　　　　　　　　　222
* react中使用```props```必须声明其propTypes
* string必须用单引号
* 其他默认

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
*运行build(暂未加入行代码检测)*
```bash
npm run build
```

### 结构

```
.
├── bin                      # 启动脚本
├── build                    # webpack配置
├── config                   # 项目配置
├── dist                     # build目录
├── public                   # 静态资源
├── src                      # 程序源文件
│   ├── components           # 全局可复用组件
│   ├── containers           # 全局可复用组件容器
│   ├── layouts              # 主页布局
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
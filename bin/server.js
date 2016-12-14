/**
 * Created by xwatson on 2016/12/8.
 */
const express = require('express')
const debug = require('debug')('app:server')
const webpack = require('webpack')
const webpackConfig = require('../build/webpack.config')
const config = require('../config')
const port = config.server_port
const app = express()
const paths = config.utils_paths

// 默认索引为更目录下的index.html
app.use(require('connect-history-api-fallback')())

// ------------------------------------
// 热更新中间件
// ------------------------------------
if (config.env === 'development') {
    const compiler = webpack(webpackConfig)

    debug('启用 dev 和 HMR 中间件')
    app.use(require('webpack-dev-middleware')(compiler, {
        publicPath  : webpackConfig.output.publicPath,
        contentBase : paths.client(),
        hot         : true,
        quiet       : config.compiler_quiet,
        noInfo      : config.compiler_quiet,
        lazy        : false,
        stats       : config.compiler_stats
    }))
    app.use(require('webpack-hot-middleware')(compiler))
    // 指定静态资源
    app.use(express.static(paths.public()))
} else {
    debug('服务运行在非开发者模式下，启用默认访问dist.')
    app.use(express.static(paths.dist()))
}

app.listen(port)
debug(`服务已运行，访问 http://localhost:${port}.`)

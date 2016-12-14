/**
 * Created by xwatson on 2016/12/8.
 */
const fs = require('fs-extra')
const debug = require('debug')('app:bin:compile')
const webpackCompiler = require('../build/webpack.compiler')
const webpackConfig = require('../build/webpack.config')
const config = require('../config')

const paths = config.utils_paths

const compile = () => {
    debug('启动编译中...')
    return Promise.resolve()
        .then(() => webpackCompiler(webpackConfig))
        .then(stats => {
            if (stats.warnings.length && config.compiler_fail_on_warning) {
                throw new Error('配置设置为失败警告, config.compiler_fail_on_warning = false.')
            }
            debug('复制静态资源到 dist.')
            fs.copySync(paths.public(), paths.dist())
        })
        .then(() => {
            debug('编译成功.')
        })
        .catch((err) => {
            debug('编译遇到错误.', err)
            process.exit(1)
        })
}

compile()

/**
 * Created by xwatson on 2016/12/8.
 */
const ENV = require('./config.json')[process.env.NODE_ENV.toUpperCase()]
module.exports = {
    // 开发环境
    development : () => ({
        compiler_public_path : `${ENV.cdnHost}:${ENV.port}/`
    }),
    // 发布环境
    production : () => ({
        compiler_public_path     : ENV.cdnHost,
        compiler_fail_on_warning : false,
        compiler_hash_type       : 'chunkhash',
        compiler_devtool         : null,
        compiler_stats           : {
            chunks       : true,
            chunkModules : true,
            colors       : true
        }
    })
}

const path = require('path')
const debug = require('debug')('app:config')
// yargs用来读取命令行参数,如（hello --name=tom，可读取到name参数）
const argv = require('yargs').argv
const consts = require('./config.json')

debug('正在创建配置.')
const dev = consts[process.env.NODE_ENV.toUpperCase()]
const config = {
    env : process.env.NODE_ENV || 'development',

    // ----------------------------------
    // Project Structure
    // ----------------------------------
    path_base  : path.resolve(__dirname, '..'),
    dir_client : 'src',
    dir_dist   : 'dist',
    dir_public : 'public',
    dir_server : 'server',
    dir_test   : 'tests',

    // ----------------------------------
    // Server Configuration
    // ----------------------------------
    server_host : dev.cdnHost,
    server_port : dev.port || 3000,

    // ----------------------------------
    // Compiler Configuration
    // ----------------------------------
    compiler_babel : {
        cacheDirectory : true,
        plugins        : ['transform-runtime', ['import', { libraryName: 'antd', style: 'css' }]],
        presets        : ['es2015', 'react', 'stage-0']
    },
    compiler_devtool         : 'source-map',
    compiler_hash_type       : 'hash',
    compiler_fail_on_warning : false,
    compiler_quiet           : false,
    compiler_public_path     : '/',
    compiler_stats           : {
        chunks : false,
        chunkModules : false,
        colors : true
    },
    compiler_vendors : [
        'react',
        'react-redux',
        'react-router',
        'redux'
        // 'antd'
    ],
    coverage_reporters : [
        { type : 'text-summary' },
        { type : 'lcov', dir : 'coverage' }
    ],
    banner:consts.BANNER,
    template_dir:consts.TEMPLATES_DIR
}

// 此处添加的全局变量也必须添加到.eslintrc中
config.globals = {
    'process.env'  : {
        'NODE_ENV' : JSON.stringify(config.env)
    },
    'NODE_ENV'     : config.env,
    '__DEV__'      : config.env === 'development',
    '__PROD__'     : config.env === 'production',
    '__TEST__'     : config.env === 'test',
    '__COVERAGE__' : !argv.watch && config.env === 'test',
    '__BASENAME__' : JSON.stringify(process.env.BASENAME || '')
}

// ------------------------------------
// 验证Vendor依赖关系
// ------------------------------------
const pkg = require('../package.json')

config.compiler_vendors = config.compiler_vendors
    .filter((dep) => {
        if (pkg.dependencies[dep]) return true

        debug(`在package.json中找不到包 "${dep}" 作为npm依赖项`)
    })

// ------------------------------------
// Utilities
// ------------------------------------
function base() {
    const args = [config.path_base].concat([].slice.call(arguments))
    return path.resolve.apply(path, args)
}

config.utils_paths = {
    base   : base,
    client : base.bind(null, config.dir_client),
    dist   : base.bind(null, config.dir_dist),
    public   : base.bind(null, config.dir_public)
}

// ========================================================
// 环境配置
// ========================================================
debug(`NODE_ENV is ："${config.env}".`)
const environments = require('./environments')
const overrides = environments[config.env]
if (overrides) {
    debug('找到环境配置，正在应用配置。')
    Object.assign(config, overrides(config))
} else {
    debug('没有找到环境配置，将使用默认值。')
}

module.exports = config

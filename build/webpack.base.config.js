const webpack = require('webpack')
const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const HappyPack = require('happypack')
const os = require('os')
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length })

function resolve(relatedPath) {
  return path.join(__dirname, relatedPath)
}

module.exports = {
  output: {
    path: resolve('../dist'),
    publicPath: '/public/',
    chunkFilename: 'chunks/[name].[hash:4].js',
  },
  resolve: {
    extensions: ['.js']
  },
  module: {
    rules: [
      {
        test: /(.js|.jsx)$/,
        enforce: 'pre',
        exclude: /node_modules/,
        use: [{
          loader: "eslint-loader",
          // more options in the optional jshint object
          options: {  // ⬅ formally jshint property
            camelcase: true,
            emitErrors: false,
            failOnHint: false
          }
        }]
      },
      {
        test: /.js$/,
        loader: 'happypack/loader?id=happyBabel',
        exclude: /node_modules/
      },
      {
        test: /.jsx$/,
        exclude: /node_modules/,
        loader: 'happypack/loader?id=happyBabel'
      },
      {
        test: /\.(css|less)$/,
        include: [
          resolve('../src/styles'),
          resolve('../src/components'),
          resolve('../node_modules/antd'),
        ],
        loader: ExtractTextPlugin.extract({fallback: 'style-loader', use: 'happypack/loader?id=happyStyle'}),
        /* use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'less-loader']
        }), */
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        exclude: /node_modules/,
        include: [resolve('../src/assets/images')],
        loader: 'url-loader',
        options: {
          limit: 8192,
          name: 'img/[name].[hash:4].[ext]'
        }
      },
      {
        test: /\.(woff|eot|ttf|svg|gif)$/,
        loader: 'url-loader',
        options: {
          limit: 8192,
          name: 'font/[name].[hash:4].[ext]'
        }
      },
    ],
  },
  plugins: [
    new ExtractTextPlugin('style.[hash:4].css'),
    new HappyPack({
      //用id来标识 happypack处理那里类文件
      id: 'happyBabel',
      //如何处理  用法和loader 的配置一样
      loaders: [{
        loader: 'babel-loader?cacheDirectory=true',
      }],
      //代表共享进程池，即多个 HappyPack 实例都使用同一个共享进程池中的子进程去处理任务，以防止资源占用过多。
      threadPool: happyThreadPool,
      //允许 HappyPack 输出日志
      verbose: true,
    }),
    new HappyPack({
      id: 'happyStyle',
      loaders: [ 'css-loader?sourceMap=true', 'less-loader?sourceMap=true' ],
      threadPool: happyThreadPool,
      verbose: true,
    }),
    new webpack.optimize.CommonsChunkPlugin({
      async: 'async-common',
      minChunks: 3,
    }),
  ]
}

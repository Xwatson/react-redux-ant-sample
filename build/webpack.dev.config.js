/* eslint-disable */
const path = require('path')
const webpack = require('webpack')
const webpackMerge = require('webpack-merge')
const baseConfig = require('./webpack.base.config')
const HTMLPlugin = require('html-webpack-plugin')
const AutoDllPlugin = require('autodll-webpack-plugin')
const webConfig = require('../config/config.json')

const env = process.env.NODE_ENV

const isDev = env !== 'production' && env !== 'test'

const config = webpackMerge(baseConfig, {
  output: {
    filename: '[name].[hash].js',
  },
  plugins: [
    new webpack.DefinePlugin({
      '__DEV__': env === 'development',
      '__PROD__': env === 'production',
      '__QA__': env === 'qa',
      '__TEST__': env === 'test',
    }),
    new HTMLPlugin({
      favicon: path.join(__dirname, '../public/favicon.ico'),
      filename: 'index.html',
      inject: 'body',
      minify: {
        collapseWhitespace: true
      },
      template: path.join(__dirname, '../src/templates/index.html')
    }),
    new AutoDllPlugin({
      inject: true, // will inject the DLL bundle to index.html
      debug: true,
      filename: '[name].1.0.js',
      path: './dll',
      entry: {
        dll: [
          'react',
          'react-dom',
          'react-router',
          'react-router-dom',
          'redux',
          'react-redux',
          'redux-thunk',
          'qs',
          'axios',
          'react-loadable',
        ]
      },
    })
  ],
  devtool: 'source-map',
})

if (isDev) {
  config.entry = {
    app: [
      'react-hot-loader/patch',
      path.join(__dirname, '../src/index.js')
    ]
  }
  config.resolve.alias = {
    'react-dom': '@hot-loader/react-dom'
  }
  config.devServer = {
    host: webConfig[env].host,
    compress: true,
    port: webConfig[env].port,
    contentBase: path.join(__dirname, '../dist'),
    hot: true,
    inline: true,
    overlay: {
      errors: true
    },
    publicPath: '/public',
    historyApiFallback: {
      index: '/public'
    },
    proxy: {
      '/api': webConfig[env].apiHost
    }
  }
  config.plugins.push(new webpack.HotModuleReplacementPlugin())
}

module.exports = config
/* eslint-enable */

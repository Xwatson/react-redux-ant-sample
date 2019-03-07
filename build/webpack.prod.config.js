/* eslint-disable */
const path = require('path')
const webpack = require('webpack')
const webpackMerge = require('webpack-merge')
const baseConfig = require('./webpack.base.config')
const HTMLPlugin = require('html-webpack-plugin')
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const AutoDllPlugin = require('autodll-webpack-plugin')
const webConfig = require('../config/config.json')

const config = webpackMerge(baseConfig, {
  output: {
    filename: '[name].[hash].js',
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
      '__DEV__': false,
      '__PROD__': true,
    }),
    // 多核压缩
    new ParallelUglifyPlugin({
      cacheDir: '.cache/',
      uglifyJS:{
        output: {
          comments: false
        },
        compress: {
          warnings: false
        }
      }
    }),
    // 分析
    new BundleAnalyzerPlugin({ analyzerMode: 'static' }),
    new HTMLPlugin({
      hash: false,
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
      plugins: [
        new ParallelUglifyPlugin({
          cacheDir: '.cache/',
          uglifyJS:{
            output: {
              comments: false
            },
            compress: {
              warnings: false
            }
          }
        }),
      ],
    })
  ],
})

module.exports = config

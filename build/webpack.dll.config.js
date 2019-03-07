/* eslint-disable */
const webpack = require('webpack')
const path = require('path')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')

module.exports = {
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
    ],
  },
  output: {
    filename: '[name].js',
    path: path.join(__dirname, '../dll'),
    // 在前面加dll防止全局变量冲突
    library: 'dll.[name]',
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    // 使用插件 DllPlugin
    new webpack.DllPlugin({
      path: path.join(__dirname, '../dll', '[name]-manifest.json'),
      name: 'dll.[name]',
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
    }),
  ],
}

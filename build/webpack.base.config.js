const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

function resolve(relatedPath) {
  return path.join(__dirname, relatedPath)
}

module.exports = {
  output: {
    path: resolve('../dist'),
    publicPath: '/public/'
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
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /.jsx$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.(css|less)$/,
        include: [
          resolve('../src/styles'),
          resolve('../src/components'),
          resolve('../node_modules/antd'),
        ],
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'less-loader']
        }),
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
    new ExtractTextPlugin('style.[hash:4].css')
  ]
}

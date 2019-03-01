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
        /* loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'less-loader',
              options: {
                sourceMap: true
              }
            },
            {
              loader: 'css-loader',
              options: {
                url: false,
                minimize: true,
                sourceMap: true
              }
            },
          ],
        }) */
      }
    ],
  },
  plugins:[
    new ExtractTextPlugin('style.css')
  ]
}

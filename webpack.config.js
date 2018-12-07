var webpack = require('webpack')
var autoprefixer = require('autoprefixer')
var path = require('path')
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var cssnano = require('cssnano');
var path = require('path');

module.exports = {
  resolve: {
    extensions: ['.js', '.vue', '.css', '.jsx'],
    alias: {
      vue$: 'vue/dist/vue.common.js',
      src: __dirname + '/src'
    }
  },

  module: {
    rules: [
      { test: /\.vue$/, loader: 'vue-loader' },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        use: 'url-loader'
      },
      {
        test: /\.md/,
        use: 'vue-markdown-loader'
      },
      {
        test: /\.js$/,
        exclude: /node_modules|vue\/src|vue-router\/|vue-loader\/|vue-hot-reload-api\//,
        use: 'babel-loader'
      },
      {
        test: /.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
        use: [{
           loader: 'file-loader',
           options: {
             name: '[name].[ext]',
             outputPath: 'fonts/',
             publicPath: 'fonts/'
           }
         }]
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use:[
            'css-loader',
            {
              loader:'postcss-loader',
              options:{
                modules: true,
                localIdentName: '[sha1:hash:hex:4]',
                plugins:[
                  require('autoprefixer')(),
                  require('cssnano')()
                ]
              }
            },
            'sass-loader']
        })
      }
    ]
  },
  devtool: 'source-map',
  plugins:[
    new ExtractTextPlugin({
      filename:'index.min.css',
      allChunks:true
    })
  ]
}

if (process.env.NODE_ENV === 'production') {
  delete module.exports.devtool
  module.exports.plugins = [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  ]
}
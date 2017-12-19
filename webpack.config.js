// Dependencies
const path = require('path')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const ManifestPlugin = require('webpack-manifest-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const webpack = require('webpack')
const BrowserSyncPlugin = require('browser-sync-webpack-plugin')

// Get the env
const dev = process.env.NODE_ENV !== 'production'

// BEGIN CHANGE ME ==========

// Port of the webpack dev server
const WebpackDevServerPort = process.env.WEBPACKDEVSERVER_PORT || 3010

// Port of the BrowserSync server
const browserSyncPort = process.env.BROWSERSYNC_PORT || 3020

// END CHANGE ME ==========

// Output path
const outputPath =  path.resolve('./public')

// Source path
const srcPath = path.resolve('./frontend')

// Source/Sass path
const sassPath = path.join(srcPath, 'sass')

// Source/Javascript path
const jsPath = path.join(srcPath, 'js')

//  Source/Images path
const imagesPath = path.join(srcPath, 'images')

// Source/Fonts path
const fontsPath = path.join(srcPath, 'fonts')

// Output/CSS
const cssOutputPath = path.join(outputPath, 'css')

// Output/Images
const imagesOutputPath = path.join(outputPath, 'images')

// Output/Fonts
const fontsOutputPath = path.join(outputPath, 'fonts')

// Output/Javascript
const jsOutputPath = path.join(outputPath, 'js')

// Paths to clean before each build
const pathsToClean = [cssOutputPath, imagesOutputPath, fontsOutputPath, jsOutputPath]

let cssLoaders = [
  {
    loader: 'css-loader',
    options: {
      importLoaders: 1
    }
  },
  {
    loader: 'postcss-loader'
  }
]

let scssLoaders = [...cssLoaders, 'sass-loader']
let sassLoaders = [...cssLoaders, 'sass-loader?indentedSyntax']

let config = {

  entry: [
    path.join(jsPath, 'main.js'),
    path.join(sassPath, 'main.scss')
  ],

  watch: dev,

  output: {
    path: outputPath,
    filename: dev ?  'js/[name].js' : 'js/[name].[hash:8].js',
    publicPath: '/'
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      '@sass': sassPath,
      '@js': jsPath,
      '@images': imagesPath,
      '@fonts': fontsPath
    }
  },

  devtool: dev ? "cheap-module-eval-source-map" : "source-map",

  module: {

    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            'sass': dev ? 'vue-style-loader!css-loader!sass-loader?indentedSyntax' : ExtractTextPlugin.extract({
              fallback: "vue-style-loader",
              use: sassLoaders
            }),
            'scss': dev ? 'vue-style-loader!css-loader!sass-loader' : ExtractTextPlugin.extract({
              fallback: "vue-style-loader",
              use: scssLoaders
            })
          }
        }
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        enforce: 'pre',
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['eslint-loader']
      },
      {
        enforce: 'pre',
        test: /\.vue$/,
        exclude: /node_modules/,
        use: ['eslint-loader']
      },
      {
        test: /\.sass$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: sassLoaders,
          publicPath: '../'
        })
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: cssLoaders,
          publicPath: '../'
        })
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: scssLoaders,
          publicPath: '../'
        })
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'file-loader',
        options: {
          name: !dev ?  path.join('fonts', '[name]/[name].[hash:8].[ext]') : path.join('fonts', '[name]/[name].[ext]'),
        }
      },
      {
        test: /\.(jpe?g|png|gif|svg)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              name: !dev ? path.join('images', '[name].[hash:8].[ext]') :  path.join('images', '[name].[ext]'),
              limit: 8192
            }
          },
          {
            loader: 'img-loader',
            options: {
              enabled: !dev
            }
          }
        ]
      }
    ]
  },

  plugins: [

    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: dev ? '"development"' : '"production"',
      }
    }),

    new ExtractTextPlugin({
      filename: path.join('css', dev ? '[name].css' : '[name].[contenthash:8].css' ),
      disable: dev

    }),

    new ManifestPlugin({
      writeToFileEmit: true,
      map: function(file) {
        file.path = '/' + file.path
        return file
      }
    }),

    new CleanWebpackPlugin(pathsToClean, {
      root: path.resolve('./'),
      verbose: false,
      dry: false,
      minify: {}
    })
  ]
}

if (!dev) {
  config.plugins.push(new UglifyJSPlugin({
    sourceMap: true
  }))
}

if (dev) {
  config.entry.push(`webpack-dev-server/client?http://localhost:${WebpackDevServerPort}`)
  config.entry.push('webpack/hot/only-dev-server')
  config.plugins.push(new webpack.HotModuleReplacementPlugin())
  config.plugins.push(new BrowserSyncPlugin({
    host: 'localhost',
    logLevel: 'silent',
    port: browserSyncPort,
    proxy: `http://localhost:${WebpackDevServerPort}/`,
    open: false
  }, {
    reload: false
  }))
}

module.exports = config


const path = require('path')

const webpackDevServer = require('webpack-dev-server')
const webpack = require('webpack')
const webpackConfig = require('./webpack.config.js')

const port = process.env.NODE_PORT || 3020
const webpackDevServerPort = process.env.WEBPACKDEVSERVER_PORT || 3010
const browserSyncPort = process.env.BROWSERSYNC_PORT || 3000

const compiler = webpack(webpackConfig)

var devServer = new webpackDevServer(compiler, {
  hot: true,
  inline: true,
  publicPath: '/',
  contentBase: './public',
  stats: {
    colors: true, 
    modules: false,
  },
  overlay: {
    warnings: false,
    errors: true
  },
  proxy: {
    "/": {
      target: `http://localhost:${port}`,
      changeOrigin: true,
      secure: false
    }
  }
})

devServer.listen(webpackDevServerPort, null, () => {
  console.log(`Development server started on port ${webpackDevServerPort}`)
})

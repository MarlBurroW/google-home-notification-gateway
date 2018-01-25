const nodemon = require('nodemon')
const colors = require('colors')
const log = console.log

const webpackDevServer = require('webpack-dev-server')
const webpack = require('webpack')
const webpackConfig = require('./webpack.config.js')

const port = process.env.NODE_PORT || 3020
const webpackDevServerPort = process.env.WEBPACKDEVSERVER_PORT || 3010
const browserSyncPort = process.env.BROWSERSYNC_PORT || 3000

// Create the webpack compiler from the config
const compiler = webpack(webpackConfig)

// Create the WebpackDevServer instance
var devServer = new webpackDevServer(compiler, {
  hot: true,
  inline: true,
  publicPath: '/',
  contentBase: './public',
  stats: {
    colors: true,
    modules: false
  },
  overlay: {
    warnings: false,
    errors: true
  },
  proxy: {
    '/': {
      target: `http://localhost:${port}`,
      changeOrigin: true,
      secure: false
    }
  }
})

// Start the backend at  the end of the first compilation
let firstCompilation = true

compiler.plugin('after-emit', (compilation, callback) => {
  if (firstCompilation === true) {
    nodemon({
      script: 'start.js',
      ext: '*',
      watch: [
        'backend/**/*'
      ]
    })

    nodemon.on('start', function () {
      log(`${colors.green('Backend script started')}`)
    }).on('quit', function () {
      log(`${colors.green('Backend has quit')}`)
      process.exit()
    }).on('restart', function (files) {
      log(`${colors.green('Backend restarted due to file change: ')}`, files)
    })

    devServer.listen(webpackDevServerPort, null, () => {
      log(`Development server started on port ${webpackDevServerPort}`)
    })

    log(`[${colors.red('BrowserSync')}]--${colors.yellow('proxying')}-->[${colors.red('WebpackDevServer')}]--${colors.yellow('proxying')}-->[${colors.red('Backend')}]`)
    log('')
    log(`BrowserSync URL: http://localhost:${browserSyncPort} ${colors.green('<-- Use this one for development')}`)
    log(`WebpackDevServer URL: http://localhost:${webpackDevServerPort}`)
    log(`Backend URL: http://localhost:${port}`)
    log('')
    firstCompilation = false
  }

  callback()
})

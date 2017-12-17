const dev = process.env.NODE_ENV === "development"

let config = {
  plugins: {
    'autoprefixer': {
      browsers: ["last 2 versions", "safari >= 7", "ie >= 7"]
    }
  }
}

if(!dev) {
  config.plugins.cssnano = {}
}

module.exports = config
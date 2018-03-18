
module.exports = (req, res, next) => {
  req.mergedParams = Object.assign({}, req.params, req.body, req.query)
  next()
}

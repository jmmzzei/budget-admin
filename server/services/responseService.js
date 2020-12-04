module.exports = function returnResponse(type, res, value) {
  return res.json({status: type, data: value})
}

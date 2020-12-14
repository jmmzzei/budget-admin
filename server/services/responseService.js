module.exports = function returnResponse(
  type,
  res,
  value = 'Ha ocurrido un error.',
) {
  return res.json({ status: type, data: value })
}

require('dotenv').config()
const jwt = require('jsonwebtoken')

module.exports = function (req, res, next) {
  const token = req.header('x-auth-token')
  if (!token) res.status(401).json({ msg: 'Unauthorized user' })
  try {
    const decoded = jwt.verify(token, process.env.JWT_ACCESS_KEY)
    res.userID = decoded
    next()
  } catch (e) {
    res.status(400).json({ msg: 'Bad Request' })
  }
}

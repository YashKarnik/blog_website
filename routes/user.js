const Router = require('express').Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/user.model')
const authMiddleware = require('../middleware/auth.middleware')

Router.route('/').get((req, res) => {
  User.find()
    .then((users) => res.json(users))
    .catch((err) => res.json(`ERROR!!! ${err}`))
})

Router.route('/delete').delete(authMiddleware, (req, res) => {
  User.findByIdAndDelete(res.userID.id)
    .then((users) =>
      res.status(400).json({ msg: 'Deleted Successfully', users })
    )
    .catch((err) => res.json(`ERROR!!! ${err}`))
})

Router.route('/add').post((req, res) => {
  const { username, email, password } = req.body
  const hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10))
  const newUser = new User({ username, email, password: hashedPassword })
  newUser
    .save()
    .then(() => {
      res.status(200).json({ msg: 'Added Successfully', newUser })
    })
    .catch((err) =>
      res.status(400).json({ msg: 'Error in saving', error: err })
    )
})
module.exports = Router

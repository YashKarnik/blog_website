const Router = require('express').Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/user.model')
const Blog = require('../models/blog.model')
const authMiddleware = require('../middleware/auth.middleware')

Router.route('/').get(authMiddleware, (req, res) => {
  User.find()
    .then((users) => res.json(users))
    .catch((err) => res.json(`ERROR!!! ${err}`))
})
Router.route('/:id').get(authMiddleware, (req, res) => {
  User.find({ _id: req.params.id })
    .then((users) => res.json(users))
    .catch((err) => res.json(`ERROR!!! ${err}`))
})

Router.route('/change-visibility').post(authMiddleware, (req, res) => {
  const { flag } = req.body
  User.findByIdAndUpdate(res.userID.id, { visibility: flag })
    .then((users) => {
      res.status(200).json({ msg: !users.visibility })
      // console.log(users)
    })
    .catch((err) => {
      res.json({ err: err })
    })
})

Router.route('/delete').delete(authMiddleware, (req, res) => {
  User.findOneAndDelete({ _id: res.userID.id })
    .then((users) => {
      res.status(200).json({ msg: 'Deleted Successfully', users })
      // console.log(users)
    })
    .catch((err) => {
      res.json({ err: err })
      // console.log(err)
    })
  Blog.deleteMany({ userID: res.userID.id })
    .then((res) => console.log(res))
    .catch((err) => console.log(err))
})
Router.route('/update-username').post(authMiddleware, (req, res) => {
  const { username } = req.body
  User.findByIdAndUpdate(res.userID.id, { username })
    .then((users) => {
      res.status(200).json({ msg: 'Updated Successfully', users })
      // console.log(users)
    })
    .catch((err) => {
      res.json({ msg: 'ExistingUser', err: err })
    })
})
Router.route('/update-password').post(authMiddleware, (req, res) => {
  const { password } = req.body
  const hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10))
  User.findByIdAndUpdate(res.userID.id, { password: hashedPassword })
    .then((users) => {
      res.status(200).json({ msg: 'Updated Successfully', users })
      // console.log(users)
    })
    .catch((err) => {
      console.log(err)
    })
})
Router.route('/update-email').post(authMiddleware, (req, res) => {
  const { email } = req.body
  User.findByIdAndUpdate(res.userID.id, { email: email })
    .then((users) => {
      res.status(200).json({ msg: 'Updated Successfully', users })
      // console.log(users)
    })
    .catch((err) => {
      console.log(err)
    })
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

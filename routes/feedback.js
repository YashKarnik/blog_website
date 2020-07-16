require('dotenv').config()
const Router = require('express').Router()
const Feedback = require('../models/feedback.model')
const authMiddleware = require('../middleware/auth.middleware')
Router.route('/add').post((req, res) => {
  const newFbComment = new Feedback({ comment: req.body.comment })
  newFbComment
    .save()
    .then((res) => {
      res.status(200).json({ msg: 'Added Successfully' })
      console.log(res)
    })
    .catch((err) => {
      res.status(400).json({ msg: 'Error in saving' })
      console.log(err)
    })
})

module.exports = Router

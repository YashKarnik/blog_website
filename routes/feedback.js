require('dotenv').config()
const Router = require('express').Router()
const Feedback = require('../models/feedback.model')
const authMiddleware = require('../middleware/auth.middleware')
Router.route('/add').post((req, res) => {
  const newFbComment = new Feedback({ comment: req.body.comment })
  newFbComment
    .save()
    .then((resp) => {
      res.status(200).json({ msg: 'Added Successfully' })
    })
    .catch((err) => {
      res.status(400).json({ msg: 'Error in saving' })
    })
})

module.exports = Router

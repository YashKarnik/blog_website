require('dotenv').config()
const Router = require('express').Router()
const Blog = require('../models/blog.model')
const authMiddleware = require('../middleware/auth.middleware')

Router.route('/all-blogs').get(authMiddleware, (req, res) => {
  Blog.find({ userID: res.userID.id })
    .then((users) => {
      res.json(users)
      // console.log(users)
    })
    .catch((err) => {
      res.status(400).json(`ERROR!!! ${err}`)
      // console.log(err)
    })
})

Router.route('/add').post(authMiddleware, (req, res) => {
  const { title, content } = req.body
  const newBlog = new Blog({ title, content, userID: res.userID.id })
  newBlog
    .save()
    .then(() => res.status(200).json({ msg: 'blog Added', newBlog }))
    .catch((err) => {
      // console.log(err)
      res.json({ msg: 'Error in saving', error: err })
    })
})

Router.route('/delete/:id').delete(authMiddleware, (req, res) => {
  Blog.findOneAndDelete({ userID: res.userID.id, _id: req.params.id })
    .then((blogs) => {
      res.json({ msg: 'Deleted successfully', blogs })
    })
    .catch((err) => res.json({ err }))
})

Router.route('/update/:id').patch(authMiddleware, (req, res) => {
  const { title, content } = req.body
  Blog.findOneAndUpdate(
    { userID: res.userID.id, _id: req.params.id },
    {
      userID: res.userID.id,
      title,
      content,
    }
  )
    .then((user) => res.status(200).json({ msg: 'Updated Successfully', user }))
    .catch((err) => res.json({ msg: `ERROR!!! ${err}` }))
})
// Router.route('/:id').get(authMiddleware, (req, res) => {
//   Blog.findById({ ...req.params })
//     .then((users) => res.json(users))
//     .catch((err) => res.status(400).json(`ERROR!!! ${err}`))
// })
module.exports = Router

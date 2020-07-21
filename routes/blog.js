require('dotenv').config()
const Router = require('express').Router()
const Blog = require('../models/blog.model')
const Comment = require('../models/comment.model')
const authMiddleware = require('../middleware/auth.middleware')

Router.route('/all-blogs').get(authMiddleware, (req, res) => {
  Blog.find({ userID: res.userID.id })
    .then((users) => {
      res.json(users)
    })
    .catch((err) => {
      res.status(400).json(`ERROR!!! ${err}`)
      // console.log(err)
    })
})
Router.route('/all-blogs/:id').get(authMiddleware, (req, res) => {
  //refers to userid
  Blog.find({ userID: req.params.id })
    .then((users) => {
      res.send(users)
    })
    .catch((err) => {
      res.status(400).json(`ERROR!!! ${err}`)
      // console.log(err)
    })
})

Router.route('/like/:id/:action/:loggedInUserId').post(
  authMiddleware,
  (req, res) => {
    // id refers to id of the blog
    var likes = 0
    Blog.findById(req.params.id)
      .then((user) => {
        likes = user.likes
        console.log(user)
        if (req.params.action == 'true') {
          let arr = user.likedBy
          arr.push(req.params.loggedInUserId)
          Blog.findOneAndUpdate(
            { _id: user.id },
            { likes: user.likes + 1, likedBy: arr }
          ).then((resp) => res.json({ msg: 'Liked', resp }))
        } else {
          Blog.findOneAndUpdate(
            { _id: user.id },
            {
              likes: user.likes - 1,
              likedBy: user.likedBy.filter(
                (el) => el != req.params.loggedInUserId
              ),
            }
          ).then((resp) => res.json({ msg: 'uniked', resp }))
        }
      })
      .catch((err) => res.json({ msg: `ERROR!!! ${err}` }))
  }
)

Router.route('/post-comment/:id').post(authMiddleware, (req, res) => {
  // id refers to id of the blog
  const { content, PosterUsername } = req.body
  const PosterID = res.userID.id
  const BlogID = req.params.id
  const newComment = new Comment({ content, PosterID, BlogID, PosterUsername })
  newComment.save()
  Blog.findOne({ _id: req.params.id })
    .then((user) => {
      user.comments.push(newComment)
      const newcommentArr = user.comments
      Blog.findOneAndUpdate(
        { _id: user._id },
        { comments: newcommentArr }
      ).then((resp) => res.json({ msg: 'Comment Added', resp }))
    })
    .catch((err) => res.json({ msg: `ERROR!!! ${err}` }))
})

Router.route('/delete-comment/:BlogID/:commentID').delete(
  authMiddleware,
  (req, res) => {
    //Delete comment
    Comment.findByIdAndDelete(req.params.commentID)
      .then((user) => console.log(user))
      .catch((err) => console.log(err))
    Blog.findById(req.params.BlogID)
      .then((blog) => {
        var arr = blog.comments
        arr = arr.filter((elem) => elem._id != req.params.commentID)
        Blog.findOneAndUpdate(
          { _id: req.params.BlogID },
          { comments: arr }
        ).then((x) => res.json({ msg: 'deleted', x }))
      })
      .catch((err) => res.json({ err }))
  }
)

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

Router.route('/:id').get(authMiddleware, (req, res) => {
  Blog.find({ _id: req.params.id })
    .then((users) => res.send(users))
    .catch((err) => res.status(400).json({ err }))
})

// Router.route('/').get((req, res) => {
//   Blog.find()
//     .then((users) => res.json(users))
//     .catch((err) => res.status(400).json(`ERROR!!! ${err}`))
// })
module.exports = Router

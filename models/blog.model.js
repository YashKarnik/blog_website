const mongoose = require('mongoose')
const Comment = require('./comment.model')
const BlogSchema = new mongoose.Schema(
  {
    userID: { type: String, required: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
    likes: { type: Number, default: 0 },
    likedBy: { type: [String] },
    comments: { type: [Comment.Schema] },
  },
  {
    timestamps: true,
  }
)

module.exports = new mongoose.model('blog', BlogSchema)

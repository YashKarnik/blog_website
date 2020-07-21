const mongoose = require('mongoose')

const CommentSchema = new mongoose.Schema(
  {
    PosterID: { type: String, required: true },
    PosterUsername: { type: String, required: true },
    BlogID: { type: String, required: true },
    content: { type: String, required: true },
  },
  {
    timestamps: true,
  }
)

module.exports = new mongoose.model('comment', CommentSchema)

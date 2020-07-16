const mongoose = require('mongoose')

const BlogSchema = new mongoose.Schema(
  {
    userID: { type: String, required: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
  },
  {
    timestamps: true,
  }
)

module.exports = new mongoose.model('blog', BlogSchema)

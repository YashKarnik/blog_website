const mongoose = require('mongoose')

const FeedbackSchema = new mongoose.Schema(
  {
    comment: { type: String, required: true },
  },
  {
    timestamps: true,
  }
)

module.exports = new mongoose.model('feedback', FeedbackSchema)

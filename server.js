require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const path = require('path')
const cors = require('cors')
app.use(cors())
app.use(express.json())

mongoose.connect(String(process.env.MONGODB_URI), {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
})
mongoose.connection.once('open', () => console.log('Database connected'))
PORT = process.env.PORT || 5000

app.use('/user', require('./routes/user'))
app.use('/blog', require('./routes/blog'))
app.use('/auth', require('./routes/auth'))
app.use('/feedback', require('./routes/feedback'))

if (process.env.NODE_ENV === 'production') {
  app.set(express.static('client/build'))
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}
app.listen(PORT, () => console.log(`Server started on port ${PORT}`))

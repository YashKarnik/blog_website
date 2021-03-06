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
app.use('/recovery', require('./routes/recovery'))

app.use(express.static('client/build'))
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './client/build/index.html')) // relative path
})

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))

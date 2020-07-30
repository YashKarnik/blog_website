require('dotenv').config()
const Router = require('express').Router()
const User = require('../models/user.model')
const nodemailer = require('nodemailer')
const bcrypt = require('bcryptjs')

console.log(process.env.EMAIL, process.env.PASSWORD)
function mailTo(email, body = '') {
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: String(process.env.EMAIL),
      pass: String(process.env.PASSWORD),
    },
  })

  var mailOptions = {
    from: 'yash2000burner@gmail.com',
    to: email,
    subject: 'Password Recovery Email (Blog-website)',
    html: `<p>Hello ${body.username}.Your new temporary password is <b>1234asdf</b>.You may login with this password.However, please do remember to change it after logging in via the account settings tab.</p><p>~Yash Karnik</p>`,
  }

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error)
    } else {
      console.log('Email sent: ' + JSON.stringify(info))
    }
  })
  console.log('done')
}

Router.route('/forgot-password').post((req, res) => {
  const { email } = req.body
  const hashedPassword = bcrypt.hashSync('1234asdf', bcrypt.genSaltSync(10))
  User.findOneAndUpdate({ email }, { password: hashedPassword })
    .then((users) => {
      mailTo(email, users)
      res.json({ msg: 'Success!' })
    })
    .catch((err) => res.json(`ERROR!!! ${err}`))
})

module.exports = Router

const bcrypt = require('bcrypt')
const express = require('express')
const sessions = express.Router()
const User = require('../models/user.js')

sessions.get('/new', (req, res) => {
  res.render('sessions/new.ejs')
})

sessions.post('/', (req, res) => {
  // Step 1 Look for the username
  User.findOne({ username: req.body.username }, (err, foundUser) => {
    if (err) {
      console.log(err)
      res.send('oops the db had a problem')
    } else if (!foundUser) {
      res.send('<a  href="/">Sorry, no user found </a>')
    } else {
      if (bcrypt.compareSync(req.body.password, foundUser.password)) {
        req.session.currentUser = foundUser
        res.redirect('/')
      } else {
        res.send('<a href="/"> password does not match </a>')
      }
    }
  })
})

sessions.delete('/', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/')
  })
})

module.exports = sessions

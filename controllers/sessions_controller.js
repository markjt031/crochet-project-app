const bcrypt = require('bcrypt')
const express = require('express')
const sessions = express.Router()
const User = require('../models/user.js')

sessions.get('/new', (req, res) => {
  res.render('sessions/new.ejs', {err:""})
})

sessions.post('/', (req, res) => {
  // Step 1 Look for the username
  User.findOne({ username: req.body.username }, (err, foundUser) => {
    if (err) {
      console.log(err)
      res.render('sessions/new.ejs', {err: 'Database Error'})
    } 
    else if (!foundUser) {
      res.render('sessions/new.ejs', {err: "User not found. Please register"});
    } 
    else {
      if (bcrypt.compareSync(req.body.password, foundUser.password)) {
        req.session.currentUser = foundUser
        res.redirect('/')
      } 
      else {
        res.render('sessions/new.ejs', {err: "Invalid Password"})
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

const express = require('express')
const { signUp, login } = require('../controllers/user')

const route = express.Router()

route.post('/signup',signUp)
route.post('/login', login)

module.exports = route
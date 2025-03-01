const express = require('express')
const { postOrder } = require('./order.controller')
const { authmiddleware } = require('../../middleware/authMiddleware')

const router = express.Router()

router.post('/order', authmiddleware, postOrder)

module.exports = router
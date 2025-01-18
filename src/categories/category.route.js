const express = require('express')
const { postCategory } = require('./category.controller')

const router = express.Router()

router.post('/addcategory', postCategory)

module.exports = router
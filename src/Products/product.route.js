const express = require('express')
const { postProduct, listAllProduct } = require('./product.controller')
const upload = require('../../middleware/uploadMiddeware')

const router = express.Router()

router.post('/postproduct', upload.single('image'), postProduct)
router.get('/productlist', listAllProduct)

module.exports = router
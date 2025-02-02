const express = require('express')
const { postProduct, listAllProduct, productDetails, updateProduct, deleteProduct } = require('./product.controller')
const upload = require('../../middleware/uploadMiddeware')

const router = express.Router()

router.post('/postproduct', upload.single('image'), postProduct)
router.get('/productlist', listAllProduct)
router.get('/product/:id', productDetails)
router.put('/updateproduct/:id', upload.single('image'), updateProduct)
router.delete('/deleteproduct/:id', deleteProduct)
module.exports = router
const express=require('express')
const { postProduct } = require('./product.controller')

const router=express.Router()

router.post('/postproduct',postProduct)

module.exports=router
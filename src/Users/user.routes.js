const express=require('express')
const { postUser, signIn, verify } = require('./user.controller')

const router=express.Router()

router.post('/register',postUser)
router.post('/signin',signIn)
router.post('/verify',verify)

module.exports=router
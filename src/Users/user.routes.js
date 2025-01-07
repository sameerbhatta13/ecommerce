const express=require('express')
const { postUser, signIn } = require('./user.controller')

const router=express.Router()

router.post('/register',postUser)
router.post('/signin',signIn)

module.exports=router
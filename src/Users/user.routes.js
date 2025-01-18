const express=require('express')
const { postUser, signIn, verify, myData, getAllUser, adminLogIn } = require('./user.controller')
const AUTH = require('../../middleware/authMiddleware')

const router=express.Router()

router.post('/register',postUser)
router.post('/signin',signIn)
router.post('/verify',verify)
router.get('/mydata',AUTH.adminMiddleware,myData)
router.get('/alluser',AUTH.authmiddleware, AUTH.adminMiddleware, getAllUser)
router.post('/adminsignin',adminLogIn)

module.exports=router
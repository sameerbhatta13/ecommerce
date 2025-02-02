const express = require('express')
const { postUser, signIn, verify, myData, getAllUser, adminLogIn, logoutUser, RefreshToken } = require('./user.controller')
const AUTH = require('../../middleware/authMiddleware')

const router = express.Router()

router.post('/register', postUser)
router.post('/signin', signIn)
router.post('/verify', verify)
router.get('/mydata', AUTH.authmiddleware, myData)
router.post('/refresh', RefreshToken)
router.post('/logout/:id', AUTH.authmiddleware, logoutUser)
router.get('/alluser', AUTH.authmiddleware, AUTH.adminMiddleware, getAllUser)
router.post('/adminsignin', adminLogIn)

module.exports = router
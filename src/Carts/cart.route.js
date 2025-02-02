const express = require('express')
const { authmiddleware } = require('../../middleware/authMiddleware')
const { addToCart, getCartProuduct, qunantityIncrement, quantityDecrement, getCartByUser, removeOneCart } = require('./cart.controller')


const router = express.Router()

router.post('/cart/add', authmiddleware, addToCart)
router.get('/cart/item', getCartProuduct)
router.get('/cart', authmiddleware, getCartByUser)
router.put('/cart/increase/:productid', authmiddleware, qunantityIncrement)
router.put('/cart/decrease/:productid', authmiddleware, quantityDecrement)
router.put('/cart/remove/:productid', authmiddleware, removeOneCart)


module.exports = router
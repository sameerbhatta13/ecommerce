const epxress = require('express')
const { postOrder, orderList } = require('./order.controller')

const router = epxress.Router()

router.post('/postorder', postOrder)
router.get('/orderlist', orderList)

module.exports = router
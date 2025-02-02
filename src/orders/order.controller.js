const OrderItem = require('./orderItem.model')
const Order = require('./order.model')
const asyncHandler = require('../../utils/asyncHandler')
const ApiError = require('../../utils/apiError')



//post order

exports.postOrder = asyncHandler(async (req, res) => {
    const { orderItems } = req.body
    const orderItemsIds = Promise.all(orderItems.map(async orderitem => {
        let newOrderItem = new OrderItem({
            quantity: orderitem.quantity,
            product: orderitem.product
        })
        newOrderItem = await newOrderItem.save()
        return newOrderItem._id
    }))

    const orderItemIdsResolved = await orderItemsIds

    const totalAmount = await Promise.all(orderItemIdsResolved.map(async orderId => {
        const itemOrder = await OrderItem.findById(orderId).populate('product', 'price')
        const total = itemOrder.quantity * itemOrder.product.price
        return total
    }))
    const totalPrice = totalAmount.reduce((a, b) => a + b, 0)
    console.log('Final Total Price:', totalPrice);

    //save the data
    let order = new Order({
        orderItems: orderItemIdsResolved,
        address: req.body.address,
        phone: req.body.phone,
        totalPrice: totalPrice,
        user: req.body.user

    })

    order = await order.save()
    if (!order) throw new ApiError('something went wrong', 400)

    res.send(order)

})

//order list

exports.orderList = asyncHandler(async (req, res) => {
    const order = await Order.find()
        .populate('user', 'username')
        .sort({ createdAt: -1 }) //descending order
    if (!order) throw new ApiError('something went wront')
    res.send(order)
})
const ApiResponse = require("../../utils/apiResponse");
const asyncHandler = require("../../utils/asyncHandler");
const Order = require('./order.model')
const Product = require('../Products/product.model')
const ApiError = require('../../utils/apiError')


exports.postOrder = asyncHandler(async (req, res) => {
    const { _id } = req.user
    const { products, shippingAddress } = req.body
    let totalAmount = 0
    const order = await Order.findOne({ userId: _id })
    // console.log(order)
    if (!Array.isArray(products) || products.length === 0) {
        throw new ApiError("Products list is required and must be an array");
    }
    const productIds = products.map(p => p.productId)

    const existingOrder = await Order.find({ userId: _id, "products.productId": { $all: productIds } })

    if (existingOrder) {
        return res.status(400).json({ message: 'you already have a order ' })
    }


    const fetchedProducts = await Product.find({ _id: { $in: productIds } })

    if (fetchedProducts.length !== products.length) {
        throw new ApiError('some product does not match')
    }

    const finalProducts = products.map(p => {
        const product = fetchedProducts.find(fp => fp._id.toString() == p.productId)

        if (!product) {
            throw new ApiError(`product with id ${p.productId} not found`)
        }
        const itemTotal = product.price * p.quantity
        totalAmount += itemTotal

        return {
            productId: product._id,
            quantity: p.quantity,
            price: product.price
        };
    })

    let newOrder = new Order({
        userId: _id,
        products: finalProducts,
        totalAmount,
        shippingAddress,
        status: 'pending'
    })
    await newOrder.save()
    res.status(201).json({
        message: "Order placed successfully",
        order: newOrder
    });



})

//get the order items

exports.getOrderItems = asyncHandler(async (req, res) => {

})
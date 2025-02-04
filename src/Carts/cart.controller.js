const ApiError = require('../../utils/apiError')
const ApiResponse = require('../../utils/apiResponse')
const asyncHandler = require('../../utils/asyncHandler')
const Cart = require('./cart.model')
const Product = require('../Products/product.model')

exports.addToCart = asyncHandler(async (req, res) => {
    const { productId, quantity } = req.body
    const { _id } = req.user



    const cart = await Cart.findOne({ userId: _id })

    if (!quantity || !quantity > 0) {
        throw new ApiError('qunatity must be a number ', 400)
    }

    if (!cart) {
        let newcart = new Cart({
            userId: _id,
            products: [{ productId, quantity }]
        })
        const cartData = await newcart.save()
        console.log(cartData)
        res.status(200).json(new ApiResponse('product is added to the cart', cartData))
    }

    const existingProduct = cart.products.find((p) => p.productId.toString() === productId)

    if (existingProduct) {
        existingProduct.quantity += quantity
    }
    else {
        cart.products.push({ productId, quantity })
    }
    await cart.save()
    res.status(200).json(new ApiResponse('product is updated in the cart', 400))



})

//to get all cart product

exports.getCartProuduct = asyncHandler(async (req, res) => {
    const cartItems = await Cart.find().populate({
        path: 'products.productId',
        select: ' image title price'

    })
    if (!cartItems || cartItems.length == 0) {
        throw new ApiError('your cart is empty', 400)
    }

    const formatedCart = cartItems.map((cart) => {
        let grandTotal = 0;
        const updateProduct = cart.products.map((item) => {
            if (!item.productId)
                return null

            const totalPrice = item.quantity * item.productId.price
            grandTotal += totalPrice

            return {
                productId: item.productId._id,
                image: item.productId.image,
                title: item.productId.title,
                unitPrice: item.productId.price,
                quantity: item.quantity,
                totalPrice
            }
        })
        return {
            _id: cart._id,
            products: updateProduct,
            grandTotal
        }
    })
    res.send(formatedCart)
})

//get the product on the basis of user

exports.getCartByUser = asyncHandler(async (req, res) => {
    const { _id } = req.user
    try {
        const cart = await Cart.find({ userId: _id }).populate('products.productId', 'title price image countInStock')
        if (!cart) {
            throw new ApiError('cart not found for specific user', 400)
        }
        res.json(cart)
    } catch (error) {
        res.status(500).json({ message: 'server error', error })

    }
})


//for increase the product

exports.qunantityIncrement = asyncHandler(async (req, res) => {
    const { _id } = req.user
    console.log(req.params.productid)
    const productid = req.params.productid

    const product = await Product.findById(productid)
    // const { productId } = req.body
    const user = await Cart.findOne({ userId: _id })
    const checkProduct = user.products.find((item, index) => item.productId == productid)
    if (!checkProduct) {
        throw new ApiError('Product Not found.', 404)
    }
    // // this is the first way

    // checkProduct.quantity += 1
    // user.save()

    // //this is the second way

    if (checkProduct.quantity >= product.countInStock) {
        throw new ApiError('stock limit is reached ')
    }
    const data = await Cart.findOneAndUpdate({ 'products.productId': productid }, {
        $inc: { 'products.$.quantity': 1 }
    }, {
        new: true
    })

    res.json(data)


})

//for decrease product quantity
exports.quantityDecrement = asyncHandler(async (req, res) => {
    const { _id } = req.user
    const user = await Cart.findOne({ userId: _id })
    const checkProduct = user.products.find((item, index) => item.productId == req.params.productid)
    if (!checkProduct) {
        throw new ApiError('product not found', 404)
    }
    if (checkProduct.quantity <= 1) {
        throw new ApiError('qantity cannot decrease further', 400)

    }

    const data = await Cart.findOneAndUpdate(
        { 'products.productId': req.params.productid },
        {
            $inc: { 'products.$.quantity': -1 }
        }, { new: true }
    )
    res.json(data)
})


//remove the specific cart item

exports.removeOneCart = asyncHandler(async (req, res) => {
    const { _id } = req.user

    const user = await Cart.findOne({ userId: _id })
    const checkProduct = user.products.find((p) => p.productId = req.params.productid)

    if (!checkProduct) {
        throw new ApiError('product is not available')
    }
    const cart = await Cart.findOneAndUpdate(
        { 'products.productId': req.params.productid },
        {
            $pull: { products: { productId: req.params.productid } }
        },
        { new: true }
    )
    res.json(cart)

})


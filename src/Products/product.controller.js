const ApiError = require('../../utils/apiError')
const ApiResponse = require('../../utils/apiResponse')
const asyncHandler = require('../../utils/asyncHandler')
const Product = require('./product.model')

exports.postProduct = asyncHandler(async (req, res) => {
    // for single image
    if (!req.file) {
        throw new ApiError('product images is required')
    }


    //for multiple image
    // let imagearray = []
    // req.files.map((item) => {
    //     imagearray.push(item.filename)
    // })

    let { title, price, description, countInStock, category } = req.body
    // console.log(imagearray)
    // if (!Array.isArray(req.files) || req.files.length == 0) throw new ApiError("product image is required")

    let product = new Product({
        price,
        title,
        description,
        countInStock,
        category,
        image: req.file.filename
    })

    await product.save()
    res.status(200).json(new ApiResponse('product details saved'))

})

exports.listAllProduct = asyncHandler(async (req, res) => {
    const list = await Product.find()

    if (!list) throw new ApiError('no product list found', 400)
    res.status(200).json(new ApiResponse('here is the detail list', list))

})
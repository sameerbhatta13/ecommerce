const ApiError = require('../../utils/apiError')
const ApiResponse = require('../../utils/apiResponse')
const asyncHandler = require('../../utils/asyncHandler')
const Product = require('./product.model')
const { Category, SubCategory } = require('../categories/category.model')

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

    const { title, price, description, countInStock, category } = req.body
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

//to get all the product
exports.listAllProduct = asyncHandler(async (req, res) => {
    const list = await Product.find().populate('category')

    if (!list) throw new ApiError('no product list found', 400)
    res.status(200).json(new ApiResponse('here is the detail list', list))

})

//to get particular product details

exports.productDetails = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id).populate('category', 'title')
    if (!product) throw new ApiError('product does not found', 404)
    res.status(200).send(product)
})

//update the product

exports.updateProduct = asyncHandler(async (req, res) => {

    if (req.file) {
        const file = req.file.filename
        const data = await Product.findByIdAndUpdate(req.params.id, {
            ...req.body, image: file
        }, {
            new: true
        }).populate('category')
        res.status(200).json(new ApiResponse('Product Updated Successfully.', data))
    }
    else {
        const data = await Product.findByIdAndUpdate(req.params.id, {
            ...req.body
        },
            {
                new: true
            }).populate('category')
        res.status(200).json(new ApiResponse('Product Updated Successfully.', data))
    }
    // let categoryId;
    // if (req.body.category) {
    //     const category = Category.findOne({ title: req.body.category })
    //     if (!category) throw new ApiError('title not found')
    //     categoryId = category._id
    // }
    // if (req.file) {
    //     const updateData = await Product.findByIdAndUpdate(req.params.id, {
    //         title: req.body.title,
    //         price: req.body.price,
    //         description: req.body.description,
    //         countInStock: req.body.countInStock,
    //         category: categoryId || undefined,
    //         image: req.file.filename
    //     }, { new: true })
    //     if (!updateData) throw new ApiError('something went wrong', 400)
    //     res.status(200).json(new ApiResponse('product is updated', updateData))
    // }
    // else {
    //     const updateData = await Product.findByIdAndUpdate(req.params.id, {
    //         title: req.body.title,
    //         price: req.body.price,
    //         description: req.body.description,
    //         countInStock: req.body.countInStock,
    //         category: categoryId || undefined,

    //     }, { new: true })
    //     if (!updateData) throw new ApiError('something went wrong', 400)
    //     res.status(200).json(new ApiResponse('product is updated', updateData))
    // }

})

exports.deleteProduct = asyncHandler(async (req, res) => {
    const product = await Product.findByIdAndDelete(req.params.id)
    if (product)
        res.status(200).json(new ApiResponse('product is deleted'))
    else
        throw new ApiError('something went wrong',)
})
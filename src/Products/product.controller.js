const ApiError = require('../../utils/apiError')
const asyncHandler = require('../../utils/asyncHandler')
const Product=require('./product.model')

exports.postProduct=asyncHandler(async(req,res)=>{
    let {product_name,product_price,product_image}=req.body

    if(!req.file) throw new ApiError("product image is required")

        let product=new Product({
            product_name,
            product_price,
            product_image
        })

        await res.send(product)

})
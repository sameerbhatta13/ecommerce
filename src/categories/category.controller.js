const ApiError = require('../../utils/apiError');
const ApiResponse = require('../../utils/apiResponse');
const asyncHandler = require('../../utils/asyncHandler')
const Category = require('./category.model')



exports.postCategory = asyncHandler(async (req, res) => {
    const { name } = req.body;

    let category = new Category({
        name
    })

    const existingCategory = await Category.findOne({ name: category.name })
    if (existingCategory == null) {
        await category.save()
        res.status(200).json(new ApiResponse('successfully added category', category))
    }
    else {
        throw new ApiError('category already exists')
    }

})
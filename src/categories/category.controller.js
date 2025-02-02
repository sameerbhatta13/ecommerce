const ApiError = require('../../utils/apiError');
const ApiResponse = require('../../utils/apiResponse');
const asyncHandler = require('../../utils/asyncHandler')
const { Category, SubCategory } = require('./category.model')



exports.postCategory = asyncHandler(async (req, res) => {
    const { title } = req.body;

    let category = new Category({
        title
    })

    const existingCategory = await Category.findOne({ title: category.title })
    if (existingCategory == null) {
        await category.save()
        res.status(200).json(new ApiResponse('successfully added category', category))
        console.log(category)
    }
    else {
        throw new ApiError('category already exists')
    }

})

exports.getCategory = asyncHandler(async (req, res) => {
    const category = await Category.find()
    if (!category) throw new ApiError('category not found')
    res.send(category)
}
)

//for sub category

exports.postSubCategory = asyncHandler(async (req, res) => {
    const { category, title } = req.body

    let subCategory = new SubCategory({
        category,
        title
    })
    const existingSubCategory = await SubCategory.findOne({ title: subCategory.title })
    if (existingSubCategory == null) {
        await subCategory.save()
        res.status(200).json(new ApiResponse('subcategory added', subCategory))
    }
    else {
        throw new ApiError('subcategory already exits')
    }

})


//to get subcategory

exports.getSubCategory = asyncHandler(async (req, res) => {
    if (req.query.category) {
        const data = await SubCategory.find({ category: req.query.category })
        if (!data) throw new ApiError('Category not found');
        res.send(data)
    }
    else {

        const subcategory = await SubCategory.find()
        if (!subcategory) throw new ApiError('subcategory does not exists')
        res.send(subcategory)
    }
})
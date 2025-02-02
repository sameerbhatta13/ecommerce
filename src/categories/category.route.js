const express = require('express')
const { postCategory, getCategory, postSubCategory, getSubCategory } = require('./category.controller')

const router = express.Router()

router.post('/addcategory', postCategory)
router.get('/category', getCategory)


//for sub category
router.post('/subcategory', postSubCategory)
router.get('/subcategory', getSubCategory)

// router.route('/category').get(getCategory).post(postCategory)


module.exports = router
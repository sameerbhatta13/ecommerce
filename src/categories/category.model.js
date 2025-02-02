const mongoose = require('mongoose')

const { ObjectId } = mongoose.Schema
const categorySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    }
}, { timestamps: true })

const Category = mongoose.model('Category', categorySchema)


const subCategorySchema = new mongoose.Schema({
    category: {
        type: ObjectId,
        ref: 'Category',
        required: true
    },
    title: {
        type: String,
        required: true
    }

}, { timestamps: true })

const SubCategory = mongoose.model('SubCategory', subCategorySchema)

module.exports = {
    Category,
    SubCategory
}
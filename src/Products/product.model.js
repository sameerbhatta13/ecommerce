const mongoose = require('mongoose')
const { MAX } = require('uuid')
const { ObjectId } = mongoose.Schema

const productScheme = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,

    },
    description: {
        type: String,
    },
    image: {
        type: String
    },
    countInStock: {
        type: Number,

    },
    rating: {
        type: Number,
        default: 0,
        MAX: 5
    },
    category: {
        type: ObjectId,
        ref: 'Category',
        required: true
    }
}, { timestamps: true })

module.exports = mongoose.model('Product', productScheme)
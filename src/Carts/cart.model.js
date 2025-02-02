const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema

const cartSchema = new mongoose.Schema({
    userId: {
        type: ObjectId,
        ref: 'User',
        required: true
    },
    products: [
        {
            productId: { type: ObjectId, ref: 'Product', required: true },
            quantity: { type: Number, default: 1, required: true }
        }
    ]
})

module.exports = mongoose.model('Cart', cartSchema)
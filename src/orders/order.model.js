const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema

const orderSchema = new mongoose.Schema({
    userId: {
        type: ObjectId,
        ref: 'User',
        required: true
    },
    products: [
        {
            productId: { type: ObjectId, ref: 'Product', required: true },
            quantity: { type: Number, required: true, min: 1 },
            price: { type: Number, required: true }

        }

    ],
    totalAmount: {
        type: Number,
        required: true

    },
    shippingAddress: {
        fullName: { type: String, required: true },
        phone: { type: String, required: true },
        address: { type: String, required: true },
        city: { type: String, required: true },
        country: { type: String, required: true },
    },
    status: {
        type: String,
        enum: ['pending', 'delivered'],
        default: 'pending'
    }

}, { timestamps: true })

module.exports = mongoose.model('Order', orderSchema)
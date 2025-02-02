const mongoose = require('mongoose')

const { ObjectId } = mongoose.Schema

const orderSchema = new mongoose.Schema({
    orderItems: [{
        type: ObjectId,
        ref: 'OrderItem',
        required: true
    }],
    address: {
        type: String,
    },
    phone: {
        type: String,
    },
    status: {
        type: String,
        default: 'pending',
    },
    totalPrice: {
        type: Number,
        required: true

    },
    user: {
        type: ObjectId,
        ref: 'User',
        required: true
    }
}, { timestamps: true })

module.exports = mongoose.model('Order', orderSchema)
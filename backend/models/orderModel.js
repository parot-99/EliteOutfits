import mongoose from 'mongoose'

const orderSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    orderItems: [
        {
            name: {
                type: String,
                required: true
            },
            quanity: {
                type: Number,
                required: true
            },
            image: {
                type: String,
                required: true
            },
            size: {
                type: String,
                required: true,
                default: 'S'
            },
            price: {
                type: Number,
                required: true
            },
            product: {
                type: mongoose.Schema.Types.ObjectId,
                required: true,
                ref: 'Product'
            },
        }
    ],
    shippingAddress: {
        address: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        country: {
            type: String,
            required: true
        }
    },
    price: {
        type: Number,
        required: true,
        default: 0.0
    },
    isPaid: {
        type: Boolean,
        required: true,
        default: false
    },
    isDelivered: {
        type: Boolean,
        required: true,
        default: false
    }
}, {
    timestamps: true
})

const Order = mongoose.model('Order', orderSchema)

export default Order
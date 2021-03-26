import asyncHandler from 'express-async-handler'
import Order from './../models/orderModel.js'


const createOrder = asyncHandler(async (req, res) => {
    const {orderItems, shippingAddress, price} = req.body

    if (orderItems && orderItems.length === 0) {
        res.status(400)
        throw new Error('No ordered items')

    } else {
        const order = new Order({
            user: req.user._id,
            orderItems,
            shippingAddress,
            price

        })

        const createdOrder = await order.save()

        res.status(201)
        res.json(createdOrder)
    }
})

const getOrder = asyncHandler (async (req, res) => {
    const order = await Order.findById(req.params.id).populate(
        'user',
        'name email'
    )
    
    if (order) {
        if (order.user._id != req.user.id) {
            res.status(403)
            throw new Error('Unauthorized')
        }

        res.json(order)
    } else {
        res.status(404)
        throw new Error('Order Not Found')
    }
})

export {createOrder, getOrder}
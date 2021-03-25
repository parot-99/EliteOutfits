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
    }
})

export {createOrder}
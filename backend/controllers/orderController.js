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


const getOrders = asyncHandler (async (req, res) => {
    const orders = await Order.find({user: req.user._id})  

    res.json(orders)
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


const setIsPaid = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id) 

    if (order) {
        order.isPaid = true
        order.paidAt = Date.now()

        const updatedOrder = await order.save()

        res.status(201)
        res.json(updatedOrder)
    } else {
        res.status(404)
        throw new Error('Order not found')
    }

})


export {createOrder, getOrder, setIsPaid, getOrders}
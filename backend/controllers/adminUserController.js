import asyncHandler from 'express-async-handler'
import User from './../models/userModel.js'
import Order from './../models/orderModel.js'
import Product from './../models/productModel.js'


const getUsers = asyncHandler(async (req, res) => {
    const users = await User.find({})

    res.json(users)
})


const getUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id).select('-password')

    if (user) {
        res.json(user)
    } else {
        res.status(404)
        throw new Error('User not found')
    }
})


const deleteUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)

    if (user) {
        await user.remove()
        res.json({message: 'User Removed'})

    } else {
        res.status(404)
        throw new Error('User not found')
    }
})


const updateUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)
    
    if (user) {
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email
        user.isAdmin = req.body.isAdmin

        const userDuplicate = await User.findOne({email: req.body.email})

        if (userDuplicate && userDuplicate.email != req.body.email) {
            res.status(400)
            throw new Error('User Already Exists')
        }

        const updatedUser = await user.save()

        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
        })
        
    } else {
        res.status(404)
        throw new Error('User Not Found')
    }
})


const getOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find({}).populate('user', 'id name')

    res.json(orders)
})


const deleteProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)

    if (product) {
        await product.remove()
        res.json({message: 'Product Removed'})

    } else {
        res.status(404)
        throw new Error('Product not found')
    }
})


const createProduct = asyncHandler(async (req, res) => {
    const product = new Product({
        name: 'Sample name',
        price: 0,
        user: req.user._id,
        image: '/images/sample.jpg',
        category: 'Sample category'
    })

    const createdProduct = await product.save()

    res.status(201)
    res.json(createdProduct)
})


const updateProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)

    const {
        name,
        price,
        image,
        category,
        countInStock
    } = req.body

    if (product) {
        product.name = name || product.name
        product.price = price || product.price
        product.image = image ||  product.image
        product.category = category || product.category
        product.countInStock = countInStock || product.countInStock

        const updatedProduct = await product.save()

        res.status(200)
        res.json(updatedProduct)

    } else {
        res.status(400)
        throw new Error('Product not found') 
    }
})


const updateOrderToDelivered = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id)

    if (order) {
        order.isDelivered = true

        const updatedOrder = await order.save()

        res.status(200)
        res.json(updatedOrder)

    } else {
        res.status(400)
        throw new Error('Order not found') 
    }
})


const updateOrderToPaid = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id)

    if (order) {
        order.isPaid = true

        const updatedOrder = await order.save()

        res.status(200)
        res.json(updatedOrder)

    } else {
        res.status(400)
        throw new Error('Order not found') 
    }
})


const updatePriceConstant = asyncHandler(async (req, res) => {
    const {newPriceConstant} = req.body

    req.app.locals.PRICE_CONSTANT = newPriceConstant
    res.status(204).json({newConstant: newPriceConstant})
})


export {
    getUsers,
    getUser,
    deleteUser, 
    updateUser,
    getOrders,
    deleteProduct,
    createProduct,
    updateProduct,
    updateOrderToDelivered,
    updateOrderToPaid,
    updatePriceConstant
}
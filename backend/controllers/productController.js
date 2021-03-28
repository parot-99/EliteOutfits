import asyncHandler from 'express-async-handler'
import Product  from './../models/productModel.js'

const getProducts = asyncHandler (async (req, res) => {
    const products = await Product.find({})

    products.map((product) => (
        product.price *= req.app.locals.PRICE_CONSTANT
    ))

    products.map((product) => (
        product.price = Math.round(product.price)
    ))

    res.json(products)
})

const getProduct = asyncHandler (async (req, res) => {
    const product = await Product.findById(req.params.id)

    if(product) {
        product.price *= req.app.locals.PRICE_CONSTANT
        product.price = Math.round(product.price)
        res.json(product)
        
    } else {
        res.status(404)
        throw new Error('Product Not Found')
    }
})

export {getProducts, getProduct}
import asyncHandler from 'express-async-handler'
import Product  from './../models/productModel.js'
import useS3 from './../utils/useS3.js'


const getProducts = asyncHandler (async (req, res) => {
    const pageSize = 8
    const page = Number(req.query.pageNumber) || 1
    const category = req.query.category || 'All'
    const count = await Product.countDocuments({})
    let products

    if (category === 'All') {
        products = await Product.find({})
            .limit(pageSize)
            .skip(pageSize * (page - 1))
    } else {
        products = await Product.find({category})
            .limit(pageSize)
            .skip(pageSize * (page - 1))
    }
   

    products.map((product) => (
        product.price *= req.app.locals.PRICE_FACTOR
    ))

    products.map((product) => (
        product.price = Math.round(product.price)
    ))

    products.forEach((product, i) => {
        const s3 = useS3()
        const s3Params = {
            Bucket: process.env.AWS_STORAGE_BUCKET_NAME,
            Key: product.image,
            Expires: 60,
        }
    
        s3.getSignedUrl('getObject', s3Params, (error, data) => {
            if (error) {
                throw new Error('Failed to get image')
                
            } else {
                product.image = data

                if (i === products.length - 1) {
                    res.json({
                        products, page, pages: Math.ceil(count / pageSize)
                    })
                }
            }
        })    
    })
})


const getProduct = asyncHandler (async (req, res) => {
    const product = await Product.findById(req.params.id)

    if(product) {
        if ('isAdmin' in req.query) {
            res.status(200)
            res.json(product)
        } else {
            product.price *= req.app.locals.PRICE_FACTOR
            product.price = Math.round(product.price)

            const s3 = useS3()
            const s3Params = {
                Bucket: process.env.AWS_STORAGE_BUCKET_NAME,
                Key: product.image,
                Expires: 60,
            }
        
            s3.getSignedUrl('getObject', s3Params, (error, data) => {
                if (error) {
                    throw new Error('Failed to get image')
                    
                } else {
                    product.image = data

                    res.json(product)
                }
            })
        }  
    } else {
        res.status(404)
        throw new Error('Product Not Found')
    }
})


const createProductReview = asyncHandler (async (req, res) => {
    const {rating, comment} = req.body
    const product = await Product.findById(req.params.id)

    if (product) {
        const alreadyReviewed = product.reviews.find(
            r => r.user.toString() === req.user._id.toString()
        )

        if (alreadyReviewed) {
            res.status(400)
            throw new Error('Product already reviewed')
        }

        const review = {
            name: req.user.name,
            rating: Number(rating),
            comment,
            user: req.user._id
        }

        product.reviews.push(review)
        product.numReviews = product.reviews.length
        product.rating = product.reviews.reduce(
            (acc, item) => item.rating + acc,
            0
        ) / product.reviews.length

        await product.save()

        res.status(201)
        res.json({message: 'Review added'})

    } else {
        res.status(404)
        throw new Error('Product Not Found')
    }

})


const getTopProducts = asyncHandler (async (req, res) => {
    const products = await Product.find({}).sort({rating: -1}).limit(3)

    products.forEach((product, i) => {
        const s3 = useS3()
        const s3Params = {
            Bucket: process.env.AWS_STORAGE_BUCKET_NAME,
            Key: product.image,
            Expires: 60,
        }
    
        s3.getSignedUrl('getObject', s3Params, (error, data) => {
            if (error) {
                throw new Error('Failed to get image')
                
            } else {
                product.image = data

                if (i === products.length - 1) {
                    res.json(products)
                }
            }
        })    
    })
})


export {getProducts, getProduct, createProductReview, getTopProducts}
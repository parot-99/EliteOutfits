import express from 'express'
import * as productController from './../controllers/productController.js'
import {privateRoute} from './../middleware/authMiddleware.js'


const router = express.Router()

router.route('/').get(productController.getProducts)
router.route('/top').get(productController.getTopProducts)
router.route('/:id').get(productController.getProduct)
router.route('/:id/reviews').post(
    privateRoute,
    productController.createProductReview
)



export default router
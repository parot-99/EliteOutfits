import express from 'express'
import * as orderController from './../controllers/orderController.js'
import {privateRoute, adminRoute} from './../middleware/authMiddleware.js'


const router = express.Router()

router.route('/checkout').post(privateRoute, orderController.createOrder)
router.route('/').get(privateRoute, orderController.getOrders)
router.route('/:id').get(privateRoute, orderController.getOrder)
router.route('/:id/pay').put(
    privateRoute,
    adminRoute, 
    orderController.setIsPaid
)


export default router
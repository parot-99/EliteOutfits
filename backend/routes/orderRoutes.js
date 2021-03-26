import express from 'express'
import * as orderController from './../controllers/orderController.js'
import {privateRoute} from './../middleware/authMiddleware.js'


const router = express.Router()

router.route('/checkout').post(privateRoute, orderController.createOrder)
router.route('/:id').get(privateRoute, orderController.getOrder)


export default router
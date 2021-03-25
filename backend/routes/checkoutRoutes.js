import express from 'express'
import * as checkoutController from './../controllers/checkoutController.js'
import {privateRoute} from './../middleware/authMiddleware.js'


const router = express.Router()

router.route('/').post(privateRoute, checkoutController.createOrder)

export default router
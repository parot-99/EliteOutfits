import express from 'express'
import * as adminUserController from './../controllers/adminUserController.js'
import {privateRoute, adminRoute} from './../middleware/authMiddleware.js'


const router = express.Router()

router.route('/pricefactor').get(
    privateRoute,
    adminRoute,
    adminUserController.getPriceFactor
)

router.route('/pricefactor').put(
    privateRoute,
    adminRoute,
    adminUserController.updatePriceFactor
)

router.route('/users').get(
    privateRoute,
    adminRoute,
    adminUserController.getUsers
)

router.route('/users/:id').get(
    privateRoute,
    adminRoute,
    adminUserController.getUser
)

router.route('/users/:id').delete(
    privateRoute,
    adminRoute,
    adminUserController.deleteUser
)

router.route('/users/:id').put(
    privateRoute,
    adminRoute,
    adminUserController.updateUser
)

router.route('/orders').get(
    privateRoute,
    adminRoute,
    adminUserController.getOrders
)

router.route('/products/:id').delete(
    privateRoute,
    adminRoute,
    adminUserController.deleteProduct
)

router.route('/products').post(
    privateRoute,
    adminRoute,
    adminUserController.createProduct
)


router.route('/products/:id').put(
    privateRoute,
    adminRoute,
    adminUserController.updateProduct
)

router.route('/orders/:id').delete(
    privateRoute,
    adminRoute,
    adminUserController.deleteOrder
)

router.route('/orders/:id/pay').put(
    privateRoute,
    adminRoute,
    adminUserController.updateOrderToPaid
)

router.route('/orders/:id/deliver').put(
    privateRoute,
    adminRoute,
    adminUserController.updateOrderToDelivered
)


export default router
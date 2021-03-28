import express from 'express'
import * as adminUserController from './../controllers/adminUserController.js'
import {privateRoute, adminRoute} from './../middleware/authMiddleware.js'


const router = express.Router()

router.route('/pconstant').post(
    privateRoute,
    adminRoute,
    adminUserController.updatePriceConstant
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


export default router
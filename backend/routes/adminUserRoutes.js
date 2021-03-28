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


export default router
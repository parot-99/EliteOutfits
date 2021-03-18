import express from 'express'
import * as userControllers from './../controllers/userController.js'
import {privateRoute, adminRoute} from './../middleware/authMiddleware.js'

const router = express.Router()

router.route('/login').post(userControllers.authUser)
router.route('/register').post(userControllers.registerUser)
router.route('/profile').get(privateRoute, userControllers.getUserProfile)
router.route('/admin/pconstant').post(
    privateRoute,
    adminRoute,
    userControllers.updatePriceConstant
)

export default router
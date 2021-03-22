import express from 'express'
import * as userControllers from './../controllers/userController.js'
import {privateRoute, adminRoute} from './../middleware/authMiddleware.js'
import checkPassword from './../middleware/passwordMiddleware.js'

const router = express.Router()

router.route('/login').post(userControllers.authUser)
router.route('/profile').get(privateRoute, userControllers.getUser)
router.route('/register').post(checkPassword, userControllers.registerUser)
router.route('/update').put(
    privateRoute,
    checkPassword,
    userControllers.updateUser
)
router.route('/admin/pconstant').post(
    privateRoute,
    adminRoute,
    userControllers.updatePriceConstant
)

export default router
import express from 'express'
import * as userController from './../controllers/userController.js'
import {privateRoute} from './../middleware/authMiddleware.js'
import checkPassword from './../middleware/passwordMiddleware.js'


const router = express.Router()

router.route('/login').post(userController.authUser)
router.route('/profile').get(privateRoute, userController.getUser)
router.route('/register').post(checkPassword, userController.registerUser)
router.route('/update').put(
    privateRoute,
    checkPassword,
    userController.updateUser
)


export default router
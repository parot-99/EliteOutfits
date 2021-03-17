import asyncHandler from 'express-async-handler'
import jwt from 'jsonwebtoken'
import User from './../models/userModel.js'

const protect = asyncHandler (async(req, res, next) => {
    let token
    const headers = req.headers

    if (headers.authorization && headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1]

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET)  
            req.user = await User.findById(decoded.id).select('-password')

            next()
        } catch (error) {
            res.status(401)
            throw new Error('Not Authorized')
        }
    } 

    if (!token) {
        res.status(401)
        throw new Error('Not Authorized')
    }
})

export default protect
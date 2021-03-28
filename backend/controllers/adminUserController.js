import asyncHandler from 'express-async-handler'
import User from './../models/userModel.js'


const getUsers = asyncHandler(async (req, res) => {
    const users = await User.find({})

    res.json(users)
})


const getUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id).select('-password')

    if (user) {
        res.json(user)
    } else {
        res.status(404)
        throw new Error('User not found')
    }
})


const deleteUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)

    if (user) {
        await user.remove()
        res.json({message: 'User Removed'})

    } else {
        res.status(404)
        throw new Error('User not found')
    }
})


const updateUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)
    
    if (user) {
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email
        user.isAdmin = req.body.isAdmin

        const userDuplicate = await User.findOne({email: req.body.email})

        if (userDuplicate && userDuplicate.email != req.body.email) {
            res.status(400)
            throw new Error('User Already Exists')
        }

        const updatedUser = await user.save()

        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
        })
        
    } else {
        res.status(404)
        throw new Error('User Not Found')
    }
})


const updatePriceConstant = asyncHandler(async (req, res) => {
    const {newPriceConstant} = req.body

    req.app.locals.PRICE_CONSTANT = newPriceConstant
    res.status(204).json({newConstant: newPriceConstant})
})


export {getUsers, getUser, deleteUser, updateUser, updatePriceConstant}
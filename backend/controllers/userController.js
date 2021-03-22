import asyncHandler from 'express-async-handler'
import generateToken from './../utils/generateToken.js'
import User from './../models/userModel.js'

const authUser = asyncHandler(async (req, res) => {
    const {email, password} = req.body
    const user = await User.findOne({email: email})

    if(user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id)
        })
    } else {
        res.status(401)
        throw new Error('Invalid email or password')
    }
})

const getUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)

    if (user) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        })
    } else {
        res.status(404)
        throw new Error('User Not Found')
    }
})

const registerUser = asyncHandler(async (req, res) => {
    const {name, email, password, password2} = req.body
    const user = await User.findOne({email})

    if (user) {
        res.status(400)
        throw new Error('User Already Exists')
    }

    const newUser = await User.create({
        name,
        email,
        password
    })

    if (newUser) {
        res.status(201).json({
            _id: newUser._id,
            name: newUser.name,
            email: newUser.email,
            isAdmin: newUser.isAdmin,
            token: generateToken(newUser._id)
        })
    } else {
        res.status(400)
        throw new Error('Invalid User Data')
    }
})

const updateUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)

    if (user) {
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email

        if (req.body.password) {
            user.password = req.body.password
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

export {authUser, getUser, registerUser, updateUser, updatePriceConstant}
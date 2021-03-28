import asyncHandler from 'express-async-handler'
import User from './../models/userModel.js'


const getUsers = asyncHandler(async (req, res) => {
    const users = await User.find({})

    res.json(users)
})


const updatePriceConstant = asyncHandler(async (req, res) => {
    const {newPriceConstant} = req.body

    req.app.locals.PRICE_CONSTANT = newPriceConstant
    res.status(204).json({newConstant: newPriceConstant})
})


export {getUsers, updatePriceConstant}
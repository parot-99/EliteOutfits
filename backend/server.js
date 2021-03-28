import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
import connectDB from './config/database.js'
import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import OrderRoutes from './routes/orderRoutes.js'
import adminUserRoutes from './routes/adminUserRoutes.js'
import {notFound, errorHandler} from './middleware/errorMiddleware.js'

dotenv.config()
connectDB()

const app = express()

app.locals.PRICE_CONSTANT = 0.5

app.get('/', (req, res) => {
    res.send('API is running...')
})

app.use(express.json())
app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)
app.use('/api/orders', OrderRoutes)
app.use('/api/admin', adminUserRoutes)
app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(
    PORT, 
    console.log(
        `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.blue
    )
)

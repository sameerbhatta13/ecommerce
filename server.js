const express = require('express')
require('dotenv').config()
const bodyParser = require('body-parser')
const path = require('path')
const cors = require('cors')
const morgan = require('morgan')
var cookieParser = require('cookie-parser')

require('./Db/connection')
const userRoute = require('./src/Users/user.routes')
const productRoute = require('./src/Products/product.route')
const categoryRoute = require('./src/categories/category.route')
const orderRoute = require('./src/orders/order.routes')
const cartRoute = require('./src/Carts/cart.route')
const { notFound, erroMiddleware } = require('./middleware/errorMiddleware')


const app = express()
let port = process.env.PORT

// app.use('/public/uploads', express.static('public/uploads'))

//middleware
app.use(cors({
    origin: 'http://localhost:5173', // Frontend URL
    credentials: true,
}))
app.use(cookieParser())
// app.use(bodyParser.json())
app.use(express.json())
app.use(morgan('dev'))
app.use('/api/image', express.static('uploads'))

//routes middleware
app.use('/api', userRoute);
app.use('/api', productRoute)
app.use('/api', categoryRoute)
app.use('/api', orderRoute)
app.use('/api', cartRoute)

//error middleware
app.use(notFound)
app.use(erroMiddleware)


app.listen(port, () => {

    console.log(`server is connect at ${port}`)
})

const express = require('express')
require('dotenv').config()
const bodyParser = require('body-parser')
const path = require('path')
const cors = require('cors')

require('./Db/connection')
const userRoute = require('./src/Users/user.routes')
const productRoute = require('./src/Products/product.route')
const categoryRoute = require('./src/categories/category.route')
const { notFound, erroMiddleware } = require('./middleware/errorMiddleware')


const app = express()
let port = process.env.PORT

app.use('/public/uploads', express.static('public/uploads'))

//middleware
app.use(bodyParser.json())
app.use('/api/image', express.static('uploads'))
app.use(cors())

//routes middleware
app.use('/api', userRoute);
app.use('/api', productRoute)
app.use('/api', categoryRoute)

//error middleware
app.use(notFound)
app.use(erroMiddleware)


app.listen(port, () => {

    console.log(`server is connect at ${port}`)
})

const express=require('express')
require('dotenv').config()
const bodyParser=require('body-parser')

require('./Db/connection')
const userRoute=require('./src/Users/user.routes')
const { notFound, erroMiddleware } = require('./middleware/errorMiddleware')


const app=express()
let port =process.env.PORT

//middleware
app.use(bodyParser.json())

//routes middleware
app.use('/api',userRoute);

//error middleware
app.use(notFound)
app.use(erroMiddleware)


app.listen(port,()=>{

    console.log(`server is connect at ${port}`)
})

const express=require('express')
require('dotenv').config()
const bodyParser=require('body-parser')

require('./Db/connection')
const userRoute=require('./Users/user.routes')


const app=express()
let port =process.env.PORT

//middleware
app.use(bodyParser.json())

app.use('/api',userRoute);
app.listen(port,()=>{

    console.log(`server is connect at ${port}`)
})

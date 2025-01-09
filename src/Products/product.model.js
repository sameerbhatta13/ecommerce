const mongoose=require('mongoose')


const productScheme=new mongoose.Schema({
    product_name:{
        type:String,
        required:true
    },
    product_price:{
        type:Number,
        trim:true,
    },
    product_images:{
        type:String,
        required:true
    }
},{timestamps:true})

module.exports=mongoose.model('Product',productScheme)
const mongoose=require('mongoose')

const userShema=new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum: ['user','admin'],
        default: 'user',
        trim:true
    },
    password:{
        type:String,
        required:true
    },
    isvarified:{
        type:Boolean,
        default:false
    }
   
})

module.exports=mongoose.model('User',userShema)
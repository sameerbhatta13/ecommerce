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
    },
    otp:{
        type:String
    },
    otptime:{
        type:Date,
        default:()=>Date.now()+ 150000
    }
   
})

module.exports=mongoose.model('User',userShema)
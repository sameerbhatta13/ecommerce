const ApiError = require("../utils/apiError");
const asyncHandler = require("../utils/asyncHandler")
const jwt=require('jsonwebtoken')
const User=require('../src/Users/user.model')

const authmiddleware=asyncHandler (async(req,res,next)=>{
    try {
        const token=req.headears("authorization")?.replace("Bearer","")
        if(!token)
            throw new ApiError("token is not available",403);
        const {_id}=jwt.verify(token,process.env.TOKEN)
        const user=await User.findById(_id)

        if(!user) throw new ApiError('invalid token')
        req.user=user
    next()
        
        
    } catch (error) {
        throw new ApiError(error.message,400)
    }
})

module.exports=authmiddleware
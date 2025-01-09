const jwt=require('jsonwebtoken')

const jwtToken=(userId)=>{
    const token=jwt.sign({userId},process.env.TOKEN,{expiresIn:process.env.DAYS})
    return token
}

module.exports=jwtToken
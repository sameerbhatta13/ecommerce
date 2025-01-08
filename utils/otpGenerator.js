
const otpGenerator=()=>{
    const uuidv4 = require('uuid').v4

    const uniqueId=uuidv4()
    
    const otp=uniqueId.replace(/\D/g,'').slice(0,4)
    
    return newOTP=otp.padStart(4,'0')
}
module.exports=otpGenerator
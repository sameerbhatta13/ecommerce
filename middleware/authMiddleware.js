const ApiError = require("../utils/apiError");
const asyncHandler = require("../utils/asyncHandler")
const jwt = require('jsonwebtoken')
const User = require('../src/Users/user.model');
const ApiResponse = require("../utils/apiResponse");

const authmiddleware = asyncHandler(async (req, res, next) => {
    try {
        const token = req.cookies.accessToken || req.header("authorization")?.replace("Bearer ", "")
        // console.log(token)
        if (!token)
            throw new ApiError("token is not available", 403);
        const { userId } = jwt.verify(token, process.env.TOKEN)
        const user = await User.findById(userId)

        if (!user) throw new ApiError('invalid token')
        req.user = user
        next()
    } catch (error) {
        throw new ApiError(error.message, 400)
    }
})

const adminMiddleware = asyncHandler(async (req, res, next) => {

    const { _id } = req.user
    console.log(_id)
    const userRole = await User.findById(_id)
    console.log(userRole)
    if (userRole.role != 'admin') {
        throw new ApiError('unauthorized acess')
    }
    else {
        next()
    }

})
module.exports = { authmiddleware, adminMiddleware }



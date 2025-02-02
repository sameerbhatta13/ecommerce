const asyncHandler = require('../../utils/asyncHandler')
const User = require('./user.model')
const sendEmail = require('../../utils/verifyEmail')
const otpGenerator = require('../../utils/otpGenerator')
const ApiResponse = require('../../utils/apiResponse')
const ApiError = require('../../utils/apiError')
const jwtToken = require('../../utils/jwtTokenGenerator')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')


exports.postUser = asyncHandler(async (req, res) => {
    let { username, email, phone, role, password } = req.body

    let newOTP = otpGenerator()

    let user = new User({
        username,
        email,
        phone,
        role,
        password,
        otp: newOTP,
    })
    const existingUser = await User.findOne({ email: user.email })
    // console.log('data', data)
    if (existingUser == null) {
        user = await user.save()
        await sendEmail({
            from: process.env.USER_EMAIL,
            to: user.email,
            subject: "hi how are you",
            html: `<h1>your OTP is ${newOTP}</h1>`
        })
        res.status(201).json(new ApiResponse("successfully sign up and please verify your otp", user))
    }
    else {
        throw new ApiError('Email already exits.')

    }

})


//verify user

exports.verify = asyncHandler(async (req, res) => {
    let { otp } = req.body

    if (!otp) {
        throw new ApiError('opt is required.', 400)

    }
    const user = await User.findOne({ otp })
    if (!user) {
        throw new ApiError('opt does not match', 400)
    }
    const currTime = Date.now()
    if (user.otptime < currTime) {
        const updateUser = await User.findByIdAndUpdate(user._id, {
            otp: '',
            otptime: undefined
        })
        await updateUser.save()
        throw new ApiError("otp is expired", 400)
    }
    // user.isvarified=true
    // user.otp=null
    // user.otptime=null
    // await user.save()

    await User.findByIdAndUpdate(user._id, {
        isvarified: true,
        otp: '',
        otptime: undefined

    })
    res.status(200).json(new ApiResponse("account is verified")
    )
})



exports.signIn = asyncHandler(async (req, res) => {
    let { email, password } = req.body
    let user = await User.findOne({ email })
    if (!user) throw new ApiError("user is not registered", 403)
    if (!user.isvarified) throw new ApiError("your account is not verified, otp is send to your email please verify")
    if (user.password != password) {
        throw new ApiError("email or password  does not match", 403)
    }
    const accessToken = jwtToken.jwtToken(user._id)
    const refreshToken = jwtToken.refToken(user._id)

    user.refrestoken = refreshToken
    await user.save()


    return res
        .status(200)
        .cookie("accessToken", accessToken, {
            httpOnly: true,
            secure: true
        })
        .cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: true
        })
        .json({ accessToken, refreshToken, msg: "loged in successfully" })

}
)

exports.RefreshToken = asyncHandler(async (req, res) => {
    const refreshToken = req.body.refreshToken
    if (!refreshToken) throw new ApiError('no token found')
    try {
        const decodedToken = jwt.verify(refreshToken, process.env.REFTOKEN)
        const user = await User.findById(decodedToken?.userId)
        console.log(user)
        if (!user) { throw new ApiError('not a valid token') }

        const newAccessToken = jwtToken.jwtToken(user._id)
        const newRefreshToken = jwtToken.refToken(user._id)

        return res
            .cookie("accessToken", newAccessToken, {
                httpOnly: true,
                secure: true,
                sameSite: ''
            })
            .cookie("refreshToken", newRefreshToken, {
                httpOnly: true,
                secure: true
            }).status(200)
            .json({ newAccessToken, refToken: newRefreshToken })
    } catch (error) {

        throw new ApiError('Invalid or expired refresh token', 403);
    }
})


exports.myData = asyncHandler(async (req, res) => {
    const { _id } = req.user

    const data = await User.findById(_id).select('-password')

    return res.status(200).json(new ApiResponse('my data', data))

})

exports.getAllUser = asyncHandler(async (req, res) => {
    const data = await User.find()
    res.status(200).json(new ApiResponse('here is all user', data))
})


exports.adminLogIn = asyncHandler(async (req, res) => {
    let { email, password } = req.body

    let user = await User.findOne({ email })
    if (!user) throw new ApiError("user is not registered", 403)
    if (!user.isvarified) throw new ApiError("your account is not verified, otp is send to your email please verify")
    if (user.password != password) {
        throw new ApiError("email or password  does not match")
    }
    if (user.role != 'admin') throw new ApiError('you are not admin', 403)

    const token = jwtToken(user._id)
    res.status(200).json({ token, msg: "loged in successfully" })


})

//logout route

exports.logoutUser = asyncHandler(async (req, res) => {
    const { _id } = req.user
    console.log(_id)
    await User.findByIdAndDelete(_id, {
        $unset: {
            refrestoken
        }
    }, {
        new: true
    })

    return res
        .status(200)
        .json('user logged out ')
})





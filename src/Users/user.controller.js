const asyncHandler = require('../../utils/asyncHandler')
const User = require('./user.model')

exports.postUser = asyncHandler( async (req, res) => {
    let { username, email, phone, role, password } = req.body

    let user = new User({
        username,
        email,
        phone,
        role,
        password
    })
    User.findOne({ email: user.email }).then(async data => {
        if (data == null) {
            user = await user.save()
        }
        if (!user) {
            return res.status(400).json({ msg: 'user is not registered' })
        }
    })
    res.send(user)
})


exports.signIn = asyncHandler(async (req, res) => {
    let { email, password } = req.body
        let user = await User.findOne({ email })
        if (!user) {
            return res.status(403).json({ error: 'user is not registred' })
        }
        if(user.password !=password){
            return res.status(403).json({ error: 'email or password  does not match' })
        }
        res.status(200).json({msg:"loged in successfully"})
    }
)


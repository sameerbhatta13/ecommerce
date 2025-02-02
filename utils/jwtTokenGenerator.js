const jwt = require('jsonwebtoken')

const jwtToken = (userId) => {
    const token = jwt.sign({ userId }, process.env.TOKEN, { expiresIn: process.env.DAYS })

    return token

}
const refToken = (userId) => {
    const refreshToken = jwt.sign({ userId }, process.env.REFTOKEN, { expiresIn: process.env.REFDAYS })
    return refreshToken
}

module.exports = { jwtToken, refToken }
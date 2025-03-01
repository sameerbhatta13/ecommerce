const { errorMonitor } = require("nodemailer/lib/xoauth2")

const notFound = (req, res, next) => {
    const error = new Error(`Route not found,${req.originalUrl}`)
    res.status(404)
    next(error)

}

const erroMiddleware = (error, req, res, next) => {
    const statusCode = error.statusCode || 500

    if (error.code === 11000) {
        const field = Object.keys(error.keyValue)[0]
        return res.status(400).json({
            message: `the ${field} must be unique`,
            stack: error.stack
        })
    }

    if (error.name === 'ValidationError') {
        const message = Object.values(error.errors).map((val) => val.message)
        return res.status(400).json({
            message: message[0],
            stack: error.stack
        })
    }
    res.status(statusCode).json({
        message: error.message,
        statusCode: statusCode,
        stack: error.stack
    })
}

module.exports = { notFound, erroMiddleware }

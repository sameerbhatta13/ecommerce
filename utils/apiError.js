class ApiError extends Error {
    constructor(message, statusCode) {
        super(message, statusCode);
        this.statusCode = statusCode;
        this.status = (statusCode >= 400) & (statusCode < 500) ? "fail" : "internal server error"
        this.isOperational = true
        Error.captureStackTrace(this, this.constructor)
    }

}
module.exports = ApiError 
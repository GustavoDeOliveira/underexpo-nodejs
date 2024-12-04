const httpStatusCodes = require('../HttpStatusCodes')
const BaseError = require('./BaseError')

class Api401Error extends BaseError {
    constructor(
        name,
        statusCode = httpStatusCodes.UNAUTHORIZED,
        description = 'Unauthorized.',
        isOperational = true
    ) {
        super(name, statusCode, isOperational, description)
    }
}

module.exports = Api401Error
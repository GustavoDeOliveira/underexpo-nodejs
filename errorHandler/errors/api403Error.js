const httpStatusCodes = require('../HttpStatusCodes')
const BaseError = require('./BaseError')

class Api403Error extends BaseError {
    constructor(
        name,
        statusCode = httpStatusCodes.FORBIDDEN,
        description = 'Forbidden.',
        isOperational = true
    ) {
        super(name, statusCode, isOperational, description)
    }
}

module.exports = Api403Error
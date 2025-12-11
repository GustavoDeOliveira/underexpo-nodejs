const httpStatusCodes = require('../HttpStatusCodes')
const BaseError = require('./BaseError')

class Api409Error extends BaseError {
    constructor(
        name,
        statusCode = httpStatusCodes.CONFLICT,
        description = 'Conflict.',
        isOperational = true
    ) {
        super(name, statusCode, isOperational, description)
    }
}

module.exports = Api409Error
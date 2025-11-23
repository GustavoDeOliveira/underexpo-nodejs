const httpStatusCodes = require('../HttpStatusCodes')
const BaseError = require('./BaseError')

class Api400Error extends BaseError {
    validationErrors;
    constructor(
        name,
        validationErrors = [],
        statusCode = httpStatusCodes.BAD_REQUEST,
        description = 'Bad Request.',
        isOperational = true
    ) {
        super(name, statusCode, isOperational, description);
        this.validationErrors = validationErrors;
    }
}

module.exports = Api400Error
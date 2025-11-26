'use strict';

const path = require('path');
const http = require('http');
const cors = require('cors');
const bodyParser = require( 'body-parser');
const { logError, returnError, isOperationalError, logErrorMiddleware } = require('./errorHandler/ErrorHandler');

const oas3Tools = require('oas3-tools-middleware-and-cors-fix');
const tokenValidator = require('./utils/authenticator');

const serverPort = process.env.PORT || 8080;
const environment = process.env.NODE_ENV || 'development';

const oasFilePath = path.join(__dirname, 'api/openapi.yaml');

const bodyParserMiddleware = bodyParser.raw({
    type: ['image/png', 'image/jpg', 'image/jpeg', 'image/*', 'audio/mp3', 'audio/wav', 'audio/*'],
     limit: '10Mb'
   });

const expressAppConfig = oas3Tools.expressAppConfig(oasFilePath, {
    routing: {
        controllers: path.join(__dirname, './controllers'),
        
    },
    cors: cors({
        origin: process.env.CORS_ALLOWED_ORIGINS.split(','),
        methods: '*',
        allowedHeaders: 'Content-Type, api_key, Authorization, x-user-key'
    }),
    middleware: [
        tokenValidator.validateTokenMiddleware,
        bodyParserMiddleware,
        logErrorMiddleware,
        returnError
    ]
});

const app = expressAppConfig.getApp();

process.on('unhandledRejection', error => {
    throw error
})

process.on('uncaughtException', error => {
    logError(error)

    if (!isOperationalError(error) && environment === 'production') {
        process.exit(1)
    }
})

// Initialize the Swagger middleware
http.createServer(app).listen(serverPort, function () {
    if (environment === 'development') {
        console.log('Servidor na escuta na porta %d (http://localhost:%d)', serverPort, serverPort);
        console.log('Swagger-ui disponível em http://localhost:%d/docs', serverPort);
    }
});


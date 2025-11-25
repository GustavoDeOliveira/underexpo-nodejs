'use strict';

const path = require('path');
const http = require('http');
const cors = require('cors');
const express = require('express');
const bodyParser = require( 'body-parser');

const { logError, returnError, isOperationalError, logErrorMiddleware } = require('./errorHandler/ErrorHandler');

const oas3Tools = require('oas3-tools');
const jwtTokenValidator = require('./utils/authenticator');

const serverPort = 8080;
const environment = process.env.NODE_ENV || 'development';

// swaggerRouter configuration
const options = {
    routing: {
        controllers: path.join(__dirname, './controllers')
    },
};

const expressAppConfig = oas3Tools.expressAppConfig(path.join(__dirname, 'api/openapi.yaml'), options);
const app = expressAppConfig.getApp();

// Add headers
app.use(/.*/, cors({ methods: '*', allowedHeaders: 'Content-Type, api_key, Authorization, x-user-key' }));
app.use(jwtTokenValidator.validateTokenMiddleware);

app.use(logErrorMiddleware);
app.use(returnError);

// The folowing line ensures that bodyParser will parse the image mime types
// and we will be able to access it through req.body
app.use(bodyParser.raw({
    type: ['image/png', 'image/jpg', 'image/jpeg', 'image/*', 'audio/mp3', 'audio/wav', 'audio/*'],
     limit: '10Mb'
   }));
 

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
    console.log('Servidor na escuta na porta %d (http://localhost:%d)', serverPort, serverPort);
    console.log('Swagger-ui disponível em http://localhost:%d/docs', serverPort);
});


'use strict'
const Api401Error = require('../errorHandler/errors/api401Error');
const repository = require('../repositories/PerfilRepository');

exports.validateTokenMiddleware = async function(req, res, next) {
    const auth = req.headers['x-user-key'];
    if (!auth &&
        (req.method === 'OPTIONS' || req.method === 'HEAD'
        ||  req.path.endsWith('favicon.ico')
        || (req.path.startsWith('/docs') && (req.method === 'GET'))
        || (req.path.startsWith('/api-docs') && (req.method === 'GET'))
        || (req.path.endsWith('usuario') && (req.method === 'GET' || req.method === 'POST'))
        || (req.path.includes('v1/expo') && (req.method === 'GET'))
        || (req.path.includes('painel/') && (req.method === 'GET')))
    ) {
        next();
    } else {
        console.log(req.path)
        if (!auth) return next(new Api401Error('No auth token.'));
        try {
            const user = await repository.readByExternalId(auth);
            if (!user) {
                return next(new Api401Error('User not found.'));
            }
            req.userId = user.id;
            return next();
        } catch (error) {
            return next(error);
        }
    }
}

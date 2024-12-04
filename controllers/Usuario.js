'use strict';

var utils = require('../utils/writer.js');
var Usuario = require('../service/UsuarioService');

module.exports.atualizarUsuario = function atualizarUsuario (req, res, next, body, id) {
  Usuario.atualizarUsuario(body, id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.atualizarUsuario = function atualizarUsuario (req, res, next, body, id) {
  Usuario.atualizarUsuario(body, id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.criarUsuario = function criarUsuario (req, res, next, body) {
  Usuario.criarUsuario(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.criarUsuario = function criarUsuario (req, res, next, body) {
  Usuario.criarUsuario(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.obterUsuario = function obterUsuario (req, res, next, chave) {
  Usuario.obterUsuario(chave)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.sairUsuario = function sairUsuario (req, res, next, id) {
  Usuario.sairUsuario(id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

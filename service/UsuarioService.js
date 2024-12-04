'use strict';

const api404Error = require("../errorHandler/errors/api404Error");
const repository = require("../repositories/PerfilRepository");

/**
 * Editar usuario
 * Altera o nome do usuario
 *
 * body AtualizacaoUsuario Informações a atualizar no usuário.
 * id Long ID do usuario a ser editado
 * no response value expected for this operation
 **/
exports.atualizarUsuario = function(body,id) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Editar usuario
 * Altera o nome do usuario
 *
 * body AtualizacaoUsuario Informações a atualizar no usuário.
 * id Long ID do usuario a ser editado
 * no response value expected for this operation
 **/
exports.atualizarUsuario = function(body,id) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Criar usuario
 * Cadastra um novo usuario na plataforma.
 *
 * body CriacaoUsuario Objeto do usuario criado (optional)
 * returns Usuario
 **/
exports.criarUsuario = function(body) {
  return new Promise(function(resolve, reject) {
    repository.readByExternalId(body.chave)
    .then(result => {
      if (result) {
        resolve({id: result, nome: body.nome});
      } else {
        repository.create(body)
        .then(result => {
          resolve({id: result, nome: body.nome});
        }).catch(reason => reject(reason));
      }
    }).catch(reason => reject(reason))
  });
}

/**
 * Buscar usuario
 * Busca pelo usuario para entrada na plataforma.
 *
 * chave String A chave do usuario
 * returns Usuario
 **/
exports.obterUsuario = function(chave) {
  return new Promise(function(resolve, reject) {
    repository.readByExternalId(chave)
    .then(result =>{
      if (result)
        resolve({"nome": result.username, "id": result.id});
      else
        reject(new api404Error("Nao foi possivel encontrar usuario."));
    }).catch(reason => reject(reason))
  });
}


/**
 * desconecta o usuario da sessao atual
 *
 * id Long ID do usuario a ser desconectado
 * no response value expected for this operation
 **/
exports.sairUsuario = function(id) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


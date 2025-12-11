'use strict';

const api404Error = require("../errorHandler/errors/api404Error");
const api409Error = require("../errorHandler/errors/api409Error");
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
exports.criarUsuario = async function(body) {
  const result = await repository.readByExternalId(body.chave);
  
  if (result) {
    return {id: result, nome: body.nome};
  } else {
    const exists = await repository.existsByUsername(body.nome);

    if (exists) throw new api409Error();

    const id = await repository.create(body);
    return {id, nome: body.nome};
  }
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


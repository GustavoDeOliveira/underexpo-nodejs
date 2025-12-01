'use strict';

const repository = require('../repositories/PerfilRepository');
const inviteRepository = require('../repositories/ConviteRepository');
const panelRepository = require('../repositories/PainelRepository');
const workRepository = require('../repositories/ObraRepository');
const contactRepository = require('../repositories/ContatoRepository');
const fileManager = require('../utils/fileManager');
const Api403Error = require('../errorHandler/errors/api403Error');

/**
 * Aceitar um convite para exposição a partir de uma notificação
 * Aceita um convite para participar em um painel de uma exposição
 *
 * id Long id da notificação
 * no response value expected for this operation
 **/
exports.aceitarConviteNotificacao = function (id) {
  return new Promise(function (resolve, reject) {
    const result = inviteRepository.accept(id)
      .then(response => resolve(response))
      .catch(reason => reject(reason));
  });
}


/**
 * Adicionar um arquivo a uma obra
 * Carrega um novo arquivo para uma obra
 *
 * body Object Arquivo que será carregado na obra.
Deve ser de um formato suportado pelo tipo da obra
 * id Long ID da obra a qual o arquivo pertencerá
 * no response value expected for this operation
 **/
exports.adicionarArquivoObra = async function (body, id, userId, mimeType) {
  const work = await workRepository.readById(id, userId);
  const uploadResult = await fileManager.upload(fileManager.buckets.default, work.filename, body, mimeType);
  const result = await workRepository.update(id, { conteudo: uploadResult });
  return {
    "tipo": result.type,
    "nome": result.title,
    "url": result.content,
    "id": result.id,
    "dataCarregamento": result.created_at
  };
}


/**
 * Adicionar canal de contato ao perfil do usuario
 * Adiciona um canal de contato ao perfil da conta da sessão atual
 *
 * body NovoContato Dados de contato a serem cadastrados. (optional)
 * returns inline_response_201_1
 **/
exports.adicionarContato = function (userId, body) {
  return new Promise(function (resolve, reject) {
    contactRepository.create(userId, body)
      .then(resolve)
      .catch(reject);
  });
}


/**
 * Carregar obra no acervo do usuário
 * Adiciona uma obra ao acervo do usuário.
 *
 * body NovaObra Dados da obra a ser carregada no acervo. (optional)
 * returns Obra
 **/
exports.adicionarObra = function (userId, body) {
  return new Promise(function (resolve, reject) {
    workRepository.create(userId, body)
      .then(result => resolve({
        "tipo": result.type,
        "nome": result.title,
        "id": result.id,
        "dataCarregamento": result.created_at
      }));
  });
}


/**
 * Atualizar canal de contato
 * Atualiza um canal de contato
 *
 * body AtualizacaoContato Dados para atualização do canal de contato (optional)
 * id Long id do contato
 * no response value expected for this operation
 **/
exports.atualizarContato = function (body, id) {
  return new Promise(function (resolve, reject) {
    contactRepository.update(id, body)
      .then(resolve)
      .catch(reject);
  });
}


/**
 * Editar obra do acervo do usuário
 * Edita uma obra do acervo do usuário.
 *
 * body AtualizacaoObra  (optional)
 * id Long ID da obra a ser atualizada
 * no response value expected for this operation
 **/
exports.atualizarObra = async function (body, id, userId) {
  const isAuthor = await workRepository.isAuthor(id, userId);
  if (!isAuthor)
    throw new Api403Error("Usuário não tem permissão de edição neste item.");

  const work = await workRepository.update(id, body);
  return {
    "tipo": work.type,
    "nome": work.title,
    "id": work.id,
    "dataCarregamento": work.created_at,
    "url": work.content
  };
}


/**
 * Buscar um canal de contato a partir do id
 * Busca um canal de contato de um artista
 *
 * id Long id da notificação
 * returns Contato
 **/
exports.buscarContatoPorId = function (id) {
  return new Promise(function (resolve, reject) {
    var examples = {};
    examples['application/json'] = {
      "link": "http://www.instagram.com/meu.instagram",
      "nome": "@meu.instagram",
      "id": id,
      "canal": "Instagram"
    };
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Buscar canais de contato de um usuário
 * Busca os canais de contato de um usuario a partir do seu nome
 *
 * pagina Integer Página atual da busca
 * quantidade Integer Quantidade de registros a serem buscados
 * returns List
 **/
exports.buscarContatos = function (userId, pagina, quantidade) {
  return new Promise(function (resolve, reject) {
    contactRepository.readByUserId(userId, pagina, quantidade)
      .then(results => resolve(results.map(result => ({
        "id": result.id,
        "canal": result.channel,
        "nome": result.name,
        "link": result.url
      }))))
      .catch(reject);
  });
}


/**
 * Buscar uma notificação a partir do id
 * Busca uma notificação de convite para participação em uma exposição
 *
 * id Long id da notificação
 * returns Notificacao
 **/
exports.buscarNotificacaoPorId = function (id) {
  return new Promise(function (resolve, reject) {
    var examples = {};
    examples['application/json'] = {
      "id": 1001,
      "expo": {
        "painelId": 11,
        "nome": "Exposição A",
        "id": 10,
        "organizador": "artistaB"
      }
    };
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Buscar notificações para o usuário ativo
 * Busca notificações de convites para participação em exposições
 *
 * pagina Integer Página atual da busca
 * quantidade Integer Quantidade de registros a serem buscados
 * returns List
 **/
exports.buscarNotificacoes = function (pagina, quantidade, userId) {
  return new Promise(function (resolve, reject) {
    inviteRepository.readByUserId(userId, 'P')
      .then(results => resolve(results.map(result => ({
        "id": result.id,
        "status": result.status,
        "expo": {
          "id": result.expo_id,
          "nome": result.expo_name,
          "organizador": result.username
        }
      }))))
      .catch(reject);
  });
}


/**
 * Buscar perfis cadastrados na plataforma a partir de uma palavra-chave
 * Busca perfis de usuários cadastrados na plataforma que coincidam com a palavra-chave informada.
 *
 * chave String A palavra-chave para filtrar os resultados da busca
 * returns List
 **/
exports.buscarPerfis = function (chave) {
  return new Promise(function (resolve, reject) {
    repository.searchByUsername(chave)
      .then(data => {
        resolve(data.map(item => ({ id: item.id, nome: item.username })));
      }).catch(reason => reject(reason));
  });
}


/**
 * Carregar painéis mantidos pelo usuário
 * Carrega os painéis de exposições que o usuário aceitou participar.
 *
 * returns List
 **/
exports.carregarMeusPaineis = function (userId) {
  return new Promise(function (resolve, reject) {
    panelRepository.readByUserId(userId)
      .then(result => resolve(result.map(p => ({
        "urlMiniatura": p.panel_thumbnail_url,
        "nome": p.panel_name,
        "id": p.panel_id,
        "autor": p.panel_author,
        "exposicao": {
          "urlMiniatura": p.expo_thumbnail_url,
          "nome": p.expo_name,
          "id": p.expo_id,
          "descricao": p.expo_description,
          "organizador": p.expo_author
        }
      })))).catch(reject);
  });
}


/**
 * Carregar obra do acervo do usuário
 * Carrega uma obra do acervo do usuário.
 *
 * id Long ID da obra a ser carregada
 * returns Obra
 **/
exports.carregarObra = function (id) {
  return new Promise(function (resolve, reject) {
    var examples = {};
    examples['application/json'] = {
      "tipo": "imagem",
      "nome": "Imagem A",
      "id": 10,
      "dataCarregamento": "2000-01-23",
      "url": "https://picsum.photos/200"
    };
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Listar obras no acervo do usuário
 * Lista as obras no acervo do usuário.
 *
 * pagina Integer Página atual da busca
 * quantidade Integer Quantidade de registros a serem buscados
 * tipo String Tipo de filtro para aplicar na busca (optional)
 * ordenacao String Tipo de ordenacao para aplicar na busca (optional)
 * returns List
 **/
exports.carregarObras = function (userId, pagina, quantidade, tipo, ordenacao) {
  return new Promise(function (resolve, reject) {
    workRepository.read(userId, pagina, quantidade, tipo, ordenacao)
      .then(result => resolve(result.map(w => ({
        "id": w.id,
        "tipo": w.type,
        "nome": w.title,
        "dataCarregamento": w.created_at,
        "url": w.content
      })))).catch(reject);
  });
}
0

/**
 * Enviar uma notificação convidando um usuário para uma exposição
 * Envia um convite para participação em uma exposição
 *
 * body NovaNotificacao Dados da exposição, painel e artista que será convidado. (optional)
 * returns ConviteExposicao
 **/
exports.enviarNotificacao = function (body) {
  return new Promise(function (resolve, reject) {
    inviteRepository.create(body)
      .then(data => resolve({ artista: data.username, expoId: data.expo_id, id: data.id }))
      .catch(reason => reject(reason));
  });
}

/**
 * Remover canal de contato
 * Remove um canal de contato
 *
 * id Long id do contato
 * no response value expected for this operation
 **/
exports.removerContato = function (id) {
  return new Promise(function (resolve, reject) {
    contactRepository.delete(id)
      .then(resolve)
      .catch(reject);
  });
}


/**
 * Cancelar convite para exposição
 * Cancela um convite para uma exposição
 *
 * id Long id do convite
 * no response value expected for this operation
 **/
exports.removerNotificacao = function (id, userId) {
  return new Promise(function (resolve, reject) {
    const result = inviteRepository.reject(id, userId)
      .then(response => resolve(response))
      .catch(reason => reject(reason));
  });
}


/**
 * Remover uma obra do acervo do usuário
 * Remove uma obra do acervo do usuário. Também remove o arquivo da obra do servidor, se houver.
 *
 * id Long ID da obra a ser removida
 * no response value expected for this operation
 **/
exports.removerObra = async function (id, userId) {
  const isAuthor = await workRepository.isAuthor(id, userId);
  if (!isAuthor)
    throw new Api403Error("Usuário não tem permissão de edição neste item.");

  const work = await workRepository.readById(id, userId);

  await fileManager.remove(fileManager.buckets.default, work.filename);

  await workRepository.delete(id);
}


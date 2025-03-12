'use strict';

const Api403Error = require('../errorHandler/errors/api403Error');
const Api404Error = require('../errorHandler/errors/api404Error');
const repository = require('../repositories/ExposicaoRepository');
const panelRepository = require('../repositories/PainelRepository');

/**
 * Adicionar uma imagem de miniatura a uma exposição
 * Carrega uma nova imagem como miniatura para a exposição
 *
 * body Object Imagem que será carregada como miniatura
 * expoId Long ID da exposição cuja miniatura será atualizada
 * no response value expected for this operation
 **/
exports.adicionarMiniaturaExposicao = function (body, expoId) {
  return new Promise(function (resolve, reject) {
    resolve();
  });
}


/**
 * Alterar informações em uma exposição
 * Atualiza as informações de uma exposição. Também irá alterar a ordem dos paineis que forem informados
 *
 * body AtualizacaoExposicao Conteúdos que serão atualizados na exposição. Campos não informados não serão alterados.
 * expoId Long ID da exposição cujas informações serão atualizadas
 * no response value expected for this operation
 **/
exports.atualizarExposicao = function (body, expoId) {
  return new Promise(function (resolve, reject) {
    repository.isAuthor(expoId, body.userId)
      .then(data => {
        if (!data) {
          reject(new Api403Error("Usuário mão tem permissão de edição neste item."));
        }
        else {
          repository.update(expoId, body)
            .then(result => resolve(result)).catch(reason => reject(reason));
        }
      });
  });
}

/**
 * Alterar informações de um painel
 * Atualiza informações de um painel, assim como seus elementos.
 *
 * body AtualizacaoPainel Informações a atualizar no painel.
Caso a propriedade 'remover' de um elemento seja 'true',
o elemento com o id informado será removido do painel.
 * expoId Long ID da exposição cujo painel a ser atualizado pertence
 * painelId Long ID do painel a ser atualizado
 * no response value expected for this operation
 **/
exports.atualizarPainel = function (body, expoId, painelId) {
  return new Promise(function (resolve, reject) {
    panelRepository.update(painelId, body)
      .then(result => {
        panelRepository.read(painelId)
          .then(p => {
            if (p !== null) {
              resolve({
                "elementos": p.elements.map(e => ({
                  "tipo": e.type,
                  "conteudo": e.content,
                  "titulo": e.title,
                  "obraId": e.work_id,
                  "id": e.id
                })),
                "nome": p.name,
                "autor": p.username
              });
            } else {
              throw new Api404Error("Não foi possível encontrar o painel.");
            }
          });
      }).catch(reject);
  });
};

/**
 * Buscar exposições publicadas com paginação
 * Busca exposições que tenham sido disponibilizadas ao público, permitindo paginação.
 *
 * pagina Integer Página atual da busca
 * quantidade Integer Quantidade de registros a serem buscados
 * returns List
 **/
exports.buscarExposicoesPublicadas = function (pagina, quantidade) {
  return new Promise(function (resolve, reject) {
    repository.readPaged(pagina, quantidade)
      .then(data => {
        resolve(data.map(item => ({
          urlMiniatura: item.miniature_url,
          nome: item.name,
          descricao: item.description,
          id: item.id,
          organizador: item.username
        })));
      }).catch(reason => reject(reason));
  });
}


/**
 * Carregar exposições organizadas pelo usuário
 * Carrega as exposições que o usuário organizou.
 *
 * returns List
 **/
exports.carregarMinhasExposicoes = function (userId) {
  return new Promise(function (resolve, reject) {
    repository.readByUserId(userId)
      .then(data => {
        resolve(data.map(item => ({
          id: item.id,
          urlMiniatura: item.miniature_url,
          nome: item.name,
          descricao: item.description,
          organizador: item.username
        })))
      }).catch(reason => reject(reason));
  });
}


/**
 * Carregar uma exposição a partir do seu ID
 * Retorna uma única exposição, com uma lista de painéis.
 *
 * expoId Long ID da exposição a ser carregada
 * returns Exposicao
 **/
exports.carregarExposicaoPorId = function (expoId) {
  return new Promise(function (resolve, reject) {
    repository.read(expoId).then(result => {
      if (!result) {
        reject(new Api404Error("Exposição não encontrada."));
      } else {
        resolve({
          "convites": result.invites.map(invite => ({
            "artista": invite.username,
            "expoId": result.id,
            "id": invite.id
          })),
          "paineis": result.panels.map(panel => ({
            "urlMiniatura": panel.miniature_url,
            "nome": panel.name,
            "id": panel.id,
            "autor": panel.username
          })),
          "nome": result.name,
          "descricao": result.description,
          "organizador": result.username
        })
      }
    }).catch(reason => reject(reason));
  });
}


/**
 * Carregar um painel de uma exposição a partir de seus IDs
 * Retorna um único painel, com uma lista de seus elementos.
 *
 * expoId Long ID da exposição cujo o painel a ser carregado pertence
 * painelId Long ID do painel a ser carregado
 * returns Painel
 **/
exports.carregarPainelPorId = function (expoId, painelId) {
  return new Promise(function (resolve, reject) {
    panelRepository.read(painelId)
      .then(p => {
        if (p !== null) {
          resolve({
            "elementos": p.elements.map(e => ({
              "tipo": e.type,
              "conteudo": e.content,
              "titulo": e.title,
              "obraId": e.work_id,
              "id": e.id
            })),
            "nome": p.name,
            "autor": p.username
          });
        } else {
          throw new Api404Error("Não foi possível encontrar o painel.");
        }
      });
  });
}


/**
 * Criar um painel em uma exposição
 * Cria um painel, e envia um convite para o artista informado.
 *
 * body NovoPainel Informações do painel que será criado.
 * expoId Long ID da exposição onde o painel será criado
 * no response value expected for this operation
 **/
exports.criarPainel = function (body, expoId) {
  return new Promise(function (resolve, reject) {
    resolve();
  });
}


/**
 * Criar um painel em uma exposição
 * Cria um painel, e envia um convite para o artista informado.
 *
 * body NovoPainel Informações do painel que será criado.
 * expoId Long ID da exposição onde o painel será criado
 * no response value expected for this operation
 **/
exports.criarPainel = function (body, expoId) {
  return new Promise(function (resolve, reject) {
    resolve();
  });
}


/**
 * Denunciar uma exposição a partir do seu ID
 * Cria uma denúncia associada a exposição com o ID informado
 *
 * body NovaDenuncia Criar uma denúncia com uma descrição dos fatores ofensivos
 * expoId Long ID da exposição a ser denunciada
 * no response value expected for this operation
 **/
exports.denunciarExposicao = function (body, expoId) {
  return new Promise(function (resolve, reject) {
    resolve();
  });
}


/**
 * Denunciar uma exposição a partir do seu ID
 * Cria uma denúncia associada a exposição com o ID informado
 *
 * body NovaDenuncia Criar uma denúncia com uma descrição dos fatores ofensivos
 * expoId Long ID da exposição a ser denunciada
 * no response value expected for this operation
 **/
exports.denunciarExposicao = function (body, expoId) {
  return new Promise(function (resolve, reject) {
    resolve();
  });
}


/**
 * Remover um painel de uma exposição
 * Remove um único painel de uma exposição, somente se a exposição estiver em modo rascunho
 *
 * expoId Long ID da exposição cujo o painel a ser removido pertence
 * painelId Long ID do painel a ser removido
 * no response value expected for this operation
 **/
exports.excluirPainel = function (expoId, painelId) {
  return new Promise(function (resolve, reject) {
    resolve();
  });
}


/**
 * Organizar uma nova exposição
 * Adiciona uma nova exposição em modo rascunho
 *
 * body NovaExposicao Dados da nova exposição
 * returns inline_response_201
 **/
exports.organizarExposicao = function (body) {
  return new Promise(async function (resolve, reject) {
    let id = 0;
    try {
      await repository.create(body);
    } catch (error) {
      reject(error);
    }

    if (!id)
      reject(new Api404Error("Não foi possível encontrar Exposição criada."));

    resolve({ id });
  });
}


/**
 * Remover uma exposição
 * Remove uma exposição e seus painéis. Pode ser feito apenas em exposições que não possuam painéis e estejam em modo rascunho.
 *
 * expoId Long ID da exposição cujas informações serão atualizadas
 * no response value expected for this operation
 **/
exports.removerExposicao = function (expoId) {
  return new Promise(function (resolve, reject) {
    resolve();
  });
}


/**
 * Remover a imagem de miniatura de uma exposição
 * Remove a imagem de miniatura da exposição, caso possua
 *
 * expoId Long ID da exposição cuja miniatura será removida
 * no response value expected for this operation
 **/
exports.removerMiniaturaExposicao = function (expoId) {
  return new Promise(function (resolve, reject) {
    resolve();
  });
}


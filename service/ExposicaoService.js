'use strict';


/**
 * Adicionar uma imagem de miniatura a uma exposição
 * Carrega uma nova imagem como miniatura para a exposição
 *
 * body Object Imagem que será carregada como miniatura
 * expoId Long ID da exposição cuja miniatura será atualizada
 * no response value expected for this operation
 **/
exports.adicionarMiniaturaExposicao = function(body,expoId) {
  return new Promise(function(resolve, reject) {
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
exports.atualizarExposicao = function(body,expoId) {
  return new Promise(function(resolve, reject) {
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
exports.atualizarExposicao = function(body,expoId) {
  return new Promise(function(resolve, reject) {
    resolve();
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
exports.atualizarPainel = function(body,expoId,painelId) {
  return new Promise(function(resolve, reject) {
    resolve();
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
exports.atualizarPainel = function(body,expoId,painelId) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Buscar exposições publicadas com paginação
 * Busca exposições que tenham sido disponibilizadas ao público, permitindo paginação.
 *
 * pagina Integer Página atual da busca
 * quantidade Integer Quantidade de registros a serem buscados
 * returns List
 **/
exports.buscarExposicoesPublicadas = function(pagina,quantidade) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "urlMiniatura" : "https://source.unsplash.com/random?wallpapers",
  "nome" : "Exposição A",
  "descricao": "Lorem ipsum sit dolor amet.",
  "id" : 10,
  "organizador" : "artistaB"
}, {
  "urlMiniatura" : "https://source.unsplash.com/random?wallpapers",
  "nome" : "Exposição B",
  "descricao": "Lorem ipsum sit dolor amet. Nam vel ex non orci placerat efficitur et quis magna. Nam quis viverra eros. Fusce ut suscipit massa. Duis bibendum, ligula in commodo lobortis, nibh augue iaculis ipsum, eu pulvinar erat nibh ac neque. Vestibulum ac eleifend augue. Cras in elementum odio.",
  "id" : 11,
  "organizador" : "artistaA"
}, {
  "urlMiniatura" : "https://source.unsplash.com/random?wallpapers",
  "nome" : "Exposição C",
  "descricao": "Lorem ipsum sit dolor amet.",
  "id" : 12,
  "organizador" : "euMesmo"
}, {
  "urlMiniatura" : "https://source.unsplash.com/random?wallpapers",
  "nome" : "Exposição D",
  "descricao": "Lorem ipsum sit dolor amet. Nam vel ex non orci placerat efficitur et quis magna. Nam quis viverra eros. Fusce ut suscipit massa. Duis bibendum, ligula in commodo lobortis, nibh augue iaculis ipsum, eu pulvinar erat nibh ac neque. Vestibulum ac eleifend augue. Cras in elementum odio.",
  "id" : 13,
  "organizador" : "euMesmo"
} ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Carregar uma exposição a partir do seu ID
 * Retorna uma única exposição, com uma lista de painéis.
 *
 * expoId Long ID da exposição a ser carregada
 * returns Exposicao
 **/
exports.carregarExposicaoPorId = function(expoId) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "convites" : [ {
    "artista" : "artistaA",
    "expoId" : 10,
    "id" : 1001
  }, {
    "artista" : "artistaB",
    "expoId" : 10,
    "id" : 1002
  } ],
  "paineis" : [ {
    "urlMiniatura" : "https://source.unsplash.com/random?wallpapers",
    "nome" : "Painel A",
    "id" : 10,
    "autor" : "artistaB"
  }, {
    "urlMiniatura" : "https://source.unsplash.com/random?wallpapers",
    "nome" : "Painel B",
    "id" : 11,
    "autor" : "artistaA"
  } ],
  "nome" : expoId === 10 ? "Exposição A" : "Exposição B",
  "descricao" : "Lorem ipsum dolor sit amet.",
  "organizador" : "artistaB"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
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
exports.carregarPainelPorId = function(expoId,painelId) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples[10] = {
      "elementos" : [ {
        "tipo" : "texto",
        "conteudo" : "Lorem ipsum dolor sit amet.",
        "titulo" : "Título do Elemento",
        "id" : 100
      }, {
        "tipo" : "audio",
        "conteudo" : "https://ipfs.filebase.io/ipfs/Qmd186kdXdLp9xKEy7mxSYybZXN9LNxCHxJ94bPvtC69Sx",
        "titulo" : "Elemento de Áudio",
        "id" : 101
      }, {
        "tipo" : "texto",
        "conteudo" : "Lorem ipsum dolor sit amet.",
        "id" : 102
      }, {
        "tipo" : "audio",
        "conteudo" : "https://ipfs.filebase.io/ipfs/Qmd186kdXdLp9xKEy7mxSYybZXN9LNxCHxJ94bPvtC69Sx",
        "titulo" : "Elementos de Áudio",
        "id" : 103
      }, {
        "tipo" : "audio",
        "conteudo" : "https://ipfs.filebase.io/ipfs/Qmd186kdXdLp9xKEy7mxSYybZXN9LNxCHxJ94bPvtC69Sx",
        "id" : 104
      }, {
        "tipo" : "audio",
        "conteudo" : "https://ipfs.filebase.io/ipfs/Qmd186kdXdLp9xKEy7mxSYybZXN9LNxCHxJ94bPvtC69Sx",
        "id" : 105
      }, {
        "tipo" : "audio",
        "conteudo" : "https://ipfs.filebase.io/ipfs/Qmd186kdXdLp9xKEy7mxSYybZXN9LNxCHxJ94bPvtC69Sx",
        "id" : 106
      }, ],
      "nome" : "Painel A",
      "autor" : "artistaB"
    };
    examples[11] = {
      "elementos" : [ {
        "tipo" : "texto",
        "conteudo" : "Lorem dolor ipsum sit amet.",
        "titulo" : "Título do Elemento",
        "id" : 102
      }, {
        "tipo" : "imagem",
        "conteudo" : "https://source.unsplash.com/random?wallpapers",
        "id" : 103
      }, {
        "tipo" : "video",
        "conteudo" : "oy4cbqE1_qc",
        "id" : 104
      } ],
      "nome" : "Painel B",
      "autor" : "artistaA"
    };
    if (examples[painelId]) {
      resolve(examples[painelId]);
    } else {
      resolve();
    }
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
exports.criarPainel = function(body,expoId) {
  return new Promise(function(resolve, reject) {
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
exports.criarPainel = function(body,expoId) {
  return new Promise(function(resolve, reject) {
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
exports.denunciarExposicao = function(body,expoId) {
  return new Promise(function(resolve, reject) {
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
exports.denunciarExposicao = function(body,expoId) {
  return new Promise(function(resolve, reject) {
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
exports.excluirPainel = function(expoId,painelId) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Organizar uma nova exposição
 * Adiciona uma nova exposição em modo rascunho
 *
 * body NovaExposicao Create a new pet in the store
 * returns inline_response_201
 **/
exports.organizarExposicao = function(body) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "id" : 13
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Remover uma exposição
 * Remove uma exposição e seus painéis. Pode ser feito apenas em exposições que não possuam painéis e estejam em modo rascunho.
 *
 * expoId Long ID da exposição cujas informações serão atualizadas
 * no response value expected for this operation
 **/
exports.removerExposicao = function(expoId) {
  return new Promise(function(resolve, reject) {
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
exports.removerMiniaturaExposicao = function(expoId) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


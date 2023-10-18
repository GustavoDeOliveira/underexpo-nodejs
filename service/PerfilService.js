'use strict';


/**
 * Aceitar um convite para exposição a partir de uma notificação
 * Aceita um convite para participar em um painel de uma exposição
 *
 * id Long id da notificação
 * no response value expected for this operation
 **/
exports.aceitarConviteNotificacao = function(id) {
  return new Promise(function(resolve, reject) {
    resolve();
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
exports.adicionarArquivoObra = function(body,id) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Carregar obra no acervo do usuário
 * Adiciona uma obra ao acervo do usuário.
 *
 * body NovaObra Dados da obra a ser carregada no acervo. (optional)
 * no response value expected for this operation
 **/
exports.adicionarObra = function(body) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Carregar obra no acervo do usuário
 * Adiciona uma obra ao acervo do usuário.
 *
 * body NovaObra Dados da obra a ser carregada no acervo. (optional)
 * no response value expected for this operation
 **/
exports.adicionarObra = function(body) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Editar obra do acervo do usuário
 * Edita uma obra do acervo do usuário.
 *
 * id Long ID da obra a ser atualizada
 * returns AtualizarObra
 **/
exports.atualizarObra = function(id) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "nome" : "Imagem A"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Buscar uma notificação a partir do id
 * Busca uma notificação de convite para participação em uma exposição
 *
 * id Long id da notificação
 * returns Notificacao
 **/
exports.buscarNotificacaoPorId = function(id) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "id" : 1001,
  "expo" : {
    "painelId" : 11,
    "nome" : "Exposição A",
    "id" : 10,
    "organizador" : "artistaB"
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
exports.buscarNotificacoes = function(pagina,quantidade) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "id" : 1001,
  "expo" : {
    "painelId" : 11,
    "nome" : "Exposição A",
    "id" : 10,
    "organizador" : "artistaB"
  }
}, {
  "id" : 1001,
  "expo" : {
    "painelId" : 11,
    "nome" : "Exposição A",
    "id" : 10,
    "organizador" : "artistaB"
  }
} ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Carregar painéis mantidos pelo usuário
 * Carrega os painéis de exposições que o usuário aceitou participar.
 *
 * returns List
 **/
exports.carregarMeusPaineis = function() {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "urlMiniatura" : "https://storage.server/img?id=hF24rGu0",
  "nome" : "Painel A",
  "id" : 10,
  "autor" : "artistaB",
  "exposicao" : {
    "urlMiniatura" : "https://storage.server/img?id=a75Bhgru9",
    "nome" : "Exposição A",
    "id" : 10,
    "organizador" : "artistaB"
  }
}, {
  "urlMiniatura" : "https://storage.server/img?id=hF24rGu0",
  "nome" : "Painel A",
  "id" : 10,
  "autor" : "artistaB",
  "exposicao" : {
    "urlMiniatura" : "https://storage.server/img?id=a75Bhgru9",
    "nome" : "Exposição A",
    "id" : 10,
    "organizador" : "artistaB"
  }
} ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Carregar exposições organizadas pelo usuário
 * Carrega as exposições que o usuário organizou.
 *
 * returns List
 **/
exports.carregarMinhasExposicoes = function() {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "urlMiniatura" : "https://storage.server/img?id=a75Bhgru9",
  "nome" : "Exposição A",
  "id" : 10,
  "organizador" : "artistaB"
}, {
  "urlMiniatura" : "https://storage.server/img?id=a75Bhgru9",
  "nome" : "Exposição A",
  "id" : 10,
  "organizador" : "artistaB"
} ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Carregar obra do acervo do usuário
 * Carrega uma obra do acervo do usuário.
 *
 * id Long ID da obra a ser carregada
 * returns Obra
 **/
exports.carregarObra = function(id) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "tipo" : "imagem",
  "nome" : "Imagem A",
  "id" : 10,
  "dataCarregamento" : "2000-01-23",
  "url" : "https://storage.server/img?id=a7gru95Bh"
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
exports.carregarObras = function(pagina,quantidade,tipo,ordenacao) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "tipo" : "imagem",
  "nome" : "Imagem A",
  "id" : 10,
  "dataCarregamento" : "2000-01-23",
  "url" : "https://storage.server/img?id=a7gru95Bh"
}, {
  "tipo" : "imagem",
  "nome" : "Imagem A",
  "id" : 10,
  "dataCarregamento" : "2000-01-23",
  "url" : "https://storage.server/img?id=a7gru95Bh"
} ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Dispensar ou cancelar um convite para exposição a partir de uma notificação
 * Dispensa ou cancela um convite para participar em um painel de uma exposição
 *
 * id Long id da notificação
 * no response value expected for this operation
 **/
exports.dispensarConviteNotificacao = function(id) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Enviar uma notificação convidando um usuário para uma exposição
 * Envia um convite para participação em uma exposição
 *
 * body NovaNotificacao Dados da exposição, painel e artista que será convidado. (optional)
 * no response value expected for this operation
 **/
exports.enviarNotificacao = function(body) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Enviar uma notificação convidando um usuário para uma exposição
 * Envia um convite para participação em uma exposição
 *
 * body NovaNotificacao Dados da exposição, painel e artista que será convidado. (optional)
 * no response value expected for this operation
 **/
exports.enviarNotificacao = function(body) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Remover uma obra do acervo do usuário
 * Remove uma obra do acervo do usuário. Também remove o arquivo da obra do servidor, se houver.
 *
 * id Long ID da obra a ser removida
 * no response value expected for this operation
 **/
exports.removerObra = function(id) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


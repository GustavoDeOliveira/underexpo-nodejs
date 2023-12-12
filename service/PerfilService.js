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
 * Adicionar canal de contato ao perfil do usuario
 * Adiciona um canal de contato ao perfil da conta da sessão atual
 *
 * body NovaNotificacao Dados de contato a serem cadastrados. (optional)
 * no response value expected for this operation
 **/
exports.adicionarContato = function(body) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Adicionar canal de contato ao perfil do usuario
 * Adiciona um canal de contato ao perfil da conta da sessão atual
 *
 * body NovaNotificacao Dados de contato a serem cadastrados. (optional)
 * no response value expected for this operation
 **/
exports.adicionarContato = function(body) {
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
 * Atualizar canal de contato
 * Atualiza um canal de contato
 *
 * id Long id do contato
 * no response value expected for this operation
 **/
exports.atualizarContato = function(id) {
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
 * Buscar um canal de contato a partir do id
 * Busca um canal de contato de um artista
 *
 * id Long id da notificação
 * returns Notificacao
 **/
exports.buscarContatoPorId = function(id) {
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
 * Buscar canais de contato de um usuário
 * Busca os canais de contato de um usuario a partir do seu nome
 *
 * pagina Integer Página atual da busca
 * quantidade Integer Quantidade de registros a serem buscados
 * returns List
 **/
exports.buscarContatos = function(pagina,quantidade) {
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
 * Buscar perfis cadastrados na plataforma a partir de uma palavra-chave
 * Busca perfis de usuários cadastrados na plataforma que coincidam com a palavra-chave informada.
 *
 * chave String A palavra-chave para filtrar os resultados da busca
 * returns List
 **/
exports.buscarPerfis = function(chave) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "nome" : "artistaA"
}, {
  "nome" : "artistaA"
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
  "urlMiniatura" : "https://source.unsplash.com/random?wallpapers",
  "nome" : "Painel A",
  "id" : 10,
  "autor" : "artistaB",
  "exposicao" : {
    "urlMiniatura" : "https://source.unsplash.com/random?wallpapers",
    "nome" : "Exposição A",
    "id" : 10,
    "descricao" : "lorem ipsum",
    "organizador" : "artistaB"
  }
}, {
  "urlMiniatura" : "https://source.unsplash.com/random?wallpapers",
  "nome" : "Painel A",
  "id" : 10,
  "autor" : "artistaB",
  "exposicao" : {
    "urlMiniatura" : "https://source.unsplash.com/random?wallpapers",
    "nome" : "Exposição A",
    "id" : 10,
    "descricao" : "lorem ipsum",
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
  "url" : "https://source.unsplash.com/random?wallpapers"
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
  "url" : "https://source.unsplash.com/random?wallpapers"
}, {
  "tipo" : "imagem",
  "nome" : "Imagem A",
  "id" : 10,
  "dataCarregamento" : "2000-01-23",
  "url" : "https://source.unsplash.com/random?wallpapers"
} ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Enviar uma notificação convidando um usuário para uma exposição
 * Envia um convite para participação em uma exposição
 *
 * body NovaNotificacao Dados da exposição, painel e artista que será convidado. (optional)
 * returns ConviteExposicao
 **/
exports.enviarNotificacao = function(body) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "artista" : "artistaA",
  "expoId" : 10,
  "id" : 1001
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Enviar uma notificação convidando um usuário para uma exposição
 * Envia um convite para participação em uma exposição
 *
 * body NovaNotificacao Dados da exposição, painel e artista que será convidado. (optional)
 * returns ConviteExposicao
 **/
exports.enviarNotificacao = function(body) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "artista" : "artistaA",
  "expoId" : 10,
  "id" : 1001
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Remover canal de contato
 * Remove um canal de contato
 *
 * id Long id do contato
 * no response value expected for this operation
 **/
exports.removerContato = function(id) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Cancelar convite para exposição
 * Cancela um convite para uma exposição
 *
 * id Long id do contato
 * no response value expected for this operation
 **/
exports.removerNotificacao = function(id) {
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


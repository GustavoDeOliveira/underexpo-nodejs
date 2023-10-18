'use strict';

var utils = require('../utils/writer.js');
var Perfil = require('../service/PerfilService');

module.exports.aceitarConviteNotificacao = function aceitarConviteNotificacao (req, res, next, id) {
  Perfil.aceitarConviteNotificacao(id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.adicionarArquivoObra = function adicionarArquivoObra (req, res, next, body, id) {
  Perfil.adicionarArquivoObra(body, id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.adicionarObra = function adicionarObra (req, res, next, body) {
  Perfil.adicionarObra(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.adicionarObra = function adicionarObra (req, res, next, body) {
  Perfil.adicionarObra(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.atualizarObra = function atualizarObra (req, res, next, id) {
  Perfil.atualizarObra(id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.buscarNotificacaoPorId = function buscarNotificacaoPorId (req, res, next, id) {
  Perfil.buscarNotificacaoPorId(id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.buscarNotificacoes = function buscarNotificacoes (req, res, next, pagina, quantidade) {
  Perfil.buscarNotificacoes(pagina, quantidade)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.carregarMeusPaineis = function carregarMeusPaineis (req, res, next) {
  Perfil.carregarMeusPaineis()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.carregarMinhasExposicoes = function carregarMinhasExposicoes (req, res, next) {
  Perfil.carregarMinhasExposicoes()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.carregarObra = function carregarObra (req, res, next, id) {
  Perfil.carregarObra(id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.carregarObras = function carregarObras (req, res, next, pagina, quantidade, tipo, ordenacao) {
  Perfil.carregarObras(pagina, quantidade, tipo, ordenacao)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.dispensarConviteNotificacao = function dispensarConviteNotificacao (req, res, next, id) {
  Perfil.dispensarConviteNotificacao(id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.enviarNotificacao = function enviarNotificacao (req, res, next, body) {
  Perfil.enviarNotificacao(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.enviarNotificacao = function enviarNotificacao (req, res, next, body) {
  Perfil.enviarNotificacao(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.removerObra = function removerObra (req, res, next, id) {
  Perfil.removerObra(id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

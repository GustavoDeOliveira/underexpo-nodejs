'use strict';

var utils = require('../utils/writer.js');
var Exposicao = require('../service/ExposicaoService');

module.exports.adicionarMiniaturaExposicao = function adicionarMiniaturaExposicao (req, res, next, body, expoId) {
  const mimeType = req.headers['content-type'];
  Exposicao.adicionarMiniaturaExposicao(body, expoId, req.userId, mimeType)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.adicionarMiniaturaPainel = function adicionarMiniaturaPainel (req, res, next, body, expoId, painelId) {
  const mimeType = req.headers['content-type'];
  Exposicao.adicionarMiniaturaPainel(body, expoId, painelId, req.userId, mimeType)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.atualizarExposicao = function atualizarExposicao (req, res, next, body, expoId) {
  body.userId = req.userId;
  Exposicao.atualizarExposicao(body, expoId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.atualizarPainel = function atualizarPainel (req, res, next, body, expoId, painelId) {
  body.userId = req.userId;
  Exposicao.atualizarPainel(body, expoId, painelId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.buscarExposicoesPublicadas = function buscarExposicoesPublicadas (req, res, next, pagina, quantidade) {
  Exposicao.buscarExposicoesPublicadas(pagina, quantidade)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.carregarExposicaoPorId = function carregarExposicaoPorId (req, res, next, expoId) {
  Exposicao.carregarExposicaoPorId(expoId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.carregarPainelPorId = function carregarPainelPorId (req, res, next, expoId, painelId) {
  Exposicao.carregarPainelPorId(expoId, painelId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.criarPainel = function criarPainel (req, res, next, body, expoId) {
  Exposicao.criarPainel(body, expoId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.denunciarExposicao = function denunciarExposicao (req, res, next, body, expoId) {
  Exposicao.denunciarExposicao(body, expoId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.denunciarExposicao = function denunciarExposicao (req, res, next, body, expoId) {
  Exposicao.denunciarExposicao(body, expoId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.excluirPainel = function excluirPainel (req, res, next, expoId, painelId) {
  Exposicao.excluirPainel(expoId, painelId, req.userId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.organizarExposicao = function organizarExposicao (req, res, next, body) {
  body.userId = req.userId;
  Exposicao.organizarExposicao(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.removerExposicao = function removerExposicao (req, res, next, expoId) {
  Exposicao.removerExposicao(expoId, req.userId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.removerMiniaturaExposicao = function removerMiniaturaExposicao (req, res, next, expoId) {
  Exposicao.removerMiniaturaExposicao(expoId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.removerMiniaturaPainel = function removerMiniaturaPainel (req, res, next, expoId, painelId) {
  Exposicao.removerMiniaturaPainel(expoId, painelId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

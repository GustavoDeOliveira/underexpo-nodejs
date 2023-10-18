'use strict';

var utils = require('../utils/writer.js');
var Exposio = require('../service/ExposioService');

module.exports.adicionarMiniaturaExposicao = function adicionarMiniaturaExposicao (req, res, next, body, expoId) {
  Exposio.adicionarMiniaturaExposicao(body, expoId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.atualizarExposicao = function atualizarExposicao (req, res, next, body, expoId) {
  Exposio.atualizarExposicao(body, expoId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.atualizarExposicao = function atualizarExposicao (req, res, next, body, expoId) {
  Exposio.atualizarExposicao(body, expoId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.atualizarPainel = function atualizarPainel (req, res, next, body, expoId, painelId) {
  Exposio.atualizarPainel(body, expoId, painelId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.atualizarPainel = function atualizarPainel (req, res, next, body, expoId, painelId) {
  Exposio.atualizarPainel(body, expoId, painelId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.buscarExposicoesPublicadas = function buscarExposicoesPublicadas (req, res, next, pagina, quantidade) {
  Exposio.buscarExposicoesPublicadas(pagina, quantidade)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.carregarExposicaoPorId = function carregarExposicaoPorId (req, res, next, expoId) {
  Exposio.carregarExposicaoPorId(expoId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.carregarPainelPorId = function carregarPainelPorId (req, res, next, expoId, painelId) {
  Exposio.carregarPainelPorId(expoId, painelId)
    .then(function (response) {
      if (response) {
        utils.writeJson(res, response);
      } else {
        utils.respondWithCode(404);
      }
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.criarPainel = function criarPainel (req, res, next, body, expoId) {
  Exposio.criarPainel(body, expoId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.criarPainel = function criarPainel (req, res, next, body, expoId) {
  Exposio.criarPainel(body, expoId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.denunciarExposicao = function denunciarExposicao (req, res, next, body, expoId) {
  Exposio.denunciarExposicao(body, expoId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.denunciarExposicao = function denunciarExposicao (req, res, next, body, expoId) {
  Exposio.denunciarExposicao(body, expoId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.excluirPainel = function excluirPainel (req, res, next, expoId, painelId) {
  Exposio.excluirPainel(expoId, painelId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.organizarExposicao = function organizarExposicao (req, res, next, body) {
  Exposio.organizarExposicao(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.organizarExposicao = function organizarExposicao (req, res, next, body) {
  Exposio.organizarExposicao(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.removerExposicao = function removerExposicao (req, res, next, expoId) {
  Exposio.removerExposicao(expoId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.removerMiniaturaExposicao = function removerMiniaturaExposicao (req, res, next, expoId) {
  Exposio.removerMiniaturaExposicao(expoId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

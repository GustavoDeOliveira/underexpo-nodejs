'use strict';
const ConnectionManager = require('./ConnectionManager');

exports.create = async function (convite) {
    const conn = await ConnectionManager.connect();
    try {
        if (conn) {
            const values = [convite.expoId, convite.autorId];
            const query = "INSERT INTO invite (created_at, updated_at, exposition_id, invitee_id, status) VALUES (NOW(), NULL, $1, $2, 'p') RETURNING id;";
            await ConnectionManager.begin(conn);
            const result = await conn.query(query, values);
            if (result.rowCount === 1) {
                await ConnectionManager.commit(conn);
                return result.rows[0].id;
            } else {
                await ConnectionManager.rollback(conn);
                throw new Error(`Esperava afetar 1 linha, {${result.rowCount}} linhas foram afetadas.`);
            }
        }
    } finally {
        ConnectionManager.end(conn);
    }
}

exports.readByExternalId = async function (externalId) {
    const conn = await ConnectionManager.connect();
    try {
        if (conn) {
            const values = [externalId];
            const query = "SELECT id, username, created_at, updated_at FROM profile WHERE external_id = $1;";
            const result = await conn.query(query, values);
            if (result.rowCount === 1) {
                return result.rows[0];
            } else if (result.rowCount > 1) {
                throw new Error(`Esperava carregar 1 linha, {${result.rowCount}} linhas foram carregadas.`);
            }
            return null;
        }
    } finally {
        ConnectionManager.end(conn);
    }
}

exports.searchByUsername = async function (keyword) {
    const conn = await ConnectionManager.connect();
    try {
        if (conn) {
            const values = ['%' + keyword + '%'];
            const query = "SELECT username FROM profile WHERE username ILIKE $1 LIMIT 50";
            const result = await conn.query(query, values);
            return result.rows;
        }
    } finally {
        ConnectionManager.end(conn);
    }
}
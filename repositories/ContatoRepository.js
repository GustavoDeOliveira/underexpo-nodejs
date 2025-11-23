'use strict';
const ConnectionManager = require('./ConnectionManager');

exports.readByUserId = async function(userId, page, pageSize) {
    const conn = await ConnectionManager.connect();
    try {
        if (conn) {
            const values = [userId, (page - 1) * pageSize, pageSize];
            const query = `
                SELECT id, name, channel, url, created_at
                FROM contact
                WHERE profile_id = $1 
                ORDER BY created_at
                OFFSET $2 LIMIT $3
                `;
            const result = await conn.query(query, values);
            return result.rows;
        }
    } finally {
        ConnectionManager.end(conn);
    }
}

exports.create = async function(userId, {nome, canal, link}) {
    const conn = await ConnectionManager.connect();
    try {
        if (conn) {
            const query = `
                INSERT INTO contact (profile_id, "name", channel, url, created_at)
                VALUES ($1, $2, $3, $4, NOW())
                RETURNING id`;
            const result = await conn.query(query, [userId, nome, canal, link]);
            if (result.rowCount === 1) {
                await ConnectionManager.commit(conn);
                return result.rows[0];
            }
            await ConnectionManager.rollback(conn);
            throw new Error(`Esperava afetar 1 linha, {${result.rowCount}} linhas foram afetadas.`);
        }
    } finally {
        ConnectionManager.end(conn);
    }
}

exports.update = async function (id, body) {
    const conn = await ConnectionManager.connect();
    try {
        if (conn) {
            const columns = [];
            const values = [id];
            if (body.nome) {
                columns.push('name');
                values.push(body.nome);
            }
            if (body.canal) {
                columns.push('channel');
                values.push(body.canal);
            }
            if (body.link) {
                columns.push('url');
                values.push(body.link);
            }
            const query = `
            UPDATE contact
            SET ` + columns.map((c, i) => `${c} = $${i+2}`).join(', ') +
            `, updated_at = NOW() WHERE id = $1
            `;
            const result = await conn.query(query, values);
            if (result.rowCount === 1) {
                return result.rows[0];
            } else {
                throw new Error(`Esperava afetar 1 linha, {${result.rowCount}} linhas foram afetadas.`);
            }
        }
    } finally {
        ConnectionManager.end(conn);
    }
}

exports.delete = async function (id) {
    const conn = await ConnectionManager.connect();
    try {
        if (conn) {
            const values = [id];
            const query = `DELETE FROM contact WHERE id = $1`;
            const result = await conn.query(query, values);
            if (result.rowCount === 1) {
                return result.rows[0];
            } else {
                throw new Error(`Esperava afetar 1 linha, {${result.rowCount}} linhas foram afetadas.`);
            }
        }
    } finally {
        ConnectionManager.end(conn);
    }
}

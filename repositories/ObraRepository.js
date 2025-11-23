'use strict';
const ConnectionManager = require('./ConnectionManager');

exports.read = async function (userId, page, pageSize, filters, ordering) {
    const conn = await ConnectionManager.connect();
    try {
        if (conn) {
            const values = [userId, (page - 1) * pageSize, pageSize];
            const query = `
                SELECT id, title, type, created_at, content
                FROM work
                WHERE author_id = $1 
                ${filters === 'audio'
                    ? "AND type = 'A' "
                    : filters === 'imagem'
                        ? "AND type = 'I' "
                        : ""}
                ORDER BY created_at
                ${ordering === 'recente' ? 'DESC' : 'ASC'}
                OFFSET $2 LIMIT $3
                `;
            const result = await conn.query(query, values);
            return result.rows;
        }
    } finally {
        ConnectionManager.end(conn);
    }
}

exports.readById = async function (id, userId) {
    const conn = await ConnectionManager.connect();
    try {
        if (conn) {
            const values = [id, userId];
            const query = `
                SELECT id, created_at
                FROM work
                WHERE id = $1 AND author_id = $2
            `;
            const result = await conn.query(query, values);
            if (result.rowCount < 1)
                return null;

            result.rows[0].filename = `work-${id}-${result.rows[0].created_at.getTime()}`;

            return result.rows[0];
        }
    } finally {
        ConnectionManager.end(conn);
    }
}

exports.isAuthor = async function(id, userId) {
    const conn = await ConnectionManager.connect();
    try {
        if (conn) {
            const values = [id, userId];
            const query = `
            SELECT 1
            FROM work
            WHERE id = $1 AND author_id = $2
            `;
            const result = await conn.query(query, values);
            return result.rowCount;
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
            const query = `
                DELETE FROM work WHERE id = $1
            `;
            ConnectionManager.begin(conn);
            await conn.query(query, values);
            ConnectionManager.commit(conn);
        }
    } catch (e) {
        console.error('Ao deletar obra id %d: %o', id, e);
        ConnectionManager.rollback(conn);

    } finally {
        ConnectionManager.end(conn);
    }
}

exports.create = async function (userId, { nome, tipo }) {
    const conn = await ConnectionManager.connect();
    try {
        if (conn) {
            const values = [userId, nome, tipo[0].toLocaleUpperCase()];
            const query = `
                INSERT INTO work (author_id, title, type, created_at)
                VALUES ($1, $2, $3, NOW())
                RETURNING id;`;
            const result = await conn.query(query, values);
            if (result.rowCount === 1) {
                const resultQuery = `
                SELECT id, title, type, created_at
                FROM work
                WHERE id = $1;
                `;
                const newResult = await conn.query(resultQuery, [result.rows[0].id]);
                if (newResult.rowCount === 1) {
                    await ConnectionManager.commit(conn);
                    return newResult.rows[0];
                }
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
            const set = [];
            const values = [id];

            if (body.conteudo) {
                set.push('content');
                values.push(body.conteudo);
            }
            if (body.nome) {
                set.push('title');
                values.push(body.nome);
            }
            
            const query = `
                UPDATE work
                SET ` + set.map((s, i) => `${s} = $${i + 2}`).join(', ') +
                `, updated_at = NOW()
                WHERE id = $1;`;
            const result = await conn.query(query, values);
            if (result.rowCount === 1) {
                const resultQuery = `
                SELECT id, title, type, content, created_at
                FROM work
                WHERE id = $1;
                `;
                const newResult = await conn.query(resultQuery, [id]);
                if (newResult.rowCount === 1) {
                    await ConnectionManager.commit(conn);
                    return newResult.rows[0];
                }
            }
            await ConnectionManager.rollback(conn);
            throw new Error(`Esperava afetar 1 linha, {${result.rowCount}} linhas foram afetadas.`);
        }
    } finally {
        ConnectionManager.end(conn);
    }
}
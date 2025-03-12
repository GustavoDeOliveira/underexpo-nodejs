'use strict';
const ConnectionManager = require('./ConnectionManager');

exports.create = async function (exposicao) {
    const conn = await ConnectionManager.connect();
    try {
        if (conn) {
            const values = [exposicao.nome, exposicao.descricao, exposicao.userId];
            const query = `
                INSERT INTO exposition
                (created_at, updated_at, name, description, status, miniature_url, author_id)
                VALUES (NOW(), NULL, $1, $2, 'R', NULL, $3) RETURNING id;`;
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

exports.read = async function (id) {
    const conn = await ConnectionManager.connect();
    try {
        if (conn) {
            const values = [id];
            const query = `
            SELECT e.id, e.name, e.description, e.status, e.miniature_url, p.username
            FROM exposition e
            INNER JOIN profile p ON e.author_id = p.id
            WHERE e.id = $1
            `;
            const result = await conn.query(query, values);
            if (result.rowCount > 0) {
                let expo = result.rows[0];

                const inviteQuery = `
                SELECT i.id, p.username
                FROM invite i
                INNER JOIN profile p ON i.invitee_id = p.id
                WHERE i.exposition_id = $1
                `;
                const inviteResult = await conn.query(inviteQuery, [expo.id]);
                if (inviteResult.rowCount > 0) {
                    expo.invites = inviteResult.rows;
                } else {
                    expo.invites = [];
                }

                const panelQuery = `
                SELECT pa.id, pa.miniature_url, pa.name, pr.username
                FROM panel pa
                INNER JOIN profile pr ON pa.author_id = pr.id
                WHERE pa.exposition_id = $1
                `;
                const panelResult = await conn.query(panelQuery, [expo.id]);
                if (panelResult.rowCount > 0) {
                    expo.panels = panelResult.rows;
                } else {
                    expo.panels = [];
                }

                return expo;
            } else {
                return null;
            }
        }
    } finally {
        ConnectionManager.end(conn);
    }
}

exports.readPaged = async function (page, pageSize) {
    const conn = await ConnectionManager.connect();
    try {
        if (conn) {
            const values = [(page - 1) * pageSize, pageSize];
            const query = `
        SELECT e.id, e.name, e.description, e.miniature_url, p.username
        FROM exposition e
        INNER JOIN profile p ON e.author_id = p.id
		OFFSET $1 LIMIT $2
        `;
            const result = await conn.query(query, values);
            return result.rows;
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
            if (body.nome) {
                set.push({name: 'name', value: body.nome});
                values.push(body.nome);
            }
            if (body.descricao) {
                set.push({name: 'description', value: body.descricao});
                values.push(body.descricao);
            }
            const query = `
            UPDATE exposition
            SET ` + set.map((s, i) => `${s.name} = $${i+2}`).join(', ') +
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

exports.isAuthor = async function(id, userId) {
    const conn = await ConnectionManager.connect();
    try {
        if (conn) {
            const values = [id, userId];
            const query = `
            SELECT 1
            FROM exposition
            WHERE id = $1 AND author_id = $2
            `;
            const result = await conn.query(query, values);
            return result.rowCount;
        }
    } finally {
        ConnectionManager.end(conn);
    }
}

exports.readByUserId = async function (userId) {
    const conn = await ConnectionManager.connect();
    try {
        if (conn) {
            const values = [userId];
            const query = `
            SELECT e.id, e.name, e.description, e.miniature_url, p.username
            FROM exposition e
            INNER JOIN profile p ON e.author_id = p.id
            WHERE p.id = $1;
            `;
            const result = await conn.query(query, values);
            return result.rows;
        }
    } finally {
        ConnectionManager.end(conn);
    }
}
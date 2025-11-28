'use strict';
const ConnectionManager = require('./ConnectionManager');

exports.create = async function (exposicao) {
    const conn = await ConnectionManager.connect();
    try {
        if (conn) {
            const values = [exposicao.nome, exposicao.descricao, exposicao.userId];
            const query = `
                INSERT INTO exposition
                (created_at, updated_at, name, description, status, thumbnail_url, author_id)
                VALUES (NOW(), NULL, $1, $2, 'R', NULL, $3) RETURNING id;`;
            await ConnectionManager.begin(conn);
            const result = await conn.query(query, values);
            if (result.rowCount === 1) {
                await ConnectionManager.commit(conn);
                return result.rows[0];
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
            SELECT e.id, e.name, e.description, e.status, e.thumbnail_url, p.username
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
                    AND UPPER(i.status) = UPPER($2)
                `;
                const inviteResult = await conn.query(inviteQuery, [expo.id, 'P']);
                if (inviteResult.rowCount > 0) {
                    expo.invites = inviteResult.rows;
                } else {
                    expo.invites = [];
                }

                const panelQuery = `
                SELECT pa.id, pa.thumbnail_url, pa.name, pr.username
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

exports.readThumbnailData = async function (expoId) {
    const conn = await ConnectionManager.connect();
    try {
        if (conn) {
            const values = [expoId];
            const query = `
            SELECT e.thumbnail_url, e.created_at
            FROM exposition e
            WHERE e.id = $1
            `;
            const result = await conn.query(query, values);
            if (result.rows.length < 1) {
                return null;
            }
            result.rows[0].filename = `expo-${expoId}-thumb-${result.rows[0].created_at.getTime()}`;
            return result.rows[0];
        }
    } finally {
        ConnectionManager.end(conn);
    }
}

exports.readPanelThumbnailData = async function (expoId) {
    const conn = await ConnectionManager.connect();
    try {
        if (conn) {
            const values = [expoId];
            const query = `
            SELECT id, thumbnail_url, created_at
            FROM panel
            WHERE exposition_id = $1
            `;
            const result = await conn.query(query, values);
            if (result.rows.length < 1) {
                return [];
            }
            const panels = result.rows.map(p => ({...p, filename: `panel-${p.id}-thumb-${p.created_at.getTime()}` }));
            return panels;
        }
    } finally {
        ConnectionManager.end(conn);
    }
}

exports.readPaged = async function (page, pageSize, userId) {
    const conn = await ConnectionManager.connect();
    try {
        if (conn) {
            const values = [(page - 1) * pageSize, pageSize];
            if (userId) {
                values[2] = userId;
            }
            const query = `
        SELECT e.id, e.name, e.description, e.thumbnail_url, p.username
        FROM exposition e
        INNER JOIN profile p ON e.author_id = p.id
        ${userId ? 'WHERE NOT EXISTS (SELECT 1 FROM report r WHERE r.exposition_id = e.id AND r.profile_id = $3)':''}
		OFFSET $1 LIMIT $2
        `;
            const result = await conn.query(query, values);
            return result.rows;
        }
    } catch (e) {
        console.error(e);
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
            if (body.descricao) {
                columns.push('description');
                values.push(body.descricao);
            }
            if (body.thumbnail) {
                columns.push('thumbnail_url');
                values.push(body.thumbnail);
            }
            ConnectionManager.begin(conn);
            const query = `
            UPDATE exposition
            SET ` + columns.map((c, i) => `${c} = $${i+2}`).join(', ') +
            `, updated_at = NOW() WHERE id = $1
            `;
            const result = await conn.query(query, values);
            if (result.rowCount === 1) {
                const selectQuery = `
                SELECT id, name, description, thumbnail_url
                FROM exposition
                WHERE id = $1
                `;
                const selectResult = await conn.query(selectQuery, [id]);
                if (selectResult.rowCount === 1) {
                    ConnectionManager.commit(conn);
                    return selectResult.rows[0];
                } else {
                    ConnectionManager.rollback(conn);
                    throw new Error('Erro ao recuperar exposição após atualização.');
                }
            } else {
                ConnectionManager.rollback(conn);
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
            SELECT e.id, e.name, e.description, e.thumbnail_url, p.username
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

exports.delete = async function (id) {
    const conn = await ConnectionManager.connect();
    try {
        if (conn) {
            const values = [id];
            const query = `
            DELETE FROM exposition WHERE id = $1;
            `;
            await ConnectionManager.begin(conn);
            const result = await conn.query(query, values);
            if (result.rowCount === 1) {
                await ConnectionManager.commit(conn);
            }
            else {
                await ConnectionManager.rollback(conn);
                throw new Error(`Esperava afetar 1 linha, {${result.rowCount}} linhas foram afetadas.`);
            }
        }
    } catch (e) {
        console.log(e);
        throw e;
    } finally {
        ConnectionManager.end(conn);
    }
}
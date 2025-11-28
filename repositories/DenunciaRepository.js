'use strict';
const ConnectionManager = require('./ConnectionManager');

exports.create = async function (expoId, userId, description) {
    const conn = await ConnectionManager.connect();
    try {
        if (conn) {
            const values = [expoId, userId, description];
            const query = `
                INSERT INTO report
                (created_at, updated_at, exposition_id, profile_id, description)
                VALUES (NOW(), NULL, $1, $2, $3) RETURNING id;`;
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
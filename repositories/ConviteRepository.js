'use strict';
const Api404Error = require('../errorHandler/errors/api404Error');
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

exports.readByUserId = async function (userId, status) {
    const conn = await ConnectionManager.connect();
    try {
        if (conn) {
            const values = [userId, status];
            const query = `
                SELECT i.id, i.status, e.id AS expo_id, e.name AS expo_name, p.username
                FROM invite i
                INNER JOIN exposition e
                    ON i.exposition_id = e.id
                INNER JOIN profile p
                    ON e.author_id = p.id
                WHERE invitee_id = $1
                    AND UPPER(i.status) = UPPER($2);`;
            const result = await conn.query(query, values);
            return result.rows;
        }
    } catch (e) {
        console.err(e);
    } finally {
        ConnectionManager.end(conn);
    }
}

exports.accept = async function (id) {
    const conn = await ConnectionManager.connect();
    try {
        if (conn) {
            await ConnectionManager.begin(conn);

            const values = [id];
            const query = "SELECT exposition_id, invitee_id, status FROM invite WHERE id = $1";
            const result = await conn.query(query, values);
            if (result.rowCount !== 1) {
                await ConnectionManager.rollback(conn);
                throw new Api404Error("Notificação não encontrada.")
            }
            const invite = result.rows[0];
            if (invite.status.toLocaleUpperCase() !== 'P') {
                await ConnectionManager.rollback(conn);
                throw new Error("Notificação não pode ser aceita.");
            }
            
            const newPanelValues = [invite.exposition_id, invite.invitee_id, 'Meu novo Painel!', 'R'];
            const newPanelQuery = `INSERT INTO panel (created_at, updated_at, exposition_id, author_id, name, status)
                                            VALUES (NOW(), null, $1, $2, $3, $4) RETURNING id;`;
            const newPanelResult = await conn.query(newPanelQuery, newPanelValues);
            if (result.rowCount !== 1) {
                await ConnectionManager.rollback(conn);
                throw new Error("Não foi possível criar o Painel.");
            }
            
            const inviteQuery = `
                UPDATE invite SET updated_at = NOW(), status = 'A' WHERE id = $1;
            `;
            const inviteValues = [id];
            const inviteResult = await conn.query(inviteQuery, inviteValues);
            if (inviteResult.rowCount !== 1) {
                await ConnectionManager.rollback(conn);
                throw new Error("Não foi possível atualizar o Convite.");
            }

            ConnectionManager.commit(conn);
            return newPanelResult.rows[0];
        }
    } finally {
        ConnectionManager.end(conn);
    }
}

exports.reject = async function (id, userId) {
    const conn = await ConnectionManager.connect();
    try {
        if (conn) {
            await ConnectionManager.begin(conn);

            const values = [id, userId];
            const query = `
            SELECT i.exposition_id, i.invitee_id, i.status
            FROM invite i
            INNER JOIN exposition e
                ON i.exposition_id = e.id
            WHERE i.id = $1
                AND (i.invitee_id = $2 OR e.author_id = $2)`;
            const result = await conn.query(query, values);
            if (result.rowCount !== 1) {
                await ConnectionManager.rollback(conn);
                throw new Api404Error("Convite não encontrado.")
            }
            const invite = result.rows[0];
            if (invite.status.toLocaleUpperCase() !== 'P') {
                await ConnectionManager.rollback(conn);
                throw new Error("Convite não pode ser rejeitado.");
            }
            
            const inviteQuery = `
                UPDATE invite SET updated_at = NOW(), status = 'R' WHERE id = $1;
            `;
            const inviteValues = [id];
            const inviteResult = await conn.query(inviteQuery, inviteValues);
            if (inviteResult.rowCount !== 1) {
                await ConnectionManager.rollback(conn);
                throw new Error("Não foi possível atualizar o Convite.");
            }

            ConnectionManager.commit(conn);
            return;
        }
    } finally {
        ConnectionManager.end(conn);
    }
}
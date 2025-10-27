'use strict';
const ConnectionManager = require('./ConnectionManager');

exports.read = async function (id) {
    const conn = await ConnectionManager.connect();
    try {
        if (conn) {
            const values = [id];
            const query = `
            SELECT pan.id, pan.name, pro.username
            FROM panel pan
            INNER JOIN profile pro ON pan.author_id = pro.id
            WHERE pan.id = $1
            `;
            const result = await conn.query(query, values);
            if (result.rowCount > 0) {
                let panel = result.rows[0];

                const elementQuery = `
                SELECT e.id, e.title, e.content, e.type, e.work_id
                FROM element e
                WHERE e.panel_id = $1
                `;
                const elementResult = await conn.query(elementQuery, [panel.id]);
                panel.elements = elementResult.rows;
                
                return panel;
            } else {
                return null;
            }
        }
    } finally {
        ConnectionManager.end(conn);
    }
}

// TODO Alterar função para consultar pelo id do usuário
exports.readByUserId = async function (userId) {
    const conn = await ConnectionManager.connect();
    try {
        if (conn) {
            const values = [userId];
            const query = `
            SELECT
                pan.id as panel_id, pan.name as panel_name, pan.miniature_url as panel_miniature_url, pro.username as panel_author,
                exp.id as expo_id, exp.name as expo_name, exp.miniature_url as expo_miniature_url, exp.description as expo_description, exp_pro.username as expo_author
            FROM panel pan
            INNER JOIN profile pro ON pan.author_id = pro.id
            INNER JOIN exposition exp ON pan.exposition_id = exp.id
            INNER JOIN profile exp_pro ON exp.author_id = exp_pro.id
            WHERE pro.id = $1
            `;
            const result = await conn.query(query, values);
            if (result.rowCount > 0) {
                return result.rows;
            } else {
                return null;
            }
        }
    } finally {
        ConnectionManager.end(conn);
    }
}

exports.update = async function (panelId, body) {
    const conn = await ConnectionManager.connect();
    try {
        if (conn) {
            body.elementos.forEach(async element => {
                if (element.id && element.removendo) {
                    await deleteElement(element, conn);
                } else if (element.id) {
                    await updateElement(element.id, element, conn);
                } else {
                    await insertElement(element, panelId, conn);
                }
            });
            
            const values = [panelId, body.nome];
            let query = `
                UPDATE panel
                SET ${body.nome ? 'name = $2,' : ''} updated_at = NOW() WHERE id = $1
            `;
            let result = await conn.query(query, values);
            if (result.rowCount !== 1) {
                throw new Error(`Esperava afetar 1 linha, {${result.rowCount}} linhas foram afetadas.`);
            }

            query = 'SELECT id, work_id, title, type, content FROM element WHERE panel_id = $1 ORDER BY index';
            result = await conn.query(query, [panelId]);
            return result.rows;
        }
    } finally {
        ConnectionManager.end(conn);
    }
}

async function insertElement(element, panelId, conn) {
    const query = `
                        INSERT INTO element
                        (work_id, panel_id, title, type, content, index, created_at)
                        VALUES ($1, $2, $3, $4, $5, $6, NOW())
                    `;
    const values = [element.obraId, panelId, element.titulo, element.tipo.charAt(0).toLocaleUpperCase(), element.conteudo, element.indice];
    const result = await conn.query(query, values);
    if (result > 1) {
        ConnectionManager.rollback(conn);
        throw new Error(`Esperava inserir 1 linha, ${result.rowCount} linhas foram inseridas.`);
    }
}

async function updateElement(id, element, conn) {
    const set = [];
    const values = [id];
    if (element.obraId) {
        set.push({ name: 'work_id', value: element.obraId });
        values.push(element.obraId);
    }
    if (element.titulo) {
        set.push({ name: 'title', value: element.titulo });
        values.push(element.titulo);
    }
    if (element.conteudo) {
        set.push({ name: 'content', value: element.conteudo });
        values.push(element.conteudo);
    }
    if (element.indice) {
        set.push({ name: 'index', value: element.indice });
        values.push(element.indice);
    }
    const query = `
                    UPDATE element
                    SET ` + set.map((s, i) => `${s.name} = $${i + 2}`).join(', ') +
        `, updated_at = NOW() WHERE id = $1
                    `;
    const result = await conn.query(query, values);
    if (result > 1) {
        ConnectionManager.rollback(conn);
        throw new Error(`Esperava inserir 1 linha, ${result.rowCount} linhas foram inseridas.`);
    }
}

async function deleteElement(element, conn) {
    const query = `DELETE FROM element WHERE id = $1`;
    const values = [element.id];
    const result = await conn.query(query, values);
    if (result > 1) {
        ConnectionManager.rollback(conn);
        throw new Error(`Esperava remover 1 ou 0 linhas, ${result.rowCount} linhas foram removidas.`);
    }
}

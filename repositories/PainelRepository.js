'use strict';
const ConnectionManager = require('./ConnectionManager');

exports.read = async function (id) {
    const conn = await ConnectionManager.connect();
    try {
        if (conn) {
            const values = [id];
            const query = `
            SELECT pan.id, pan.name, pro.username, pan.author_id
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

                const contactQuery = `
                SELECT c.id, c.channel, c.name, c.url
                FROM contact c
                WHERE c.profile_id = $1
                `;
                const contactResult = await conn.query(contactQuery, [panel.author_id]);
                panel.contacts = contactResult.rows;
                
                return panel;
            } else {
                return null;
            }
        }
    } finally {
        ConnectionManager.end(conn);
    }
}

exports.readThumbnailData = async function (id) {
    const conn = await ConnectionManager.connect();
    try {
        if (conn) {
            const values = [id];
            const query = `
            SELECT p.thumbnail_url, p.created_at
            FROM panel p
            WHERE p.id = $1
            `;
            const result = await conn.query(query, values);
            if (result.rows.length < 1) {
                return null;
            }
            result.rows[0].filename = `panel-${id}-thumb-${result.rows[0].created_at.getTime()}`;
            return result.rows[0];
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
                pan.id as panel_id, pan.name as panel_name, pan.thumbnail_url as panel_thumbnail_url, pro.username as panel_author,
                exp.id as expo_id, exp.name as expo_name, exp.thumbnail_url as expo_thumbnail_url, exp.description as expo_description, exp_pro.username as expo_author
            FROM panel pan
            INNER JOIN profile pro ON pan.author_id = pro.id
            INNER JOIN exposition exp ON pan.exposition_id = exp.id
            INNER JOIN profile exp_pro ON exp.author_id = exp_pro.id
            WHERE pro.id = $1
            `;
            const result = await conn.query(query, values);
            return result.rows;
        }
    } catch (e) {
        console.log(e);
        throw e;
    } finally {
        ConnectionManager.end(conn);
    }
}

exports.update = async function (panelId, body) {
    const conn = await ConnectionManager.connect();
    try {
        if (conn) {
            if (body && body.elementos) {
                body.elementos.forEach(async element => {
                    if (element.id && element.removendo) {
                        await deleteElement(element, conn);
                    } else if (element.id) {
                        await updateElement(element.id, element, conn);
                    } else {
                        await insertElement(element, panelId, conn);
                    }
                });
            }
            
            const columns = [];
            const values = [panelId];

            if (body.nome) {
                columns.push('name');
                values.push(body.nome);
            }
            if (body.thumbnail) {
                columns.push('thumbnail_url');
                values.push(body.thumbnail);
            }

            const query = `
                UPDATE panel
                SET ` + columns.map((c, i) => `${c} = $${i+2}`).join(', ') +
            `, updated_at = NOW() WHERE id = $1
            `;
            const result = await conn.query(query, values);
            if (result.rowCount !== 1) {
                throw new Error(`Esperava afetar 1 linha, {${result.rowCount}} linhas foram afetadas.`);
            }

            const selectPanelQuery = 'SELECT id, name, author_id, thumbnail_url FROM panel WHERE id = $1';
            const selectPanelResult = await conn.query(selectPanelQuery, [panelId]);

            if (result.rowCount !== 1) {
                conn.rollback();
                throw new Error('Não foi possível recuperar o painel após a atualização.');
            }

            const panel = selectPanelResult.rows[0];

            const selectElementsQuery = 'SELECT id, work_id, title, type, content FROM element WHERE panel_id = $1 ORDER BY index';
            const selectElementsResult = await conn.query(selectElementsQuery, [panelId]);

            panel.elements = selectElementsResult.rows;

            return panel;
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
    if (element.indice >= 0) {
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

exports.isAuthor = async function(id, userId) {
    const conn = await ConnectionManager.connect();
    try {
        if (conn) {
            const values = [id, userId];
            const query = `
            SELECT 1
            FROM panel
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
            DELETE FROM panel WHERE id = $1;
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
'use strict'
const pg = require('pg');
const { Pool } = pg;
const pool = new Pool();

async function end(connection) {
    if (connection) {
        await connection.release();
    }
}

exports.connect = async function () {
    try {
        return await pool.connect();
    } catch (error) {
        console.error(error);
        throw new Error("Could not connect to database.")
    }
}

exports.begin = async function(connection) {
    await connection.query('BEGIN');
}

exports.commit = async function(connection) {
    await connection.query('COMMIT');
}

exports.rollback = async function(connection) {
    await connection.query('ROLLBACK');
}

exports.end = async function(connection) {
    await end(connection);
}
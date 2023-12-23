import pg from 'pg';
import { envs } from '../config/plugins/envs.js';
const { Pool } = pg;

const pool = new Pool({
  connectionString: envs.POSTGRES_URL,
  max: 10,
  idleTimeoutMillis: 10000,
});

export const query = async (query, params) => {
  let client;

  try {
    client = await pool.connect();
    await client.query('BEGIN')
    const result = await client.query(query, params);
    await client.query('COMMIT')
    return result;
  } catch (error) {
    await client.query('ROLLBACK');
    console.error(error);
    throw error;
  } finally {
    if (client) {
      client.release();
    }
  }
};

export const multyQuery = async (statements = {}) => {
  let client;

  const { queries, params } = statements;

  try {
    client = await pool.connect();
    await client.query('BEGIN')
    const results = await Promise.all(queries.map((query, index) => {
      return client.query(query, params[index].map(param => param));
    }))
    await client.query('COMMIT')
    return results;
  } catch (error) {
    await client.query('ROLLBACK');
    console.error(error);
    throw error;
  } finally {
    if (client) {
      client.release();
    }
  }
};
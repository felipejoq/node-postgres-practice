import pg from 'pg';
const { Pool } = pg;

const pool = new Pool({
  max: 10,
  idleTimeoutMillis: 10000,
  // ssl: true,
});

export const query = async (query, params) => {
  let client;

  try {
    client = await pool.connect();
    try {
      await client.query('BEGIN');
      const result = await client.query(query, params);
      await client.query('COMMIT');
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
  } catch (error) {
    console.error('Error al conectar al pool de PostgreSQL:', error);
    throw error;
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
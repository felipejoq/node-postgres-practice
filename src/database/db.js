import pg from 'pg'

export const query = async (text, params, callback) => {
  const pool = new pg.Pool()
  return await pool.query(text, params, callback)
}

export const queryClient = async (text, params, callback) => {

  const client = new pg.Client();
  await client.connect()
  const res = await client.query(text, params, callback);
  await client.end();
  return res;

}
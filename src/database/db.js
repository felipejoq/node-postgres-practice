import pg from 'pg'

export const queryTask = async () => {

}

export const query = async (text, params, callback) => {
  // const pool = new pg.Pool()
  // return pool.query(text, params, callback)

  const client = new pg.Pool()
  await client.connect();
  try {
    client.query('BEGIN')
    const res = client.query(text, params, callback);
    // await client.end();
    await client.query('COMMIT')
    return res;
  } catch (error) {
    await client.query('ROLLBACK')
    throw error
  } finally {
    client.end();
  }

}

// export const query = async (text, params, callback) => {
//   const client = new pg.Client();
//   await client.connect();
//   try {
//     client.query('BEGING')
//     const res = client.query(text, params, callback);
//     await client.end();
//     await client.query('COMMIT')
//     return res;
//   } catch (error) {
//     await client.query('ROLLBACK')
//     throw error
//   } finally {
//     client.release()
//   }

// }
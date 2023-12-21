import pg from 'pg'
 
const pool = new pg.Pool()
 
export const query = async (text, params, callback) => {
  return pool.query(text, params, callback)
}
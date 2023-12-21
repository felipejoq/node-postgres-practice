export const GET_USERS = 'SELECT name, email FROM users';

export const GET_USER_BY_ID = `SELECT name, email
                               FROM users
                               WHERE id = $1::number`;

export const GET_USER_BY_EMAIL = `SELECT email
                                  FROM users
                                  WHERE email = $1::text`;

export const GET_USERS_PAGINATE = `SELECT name, email
                                   FROM users
                                   LIMIT $1::number
                                   OFFSET $2::number`;

export const CREATE_USER = `INSERT INTO
                            users (username, email, password)
                            VALUES
                            ($1, $2, $3)`
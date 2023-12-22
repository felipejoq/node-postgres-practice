export const GET_USERS = 'SELECT username, email FROM users';

export const GET_TOTAL_USERS = `SELECT COUNT(*) FROM users`;

export const GET_USER_BY_ID = `SELECT username, email
                               FROM users
                               WHERE id = $1::number`;

export const GET_USER_BY_EMAIL = `SELECT email
                                  FROM users
                                  WHERE email = $1::text`;

export const GET_USERS_PAGINATE = `SELECT id, username, email
                                   FROM users
                                   OFFSET $1
                                   LIMIT $2`;

export const GET_USERS_AND_ROLES_PAGINATE = `SELECT u.id, u.username, u.email, ARRAY_AGG(
                                              json_build_object(
                                                'id',r.id,
                                                'rol', r.rol
                                              )) AS roles
                                             FROM users AS u
                                             INNER JOIN users_roles AS ur
                                             ON u.id = ur.user_id
                                             INNER JOIN roles AS r
                                             ON r.id = ur.role_id
                                             GROUP BY u.id, u.username, u.email
                                             OFFSET $1
                                             LIMIT $2`;

export const CREATE_USER = `INSERT INTO
                            users (username, email, password)
                            VALUES
                            ($1, $2, $3)`


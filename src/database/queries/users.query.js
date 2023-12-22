export const GET_USERS = 'SELECT username, email FROM users';

export const GET_TOTAL_USERS = `SELECT COUNT(*) FROM users`;

export const GET_USER_BY_ID_WITH_ROLES = `SELECT u.id, u.name, u.email, u.active, ARRAY_AGG(
                                            json_build_object(
                                              'id',r.id,
                                              'role', r.role
                                            )) AS roles
                                          FROM users AS u
                                          JOIN users_roles AS ur
                                          ON u.id = ur.user_id
                                          JOIN roles AS r
                                          ON ur.role_id = r.id
                                          WHERE u.id = $1
                                          GROUP BY u.id, u.name, u.email, u.active`;

export const GET_ROL_BY_ID = `SELECT * FROM roles WHERE id = $1`;

export const GET_ALL_ROLES_ID = `SELECT ARRAY_AGG(id) AS rolesid FROM roles`;

export const GET_USER_BY_EMAIL = `SELECT id, name, email
                                  FROM users
                                  WHERE email = $1::text`;

export const GET_USERS_PAGINATE = `SELECT id, name, email
                                   FROM users
                                   OFFSET $1
                                   LIMIT $2`;

export const GET_USERS_AND_ROLES_PAGINATE = `SELECT u.id, u.name, u.email, u.active, ARRAY_AGG(
                                              json_build_object(
                                                'id',r.id,
                                                'role', r.role
                                              )) AS roles
                                             FROM users AS u
                                             INNER JOIN users_roles AS ur
                                             ON u.id = ur.user_id
                                             INNER JOIN roles AS r
                                             ON r.id = ur.role_id
                                             GROUP BY u.id, u.name, u.email, u.active
                                             OFFSET $1
                                             LIMIT $2`;

export const CREATE_USER = `INSERT INTO
                            users (name, email, password)
                            VALUES
                            ($1, $2, $3) RETURNING *`;

export const SET_ROL_TO_USER = `INSERT INTO users_roles (user_id, role_id)
                                VALUES ($1, $2) RETURNING *`;


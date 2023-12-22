import { CustomError } from "../config/errors/custom.errors.js";
import { Encoder } from "../config/plugins/encoder.js";
import { query } from "../database/db.js";
import {
  CREATE_USER,
  GET_TOTAL_USERS,
  GET_USERS_AND_ROLES_PAGINATE,
  GET_USER_BY_EMAIL
} from "../database/queries/users.query.js";
import { User } from "../domain/models/User.js"

export class UserService {
  constructor() { }

  async getUsers({ page, limit }) {

    const [usersResult, totalResult] = await Promise.all([
      query(GET_USERS_AND_ROLES_PAGINATE, [(page - 1) * limit, limit]),
      query(GET_TOTAL_USERS)
    ]);

    const users = usersResult?.rows;
    const total = parseInt(totalResult?.rows[0].count);
    const haveNext = (page * limit < total);
    const havePrev = (page - 1 > 0) && (page + limit <= total);

    return {
      page,
      limit,
      total,
      next: haveNext ? `/v1/user?page=${(page + 1)}&limit=${limit}` : null,
      prev: havePrev ? `/v1/user?page=${(page - 1)}&limit=${limit}` : null,
      users: users,
    };

  }

  async saveUser(userDto) {

    const result = await query(GET_USER_BY_EMAIL, [userDto.email]);

    if (result.rows.length >= 1)
      throw CustomError.badRequest('Usuario ya existe');

    userDto.password = await Encoder.getHash(userDto.password)

    const newUser = new User(userDto);

    const { username, email, password } = newUser;

    await query(CREATE_USER, [username, email, password]);

    delete newUser.password;

    return newUser;

  }

  async updateUser(userDto) {
    throw new Error('Method userservice.updateUser not implemented')
  }

}
import { CustomError } from "../config/errors/custom.errors.js";
import { Encoder } from "../config/plugins/encoder.js";
import { query } from "../database/db.js";
import { CREATE_USER, GET_USERS_PAGINATE, GET_USER_BY_EMAIL } from "../database/queries/users.query.js";
import { User } from "../models/User.js"

export class UserService {
  constructor() { }

  static async getUsers() {
    const result = await query(GET_USERS_PAGINATE, [5, 0]);
    console.log(result);
  }

  static async saveUser(userDto) {

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

  static async updateUser(userDto) {
    throw new Error('Method userservice.updateUser not implemented')
  }

}
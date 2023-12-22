import { CustomError } from "../config/errors/custom.errors.js";
import { Encoder } from "../config/plugins/encoder.js";
import { query } from "../database/db.js";
import {
  CREATE_USER,
  GET_TOTAL_USERS,
  GET_USERS_AND_ROLES_PAGINATE,
  GET_USER_BY_EMAIL,
  GET_USER_BY_ID_WITH_ROLES,
} from "../database/queries/users.query.js";
import { User } from "../domain/models/User.js"

export class UserService {
  constructor(roleService) {
    this.roleService = roleService;
  }

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
      next: haveNext ? `/api/v1/user?page=${(page + 1)}&limit=${limit}` : null,
      prev: havePrev ? `/api/v1/user?page=${(page - 1)}&limit=${limit}` : null,
      users: users,
    };

  }

  async getUserById(id) {
    const result = await query(GET_USER_BY_ID_WITH_ROLES, [id]);
    const user = result.rows[0];

    if (!user)
      throw CustomError.notFound('El usuario no existe o la id es inválida.');

    return user;
  }

  async saveUser(userDto) {

    await this.roleService.checkRoles(userDto.roles);

    const { rows: exists } = await query(GET_USER_BY_EMAIL, [userDto.email]);

    if (exists.length >= 1)
      throw CustomError.badRequest('Usuario ya existe');

    userDto.password = await Encoder.getHash(userDto.password)

    const newUser = new User(userDto);

    const { name, email, password, roles } = newUser;

    const { rows: [user] } = await query(CREATE_USER, [name, email, password]);

    const rolesUser = await this.roleService.setRoleToUser(user.id, roles);

    delete user.password;
    user.roles = rolesUser;

    return user;

  }

  async updateUserById(userDto) {
    throw new Error('Method userservice.updateUser not implemented')
  }

  async deleteUserById(id) {

  }

}
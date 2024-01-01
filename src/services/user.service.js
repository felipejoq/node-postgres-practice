import { CustomError } from "../config/errors/custom.errors.js";
import { JwtAdapter } from "../config/plugins/Jwt.js";
import { Encoder } from "../config/plugins/encoder.js";
import { firebaseConfig } from "../config/storage/firebase.js";
import { query } from "../database/db.js";
import {
  CREATE_USER,
  DELETE_USER_BY_ID,
  GET_TOTAL_USERS,
  GET_USERS_AND_ROLES_PAGINATE,
  GET_USER_BY_EMAIL_WITH_ROLES,
  GET_USER_BY_ID_WITH_ROLES,
  UPDATE_USER_BY_ID,
  UPDATE_USER_IMAGE_BY_ID,
} from "../database/queries/users.query.js";
import { User } from "../domain/models/User.js"
import { ImagesService } from "./images.service.js";
import { RoleService } from "./role.service.js";

export class UserService {
  constructor() {
    this.roleService = new RoleService();
    this.imageService = new ImagesService(firebaseConfig);
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

    const { rows: [user] } = await query(GET_USER_BY_ID_WITH_ROLES, [id]);

    if (!user)
      throw CustomError.notFound('El usuario no existe o la id es inválida');

    return user;
  }

  async getUserByEmail(email) {
    const result = await query(GET_USER_BY_EMAIL_WITH_ROLES, [email]);
    const user = result.rows[0];

    if (!user)
      throw CustomError.notFound('El usuario no existe o el email no es válido');

    return user;
  }

  async registerUser(userDto) {

    await this.roleService.checkAllowedRoles(userDto.roles);

    const { rows: exists } = await query(GET_USER_BY_EMAIL_WITH_ROLES, [userDto.email]);

    if (exists.length > 0)
      throw CustomError.badRequest('Usuario ya existe');

    userDto.password = await Encoder.getHash(userDto.password)

    const newUser = new User(userDto);

    const { name, email, password, roles } = newUser;

    const { rows: [user] } = await query(CREATE_USER, [name, email, password]);

    const rolesUser = await this.roleService.setRoleUser(user.id, roles[0]);

    delete user.password;
    user.roles = rolesUser;

    return user;

  }

  async loginUser(email, password) {

    const user = await this.getUserByEmail(email);
    if (!user) throw CustomError.badRequest('Email or Password are not valid');

    if (!user.active)
      throw CustomError.forbidden('Usuario inactivo.');

    const isMatching = await Encoder.compareHash(password, user.password)
    if (!isMatching) throw CustomError.badRequest('Email or Password are not valid');

    delete user.password;

    const token = await JwtAdapter.generateToken({ id: user.id });
    if (!token) throw CustomError.internalServer('Error while creating JWT');

    return {
      user: {
        ...user,
        token: token,
      }
    }

  }

  async updateUserById(userDto) {

    await this.roleService.checkAllowedRoles(userDto.roles);

    const user = await this.getUserById(userDto.id);

    await query(UPDATE_USER_BY_ID, [userDto.name, userDto.email, userDto.active, user.id]);

    const userDb = await this.getUserById(userDto.id);

    return userDb;
  }

  async updateStatusUser(id) {
    const user = await this.getUserById(id);

    if (user.roles.some(({ role }) => role === 'ADMIN'))
      throw CustomError.badRequest('El usuario es ADMIN');

    if (!user)
      throw CustomError.badRequest('El usuario no existe');

    const isUpdate = await this.roleService.updateStatusUser(user);

    if (isUpdate) return await this.getUserById(id);

    throw CustomError.internalServer('Error al actualizar el usuario');

  }

  async updateUserImageById({ userId, files }) {

    if (files.length > 1)
      throw CustomError.badRequest('Solo se permite una imagen de perfil');

    const user = await this.getUserById(userId);

    if (!user)
      throw CustomError.badRequest('El usuario no existe');

    const urlNewImage = await this.imageService.uploadImage(files[0], 'users');

    await query(UPDATE_USER_IMAGE_BY_ID, [urlNewImage, userId]);

    const userUpdated = await this.getUserById(userId);

    return userUpdated;

  }

  async updateRolesUser(userId, roles, userAction) {

    await this.roleService.checkAllowedRoles(roles);

    const user = await this.getUserById(userId);

    // Comprobar si el usuario que se quiere actualizar es Admin
    const isAdmin = user.roles.some(({ role }) => role === 'ADMIN');
    const isUpdatingItSelf = user.id === userAction.id;

    console.log({ userId, roles, userAction, isAdmin, isUpdatingItSelf });

    if (isAdmin && isUpdatingItSelf) {
      if (!roles.some(id => id === 1)) {
        throw CustomError.badRequest('Un administrador no puede eliminar su rol de administrador');
      }
    }

    await this.roleService.updatedRolesUser(userId, roles);

    return await this.getUserById(userId);
  }

  async deleteUserById(id) {

    await this.getUserById(id);

    const { rows: [userDeleted] } = await query(DELETE_USER_BY_ID, [id]);

    delete userDeleted.password

    return userDeleted;
  }

}
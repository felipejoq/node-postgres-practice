import { CustomError } from "../config/errors/custom.errors.js";
import { query } from "../database/db.js";
import {
  DELETE_USERS_ROLES_BY_USER_ID,
  GET_ALL_ROLES_ID,
  GET_ROLE_BY_ID,
  GET_ROL_BY_ID,
  SET_ROL_TO_USER,
  UPDATE_STATUS_USER_BY_ID
} from "../database/queries/users.query.js";

export class RoleService {

  constructor() { }

  async getRolById(id) {
    const { rows: role } = await query(GET_ROLE_BY_ID, [id]);

    return role;
  }

  async setRolesUser(userId, roles = []) {

    await Promise.all(roles.map(rolId => {
      return query(SET_ROL_TO_USER, [userId, rolId]);
    }));

    const rolesAsigned = await Promise.all(roles.map(rolId => {
      return query(GET_ROL_BY_ID, [rolId]);
    }));

    return rolesAsigned.map(result => result.rows[0]);

  }

  async setRoleUser(userId, idRole) {
    await query(SET_ROL_TO_USER, [userId, idRole]);
    const role = await this.getRolById(idRole);
    return role;
  }

  async updatedRolesUser(userId, newRoles) {

    await query(DELETE_USERS_ROLES_BY_USER_ID, [userId]);

    return await this.setRolesUser(userId, newRoles);

  }

  async updateStatusUser(user) {
    const status = !user.active;
    const { rows: [userDb] } = await query(UPDATE_STATUS_USER_BY_ID, [status, user.id]);

    if (!userDb) return false;
    
    return true;
  }

  async checkAllowedRoles(roles) {
    const { rows: [{ rolesid }] } = await query(GET_ALL_ROLES_ID);

    const isContained = roles.every((role) => {
      return rolesid.includes(role.toString());
    });

    if (!isContained)
      throw CustomError.badRequest(`Roles permitidos: [${rolesid}]`);

    return isContained;
  }

}
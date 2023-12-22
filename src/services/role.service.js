import { CustomError } from "../config/errors/custom.errors.js";
import { query } from "../database/db.js";
import {
  GET_ALL_ROLES_ID,
  GET_ROL_BY_ID,
  SET_ROL_TO_USER
} from "../database/queries/users.query.js";

export class RoleService {

  constructor() { }

  async setRoleUser(userId, roles = []) {

    await Promise.all(roles.map(rolId => {
      return query(SET_ROL_TO_USER, [userId, rolId]);
    }));

    const rolesAsigned = await Promise.all(roles.map(rolId => {
      return query(GET_ROL_BY_ID, [rolId])
    }));

    return rolesAsigned.map(result => result.rows[0]);

  }

  async checkAllowedRoles(roles) {
    const { rows: [{ rolesid }] } = await query(GET_ALL_ROLES_ID);

    const isContained = roles.every((role) => {
      return rolesid.includes(role);
    });

    if (!isContained)
      throw CustomError.badRequest(`Roles permitidos: [${rolesid}]`);

    return isContained;
  }

}
import { CustomError } from "../config/errors/custom.errors.js";
import { query } from "../database/db.js";
import {
  GET_ALL_ROLES_ID,
  GET_ROL_BY_ID,
  SET_ROL_TO_USER
} from "../database/queries/users.query.js";

export class RoleService {

  constructor() { }

  async setRoleToUser(userId, roles = []) {

    await Promise.all(roles.map(rolId => {
      return query(SET_ROL_TO_USER, [userId, rolId]);
    }));

    const rolesAsigned = await Promise.all(roles.map(rolId => {
      return query(GET_ROL_BY_ID, [rolId])
    }));

    return rolesAsigned.map(result => result.rows[0]);

  }

  async checkRoles(roles) {
    const { rows: [{ rolesid }] } = await query(GET_ALL_ROLES_ID);

    const isContained = roles.every((element) => {
      return rolesid.includes(element);
    });

    if (!isContained)
      throw CustomError.badRequest(`Incluye roles no permitidos. Permitidos [${rolesid}]`);

  }

}
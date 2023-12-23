import { regexs } from "../../../config/helpers/regexs.js";

export class UpdateUserDto {
  constructor(args) {
    const { id, name, email, active, roles } = args;
    this.id = id
    this.name = name;
    this.email = email;
    this.active = active;
    this.roles = roles;
  }

  static create({ id, body }) {

    if (isNaN(+id))
      return [`El parámetro ${id} no es válido`, null];

    let { name, email, roles, active } = body;

    if (!name || !email || !roles)
      return ['Todos los campos son obligatorios', null];

    if (name.trim().length <= 2)
      return ['El nombre debe ser mayor a 2 caracteres', null];

    if (email.trim().length <= 2)
      return ['El email es demasiado corto', null];

    if (regexs.email.test())
      return ['No es un email válido', null];

    // Default values
    roles = !roles ? [3] : roles;
    active = (typeof active === 'undefined') ? active = true : !!active;

    const args = { id: +id, name, email, active, roles }

    return [null, new UpdateUserDto(args)];

  }
}
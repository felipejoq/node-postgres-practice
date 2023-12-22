import { regexs } from "../../../config/helpers/regexs.js";
import { Encoder } from "../../../config/plugins/encoder.js";

export class CreateUserDto {
  constructor(args) {
    const { username, email, password } = args;
    this.username = username;
    this.email = email;
    this.password = password;
  }

  static async create(body) {

    const { username, email, password } = body;

    if (!username || !email || !password)
      return ['Todos los campos son obligatorios', null]

    if (username.trim().length <= 2)
      return ['El nombre debe ser mayor a 2 caracteres', null];

    if (email.trim().length <= 2)
      return ['El email es demasiado corto', null];

    if (regexs.email.test())
      return ['No es un email válido', null];

    if (password.trim().length <= 5)
      return ['El password es demasiado corto', null];

    return [null, new CreateUserDto({ username, email, password })];

  }
}
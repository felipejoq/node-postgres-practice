export class CreateUserDto {
  constructor(args) {
    const { title, excerpt, body, slug, price, active, created_at, updated_at, user } = args;
    this.title = title;
    this.excerpt = excerpt;
    this.body = body;
    this.slug = slug;
    this.price = price;
    this.active = active;
    this.created_at = created_at;
    this.updated_at = updated_at;
    this.user = user;
  }
// TODO TODO TODO TODO
  static create(body) {

    const roles = [3];
    let { name, email, password, active } = body;

    if (!name || !email || !password)
      return ['Todos los campos son obligatorios', null];

    if (name.trim().length <= 2)
      return ['El nombre debe ser mayor a 2 caracteres', null];

    if (email.trim().length <= 2)
      return ['El email es demasiado corto', null];

    if (regexs.email.test())
      return ['No es un email válido', null];

    if (password.trim().length <= 5)
      return ['El password es demasiado corto', null];

    // Default values
    active = !active ? active = true : !!active;

    return [null, new CreateUserDto({ name, email, password, active, roles })];

  }
}
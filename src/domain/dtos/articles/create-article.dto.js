export class CreateArticleDto {
  constructor(args) {
    const { title, description, slug, price, active, created_at, updated_at, user, files } = args;
    this.title = title;
    this.description = description;
    this.slug = slug;
    this.price = price;
    this.active = active;
    this.created_at = created_at;
    this.updated_at = updated_at;
    this.user = user;
    this.files = files;
  }
// TODO TODO TODO TODO
  static create(body) {

    let { title, description, price, active, user, files } = body;

    if (!title || !description || !price || !user)
      return ['Todos los campos son obligatorios', null];

    if (title.trim().length <= 10)
      return ['El título debe ser mayor a 10 caracteres', null];

    if (description.trim().length <= 20)
      return ['Descripción demasiado corta.', null];

    if (price < 0)
      return ['El precio debe ser un monto mayor a cero', null];

    if (!user) {
      return ['No especificó un autor válido para este artículo', null];
    }

    // Default values
    active = !active ? active = true : !!active;

    return [null, new CreateArticleDto({ title, description, price, active, user, files})];

  }
}
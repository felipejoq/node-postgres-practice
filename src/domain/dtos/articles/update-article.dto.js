export class UpdateArticleDto {

  constructor(args) {
    const { id, title, description, slug, price, active, user } = args;
    this.id = id;
    this.title = title;
    this.description = description;
    this.slug = slug;
    this.price = price;
    this.active = active;
    this.user = user;
  }

  static create({ id, body }) {

    let { title, description, price, active, user } = body;

    if (isNaN(+id))
      return ['El id no es válido', null];

    if (!title || !description || !price || !user)
      return ['Todos los campos son obligatorios', null];

    if (title.trim().length <= 10)
      return ['El título debe ser mayor a 10 caracteres', null];

    if (description.trim().length <= 20)
      return ['Descripción demasiado corta.', null];

    if (price < 0)
      return ['El precio debe ser un monto mayor a cero', null];

    if (!user)
      return ['No especificó un autor válido para este artículo', null];

    active = active ?? true;

    return [null, new UpdateArticleDto({ id, title, description, price, active, user })];

  }
}
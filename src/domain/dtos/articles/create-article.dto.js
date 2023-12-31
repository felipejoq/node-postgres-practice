import { createArticleSchema } from "./validations/create-article.schema.js";

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

  static create(body) {

    // Default values
    let { title, description, price, active, user, files } = body;
    active = (typeof active === 'undefined') ? true : !!active;

    const result = createArticleSchema.validate({ title, description, price, active, user, files });

    if (result.error)
      return [result.error.message, null];

    return [null, new CreateArticleDto({ title, description, price, active, user, files })];

  }
}
import { updateArticleSchema } from "./validations/update-article.schema.js";

export class UpdateArticleDto {

  constructor(args) {
    const { articleId, title, description, slug, price, active, user } = args;
    this.id = articleId;
    this.title = title;
    this.description = description;
    this.slug = slug;
    this.price = price;
    this.active = active;
    this.user = user;
  }

  static create({ articleId, body }) {

    let { title, description, price, active, user } = body;
    active = active ?? true;

    const result = updateArticleSchema.validate({ articleId, title, description, price, active, user });

    if (result.error)
      return [result.error.message, null];

    return [null, new UpdateArticleDto({ articleId, title, description, price, active, user })];

  }
}
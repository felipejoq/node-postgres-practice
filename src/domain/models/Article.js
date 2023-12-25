// TODO: Definir modelo de producto
export class Product {
  constructor(args) {

    const { id, title, excerpt, body, slug, price, active, created_at, updated_at, user } = args;

    this.id = id;
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
}
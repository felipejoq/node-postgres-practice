import { getUUUID } from "../../config/plugins/uuid.js";

export class Article {
  constructor(args) {

    const { title, description, price, active, user, files } = args;

    this.title = title;
    this.description = description;
    this.price = price;
    this.active = active;
    this.user = user;
    this.files = files;
  }

  get getSlug() {
    return this.slug;
  }

  setSlug(str) {
    // const randomNumber = Math.max(Date.now() * Math.floor(Math.random() * 10), 1);
    this.slug = str.toLowerCase()
      .split(' ')
      .join('-')
      .concat('-', getUUUID()); // Se puede usar getUUUID()
  }
}
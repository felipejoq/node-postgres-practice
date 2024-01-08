import { CustomError } from "../../config/errors/custom.errors.js";
import { query } from "../../database/db.js";
import {
  CREATE_ARTICLE,
  DELETE_ARTICLE_BY_ID,
  GET_ARTICLE_BY_ID,
  GET_ARTICLE_BY_SLUG,
  UPDATE_ARTICLE_BY_ID,
  UPDATE_ARTICLE_STATUS
} from "../../database/queries/articles.query.js";
import { Article } from "../../domain/models/Article.js";

import {
  GetAllArticles,
  GetArticlesByUser,
  GetPublicArticles
} from "./articles-uses-cases/index.js";

export class ArticleService {

  constructor(imagesService) {
    this.imagesService = imagesService;
  }

  async getArticles({ page, limit }) {

    const { articles, total } = await GetPublicArticles.getArticles({ page, limit })

    return this.getResultsWithPagination({ articles, total, page, limit });

  }

  async getAllArticles({ page, limit }) {

    const { articles, total } = await GetAllArticles.getAllArticles({ page, limit });

    return this.getResultsWithPagination({ articles, total, page, limit });

  }

  async getArticlesByUserId({ userId, page, limit }) {

    const { articles, total } = await GetArticlesByUser.getArticlesByUserId({ userId, page, limit })

    return this.getResultsWithPagination({ articles, total, page, limit });

  }

  async getArticleById({ articleId, user }) {

    const { rows: [articleDb] } = await query(GET_ARTICLE_BY_ID, [articleId]);

    if (!articleDb)
      throw CustomError.notFound('El artículo no existe o la id no es válida');

    this.checkAuthorization(user, articleDb)

    return articleDb;
  }

  async getArticleBySlug(slug) {
    const { rows: [article] } = await query(GET_ARTICLE_BY_SLUG, [slug]);

    if (!article)
      throw CustomError.notFound('El artículo no existe o el slug no es válido');

    return article;
  }

  async createArticle(createArticleDto) {

    const newArticle = new Article(createArticleDto);
    newArticle.setSlug(createArticleDto.title);

    const { title, description, slug, price, active, user, files } = newArticle;

    const { rows: [article] } = await query(CREATE_ARTICLE, [title, description, slug, price, active, user.id]);

    const urlImages = await this.imagesService.uploadMultiple(files);

    const imagesToArticle = await this.imagesService.setImagesToArticle(urlImages, article.id, user.id);

    delete article.user_id;
    article.author = user;
    article.article_images = imagesToArticle;

    return article;
  }

  async updateArticleById(updateArticleDto) {

    const articleDb = await this.getArticleById({ articleId: +updateArticleDto.id, user: updateArticleDto.user });

    const { user: { id: userId, roles }, id, title, description, price, active } = updateArticleDto;

    this.checkAuthorization(updateArticleDto.user, articleDb)

    await query(UPDATE_ARTICLE_BY_ID, [title, description, price, active, id]);

    const articleUpdated = await this.getArticleById({ articleId: +updateArticleDto.id, user: updateArticleDto.user });

    return articleUpdated;

  }

  async deleteArticleById({ articleId, user }) {

    const { rows: [articleDb] } = await query(GET_ARTICLE_BY_ID, [articleId]);

    if (!articleDb)
      throw CustomError.notFound('El artículo no existe o la id no es válida');

    this.checkAuthorization(user, articleDb);

    const { rows: [articleDeleted] } = await query(DELETE_ARTICLE_BY_ID, [articleId])

    return articleDeleted;
  }

  async changeStatusArticle({ articleId, user }) {
    const article = await this.getArticleById({ articleId, user });

    const { active, id: idArticle } = article;

    await query(UPDATE_ARTICLE_STATUS, [!active, idArticle]);

    const articleUpdated = await this.getArticleById({ articleId, user });

    return articleUpdated;
  }

  async addImagesToArticle({ articleId, user, files }) {

    const article = await this.getArticleById({ articleId, user });

    if (article.article_images.length > 10)
      throw CustomError.notFound('Solo se permiten 10 imagenes por artículo');

    const urlImages = await this.imagesService.uploadMultiple(files);

    await this.imagesService.setImagesToArticle(urlImages, article.id, user.id);

    const articleUpdated = await this.getArticleById({ articleId, user });

    return articleUpdated;
  }

  async removeImageArticle({ articleId, imageId, user }) {

    const article = await this.getArticleById({ articleId, user });

    if (article.article_images.length === 1)
      throw CustomError.notFound('El artículo debe tener al menos 1 imagen');

    const removedImage = await this.imagesService.removeImageArticle(imageId, articleId, user.id)

    return removedImage;
  }

  checkAuthorization(user, article) {
    const { id: userId, roles } = user;
    const { author: { id: authorId } } = article;

    const hasAllowedRole = roles.some(value => value.role === 'ADMIN' || value.role === 'SELLER');
    const userIsOwner = +userId === +authorId;

    if (!(hasAllowedRole || userIsOwner))
      throw CustomError.notFound('No tiene permisos');

    return true;
  }

  getResultsWithPagination({ articles, total, page, limit }) {

    const haveNext = (page * limit < total);
    const havePrev = (page - 1 > 0) && (page + limit <= total);

    return {
      page,
      limit,
      total,
      next: haveNext ? `/api/v1/article?page=${(page + 1)}&limit=${limit}` : null,
      prev: havePrev ? `/api/v1/article?page=${(page - 1)}&limit=${limit}` : null,
      articles,
    };
  }

}
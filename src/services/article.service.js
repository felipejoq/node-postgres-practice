import { CustomError } from "../config/errors/custom.errors.js";
import { query } from "../database/db.js";
import {
  CREATE_ARTICLE,
  GET_ALL_ARTICLES_WHIT_PAGINATION,
  GET_ARTICLES_WHIT_PAGINATION,
  GET_ARTICLE_BY_ID,
  GET_ARTICLE_BY_SLUG,
  GET_TOTAL_ARTICLES
} from "../database/queries/articles.query.js";
import { Article } from "../domain/models/Article.js";

export class ArticleService {

  constructor(imagesService) {
    this.imagesService = imagesService;
  }

  async getArticles({ page, limit }) {

    const [articlesResult, totalArticlesResult] = await Promise.all([
      query(GET_ARTICLES_WHIT_PAGINATION, [(page - 1) * limit, limit]),
      query(GET_TOTAL_ARTICLES)
    ]);

    const articles = articlesResult?.rows;
    const total = parseInt(totalArticlesResult?.rows[0].count);
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

  async getAllArticles({ page, limit }) {

    const [articlesResult, totalArticlesResult] = await Promise.all([
      query(GET_ALL_ARTICLES_WHIT_PAGINATION, [(page - 1) * limit, limit]),
      query(GET_TOTAL_ARTICLES)
    ]);

    const articles = articlesResult?.rows;
    const total = parseInt(totalArticlesResult?.rows[0].count);
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

  async getArticleById(id) {

    const { rows: [article] } = await query(GET_ARTICLE_BY_ID, [id]);

    if (!article)
      throw CustomError.notFound('El artículo no existe o la id no es válida');

    return article;

  }

  async getArticleBySlug(slug) {

    const { rows: [article] } = await query(GET_ARTICLE_BY_SLUG, [slug]);

    if (!article)
      throw CustomError.notFound('El artículo no existe o el slug no es válido');

    return article;

  }

  async createArticle(articleDto) {

    const newArticle = new Article(articleDto);
    newArticle.setSlug(articleDto.title);

    const { title, description, slug, price, active, user, files } = newArticle;

    const { rows: [article] } = await query(CREATE_ARTICLE, [title, description, slug, price, active, user.id]);

    const urlImages = await this.imagesService.uploadMultiple(files, article);

    const imagesToArticle = await this.imagesService.setImagesToArticle(urlImages, article.id, user.id);

    delete article.user_id;
    article.user = user;
    article.article_images = imagesToArticle;

    return article;
  }

}
import { CustomError } from "../config/errors/custom.errors.js";
import { query } from "../database/db.js";
import {
  GET_ALL_ARTICLES_WHIT_PAGINATION,
  GET_ARTICLES_WHIT_PAGINATION,
  GET_ARTICLE_BY_ID,
  GET_ARTICLE_BY_SLUG,
  GET_TOTAL_ARTICLES
} from "../database/queries/articles.query.js";

export class ArticleService {

  constructor() { }

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



}
import { query } from "../../../database/db.js";
import {
  GET_ALL_ARTICLES_WHIT_PAGINATION,
  GET_TOTAL_ARTICLES
} from "../../../database/queries/articles.query.js";

export class GetAllArticles {
  static async getAllArticles({ page, limit }) {

    const [articlesResult, totalArticlesResult] = await Promise.all([
      query(GET_ALL_ARTICLES_WHIT_PAGINATION, [(page - 1) * limit, limit]),
      query(GET_TOTAL_ARTICLES)
    ]);

    const articles = articlesResult?.rows;
    const total = parseInt(totalArticlesResult?.rows[0].count);

    return { articles, total }

  }
}
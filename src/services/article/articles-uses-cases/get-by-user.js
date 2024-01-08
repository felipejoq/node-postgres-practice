import { query } from "../../../database/db.js";
import {
  GET_ARTICLES_BY_USER_ID,
  GET_TOTAL_ARTICLES
} from "../../../database/queries/articles.query.js";

export class GetArticlesByUser {
  static async getArticlesByUserId({ userId, page, limit }) {

    const [articlesResult, totalArticlesResult] = await Promise.all([
      query(GET_ARTICLES_BY_USER_ID, [userId, (page - 1) * limit, limit]),
      query(GET_TOTAL_ARTICLES)
    ]);

    const articles = articlesResult?.rows;
    const total = parseInt(totalArticlesResult?.rows[0].count);

    return { articles, total }

  }
}
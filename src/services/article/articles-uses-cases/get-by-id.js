import { query } from "../../../database/db.js";
import {
  GET_ARTICLE_BY_ID
} from "../../../database/queries/articles.query.js";

export class GetArticleById {
  static async getArticle({ articleId }) {
    const { rows: [articleDb] } = await query(GET_ARTICLE_BY_ID, [articleId]);
    return { articleDb };
  }
}
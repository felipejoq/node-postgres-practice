import { Router } from "express";
import { ArticleController } from './controller.js';

export class ProductRoutes {

  static get routes() {

    const articleRouter = Router();

    articleRouter.get('/', ArticleController.getArticles);
    articleRouter.get('/:id', ArticleController.getArticleById);

    articleRouter.post('/', ArticleController.createArticle);
    articleRouter.put('/:id', ArticleController.updateArticleById);
    articleRouter.delete('/:id', ArticleController.deleteArticleById);

    return articleRouter;
  }

}
import { Router } from "express";
import { ArticleController } from './controller.js';
import { AuthMiddleware, RoleMiddleware } from "../../middlewares/index.js";
import { ArticleService } from "../../services/article.service.js";


export class ProductRoutes {

  static get routes() {

    const articleRouter = Router();
    const articleService = new ArticleService();
    const articleControler = new ArticleController(articleService);

    articleRouter.post('/', [AuthMiddleware.validateJWT, RoleMiddleware.validRolesArticles(['ADMIN', 'SELLER', 'USER'])], articleControler.createArticle);
    articleRouter.get('/all', [AuthMiddleware.validateJWT, RoleMiddleware.validRolesArticles(['ADMIN', 'SELLER'])], articleControler.getAllArticles);
    articleRouter.put('/:id', [AuthMiddleware.validateJWT, RoleMiddleware.validRolesArticles(['ADMIN', 'SELLER', 'USER'])], articleControler.updateArticleById);
    articleRouter.delete('/:id', [AuthMiddleware.validateJWT, RoleMiddleware.validRolesArticles(['ADMIN', 'SELLER', 'USER'])], articleControler.deleteArticleById);

    articleRouter.get('/', articleControler.getArticles);
    articleRouter.get('/id/:id', articleControler.getArticleById);
    articleRouter.get('/slug/:slug', articleControler.getArticleBySlug);

    return articleRouter;
  }

}
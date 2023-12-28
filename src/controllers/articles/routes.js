import { Router } from "express";
import { ArticleController } from './controller.js';
import { AuthMiddleware, RoleMiddleware } from "../../middlewares/index.js";
import { ArticleService } from "../../services/article.service.js";
import { FileUploadMiddleware } from "../../middlewares/upload-files.middleware.js";
import { ImagesService } from "../../services/images.service.js";
import { firebaseConfig } from "../../config/storage/firebase.js";

export class ProductRoutes {

  static get routes() {

    const articleRouter = Router();
    const articleService = new ArticleService(new ImagesService(firebaseConfig));
    const articleControler = new ArticleController(articleService);

    articleRouter.post('/', [
      AuthMiddleware.validateJWT,
      RoleMiddleware.validRolesArticles(['ADMIN', 'SELLER', 'USER']),
      FileUploadMiddleware.containFiles
    ], articleControler.createArticle);

    articleRouter.put('/:id', [
      AuthMiddleware.validateJWT,
      RoleMiddleware.validRolesArticles(['ADMIN', 'SELLER', 'USER']),
    ], articleControler.updateArticleById);

    articleRouter.get('/id/:id', [
      AuthMiddleware.validateJWT,
      RoleMiddleware.validRolesArticles(['ADMIN', 'SELLER', 'USER']),
    ], articleControler.getArticleById);

    articleRouter.get('/all', [AuthMiddleware.validateJWT, RoleMiddleware.validRolesArticles(['ADMIN', 'SELLER'])], articleControler.getAllArticles);
    articleRouter.delete('/:id', [AuthMiddleware.validateJWT, RoleMiddleware.validRolesArticles(['ADMIN', 'SELLER', 'USER'])], articleControler.deleteArticleById);

    articleRouter.get('/', articleControler.getArticles);
    articleRouter.get('/slug/:slug', articleControler.getArticleBySlug);

    return articleRouter;
  }

}
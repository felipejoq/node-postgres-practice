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

    articleRouter.get('/all', [AuthMiddleware.validateJWT, RoleMiddleware.validRolesArticles(['ADMIN', 'SELLER'])], articleControler.getAllArticles);
    articleRouter.delete('/:articleId', [AuthMiddleware.validateJWT, RoleMiddleware.validRolesArticles(['ADMIN', 'SELLER', 'USER'])], articleControler.deleteArticleById);

    articleRouter.get('/', articleControler.getArticles);
    articleRouter.get('/slug/:slug', articleControler.getArticleBySlug);
    articleRouter.get('/user/:userId', articleControler.getArticlesByUserId)

    articleRouter.post('/', [
      AuthMiddleware.validateJWT,
      RoleMiddleware.validRolesArticles(['ADMIN', 'SELLER', 'USER']),
      FileUploadMiddleware.containFiles
    ], articleControler.createArticle);

    articleRouter.put('/:articleId', [
      AuthMiddleware.validateJWT,
      RoleMiddleware.validRolesArticles(['ADMIN', 'SELLER', 'USER']),
    ], articleControler.updateArticleById);

    articleRouter.get('/:articleId', [
      AuthMiddleware.validateJWT,
      RoleMiddleware.validRolesArticles(['ADMIN', 'SELLER', 'USER']),
    ], articleControler.getArticleById);

    articleRouter.put('/add/image/:articleId', [
      AuthMiddleware.validateJWT,
      RoleMiddleware.validRolesArticles(['ADMIN', 'SELLER', 'USER']),
      FileUploadMiddleware.containFiles,
    ], articleControler.addImagesToArticle);

    articleRouter.put('/:articleId/remove/image/:imageId', [
      AuthMiddleware.validateJWT,
      RoleMiddleware.validRolesArticles(['ADMIN', 'SELLER', 'USER']),
    ], articleControler.removeImageArticle);

    articleRouter.post('/status/:articleId', [
      AuthMiddleware.validateJWT,
      RoleMiddleware.validRolesArticles(['ADMIN', 'SELLER', 'USER']),
    ], articleControler.changeStatusArticle);

    return articleRouter;
  }

}
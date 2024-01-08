import { Router } from "express";
import { SeedController } from './controller.js';
import { AuthMiddleware, RoleMiddleware } from "../../middlewares/index.js";
import { SeedService, ImagesService } from "../../services/index.js";
import { firebaseConfig } from "../../config/storage/firebase.js";

export class SeedRoutes {

  static get routes() {

    const seedRouter = Router();
    const imageService = new ImagesService(firebaseConfig)
    const seedService = new SeedService(imageService);
    const seedControler = new SeedController(seedService);

    seedRouter.post('/restore/database', [
      AuthMiddleware.validateJWT, RoleMiddleware.validRoles(['ADMIN'])
    ], seedControler.restoreDatabase);

    seedRouter.delete('/delete/images/storage', [
      AuthMiddleware.validateJWT, RoleMiddleware.validRoles(['ADMIN'])
    ], seedControler.deleteImagesFromStorage);

    return seedRouter;
  }

}
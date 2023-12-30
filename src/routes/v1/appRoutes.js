import { Router } from "express";
import { ProductRoutes } from "../../controllers/articles/routes.js";
import { UserRoutes } from "../../controllers/users/routes.js";
import { SeedRoutes } from "../../controllers/seed/routes.js";

export class AppRouter {

  constructor() { }

  static get routes() {
    const AppRouter = Router();

    AppRouter.use('/api/v1/user', UserRoutes.routes);
    AppRouter.use('/api/v1/article', ProductRoutes.routes);
    AppRouter.use('/api/v1/seed', SeedRoutes.routes);

    return AppRouter;
  }

}
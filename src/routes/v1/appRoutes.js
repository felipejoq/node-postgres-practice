import { Router } from "express";
import { ProductRoutes } from "../../controllers/products/routes.js";
import { UserRoutes } from "../../controllers/users/routes.js";

export class AppRouter {

  constructor() { }

  static get routes() {
    const AppRouter = Router();

    AppRouter.use('/api/v1/user', UserRoutes.routes);
    AppRouter.use('/api/v1/product', ProductRoutes.routes);

    return AppRouter;
  }

}
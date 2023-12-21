import { Router } from "express";
import { ProductRoutes } from "../../controllers/products/routes.js";
import { UserRoutes } from "../../controllers/users/routes.js";

export class AppRouter {

  constructor() { }

  static get routes() {
    const AppRouter = Router();

    AppRouter.use('/v1/product', ProductRoutes.routes);
    AppRouter.use('/v1/user', UserRoutes.routes);

    return AppRouter;
  }

}
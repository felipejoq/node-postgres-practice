import { Router } from "express";
import { ProductRoutes } from "../../controllers/products/routes.js";

export class AppRouter {

  constructor() { }

  static get routes() {
    const AppRouter = Router();

    AppRouter.use('/v1/product', ProductRoutes.routes);

    return AppRouter;
  }

}
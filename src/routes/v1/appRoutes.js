import { Router } from "express";
import productRouter from "../../controllers/products/routes.js";
const AppRouter = Router();

AppRouter.use('/v1', productRouter)

export { AppRouter };
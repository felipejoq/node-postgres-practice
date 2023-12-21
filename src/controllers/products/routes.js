import { Router } from "express";
const productRouter = Router();
import { getProducts } from "./controller.js";

productRouter.get('/product', getProducts);

export default productRouter;
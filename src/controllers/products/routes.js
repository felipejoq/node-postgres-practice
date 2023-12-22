import { Router } from "express";
import { ProductController } from './controller.js';

export class ProductRoutes {

  static get routes() {

    const productRouter = Router();

    productRouter.get('/', ProductController.getProducts);
    productRouter.get('/:id', ProductController.getProductById);

    productRouter.post('/', ProductController.createProduct);
    productRouter.put('/:id', ProductController.updateProductById);
    productRouter.delete('/:id', ProductController.deleteProductById);

    return productRouter;
  }

}
import { Router } from "express";
import { UsersController } from './controller.js';

export class UserRoutes {

  static get routes() {

    const productRouter = Router();

    productRouter.get('/', UsersController.getUsers);
    productRouter.get('/:id', UsersController.getUserById);

    productRouter.post('/', UsersController.createUser);
    productRouter.put('/:id', UsersController.updateUserById);
    productRouter.delete('/:id', UsersController.deleteUserById);

    return productRouter;
  }

}
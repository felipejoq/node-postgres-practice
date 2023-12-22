import { Router } from "express";
import { UsersController } from './controller.js';
import { UserService } from "../../services/user.service.js";

export class UserRoutes {

  static get routes() {

    const productRouter = Router();
    const userService = new UserService();
    const userControler = new UsersController(userService)

    productRouter.get('/', userControler.getUsers);
    productRouter.get('/:id', userControler.getUserById);

    productRouter.post('/', userControler.createUser);
    productRouter.put('/:id', userControler.updateUserById);
    productRouter.delete('/:id', userControler.deleteUserById);

    return productRouter;
  }

}
import { Router } from "express";
import { UsersController } from './controller.js';
import { UserService } from "../../services/user.service.js";
import { RoleService } from "../../services/role.service.js";
import { AuthMiddleware } from "../../middlewares/auth.middleware.js";
import { RoleMiddleware } from "../../middlewares/role.middleware.js";

export class UserRoutes {

  static get routes() {

    const userRoutes = Router();
    const userService = new UserService();
    const userControler = new UsersController(userService);

    userRoutes.get('/:id', userControler.getUserById);
    userRoutes.post('/register', userControler.registerUser);
    userRoutes.post('/login', userControler.loginUser);

    userRoutes.post('/:id/status', [AuthMiddleware.validateJWT, RoleMiddleware.validRoles(['ADMIN', 'USER'])], userControler.updateStatusUser);
    userRoutes.post('/:id/role', [AuthMiddleware.validateJWT, RoleMiddleware.validRoles(['ADMIN'])], userControler.updateRolesUser);
    userRoutes.put('/:id', [AuthMiddleware.validateJWT, RoleMiddleware.validRoles(['ADMIN', 'USER'])], userControler.updateUserById);
    userRoutes.delete('/:id', [AuthMiddleware.validateJWT, RoleMiddleware.validRoles(['ADMIN'])], userControler.deleteUserById);
    userRoutes.get('/', [AuthMiddleware.validateJWT, RoleMiddleware.validRoles(['ADMIN', 'SELLER'])], userControler.getUsers);

    return userRoutes;
  }

}
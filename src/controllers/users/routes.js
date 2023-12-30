import { Router } from "express";
import { UsersController } from './controller.js';
import { UserService } from "../../services/user.service.js";
import { AuthMiddleware, RoleMiddleware } from "../../middlewares/index.js";
import { FileUploadMiddleware } from "../../middlewares/upload-files.middleware.js";

export class UserRoutes {

  static get routes() {

    const userRoutes = Router();
    const userService = new UserService();
    const userControler = new UsersController(userService);

    userRoutes.get('/:id', userControler.getUserById);
    userRoutes.post('/register', userControler.registerUser);
    userRoutes.post('/login', userControler.loginUser);

    userRoutes.post('/:id/image', [
      AuthMiddleware.validateJWT,
      RoleMiddleware.validRoles(['ADMIN', 'USER']),
      FileUploadMiddleware.containFiles,
    ], userControler.updateUserImageById);

    userRoutes.post('/:id/status', [AuthMiddleware.validateJWT, RoleMiddleware.validRoles(['ADMIN', 'USER'])], userControler.updateStatusUser);
    userRoutes.post('/:id/role', [AuthMiddleware.validateJWT, RoleMiddleware.validRoles(['ADMIN'])], userControler.updateRolesUser);
    userRoutes.put('/:id', [AuthMiddleware.validateJWT, RoleMiddleware.validRoles(['ADMIN', 'USER'])], userControler.updateUserById);
    userRoutes.delete('/:id', [AuthMiddleware.validateJWT, RoleMiddleware.validRoles(['ADMIN'])], userControler.deleteUserById);
    userRoutes.get('/', [AuthMiddleware.validateJWT, RoleMiddleware.validRoles(['ADMIN', 'SELLER'])], userControler.getUsers);

    return userRoutes;
  }

}
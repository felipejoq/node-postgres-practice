import { JwtAdapter } from "../config/plugins/Jwt.js";
import { RoleService, UserService } from "../services/index.js";

export class AuthMiddleware {

  constructor() {
  }

  static async validateJWT(req, res, next) {

    const userService = new UserService(new RoleService());
    
    const authorization = req.header('Authorization');
    if (!authorization) return res.status(401).json({ error: 'No token provided' });
    if (!authorization.startsWith('Bearer ')) return res.status(401).json({ error: 'Invalid Bearer token' });

    const token = authorization.split(' ').at(1) || '';

    try {

      const payload = await JwtAdapter.validateToken(token);
      if (!payload) return res.status(401).json({ error: 'Invalid token' })

      const user = await userService.getUserById(payload.id);
      delete user.password
      if (!user) return res.status(401).json({ error: 'Invalid token - user' });

      req.body.user = user;

      return next();

    } catch (error) {

      console.log(error);
      return res.status(500).json({ error: 'Internal server error' });

    }

  }

}

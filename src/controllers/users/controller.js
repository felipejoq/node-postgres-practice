import { CustomError } from "../../config/errors/custom.errors.js";
import { handleError } from "../../config/errors/hendler.errors.js";
import { CreateUserDto } from "../../models/dtos/users/create-user.dto.js";
import { UserService } from "../../services/user.service.js";

export class UsersController {

  constructor() { }

  static getUsers = async (req, res) => {
    console.log('getUsers');
    res.json({
      ok: true
    })
  }

  static getUserById = async (req, res) => {
    const { id } = req.params;
    console.log('getUserById', { id });
    res.json({
      ok: true
    })
  }

  static createUser = async (req, res) => {

    const body = req.body;
    const [error, newUserDto] = await CreateUserDto.create(body);

    if (error) return res.status(400).json({ error });

    UserService.saveUser(newUserDto)
      .then(newUser => res.json(newUser))
      .catch(e => handleError(e, res))

  }

  static updateUserById = async (req, res) => {
    const { id } = req.params;
    const body = req.body;

    console.log('updateUserById', { id }, { body });
    res.json({
      ok: true
    })
  }

  static deleteUserById = async (req, res) => {
    const { id } = req.params;

    console.log('deleteUserById', { id });
    res.json({
      ok: true
    })
  }

}

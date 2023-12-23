import { handleError } from "../../config/errors/hendler.errors.js";
import {
  PaginationDto,
  CreateUserDto,
  UpdateUserDto
} from "../../domain/dtos/index.js";

export class UsersController {

  constructor(userService) {
    this.userService = userService;
  }

  getUsers = (req, res) => {

    const { page, limit } = req.query;
    const [error, pagination] = PaginationDto.create({
      page: parseInt(page), limit: parseInt(limit)
    });

    if (error) return res.status(400).json({ error });

    this.userService.getUsers(pagination)
      .then(data => res.json(data))
      .catch(e => handleError(e, res));

  }

  getUserById = async (req, res) => {
    const { id } = req.params;

    if (isNaN(+id))
      return res.status(400).json({ error: 'El id no es válido' });

    this.userService.getUserById(id)
      .then(user => res.json(user))
      .catch(e => handleError(e, res));
  }

  createUser = (req, res) => {

    const body = req.body;
    const [error, newUserDto] = CreateUserDto.create(body);

    if (error) return res.status(400).json({ error });

    this.userService.saveUser(newUserDto)
      .then(newUser => res.json(newUser))
      .catch(e => handleError(e, res))

  }

  updateUserById = async (req, res) => {
    const { id } = req.params;
    const body = req.body;

    const [error, userUpdatedDto] = UpdateUserDto.create({ id, body });

    if (error) return res.status(400).json({ error });

    this.userService.updateUserById(userUpdatedDto)
      .then(userUpdated => res.json(userUpdated))
      .catch(e => handleError(e, res));

  }

  deleteUserById = async (req, res) => {
    const { id } = req.params;

    if (isNaN(+id))
      return res.status(400).json({ error: 'El id no es válido' });

    this.userService.deleteUserById(id)
      .then(userDeleted => res.json(userDeleted))
      .catch(e => handleError(e, res));
  }

}

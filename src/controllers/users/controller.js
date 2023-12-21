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
    console.log('createUser', { body });
    res.json({
      ok: true
    })
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

import { handleError } from "../../config/errors/hendler.errors.js";

export class SeedController {
  constructor(seedService) {
    this.seedService = seedService;
  }

  restoreDatabase = (req, res) => {

    this.seedService.restoreDatabase()
      .then(data => res.json(data))
      .catch(e => handleError(e, res));

  }

  deleteImagesFromStorage = (req, res) => {
    this.seedService.deleteImagesFromStorage()
      .then(data => res.json(data))
      .catch(e => handleError(e, res));
  }

}

import { CustomError } from "../config/errors/custom.errors.js";
import { CronPlugin } from "../config/plugins/cron.js";
import { query } from "../database/db.js";
import { RESTORE_DB } from "../database/queries/seed.query.js";

export class SeedService {

  constructor(imageService) {
    this.imageService = imageService;
    this.jobSeed();
  }

  jobSeed() {
    CronPlugin.createJob('0 0 */2 * * *', async () => {
      console.log('*** Iniciando trabajo de restauración DB ***', new Date());
      try {
        await this.deleteImagesFromStorage();
        await this.restoreDatabase();
        console.log('*** Trabajo de restauración DB Finalizado ***', new Date());
      } catch (error) {
        console.log('[ERROR] Al restaurar la DB:', error);
      }
    });
  }

  async restoreDatabase() {

    const results = await query(RESTORE_DB, []);

    const response = results.map(result => {
      return result.command;
    });

    return {
      ok: true,
      result: response,
    };
  }

  async deleteImagesFromStorage() {
    await this.imageService.deleteImagesFromStorage();

    return true;
  }

}
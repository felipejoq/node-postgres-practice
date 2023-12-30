import { CronJob } from 'cron';


export class CronPlugin {

  static createJob(cronTime, onTick) {

    const job = new CronJob(cronTime, onTick);

    job.start();

    return job;

  }

}
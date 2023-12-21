import 'dotenv/config';
import env from 'env-var'

export const envs = {
  PORT: env.get('PORT').required().asInt(),
  BASE_URL: env.get('BASE_URL').required().asString(),
  PGUSER: env.get('PGUSER').required().asString(),
  PGHOST: env.get('PGHOST').required().asString(),
  PGPASSWORD: env.get('PGPASSWORD').required().asString(),
  PGDATABASE: env.get('PGDATABASE').required().asString(),
  PGPORT: env.get('PGPORT').required().asInt(),
}

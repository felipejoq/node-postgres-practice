import 'dotenv/config';
import env from 'env-var'

export const envs = {
  PORT: env.get('PORT').required().asInt(),
  BASE_URL: env.get('BASE_URL').required().asString(),
  JWT_SEED: env.get('JWT_SEED').required().asString(),
  PGUSER: env.get('PGUSER').required().asString(),
  PGHOST: env.get('PGHOST').required().asString(),
  PGPASSWORD: env.get('PGPASSWORD').required().asString(),
  PGDATABASE: env.get('PGDATABASE').required().asString(),
  PGPORT: env.get('PGPORT').required().asInt(),
  FIREBASE_api_Key: env.get('FIREBASE_api_Key').required().asString(),
  FIREBASE_authDomain: env.get('FIREBASE_authDomain').required().asString(),
  FIREBASE_projectId: env.get('FIREBASE_projectId').required().asString(),
  FIREBASE_storageBucket: env.get('FIREBASE_storageBucket').required().asString(),
  FIREBASE_messagingSenderId: env.get('FIREBASE_messagingSenderId').required().asString(),
  FIREBASE_appId: env.get('FIREBASE_appId').required().asString(),
}

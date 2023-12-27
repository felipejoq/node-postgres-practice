import { envs } from '../plugins/envs.js';
          
export const firebaseConfig = {
  apiKey: envs.FIREBASE_api_Key,
  authDomain: envs.FIREBASE_authDomain,
  projectId: envs.FIREBASE_projectId,
  storageBucket: envs.FIREBASE_storageBucket,
  messagingSenderId: envs.FIREBASE_messagingSenderId,
  appId: envs.FIREBASE_appId
};
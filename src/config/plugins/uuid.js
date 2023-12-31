import crypto from 'node:crypto';

export const getUUUID = () => {
  return crypto.randomUUID();
}
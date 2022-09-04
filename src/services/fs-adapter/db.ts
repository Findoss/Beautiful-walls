import { DB_FILE, IS_DEV } from '../../config';
import JSONdb from 'simple-json-db';

export const db = new JSONdb(`./db.${DB_FILE}.json`, {
  asyncWrite: true,
  jsonSpaces: IS_DEV,
});

export async function load(key: string) {
  return db.get(key);
}
export async function save(key: string, payload: any) {
  return db.set(key, payload);
}

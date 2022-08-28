export const TG_TOKEN: string = process.env['TG_TOKEN'] ?? '';
export const IS_DEV: boolean = process.env['APP'] === 'dev';
export const DB_FILE: string = process.env['APP'] ?? 'dev';

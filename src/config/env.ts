import dotenv from 'dotenv';
const envFile = process.env.APP ? `.env.${process.env.APP}` : '.env';

dotenv.config({ path: envFile });

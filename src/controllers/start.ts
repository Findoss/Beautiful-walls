import type { CommandMiddleware, Context } from 'grammy';
import { brodcast } from '../services/brodrcast';

export const start: CommandMiddleware<Context> = (ctx) => {
  // brodcast();
};

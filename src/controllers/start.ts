import type { CommandMiddleware, Context } from 'grammy';
import { brodcast } from '../services/brodrcast';

export const start: CommandMiddleware<Context> = (ctx) => {
  ctx.reply('Добрый день,отправте мне фото и адрес стены с рекламмой');
};

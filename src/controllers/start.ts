import type { CommandMiddleware, Context } from 'grammy';

export const start: CommandMiddleware<Context> = (ctx) => {
  ctx.reply('Привет, отправляй фото стены и адресс в подписи к фото');
};

import type { CommandMiddleware, Context } from 'grammy';
import {
  storeAddChenal,
  storeRemoveChenal,
  selectAllChenals,
  selectHasChenal,
  selectEmptyChenal,
} from '../models/chenal';

export const addChenal: CommandMiddleware<Context> = (ctx) => {
  const { id } = ctx.chat;
  const listChenal = selectAllChenals();

  if (listChenal.findIndex((v) => v === id) !== -1) {
    ctx.reply('канал уже ЕСТЬ в рассылке');
    return;
  }

  storeAddChenal(ctx.chat.id);
  ctx.reply('канал добавлен в рассылку');
};

export const removeChenal: CommandMiddleware<Context> = (ctx) => {
  const { id } = ctx.chat;

  if (selectHasChenal(id)) {
    storeRemoveChenal(id);
    ctx.reply('канал удален из рассылки');
  } else {
    ctx.reply('канала нет в рассылки');
  }
};

export const listChenal: CommandMiddleware<Context> = (ctx) => {
  const listChenal = selectAllChenals();

  if (!selectEmptyChenal()) {
    ctx.reply(JSON.stringify(listChenal, null, 2));
  } else {
    ctx.reply('в рассылке нет каналов');
  }
};

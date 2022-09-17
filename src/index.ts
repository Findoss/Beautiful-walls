import './config/env';

import { bot } from './services/tg';

import { start } from './controllers/start';
import { addChenal, removeChenal, listChenal } from './controllers/chenal';

import { brodcast } from './services/brodrcast';
import {
  storeResetImgs,
  isReadyMessageText,
  isReadyMessageImg,
  storeSetText,
  storeAddImgs,
  selectMessage,
  selectCountImgs,
} from './models/img';

bot.command('start', start);

bot.command('add', addChenal);
bot.command('remove', removeChenal);
bot.command('list', listChenal);

bot.on('message:text', async (ctx) => {
  const { id, first_name, username } = ctx.message.from;
  const { text } = ctx.message;

  storeSetText({ id, text: `${text} \n\n${first_name} @${username}` });

  if (isReadyMessageText(id)) {
    ctx.reply('текст перезаписан');
  } else {
    ctx.reply('текст добавлен');
  }

  if (isReadyMessageImg(id)) {
    brodcast(selectMessage(id));
    storeResetImgs();
    ctx.reply('отправили');
  } else {
    ctx.reply('надо фото');
  }
});

bot.on('message:photo', async (ctx) => {
  const { id } = ctx.message.from;
  const { media_group_id } = ctx.message;
  const { file_id } = await ctx.getFile();

  if (selectCountImgs(id) > 9) {
    ctx.reply('фото слишком много, давай текст');
    return;
  }

  storeAddImgs({ id, imgs: [file_id] });

  if (isReadyMessageText(id)) {
    if (!media_group_id) {
      brodcast(selectMessage(id));
      storeResetImgs();
      ctx.reply('отправили');
    }
  } else {
    ctx.reply('надо текст');
  }
});

bot.start();

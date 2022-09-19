import './config/env';

import { Menu } from '@grammyjs/menu';

import { bot } from './services/tg';

import { start } from './controllers/start';
import { addChenal, removeChenal, listChenal } from './controllers/chenal';

import { brodcast } from './services/brodrcast';
import {
  selectReport,
  storeAddImg,
  storeSetText,
  storeResetReport,
  isReadyReportText,
  isReadyReportImg,
  selectReportCountImgs,
} from './models/report';

import { debounce } from 'lodash';

const menu = new Menu('my-menu-identifier').text(
  'Подтверждаю, отправляем',
  (ctx) => ctx.reply('Отправили')
);

bot.use(menu);

bot.command('menu', async (ctx) => {
  await ctx.reply('Here is your menu', { reply_markup: menu });
});

bot.command('start', start);

bot.command('add', addChenal);
bot.command('remove', removeChenal);
bot.command('list', listChenal);

const send = debounce(async (ctx) => {
  const { id } = ctx.message.from;

  await ctx.reply('Погнали:', { reply_markup: menu });

  console.log('готовы отправить фото');
  ctx.reply(JSON.stringify(selectReport(id)));
  // brodcast(selectMessage(id));
  // storeResetImgs();
  // ctx.reply('отправили');
}, 700);

bot.on('message:text', async (ctx) => {
  const { id, first_name, username } = ctx.message.from;
  const { text } = ctx.message;

  storeSetText({ id, text: `${text} \n\n${first_name} @${username}` });

  if (isReadyReportText(id)) {
    ctx.reply('текст перезаписан');
  } else {
    ctx.reply('текст добавлен');
  }

  if (isReadyReportImg(id)) {
    send(ctx);
  } else {
    ctx.reply('надо фото');
  }
});

const xxx = debounce((ctx) => {
  ctx.reply('надо текст');
}, 700);

bot.on('message:photo', async (ctx) => {
  const { id } = ctx.message.from;
  const { file_id } = await ctx.getFile();

  if (selectReportCountImgs(id) > 9) {
    ctx.reply('в одну заявку нельзя добавить более 10 фото');
    return;
  }

  storeAddImg({ id, img: file_id });

  if (isReadyReportText(id)) {
    send(ctx);
  } else {
    xxx(ctx);
  }
});

bot.start();

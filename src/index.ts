import './config/env';

import { bot } from './services/tg';

import { start } from './controllers/start';
import { addChenal, removeChenal, listChenal } from './controllers/chenal';
import { brodcast } from './services/brodrcast';

bot.command('start', start);
console.log('start bot');

bot.command('add', addChenal);
bot.command('remove', removeChenal);
bot.command('list', listChenal);

bot.on('message:photo', async (ctx) => {
  const { caption } = ctx.message;
  const { file_id } = await ctx.getFile();
  brodcast(file_id, caption);
});

bot.start();

import './config/env';

// import { Menu } from '@grammyjs/menu';

import { bot } from './services/tg';

import { start } from './controllers/start';
import { addChenal, removeChenal, listChenal } from './controllers/chenal';
import { addTextReport, addImgReport } from './controllers/report';

// import { brodcast } from './services/brodrcast';

bot.command('start', start);
bot.command('add', addChenal);
bot.command('remove', removeChenal);
bot.command('list', listChenal);

bot.on('message:text', addTextReport);

bot.on('message:photo', addImgReport);

bot.start();

import { Bot, Context } from 'grammy';
import { FileFlavor, hydrateFiles } from '@grammyjs/files';

import { TG_TOKEN } from '../../config';

type MyContext = FileFlavor<Context>;

export const bot = new Bot<MyContext>(TG_TOKEN);
bot.api.config.use(hydrateFiles(bot.token));

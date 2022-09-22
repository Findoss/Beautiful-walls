import { TG_TOKEN } from '../../config';

import { Bot } from 'grammy';
import type { MyContext } from './types';

import { createSession } from './session';
import { createConversations } from './conversations';
import { createHydrateFiles } from './files';
import { reportMenu } from '../../controllers/report';

export const bot = new Bot<MyContext>(TG_TOKEN);

bot.use(createSession());
bot.use(createConversations());
bot.use(reportMenu);
bot.api.config.use(createHydrateFiles(bot.token));

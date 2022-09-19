import { Bot, session } from 'grammy';

import { hydrateFiles } from '@grammyjs/files';

import { TG_TOKEN } from '../../config';
import { getSessionKey } from './session';

import type { MyContext } from './types';

export const bot = new Bot<MyContext>(TG_TOKEN);

bot.use(session({ getSessionKey }));
bot.api.config.use(hydrateFiles(bot.token));

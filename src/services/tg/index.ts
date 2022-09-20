import { Bot, session } from 'grammy';

import { hydrateFiles } from '@grammyjs/files';

import { TG_TOKEN } from '../../config';
import { getSessionKey, createSession } from './session';

import type { MyContext } from './types';
import type { Report } from '../../models/report/types';

export const bot = new Bot<MyContext>(TG_TOKEN);

bot.use(
  session({
    getSessionKey,
    initial: (): Report => createSession(),
  })
);
bot.api.config.use(hydrateFiles(bot.token));

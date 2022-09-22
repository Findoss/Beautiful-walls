import type { Context } from 'grammy';

import { debounce } from 'lodash';
import { MyContext } from './types';

import type { SessionReport } from '../../models/report/types';
import { controllerMedia } from '../../controllers/report';

export const getSessionKey = (ctx: Context): string | undefined => {
  return ctx.chat?.id.toString();
};

const DEBOUNCE_INTERVAL = 700;

export const createSession = (): SessionReport => ({
  imgs: [],
  text: '',
  debounceControllerMedia: debounce((ctx: MyContext) => {
    controllerMedia(ctx);
  }, DEBOUNCE_INTERVAL),
});

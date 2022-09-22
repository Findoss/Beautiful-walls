import type { Context } from 'grammy';
import { session } from 'grammy';

import { debounce } from 'lodash';
import { MyContext } from './types';

import type { Report } from '../../models/report/types';
import type { SessionReport } from '../../models/report/types';
import { controllerMedia } from '../../controllers/report';

const getSessionKey = (ctx: Context): string | undefined => {
  return ctx.chat?.id.toString();
};

const DEBOUNCE_INTERVAL = 700;

const initSession = (): SessionReport => ({
  imgs: [],
  text: '',
  user: '',
  debounceControllerMedia: debounce((ctx: MyContext) => {
    controllerMedia(ctx);
  }, DEBOUNCE_INTERVAL),
});

export const createSession = () => {
  return session({
    getSessionKey,
    initial: (): Report => initSession(),
  });
};

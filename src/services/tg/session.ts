import type { Context } from 'grammy';
import type { Report } from '../../models/report/types';

import { debounce } from 'lodash';
import { MyContext } from './types';
import { sendReport } from '../../controllers/report';

export const getSessionKey = (ctx: Context): string | undefined => {
  return ctx.chat?.id.toString();
};

export const createSession = (): Report => ({
  imgs: [],
  text: '',
  check: debounce((ctx: MyContext) => {
    sendReport(ctx);
  }, 10000),
});

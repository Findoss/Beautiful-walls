// import type { MyContext } from './types';
import type { Context } from 'grammy';

export const getSessionKey = (ctx: Context): string | undefined => {
  return ctx.from === undefined || ctx.chat === undefined
    ? undefined
    : `${ctx.from.id}/${ctx.chat.id}`;
};

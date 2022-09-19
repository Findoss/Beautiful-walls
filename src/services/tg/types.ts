import type { Context, SessionFlavor } from 'grammy';
import type { FileFlavor } from '@grammyjs/files';

export type MyContext = FileFlavor<Context> &
  SessionFlavor<Record<string, any>>;

import type { Context, SessionFlavor } from 'grammy';
import type { FileFlavor } from '@grammyjs/files';
import type { Report } from '../../models/report/types';
import type { Conversation, ConversationFlavor } from '@grammyjs/conversations';

type ContextGrammyFiles = FileFlavor<Context>;
type ContextGrammySession = SessionFlavor<Report>;

export type MyContext = Context &
  ContextGrammyFiles &
  ContextGrammySession &
  ConversationFlavor;

export type ContextGrammyConversation = Conversation<MyContext>;

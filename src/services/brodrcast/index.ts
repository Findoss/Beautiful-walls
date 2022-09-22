import type { Report } from '../../models/report/types';
import type { FormatMediaGroup } from './types';

import { bot } from '../tg';
import { selectAllChenals } from '../../models/chenal';

export const brodcast = (rawMessage: Report) => {
  const listChenal = selectAllChenals();
  const { imgs, text } = rawMessage;

  const message = imgs.reduce<FormatMediaGroup[]>((acc, v) => {
    acc.push({ media: v, caption: text, type: 'photo' });
    return acc;
  }, []);

  listChenal.forEach((idChenal) => {
    bot.api.sendMediaGroup(idChenal, message);
  });
};

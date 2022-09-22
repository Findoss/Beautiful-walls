import type { Report } from '../../models/report/types';
import type { FormatMediaGroup } from './types';

import { bot } from '../tg';
import { selectAllChenals } from '../../models/chenal';

export const brodcast = ({ imgs, text, user }: Report) => {
  const listChenal = selectAllChenals();

  const message = imgs.reduce<FormatMediaGroup[]>((acc, v) => {
    acc.push({ media: v, caption: `${text}\n\n${user}`, type: 'photo' });
    return acc;
  }, []);

  listChenal.forEach((idChenal) => {
    bot.api.sendMediaGroup(idChenal, message);
  });
};

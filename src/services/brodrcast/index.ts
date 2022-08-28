import { bot } from '../tg';
import { selectAllChenals } from '../../models/chenal';

export const brodcast = (file_id: string, caption = '0x001') => {
  const listChenal = selectAllChenals();
  listChenal.forEach((idChenal) => {
    bot.api.sendPhoto(idChenal, file_id, {
      caption,
    });
  });
};

import { bot } from '../tg';
import { selectAllChenals } from '../../models/chenal';

type ImgType = string;
type TextType = string;

type State = {
  imgs: ImgType[];
  text: TextType;
};

type X = {
  type: 'photo';
  media: string;
  caption: string | undefined;
};

export const brodcast = (rawMessage: State) => {
  const listChenal = selectAllChenals();
  const { imgs, text } = rawMessage;

  const message = imgs.reduce<X[]>((acc, v) => {
    acc.push({ media: v, caption: text, type: 'photo' });
    return acc;
  }, []);

  // console.log(message);

  listChenal.forEach((idChenal) => {
    bot.api.sendMediaGroup(idChenal, message);
  });
};

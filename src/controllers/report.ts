import { brodcast } from '../services/brodrcast';
import { MyContext } from '../services/tg/types';

export const addTextReport = async (ctx: any) => {
  if (ctx.message === undefined) {
    return;
  }

  const { first_name, username } = ctx.message.from;
  const { text } = ctx.message;

  ctx.session.text = `${text} \n\n${first_name} @${username}`;
  ctx.reply('адресс обновлен');
};

export const addImgReport = async (ctx: any) => {
  if (ctx.message === undefined) {
    return;
  }

  const { caption, from } = ctx.message;
  const { first_name, username } = from;
  const { file_id } = await ctx.getFile();

  if (ctx.session.imgs.length > 9) {
    return;
  }

  if (caption !== undefined) {
    ctx.session.text = `${caption} ${first_name} @${username}`;
  }

  ctx.session.imgs.push(file_id);

  if (ctx.session.text !== '') {
    ctx.session.check(ctx);
  }
};

export const sendReport = async (ctx: MyContext) => {
  brodcast({ imgs: ctx.session.imgs, text: ctx.session.text });
  ctx.session.text = '';
  ctx.session.imgs = [];
};

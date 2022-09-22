import { brodcast } from '../services/brodrcast';
import { MyContext } from '../services/tg/types';

export const addText = async (ctx: any, text: string) => {
  const { from } = ctx.message;
  const { first_name, username } = from;
  ctx.session.text = `${text} ${first_name} @${username}`;
  ctx.reply('Адресс отчета обновлен');
};

export const addImg = async (ctx: any) => {
  const { file_id } = await ctx.getFile();
  ctx.session.imgs.push(file_id);
};

export const controllerMedia = async (ctx: any) => {
  const { caption } = ctx.message;

  if (caption !== undefined) {
    await addText(ctx, caption);
  }

  ctx.reply('Фото добавлены к отчету');

  if (ctx.session.text !== '') {
    await sendReport(ctx);
  }
};

export const addTextReport = async (ctx: any) => {
  const { text } = ctx.message;
  addText(ctx, text);

  if (ctx.session.imgs.length > 0) {
    await sendReport(ctx);
  }
};

export const addImgReport = async (ctx: any) => {
  // Работает на каждое фото
  if (ctx.session.imgs.length > 9) {
    ctx.reply('В одну заявку нельзя добавить больше 10 фото');
    return;
  }

  addImg(ctx);

  // Работает 1 раз на группу фото
  ctx.session.debounceControllerMedia(ctx);
};

export const sendReport = async (ctx: MyContext) => {
  brodcast({ imgs: ctx.session.imgs, text: ctx.session.text });
  ctx.session.text = '';
  ctx.session.imgs = [];
};

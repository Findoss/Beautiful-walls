import type { MyContext } from '../services/tg/types';
import { brodcast } from '../services/brodrcast';
import { Menu } from '@grammyjs/menu';

export const addText = async (ctx: any, text: string) => {
  const { from } = ctx.message;
  const { first_name, username, second_name, id } = from;
  ctx.session.text = `${text}`;
  ctx.session.user = `Отправитель: ${first_name} ${
    second_name ?? ''
  } \n@${username} (id: ${id})`;

  ctx.reply('Адресс отчета обновлен');
};

export const addImg = async (ctx: any) => {
  const { file_id } = await ctx.getFile();
  ctx.session.imgs.push(file_id);
};

export const controllerMedia = async (ctx: any) => {
  const { caption } = ctx.message;

  ctx.reply('Фото добавлены к отчету');

  if (caption !== undefined) {
    await addText(ctx, caption);
  }

  if (ctx.session.text !== '') {
    await guardReport(ctx);
  }
};

export const addTextReport = async (ctx: any) => {
  const { text } = ctx.message;
  addText(ctx, text);

  if (ctx.session.imgs.length > 0) {
    await guardReport(ctx);
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

export const guardReport = async (ctx: MyContext) => {
  const text = [
    `Ваш отчет сформирован`,
    `Количество фото: ${ctx.session.imgs.length}`,
    `Адресс: ${ctx.session.text}`,
    `- Для изменения адреса, надо отправить новое сообщение с`,
    `- Для отмены отчета, надо нажать кнопку "Отменить заявку"`,
    `Для отправки отчета нажмите кнопку "Подтверждаю отправку"`,
  ].join('\n');

  await ctx.reply(text, { reply_markup: reportMenu });
};

export const clearReport = async (ctx: MyContext) => {
  ctx.session.text = '';
  ctx.session.imgs = [];
};

export const sendReport = async (ctx: MyContext) => {
  brodcast({ ...ctx.session });
  clearReport(ctx);
};

export const reportMenu = new Menu('guard-report')
  .text('Отменить заявку', async (ctx) => {
    await clearReport(ctx as any);
    ctx.reply('Заявка отменена');
    ctx.deleteMessage();
  })
  .row()
  .text('Подтвердить отправку', async (ctx) => {
    await sendReport(ctx as any);
    ctx.reply('Успешно отправлено');
    ctx.deleteMessage();
  });

import { Markup } from 'telegraf';

export function actionButtons(): ReturnType<typeof Markup.keyboard> {
  return Markup.keyboard(
    [
      Markup.button.callback("Topshiriqlar to'plami 📋", 'list'),
      Markup.button.callback("Yakunlash ✅", 'done'),
      Markup.button.callback("O'zgartirish ✏️", 'edit'),
      Markup.button.callback("O'chirish ❌", 'delete'),
    ],
    // { columns: 2 },
  );
}
